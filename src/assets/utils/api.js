import { domain } from './comStatic'
// IMO列表
const GET_IMO_PRO_LIST = `${domain}/pro-list`

// 我投注的列表
const GET_IMO_PRO_JOIN_LIST = `${domain}/pro-join-list`

// 项目详情
const GET_IMO_PRO_INFO = `${domain}/pro-info`

// 我在项目中的投注记录
const GET_IMO_PRO_HISTORY = `${domain}/pro-vote-history`

// 获取服务器时间
const GET_SERVER_TIME = `${domain}/server-time`

// 获取活动统计
const GET_SUM = `${domain}/sum`

export {
  GET_IMO_PRO_JOIN_LIST,
  GET_IMO_PRO_HISTORY,
  GET_IMO_PRO_LIST,
  GET_IMO_PRO_INFO,
  GET_SERVER_TIME,
  GET_SUM
}
