// 默认钱包地址
const defaultAddress = '0x0000000000000000000000000000000000000000'

// 奖励代币
const airdropCoin = 'DMT'

// 质押币种
const pledgeCoin1 = 'MDX'

// 质押币种
const pledgeCoin2 = 'xMDX'

// 项目名称
const itemName = 'Demeter'

// 锁仓系数（质押币种为mdx时候）
const multiple = 6.475

// 默认请求头
// const domain = 'http://172.16.0.91:7001/api/v2/imo'

const domain = 'https://imo.mdex.cc/api/v2/imo'

// 主链列表
const chainList = { 'HECO': 128 , 'BSC': 56 }

// 转义主链列表
const tranferChainList = { 128: 'HECO' , 56: 'BSC' }

//
const tranferChanId = { '0x38': 'BSC', '0x80': 'HECO'}

// 1:LP  2：token
const typeList = { 1: 'lp', 2: 'token' }

// 不切链列表
const hidrouterList = ['detail', 'Explana', '404', 'list']

// 初始化默认链主题
const defaultChain = 'HECO'

export {
  tranferChainList,
  defaultAddress,
  hidrouterList,
  tranferChanId,
  defaultChain,
  airdropCoin,
  pledgeCoin1,
  pledgeCoin2,
  chainList,
  typeList,
  multiple,
  itemName,
  domain,
}

