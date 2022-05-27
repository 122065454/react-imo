import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { _formatDate, _substrAddress, _hashQueryAddress, _numComma, _coinAddress } from '@/assets/utils/comMethod'
import metamask from '@/assets/img/metamask.png'
import styles from './Info.module.scss'
import store from '@/store/index'

const Info=(props)=>{
 
	// 获取store数据
  	const { lang, skin } = store

	// 链
	const sk = skin.skinSign

	// 语言
	const la = lang['language']

	// 国际化
	const infoText = lang[la]['Info']

	// 初始化
	const [item, setItem] = useState({
		start_time: 0,
		end_time: 0,
		get_token_total_amount4usdt: 0,	
		get_token_price: 0, 
		burn_amount: 0,
		get_token_symbol: 'XXX',
		get_token_total_amount: 0,
		TotalSupply: 0, 
		get_token_addr: '0x0000000000000000000000000000000000000000',
	})

	useEffect(() => {
		if(Object.keys(props.param).length) setItem(props.param)
	},[props.param])

	// 快捷钱包添加代币
    const addTokenHandle = ()=> {
		const coinName = item.get_token_symbol.toLowerCase()
		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: item.get_token_addr,
					decimals: 18,
					symbol: coinName,
					image: _coinAddress(sk, item.get_token_addr, 2)
				},
			},
		})
	}

	return (
		<div className={styles.main}>
			<ul className={styles.left}>
				<h1>{infoText['IMOif']}</h1>
				<li> 
					<span>{infoText['Begin']}</span>
					<span className={styles.right_val}>{_formatDate(item.start_time*1000,14)} SGT</span>
				</li>
				<li> 
					<span>{infoText['End']}</span>
					<span className={styles.right_val}>{_formatDate(item.end_time*1000,14)} SGT</span>
				</li>
				<li> 
					<span>{infoText['Award']}</span>
					<span className={styles.right_val}>${_numComma(item.get_token_total_amount4usdt)}</span>
				</li>
				<li> 
					<span>{infoText['Price']}</span>
					<span className={styles.right_val}>${_numComma(item.get_token_price)}</span>
				</li>
				<li> 
					<span>{infoText['Destroy']}</span>
					<span className={styles.right_val}>{_numComma(item.burn_amount, 4)}</span>
				</li>
			</ul>
			<ul className={styles.left}>
				<h1>{infoText['Tokenif']}</h1>
				<li> 
					<span>{infoText['CoinName']}</span>
					<span className={styles.right_val}>{item.get_token_symbol}</span>
				</li>
				<li> 
					<span>{infoText['AwardAccount']}</span>
					<span className={styles.right_val}>{_numComma(item.get_token_total_amount, 4)}</span>
				</li>
				<li> 
					<span>{infoText['TotalSupply']}</span>
					<span className={styles.right_val}>{_numComma(item.get_token_supply, 4)}</span>
				</li>
				{
					sk === 'HECO' && (
						<React.Fragment>
							<li> 
								<span>{infoText['ToAdr']}</span>
								<span className={styles.li_address}>
									<a target='_blank' href={_hashQueryAddress(item.get_token_addr, sk, 'token')} rel="noreferrer">{_substrAddress(item.get_token_addr)}</a>
									<i></i>
								</span>
							</li>
							<li> 
								<span></span>
								<div className={styles.li_metamask} onClick={addTokenHandle}>
									<img src={metamask} alt=""/>
									<span>{infoText['AddCoin'](item.get_token_symbol)}</span>
								</div>
							</li>
						</React.Fragment>
					)
				}
			</ul>
		</div> 
	)
}

export default (observer(Info))