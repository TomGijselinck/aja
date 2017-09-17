import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import http from './http'
import {
  GET_CHALLENGE_LIST, GET_CHALLENGE_LIST_RESULT, GET_FRIENDS_LIST, GET_FRIENDS_LIST_RESULT, IMG_TAKEN, LOGIN,
  LOGIN_RESULT,
  POST_CHALLENGE,
  POST_CHALLENGE_RESULT, REPLY_CHALLENGE
} from './actions'

function* init (action) {
  if (!action.payload.error) {
    yield put({type: GET_FRIENDS_LIST})
    yield put({type: GET_CHALLENGE_LIST})
  }
}

function* postChallenge(action) {
  try {
    const currentUser = yield select((state) => state.user)
    yield call(http.post, 'challenge', {
      body: JSON.stringify({
        ...action.payload,
        sender_id: currentUser,
        state: 'open',
      })
    })
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: false,
    }});
    yield getFriends(action)
    yield put({
      type: 'Navigation/NAVIGATE',
      routeName: 'Challenges',
    })
  } catch (e) {
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: true
    }});
    yield getChallenges(action)
  }
}

function* getFriends(action) {
  try {
    const currentUser = yield select((state) => state.user)
    const response = yield call(http.get, `user/${currentUser}/friends`)
    yield put({
      type: GET_FRIENDS_LIST_RESULT,
      payload: {
        body: response,
        error: false,
      }
    })
  } catch (e) {
    yield put({
      type: GET_FRIENDS_LIST_RESULT,
      payload: {
        error: false,
      }
    })
  }
}

function* getChallenges(action) {
  try {
    const currentUser = yield select((state) => state.user)
    const response = yield call(http.get, `challenge?user_id=${currentUser}`)
    yield put({
      type: GET_CHALLENGE_LIST_RESULT,
      payload: {
        body: response,
        error: false,
      }
    })
  } catch (e) {
    yield put({
      type: GET_CHALLENGE_LIST_RESULT,
      payload: {
        error: false,
      }
    })
  }
}

function* imgTaken(action) {
  if (action.payload.routeTo) {
    yield put({
      type: 'Navigation/NAVIGATE',
      routeName: action.payload.routeTo,
    })
  } else {
    yield put({
      type: 'Navigation/NAVIGATE',
      routeName: 'PostChallenge',
    })
  }
}

function* replyChallenge(action) {
  try {
    yield call(http.post, `challenge/${action.payload.challenge}/reply`, {
      body: JSON.stringify({
        reply_photo: action.payload.photo
    }),
    })
    yield put({type: GET_CHALLENGE_LIST})
    yield put({
      type: 'Navigation/NAVIGATE',
      routeName: 'Challenges',
    })
  } catch (e) {
    console.log(e)
  }
}

function* login(action) {
  try {
    yield call(http.get, `user/${action.payload.user}/valid`)
    yield put({
      type: LOGIN_RESULT,
      payload: {
        user: action.payload.user,
        error: false,
      }
    })
  } catch (e) {
    yield put({
      type: LOGIN_RESULT,
      payload: {
        error: true,
      }
    })
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const mySaga = function* mySaga() {
  yield takeLatest(LOGIN_RESULT, init)
  yield takeLatest(GET_FRIENDS_LIST, getFriends)
  yield takeLatest(GET_CHALLENGE_LIST, getChallenges)
  yield takeLatest(POST_CHALLENGE, postChallenge);
  yield takeLatest(IMG_TAKEN, imgTaken);
  yield takeLatest(REPLY_CHALLENGE, replyChallenge)
  yield takeLatest(LOGIN, login)
}

export default mySaga;