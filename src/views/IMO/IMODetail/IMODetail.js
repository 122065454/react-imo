import { Tooltip } from 'antd'
import {useParams} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import React,{useState,useEffect, useCallback } from 'react'
import { _coinAddress, _transferParam, _hashQueryAddress, _substrAddress, _numComma, _timeContent } from '@/assets/utils/comMethod'
import { defaultChain, defaultAddress, multiple } from '@/assets/utils/comStatic'
import CurrentCountDown  from '@/layouts/CountDown/CurrentCountDown'
import BlockCountDown  from '@/layouts/CountDown/BlockCountDown'
import PopInvestment from '@/layouts/Pop/Investment/Investment'
import PopGetAssets from '@/layouts/Pop/GetAssets/GetAssets'
import PopGetAward from '@/layouts/Pop/GetAssets/GetAward'
import { getBlockNumber } from '@/assets/utils/publicErc20'
import { _collectLink } from '@/assets/utils/urlMethod'
import PCFooter from '@/layouts/PCFooter/PCFooter'
import H5Footer from '@/layouts/H5Footer/H5Footer'
import PCHeader from '@/layouts/PCHeader/PCHeader'
import H5Header from '@/layouts/H5Header/H5Header'
import Description from './Description/Description'
import Investment from './Investment/Investment'
import { contSet } from '@/assets/utils/comCss'
import styles from './IMODetail.module.scss'
import {useHistory} from 'react-router-dom'
import Bus from '@/assets/utils/eventBus'
import certik from './img/certik.png'
import arrow from './img/arrow.png' 
import topic from './img/topic.png'
import Info from './Info/Info'
import lz from './img/lz.png'
import mw from './img/mw.png'
import pd from './img/pd.png'


const IMODetail = ({ store })=> {

    // 获取初始化方法
    let history = useHistory()
    // 智能鏈、平臺、請求
    const { skin, config, imo, lang, contract } = store
    const account = contract.accounts ? contract.accounts : defaultAddress
    // 設備判斷
    const terminal = (config.device === 'pc')
    // 詳情數據
    const [item, setItem] = useState({})
    // tab下标
    const [ind, setInd] = useState(0)
    // 控制投资弹框显示
    const [investmentShow, setInvestmentShow] = useState(false)
    // 控制提取本金弹框显示
    const [assetsShow, setAssetsShowShow] = useState(false)
    // 控制提取收益弹框显示
    const [awardShow, setAwardShow] = useState(false)
    // 投注列表
    const [proHistory, setProHistory] = useState([])
    // 个人投注详情
    const [proInfo, setProInfo] = useState({})
    // 是否为锁仓(默认true锁仓)
    const [isLock, setIsLock] = useState(true)
    // 智能链
    const sk = skin.skinSign
    // 语言
    const la = lang['language']
    // 產品合约地址
    let { id } = useParams()
    // 国际化
    const activeText = lang[la]['Active']
    const tabText = lang[la]['Tab']
    const btnText = lang[la]['Btn']
    const supplementText = lang[la]['Supplement']
    const popText = lang[la]['Pop']

    // 链接列表
    const linkList = _collectLink({la, sk})

    // 获取项目详情
    const requestProInfo = () => {
        imo.getImoProInfo({contract_addr: id, user_addr: contract.accounts ? contract.accounts : defaultAddress}).then(async(res) => {
            console.log('获取项目详情:', res)
            if (res.code === 0) { 
                setItem(res.data)
                setProInfo(res.data.info)
                if([3, 4].includes(res.data.status)) isLockHandle(res.data.un_lock_block)
            }
        })
    }

    // 获取服务器时间
    const requestServerTime = () => {
        imo.getServerTime({user_addr: contract.accounts ? contract.accounts : defaultAddress}).then((res) => {
            console.log('获取服务器时间(s):', res)
            if (res.code === 0) { 
                if(res.data) imo.saveServerTime(res.data.time)
            }
        })
    }

    // 初始化调用
    useEffect(() => {
        // 如果没带产品ID跳转404
        if (!id) history.push({pathname: `/404`}) 
        requestProInfo()
        requestServerTime()
    },[id, account])

    // 监听account变化重置tab下标
    useEffect(() => {
        if(!account && ind !== 0) setInd(0) 
    },[account])

    // 添加详情监听
    useEffect(() => {
        Bus.addListener('updataInfo', contralCardFun)
        return () =>{
            Bus.removeListener('updataInfo', contralCardFun)
        }
    },[])

    // 更新当前页面
    const contralCardFun = useCallback(()=> {
        requestProInfo()
        requestServerTime()
    },[])

    // 是否为锁仓中
    const isLockHandle = async(endBlock) => {
        const block = await getBlockNumber()
        console.log('当前区块高度:', block)
        if(endBlock !== 0) setIsLock(endBlock >= block)
    }
    
    // 获取用户参与记录
    const requestProHistory = () => {
        imo.getImoProHistory({contract_addr : id, user_addr: account}).then((res) => {
            console.log('获取项目投注历史记录:', res)
            if (res.code === 0) { 
                setProHistory(res.data.rows)
            }
        })
    }

    //锁仓时间
    const lockupTime = _timeContent( item.to_token_symbol==='MDX' ? parseInt((+item.expect_lock_time - item.end_time)*multiple) : +item.expect_lock_time - item.end_time)

    // 图标展示
    const icoRender = (array) => {
        const icoList = { '1':certik, '2':pd, '3':mw, '4':lz }
        const list = []
        Object.keys(icoList).forEach((kind, index) => {
            if(array.includes(kind)) list.push(<div className={styles.ico} key={`${icoRender}${index}`}><img src={icoList[kind]} alt=""/></div>)
        })
        return list
    }

    // 活动状态展示
    const activeStatusRender = (option) => {
        const { status, start_time, end_time} = option
        console.log({start_time, end_time, serverTime: imo.serverTime})
        const activeList = {
            '1': {text: activeText['ComeS'], color: '#1B89FF'},
            '2': {text: activeText['PledgeEnd'], color: '#009A7F'},
            '3': {text: activeText['Inli'], color: '#5400C1'},
            '4': {text: activeText['over'], color: '#E02020'}
        }
        const color = activeList[status]['color']
        return (
            <React.Fragment>
                <div className={`${styles.center} ${status === 2 ? styles.wallRight : ''}`}>
                    <div className={`${styles.pos} ${styles.activeStatus}`} style={{borderColor: color}}>
                        <span style={{color}}>{activeList[status]['text']}</span>
                        {[1, 2].includes(status) && (
                            <CurrentCountDown 
                                endTime={status === 1 ? start_time: end_time } 
                                nowTime={imo.serverTime}  
                                callback={contralCardFun}
                            />
                        )}
                    </div>
                </div>
                {status === 3 && <div className={styles.inli}>{activeText['InliDesc']}</div>}
            </React.Fragment>
        )
    }

    // tab标签展示
    const tabSignRender = () => {
        const tabList = contract.accounts ? ['Info', 'Description', 'MyIn'] : ['Info', 'Description']
        const list = []
        tabList.forEach((kind, index) => {
            list.push(<span className={`${ind === index ? styles.active : ''}`} onClick={() => switchSignHandle(index)} key={`${tabSignRender}${index}`}>{tabText[kind]}</span>)
        })
        return list
    }

    // tab切换事件触发
    const switchSignHandle = (val) => {
        if(ind !== val) {
            if(val === 2) requestProHistory()
            setInd(val)
        }
    }

    // tab切换内容切换
    const switchContentHandle = () => {
        switch(ind){
            case 0: return <Info param={item}/> 
            case 1: return <Description param={item}/>
            case 2: return <Investment param={proHistory} data={item} info={proInfo}/> 
        } 
    }

    // 参与投资弹框回调
    const updateInvestmentHandle = (val) => {
        setInvestmentShow(val)
    }

    // 控制参与投资弹框状态
    const investmentHandle = () => {
        setInvestmentShow(!investmentShow)
    }
    
    // 取回资产回调
    const updateAssetsHandle = (val) => {
        setAssetsShowShow(val)
    }

    // 控制取回资产弹框状态
    const assetsHandle = () => {
        setAssetsShowShow(!assetsShow)
    }

    // 控制取回收益回调
    const updateAwardHandle = (val) => {
        setAwardShow(val)
    }

    // 控制取回收益弹框状态
    const awardHandle = () => {
        setAwardShow(!awardShow)
    }

    // 状态锁仓文案展示
    const lockupTextHandle = () => {
        let text = ''
        let tips = ''
        if(item.status === 2) {
            text = activeText['EstimateLockTime']
            tips = activeText['EstimateLockDesc']
        } else {
            if(item.status === 3) {
                if(item.un_lock_block === 0) {
                    text = activeText['EstimateLockTime']
                    tips = activeText['EstimateLockDesc']
                } else {
                    text = activeText['LockupTime']
                    tips = activeText['LockDesc'](item.un_lock_block)
                }
            } else if (item.status === 4) {
                text = activeText['LockupTime']
                tips = activeText['LockDesc'](item.un_lock_block)
            }
        }
        return {text, tips}
    }

    // PC/h5兼容做抽取(右側图标展示) 
    const extractRender = () => {
        return (
            <div className={`${styles.btnWrap} ${item === 3 && styles.inliBar}`}>
                {/* TAB1项目状态展示 */}
                {item?.status === 1 && activeStatusRender(item)}
                {/* TAB2右側按钮展示 */}
                {item?.status === 2 && account && (
                    <div className={`${styles.twoStatus} ${styles.pos}`}>
                        <div className={`${styles.operate}`} onClick={ () => investmentHandle()}>{btnText['Pii']}{item.to_token_symbol}</div>
                        <div>{activeStatusRender(item)}</div>  
                    </div>
                )}
                {/* TAB3项目状态展示 */}
                {item?.status === 3 && (
                    <div className={styles.claimBtn}>
                        {!isLock && <button onClick={ () => assetsHandle()}>{popText['ExtractPrincipal']} {la !== 'zh' && item.to_token_symbol}</button>}
                        {activeStatusRender(item)}
                    </div>
                )}
                {/* TAB4右側按钮展示 */}
                {item?.status === 4 && account && (
                    <div className={`${styles.control} ${styles.pos}`}>
                        <a href={linkList['Liquidity']}>{btnText['Mam']}</a>
                        <a href={linkList['Swap']}>{btnText['Trade']}</a>
                        {!isLock && <button onClick={ () => assetsHandle()}>{popText['ExtractPrincipal']} {la !== 'zh' && item.to_token_symbol}</button>}
                        <button onClick={ () => awardHandle()}>{popText['ExtractIncome']}</button>
                    </div>
                )}
            </div>
        )
    }
  
    return ( 
        <div className={`${styles.wrap} ${styles[sk ? sk : defaultChain]} ${styles[la]}`}>
            <div className={styles.bg}></div>
            {terminal ?  <PCHeader /> : <H5Header />}
            <div className={styles.main}>
                {/* 麵包屑 */}
                <section className={styles.top}>
                    {
                        terminal ? ( 
                            <div className={styles.breadCrumbs}>
                                <span className={styles.back} onClick={()=>window.history.back() }>{supplementText['Return']}</span>
                                <i></i>
                                <span>{supplementText['Product']}</span>
                                <span style={contSet.mlDis(5)}>{`>`}</span> 
                                <span style={contSet.mlDis(5)}>{_transferParam(item, la, 'name')}</span>
                            </div>
                        ) : (
                            <div className={styles.backBar}>
                                <img src={arrow} alt='' onClick={()=>window.history.back() } />
                                <span>{_transferParam(item, la, 'name')}</span>
                            </div>
                        )                  
                    }
                </section>
                <section className={styles.header}>    
                    {/* 左側頭像 */}
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <div className={styles.circle}><img src={_coinAddress(sk, item.get_token_addr, 2)} alt=''/></div> 
                            <div>
                                <div className={styles.titleCon}>
                                    <p>{_transferParam(item, la, 'name')}</p>
                                    <div className={styles.coin}><i></i><span>{item.get_token_symbol}</span></div>
                                </div>  
                                {
                                    sk === 'HECO' && (
                                        <p className={styles.link}>
                                            <a target='_blank' href={_hashQueryAddress(item.get_token_addr, sk, 'token')} rel="noreferrer">{_substrAddress(item.get_token_addr)}</a>
                                            <i></i>
                                        </p>                      
                                    )
                                }
                            </div>
                        </div> 
                        <div className={styles.descBar}>
                            <div>
                                <p>{activeText['Participate']}</p>
                                <p>{item.join_addr_num}</p>
                            </div>
                            <div>
                                <p>{activeText['PledgeAmount']}（{item.to_token_symbol}）</p>
                                <p>{_numComma(item.to_token_voted_amount, 4)}</p>
                            </div>
                            {
                                item.status !== 1 && (
                                    <div>
                                        <p>
                                            <span style={contSet.prDis(5)}>{lockupTextHandle()['text']}</span>
                                            <Tooltip placement="top" title={lockupTextHandle()['tips']}>
                                                <img src={topic} alt='' />
                                            </Tooltip>
                                        </p>
                                        <p>
                                            {item.status === 2 && (
                                                <React.Fragment>
                                                    {lockupTime === 0 ? (<span className={styles.upsize}>{activeText['Calculate']}</span>) : (<span>{lockupTime}</span>)}
                                                </React.Fragment>
                                            )}
                                            {item.status === 3 && (
                                                <React.Fragment>
                                                    {item.un_lock_block === 0 ? <span>{lockupTime}</span> : (
                                                        <React.Fragment>
                                                            {isLock ? (
                                                                <BlockCountDown 
                                                                    endBlock={item.un_lock_block}
                                                                    callback={isLockHandle}
                                                                />
                                                            ) : <span>{activeText['UnLockup']}</span>}
                                                        </React.Fragment>
                                                    )}
                                                </React.Fragment>
                                            )}
                                            {item.status === 4 && (
                                                <React.Fragment>
                                                    {isLock ? (
                                                        <BlockCountDown 
                                                            endBlock={item.un_lock_block}
                                                            callback={isLockHandle}
                                                        />
                                                    ) : <span>{activeText['UnLockup']}</span>}
                                                </React.Fragment>
                                            )}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* 右側图标展示  */}
                    <div className={styles.right}>
                        <div className={styles.icoWrap}>{item.approve && icoRender(item.approve)}</div>
                        { terminal &&  extractRender()}
                    </div>      
                </section>
                { !terminal &&  extractRender()}
                {/* Tab切换 */}
                <section className={styles.middle}>   
                    {/* Tab切换标签 */}
                    <div className={styles.tabSign}>{tabSignRender()}</div>
                    {/* Tab切换内容 */}
                    {switchContentHandle()}
                </section>
            </div>   
            {/* 底部分割线 */}
            <div className={styles.line}></div>
            {/* 参与投资弹框 */}
            <PopInvestment callback={updateInvestmentHandle} data={item} status={investmentShow}/>
            {/* 取回本金弹框 */}
            <PopGetAssets callback={updateAssetsHandle} data={item} status={assetsShow}/>
            {/* 取回收益弹框 */}
            <PopGetAward callback={updateAwardHandle} data={item} status={awardShow}/>
            { terminal ?  <PCFooter /> : <H5Footer /> }
        </div>
    )
}

export default inject('store')(observer(IMODetail))
