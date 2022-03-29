<script setup>
  import { computed, ref, watchEffect } from "vue"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { useUser } from "../store/useUser"

  let email = ref("")
  let password = ref("")
  let errorMsg = ref(null)
  let statusMsg = ref(null)
  let isLoading = ref(false)
  const router = useRouter()

  const userStore = useUser()

  const user = computed(() => userStore.user)

  const handleLogin = async () => {
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      router.push({ name: "All" })
      isLoading.value = false
    } catch (error) {
      errorMsg.value = error.message
      setTimeout(() => {
        errorMsg.value = null
      }, 5000)
      isLoading.value = false
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
    <div class="max-w-2xl px-4 mx-auto">
      <!-- Error handling -->
      <div class="form-wrapper">
        <div class="w-full rounded-md bg-[#ffffff] p-8 shadow-md">
          <div
            v-if="errorMsg"
            class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey"
          >
            <p class="text-red-500" v-if="errorMsg">{{ errorMsg }}</p>
            <button
              class="absolute top-0 text-lg right-2"
              @click="errorMsg = null"
            >
              &times;
            </button>
          </div>
          <div
            v-if="statusMsg"
            class="relative p-4 mb-10 rounded-md shadow-lg bg-light-grey"
          >
            <p>{{ statusMsg }}</p>
            <button
              class="absolute top-0 text-lg right-2"
              @click="errorMsg = null"
            >
              &times;
            </button>
          </div>
          <h1 class="mb-4 text-xl font-semibold text-info">Login</h1>
          <form
            class="flex flex-col gap-y-6"
            @submit.prevent="handleLogin"
          >
            <div class="flex flex-col">
              <label>
                <h1 class="mb-1">Email*</h1>
                <input
                  v-bind:class="{ errorBorder: errorMsg }"
                  id="email"
                  v-model="email"
                  class="w-full px-2.5 py-3.5 focus:outline-none"
                  type="email"
                />
              </label>
            </div>
            <div class="flex flex-col">
              <label>
                <h1 class="mb-1">Password*</h1>
                <input
                  v-bind:class="{ errorBorder: errorMsg }"
                  v-model="password"
                  class="w-full px-2.5 py-3.5 focus:outline-none"
                  type="password"
                />
              </label>
            </div>
            <button
              :disabled="isLoading"
              class="w-full bg-gray-900 px-10 py-3.5 font-semibold uppercase tracking-wider text-gray-100 hover:bg-gray-800"
              type="submit"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Login</span>
            </button>
            <div
              class="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0"
            >
              <router-link
                class="text-info"
                :to="{ name: 'ForgottenPassword' }"
              >
                Forgotten password?
              </router-link>
              <p class="text-right">
                Don't have an account yet?
                <router-link
                  class="text-info"
                  :to="{ name: 'Signup' }"
                  >Sign up</router-link
                >
              </p>
              <p></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 60vh;
  }

  .errorBorder {
    border-color: red !important;
  }
</style>
