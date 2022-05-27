import React from 'react'
import { observer, inject } from 'mobx-react'
import { explanaList, _collectLink } from '@/assets/utils/urlMethod'
import { defaultChain } from '@/assets/utils/comStatic'
import HECOthree from './img/heco_three.png'
import styles from './Explana.module.scss'
import BSCthree from './img/bsc_three.png'
import HECOjump from './img/heco_jump.png'
import HECOfour from './img/heco_four.png'
import BSCfour from './img/bsc_four.png'
import HECOone from './img/heco_one.png'
import HECOtwo from './img/heco_two.png'
import BSCjump from './img/bsc_jump.png'
import BSCone from './img/bsc_one.png'
import BSCtwo from './img/bsc_two.png'


const explana = ({ store })=> {

  const { lang, skin } = store

  // 语言
  const la = lang['language']

  // 智能链
  const sk = skin.skinSign
  
  const explanaTextObj = lang[la]['explana']

  // 初始化链
  const initChain = sk ? sk : defaultChain

  // 链接列表
  const linkList = _collectLink({la, sk})

  return (
    <div className={`${styles.explana} ${styles[initChain]}`}>
      <div className={`${styles.itemBar} ${styles.left}`}>
        <div className={styles.item}>
          <p className={styles.title}><a href={explanaList[1][la]} target='_blank' rel='noreferrer'>{explanaTextObj['OneAsk']}</a></p>
          <div className={styles.content}>
            <p>{explanaTextObj['OneAnswer1']}</p>
            <p>{explanaTextObj['OneAnswer2']}</p>
            <p>{explanaTextObj['OneAnswer3']}</p>
            <p>{explanaTextObj['OneAnswer4']}</p>
          </div>
          <img className={styles.direction} src={initChain === 'BSC' ? BSCone : HECOone} alt=''/>
        </div>
        <div className={styles.circle}>01</div>
      </div>
      <div className={`${styles.itemBar} ${styles.right}`}>
        <div className={styles.circle}>02</div>
        <div className={styles.item}>
          <p className={styles.title}><a href={explanaList[2][la]} target='_blank' rel='noreferrer'>{explanaTextObj['TwoAsk']}</a></p>
          <div className={styles.content}>
            <p>{explanaTextObj['TwoAnswer1']}</p>
            <p>{explanaTextObj['TwoAnswer2']}</p>
            <p>{explanaTextObj['TwoAnswer3']}</p>
          </div>
          <img className={styles.direction} src={initChain === 'BSC' ? BSCtwo : HECOtwo} alt=''/>
        </div>
      </div>
      <div className={`${styles.itemBar} ${styles.left}`}>
        <div className={styles.item}>
          <p className={styles.title}>{explanaTextObj['ThreeAsk']}</p>
          <div className={styles.content}>
            <p>{explanaTextObj['ThreeAnswer1']}</p>
          </div>
          <img className={styles.direction} src={initChain === 'BSC' ? BSCthree : HECOthree} alt=''/>
        </div>
        <div className={styles.circle}>03</div>
      </div>
      <div className={`${styles.itemBar} ${styles.right}`}>
        <div className={styles.circle}>04</div>
        <div className={styles.item}>
          <p className={styles.title}><a href={explanaList[4][la]} target='_blank' rel='noreferrer'>{explanaTextObj['FourAsk']}</a></p>
          <div className={styles.content}>
            <p>{explanaTextObj['FourAnswer1']}</p>
            <p>{explanaTextObj['FourAnswer2']}</p>
          </div>
          <img className={styles.direction} src={initChain === 'BSC' ? BSCfour : HECOfour} alt=''/>
          <a href={linkList['IMOproblem']} target='_blank' rel ='noreferrer'><img className={styles.jump} src={skin.skinSign === 'BSC' ? BSCjump : HECOjump} alt=''/></a>
        </div>
      </div>
      <div className={styles.gradient}></div>
    </div>
  )
}

export default inject('store')(observer(explana))
