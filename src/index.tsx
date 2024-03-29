import React from 'react'

import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { App } from './app/App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
