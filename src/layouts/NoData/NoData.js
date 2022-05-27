import React from 'react'
import { observer } from 'mobx-react'
import hecoNoData from '@/assets/img/heco_noData.png'
import bscNoData from '@/assets/img/bsc_noData.png'
import styles from './NoData.module.scss'
import store from '@/store/index'

const NoData = () => {

  // 引入store數據
  const { lang, skin } = store

  // 鏈類型
  const sk = skin.skinSign

  // 语言
  const la = lang['language']

  // 国际化
  const supplementText = lang[la]['Supplement']

  return (
    <div className={styles.nodata}>
      <div>
          <img src={sk === 'HECO' ? hecoNoData : bscNoData} alt="" />
          <p>{supplementText['Nodata']}</p>
      </div>
    </div>
  )
}

export default (observer(NoData))
