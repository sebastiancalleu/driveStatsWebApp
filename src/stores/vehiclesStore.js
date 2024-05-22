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
    async getVehicles() {
      const globalStore = useGlobalStore();

      const { data } = await axios.get(`api/vehicle/getVehicles`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
      })

      if(data.vehiclesData) {
        this.vehicles = data.vehiclesData;
      }
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
        this.vehicles.push(data.vehicleData);
      }
    },
    addVehicleMileageData(vehicleId, mileageData) {
      const globalStore = useGlobalStore();

      // const { data } = await axios.post(`api/vehicle/addMileage`, {
      //   headers: {
      //     Authorization: localStorage.getItem('DSauthToken'),
      //     uid: globalStore.uid
      //   },
      //   mileageData,
      //   vehicleId
      // })

      // if (data.status === 'success') {
      //   this.vehicles.push(data.vehicleData);
      // }
    },
    updateVehicle() {

    },
    removeVehicle() {

    }
  },
  persist: true,
})
