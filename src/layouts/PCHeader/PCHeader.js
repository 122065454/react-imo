import { Select } from 'antd'
import { observer, inject } from 'mobx-react'
import React, { useCallback, useEffect } from 'react'
import { tranferChanId, hidrouterList, defaultChain } from '@/assets/utils/comStatic'
import { connect, changeChain, getProvide } from '@/assets/utils/publicErc20'
import { _collectLink } from '@/assets/utils/urlMethod'
import {useHistory} from 'react-router-dom'
import styles from './PCHeader.module.scss'
import logo from './img/logo.png'

const { Option } = Select

const PCHeader = ({ store })=> {

  let history = useHistory()

  const { lang, skin, contract, config } = store

  // 语言
  const la = lang['language']

  // 智能链
  const sk = skin.skinSign

  const navTextObj = lang[la]['Header']

  // 链接列表
  const linkList = _collectLink({la, sk, tm: config.device == 'mobile'})

  useEffect(() => { 
    const initFun = async() => { 
      const ethereum = await getProvide()
      if (ethereum) {
        ethereum.request({ method: 'eth_chainId' }).then(chainId => {
          skin.setSkinSign(tranferChanId[chainId])
        }).catch(() => {
          console.log('未安装小狐狸')
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
  
  // 手动连接合约
  const connectWallet = useCallback(async() => { connect()}, [])

  const navHrefObj = {
    'Home': linkList['Home'],
    'Swap': linkList['Swap'],
    'Pool': linkList['Pool'],
    'Liquidity': linkList['Farm'],
    'Trading': linkList['Trade'],
    'Boardroom': linkList['Boardroom'],
    'Bridge': linkList['Bridge'],
    'Chart': linkList['NewChart'],
    'News': linkList['Notice'],
    'IMO': linkList['IMO'],
    'Buyback': linkList['Buyback']
  }

  // 导航条渲染
  const navRender = () => {
    let list = []
    Object.keys(navHrefObj).forEach((item, index) => {
      if(!(item == 'Chart' && sk == 'BSC')) {
        list.push( <a className={item === 'IMO' ? styles.active : ''} href={navHrefObj[item]} key={`navRender${index}`}>
          {navTextObj[item]}
        </a>)
      }
    })
    return list
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

  // 语言更改
  const lanHandleChange =(index) => { 
    lang.setLang(index)
  }

  // 根據URL判斷是否展示且鏈
  const chainShowHandle = () => {
    const list = hidrouterList.filter((item) => {
      return history.location.pathname.includes(item)
    })
    if (list.length > 0) return false
    return true
  }

  return (
    <div className={`${styles.header} ${styles[sk ? sk : defaultChain]}`}>
      <div className={styles.logo} >
        <a href={navHrefObj['Home']}><img src={logo} alt='' /></a>
      </div>
      <div className={styles.nav}>{navRender()}</div>
      <div className={styles.right}>
        {
          chainShowHandle() && (
          <Select value={skin.skinSign} className={styles.skin} onChange={skinHandleChange}>
            <Option value="56">BSC</Option>
            <Option value="128">HECO</Option>
          </Select>
          )
        }
        {
          !contract.accounts && (<div className={styles.wallet} onClick={connectWallet}>{navTextObj['Connect']}</div>)
        }
        <Select defaultValue={la} className={styles.language} onChange={lanHandleChange}>
          <Option value="en">English</Option>
          <Option value="zh">简体中文</Option>
        </Select>
      </div>
    </div>
  )
}

export default inject('store')(observer(PCHeader))
