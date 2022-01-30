<script setup>
  import { ref } from 'vue'

  let isLoading = ref(false)
</script>

<template>
  <div class="pt-40">
    <div v-if="isLoading">
      <p></p>
    </div>
    <div v-else class="max-w-5xl px-4 mx-auto">
      <div v-if="!data" class="text-center">
        <p class="mb-5 text-xl">You currently don't have any past appointment</p>
      </div>
      <div v-else>
        <h1 class="py-5 text-2xl font-semibold text-center text-gray-600 sm:text-left">
          Past Appointment(s)
        </h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <p>Here are your past appointments</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
