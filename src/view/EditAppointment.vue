<script setup>
  import { useRoute } from "vue-router"
  import { useAppointments } from "../store/Appointments"
  import { storeToRefs } from "pinia"

  // Get Current ID
  const route = useRoute()
  const currentId = route.params.appointmentId

  // Get appointments store instance from Pinia store
  const appointmentStore = useAppointments()

  // Get appointment by id
  appointmentStore.getAppointmentById(currentId)

  // Update appointment
  const updateAppointment = () => {
    appointmentStore.updateAppointment(currentId)
  }

  const {
    isLoading,
    errorMsg,
    statusMsg,
    appointment: data,
  } = storeToRefs(appointmentStore)
</script>

<template>
  <div class="height-wrapper">
    <div v-if="isLoading"></div>

    <div class="py-12" v-else>
      <div class="edit mx-auto max-w-3xl bg-[#ffffff] p-8 md:px-10">
        <div v-if="errorMsg" class="mb-10 rounded-md p-4">
          <p class="text-red-500">
            {{ errorMsg }}
          </p>
        </div>
        <div
          v-if="statusMsg"
          class="mb-10 rounded-md bg-gray-800 p-4 text-center text-lg tracking-wider text-gray-50"
        >
          <p>
            {{ statusMsg }}
          </p>
        </div>
        <h1
          class="mb-4 py-5 text-2xl font-semibold uppercase tracking-wider text-gray-700 md:text-3xl md:font-bold"
        >
          Appointment Details
        </h1>
        <form class="flex max-w-2xl flex-col gap-y-8" @submit.prevent="updateAppointment">
          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex w-full flex-col">
              <label class="mb-1" for="appointment-name">Appointment name:</label>
              <input
                id="appointment-name"
                v-model="data.appointmentName"
                required
                class="form-control p-2 py-3.5 focus:outline-none"
                type="text"
              />
            </div>
            <div class="flex w-full flex-col">
              <label class="mb-1" for="for">Appointent for:</label>
              <select
                id="for"
                v-model="data.appointmentFor"
                required
                class="w-full p-2.5 py-3.5 focus:outline-none"
              >
                <option selected="selected" value="select">Select name</option>
                <option value="kaylee">Kaylee</option>
                <option value="gianna">Gianna</option>
                <option value="kaylee and gianna">Kaylee and Gianna</option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex w-full flex-col">
              <label class="mb-1" for="type">Type:</label>
              <select
                id="type"
                v-model="data.appointmentType"
                required
                class="p-2.5 py-3.5 focus:outline-none"
              >
                <option selected="selected" value="select type">Select type</option>
                <option value="hospital">Hospital</option>
                <option value="gp surgery">GP Surgery</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="flex w-full flex-col">
              <label class="mb-1" for="date">Date:</label>
              <input
                id="date"
                v-model="data.date"
                required
                class="p-2 py-3.5 focus:outline-none"
                type="date"
              />
            </div>
          </div>

          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex w-full flex-col">
              <label class="mb-1" for="time">Time:</label>
              <input
                id="time"
                v-model="data.time"
                required
                class="p-2 py-3.5 focus:outline-none"
                type="time"
              />
            </div>
            <div class="flex w-full flex-col">
              <label class="mb-1" for="location">Location:</label>
              <input
                id="location"
                v-model="data.location"
                required
                class="p-2 py-3.5 focus:outline-none"
                type="text"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-1" for="locationdetails">Location details:</label>
            <textarea
              id="locationdetails"
              v-model="data.appointmentLocationDetails"
              class="p-2 py-3.5 focus:outline-none"
              type="text"
            ></textarea>
          </div>
          <div class="flex w-full flex-col md:w-1/2">
            <label class="mb-1" for="postcode">Post Code:</label>
            <input
              id="postcode"
              v-model="data.postCode"
              required
              class="p-2 py-3.5 focus:outline-none"
              type="text"
              placeholder="Optional"
            />
          </div>

          <button
            class="w-full bg-gray-800 py-4 font-semibold uppercase tracking-wider text-gray-50 hover:bg-gray-900 md:w-6/12"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .edit {
    label {
      font-weight: 600;
      color: #777777 !important;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    input,
    select,
    textarea {
      border-color: #cccccc !important;
    }
  }
</style>
