import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import reportWebVitals from '@/reportWebVitals'
import '@/assets/styles/reset.scss'
import rootStore from '@/store'
import Route from '@/router'

ReactDOM.render(
  <Provider store={rootStore}>
      <Route />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
