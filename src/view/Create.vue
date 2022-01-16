<script>
  import { computed, ref } from 'vue'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'
  import InputForm from '../components/InputForm.vue'
  import { useMainStore } from '../store/main'
  import moment from 'moment'
  import { useUser } from '../store/useUser'
  export default {
    components: { InputForm },
    setup() {
      const router = useRouter()
      const appointmentName = ref('')
      const appointmentType = ref('')
      const date = ref('')
      const time = ref('')
      const location = ref('')
      const completed = ref(false)
      const errorMsg = ref(null)
      const statusMsg = ref(null)
      const appointmentFor = ref('')
      const appointmentTypeOptions = ref([
        { name: 'Select', value: 'select' },
        { name: 'Hospital', value: 'hospital' },
        { name: 'GP Surgery', value: 'gp surgery' },
        { name: 'School', value: 'school' },
        { name: 'Other', value: 'other' },
      ])

      const main = useMainStore()
      const userStore = useUser()
      const userId = userStore.getUserId

      const edit = main.edit

      // Get yesterday
      const yesterday = new Date(Date.now())
      yesterday.setDate(yesterday.getDate() - 1)

      const createAppointment = async () => {
        try {
          const { error } = await supabase.from('appointments').insert([
            {
              appointmentName: appointmentName.value,
              appointmentFor: appointmentFor.value,
              appointmentType: appointmentType.value,
              time: time.value,
              date: date.value,
              location: location.value,
              completed: false,
              user_id: userId,
            },
          ])
          if (error) throw error
          router.push({ name: 'All' })
        } catch (error) {
          console.log(error.message)
          errorMsg.value = error.message
          setTimeout(() => {
            errorMsg.value = null
          }, 5000)
        }
      }

      return {
        createAppointment,
        appointmentName,
        appointmentFor,
        appointmentType,
        date,
        time,
        completed,
        errorMsg,
        statusMsg,
        location,
        edit,
        yesterday,
        appointmentTypeOptions,
        userId,
      }
    },
  }
</script>

<template>
  <div class="max-w-2xl px-4 mx-auto mt-12">
    <div v-if="statusMsg || errorMsg" class="p-4 mb-10 rounded-md bg-[#F1F1F1]">
      <p class="text-red-500">{{ errorMsg }}</p>
      <p class="text-success">{{ statusMsg }}</p>
    </div>
    <div class="bg-[#F1F1F1] p-5 rounded-md shadow-lg">
      <h1 class="mb-4 text-2xl text-info">Add new appointment</h1>
      <form @submit.prevent="createAppointment" class="flex flex-col gap-y-4">
        <div class="flex flex-col">
          <label class="mb-1 text-info label-text" for="appointment-name"
            >Appointment name</label
          >
          <input
            required
            v-model="appointmentName"
            class="p-2 rounded-md focus:outline-none form-control"
            type="text"
            id="appointment-name"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="for">Appointent for</label>
          <select
            required
            v-model="appointmentFor"
            class="p-2.5 rounded-md focus:outline-none w-full"
            id="for"
          >
            <option selected="selected" value="select">Select name</option>
            <option value="kaylee">Kaylee</option>
            <option value="gianna">Gianna</option>
            <option value="kaylee and gianna">Kaylee and Gianna</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="type">Select appointment type</label>
          <select
            required
            v-model="appointmentType"
            class="p-2.5 focus:outline-none rounded-md"
            id="type"
          >
            <option
              v-for="(appointment, index) in appointmentTypeOptions"
              :key="index"
              :value="appointment.value"
            >
              {{ appointment.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="date">Date</label>
          <input
            required
            v-model="date"
            class="p-2 rounded-md focus:outline-none"
            type="date"
            id="date"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="time">Time</label>
          <input
            required
            v-model="time"
            class="p-2 rounded-md focus:outline-none"
            type="time"
            v-bind:min="yesterday"
            id="time"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="location">Location</label>
          <input
            required
            v-model="location"
            class="p-2 rounded-md focus:outline-none"
            type="text"
            id="location"
          />
        </div>
        <button class="self-start btn btn-info" type="submit">submit</button>
      </form>
    </div>
  </div>
</template>

<style></style>
