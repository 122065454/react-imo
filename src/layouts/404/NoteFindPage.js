import React, { Component } from 'react'
import style from './NoteFindPage.module.scss'
import { Link } from 'react-router-dom'

export default class NoteFindPage extends Component {

  back() {
    window.history.back()
  }
  
  render() {
    return (<div className={style.not_find_ly}>
      <div className={style.center_image}>
        <div className={style.note_find_title}>您访问的页面丢失了</div>
        <div className={style.note_find_content}>可以通过以下方式继续访问</div>
        <div className={style.note_find_function}>
          <span onClick={() => this.back()} className={style.note_find_back + ' ' + style.mar_r_20 + ' ' + style.pointer}>返回上一级</span>
          <Link to='/' className={style.note_find_back}>返回首页</Link>
        </div>
      </div>

    </div>)
  }
}
