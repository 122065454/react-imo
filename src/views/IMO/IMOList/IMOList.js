import { Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { chainList, defaultChain } from '@/assets/utils/comStatic'
import PCFooter from '@/layouts/PCFooter/PCFooter'
import H5Footer from '@/layouts/H5Footer/H5Footer'
import PCHeader from '@/layouts/PCHeader/PCHeader'
import H5Header from '@/layouts/H5Header/H5Header'
import ParticipatedList from './ParticipatedList'
import { contSet } from '@/assets/utils/comCss'
import { useHistory } from 'react-router-dom'
import styles from './IMOList.module.scss'
import Bus from '@/assets/utils/eventBus'
import arrow from './img/arrow.png' 
import IMOsList from './IMOsList'
import OverList from './OverList'

const IMOlist = ({ store })=> {

	// 获取初始化方法
	let history = useHistory()
  // 获取store数据
  const { lang, imo, skin, contract, config } = store
  // 控制tab下标状态 1代表第一个
  const [tabStatus, setTabStatus] = useState(1);
  // 控制loading显示状态
  const [loadStatus, setLoadStatus] = useState(true)
  // IMOS列表数据
  const [IMOsArray, setIMOsArray] = useState([])
  // 我参与列表数据
  const [participatedArray, setParticipatedArray] = useState([])
	// 設備判斷
	const terminal = (config.device === 'pc')
	// 语言
	const la = lang['language']
	// 智能链
	const sk = skin.skinSign
	// 登录tab列表
	const loginTabList = ['IMOs', 'Over', 'Participated']
	// 未登录列表
	const noLoginTabList = ['IMOs', 'Over']
  // 国际化展示
  const tabText = lang[la]['Tab']
  const supplementText = lang[la]['Supplement']

  useEffect(() => {
    const handle = (index) => {
      if(index === 1) requestProList(1, 1)
      if(index === 2) requestProVote()
			if(index === 3) requestProList(4, 2)
      requestServerTime()
    }
    if (sk) {
      Bus.addListener('updataImoList', handle)
      requestServerTime()
      requestProList(1, 1)
    }
    return () =>{
      Bus.removeListener('updataImoList', handle)
    }
  },[sk])// eslint-disable-line react-hooks/exhaustive-deps

  // 获取服务器时间
  const requestServerTime = () => {
    imo.getServerTime().then((res) => {
      console.log('获取服务器时间(s):', res)
      if (res.code === 0) { 
        if(res.data) imo.saveServerTime(res.data.time)
      }
    })
  }

  // 获取项目列表
  const requestProList = (status, index) => {
    setLoadStatus(true)
    imo.getImoProList({status, chain: chainList[sk]}).then((res) => {
      console.log('获取IMO列表:', res)
      if (res.code === 0) { 
        const array = res.data.rows
        const item = array ? array : []
        setIMOsArray(item)
        setTabStatus(index)
        setLoadStatus(false)
      } else {
        if(!loadStatus) setLoadStatus(true)
      }
    })
  }

  // 获取我参与的项目列表
  const requestProVote = () => {
    setLoadStatus(true)
    imo.getImoProVote({user_addr: contract.accounts, chain:chainList[sk]}).then((res) => {
      console.log('获取我参与的IMO列表:', res)
      if (res.code === 0) { 
        const array = res.data.rows
        const item = array ? array : []
        setParticipatedArray(item)
        setTabStatus(3)
        setLoadStatus(false)
      } else {
        if(!loadStatus) setLoadStatus(true)
      }
    })
  }
  
  // 切换tab
  const switchTabHandle = (index) => {
    if(index === 3) {
      if(tabStatus !== 3 ) {
        requestServerTime()
        requestProVote()
      }
    } else {
      if(tabStatus !== index ) {
        requestServerTime()
        requestProList(index === 2 ? 4 : index, index)
      }
    }
  }
  
  // TAB渲染
  const tabRender = () => {
    let list = []
    const textArr = contract.accounts ? loginTabList : noLoginTabList
    textArr.forEach((item, index) => {
      list.push(
        <span 
          key={`TabRender${item}`} 
          className={tabStatus === index+1 ? styles.select : '' }
          onClick={() => switchTabHandle(index+1)}>{tabText[item]}
        </span>
      )
    })
    return list
  }

  // TAB内容渲染
  const tabConRender = (ind) => {
    switch(ind){
      case 1: return <IMOsList param={IMOsArray}/> 
      case 2: return <OverList param={IMOsArray}/>
			case 3: return <ParticipatedList param={participatedArray}/>
      default: return ''
    } 
  }

  return (
    <div className={`${styles.wrap} ${styles[sk ? sk : defaultChain]}`}>
      <div className={styles.bg}></div>
			{/* 头部 */}
      {terminal ?  <PCHeader /> : <H5Header />}
      <main className={styles.main}>
        {/* 麵包屑 */}
        <section className={styles.top}>
          {
            terminal ? ( 
              <div className={styles.breadCrumbs}>
                <span className={styles.back} onClick={()=>history.push({pathname: `/`}) }>{supplementText['Return']}</span>
                <i></i>
                <span>{supplementText['ProductList']}</span>
                <span style={contSet.mlDis(5)}>{`>`}</span> 
                <span style={contSet.mlDis(5)}>{tabText[loginTabList[tabStatus-1]]}</span>
              </div>
            ) : (
              <div className={styles.backBar}>
                <img src={arrow} alt='' onClick={()=>history.push({pathname: `/`}) } />
                <span>{tabText[loginTabList[tabStatus-1]]}</span>
              </div>
            )                  
          }
        </section>
				{/* 活动列表 */}
        <section className={styles.activing}>
          <div className={styles.tabBar}> 
            <div className={styles.tab}>{tabRender()}</div>
          </div>
          <div className={styles.cardBar}>
            <Spin tip={`${supplementText['Loading']}...`} spinning={loadStatus} size="large">
              {tabConRender(tabStatus)}
            </Spin>
          </div>
        </section>
      </main>
      {/* 底部分割线 */}
      <div className={styles.line}></div>
			{/* 底部 */}
      { terminal ?  <PCFooter /> : <H5Footer /> }
    </div>
  )
}

export default inject('store')(observer(IMOlist))
