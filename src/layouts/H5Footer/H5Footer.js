import React from 'react'
import { observer, inject } from 'mobx-react'
import { _collectLink } from '@/assets/utils/urlMethod'
import { defaultChain } from '@/assets/utils/comStatic'
import styles from './H5Footer.module.scss'
import boardroom from './img/boardroom.png'
import IMO_HECO from './img/IMO_HECO.png'
import IMO_BSC from './img/IMO_BSC.png'
import farm from './img/farm.png'
import home from './img/home.png'
import swap from './img/swap.png'
// import chart from './img/chart.png'

const H5Footer = ({ store })=> {

  const { lang, skin } = store
  // 语言
  const la = lang['language']
  // 智能链
  const sk = skin.skinSign
  // 链接列表
  const linkList = _collectLink({la, sk})
  // 国际化
  const footerTextObj = lang[la]['Header']
  // 初始化链
  const initChain = sk ? sk : defaultChain
  // 底部导航列表数据
  const footerNavList= {
    Home: {
      text: footerTextObj['Home'],
      pic: home,
      url: linkList['Home']
    },
    Swap: {
      text: footerTextObj['Swap'],
      pic: swap,
      url: linkList['Swap']
    },
    Farm: {
      text: footerTextObj['Farm'],
      pic: farm,
      url: linkList['Farm']
    },
    IMO: {
      text: 'IMO',
      pic: initChain === 'HECO' ? IMO_HECO: IMO_BSC,
      url: linkList['IMO'],
      color: initChain === 'HECO' ? '#2C72F4' : '#F3BC00'
    },
    Boardroom: {
      text: footerTextObj['Boardroom'],
      pic: boardroom,
      url: linkList['Boardroom']
    }
    // Chart: {
    //   text: footerTextObj['Chart'],
    //   pic: chart,
    //   url: linkList['Chart']
    // },
  }

  // 底部导航条渲染
  const footNavRender = () => {
    let list = []
    Object.keys(footerNavList).forEach((item, index) => {
      const obj = footerNavList[item]
      list.push( 
        <li key={`footNavRender${index}`}>
          <a href={obj['url']}>
            <div><img src={obj['pic']} alt=''/></div>
            <p style={obj['color'] ? {color: `${obj['color']}`}: {}}>{obj['text']}</p>
          </a>
        </li>
      )
    })
    return list
  }

  return (
    <div className={styles.footer}>
      <ul className={styles.nav}>
        {footNavRender()}
      </ul>
    </div>
  )
}

export default inject('store')(observer(H5Footer))
