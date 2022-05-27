import React from 'react'
import { observer, inject } from 'mobx-react'
import { _collectLink } from '@/assets/utils/urlMethod'
import styles from './PCFooter.module.scss'
import telegram from './img/telegram.png'
import discord from './img/discord.png'
import twitter from './img/twitter.png'
import medium from './img/medium.png'
import github from './img/github.png'
import weibo from './img/weibo.png'
import hmdx from './img/hmdx.png'

const PCFooter = ({ store })=> {

  const { lang, skin } = store

  // 语言
  const la = lang['language']
  // 智能链
  const sk = skin.skinSign
  // 国际化
  const footerTextObj = lang[la]['Footer']
  // 链接列表
  const linkList = _collectLink({la, sk})

  // 底部渲染
  const footerHrefObj = {
    Application: {
      ACText1: linkList['ACText1'],
      ACText2: linkList['ACText2'],
      ACText3: linkList['ACText3'],
      ACText4: linkList['Fund'],
    },
    Guide: {
      GUText1: linkList['Swap'],
      GUText2: linkList['Pool'],
      GUText3: linkList['Chart'],
      GUText4: linkList['Farm'],
      GUText5: linkList['Boardroom'],
      GUText6: linkList['Trade'],
    },
    Doc: {
      DOText1: linkList['Faq'],
      Guidance: linkList['Guidance'],
      DOText2: '#',
    },
    About: {
      ABText1: linkList['Notice'],
      ABText2: linkList['ABText2'],
      ABText3: '#',
      Vulnerability: linkList['Vulnerability'],
      ABText4: '#'
    }
  }

  // 导航条渲染
  const footerRender = (name, data) => {
    let list = []
    list.push(<li key={`footerRender${name}`}>{footerTextObj[name]}</li>)
    Object.keys(data).forEach((item) => {
      list.push( 
        <li key={`footerRender${item}`}>
          {
            data[item] !== '#' ?  (<a target='_blank' rel ='noreferrer' href={data[item]}>{footerTextObj[item]}</a>) : footerTextObj[item]
          }
        </li>
      )
    })
    return list
  }

  // 联系方式渲染
  const contactRender = () => {
    const contactList = {
      github: {url: linkList['Github'], address: github},
      medium: {url: linkList['Medium'], address: medium},
      telegram: {url: linkList['Telegram'], address: telegram},
      twitter: {url: linkList['Twitter'], address: twitter},
      discord: {url: linkList['Discord'], address: discord},
      weibo: {url: linkList['Weibo'], address: weibo},
    } 
    let list = []
    Object.keys(contactList).forEach((item, index) => {
      list.push(
        <a target='_blank' rel ='noreferrer' href={contactList[item]['url']} className={`${styles[item]}`} key={`contactRender${index}`}>
          <img src={contactList[item]['address']} alt=''/>
        </a>
      )
    })
    return list
  }

  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <a href={linkList['Home']}><img src={hmdx} alt=''/></a>
        </div>
        <div className={styles.contact}>{contactRender()}</div>
        <p>{footerTextObj['Reserved']}</p>
      </div>
      <div className={styles.right}>
        <ul>{footerRender('Application', footerHrefObj['Application'])}</ul>
        <ul>{footerRender('Guide', footerHrefObj['Guide'])}</ul>
        <ul>{footerRender('Doc', footerHrefObj['Doc'])}</ul>
        <ul>{footerRender('About', footerHrefObj['About'])}</ul>
      </div>
    </div>
  )
}

export default inject('store')(observer(PCFooter))
