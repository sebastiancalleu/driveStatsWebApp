import { defineStore } from 'pinia'
import axios from 'axios'
import { useGlobalStore } from './globalStore';

export const useMileageStore = defineStore('mileage', {
  state: () => ({
    mileageData: []
  }),
  getters: {
    getVehicleMileage: (state) => (uvid) => state.mileageData.filter((mileageRegister) => mileageRegister.uvid === uvid),
  },
  actions: {
    async getMileage(uvid) {
      const globalStore = useGlobalStore();

      const { data } = await axios.get(`api/vehicle/getMileage/?uvid=${uvid}`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
      })

      if(data.mileageData) {
        this.mileageData.push(...data.mileageData);
      }
    },
    async addMileageData(vehicleId, mileage) {
      const globalStore = useGlobalStore();

      const { data } = await axios.post(`api/vehicle/addMileage`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
        mileageData: mileage,
        vehicleId
      })

      if (data.status === 'success') {
        this.mileageData.push(data.vehicleData);
      }
    },
    // async addVehicle(vehicleData) {
    //   const globalStore = useGlobalStore();

    //   vehicleData.uid = globalStore.uid;

    //   console.log(vehicleData);

    //   const { data } = await axios.post(`api/vehicle/registerVehicle`, {
    //     headers: {
    //       Authorization: localStorage.getItem('DSauthToken'),
    //       uid: globalStore.uid
    //     },
    //     vehicleData
    //   })

    //   if (data.status === 'success') {
    //     this.vehicles.push(data.vehicleData);
    //   }
    // },
    // async addVehicleMileageData(vehicleId, mileageData) {
    //   const globalStore = useGlobalStore();

    //   console.log(vehicleId, mileageData)

    //   const { data } = await axios.post(`api/vehicle/addMileage`, {
    //     headers: {
    //       Authorization: localStorage.getItem('DSauthToken'),
    //       uid: globalStore.uid
    //     },
    //     mileageData,
    //     vehicleId
    //   })

    //   if (data.status === 'success') {
    //     this.vehicles.push(data.vehicleData);
    //   }
    // },
    // updateVehicle() {

    // },
    // removeVehicle() {

    // }
  },
  persist: true,
})
