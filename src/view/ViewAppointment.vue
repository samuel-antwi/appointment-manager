<script setup>
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { supabase } from "../supabase"
  import moment from "moment"

  //   import InputForm from '../components/InputForm.vue'

  let isLoading = ref(true)
  let errorMsg = ref(null)
  let statusMsg = ref(null)
  const route = useRoute()
  const router = useRouter()
  let data = ref(null)
  let modalActive = ref(false)
  let edit = ref(false)

  //   Get store instance

  // Open Modal
  const openModal = () => {
    modalActive.value = true
  }

  // Close modal
  const closeModal = () => {
    modalActive.value = false
  }

  const formatTodayDate = () => {
    return moment(new Date()).format("YYYY-MM-DD")
  }

  //   console.log(editMode())

  // Get route param
  const currentId = route.params.appointmentId

  // Fetch appointment details from supabase
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

  //   Delete appointment
  const deleteAppointment = async () => {
    try {
      if (confirm("Are you sure you want to delete this appointment?")) {
        const { error } = await supabase.from("appointments").delete().eq("id", currentId)
        if (error) throw error
        router.push({ name: "All" })
      }
    } catch (error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }

  // Fetch data from supabase when component mounts
  onMounted(() => {
    getAppointmentData()
  })

  //   Update appointment
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
      closeModal()
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
  <div class="h-screen padding-wrapper">
    <div v-if="data">
      <div class="max-w-2xl px-4 mx-auto">
        <h1 class="py-3 text-2xl font-semibold text-center capitalize text-secondary">
          {{ data.appointmentFor }}
        </h1>
        <div v-if="statusMsg || errorMsg" class="max-w-2xl p-4 mx-auto mb-5 rounded-md">
          <p class="text-red-500">{{ errorMsg }}</p>
          <p class="text-secondary">{{ statusMsg }}</p>
        </div>
        <div
          class="relative flex flex-col items-center justify-center p-4 text-center rounded-md shadow-lg card-wrapper bg-[#ffffff]"
        >
          <div class="absolute flex items-center gap-x-2 right-3 top-3">
            <router-link
              :to="{ name: 'EditAppointment', params: { appointmentId: data.id } }"
            >
              <button
                class="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-secondary"
                @click="openModal"
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
              alt="Baby"
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
              v-else
              class="object-cover w-40 h-40 mx-auto rounded-full"
              src="../assets/images/kaylee-gianna.jpeg"
              alt="Baby"
            />
            <p class="p-2 mx-auto text-gray-100 capitalize rounded-md w-28 bg-secondary">
              {{ data.appointmentName }}
            </p>
            <div class="flex flex-col text-left text-gray-600 gap-y-4">
              <span class="sm:items-center sm:flex">
                <p class="text-gray-600 capitalize">
                  <fa icon="calendar-alt" />
                  {{ moment(data.date).format("dddd, Do MMMM YYYY") }}
                </p>
                <span class="hidden px-2 sm:block text-secondary">|</span>
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
