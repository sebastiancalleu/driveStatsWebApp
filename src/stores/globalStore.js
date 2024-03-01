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

      const {data} = await axios.post(`api/user/createUser`, {
        username,
        password: hashPassword,
        email,
      })

      if (data.status === 'success') {
        const payload = await jose.decodeJwt(data.token)
        this.setUserInfo(payload.username, payload.uid, payload.email);
        this.$router.push('/Dashboard');
      }
    },
    async loginUser(email, password) {
      try {
        const token = await new jose.SignJWT({ email, password })
        .setProtectedHeader({ alg })
        .setExpirationTime('2m')
        .sign(secret)
      
        const { data } = await axios.get(`api/user/login?token=${token}`);

        if (data.token) {
          localStorage.setItem('DSauthToken', data.token);
        }
        
        if (data.status === 'success') {
          const payload = await jose.decodeJwt(data.token)
          this.setUserInfo(payload.username, payload.uid, payload.email);
          this.$router.push('/Dashboard');
        }
  
        return data;
      } catch (error) {
        return 'failed';
      }
    },
    async loginUserProvider(token, uid) {
      try {      
        const { data } = await axios.get(`api/user/loginProvider`, {
          headers: {
            Authorization: token,
            uid
          }
        });

        if (data.token) {
          localStorage.setItem('DSauthToken', data.token);
        }
        
        if (data.status === 'success') {
          const payload = await jose.decodeJwt(data.token)
          this.setUserInfo(payload.username, payload.uid, payload.email);
          this.$router.push('/Dashboard');
        }
  
        return data;
      } catch (error) {
        return 'failed';
      }
    }
  },
  persist: true,
})
