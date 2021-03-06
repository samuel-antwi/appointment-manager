<script setup>
  import { ref } from "vue"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { useAppointments } from "../store/Appointments"
  import moment from "moment"
  import { useUser } from "../store/useUser"

  let router = useRouter()
  let appointmentName = ref(null)
  let appointmentType = ref(null)
  let date = ref(null)
  let appointmentLocationDetails = ref(null)
  let time = ref(null)
  let location = ref(null)
  let postCode = ref(null)
  let completed = ref(false)
  let errorMsg = ref(null)
  let statusMsg = ref(null)
  let appointmentFor = ref(null)
  let appointmentTypeOptions = ref([
    { name: "Select", value: "select" },
    { name: "Hospital", value: "hospital" },
    { name: "GP Surgery", value: "gp surgery" },
    { name: "School", value: "school" },
    { name: "Other", value: "other" },
  ])

  const appointments = useAppointments()
  const userStore = useUser()
  const userId = userStore.getUserId

  const createAppointment = async () => {
    try {
      const { error } = await supabase.from("appointments").insert([
        {
          appointmentName: appointmentName.value,
          appointmentFor: appointmentFor.value.toLowerCase(),
          appointmentType: appointmentType.value,
          time: time.value,
          date: date.value,
          location: location.value,
          postCode: postCode.value,
          appointmentLocationDetails:
            appointmentLocationDetails.value,
          completed: false,
          user_id: userId,
        },
      ])
      if (error) throw error
      router.push({ name: "All" })
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
  <div class="py-12 height-wrapper">
    <div class="max-w-2xl px-8 mx-auto text-center">
      <div
        v-if="errorMsg"
        class="p-4 mb-10 text-lg tracking-wider text-center bg-gray-800 rounded-md text-gray-50"
      >
        <p>
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
    </div>
    <div class="edit mx-auto max-w-3xl bg-[#ffffff] p-8 md:px-10">
      <h1
        class="py-5 mb-4 text-2xl font-semibold text-gray-700 uppercase md:text-3xl md:font-bold"
      >
        Add Appointment
      </h1>
      <form
        class="flex flex-col max-w-2xl gap-y-8"
        @submit.prevent="createAppointment"
      >
        <div class="flex flex-col gap-8 md:flex-row">
          <div class="flex flex-col w-full">
            <label class="mb-1" for="appointment-name"
              >Appointment name:*</label
            >
            <input
              id="appointment-name"
              v-model="appointmentName"
              required
              class="form-control p-2 py-3.5 focus:outline-none"
              type="text"
            />
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1" for="for">Appointent for:*</label>
            <input
              id="for"
              v-model="appointmentFor"
              required
              class="w-full p-2.5 py-3.5 focus:outline-none"
              type="text"
              placeholder="Eg. your name"
            />
          </div>
        </div>
        <div class="flex flex-col gap-8 md:flex-row">
          <div class="flex flex-col w-full">
            <label class="mb-1" for="type">Type:*</label>
            <select
              id="type"
              v-model="appointmentType"
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
            <label class="mb-1" for="date">Date:*</label>
            <input
              id="date"
              v-model="date"
              required
              class="p-2 py-3.5 focus:outline-none"
              type="date"
            />
          </div>
        </div>

        <div class="flex flex-col gap-8 md:flex-row">
          <div class="flex flex-col w-full">
            <label class="mb-1" for="time">Time:*</label>
            <input
              id="time"
              v-model="time"
              required
              class="p-2 py-3.5 focus:outline-none"
              type="time"
            />
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1" for="location">Location:*</label>
            <input
              id="location"
              v-model="location"
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
            v-model="appointmentLocationDetails"
            class="p-2 py-3.5 focus:outline-none"
            type="text"
            placeholder="Clinic 11, Women and Children's Center (Optional)"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label class="mb-1" for="postcode">Post Code:</label>
          <input
            id="postcode"
            v-model="postCode"
            class="p-2 py-3.5 focus:outline-none"
            type="text"
            placeholder="Optional"
          />
          <small class="pt-2 tracking-wider text-gray-600"
            >* indicates required fields!</small
          >
        </div>

        <button
          class="w-full py-4 font-semibold tracking-wider uppercase bg-gray-800 text-gray-50 hover:bg-gray-900 md:w-6/12"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
</style>
