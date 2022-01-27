<script setup>
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  let errorMsg = ref(null)
  let statusMsg = ref(null)
  let email = ref('')
  let password = ref('')
  let confirmPassword = ref('')
  const router = useRouter()

  const handleRegister = async () => {
    if (password.value === confirmPassword.value) {
      try {
        const { error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        router.push({ name: 'EmailConfirmation' })
      } catch (error) {
        errorMsg.value = error.message
      }
      return
    } else {
      errorMsg.value = 'Error: Password do not match'
    }
  }
</script>

<template>
  <div class="max-w-2xl px-4 mx-auto my-12">
    <!-- Error handling -->
    <div v-if="errorMsg" class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey">
      <p class="text-red-500">{{ errorMsg }}</p>
      <button @click="errorMsg = null" class="absolute top-0 text-lg right-2">
        &times;
      </button>
    </div>
    <div class="p-8 rounded-md shadow-md bg-light-grey">
      <h1 class="mb-4 text-xl font-semibold text-info">Sign up</h1>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-y-3">
        <div class="flex flex-col">
          <label class="mb-1" for="email">Email*</label>
          <input
            v-model="email"
            class="p-2.5 focus:outline-none rounded-md"
            type="email"
            id="email"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1" for="password">Password*</label>
          <input
            v-model="password"
            class="p-2.5 focus:outline-none rounded-md"
            type="password"
            id="password"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1" for="confirm password">Confirm password*</label>
          <input
            v-model="confirmPassword"
            class="p-2.5 focus:outline-none rounded-md"
            type="password"
            id="confirm password"
          />
        </div>

        <button
          class="px-5 py-2 text-gray-100 rounded-md sm:self-start bg-info"
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
</template>

<style></style>
