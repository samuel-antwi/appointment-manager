import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUser = defineStore('userStore', {
  state: () => ({
    user: null,
  }),

  getters: {
    getUserId: (state) => {
      return state.user.id
    },

    getUserEmail: (state) => {
      return state.user.email
    },
  },

  actions: {
    async setUser(payload) {
      try {
        this.user = (await payload) ? payload.user : null
      } catch (error) {
        console.log(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
