<script setup>
  import moment from "moment"
  import { useAppointments } from "../store/Appointments"
  import { storeToRefs } from "pinia"
  import { supabase } from "../supabase"

  const appointmentStore = useAppointments()
  appointmentStore.getNextappointment()
  const { isLoading, nextAppointment: data } = storeToRefs(appointmentStore)

  const getData = async () => {
    let { data: appointments, error } = await supabase
      .from("appointments")
      .select("appointmentType", "hospital")
    return appointments
  }

  console.log(getData())
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else class="mx-auto max-w-5xl px-4">
      <div v-if="!data" class="text-center">
        <p class="mb-5">You currently don't have any upcoming appointment</p>
        <router-link class="btn btn-info" :to="{ name: 'CreateAppointment' }"
          >Create appointment</router-link
        >
      </div>
      <div v-else>
        <h1 class="py-5 text-center text-2xl font-semibold text-gray-600 sm:text-left">
          Next Appointment(s)
        </h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <router-link
            class="flex flex-col items-center gap-y-5 rounded-xl bg-[#ffffff] p-5"
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
            <p class="text-secondary text-xl font-bold capitalize">
              {{ data.appointmentFor }}
            </p>
            <p>
              <fa class="mr-2 text-gray-500" icon="calendar-check" />
              <span class="text-lg font-medium capitalize">{{
                data.appointmentType
              }}</span>
            </p>
            <h1 class="bg-secondary rounded-lg p-2 text-gray-50">
              {{ data.appointmentName }}
            </h1>
            <p class="-mb-3">
              <fa class="mr-1 text-gray-500" icon="calendar-alt" />
              {{ moment(data.date).format("dddd, Do MMMM YYYY") }}
            </p>
            <p><fa class="mr-1 text-gray-500" icon="clock" /> {{ data.time }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
