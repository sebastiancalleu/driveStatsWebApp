import { defineStore } from 'pinia'
import axios from 'axios'
import { useGlobalStore } from './globalStore';
import { useMileageStore } from './mileageStore';

export const useVehiclesStore = defineStore('vehicles', {
  state: () => ({
    vehicles: []
  }),
  getters: {
    getVehicle: (state) => (uvid) => state.vehicles.find((vehicle) => vehicle.uvid === uvid),
  },
  actions: {
    async getVehicles() {
      const globalStore = useGlobalStore();
      const mileageStore = useMileageStore();

      const { data } = await axios.get(`api/vehicle/getVehicles`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
      })

      if(data.vehiclesData) {
        this.vehicles = data.vehiclesData;
      }

      this.vehicles.forEach((vehicle => mileageStore.getMileage(vehicle.uvid)))
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
    async addVehicleMileageData(vehicleId, mileageData) {
      const globalStore = useGlobalStore();

      const { data } = await axios.post(`api/vehicle/addMileage`, {
        headers: {
          Authorization: localStorage.getItem('DSauthToken'),
          uid: globalStore.uid
        },
        mileageData,
        vehicleId
      })

      if (data.status === 'success') {
        this.vehicles.push(data.vehicleData);
      }
    },
    updateVehicle() {

    },
    removeVehicle() {

    }
  },
  persist: true,
})
