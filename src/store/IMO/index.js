import { makeAutoObservable } from 'mobx'
import axios from '@/assets/utils/ajax'
import { 
  GET_IMO_PRO_LIST, 
  GET_IMO_PRO_JOIN_LIST, 
  GET_IMO_PRO_INFO, 
  GET_IMO_PRO_HISTORY, 
  GET_SERVER_TIME, 
  GET_SUM } from '@/assets/utils/api'
class IMO {

  // IMO列表数据
  imoProList = []

  // 服务器时间
  serverTime = 0

  constructor() {
    makeAutoObservable(this)
  }

  // 获取IMO列表
  getImoProList (param) {
    return axios.get(GET_IMO_PRO_LIST, param)
  }

  // 保存IMO列表
  saveImoProList(param) {
    this.imoProList = param
  }

  // 過濾IMO
  filterImoProList (id) {
    const filterList = this.imoProList.slice(0)
    const newList = filterList.filter((item) => {
      return item.id !== id
    })
    this.imoProList = newList
  }

  // 我投注的IMO列表
  getImoProVote (param) {
    return axios.get(GET_IMO_PRO_JOIN_LIST, param)
  }

  // 获取项目详情
  getImoProInfo (param) {
    return axios.get(GET_IMO_PRO_INFO, param)
  }

  // 获取项目投注历史记录
  getImoProHistory (param) {
    return axios.get(GET_IMO_PRO_HISTORY, param)
  }

  // 获取服务器时间
  getServerTime (param) {
    return axios.get(GET_SERVER_TIME, param)
  }

  // 获取服务器时间
  saveServerTime (param) {
    this.serverTime = param
  }

  // 获取活动统计
  getSum (param) {
    return axios.get(GET_SUM, param)
  }
}

export default new IMO()
