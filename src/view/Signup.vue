<script setup>
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { ref } from "vue"

  let errorMsg = ref(null)
  let email = ref("")
  let password = ref("")
  let confirmPassword = ref("")
  const router = useRouter()

  const handleRegister = async () => {
    if (password.value === confirmPassword.value) {
      try {
        const { error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        router.push({ name: "EmailConfirmation" })
      } catch (error) {
        errorMsg.value = error.message
      }
      return
    } else {
      errorMsg.value = "Error: Password do not match"
    }
  }
</script>

<template>
  <div class="height-wrapper padding-wrapper">
    <div class="mx-auto max-w-2xl px-4">
      <!-- Error handling -->
      <div v-if="errorMsg" class="bg-light-grey relative mb-10 rounded-md p-4 shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
        <button class="absolute top-0 right-2 text-lg" @click="errorMsg = null">
          &times;
        </button>
      </div>
      <div class="rounded-md bg-[#ffffff] p-8 shadow-md">
        <h1 class="text-info mb-4 text-xl font-semibold">Sign up</h1>
        <form class="flex flex-col gap-y-6" @submit.prevent="handleRegister">
          <div class="flex flex-col">
            <label class="mb-1" for="email">Email*</label>
            <input
              id="email"
              v-model="email"
              class="px-2.5 py-3.5 focus:outline-none"
              type="email"
            />
          </div>
          <div class="flex flex-col">
            <label class="mb-1" for="password">Password*</label>
            <input
              required
              id="password"
              v-model="password"
              class="px-2.5 py-3.5 focus:outline-none"
              type="password"
            />
          </div>
          <div class="flex flex-col">
            <label class="mb-1" for="confirm password">Confirm password*</label>
            <input
              id="confirm password"
              v-model="confirmPassword"
              class="px-2.5 py-3.5 focus:outline-none"
              type="password"
            />
          </div>

          <button
            class="w-full bg-gray-900 px-10 py-3.5 font-semibold uppercase tracking-wider text-gray-100 hover:bg-gray-800 sm:self-start"
            type="submit"
          >
            Register
          </button>
          <p class="text-right text-gray-600">
            Already have an account?
            <router-link :to="{ name: 'Login' }" class="text-info">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
