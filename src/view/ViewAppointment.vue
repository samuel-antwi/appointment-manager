<script setup>
  import { useRoute, useRouter } from "vue-router"
  import moment from "moment"
  import { storeToRefs } from "pinia"
  import { useAppointments } from "../store/Appointments"

  const router = useRouter()
  // Get route param
  const route = useRoute()
  const currentId = route.params.appointmentId

  const {
    isLoading,
    errorMsg,
    statusMsg,
    appointment: data,
  } = storeToRefs(useAppointments())

  const appointment = useAppointments()

  // Get appointment by ID
  appointment.getAppointmentById(currentId)

  // Delete appointment
  const deleteAppointment = () => {
    appointment.deleteAppointment(currentId, router)
  }

  // Update appointment
  const updateAppointment = () => {
    appointment.updateAppointment(updateAppointment)
  }
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else>
      <div class="mx-auto mb-6 max-w-2xl px-4">
        <h1 class="text-secondary py-3 text-center text-2xl font-semibold capitalize">
          {{ data.appointmentFor }}
        </h1>
        <div v-if="statusMsg || errorMsg" class="mx-auto mb-5 max-w-2xl rounded-md p-4">
          <p class="text-red-500">{{ errorMsg }}</p>
          <p class="text-secondary">{{ statusMsg }}</p>
        </div>
        <div
          class="card-wrapper relative flex flex-col items-center justify-center rounded-md bg-[#ffffff] p-4 text-center shadow-lg"
        >
          <div class="absolute right-3 top-3 flex items-center gap-x-2">
            <router-link
              :to="{ name: 'EditAppointment', params: { appointmentId: data.id } }"
            >
              <button
                class="bg-secondary flex h-8 w-8 flex-col items-center justify-center rounded-full"
              >
                <fa class="text-gray-100" icon="pen" />
              </button>
            </router-link>
            <button
              class="bg-secondary flex h-8 w-8 flex-col items-center justify-center rounded-full"
              @click="deleteAppointment"
            >
              <fa class="text-gray-100" icon="trash" />
            </button>
          </div>
          <div class="absolute top-3 left-3">
            <button class="text-secondary" @click="router.go(-1)">
              <fa icon="chevron-left" /> Back
            </button>
          </div>
          <div class="flex flex-col gap-y-4">
            <img
              v-if="data.appointmentFor === 'kaylee'"
              class="mx-auto h-40 w-40 rounded-full object-cover"
              src="../assets/images/kaylee.jpeg"
              alt="Baby"
              loading="lazy"
            />
            <img
              v-else-if="data.appointmentFor === 'gianna'"
              class="mx-auto h-40 w-40 rounded-full object-cover"
              src="../assets/images/giannajpeg.jpeg"
              alt="Baby"
              loading="lazy"
            />
            <img
              v-else
              class="mx-auto h-40 w-40 rounded-full object-cover"
              src="../assets/images/kaylee-gianna.jpeg"
              alt="Baby"
            />
            <p class="bg-secondary mx-auto w-28 rounded-md p-2 capitalize text-gray-100">
              {{ data.appointmentName }}
            </p>
            <div class="flex flex-col gap-y-4 text-left text-gray-600">
              <span class="sm:flex sm:items-center">
                <p class="capitalize text-gray-600">
                  <fa icon="calendar-alt" />
                  {{ moment(data.date).format("dddd, Do MMMM YYYY") }}
                </p>
                <span class="text-secondary hidden px-2 sm:block">|</span>
                <p class="pt-1 capitalize sm:pt-0">
                  {{ data.time }}
                </p>
              </span>
              <p class="capitalize">
                <fa icon="map-marker-alt" />
                {{ data.location }}
              </p>
              <p v-if="data.appointmentLocationDetails">
                <span class="font-semibold">Location details:</span>
                {{ data.appointmentLocationDetails }}
              </p>
              <p v-if="data.postCode">
                <span class="font-semibold">Postcode:</span> {{ data.postCode }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .card-wrapper {
    border-bottom: 8px solid hsl(0, 0%, 88%);
  }
  label {
    font-weight: 600;
  }
</style>
