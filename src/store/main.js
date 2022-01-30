import { defineStore, acceptHMRUpdate } from 'pinia'
import { supabase } from '../supabase'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    data: [],
    errorMsg: null,
    statusMsg: null,
    route: null,
  }),

  getters: {},

  actions: {
    async getAppointments() {
      try {
        const { data: appointments, error } = await supabase
          .from('appointments')
          .select('*')
        if (error) throw error
        return (this.data = await appointments)
      } catch (error) {
        console.log(error.message)
      }
    },
    getRoute(name) {
      return (this.route = name)
    },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
// }
