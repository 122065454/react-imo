import asyncComponent from '@/assets/utils/asyncComponent'
import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

const IMODetail = asyncComponent(() => import('@/views/IMO/IMODetail/IMODetail'))
const H5Explana = asyncComponent(() => import('@/views/IMO/IMOIndex/H5Explana/H5Explana'))
const IMO = asyncComponent(() => import('@/views/IMO/IMOIndex/IMOIndex'))
const IMOList = asyncComponent(() => import('@/views/IMO/IMOList/IMOList'))
const NoteFindPage = asyncComponent(() => import('@/layouts/404/NoteFindPage'))

export default class RouteConfig extends Component {
  render() {
    return (
      // HashRouter:只有一个路径 /，通过 URL 后面的 # 部分来决定路由
      // Switch:从上往下找第一个匹配的 Route 
      <HashRouter>
        <Switch>
          <Route exact path='/' component={IMO} />
          <Route exact path='/detail' component={IMODetail} />
          <Route exact path='/detail/:id' component={IMODetail} />
          {/* <Route exact path='/list' component={IMOList} /> */}
          <Route exact path='/IMO/' component={IMO} />
          <Route exact path='/IMO' component={IMO} />
          <Route exact path='/IMO/:lang' component={IMO} />
          <Route exact path='/Explana' component={H5Explana} />
          <Route exact path='/404' component={NoteFindPage} />
          <Redirect to='/404' /> 
        </Switch>
      </HashRouter>
    )
  }
}

