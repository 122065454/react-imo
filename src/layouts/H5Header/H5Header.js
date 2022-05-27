import { Select } from 'antd'
import {useHistory} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import React, { useState, useCallback, useEffect } from 'react'
import { tranferChanId, hidrouterList, defaultChain } from '@/assets/utils/comStatic'
import { connect, changeChain, getProvide } from '@/assets/utils/publicErc20'
import H5SelectLang from '@/layouts/Pop/H5SelectLang/H5SelectLang'
import H5Side from '@/layouts/Pop/H5Side/H5Side'
import styles from './H5Header.module.scss'
import wallet from './img/wallet.png'
import logo from './img/logo.png'
import side from './img/side.png'
import set from './img/set.png'

const { Option } = Select

const H5Header = ({ store })=> {

  let history = useHistory()

  const { skin, contract } = store

  // 智能链
  const sk = skin.skinSign

  const [show, setShow] = useState(false)

  const [slideShow, setSildeShow] = useState(false)

  useEffect(() => { 
    const initFun = async() => { 
      const ethereum = await getProvide()
      if (ethereum) {
        ethereum.request({ method: 'eth_chainId' }).then(chainId => {
          skin.setSkinSign(tranferChanId[chainId])
        })
        // 合约初始连接
        connect().then(accounts => {
          console.log('accounts', accounts[0])
          contract.setAccounts(accounts[0])
        }) 
        // 用户账户改变的时如：切换账户、断开账户
        ethereum.on('accountsChanged', accounts => {
          console.log('accounts', accounts[0])
          contract.setAccounts(accounts[0])
        })
      } else {
        skin.setSkinSign(defaultChain)
      }
    }
    initFun()
  },[])

  // 控制多语言显隐
  const updateHandle = (val) => {
    setShow(val)
  }

  // 控制侧边栏显隐
  const slideHandle = (val) => {
    setSildeShow(val)
  }

  // const connectWallet = useCallback(async() => {
  //   connect().then(accounts => {
  //     contract.setAccounts(accounts[0])
  //   }) 
  // }, [])
  // 手动链接钱包
  const connectWallet = useCallback(async() => { connect() }, [])

  // 根據URL判斷是否展示且鏈
  const chainShowHandle = () => {
    const list = hidrouterList.filter((item) => {
      return history.location.pathname.includes(item)
    })
    if (list.length > 0) return false
    return true
  }

  // 皮肤更改
  const skinHandleChange = async(value) => {
    if (contract.accounts) { 
      let config = {}
      if(value === '56'){
        config= {
          chainId: '0x38',
          chainName: 'BSC Mainnet',
          name: 'BSC',
          symbol: 'BNB',
          rpcUrls: ['https://bsc-dataseed.binance.org'],
          blockExplorerUrls: ['https://bscscan.com/']
        }
      }else{
        config={
          chainId: '0x80',
          chainName: 'Heco Mainnet',
          name: 'Heco',
          symbol: 'HT',
          rpcUrls: ['https://http-mainnet-node.huobichain.com'],
          blockExplorerUrls:['https://hecoinfo.com']
        }
      }
      await changeChain(config)
    }
  }
  
  return (
    <React.Fragment>
      <div className={`${styles.header} ${styles[sk ? sk : defaultChain]}`}>
        <div>
          <img className={styles.side} src={side} alt="" onClick={() => setSildeShow(!slideShow)}/>
          <img className={styles.logo} src={logo} alt=""/>
        </div>
        <div className={styles.setWrap}>
          {
            chainShowHandle() && (
            <Select value={skin.skinSign} onChange={skinHandleChange}>
              <Option value="56">BSC</Option>
              <Option value="128">HECO</Option>
            </Select>
            )
          }
          {
            !contract.accounts ? (<div className={styles.wallet} onClick={connectWallet}><img src={wallet} alt="" /></div>) : <React.Fragment></React.Fragment>
          }
          <div className={styles.set}>
            <img src={set} alt="" onClick={() => setShow(!show)}/>
          </div>
        </div>
      </div>
      <H5SelectLang  callback={updateHandle}  status={show}/>
      <H5Side callback={slideHandle} status={slideShow}/>
    </React.Fragment>
  )
}

export default inject('store')(observer(H5Header))
