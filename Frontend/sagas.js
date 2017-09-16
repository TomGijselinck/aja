import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import http from './http'
import { POST_CHALLENGE, POST_CHALLENGE_RESULT } from './actions'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* postChallenge(action) {
  console.log(action)
  try {
    yield call(http.post, 'challenge', {
      body: JSON.stringify(action.payload),
    })
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: false,
    }});
  } catch (e) {
    yield put({type: POST_CHALLENGE_RESULT, payload: {
      initAction: action,
      error: true
    }});
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const mySaga = function* mySaga() {
  yield takeLatest(POST_CHALLENGE, postChallenge);
}

export default mySaga;