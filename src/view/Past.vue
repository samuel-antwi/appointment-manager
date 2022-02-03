<script setup>
  import { ref } from "vue"
  import { supabase } from "../supabase"
  import moment from "moment"

  let data = ref(null)
  let isLoading = ref(true)
  let errorMsg = ref(null)

  // Get date
  // This function returns today's date and
  // it is used to retrieve future appointments in supabase
  const getFormattedDate = () => {
    let dt = new Date()
    const newDate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
    return newDate
  }

  const getData = async () => {
    try {
      const { error, data: appointments } = await supabase
        .from("appointments")
        .select("*")
        .lt("date", getFormattedDate())
        .order("date", { ascending: true })
      if (error) throw error
      data.value = appointments
      isLoading.value = false
    } catch (error) {
      console.log(error.message)
      errorMsg.value = error.message
    }
  }

  getData()
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p></p>
    </div>
    <div v-else class="max-w-5xl px-4 mx-auto">
      <div v-if="data.length === 0" class="text-center">
        <p class="mb-5 text-lg">You currently don't have any past appointment(s)</p>
      </div>
      <div v-else>
        <h1 class="py-5 text-2xl font-semibold text-center text-gray-600 sm:text-left">
          Past Appointment(s)
        </h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <router-link
            v-for="app in data"
            :key="app.id"
            class="bg-[#ffffff] border-red-600 border-4 rounded-xl flex flex-col items-center p-5 gap-y-5"
            :to="{ name: 'ViewAppointment', params: { appointmentId: app.id } }"
          >
            <fa
              v-if="app.appointmentType === 'hospital'"
              class="text-4xl text-red-500"
              icon="hospital-symbol"
            />
            <fa
              v-else-if="app.appointmentType === 'gp surgery'"
              class="text-4xl text-gray-500"
              icon="clinic-medical"
            />
            <fa v-else class="text-4xl text-gray-500" icon="home" />
            <p class="text-xl font-bold capitalize text-secondary">
              {{ app.appointmentFor }}
            </p>
            <p>
              <fa class="mr-2 text-gray-500" icon="calendar-check" />
              <span class="text-lg font-medium capitalize">{{
                app.appointmentType
              }}</span>
            </p>
            <h1 class="p-2 capitalize rounded-lg bg-secondary text-gray-50">
              {{ app.appointmentName }}
            </h1>
            <p class="-mb-3">
              <fa class="mr-1 text-gray-500" icon="calendar-alt" />
              {{ moment(app.date).format("dddd, Do MMMM YYYY") }}
            </p>
            <p><fa class="mr-1 text-gray-500" icon="clock" /> {{ app.time }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
