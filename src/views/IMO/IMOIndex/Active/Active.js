import { Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { useState, useEffect } from 'react';
import { chainList, defaultChain, defaultAddress } from '@/assets/utils/comStatic'
import ParticipatedList from './ParticipatedList'
import styles from './Active.module.scss'
import Bus from '@/assets/utils/eventBus'
import IMOsList from './IMOsList'
import LockList from './LockList'
import OverList from './OverList'

const Active = ({ store })=> {

  // 获取store数据
  const { lang, imo, skin, contract } = store

  // 控制tab下标状态 1代表第一个
  const [tabStatus, setTabStatus] = useState(1);

  // 控制loading显示状态
  const [loadStatus, setLoadStatus] = useState(true)

  // IMOS列表数据
  const [IMOsArray, setIMOsArray] = useState([])

  // 锁仓列表数据
  const [lockArray, setLockArray] = useState([])

  // 已结束列表数据
  const [overArray, setOverArray] = useState([])

  // 我参与列表数据
  const [participatedArray, setParticipatedArray] = useState([])

  // 语言
  const la = lang['language']

  // 国际化展示
  const tabTextObj = lang[la]['Tab']
  const supplementTextObj = lang[la]['Supplement']
  const activeText = lang[la]['Active']

  // 智能链
  const sk = skin.skinSign

  useEffect(() => {
    // index为tab下标
    const handle = (index) => {
      if(index === 1) requestProList('1|2|3', 1)
      if(index === 2) requestProList('3|4', 2)
      requestServerTime()
    }
    if (sk) {
      Bus.addListener('updataImoList', handle)
      requestServerTime()
      requestProList('1|2|3', 1)
    }
    return () =>{
      Bus.removeListener('updataImoList', handle)
    }
  },[sk])// eslint-disable-line react-hooks/exhaustive-deps

  // 获取服务器时间
  const requestServerTime = () => {
    imo.getServerTime({user_addr: contract.accounts ? contract.accounts : defaultAddress}).then((res) => {
      console.log('获取服务器时间(s):', res)
      if (res.code === 0) { 
        if(res.data) imo.saveServerTime(res.data.time)
      }
    })
  }

  // 获取项目列表
  const requestProList = (status, index) => {
    setLoadStatus(true)
    imo.getImoProList({user_addr: contract.accounts ? contract.accounts : defaultAddress, status, chain: sk}).then((res) => {
      console.log('获取IMO列表:', res)
      if (res.code === 0) { 
        const array = res.data.rows
        const item = array ? array : []
        if(index === 1) setIMOsArray(item)
        if(index === 2) setLockArray(item)
        if(index === 3) setOverArray(item)
        setTabStatus(index)
        setLoadStatus(false)
      } else {
        if(!loadStatus) setLoadStatus(true)
      }
    })
  }

  // 获取我参与的项目列表
  const requestProVote = (index) => {
    setLoadStatus(true)
    imo.getImoProVote({user_addr: contract.accounts ? contract.accounts : defaultAddress, chain: sk}).then((res) => {
      console.log('获取我参与的IMO列表:', res)
      if (res.code === 0) { 
        const array = res.data.rows
        const item = array ? array : []
        setParticipatedArray(item)
        setTabStatus(index)
        setLoadStatus(false)
      } else {
        if(!loadStatus) setLoadStatus(true)
      }
    })
  }
  
  // 切换tab
  const switchTabHandle = (index) => {
    if(tabStatus !== index) {
      switch(index) {
        case 1:
          requestProList('1|2|3', index)
          break;
        case 2:
          requestProList('3|4', index)
          break;
        case 3: 
          requestProList('4', index)
          break;
        case 4: 
          requestProVote(index)
          break;
        default:
      }
    }
    requestServerTime()
  }
  
  // TAB渲染
  const tabRender = () => {
    let list = []
    const textArr = contract.accounts ? ['IMOs', 'Lockup', 'Over', 'Participated'] : ['IMOs', 'Lockup', 'Over']
    textArr.forEach((item, index) => {
      list.push(
        <span 
          key={`TabRender${item}`} 
          className={tabStatus === index+1 ? styles.select : '' }
          onClick={() => switchTabHandle(index+1)}>{tabTextObj[item]}
        </span>
      )
    })
    return list
  }

  // TAB内容渲染
  const tabConRender = (ind) => {
    switch(ind){
      case 1: return <IMOsList param={IMOsArray}/> 
      case 2: return <LockList param={lockArray}/> 
      case 3: return <OverList param={overArray}/> 
      case 4: return <ParticipatedList param={participatedArray}/>
      default: return <React.Fragment></React.Fragment>
    } 
  }

  return (
    <div className={`${styles.main} ${styles[sk ? sk : defaultChain]}`}>
      <div className={styles.tabBar}> 
        <div className={styles.tab}>{tabRender()}</div>
      </div>
      <div className={styles.tips}>{activeText['Tips']}</div>
      <div className={styles.cardBar}>
        <Spin tip={`${supplementTextObj['Loading']}...`} spinning={loadStatus} size="large">
          {tabConRender(tabStatus)}
        </Spin>
      </div>
    </div>
  )
}

export default inject('store')(observer(Active))
