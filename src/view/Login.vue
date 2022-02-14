<script setup>
  import { computed, ref, watchEffect } from "vue"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { useUser } from "../store/useUser"

  const email = ref("")
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
      })
      if (error) throw error
      statusMsg.value = `A login link has been sent to ${email?.value}`
      setTimeout(() => {
        statusMsg.value = null
      }, 5000)
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
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div class="mx-auto max-w-2xl px-4">
      <!-- Error handling -->
      <div v-if="errorMsg" class="bg-light-grey relative mb-10 rounded-md p-4 shadow-lg">
        <p class="text-red-500" v-if="errorMsg">{{ errorMsg }}</p>
        <button class="absolute top-0 right-2 text-lg" @click="errorMsg = null">
          &times;
        </button>
      </div>
      <div v-if="statusMsg" class="bg-light-grey relative mb-10 rounded-md p-4 shadow-lg">
        <p>{{ statusMsg }}</p>
        <button class="absolute top-0 right-2 text-lg" @click="errorMsg = null">
          &times;
        </button>
      </div>
      <div class="form-wrapper">
        <div class="w-full rounded-md bg-[#ffffff] p-8 shadow-md">
          <h1 class="text-info mb-4 text-xl font-semibold">Login</h1>
          <form class="flex flex-col gap-y-6" @submit.prevent="handleLogin">
            <div class="flex flex-col">
              <label class="mb-1" for="email">Email*</label>
              <input
                v-bind:class="{ errorBorder: errorMsg }"
                id="email"
                v-model="email"
                class="px-2.5 py-3.5 focus:outline-none"
                type="email"
              />
            </div>
            <button
              :disabled="isLoading"
              class="w-full bg-gray-900 px-10 py-3.5 font-semibold uppercase tracking-wider text-gray-100 hover:bg-gray-800"
              type="submit"
            >
              Send magic link
            </button>
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
