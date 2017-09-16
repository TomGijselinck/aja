import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import Navigator from './navigator'
import mySaga from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()


const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)

store.dispatch({type: 'INIT'})

export default function MyApp () {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  )
}
