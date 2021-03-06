<script setup>
  import { useRoute, useRouter } from "vue-router"
  import { useAppointments } from "../store/Appointments"
  import { storeToRefs } from "pinia"
  import { createToast } from "mosha-vue-toastify"
  import "mosha-vue-toastify/dist/style.css"

  // Get Current ID
  const route = useRoute()
  const router = useRouter()
  const currentId = route.params.appointmentId

  // Get appointments store instance from Pinia store
  const appointmentStore = useAppointments()

  const {
    isLoading,
    errorMsg,
    statusMsg,
    appointment: data,
  } = storeToRefs(appointmentStore)

  // A toast function to display message when appointment is updated
  const toast = () => {
    createToast("Appointment updated successfully.", {
      type: "info",
      toastBackgroundColor: "#111827",
      hideProgressBar: true,
    })
  }

  // Update appointment
  const updateAppointment = async () => {
    await appointmentStore.updateAppointment(currentId, toast)
    router.push({ name: "ViewAppointment" })
  }
</script>

<template>
  <div class="height-wrapper">
    <div v-if="isLoading"></div>

    <div class="py-12" v-else>
      <div class="edit mx-auto max-w-3xl bg-[#ffffff] p-8 md:px-10">
        <div v-if="errorMsg" class="p-4 mb-10 rounded-md">
          <p class="text-red-500">
            {{ errorMsg }}
          </p>
        </div>
        <div
          v-if="statusMsg"
          class="p-4 mb-10 text-lg tracking-wider text-center bg-gray-800 rounded-md text-gray-50"
        >
          <p class="tracking-wider">
            {{ toast }}
          </p>
        </div>
        <h1
          class="py-5 mb-4 text-2xl font-semibold tracking-wider text-gray-700 uppercase md:font-bold"
        >
          Edit Appointment
        </h1>
        <form
          class="flex flex-col max-w-2xl gap-y-8"
          @submit.prevent="updateAppointment"
        >
          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex flex-col w-full">
              <label class="mb-1" for="appointment-name"
                >Appointment name:</label
              >
              <input
                id="appointment-name"
                v-model="data.appointmentName"
                required
                class="form-control p-2 py-3.5 focus:outline-none"
                type="text"
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="mb-1" for="for">Appointent for:</label>
              <input
                id="for"
                v-model="data.appointmentFor"
                required
                class="w-full p-2.5 py-3.5 focus:outline-none"
                type="text"
                placeholder="Eg. your name"
              />
            </div>
          </div>
          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex flex-col w-full">
              <label class="mb-1" for="type">Type:</label>
              <select
                id="type"
                v-model="data.appointmentType"
                required
                class="p-2.5 py-3.5 focus:outline-none"
              >
                <option selected="selected" value="select type">
                  Select type
                </option>
                <option value="hospital">Hospital</option>
                <option value="gp surgery">GP Surgery</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="flex flex-col w-full">
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
            <div class="flex flex-col w-full">
              <label class="mb-1" for="time">Time:</label>
              <input
                id="time"
                v-model="data.time"
                required
                class="p-2 py-3.5 focus:outline-none"
                type="time"
              />
            </div>
            <div class="flex flex-col w-full">
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
            <label class="mb-1" for="locationdetails"
              >Location details:</label
            >
            <textarea
              id="locationdetails"
              v-model="data.appointmentLocationDetails"
              class="p-2 py-3.5 focus:outline-none"
              type="text"
            ></textarea>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1" for="postcode">Post Code:</label>
            <input
              id="postcode"
              v-model="data.postCode"
              class="p-2 py-3.5 focus:outline-none"
              type="text"
              placeholder="Optional"
            />
          </div>
          <button
            class="w-full py-4 font-semibold tracking-wider uppercase bg-gray-800 text-gray-50 hover:bg-gray-900 md:w-6/12"
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
