import { makeAutoObservable } from 'mobx'

// 终端信息
const deviceInfo = navigator.userAgent.toLowerCase()
// 移动端设备的字段
const agents = ['iphone', 'android', 'windows phone']
// const agents = ['iphone', 'ipad', 'ipod', 'android', 'linux', 'windows phone']

let kind = 'pc'

let name='info'

for (let i = 0; i < agents.length; i++) {
  if (deviceInfo.indexOf(agents[i]) !== -1) kind = 'mobile'
}

class Config {

  device = kind

  getname = name

  constructor() {
    makeAutoObservable(this)
  }

}

export default new Config()
