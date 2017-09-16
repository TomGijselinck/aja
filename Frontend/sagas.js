import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import http from './http'
import {
  GET_CHALLENGE_LIST, GET_CHALLENGE_LIST_RESULT, GET_FRIENDS_LIST, GET_FRIENDS_LIST_RESULT, IMG_TAKEN, POST_CHALLENGE,
  POST_CHALLENGE_RESULT
} from './actions'

function* init () {
  yield put({type: GET_FRIENDS_LIST})
  yield put({type: GET_CHALLENGE_LIST})
}

function* postChallenge(action) {
  try {
    yield call(http.post, 'challenge', {
      body: JSON.stringify(action.payload),
    })
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: false,
    }});
    yield put({
      type: 'Navigation/NAVIGATE',
      routeName: 'Challenges',
    })
  } catch (e) {
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: true
    }});
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
  yield put({
    type: 'Navigation/NAVIGATE',
    routeName: 'PostChallenge',
  })
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const mySaga = function* mySaga() {
  yield takeLatest('INIT', init)
  yield takeLatest(GET_FRIENDS_LIST, getFriends)
  yield takeLatest(GET_CHALLENGE_LIST, getChallenges)
  yield takeLatest(POST_CHALLENGE, postChallenge);
  yield takeLatest(IMG_TAKEN, imgTaken);
}

export default mySaga;