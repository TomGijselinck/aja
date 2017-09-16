import {
  GET_CHALLENGE_LIST_RESULT, GET_FRIENDS_LIST_RESULT, IMG_TAKEN, LOGIN_RESULT,
  POST_CHALLENGE_RESULT
} from './actions'
import {Navigator} from './navigator'

const initialState = {
  nav: Navigator.router.getActionForPathAndParams('Login'),
  user: null,
  loginError: false,
  currentImage: null,
  replyImage: null,
  friends: [],
  challenges: [],
}

function navReducer (state, action) {
  const newState = Navigator.router.getStateForAction(action, state)

  return (newState || state)
}

export default function reducer (state = initialState, action) {
  state = {
    ...state,
    nav: navReducer(state.nav, action)
  }
  console.log(action)
  switch (action.type) {
    case IMG_TAKEN:
      if (action.payload.routeTo) {
        return {
          ...state,
          currentImage: null,
          replyImage: action.payload.image,
        }
      }
      return {
        ...state,
        currentImage: action.payload.image,
        replyImage: null
      }
    case GET_CHALLENGE_LIST_RESULT:
      if (action.payload.error) {
        return state
      } else {
        return {
          ...state,
          challenges: action.payload.body
        }
      }
    case GET_FRIENDS_LIST_RESULT:
      if (action.payload.error) {
        return state
      } else {
        return {
          ...state,
          friends: action.payload.body
        }
      }
    case POST_CHALLENGE_RESULT:
      if (!action.payload.error) {
        return {
          ...state,
          currentImage: null,
        }
      } else {
        return state
      }
    case LOGIN_RESULT:
      if (action.payload.error) {
        return {
          ...state,
          loginError: true,
        }
      } else {
        return {
          ...state,
          user: parseInt(action.payload.user),
          loginError: false
        }
      }
    default:
      return state
  }
}