import React from 'react'
import { Tooltip } from 'antd'
import BigNumber from 'bignumber.js'
import { observer } from 'mobx-react'
import {useHistory} from 'react-router-dom'
import { _coinAddress, _numComma, _transferParam, _formatDate, _timeContent, _intercept } from '@/assets/utils/comMethod'
import CurrentCountDown  from '@/layouts/CountDown/CurrentCountDown'
import BlockCountDown  from '@/layouts/CountDown/BlockCountDown'
import { multiple } from '@/assets/utils/comStatic'
import { contSet } from '@/assets/utils/comCss'
import Bus from '@/assets/utils/eventBus'
import styles from './Card.module.scss'
import audit from './img/audit.png'
import topic from './img/topic.png'
import store from '@/store/index'

const Card = (props)=> {

  let history = useHistory()

  const { lang, skin, imo } = store
  
  const { param, subscript } = props

  const { 
    status, 
    approve,
    join_addr_num,
    contract_addr, 
    to_token_addr, 
    get_token_addr, 
    to_token_symbol, 
    get_token_price,
    get_token_symbol, 
    expect_lock_time, 
    end_time, start_time, 
    to_token_voted_amount,
    get_token_total_amount4usdt,
    un_lock_block,
    to_amount,
    my_share,
    get_amount
  } = param
  
  // 语言
  const la = lang['language']
  
  // 智能链
  const sk = skin.skinSign

  // 国际化
  const activeText = lang[la]['Active']

  // 状态样式区分
  const statusClassHandle = (val) => {
    return `${styles.status} ${styles[`status${val}`]}`
  }

  // 状态文字区分
  const statusTextHandle = (val) => {
    const textList = {
      1: activeText['ComeS'],
      2: activeText['Progress'],
      3: activeText['Inli'],
      4: activeText['Over'],
      5: activeText['Lockup']
    }
    return textList[val]
  }

  // 路由跳转
  const routerJumpHandle = () => {
    if (status !== 5) {
      history.push({pathname: `/detail/${contract_addr}`}) 
    }
  }

  // 卡片回調
  const contralCardFun = () => {
    // subscript标记---1：预热/进行/结算中  2:锁仓 
    Bus.emit('updataImoList', subscript)
  }

  // 判断是否解锁(true解锁/false锁仓)
  const isunLock = (endBlock) => {
    if(endBlock !== 0) {
      return endBlock <= props.blockNumber
    } else {
      return false
    }
  }

  // 获取卡片第一行数据列表
  const fistRowHandle = () => {
    const list = {
      1: { 
        oneText: 'AirdropAmount', 
        oneVal: `$${_numComma(get_token_total_amount4usdt)}`, 
        twoText: 'AirdropPrice', 
        twoVal: `$${_numComma(get_token_price)}`
      },
      2: { 
        oneText: 'Participate', 
        oneVal: join_addr_num, 
        twoText: 'PledgeAmount', 
        twoVal: _numComma(to_token_voted_amount, 4)
      },
    }
    if(status === 1) {
      return list[1]
    } else {
      return list[2]
    }
  }

  // 获取卡片第二行数据列表
  const twoRowHandle = () => {
    const list = {
      1: { 
        oneText: 'Begin', 
        oneVal: _formatDate(start_time*1000, 13), 
        oneTips: 'BeginDesc',
        twoText: 'End', 
        twoVal: _formatDate(end_time*1000, 13),
        twoTips: 'EndDesc',
      },
      2: { 
        oneText: 'End', 
        oneVal: _formatDate(end_time*1000, 13), 
        oneTips: 'EndDesc',
        twoText: 'EstimateLockTime', 
        twoVal: _timeContent( to_token_symbol==='MDX' ? parseInt((+expect_lock_time - end_time)*multiple) : +expect_lock_time - end_time),
        twoTips: 'EstimateLockDesc',
      },
      3: {
        oneText: 'MyPledge', 
        oneVal: _numComma(to_amount, 2), 
        twoText: 'MyShare', 
        twoVal: my_share ? _intercept(new BigNumber(my_share).times(100).toString(10), 2) : 0.00, 
        threeText: 'AwardAmount', 
        threeVal: _numComma(get_amount, 2), 
      }
    }
    if (subscript === 4) {
      return list[3]
    } else {
      if(status === 1) {
        return list[1]
      } else if([2, 3, 5].includes(status)){
        return list[2]
      } else {
        return []
      }
    }
  }

  // 卡片第一行数据列表
  const fistRowData = fistRowHandle()

  // 卡片第二行数据列表
  const twoRowData = twoRowHandle()

  return (
    <div className={`${styles.card} ${status === 4 && subscript === 4 && styles.over}  ${status === 3 && styles.clear} ${styles[skin.skinSign]}`} onClick={() => routerJumpHandle()}>
      <div className={styles.cardTop}>
        <div className={styles.content}>
          <div className={styles.titleBar}>
            <div className={styles.proPic}>
              <img src={_coinAddress(sk, get_token_addr, 2)} alt=''/>
            </div>
            <div>
              <p className={styles.title}>{_transferParam(param, la, 'name')}
              {approve ? <img src={audit} alt=''/> : ''} 
              </p>
              <span className={styles.coin}>
                <span></span>
                <i>{get_token_symbol}</i>
              </span>
            </div>
          </div>
          <div className={styles.timeBar}>
            <div className={statusClassHandle(status)}>{statusTextHandle(status)}</div>
            {/* 控制状态扭转-默认隐藏 */}
            <p className={styles.time}>
              {
                [1,2].includes(status) ? (
                  <CurrentCountDown 
                    endTime={status === 1 ? start_time: end_time } 
                    nowTime={imo.serverTime}  
                    callback={contralCardFun}
                  />
                ) : ""
              }
            </p>
            <div className={styles.coinPic}>
              {to_token_addr && get_token_addr && (
                <Tooltip placement="right"  title={`${activeText['PopText1']} ${to_token_symbol} token`} >
                  <img src={_coinAddress(sk, `${to_token_addr.substring(to_token_addr.length-6)}${get_token_addr.substring(get_token_addr.length-6)}`, 1)} alt='' />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 卡片第一行参数 */}
      <div className={styles.cardFot}>
        <div className={styles.desc}>
          <p>{activeText[fistRowData['oneText']]}</p>
          <p>{fistRowData.oneVal}</p>
        </div>
        <div className={styles.desc}>
          <p>{activeText[fistRowData['twoText']]}{status !== 1 && ` (${to_token_symbol})`}</p>
          <p>{fistRowData.twoVal}</p>
        </div>
      </div>
      {/* 卡片第二行参数 */}
      {subscript === 4 ? (
        <div className={styles.cardFot}>
          <div className={styles.desc}>
            <p>{activeText[twoRowData['oneText']]}</p>
            <p>{twoRowData.oneVal} {to_token_symbol}</p>
          </div>
          <div className={styles.desc}>
            <p>{activeText[twoRowData['twoText']]}</p>
            <p>{twoRowData.twoVal}%</p>
          </div>
          <div className={styles.desc}>
            <p>{activeText[twoRowData['threeText']]}</p>
            <p>{twoRowData.threeVal} {get_token_symbol}</p>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {
            status !== 4 && (
              <div className={styles.cardFot}>
                {status === 3 ? (
                  // 第二行第一参数
                  <div className={styles.desc}>
                    <p>
                      <span style={contSet.prDis(5)}>{activeText['LockEndTime']}</span>
                      <Tooltip placement="bottom" title={activeText['LockEndTimeDec'](un_lock_block)}>
                        <img src={topic} alt='' />
                      </Tooltip>
                    </p>
                    <p><span>{ to_token_symbol==='MDX' ? _formatDate(((expect_lock_time - end_time)*6.475 + end_time)*1000, 13) : _formatDate(+expect_lock_time*1000, 13)}</span></p>
                  </div>
                ) : (
                  <div className={styles.desc}>
                    <p>
                      <span style={contSet.prDis(5)}>{activeText[twoRowData['oneText']]}</span>
                      {
                        !([1, 2].includes) && (
                          <Tooltip placement="bottom" title={activeText[twoRowData['oneTips']]}>
                            <img src={topic} alt='' />
                          </Tooltip>
                        )
                      }
                    </p>
                    <p><span>{twoRowData['oneVal']}</span></p>
                  </div>
                ) }
                {/* 第二行第二参数 */}
                <div className={styles.desc}>
                  <p>
                    <span style={contSet.prDis(5)}>{status === 5 || (status === 3 && isunLock(un_lock_block)) ? activeText['LockupTime'] : activeText[twoRowData['twoText']]}</span>
                    {
                      status !== 1 && (
                        <Tooltip placement="bottom" title={status === 5 || (status === 3 && isunLock(un_lock_block)) ? activeText['LockDesc'](un_lock_block) : activeText[twoRowData['twoTips']]}>
                          <img src={topic} alt='' />
                        </Tooltip>
                      )
                    }
                  </p>
                  {/* 锁仓时间处理 */}
                  <p>
                    {status === 1 && <span>{twoRowData['twoVal']}</span>}
                    {status === 2 && (
                      <React.Fragment>
                        {twoRowData['twoVal'] === 0 ? (<span className={styles.upsize}>{activeText['Calculate']}</span>) : (<span>{twoRowData['twoVal']}</span>)}
                      </React.Fragment>
                    )}
                    {status === 3 && ( <span>{isunLock(un_lock_block) ?  activeText['UnLockup'] : twoRowData['twoVal']}</span>)}
                    {status === 5 && (
                      <BlockCountDown 
                        endBlock={un_lock_block}
                        callback={contralCardFun}
                      />
                    )}
                  </p>
                </div>
              </div>
            )
          }
        </React.Fragment>
      )}
      {/* 卡片提示-清算中、已结束 */}
      {[3,4].includes(status) && <div className={styles.tipsBar}>{activeText[status === 3 ? 'ClearTips' : 'EndTips']}</div>}
    </div>
  )
}

export default observer(Card)
