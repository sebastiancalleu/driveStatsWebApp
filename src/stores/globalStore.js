import { defineStore } from 'pinia'
import axios from 'axios'
import bcrypt from 'bcryptjs';
import * as jose from 'jose'

const alg = 'HS256';
const secret = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET
);

export const useGlobalStore = defineStore('global', {
  state: () => ({
    username: null,
    uid: null,
    email: null,
  }),
  getters: {
  },
  actions: {
    setUserInfo(username, uid, email) {
      this.username = username
      this.uid = uid
      this.email = email
    },
    async createAccount(username, email, password) {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds)

      const { data: response } = await axios.post(`api/user/createUser`, {
        username,
        password: hashPassword,
        email,
      })

      this.setUserInfo(response.username, response.uid, response.email)
    },
    async loginUser(email, password) {
      try {
        const token = await new jose.SignJWT({ email, password })
        .setProtectedHeader({ alg })
        .setExpirationTime('2m')
        .sign(secret)
      
        const { data } = await axios.get(`api/user/login?token=${token}`);
  
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        if (data.status === 'success') {
          const payload = await jose.decodeJwt(data.token)
          this.setUserInfo(payload.username, payload.uid, payload.email);
        }
  
        return data.status;
      } catch (error) {
        return 'failed';
      }
    }
  },
})
