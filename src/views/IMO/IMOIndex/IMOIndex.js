import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import PCHeader from '@/layouts/PCHeader/PCHeader'
import H5Header from '@/layouts/H5Header/H5Header'
import Banner from '@/views/IMO/IMOIndex/Banner/Banner'
import Active from '@/views/IMO/IMOIndex/Active/Active'
import Explana from '@/views/IMO/IMOIndex/Explana/Explana'
import PCFooter from '@/layouts/PCFooter/PCFooter'
import H5Footer from '@/layouts/H5Footer/H5Footer'
import Portal from '@/views/IMO/IMOIndex/Portal/Portal'
import { getProvide } from '@/assets/utils/publicErc20'
import { tranferChanId, defaultChain } from '@/assets/utils/comStatic'
import styles from './IMOIndex.module.scss'

const IMOIndex = ({ store })=> {

  const { skin, config, contract } = store

  const terminal = (config.device === 'pc')

  // 智能链
  const sk = skin.skinSign

  let history = useHistory()

  useEffect(() => {
    const initFun = async() => {
      // 判断是否有安装小狐狸
      const ethereum = await getProvide()
      // 切换链的过程：仅出现在HECO切换BSC的时候:断开（disconnect）-链接（connect）-改变（chainChanged）
      if (ethereum) {
        // 用户账户改变的时如：切换账户、断开账户
        ethereum.on('accountsChanged', accounts => {
          contract.setAccounts(accounts[0])
        })
        // 将RPC请求提交到链时如：切链
        ethereum.on('connect', connectInfo => {
          // setChainId(connectInfo.chainId)
        })
        // RPC请求无法提交到任何链如：切链
        ethereum.on('disconnect', () => {
          // setAccount('')
        })
        // 监听链切换
        ethereum.on('chainChanged', chainId => {
          skin.setSkinSign(tranferChanId[chainId])
          history.push({pathname: `/`}) 
        })
        // 消息提醒
        ethereum.on('message', () => {
          console.log('小狐狸消息提醒')
        })
      } else {
        skin.setSkinSign(defaultChain)
      }
    }
    initFun()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className={`${styles.wrap} ${styles[sk ? sk : defaultChain]}`}>
      {
        terminal ?  <PCHeader /> : <H5Header />
      }
      {
        terminal ?  (
          <div className={styles.item}>
            <div className={styles.oneBg}></div>
            <div className={styles.twoBg}></div>
            <Banner />
          </div>
        ) : <Banner />
      }
      <Active />
      {
        terminal ?  (
          <div className={styles.item}>
            <div className={styles.threeBg}></div>
            <Explana />
            <Portal />
          </div>
        ) : <Portal />
      }
      {
        terminal ?  (
          <div className={styles.item}>
            <div className={styles.fourBg}></div>
            <PCFooter />
          </div>
        ): <H5Footer />
      }
    </div>
  )
}
  
export default inject('store')(observer(IMOIndex))
