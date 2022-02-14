<script setup>
  import { computed, ref, watchEffect } from "vue"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { useUser } from "../store/useUser"

  const email = ref("")
  const password = ref("")
  const showPassword = ref(false)
  const passwordType = ref("password")
  let errorMsg = ref(null)
  const router = useRouter()

  const userStore = useUser()

  const user = computed(() => userStore.user)

  // Togglepassword type
  const togglePasswordType = () => {
    if (passwordType.value === "password") {
      return (passwordType.value = "text")
    }
    return (passwordType.value = "password")
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
        router.push({ name: "Home" })
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
      router.push({ name: "Home" })
    }
  })
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
        <h1 class="text-info mb-4 text-xl font-semibold">Login</h1>
        <form class="flex flex-col gap-y-6" @submit.prevent="handleLogin">
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
            <label class="mb-1" for="email">Password*</label>
            <div class="relative w-full">
              <input
                id="password"
                v-model="password"
                class="w-full px-2.5 py-3.5 focus:outline-none"
                :type="passwordType"
              />
              <button
                v-if="password"
                type="button"
                class="absolute top-2.5 right-5 text-gray-600"
                @click="toggleShowPassword"
              >
                <fa v-if="showPassword" icon="eye" />
                <fa v-else icon="eye-slash" />
              </button>
            </div>
          </div>
          <button
            class="bg-info px-10 py-3.5 font-medium uppercase tracking-wider text-gray-100 sm:self-start"
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
              <router-link :to="{ name: 'Signup' }" class="text-info"
                >Sign up</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
