import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    count: 0,
    username: null,
    uid: null
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    setUsername(username, uid) {
      this.username = username
      this.uid = uid
    },
    increment() {
      this.count++
    },
  },
})
