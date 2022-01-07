<script setup>
  import { computed, ref, watchEffect } from 'vue'
  import { useUser } from '../store/useUser'

  //   let isLoading = ref(true)

  //   const userStore = useUser()

  //   const email = computed(() => userStore.getUserEmail)

  //   watchEffect(() => {
  //     if (email?.value) {
  //       isLoading.value = false
  //     }
  //   })
</script>

<template>
  <div class="max-w-2xl px-4 mx-auto my-12 text-center">
    <div>
      <h1 class="mb-3 text-2xl">Thank you for regisering!</h1>
      <p>Please confirm your email to complete signing up.</p>
    </div>
  </div>
</template>

<style></style>
