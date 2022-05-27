import { makeAutoObservable } from 'mobx'

class Skin {
  
  skinSign = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSkinSign(data) {
    this.skinSign = data
  }
}

export default new Skin()
