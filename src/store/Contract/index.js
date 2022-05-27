import { makeAutoObservable } from 'mobx'

class Contract {
  
  accounts = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAccounts(data) {
    this.accounts = data
  }
}

export default new Contract()
