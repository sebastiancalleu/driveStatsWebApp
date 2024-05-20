import { defineStore } from 'pinia'
import axios from 'axios'
import { useGlobalStore } from './globalStore';

export const useVehiclesStore = defineStore('vehicles', {
  state: () => ({
    vehicles: [
      {
        brand: 'Mazda',
        model: '3',
        year: '2023',
        uvid: '32134316843189431643156',
      }
    ]
  }),
  getters: {
    getVehicle: (state) => (uvid) => state.vehicles.find((vehicle) => vehicle.uvid === uvid),
  },
  actions: {
    getVehicles() {

    },
    async addVehicle(vehicleData) {
      const globalStore = useGlobalStore();

      vehicleData.uid = globalStore.uid;

      console.log(vehicleData);

      const { data } = await axios.post(`api/vehicle/registerVehicle`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
        vehicleData
      })

      if (data.status === 'success') {
        const payload = await jose.decodeJwt(data.token)
        this.setUserInfo(payload.username, payload.uid, payload.email);
        this.$router.push('/Dashboard');
      }
    },
    updateVehicle() {

    },
    removeVehicle() {

    }
  },
  persist: true,
})
