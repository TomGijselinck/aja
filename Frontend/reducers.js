import { GET_CHALLENGE_LIST_RESULT, GET_FRIENDS_LIST_RESULT, IMG_TAKEN } from './actions'

const initialState = {
  user: 1,
  currentImage: null,
  friends: [],
  challenges: [],
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case IMG_TAKEN:
      return {
        ...state,
        currentImage: action.payload.image,
      }
    case GET_CHALLENGE_LIST_RESULT: {
      if (action.payload.error) {

      } else {
        return {
          ...state,
          challenges: action.payload.body
        }
      }
    }
    case GET_FRIENDS_LIST_RESULT: {
      if (action.payload.error) {

      } else {
        return {
          ...state,
          friends: action.payload.body
        }
      }
    }
    default:
      return state
  }
}