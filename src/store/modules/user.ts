import { defineStore } from 'pinia'
import { IUserStore } from '../types'

export const useUserStore = defineStore('user', {
  state: (): IUserStore => {
    return {
      Authorization: '',
      collapse: false,
      roles: []
    }
  },
  getters: {},
  actions: {},
  persist: {
    key: 'USER'
  }
})
