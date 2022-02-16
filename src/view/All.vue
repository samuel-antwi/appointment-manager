<script setup>
  import { ref } from "vue"
  import { useStorage } from "@vueuse/core"
  import AppointmentList from "../components/AppointmentList.vue"
  import { useAppointments } from "../store/Appointments"
  import { useUser } from "../store/useUser"
  import { storeToRefs } from "pinia"
  import FilteredAppointments from "../components/FilteredAppointments.vue"

  const appointmentStore = useAppointments()

  // Initialise getappointments function
  appointmentStore.getAppointments()

  // destructure appointments data from Appointments store
  const { data } = storeToRefs(appointmentStore)

  let filteredData = ref([])
  let sort = ref("Relevance")
  const { errorMsg, isLoading } = storeToRefs(appointmentStore)
  const currentUser = useUser()

  // Save filtered appointment in LocalStorage
  const localStorage = () => {
    const store = useStorage("mystorage", filteredData)
    const filterStore = useStorage("filter", sort)
  }
  localStorage()

  // A function to filter the appointments array
  const filterAppointments = (name) => {
    filteredData.value = appointmentStore.data.filter(
      (item) => item.appointmentFor === name
    )
  }

  // Reset the filter input
  const resetFilter = () => {
    filteredData.value = []
    sort.value = null
  }
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else class="mx-auto mb-6 max-w-6xl px-4">
      <div class="text-center" v-if="!data.length">
        <h2 class="mb-4 text-xl">You currently do not have any appointment(s)</h2>
        <router-link class="btn btn-info" :to="{ name: 'CreateAppointment' }"
          >Create appointment</router-link
        >
      </div>
      <!-- <FilteredAppointments
        :filterAppointments="filterAppointments"
        :sort="sort"
        :data="data"
        :filteredData="filteredData"
      /> -->
      <AppointmentList :data="data" :filteredData="filteredData" />
    </div>
  </div>
</template>

<style></style>
