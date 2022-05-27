import { observer } from 'mobx-react'
import { notification, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React, { useState, useEffect, useCallback } from 'react'
import { _claimOperate, _isClaimOperate } from '@/assets/utils/publicErc20'
import { _numComma, _hashQueryAddress, _substrAddress } from '@/assets/utils/comMethod'
import hecoConfirm2 from './img/heco_confirm2.png'
import { contSet } from '@/assets/utils/comCss'
import bscConfirm from './img/bsc_confirm.png'
import styles from './GetAssets.module.scss'
import  { dn } from '@/assets/utils/comCss'
import close from './img/close.png'
import store from  '@/store/index'

const GetAward = ( props )=> {

  // 語言、皮膚
  const { lang, skin, contract } = store
  // 用戶錢包地址
  const account = contract?.accounts
  // 彈出狀態
  const [status, setStatus] = useState(false);
  // 语言
  const la = lang['language']
  // 國際化
  const popTextObj = lang[la]['Pop']
  const btnTextObj = lang[la]['Btn']
  // 智能链
  const sk = skin.skinSign
  // 設置按鈕狀態
  const [btnStatus, setBtnStatus] = useState(1)
  const [data, setData] = useState({})
  // 默认提过
  const [extractStatus, setExtractStatus] = useState(true)
  // 关闭弹窗
  const closeHandle = () => {
    setStatus(!status)
    props.callback(!status)
  }

  // 提示框
  const openNotificationWithIcon = (type, address) => {
    notification[type]({
      description: (
        <div>
          <p>{`${popTextObj['Retrieve']} ${data.to_token_symbol} ${popTextObj[type]}`}</p>
          {address && <a href={_hashQueryAddress(address, sk)} target='_blank' rel="noreferrer">{`${popTextObj['ViewOn']} ${la === 'en' ? sk : ''}`}</a>}
        </div>
      )
    })
  }

  // 提取收益
  const settleUserToken = useCallback(() => {
    if(data?.contract_addr && account) {
      _claimOperate(data?.contract_addr).then(async res => {
        const approveInfo = await res.wait()
        const txId = approveInfo.transactionHash
        setBtnStatus(2)
        if(approveInfo.status === 1) {
          setBtnStatus(3)
          openNotificationWithIcon('success', txId)
          closeHandle()
        } else {
          setBtnStatus(1)
          openNotificationWithIcon('error', txId)
        }
      }).catch(() => {
        openNotificationWithIcon('error', '')
      })
    }
  }, [account, data])

  useEffect(() => {
    setData(props.data)
    const initFun = async() => {
      // 初始化按钮状态
      setBtnStatus(1)
      // 设置弹出状态
      setStatus(props.status)
      if(data?.contract_addr && account) {
        const extract = await _isClaimOperate(data?.contract_addr, account)
        setExtractStatus(extract)
      }
    }
    initFun()
  },[props.status, props.data])

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />

  return (
    <div className={`${styles.popWrap} ${styles[sk]}`} style={status ? {} : dn()}>
      <div className={styles.pop}>
        <div className={styles.close}>
          <img src={close} alt='' onClick={() => closeHandle()}/>
        </div>
        <p className={styles.title}>{popTextObj['ExtractIncome']}</p>
        <div className={styles.list}>
          <div className={styles.item}>
            <p>{popTextObj['AirdropAwarn']}</p>
            <div className={styles.inputWrap}>
              <input value={extractStatus ? 0 : data?.info?.get_amount} disabled/>
              <span className={styles.leftUnit}>{`${data?.get_token_symbol}`}</span>
            </div>
          </div>
        </div>
        <div className={styles.btnWrap}>
          <React.Fragment>
            {
              btnStatus === 1 && (
                <button 
                disabled={extractStatus} 
                className={ !extractStatus ? styles.takeCoin : ''} 
                onClick={() => settleUserToken()}>
                {popTextObj['Extract']}
              </button>
              )
            }
            {
              btnStatus === 2 && (
                <button className={styles.confirmLoadingCoin}><Spin indicator={antIcon} /><span style={contSet.plDis(15)}>{`${btnTextObj['Confirming']}`}</span></button>
              )
            }
            {
              btnStatus === 3 && (
                <button className={styles.confirmSuccessCoin}>
                    <img src={sk ==='BSC' ? bscConfirm : hecoConfirm2} alt='' />
                    {`${data.to_token_symbol} ${btnTextObj['Acquired']}`}
                </button>
              )
            }
          </React.Fragment>  
        </div>
        {
          sk === 'BSC' && (
            <div className={styles.tipsWrap}>
              <div>{popTextObj['ClaimTextTitle']}</div>
              <p>{popTextObj['ClaimText1']}</p>
              <p>{popTextObj['ClaimText2']}</p>
              <div className={styles.link}>
                <span>{popTextObj['ContractAddress']}</span>
                <a target='_blank' rel ='noreferrer' href={_hashQueryAddress(data.get_token_addr, 'HECO', 'token')}>{_substrAddress(data.get_token_addr)}</a>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default observer(GetAward)
