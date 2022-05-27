

// explana答疑链接
const explanaList = {
  1: {
    en: 'https://mdexdoc.gitbook.io/doc/yong-hu-zhi-nan/imo-initial-mdex-offering/gai-shu',
    zh: 'https://mdexdoc.gitbook.io/doc/v/chinese/yong-hu-zhi-nan/imo-initial-mdex-offering/gai-shu'
  },
  2: {
    en: 'https://mdexdoc.gitbook.io/doc/yong-hu-zhi-nan/imo-initial-mdex-offering/imo-cao-zuo-zhi-nan',
    zh: 'https://mdexdoc.gitbook.io/doc/v/chinese/yong-hu-zhi-nan/imo-initial-mdex-offering/imo-cao-zuo-zhi-nan'
  },
  4: {
    en: 'https://mdexdoc.gitbook.io/doc/v/chinese/yong-hu-zhi-nan/imo-initial-mdex-offering/imo-faq',
    zh: 'https://mdexdoc.gitbook.io/doc/v/chinese/yong-hu-zhi-nan/imo-initial-mdex-offering/imo-faq'
  }
}

// 动画地址
const animateList = {
  'BSC': 'https://cdn.jsdelivr.net/gh/mdexSwap/imo@main/animate/BSC/animate.json',
  'HECO': 'https://cdn.jsdelivr.net/gh/mdexSwap/imo@main/animate/heco/animate.json'
}

/**
 * 获取图标地址
 * @param {String} la   // 语言
 * @param {String} sk   // BSC,HECO,ETH链名称
 */
const _collectLink = ({la, sk, tm=false}) => {
  const hostname = window.location.hostname.replace('imo.', '')
  const setlangPram = () => {
    const list = {
      'en': 'en',
      'zh': 'zh-CN',
      'hk': 'zh-HK'
    }
    return `?lang=${list[la] ? list[la] : list['en']}`
  }
  return {
    // ----------- H5SelectLang ----------
    'Github': 'https://github.com/mdexSwap',
    'Medium': 'https://medium.com/@MdexOfficial/',
    'Telegram': `https://t.me/${la === 'en' ? 'MdexEN' : 'MixDex'}`,
    'Twitter': 'https://twitter.com/Mdexswap',
    'Discord': 'https://discord.com/invite/3TYDPktjqC',
    // 微博['Footer']
    'Weibo': 'https://weibo.com/u/7627233529',
    // -- add: [H5Side, PCFooter]
    'Fund': 'https://docs.google.com/forms/d/e/1FAIpQLSdn9wYhf_jI01nNORQXWgiyGSPKcVTP4fCq2cLYBxINd35vuw/viewform',
    // -- add: [H5Side, PCFooter]
    'Faq': `https://mdexdoc.gitbook.io/doc/${la === 'zh' ? '/v/chinese' : ''}/faq`,
    // -- add: [H5Side, PCHeader]
    'Notice': `https://mdexdoc.gitbook.io/doc${la === 'zh' ? '/v/chinese' : ''}/gong-gao-1`,
    // ------------ [H5Foot, PCHeader] ---------------
    'Home': `https://${hostname}/#/${setlangPram()}`,
    // -- add: [Investment, IMODetail, PCHeader]
    'Swap': `https://${sk === 'BSC' ? 'bsc' : 'ht'}.${hostname}/#/swap${setlangPram()}`,
    // -- add: PCHeader
    'Farm': `https://${hostname}/#/liquidity${setlangPram()}`,
    // -- add: PCHeader
    'Boardroom': `https://${hostname}/#/boardroom${setlangPram()}`,
    // -- add: H5Side
    'IMO': `https://imo.${hostname}/#/${setlangPram()}`,
    // -- add: PCHeader
    'Chart': `${sk === 'BSC' ? `https://bsc-info.${hostname}/` : `https://info.${hostname}/`}`,
    // 行情 ['Header', 'Footer']
    'NewChart': `${sk === 'BSC' ? `https://bsc-info.${hostname}/` : `https://trade.${hostname}/#/${tm ? 'quotes' : ''}${setlangPram()}`}`,
    // ------------ H5Side --------------- 
    'Apply': 'https://docs.google.com/forms/d/e/1FAIpQLSem595jWpO5_A5fRj9W4-wX_3mg3ypqqNiXcC_yi-tpcbOaqA/viewform',
    'Fluidity': 'https://docs.google.com/forms/d/e/1FAIpQLSem595jWpO5_A5fRj9W4-wX_3mg3ypqqNiXcC_yi-tpcbOaqA/viewform' ,
    'Vulnerability': `https://${hostname}/#/priceplan${setlangPram()}`,
    // ------------ Portal ---------------
    'Portal' : 'https://forms.gle/b6SCc4cXzn7apFhk7',
    // ------------ Investment/IMODetail ------------
    'Liquidity': `https://${sk === 'BSC' ? 'bsc' : 'ht'}.${hostname}/#/add/HT${setlangPram()}`,
    // ------------ PCFooter ------------
    'ACText1': 'https://docs.google.com/forms/d/e/1FAIpQLSem595jWpO5_A5fRj9W4-wX_3mg3ypqqNiXcC_yi-tpcbOaqA/viewform',
    'ACText2': 'https://docs.google.com/forms/d/e/1FAIpQLSem595jWpO5_A5fRj9W4-wX_3mg3ypqqNiXcC_yi-tpcbOaqA/viewform',
    'ACText3': 'https://forms.gle/b6SCc4cXzn7apFhk7',
    'Guidance': `https://mdexdoc.gitbook.io/doc${la === 'zh' ? '/v/chinese' : ''}/yong-hu-zhi-nan`,
    // -- add: PCHeader
    'Pool': `https://${sk === 'BSC' ? 'bsc' : 'ht'}.${hostname}/#/pool${setlangPram()}`,
    // -- add: PCHeader
    'Trade': `https://${hostname}/#/trading${setlangPram()}`,
    'ABText2': `https://mdexcom.zendesk.com/hc/${la === 'en' ? 'en-gb' : 'zh-cn'}/sections/360012110672${la === 'en' && '-Adjustment-of-Pool'}`,
    // ------------ PCHeader ------------
    'Bridge': `https://${hostname}/#/bridge${setlangPram()}`,
    'Buyback': `https://${hostname}/#/buyback${setlangPram()}`,
    // ------------ Invertment ------------
    // 董事会质押获取凭证
    'Voucher': `https://${hostname}/#/pool/lockup/mdx${setlangPram()}`,
    // ------------ explana ------------
    // IMO常见问题
    'IMOproblem': `https://mdexdoc.gitbook.io/doc/${la === 'zh' ? '/v/chinese/' : ''}yong-hu-zhi-nan/imo-initial-mdex-offering/imo-faq`
  }
}

export {
  _collectLink,
  explanaList,
  animateList,
}
