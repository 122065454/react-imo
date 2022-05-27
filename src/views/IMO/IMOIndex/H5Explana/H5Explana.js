import React from 'react'
import { inject, observer } from 'mobx-react'
import { explanaList, _collectLink } from '@/assets/utils/urlMethod'
import H5Footer from '@/layouts/H5Footer/H5Footer'
import H5Header from '@/layouts/H5Header/H5Header'
import NoPage from '@/layouts/404/NoteFindPage'
import styles from './H5Explana.module.scss'
import HECOthree from './img/heco_three.png'
import BSCthree from './img/bsc_three.png'
import HECOfour from './img/heco_four.png'
import HECOjump from './img/heco_jump.png'
import BSCfour from './img/bsc_four.png'
import BSCjump from './img/bsc_jump.png'
import HECOtwo from './img/heco_two.png'
import HECOone from './img/heco_one.png'
import BSCone from './img/bsc_one.png'
import BSCtwo from './img/bsc_two.png'
import back from './img/back.png'


const H5Explana = ({ store })=> {
  
  const { lang, skin, config } = store

  // 语言
  const la = lang['language']

  // 智能链
  const sk = skin.skinSign

  const explanaTextObj = lang[la]['explana']

  // 链接列表
  const linkList = _collectLink({la, sk})

  return (
    <React.Fragment>
      {
        config.device === 'pc' ?  <NoPage /> : (
          <React.Fragment>
            <H5Header />
            <div className={styles.h5Explana}>
              <div className={styles.backBar}>
                <img src={back} onClick={() => window.history.back()} alt=''/>
                <span className={styles.line}></span>
                <p>{explanaTextObj['Iap']}</p>
              </div>
            </div>
            
            <div className={`${styles.explana} ${styles[skin.skinSign]}`}>
              <div className={`${styles.itemBar} ${styles.left}`}>
                <div className={styles.circle}>01</div>
                <div className={styles.item}>
                  <img className={styles.direction} src={skin.skinSign === 'BSC' ? BSCone : HECOone} alt=''/>
                  <p className={styles.title}><a href={explanaList[1][la]} target='_blank' rel='noreferrer'>{explanaTextObj['OneAsk']}</a></p>
                  <div className={styles.content}>
                    <p>{explanaTextObj['OneAnswer1']}</p>
                    <p>{explanaTextObj['OneAnswer2']}</p>
                    <p>{explanaTextObj['OneAnswer3']}</p>
                    <p>{explanaTextObj['OneAnswer4']}</p>
                  </div>
                </div>
              </div>
              <div className={styles.itemBar}>
                <div className={styles.circle}>02</div>
                <div className={styles.item}>
                  <p className={styles.title}><a href={explanaList[2][la]} target='_blank' rel='noreferrer'>{explanaTextObj['TwoAsk']}</a></p>
                  <div className={styles.content}>
                  <p>{explanaTextObj['TwoAnswer1']}</p>
                  <p>{explanaTextObj['TwoAnswer2']}</p>
                  <p>{explanaTextObj['TwoAnswer3']}</p>
                  </div>
                  <img className={styles.direction} src={skin.skinSign === 'BSC' ? BSCtwo : HECOtwo} alt=''/>
                </div>
              </div>
              <div className={styles.itemBar}>
                <div className={styles.circle}>03</div>
                <div className={styles.item}>
                  <p className={styles.title}>{explanaTextObj['ThreeAsk']}</p>
                  <div className={styles.content}>
                    <p>{explanaTextObj['ThreeAnswer1']}</p>
                    <p>{explanaTextObj['ThreeAnswer2']}</p>
                  </div>
                  <img className={styles.direction} src={skin.skinSign === 'BSC' ? BSCthree : HECOthree} alt=''/>
                </div>
              </div>
              <div className={`${styles.itemBar} ${styles.right}`}>
                <div className={styles.circle}>04</div>
                <div className={styles.item}>
                  <p className={styles.title}>{explanaTextObj['FourAsk']}</p>
                  <div className={styles.content}>
                    <p>{explanaTextObj['FourAnswer1']}</p>
                    <p>{explanaTextObj['FourAnswer2']}</p>
                  </div>
                  <img className={styles.direction} src={skin.skinSign === 'BSC' ? BSCfour : HECOfour} alt=''/>
                  <a href={linkList['IMOproblem']} target='_blank' rel ='noreferrer'><img className={styles.jump} src={skin.skinSign === 'BSC' ? BSCjump : HECOjump} alt=''/></a>
                </div>
              </div>
              <div className={`${la === 'zh' ? styles.zhHeight : ''} ${styles.gradient}`}></div>
            </div>
            <H5Footer />
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default inject('store')(observer(H5Explana))
