<script setup>
  import { useRoute, useRouter } from "vue-router"
  import moment from "moment"
  import { storeToRefs } from "pinia"
  import { useAppointments } from "../store/Appointments"
  import { createToast } from "mosha-vue-toastify"
  import "mosha-vue-toastify/dist/style.css"

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

  // A toast function to display message when appointment is updated
  const toast = () => {
    createToast("Appointmet deleted!", {
      type: "info",
      toastBackgroundColor: "#111827",
      hideProgressBar: true,
    })
  }

  const appointment = useAppointments()

  // Get appointment by ID
  appointment.getAppointmentById(currentId)

  // Delete appointment
  const deleteAppointment = async () => {
    await appointment.deleteAppointment(currentId, router)
  }
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else>
      <div class="max-w-2xl px-4 mx-auto mb-6">
        <h1
          class="py-3 text-2xl font-semibold text-center capitalize text-secondary"
        >
          {{ data.appointmentFor }}
        </h1>
        <div
          v-if="statusMsg"
          class="max-w-2xl p-4 mx-auto mb-5 rounded-md text-gray-50"
        >
          <p>{{ toast() }}</p>
        </div>
        <div
          class="card-wrapper relative flex flex-col items-center justify-center rounded-md bg-[#ffffff] p-4 text-center shadow-lg"
        >
          <div
            class="absolute flex items-center right-3 top-3 gap-x-2"
          >
            <router-link
              :to="{
                name: 'EditAppointment',
                params: { appointmentId: data.id },
              }"
            >
              <button
                class="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-secondary"
              >
                <fa class="text-gray-100" icon="pen" />
              </button>
            </router-link>
            <button
              class="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-secondary"
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
              class="object-cover w-40 h-40 mx-auto rounded-full"
              src="../assets/images/kaylee.jpeg"
              alt="User Avatar"
              loading="lazy"
            />
            <img
              v-else-if="data.appointmentFor === 'gianna'"
              class="object-cover w-40 h-40 mx-auto rounded-full"
              src="../assets/images/giannajpeg.jpeg"
              alt="Baby"
              loading="lazy"
            />
            <img
              v-else-if="
                data.appointmentFor === 'gianna and kaylee' ||
                data.appointmentFor === 'kaylee and gianna'
              "
              class="object-cover w-40 h-40 mx-auto rounded-full"
              src="../assets/images/kaylee-gianna.jpeg"
              alt="Baby"
              loading="lazy"
            />
            <img
              v-else
              class="object-cover w-40 h-40 mx-auto rounded-full"
              src="../assets/images/appointment-default.jpeg"
              alt="User Avatar"
              loading="lazy"
            />
            <p
              class="w-48 p-2 mx-auto text-gray-100 capitalize rounded-md bg-secondary"
            >
              {{ data.appointmentName }}
            </p>
            <div
              class="flex flex-col text-left text-gray-600 gap-y-4"
            >
              <span class="sm:flex sm:items-center">
                <p class="text-gray-600 capitalize">
                  <fa icon="calendar-alt" />
                  {{ moment(data.date).format("dddd, Do MMMM YYYY") }}
                </p>
                <span class="hidden px-2 text-secondary sm:block"
                  >|</span
                >
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
                <span class="font-semibold">Postcode:</span>
                {{ data.postCode }}
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
