<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'

  let email = ref('')
  let statusMsg = ref('')
  let errorMsg = ref('')

  const unregisteredEmailMessage = () => {
    return `Oops!, there is no account associated with ${email.value}`
  }

  const handleForgottenPassword = async () => {
    try {
      let { data, error } = await supabase.auth.api.resetPasswordForEmail(email.value)
      if (error) throw error
      statusMsg.value = ` A password recovery link would be sent to ${email.value}.`
      email.value = null
    } catch (error) {
      console.log(error.message)
      if (error.message.includes('found')) {
        errorMsg.value = unregisteredEmailMessage()
        return
      }
      errorMsg.value = error.message
    }
  }
</script>

<template>
  <div class="max-w-2xl px-4 pt-40 mx-auto">
    <!-- Error handling -->
    <div
      v-if="statusMsg || errorMsg"
      class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey"
    >
      <p v-if="statusMsg">{{ statusMsg }}</p>
      <p v-else class="text-red-500">{{ errorMsg }}</p>
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
            required
            v-model="email"
            class="p-2.5 focus:outline-none rounded-md"
            type="text"
            id="email"
          />
        </div>
        <button
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
