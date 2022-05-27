import { makeAutoObservable } from 'mobx'
import { enList } from '@/assets/i18n/en'
import { zhList } from '@/assets/i18n/zh'
import { _getParamByUrl } from '@/assets/utils/comMethod'

let defaultLang = 'zh'
const langList = ['zh', 'en', 'hk']
const localLang = window.localStorage.getItem('IMOLang')
const hrefArr = window.location.href
const param = _getParamByUrl(hrefArr)
const hrefSize = Object.keys(param).length


if (hrefSize > 0) {
  let la = ''
  const endData = param['lang']
  la = endData === 'zh-CN' ? 'zh' : endData
  la = endData === 'zh-HK' ? 'hk' : endData
  // URL存在语言
  if (langList.includes(la)) {
    if(defaultLang !== la) defaultLang = la
    window.localStorage.setItem('IMOLang', la)
  } 
  // URL不存在语言
  
} else {
  if (localLang) {
    if(defaultLang !== localLang) defaultLang = localLang
  }
}

class Land {
  
  language = defaultLang

  en = enList

  zh = zhList

  constructor() {
    makeAutoObservable(this)
  }

  setLang(data) {
    if (this.language !== data) {
      this.language = data
      window.localStorage.setItem('IMOLang', data)
    }
  }
}

export default new Land()
