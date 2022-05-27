import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { getBlockNumber } from '@/assets/utils/publicErc20'
import { contSet } from '@/assets/utils/comCss'
import Nodata from '@/layouts/NoData/NoData'
import styles from './Active.module.scss'
import Card from '@/layouts/Card/Card'
import store from '@/store/index'

const LockList = ({ param })=> {

  // 获取store数据
  const { config } = store

  // 控制loading显示状态
  const [arrayList, setArrayList] = useState([])

  // 当前区块高度
  const [block, setBlock] = useState(0)

  useEffect(() => {
    if (param.length > 0) {
      const initFun = async() => {
        const block = await getBlockNumber()
        const list = []
        param.forEach((item) => {
          if(item.un_lock_block > block) {
            item.status = 5
            list.push(item)
          }
        })
        setArrayList(list)
        setBlock(block)
      }
      initFun()
    } else {
      setArrayList([])
    }
  },[param])

  // 卡片渲染
  const cardRender = () => {
    let list = []
    arrayList.forEach((item) => {
      list.push(
        <div style={arrayList.length < 3 ? contSet.mrDis(30) : {}} key={`cardRender${Math.random()}`}><Card param={item} subscript={2} blockNumber={block}/></div>)
      })
    return list
  }

  const size = arrayList.length

  return (
    <div className={`${config.device === 'pc' ? (size > 2 ? styles.between : styles.df) : ''}`}>
      {size > 0 ? cardRender() : (<div className={styles.noData}><Nodata /></div>)}
    </div>
  )
}

export default observer(LockList)
