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
    <nav class="px-4">
      <div class="mx-auto flex max-w-5xl items-center justify-between py-5">
        <router-link class="btn btn-secondary md:btn-lg" to="/"> KayGia </router-link>
        <div class="hidden items-center gap-x-4 sm:flex">
          <router-link
            v-if="user"
            class="font-semibold tracking-wider text-gray-700"
            :to="{ name: 'CreateAppointment' }"
            >Create</router-link
          >
          <button
            v-if="user"
            class="font-semibold tracking-wider text-gray-700"
            @click="handleSignOut"
          >
            Sign Out
          </button>
          <router-link
            v-else
            class="font-semibold tracking-wider text-gray-700"
            :to="{ name: 'Login' }"
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

<style scoped>
  nav {
    height: 100px;
  }
</style>
