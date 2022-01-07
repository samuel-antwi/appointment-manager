<script setup>
  import { computed, onMounted, ref, watch, watchEffect } from 'vue'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'
  import { useUser } from '../store/useUser'

  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const passwordType = ref('password')
  let errorMsg = ref(null)
  const router = useRouter()

  const userStore = useUser()

  const user = computed(() => userStore.user)

  // Togglepassword type
  const togglePasswordType = () => {
    if (passwordType.value === 'password') {
      return (passwordType.value = 'text')
    }
    return (passwordType.value = 'password')
  }

  // Toggle show password
  const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
    togglePasswordType()
  }

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      if (user) {
        router.push({ name: 'Home' })
      }
    } catch (error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
    }
  }

  // Redirect to home home page when user is logged in
  watchEffect(() => {
    if (user.value) {
      router.push({ name: 'Home' })
    }
  })
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
      <h1 class="mb-4 text-xl font-semibold text-info">Login</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-y-3">
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
          <label class="mb-1" for="email">Password*</label>
          <div class="relative w-full">
            <input
              v-model="password"
              class="p-2.5 w-full focus:outline-none rounded-md"
              :type="passwordType"
              id="password"
            />
            <span
              v-if="password"
              @click="toggleShowPassword"
              class="absolute top-2.5 right-5 text-gray-600"
            >
              <fa icon="eye" v-if="showPassword" />
              <fa icon="eye-slash" v-else />
            </span>
          </div>
        </div>
        <button
          class="px-5 py-2 text-gray-100 rounded-md sm:self-start bg-info"
          type="submit"
        >
          Login
        </button>
        <div class="items-center justify-between pt-3 sm:flex">
          <router-link class="text-info" :to="{ name: 'ForgottenPassword' }"
            >Forgotten password?</router-link
          >
          <p class="pt-3 text-gray-600 sm:pt-0">
            Don't have an account yet?
            <router-link :to="{ name: 'Signup' }" class="text-info">Sign up</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
