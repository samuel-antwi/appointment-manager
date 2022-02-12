<script setup>
  import moment from "moment"
  import { useAppointments } from "../store/Appointments"
  import { storeToRefs } from "pinia"

  const appointments = useAppointments()
  appointments.getPastAppointments()
  const { isLoading, pastAppointments: data } = storeToRefs(useAppointments())
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p></p>
    </div>
    <div v-else class="mx-auto max-w-5xl px-4">
      <div v-if="data.length === 0" class="text-center">
        <p class="mb-5 text-lg">You currently don't have any past appointment(s)</p>
      </div>
      <div v-else>
        <h1 class="py-5 text-center text-2xl font-semibold text-gray-600 sm:text-left">
          Past Appointment(s)
        </h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <router-link
            v-for="app in data"
            :key="app.id"
            class="flex flex-col items-center gap-y-5 rounded-xl border-4 border-red-600 bg-[#ffffff] p-5"
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
            <p class="text-secondary text-xl font-bold capitalize">
              {{ app.appointmentFor }}
            </p>
            <p>
              <fa class="mr-2 text-gray-500" icon="calendar-check" />
              <span class="text-lg font-medium capitalize">{{
                app.appointmentType
              }}</span>
            </p>
            <h1 class="bg-secondary rounded-lg p-2 capitalize text-gray-50">
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
