<script setup>
  import { ref } from "vue"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"

  let password = ref("")
  let confirmPassword = ref("")
  let statusMsg = ref("")
  let errorMsg = ref("")

  const unregisteredEmailMessage = () => {
    return `Oops!, there is no account associated with ${email.value}`
  }

  const handleForgottenPassword = async () => {
    try {
      let { data, error } = await supabase.auth.api.resetPasswordForEmail(email.value)
      if (error) throw error
      statusMsg.value = ` A password recovery link would be sent to ${email.value}.`
      setTimeout(() => {
        statusMsg.value = null
      }, 5000)
      email.value = null
    } catch (error) {
      console.log(error.message)
      if (error.message.includes("found")) {
        errorMsg.value = unregisteredEmailMessage()
        return
      }
      errorMsg.value = error.message
    }
  }
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div class="mx-auto max-w-2xl px-4">
      <!-- Error handling -->
      <div
        v-if="statusMsg || errorMsg"
        class="bg-light-grey relative mb-10 rounded-md p-4 shadow-lg"
      >
        <p v-if="statusMsg">{{ statusMsg }}</p>
        <p v-else class="text-red-500">{{ errorMsg }}</p>
        <button @click="errorMsg = null" class="absolute top-0 right-2 text-lg">
          &times;
        </button>
      </div>
      <div class="rounded-md bg-[#ffffff] p-8 shadow-md">
        <h1 class="text-info mb-4 text-xl font-semibold">Reset Password</h1>
        <form @submit.prevent="handleForgottenPassword" class="flex flex-col gap-y-3">
          <div class="flex flex-col">
            <label class="mb-1" for="password">Password</label>
            <input
              required
              v-model="password"
              class="px-2.5 py-3.5 focus:outline-none"
              type="text"
              id="password"
            />
          </div>
          <div class="flex flex-col">
            <label class="mb-1" for="confirmpassword">Confirm Password</label>
            <input
              required
              v-model="confirmPassword"
              class="px-2.5 py-3.5 focus:outline-none"
              type="text"
              id="confirmpassword"
            />
          </div>
          <button
            class="bg-info px-10 py-3.5 font-medium uppercase tracking-wider text-gray-100 sm:self-start"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
