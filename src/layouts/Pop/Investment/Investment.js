import { observer } from 'mobx-react'
import { notification, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React, { useState, useEffect, useCallback } from 'react'
import { getBalacne, approveToken, setLocalAllowance, getLocalAllowance, getAllowance, purchaseToken, getPurchasedAmount, _limitOperate } from '@/assets/utils/publicErc20'
import { _hashQueryAddress } from '@/assets/utils/comMethod'
import { check_proving } from '@/assets/utils/checkMethod'
import { _accAdd, _accSub } from '@/assets/utils/accuracy'
import { _collectLink } from '@/assets/utils/urlMethod'
import { pledgeCoin2 } from '@/assets/utils/comStatic'
import hecoDirection from './img/heco_direction.png'
import bscDirection from './img/bsc_direction.png'
import { contSet } from '@/assets/utils/comCss'
import styles from './Investment.module.scss'
import  { dn } from '@/assets/utils/comCss'
import Bus from '@/assets/utils/eventBus'
import close from './img/close.png'
import topic from './img/topic.png'
import store from  '@/store/index'

const Investment = ( props )=> {

  // 语言、皮肤、合约
  const { lang, skin, contract } = store
  // 账户地址
  const account = contract?.accounts
  // 弹出状态
  const [status, setStatus] = useState(false)
  // 投注数量
  const [num, setNum] = useState('')
  // 投注币种资产
  const [balance, setBlance] = useState('0')
  // 改變按鈕狀態 1:授權 2：授權加載中 3：確認 4：確認加載中
  const [btnStatus, setBtnStatus] = useState(1)
  // 用戶縂投資金額toToken
  const [userPurchasedValue , setPurchased] = useState('0')
  //是否开放按钮
  const [btnOpen, setBtnOpen] = useState(true) 
  //错误提示
  const [content, setContent] = useState('') 
  // 详情數據
  const {data} = props
  // 是否为LP
  const isLp = data?.to_token_symbol?.includes('/')
  // 语言
  const la = lang['language']
  // 获取国际化对象
  const popTextObj = lang[la]['Pop']
  const btnTextObj = lang[la]['Btn']
  const CheckTextObj = lang[la]['Check']
  const activeTextObj = lang[la]['Active']
  // 智能链
  const sk = skin.skinSign
  // 链接列表
  const linkList = _collectLink({la, sk})

  // 提示框
  const openNotificationWithIcon = (type, num, name, address, textType) => {
    const listTopic = {
      'apply': `${popTextObj['Approve']} ${name} ${popTextObj[type]}`,
      'inverset': `${popTextObj['Inus']} ${num} ${name} ${popTextObj[type]}`
    }
    notification[type]({
      description: (
        <div>
          <p>{listTopic[textType]}</p>
          {address && <a href={_hashQueryAddress(address, sk)} target='_blank' rel='noreferrer'>{`${popTextObj['ViewOn']} ${la === 'en' ? sk : ''}`}</a>}
        </div>
      ),
    })
  }

  // 关闭弹窗
  const closeHandle = () => {
    setStatus(!status)
    setContent('')
    setBtnStatus(1)
    setNum('')
    setBtnOpen(true)
    props.callback(!status)
  }

  // 授權某一合約操作
  const approve = useCallback(async() => {
    approveToken(data?.to_token_addr, data?.contract_addr).then(async res => {
      setBtnStatus(2)
      const approveInfo = await res.wait()
      const txId = approveInfo.transactionHash
      if(approveInfo.status === 1) {
        openNotificationWithIcon('success', '', data?.to_token_symbol, txId, 'apply')
        setLocalAllowance(data?.to_token_addr, account, data?.contract_addr)
        setBtnStatus(3)
      } else {
        setBtnStatus(1)
        openNotificationWithIcon('error', '', data?.to_token_symbol, txId, 'apply')
      }
    }).catch((err)=>{
      console.log('合約授權',err)
      openNotificationWithIcon('error', '', data?.to_token_symbol, '', 'apply')
    })
  }, [isLp, status])

  // 確認轉賬
  const despoitToken = useCallback(async() => {
    purchaseToken(data?.contract_addr, num.toString(), data?.to_token_addr, isLp).then(async res => {
      setBtnStatus(4)
      const confirmInfo = await res.wait()
      const txId = confirmInfo.transactionHash
      console.log('confirmInfo', confirmInfo)
      if(confirmInfo.status === 1) { // success
        closeHandle()
        openNotificationWithIcon('success', num, data?.to_token_symbol, txId, 'inverset')
        setPurchased(_accAdd(userPurchasedValue, num))
        Bus.emit('updataInfo')
      } else { 
        setBtnStatus(3)
        openNotificationWithIcon('error', num, data?.to_token_symbol, txId, 'inverset')
      }
    }).catch((err)=>{
      console.log('確認轉賬',err)
      openNotificationWithIcon('error', num, data?.to_token_symbol, '', 'inverset')
    })
  }, [isLp, status, num])


  useEffect(() => {
    const initFun = async() => {
      if(data?.to_token_addr && account) {
        // 查詢用戶某一幣種資產
        const userBlance = await getBalacne(data?.to_token_addr, account, isLp)
        // 凭证质押才需要限制
        const limit  = data?.to_token_symbol === pledgeCoin2 ? await _limitOperate(data?.contract_addr, account) : 0
        console.log('limit', limit)
        // 添加限制
        data.toTokenMaxAmount = limit
        setBlance(userBlance)
        // 獲取用戶縂投資金額
        const userPurchased = await getPurchasedAmount(data?.contract_addr, data?.to_token_addr, account, isLp)
        setPurchased(userPurchased)
        // 查看是否授權過
        const localAllowance = getLocalAllowance(data?.to_token_addr, account, data?.contract_addr)
        if(localAllowance && localAllowance > 0) {
          setBtnStatus(3)
        } else {
          setBtnStatus(1)
          const allowance = await getAllowance(data?.to_token_addr, data?.contract_addr, account)
          if (allowance.toString() > 0) {
            setLocalAllowance(data?.to_token_addr, account, data?.contract_addr)
          }
        }
      }
      setStatus(props.status)
    }
    initFun()
  },[props.status, account, isLp, status])

  // 设置最大值
  const setMaxNumberHandle = () => {
    if (+balance > 0) {
      if (data.toTokenMaxAmount !== 0) {
        let val = 0
        if (Number(balance) >= data.toTokenMaxAmount) {
          val = _accSub(data.toTokenMaxAmount, userPurchasedValue)
        } else {
          val = balance
        }
        if(val > 0) setBtnOpen(false)
        setNum(val)
      } else {
        setBtnOpen(false)
        setNum(balance)
      }
    } else {
      setBtnOpen(true)
    }
  }

  // 保存input值
  const inputChange  = (e) => {
    const val = check_proving(e?.target?.value)
    setNum(val)
    let con = ''
    if (data.toTokenMaxAmount !== 0) {
      if (val && +val > 0) {
        if(Number(val) > Number(balance)) {
          con = `${CheckTextObj['Topic']} ${data?.to_token_symbol}`
        } else {
          if (Number(val) > data.toTokenMaxAmount) {
            con = CheckTextObj['MaxLimit']
          }
          if (Number(val) <= 0) {
            con = CheckTextObj['MinLimit']
          }
        }
        if(con) {
          setBtnOpen(true)
          setContent(con)
        } else {
          setBtnOpen(false)
          setContent('')
        }
      } else {
        setBtnOpen(true)
        setContent('')
      }
    } else {
      if (val && +val > 0) {
        if(Number(val) > Number(balance)) {
          con = `${CheckTextObj['Topic']} ${data?.to_token_symbol}`
        }
        if(con) {
          setBtnOpen(true)
          setContent(con)
        } else {
          setBtnOpen(false)
          setContent('')
        }
      } else {
        setBtnOpen(true)
        setContent('')
      }
    }
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />

  return (
    <div className={`${styles.popWrap} ${styles[sk]}`} style={status ? {} : dn()}>
      <div className={styles.pop}>
        <div className={styles.close}>
          <img src={close} onClick={() => closeHandle()} alt=''/>
        </div>
        <p className={styles.title}>{`${popTextObj['Inus']} ${data?.to_token_symbol}`}</p>
        <p className={styles.canuse}><span>{balance}</span> {`${data?.to_token_symbol} ${popTextObj['Available']}`}</p>
        <div className={styles.inputWrap}>
          <input onChange={(e)=>inputChange(e)} value={num} placeholder='0' />
          <span className={styles.unit}>{`${data?.to_token_symbol}`}</span>
          <span className={styles.max} onClick={() => setMaxNumberHandle()}>Max</span>
        </div>
        {
          content !=='' &&  btnOpen ? (
            <div className={styles.topicBar}>
              <img src={topic} alt='' />
              <span>{content}</span>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )
        }
        {
          data?.to_token_symbol === pledgeCoin2 && (
            <div className={styles.aboutLimit}>
              <p>{`${popTextObj['Limit']}`}
                {data.toTokenMaxAmount === 0 ? activeTextObj['Unlimited'] : (
                  <React.Fragment>
                    <span>{_accSub(data.toTokenMaxAmount, userPurchasedValue)}</span>{`${data?.to_token_symbol }`}
                  </React.Fragment>
                )}
              </p>
              <p>{`${popTextObj['Already']}`}<span>{userPurchasedValue}</span></p>
            </div>
          )
        }
        <div className={styles.btnWrap}>
         {btnStatus === 1 && (<button className={ styles.approve} onClick={approve} >{`${popTextObj['Approve']}`}</button>)}
         {btnStatus === 2 && (<button className={styles.approveLoading}><Spin indicator={antIcon} /><span style={contSet.plDis(15)}>{`${btnTextObj['Approve']}`}</span></button>)}
         {btnStatus === 3 && (<button className={!btnOpen ? styles.confirm : ''} onClick={despoitToken} disabled={btnOpen}>{`${btnTextObj['Confirm']}`}</button>)}
         {btnStatus === 4 && (<button className={styles.confirmLoading}><Spin indicator={antIcon} /><span style={contSet.plDis(15)}>{`${btnTextObj['Confirm']}`}</span></button>)}
        </div>
        <div className={styles.direction}>
          <a href={pledgeCoin2 === data.to_token_symbol ? linkList['Voucher'] : linkList['Swap']} target='_blank' rel="noreferrer">Get ({`${data?.to_token_symbol }`}) now</a>
          <img src={sk === 'BSC' ? bscDirection : hecoDirection} alt="" />
        </div>
      </div>
    </div>
  )
}

export default observer(Investment)
