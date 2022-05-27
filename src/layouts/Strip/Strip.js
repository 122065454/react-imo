import React, { useState, useEffect } from 'react';
import { _accMul, _accDiv } from '@/assets/utils/accuracy'
import { _sliceData, _numComma, _deleteSymble } from '@/assets/utils/comMethod'
import { contSet } from '@/assets/utils/comCss'
import styles from './Strip.module.scss'
import { observer } from 'mobx-react'
import store from '@/store/index'

const Strip = ( props )=> {

  const { lang, skin, config } = store

  const activeTextObj = lang[lang['language']]['Active']

  const terminal = (config.device === 'pc')

  const [item, setItem] = useState({
    toTokenVotedAmount: 0,
    toTokenTotalAmount: 0,
    toTokenSymbol: 'LP',
    status: 1,
    tokenSymbol: 'FFF',
    toTokenPrice: 0,
  });

  const [maxW, setMaxW] = useState(340)

  const [enlargeStatus, setEnlargeStatus] = useState(false)

  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    setItem(props.param)
    const getTotal = props.param.getTokenTotalAmount
    const toTotal = props.param.toTokenTotalAmount
    if(getTotal && toTotal) setRatio(_sliceData(_accDiv(getTotal, toTotal), 8, true))
    if(terminal && props.maxW) setMaxW(props.maxW)
    if(terminal && props.enlargeStatus) setEnlargeStatus(props.enlargeStatus)

  },[props.param, props.maxW, props.enlargeStatus])// eslint-disable-line react-hooks/exhaustive-deps

  // 智能链
  const sk = skin.skinSign

  const undone = item.status === 4 && (item.toTokenVotedAmount < item.toTokenTotalAmount)

  const per = _accMul(_accDiv(item.toTokenVotedAmount, item.toTokenTotalAmount), 100)

  // 设置募集宽度
  const setWidthHandle = (val) => {
    if (Number(val)) {
      if (terminal) {
        const W = val/100*maxW
        return  W > maxW ? maxW : W
      } else {
        return `${(val)}%`
      }
    }
    return 0
  }
  
  return (
    <div className={`${styles[sk]}`} style={terminal ? {width: maxW} : {}}>
      <div className={styles.cardMid} style={undone ? contSet.mtDis(10) : {} }>
        <div className={`${styles.desc} ${enlargeStatus ? styles.enlarge : ''}`}>
          <span>{`1${item.getTokenSymbol} ≈ ${_sliceData(1/ratio, 8, true)} ${_deleteSymble(item.toTokenSymbol)}`}(<b>≈${_numComma(item.toTokenPrice/ratio)}</b>)</span>
          <span className={styles.switch}><b style={enlargeStatus ? {color: '#E02020'}: {}}>{item.participated}</b> {activeTextObj['Participated']}</span>
        </div>
        <div className={styles.progressBar} style={terminal ? {width: maxW} : {}}>
          <div className={styles.full} style={{width: setWidthHandle(per)}}></div>
        </div>
        <div className={`${styles.desc} ${enlargeStatus ? styles.enlarge : ''}`}>
          <span>{_numComma(per)}%</span>
          <span><i className={styles.number}>{_numComma(item.toTokenVotedAmount)}</i>{`/${_numComma(item.toTokenTotalAmount)} ${_deleteSymble(item.toTokenSymbol)}`}</span>
        </div>
        <p className={styles.transferM}><i>≈${_numComma(_accMul(item.toTokenTotalAmount, item.toTokenPrice))}</i></p>
      </div>
    </div>
  )
}

export default observer(Strip)
