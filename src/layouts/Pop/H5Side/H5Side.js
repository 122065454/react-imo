import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { _collectLink } from '@/assets/utils/urlMethod'
import vulnerability from './img/vulnerability.png'
import repurchase from './img/repurchase.png'
import  { dn } from '@/assets/utils/comCss'
import styles from './H5Side.module.scss'
import fluidity from './img/fluidity.png'
import notice from './img/notice.png'
import apply from './img/apply.png'
import store from  '@/store/index'
import fund from './img/fund.png'
import faq from './img/faq.png'
import imo from './img/imo.png'
import klq from './img/klq.png'

const H5Side = ( props )=> {

  // 語言、皮膚
  const { lang, skin } = store
  // 彈出狀態
  const [status, setStatus] = useState(false)
  // 语言
  const la = lang['language']
  // 國際化
  const SlideText = lang[la]['Slide']
  const footerText = lang[la]['Footer']
  // 智能链
  const sk = skin.skinSign
  // 链接列表
  const linkList = _collectLink({la, sk})
  
  // 关闭弹窗
  const closeHandle = () => {
    setStatus(!status)
    props.callback(!status)
  }

  useEffect(() => {
    // 设置弹出状态
    setStatus(props.status)
  },[props.status])

  // 渲染列表
  const sideRander = () => {
    let list = []
    const sideList = [
      {name: SlideText['Notice'], url: linkList['Notice'],pic: notice},
      {name: 'IMO', url: linkList['IMO'],pic: imo},
      {name: SlideText['Repurchase'], url: linkList['Buyback'],pic: repurchase},
      {name: SlideText['Bridge'], url: linkList['Bridge'],pic: klq},
      {name: 'FAQ', url: linkList['Faq'],pic: faq},
      {name: SlideText['Apply'], url: linkList['Apply'],pic: apply},
      {name: SlideText['Fluidity'], url: linkList['Fluidity'],pic: fluidity},
      {name: SlideText['Fund'], url: linkList['Fund'],pic: fund},
      {name: footerText['Vulnerability'], url: linkList['Vulnerability'],pic: vulnerability},
    ]
    sideList.forEach((kind, index) => {
      list.push(
        <div className={styles.item} key={`sideRander${index}`}>
          <img src={kind.pic} alt=""/>
          <a href={kind.url} target='_blank' rel='noreferrer'>{kind.name}</a>
        </div>
      )
    })
    return list
  }

  return (
    <aside  className={`${styles.popWrap} ${styles[sk]}`} style={status ? {} : dn()}>
      <div className={`${styles.pop} ${status ? styles.popShow : {}} ${!status ? styles.popHideShow : {}}`}>{sideRander()}</div>
      <div className={styles.blank} onClick={() => closeHandle()}></div>
    </aside>
  )
}

export default observer(H5Side)
