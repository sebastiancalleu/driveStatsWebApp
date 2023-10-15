import { defineStore } from 'pinia'
import axios from 'axios'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    username: null,
    uid: null,
  }),
  getters: {
  },
  actions: {
    setUsername(username, uid) {
      this.username = username
      this.uid = uid
    },
    async createAccount(username, email, password) {
      const { data: response } = await axios.post(`api/user/createUser`, {
        username,
        password,
        email,
      })

      sessionStorage.setItem(
        'userInfo',
        JSON.stringify({
          username: response.username,
          email: response.email,
          uid: response.uid,
        })
      )

      this.setUsername(response.username, response.uid)
    }
  },
})
