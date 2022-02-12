<script setup>
  import { ref } from "vue"
  import { useStorage } from "@vueuse/core"
  import AppointmentList from "../components/AppointmentList.vue"
  import { useAppointments } from "../store/Appointments"
  import { useUser } from "../store/useUser"
  import { storeToRefs } from "pinia"

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
    const localStorageData = useStorage("appointments", data)
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
    <!-- <div v-if="isLoading"></div> -->
    <div class="mx-auto mb-6 max-w-6xl px-4">
      <div class="text-center" v-if="!data.length">
        <h2 class="mb-4 text-xl">You currently do not have any appointment(s)</h2>
        <router-link class="btn btn-info" :to="{ name: 'CreateAppointment' }"
          >Create appointment</router-link
        >
      </div>
      <div class="mb-5 flex flex-col md:max-w-xs">
        <div v-if="data.length > 1">
          <div class="flex items-center justify-between">
            <label class="label-text mb-1">Filter by:</label>
            <div>
              <button
                @click="resetFilter"
                v-if="filteredData.length > 0"
                type="button"
                class="text-info ml-3"
              >
                Reset
              </button>
              <button
                disabled
                @click="resetFilter"
                v-else
                type="button"
                class="cursor-not-allowed text-blue-300"
              >
                Reset
              </button>
            </div>
          </div>
          <select
            @change="filterAppointments(sort)"
            v-model="sort"
            class="mt-1 w-full rounded-md text-gray-500 focus:outline-none"
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
  </div>
</template>

<style></style>
