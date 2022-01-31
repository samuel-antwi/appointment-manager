<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'
  import moment from 'moment'
  import AppointmentList from '../components/AppointmentList.vue'

  let data = ref(null)
  let isLoading = ref(true)
  let errorMsg = ref(null)

  // Get date
  // This function returns today's date and
  // it is used to retrieve future appointments in supabase
  const getFormattedDate = () => {
    let dt = new Date()
    const newDate = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate()
    return newDate
  }

  const getData = async () => {
    try {
      const { error, data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .gte('date', getFormattedDate())
        .order('date', { ascending: true })
      if (error) throw error
      data.value = appointments[0]
      isLoading.value = false
    } catch (error) {
      console.log(error.message)
      errorMsg.value = error.message
    }
  }

  getData()
</script>

<template>
  <div class="padding-wrapper">
    <div v-if="isLoading">
      <p></p>
    </div>
    <div v-else class="max-w-5xl px-4 mx-auto">
      <div v-if="!data" class="text-center">
        <p class="mb-5">You currently don't have any upcoming appointment</p>
        <router-link class="btn btn-info" :to="{ name: 'Create' }"
          >Create appointment</router-link
        >
      </div>
      <div v-else>
        <h1 class="py-5 text-2xl font-semibold text-center text-gray-600 sm:text-left">
          Next Appointment(s)
        </h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <router-link
            class="bg-[#F1F1F1] rounded-xl flex flex-col items-center p-5 gap-y-5"
            :to="{ name: 'ViewAppointment', params: { appointmentId: data.id } }"
          >
            <fa
              v-if="data.appointmentType === 'hospital'"
              class="text-4xl text-red-500"
              icon="hospital-symbol"
            />
            <fa
              v-else-if="data.appointmentType === 'gp surgery'"
              class="text-4xl text-gray-500"
              icon="clinic-medical"
            />
            <fa v-else class="text-4xl text-gray-500" icon="home" />
            <p class="text-xl font-bold capitalize text-secondary">
              {{ data.appointmentFor }}
            </p>
            <p>
              <fa class="mr-2 text-gray-500" icon="calendar-check" />
              <span class="text-lg font-medium capitalize">{{
                data.appointmentType
              }}</span>
            </p>
            <h1 class="p-2 rounded-lg bg-secondary text-gray-50">
              {{ data.appointmentName }}
            </h1>
            <p class="-mb-3">
              <fa class="mr-1 text-gray-500" icon="calendar-alt" />
              {{ moment(data.date).format('dddd, Do MMMM YYYY') }}
            </p>
            <p><fa class="mr-1 text-gray-500" icon="clock" /> {{ data.time }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
