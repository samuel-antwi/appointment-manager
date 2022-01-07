<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'

  const email = ref('')
  const statusMsg = ref('')

  const handleForgottenPassword = async () => {
    try {
      let { data, error } = await supabase.auth.api.resetPasswordForEmail(email.value)
      if (error) throw error
      statusMsg.value =
        'If you have an account with this email, a password recovery link would be sent to this email.'
      email.value = null
    } catch (error) {
      console.log(error.message)
    }
  }
</script>

<template>
  <div class="max-w-2xl px-4 mx-auto my-12">
    <!-- Error handling -->
    <div v-if="statusMsg" class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey">
      <p class="text-green-500">{{ statusMsg }}</p>
      <button @click="errorMsg = null" class="absolute top-0 text-lg right-2">
        &times;
      </button>
    </div>
    <div class="p-8 rounded-md shadow-md bg-light-grey">
      <h1 class="mb-4 text-xl font-semibold text-info">Reset Password</h1>
      <form @submit.prevent="handleForgottenPassword" class="flex flex-col gap-y-3">
        <div class="flex flex-col">
          <label class="mb-1" for="email">Email*</label>
          <input
            v-model="email"
            class="p-2.5 focus:outline-none rounded-md"
            type="email"
            id="email"
          />
        </div>
        <button
          :disabled="!email"
          class="px-5 py-2 text-gray-100 rounded-md sm:self-start bg-info"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
