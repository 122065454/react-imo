import React from 'react'
import {useHistory} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { _collectLink } from '@/assets/utils/urlMethod'
import { defaultChain } from '@/assets/utils/comStatic'
import { contSet } from '@/assets/utils/comCss'
import hecoProces from './img/heco_proces.png'
import bscProces from './img/bsc_proces.png'
import hecoJump from './img/heco_jump.png'
import styles from './Portal.module.scss'
import bscJump from './img/bsc_jump.png'


const Portal = ({ store })=> {

  let history = useHistory()

  const { skin, lang, config } = store
  // 语言
  const la = lang['language']
  // 国际化
  const explanaTextObj = lang[la]['explana']
  // 智能链
  const sk = skin.skinSign
  // 链接列表
  const linkList = _collectLink({la, sk})
  
  return (
    <div className={`${styles[sk ? sk : defaultChain]}`}>
    {
      config.device === 'pc' ?  (
        <div className={styles.pcPicBar} style={contSet.mbDis(100)}>
          <p>{explanaTextObj['FotText']}</p>
          <a href={linkList['Portal']}>{explanaTextObj['Apply']}</a>
        </div>
      ) : (
        <div className={styles.portalWrap}>
          <div className={styles.poratal} onClick={() => history.push({pathname: `/Explana`}) }>
            <img className={styles.proces} src={sk === 'BSC' ? bscProces : hecoProces} alt=''/>
            <span>{explanaTextObj['Poratal']}</span>
            <img className={styles.jump} src={sk === 'BSC' ? bscJump : hecoJump} alt=''/>
          </div>
          <div className={styles.h5PicBar}>
            <p>{explanaTextObj['FotText']}</p>
            <a href={linkList['Portal']}>{explanaTextObj['Apply']}</a>
          </div>
        </div>
      )
    }
    </div>
  )
}
  
export default inject('store')(observer(Portal))

