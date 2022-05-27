import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react';
import { _collectLink } from '@/assets/utils/urlMethod'
import styles from './H5SelectLang.module.scss'
import hecoNotice from './img/heco_notice.png'
import rightAllow from './img/right_allow.png'
import bscNotice from './img/bsc_notice.png'
import  { dn } from '@/assets/utils/comCss'
import telegram from './img/telegram.png'
import twitter from './img/twitter.png'
import discord from './img/discord.png'
import github from './img/github.png'
import medium from './img/medium.png'
import close from './img/close.png'
import weibo from './img/weibo.png'
import store from  '@/store/index'

const H5SelectLang = ( props )=> {

  const { lang, skin } = store

  const [status, setStatus] = useState(false);
  // 语言
  const la = lang['language']
  // 智能链
  const sk = skin.skinSign
  // 链接列表
  const linkList = _collectLink({la, sk})
  // 国际化
  const popTextObj = lang[la]['Pop']
  
  useEffect(() => {
    setStatus(props.status)
  },[props.status])

  // 联系方式渲染
  const contactRender = () => {
    const contactList = {
      Github: {url: linkList['Github'], address: github},
      Medium: {url: linkList['Medium'], address: medium},
      Telegram: {url: linkList['Telegram'], address: telegram},
      Twitter: {url: linkList['Twitter'], address: twitter},
      Discord: {url: linkList['Discord'], address: discord},
      Weibo: {url: linkList['Weibo'], address: weibo},
    } 
    let list = []
    Object.keys(contactList).forEach((item, index) => {
      list.push(
        <li key={`contactRender${index}`}>
          <a target='_blank' rel ='noreferrer' href={contactList[item]['url']} >
            <img src={contactList[item]['address']} alt=''/>
            <span>{item}</span>
          </a>
        </li>
      )
    })
    return list
  }

   // 语言更改
   const lanHandleChange =(index) => { 
    lang.setLang(index)
  }

  // 关闭弹窗
  const closeHandle = () => {
    setStatus(!status)
    props.callback(!status)
  }

  return (
    <div className={`${styles.popWrap} ${styles[sk]}`} style={status ? {} : dn()}>
      <div className={styles.pop}>
        <div className={styles.close} onClick={() => closeHandle()}>
          <img src={close} alt="" />
        </div>
        <div className={styles.select}>
          <div className={styles.seleteLanguage}>
            <div className={`${styles.left} ${la === "en" ? styles.active : {}}`}  onClick={() => lanHandleChange('en')}> English </div>
            <div className={`${styles.right} ${la === "zh" ? styles.active : {}}`}  onClick={() => lanHandleChange('zh')}> 中文 </div>
          </div>
          <ul className={styles.showImgInfo}>
            {contactRender({})}
          </ul>
          <a href={linkList['Notice']} target="_blank" rel="noreferrer">
            <div className={styles.affInfo}>
              <div>
                <img className={styles.notice} src={sk === 'BSC' ? bscNotice : hecoNotice} alt=""/>
                <span>{popTextObj['Notice']}</span>
              </div>
              <img className={styles.allow} src={rightAllow} alt=""/>
            </div>
          </a>
          <p className={styles.affEmai}>{`${popTextObj['Buco']}：business@mdex.com`}</p>
        </div>
      </div>
    </div>
  )
}

export default observer(H5SelectLang)

