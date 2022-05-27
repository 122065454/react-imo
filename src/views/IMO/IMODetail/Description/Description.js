import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react';
import { _transferParam } from '@/assets/utils/comMethod'
import styles from './Description.module.scss'
import store from '@/store/index'

const Description=(props)=>{

    const { lang } = store 

    // 语言
    const la = lang['language']
    
    // 获取国际化对象
    const popTextObj = lang[la]['Desc']

    const [item, setItem] = useState({
        name: 'FFF',
        party_website: '',
        party_twitter: '',
        party_facebook: '',
        party_telegram: '',
        party_github: '',
        desc: '',
        desc_en: '',
        desc_zh: '',
        name_en: '',
        name_zh: '',
    })

    useEffect(() => {
        if(Object.keys(props.param).length) setItem(props.param)
    },[props.param])

    return(
       <div className={styles.main}>
            <h1>{popTextObj['ProName']}</h1>
            <h2>{_transferParam(item, la, 'name')}</h2>
            <h1>{popTextObj['ProDes']}</h1>
            <h5>{_transferParam(item, la, 'desc')}</h5>
            <h1>{popTextObj['Contact']}</h1>
            <h3>{popTextObj['WebSide']} &nbsp; <a href={item.party_website} target="_blank" rel="noopener noreferrer">{item.party_website}</a> </h3>
            <h3>{popTextObj['Twitter']} &nbsp; <a href={item.party_twitter} target="_blank"  rel="noopener noreferrer">{item.party_twitter}</a> </h3>
            <h3>Facebook: &nbsp; <a href={item.party_facebook} target="_blank"  rel="noopener noreferrer">{item.party_facebook}</a> </h3>
            <h3>Telegram: &nbsp; <a href={item.party_telegram} target="_blank"  rel="noopener noreferrer">{item.party_telegram}</a> </h3>
            <h3>Github:&nbsp; <a href={item.party_github} target="_blank"  rel="noopener noreferrer">{item.party_github}</a> </h3>
       </div> 
    )
}

export default (observer(Description))