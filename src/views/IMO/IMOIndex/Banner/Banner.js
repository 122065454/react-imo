import { Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { useState, useEffect } from 'react';
import { _formatDate, _coinAddress, _transferParam, _numComma } from '@/assets/utils/comMethod'
import { animateList } from '@/assets/utils/urlMethod'
import { defaultChain, airdropCoin, pledgeCoin1, pledgeCoin2, defaultAddress, itemName } from '@/assets/utils/comStatic'
import { contSet } from '@/assets/utils/comCss'
import {useHistory} from 'react-router-dom'
import styles from './Banner.module.scss'
import h5Curve from './img/h5_curve.png'
import Bus from '@/assets/utils/eventBus'
import first from './img/first.png'
import curve from './img/curve.png'
import Lottie from 'lottie-web'

const Banner = ({ store })=> {

  // 获取路由方法
  let history = useHistory()

  // 語言、皮膚、設備
  const { lang, skin, config, imo, contract } = store 

  // 保存列表數據
  const [imoProList, setImoProList] = useState([])

  // 控制loading显示状态
  const [loadStatus, setLoadStatus] = useState(true)

  // account数据
  const [accountObj, setAccountObj] = useState({amount: 0, total: 0})

  // 鏈類型
  const sk = skin.skinSign

  // 语言
  const la = lang['language']

  // 國際化
  const bannerTextObj = lang[la]['Banner']
  const supplementTextObj = lang[la]['Supplement']

  // 列表长度
  const size = imoProList.length

  useEffect(() => {
    const initFun = async() => {
      Lottie.destroy()
      Lottie.loadAnimation({
        container: document.getElementById('aaa'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: sk ? animateList[sk] : animateList[defaultChain] // the path to the animation json
      })
    }
    initFun()
  }, [sk])

  useEffect(() => {
    //获取推薦项目列表
    const requestProList = () => {
      setLoadStatus(true)
      imo.getImoProList({user_addr: contract.accounts ? contract.accounts : defaultAddress, chain: sk, is_recommend: 1, status: '1'}).then((res) => {
        console.log('获取IMO推薦列表:', res)
        if (res.code === 0) { 
          const array = res.data.rows
          const item = array ? array : []
          const data = item.slice(0, 3)
          setImoProList(data)
          splicingCardRender(data)
          setLoadStatus(false)
        } else {
          if(!loadStatus) setLoadStatus(true)
        }
      })
    }

    // 获取活动统计
    const requestGetSum = () => {
      imo.getSum({user_addr: contract.accounts ? contract.accounts : defaultAddress, get_token_symbol: airdropCoin}).then((res) => {
        console.log('获取活动统计:', res)
        if (res.code === 0) { 
          if(Object.keys(res.data).length) {
            setAccountObj({
              amount1: _numComma(res?.data?.token?.amount),
              amount2: _numComma(res?.data?.lp?.amount),
              num: res?.data?.totalAddrNum
            })
          }
        } 
      })
    }

    const handle = () => {
      requestProList()
    }

    if(sk) {
      Bus.addListener('updataImoList', handle)
      requestProList()
      requestGetSum()
    }
    
    return () =>{
      Bus.removeListener('updataImoList', handle)
    }

  },[sk]) //eslint-disable-line react-hooks/exhaustive-deps


  // 路由跳转
  const routerJumpHandle = (id, splicingStatus) => {
    if (!splicingStatus) history.push({pathname: `/detail/${id}`}) 
  }

  // 更多跳转
  // const moreUrlHandle = () => {
  //   history.push({pathname: `/list`}) 
  // }

  // 拼接廣告位數據
  const splicingCardRender = (items) => {
    const splicingSize = 3 - items.length
    if(splicingSize > 0) {
      const data = new Array(splicingSize).fill({
        img: first, 
        time: bannerTextObj['StartStatus'],
        name: bannerTextObj['CardTitle'],
        splicingStatus: 1
      })
      setImoProList(items.concat(data))
    }
  }

  // 廣告位渲染
  const cardRender = () => {
    let list = []
    imoProList.forEach((item, index) => {
      list.push(
        <li key={`cardRender${index}`} style={(config.device === 'pc' && imoProList.length < 3) ? contSet.mrDis(30) : {} } onClick={() => routerJumpHandle(item.contract_addr, item.splicingStatus)}>
          <div className={styles.flex}>
            <div className={styles.cardPic}>
              <img src={item.splicingStatus ? item.img : _coinAddress(sk, item.get_token_addr, 2)} alt="" />
            </div>
            <div>
              <p className={styles.cardTitle}>{_transferParam(item, la, 'name')}</p>
              <div className={styles.cardTime}>
                {item.splicingStatus ? item.time : `${_formatDate((item.start_time)*1000, 12)} SGT ${bannerTextObj['Start']}`} 
                <span></span>
              </div>
            </div>
          </div>
        </li>
      )
    })
    return list
  }
  
  return (
    <div className={`${styles.banner} ${styles[sk ? sk : defaultChain]}`}>
      <div className={styles.main}>
        <div className={styles.content} >
          <p className={styles.title}>{bannerTextObj['Title'](itemName)}</p>
          <div className={styles.introduce}>
            <span></span>
            <div className={styles.account}>
              <p>{bannerTextObj['account2'](pledgeCoin1)} {accountObj.amount1}</p>
              <p>{bannerTextObj['account2'](pledgeCoin2)} {accountObj.amount2}</p>
              <p>{bannerTextObj['account1'](airdropCoin)} {accountObj.num}</p>
            </div>
          </div>
          <div className={styles.curve}><img src={config.device === 'pc' ? curve : h5Curve} alt=''/></div>
          <p className={styles.protext}>{bannerTextObj['Rollout']}</p>
        </div>
        <div className={styles.picture} id='aaa' data-name="ninja" name="ninja"></div>
      </div>
      <div className={styles.card}>
        <Spin tip={`${supplementTextObj['Loading']}...`} spinning={loadStatus} size="large">
          <ul className={`${imoProList.length > 2 ? styles.itemWrap : '' }`}>
           {size > 0 ? cardRender() : (<div className={styles.noData}>{!loadStatus && ''}</div>)}
          </ul>
        </Spin>
      </div>
      {/* <div className={styles.more} onClick={() => moreUrlHandle()}>{bannerTextObj['ShowProject']}</div> */}
    </div>
  )
}

export default inject('store')(observer(Banner))
