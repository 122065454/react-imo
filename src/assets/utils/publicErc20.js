import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';
import ERC20ABI from '@/assets/abi/erc20.json'
import IMOABI from '@/assets/abi/imo.json'

export const MaxUint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const getSigner = async() => {
  const ethereum = await getProvide()
  const provider = new ethers.providers.Web3Provider(ethereum)
  return provider.getSigner()
}

export const setLocalAllowance = (tokenAddress, account, contractAddr, allowance=MaxUint256) => { // save allowance
  try {
    localStorage.setItem(`Allowanc-${tokenAddress.slice(0, 10)}${account.slice(0, 10)}${contractAddr.slice(0, 10)}`, allowance)
  } catch (error) {
    console.log('setLocalAllowance:', error)
  }
}

export const getLocalAllowance = (tokenAddress, account, contractAddr) => { // get allowance
  return localStorage.getItem(`Allowanc-${tokenAddress.slice(0, 10)}${account.slice(0, 10)}${contractAddr.slice(0, 10)}`)
}

// getProvide
export const getProvide = async() => {
  const provider = await detectEthereumProvider();
  return provider;
}

// 获取区块高度
export const getBlockNumber = async() => {
  const ethereum = await getProvide()
  const provider = new ethers.providers.Web3Provider(ethereum)
  return provider.getBlockNumber()
}

// connect wallet 
export const connect = async() => {
  const ethereum = await getProvide()
  return ethereum.request({ method: 'eth_requestAccounts' }) // wait for package update
}

/**
@param address -> address need to be check 
**/
export const isAddress = address => {
  return ethers.utils.isAddress(address)
}

/** get the contract of the address
@param address -> erc20 address
**/
export const getContract = async (address, isBase=true) => {
  const provider = await getSigner();
  if (isBase) {
    return new ethers.Contract(address, ERC20ABI, provider)
  } else {
    return new ethers.Contract(address, IMOABI, provider)
  }
}

/** get the getAllowance of the tokenAddress give the contractAddr
@param tokenAddress -> token address
@param contractAddr -> contract address
@param account -> user address
**/
export const getAllowance = async(tokenAddress, contractAddr, account) => {
  const tokenContract = await getContract(tokenAddress)
  return tokenContract['allowance'](account, contractAddr)
}


export const getBalacne = async(tokenAddress, account, isLp=true) => {
  let decimal = 18
  const tokenContract = await getContract(tokenAddress)
  if(!isLp) {
    decimal = await tokenContract['decimals']()
  }
  const balance = await tokenContract['balanceOf'](account)
  return ethers.utils.formatUnits(balance, decimal)
}

/** approve tokenAddress to the contractAddr
@param tokenAddress -> token address
@param contractAddr -> contract address
**/
export const approveToken = async(tokenAddress, contractAddr) => {
  const tokenContract = await getContract(tokenAddress)
  return tokenContract['approve'](contractAddr, MaxUint256)
}


/** 查询用户质押的数量
@param isLp -> is lp or address
@param imoAddress -> imo contract address
@param account -> user address
@param investmentAddress -> investment token address
**/
export const getPurchasedAmount = async(imoAddress, investmentAddress, account) => {
  const imoContract = await getContract(imoAddress, false) 
  let decimal = 18
  const balance = await imoContract['userAmount'](account)
  return ethers.utils.formatUnits(balance, decimal)
}

// 是否领取过奖励
export const _isClaimOperate = async(imoAddress, account) => {
  try {
    const imoContract = await getContract(imoAddress, false) 
    return await imoContract['isClaim'](account)
  } catch(err) {
    console.log('是否领取过奖励异常:', err)
  }
}

// 领取奖励
export const _claimOperate = async(imoAddress) => {
  try {
    const imoContract = await getContract(imoAddress, false) 
    return await imoContract['claim']()
  } catch(err) {
    console.log('领取奖励异常:', err)
  }
}

// 获取凭证质押最大限制
export const _limitOperate = async(imoAddress, account) => {
  try {
    const imoContract = await getContract(imoAddress, false) 
    const limit = await imoContract['getUserMaxAmount'](account)
    return ethers.utils.formatUnits(limit, 18)
  } catch(err) {
    console.log('获取凭证质押最大限制异常:', err)
  }
}

/** get investmentBalance and returnBalance of user
@param isLp -> is lp or address
@param imoAddress -> imo contract address
@param account -> user address
@param investmentAddress -> investment token address
@param returnAddress -> return token address
@param isCurrent ->  current balance
**/
export const getImoAmount = async(imoAddress, investmentAddress, returnAddress, account, isLp=true, isCurrent = true) => {
  let investmentDecimal = 18
  if(!isLp) {
    const tokenContract = await getContract(investmentAddress)
    investmentDecimal = await tokenContract['decimals']()
  }
  const tokenContract = await getContract(returnAddress) 
  const returnDecimal = await tokenContract['decimals']()
  const imoContract = await getContract(imoAddress, false)
  let investmentBalance = ''
  let returnBalance = ''
  const { amount, volume } = await imoContract['settleable'](account)
    // amount -> despoit left
    // volume -> rewadr amount
     investmentBalance= ethers.utils.formatUnits(amount, investmentDecimal)
     returnBalance = ethers.utils.formatUnits(volume, returnDecimal)
  if (isCurrent) {
    const settledCurrency = await imoContract['settledCurrencyOf'](account) // 个人已领取的投资代币
    const settledUnder = await imoContract['settledUnderlyingOf'](account) // 个人已领取的目标代币
    if(settledCurrency > 0) {
      investmentBalance = '0'
    }
    if(settledUnder > 0) {
      returnBalance = '0'
    }
  }
  // amount user investment amount
  // volume user return amount
  return {
    investmentBalance,
    returnBalance,
  }
}

/**get user imo Data**/
export const getUserInfo = async(imoAddress, returnAddress, investmentAddress, account, isLp=true) => {
  const imoContract = await getContract(imoAddress, false)
  let investmentDecimal = 18
  if(!isLp) {
    const tokenContract = await getContract(investmentAddress)
    investmentDecimal = await tokenContract['decimals']()
  }
  const tokenContract = await getContract(returnAddress) 
  const returnDecimal = await tokenContract['decimals']()
  console.log({imoAddress, returnAddress, investmentAddress, account})
  const userValue = await imoContract['getUserInfo'](account)
  return {
    returnAmount: ethers.utils.formatUnits(userValue[0], investmentDecimal).toString(),
    winAmount: ethers.utils.formatUnits(userValue[1], returnDecimal).toString()
  }
}

/** 提取代币
@param imoAddress -> imo contract address
**/
export const settleToken = async(imoAddress) => {
  const imoContract = await getContract(imoAddress, false)
  return imoContract['withdraw']()
}

export const getTotalPurchased = async(imoAddress, investmentAddress, isLp=true) => {
  const imoContract = await getContract(imoAddress, false)
  let investmentDecimal = 18
  if(!isLp) {
    const tokenContract = await getContract(investmentAddress)
    investmentDecimal = await tokenContract['decimals']()
  }
  const totalPurchased = await imoContract['totalPurchasedCurrency']()
  return ethers.utils.formatUnits(totalPurchased, investmentDecimal)
}

/** deposit token to imo
@param imoAddress -> imo contract address
**/
export const purchaseToken = async(imoAddress, investmentAmount, investmentAddress, isLp=true) => {
  let investmentDecimal = 18
  if(!isLp) {
    const tokenContract = await getContract(investmentAddress)
    investmentDecimal = await tokenContract['decimals']()
  }
  const imoContract = await getContract(imoAddress, false)
  const purchaseAmount = ethers.utils.parseUnits(investmentAmount, investmentDecimal).toString()
  return imoContract['purchase'](purchaseAmount)
}


// todo get state of imo withdraw

export const getPhase = async(imoAddress) => {
  const imoContract = await getContract(imoAddress, false)
  return imoContract['getPhase']()
}


/** approve tokenAddress to the contractAddr
@param chainId -> chain Id
@param chainName -> chain Name
@param name -> chain stort name
@param symbol -> chain base symbol
@param rpcUrls -> chain rpc url
@param blockExplorerUrls -> chain block Explorer
**/
export const changeChain = async(config) => {
  const {chainId, chainName, name, symbol, rpcUrls, blockExplorerUrls, decimals = 18}=config
  console.log('config', config)
  const ethereum = await getProvide()
  return ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId,
        chainName,
        nativeCurrency: {
          name,
          symbol,
          decimals
        },
        rpcUrls,
        blockExplorerUrls
      }
    ]
  })
}