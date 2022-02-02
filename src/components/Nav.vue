<script setup>
  import { computed } from "vue"
  import { useUser } from "../store/useUser"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import Sidenav from "./Sidenav.vue"
  import { ref } from "vue"

  const userStore = useUser()

  const user = computed(() => userStore.user)
  let showSidenav = ref(false)
  const email = computed(() => userStore.getUserEmail)
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push({ name: "Login" })
  }

  const toggleSideNav = () => {
    showSidenav.value = !showSidenav.value
  }
</script>

<template>
  <div>
    <nav class="px-4 py-5 bg-transparent">
      <div class="flex items-center justify-between max-w-5xl mx-auto">
        <router-link class="btn btn-secondary md:btn-lg" to="/"> KayGia </router-link>
        <div class="items-center hidden sm:flex gap-x-4">
          <p v-if="user">Hi, {{ email }}</p>
          <router-link
            v-if="user"
            class="btn btn-primary"
            :to="{ name: 'CreateAppointment' }"
            >Create</router-link
          >
          <button v-if="user" class="btn btn-primary" @click="handleSignOut">
            Logout
          </button>
          <router-link v-else class="btn btn-primary" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </div>
        <button class="sm:hidden" type="button" @click="toggleSideNav">
          <fa v-if="showSidenav" class="text-3xl" icon="times" />
          <fa v-else class="text-3xl" icon="bars" />
        </button>
      </div>
    </nav>
    <Sidenav :show-sidenav="showSidenav" :toggle-side-nav="toggleSideNav" />
  </div>
</template>

<style scoped></style>
