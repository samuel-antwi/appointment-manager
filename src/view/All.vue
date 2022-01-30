<script>
  import { computed, ref } from 'vue'
  import { supabase } from '../supabase'
  import { useStorage } from '@vueuse/core'
  import AppointmentList from '../components/AppointmentList.vue'
  import { useMainStore } from '../store/main'
  import { useUser } from '../store/useUser'

  export default {
    components: { AppointmentList },
    setup() {
      let data = ref([])
      let filteredData = ref([])
      let appointmentsCount = ref(0)
      let isLoading = ref(true)
      let errorMsg = ref(null)
      let statusMsg = ref(null)
      let sort = ref('Relevance')

      const currentUser = useUser()

      // Save filtered appointment in LocalStorage
      const localStorage = () => {
        const store = useStorage('mystorage', filteredData)
        const filterStore = useStorage('filter', sort)
        const user = useStorage('user', currentUser)
      }
      localStorage()

      // Get appointments data from supabase
      const getData = async () => {
        try {
          const { data: appointments, error } = await supabase
            .from('appointments')
            .select('*')
            .order('date', { ascending: true })
          if (error) throw error
          data.value = appointments
          isLoading.value = false
        } catch (error) {
          errorMsg.value = error.message
        }
      }
      getData()

      // A function to filter the appointments array
      const filterAppointments = (name) => {
        filteredData.value = data.value.filter((item) => item.appointmentFor === name)
      }

      // Reset the filter input
      const resetFilter = () => {
        filteredData.value = []
        sort.value = null
      }

      const getAppointmentsCount = computed(() => {
        return (appointmentsCount.value = data.value.length)
      })

      return {
        errorMsg,
        statusMsg,
        data,
        isLoading,
        filteredData,
        filterAppointments,
        sort,
        resetFilter,
        getAppointmentsCount,
      }
    },
  }
</script>

<template>
  <div class="pt-40" v-if="isLoading"></div>
  <div v-else class="max-w-6xl px-4 pt-40 mx-auto">
    <div class="pt-20 text-center" v-if="data.length === 0">
      <h2 class="mb-4 text-xl">You currently do not have any appointment(s)</h2>
      <router-link class="btn btn-info" :to="{ name: 'Create' }"
        >Create appointment</router-link
      >
    </div>
    <div v-else class="flex flex-col max-w-xs mb-5">
      <div v-if="data.length > 1">
        <div class="flex items-center justify-between">
          <label class="mb-1 label-text" for="">Filter by:</label>
          <div>
            <button
              @click="resetFilter"
              v-if="filteredData.length > 0"
              type="button"
              class="ml-3 text-info"
            >
              Reset
            </button>
            <button
              disabled
              @click="resetFilter"
              v-else
              type="button"
              class="ml-3 text-blue-300 cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
        <select
          @change="filterAppointments(sort)"
          v-model="sort"
          class="w-full mt-1 text-gray-500 select focus:outline-none select-secondary"
        >
          <option selected="selected" value="relevance">Relevance</option>
          <option value="kaylee">Kaylee</option>
          <option value="gianna">Gianna</option>
          <option value="kaylee and gianna">Kaylee and Gianna</option>
        </select>
      </div>
    </div>
    <AppointmentList :data="data" :filteredData="filteredData" />
  </div>
</template>

<style></style>
