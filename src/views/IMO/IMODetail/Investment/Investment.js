import React from 'react'
import BigNumber from 'bignumber.js'
import { observer } from 'mobx-react'
import { _substrAddress, _hashQueryAddress, _numComma, _intercept} from '@/assets/utils/comMethod'
import styles from './Investment.module.scss'
import Nodata from '@/layouts/NoData/NoData'
import store from '@/store/index'

const Investment=(props)=>{

    // 引入store數據
    const { lang, config, skin } = store
    // param:歷史記錄 data：詳情數據
    const { param, data, info } = props
    // 鏈類型
    const sk = skin.skinSign
    // 設備判斷
    const terminal = (config.device === 'pc')
    // 语言
    const la = lang['language']
    // 国际化
    const investmentText = lang[la]['Investment']
    
    // 参与记录列表展示
    const proHistoryRender = () => {
        const list = []
        param.forEach((item, index) => {
            list.push(<div className={styles.content_li} key={`${proHistoryRender}${index}`}>
                <p className={styles.one}>{index + 1}.</p>
                {terminal && <p className={styles.three}>{_numComma(item.amount, 4)} {`${data.to_token_symbol}`} </p>}
                <p className={styles.four}><a target='_blank' href={_hashQueryAddress(item.tx_hash, sk)} rel="noreferrer">{_substrAddress(item.tx_hash)}</a></p>
                <i></i>
            </div>) 
        })
        return list
    }

    return(
      <div className={styles.main}>
        {
            param.length > 0 ? (
                <React.Fragment>
                    <section>
                        <h1 className={styles.title}>{investmentText['PledgeHistory']}</h1> 
                        <div className={styles.content}>
                            {proHistoryRender()}
                        </div>
                    </section>
                    <section className={styles.content_bottom}>
                        <ul>
                            <li>
                                <span>{investmentText['PledgeMoney']}</span>
                                <span className={styles.lp}>{_numComma(info?.to_amount, 4)} {data?.to_token_symbol}</span>
                            </li>
                            <li>
                                <span>{investmentText['MyShare']}</span>
                                <span className={styles.lp}>{_intercept(new BigNumber(info?.my_share).times(100).toString(10), 2)}%</span>
                            </li>
                            <li>
                                <span>{investmentText['DestroyIncome']}</span>
                                <span className={styles.lp}>{_numComma(info?.burn_amount, 4)} MDX</span>
                            </li>
                            <li>
                                <span>{investmentText['RewardAmount']}</span>
                                <span className={styles.lp}>{_numComma(info?.get_amount, 4)} {data?.get_token_symbol}</span>
                            </li>
                        </ul>
                    </section>
                </React.Fragment>
            ) : <Nodata />
        }
      </div>
    )
}

export default (observer(Investment))