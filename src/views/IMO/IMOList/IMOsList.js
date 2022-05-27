import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { contSet } from '@/assets/utils/comCss'
import Nodata from '@/layouts/NoData/NoData'
import styles from './IMOList.module.scss'
import Card from '@/layouts/Card/Card'
import store from '@/store/index'

const IMOsList = ({ param })=> {

  // 获取store数据
  const { config } = store

  // 控制loading显示状态
  const [arrayList, setArrayList] = useState([])

  // 設備判斷
  const terminal = (config.device === 'pc')

  useEffect(() => {
    if (param.length > 0) {
      setArrayList(param)
    } else {
      setArrayList([])
    }
  },[param])

  
  // 卡片渲染
  const cardRender = () => {
    let list = []
    arrayList.forEach((item, index) => {
      list.push(
        <div className={styles.mb30} style={terminal && (index+1)%3 !== 0 ? contSet.mrDis(30) : {}} key={`cardRender${Math.random()}`}><Card param={item} subscript={1} /></div>)
    })
    return list
  }

  const size = arrayList.length

  return (
    <div className={`${terminal ? (size > 2 ? styles.between : styles.df) : ''}`}>
      {size > 0 ? cardRender() : (<div className={styles.noData}><Nodata /></div>)}
    </div>
  )
}

export default observer(IMOsList)
