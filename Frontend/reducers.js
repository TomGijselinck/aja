import { IMG_TAKEN } from './actions'

const initialState = {
  currentImage: null,
}

export default function reducer (state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case IMG_TAKEN:
      return {
        ...state,
        currentImage: action.payload.image,
      }
    default:
      return state
  }
}