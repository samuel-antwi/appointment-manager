<script setup>
  import { ref, onMounted } from "vue"
  import moment from "moment"
  import { useRoute } from "vue-router"
  import { supabase } from "../supabase"

  let isLoading = ref(true)
  let errorMsg = ref(null)
  let statusMsg = ref(null)
  const route = useRoute()
  let data = ref(null)
  let isDisabled = ref(true)

  // Get Current ID
  const currentId = route.params.appointmentId

  // Get and format today's date
  const formatTodayDate = () => {
    return moment(new Date()).format("YYYY-MM-DD")
  }

  const getAppointmentData = async () => {
    try {
      const { error, data: appointments } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", currentId)
      if (error) throw error
      data.value = appointments[0]
      isLoading.value = false
    } catch (error) {
      console.log(error.message)
      errorMsg.value = error.message
    }
  }

  onMounted(() => {
    getAppointmentData()
  })

  const updateAppointment = async () => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          appointmentName: data.value.appointmentName,
          appointmentFor: data.value.appointmentFor,
          appointmentType: data.value.appointmentType,
          postCode: data.value.postCode,
          appointmentLocationDetails: data.value.appointmentLocationDetails,
          time: data.value.time,
          date: data.value.date,
          location: data.value.location,
          completed: false,
        })
        .eq("id", currentId)
      statusMsg.value = "Appointment updated successfully!"
      setTimeout(() => {
        statusMsg.value = null
      }, 5000)
      if (error) throw error
    } catch (error) {
      console.log(error.message)
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }
</script>

<template>
  <div class="height-wrapper">
    <div v-if="isLoading"></div>

    <div class="py-12" v-else>
      <div class="max-w-3xl bg-[#ffffff] p-8 md:px-10 mx-auto edit">
        <div v-if="errorMsg" class="p-4 mb-10 rounded-md">
          <p class="text-red-500">
            {{ errorMsg }}
          </p>
        </div>
        <div
          v-if="statusMsg"
          class="p-4 mb-10 text-lg tracking-wider text-center bg-gray-800 rounded-md text-gray-50"
        >
          <p>
            {{ statusMsg }}
          </p>
        </div>
        <h1
          class="py-5 mb-4 text-2xl font-semibold tracking-wider text-gray-700 uppercase md:text-3xl md:font-bold"
        >
          Appointment Details
        </h1>
        <form class="flex flex-col max-w-2xl gap-y-8" @submit.prevent="updateAppointment">
          <div class="flex flex-col gap-8 md:flex-row">
            <div class="flex flex-col w-full">
              <label class="mb-1" for="appointment-name">Appointment name:</label>
              <input
                id="appointment-name"
                v-model="data.appointmentName"
                required
                class="p-2 py-3.5 focus:outline-none form-control"
                type="text"
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="mb-1" for="for">Appointent for:</label>
              <select
                id="for"
                v-model="data.appointmentFor"
                required
                class="p-2.5 py-3.5 focus:outline-none w-full"
              >
                <option selected="selected" value="select">Select name</option>
                <option value="kaylee">Kaylee</option>
                <option value="gianna">Gianna</option>
                <option value="kaylee and gianna">Kaylee and Gianna</option>
              </select>
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
                <option selected="selected" value="select type">Select type</option>
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
            <label class="mb-1" for="locationdetails">Location details:</label>
            <textarea
              id="locationdetails"
              v-model="data.appointmentLocationDetails"
              class="p-2 py-3.5 focus:outline-none"
              type="text"
            ></textarea>
          </div>
          <div class="flex flex-col w-full md:w-1/2">
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
            :class="{ disabled: isDisabled }"
            class="max-w-xs py-4 font-semibold tracking-wider uppercase bg-gray-800 hover:bg-gray-900 text-gray-50"
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

    .disbabled {
      background: #dddddd;
      color: #cccccc;
    }
  }
</style>
