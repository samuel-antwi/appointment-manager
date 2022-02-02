<script setup>
  import { computed } from "vue"
  import { useUser } from "../store/useUser"
  import { supabase } from "../supabase"
  import { useRouter } from "vue-router"
  import { onClickOutside } from "@vueuse/core"
  import { ref } from "vue"

  const props = defineProps(["showSidenav", "toggleSideNav"])

  const userStore = useUser()

  const user = computed(() => userStore.user)

  const email = computed(() => userStore.getUserEmail)
  const router = useRouter()

  const target = ref(null)

  // Close sidenav when outside div is clicked
  onClickOutside(target, (event) => {
    props.toggleSideNav()
    console.log(`You have clicked outside`)
  })

  // Sign out user
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push({ name: "Login" })
  }

  // return { handleSignOut, email, user, target }
</script>

<template>
  <transition name="mobile-animation">
    <nav
      v-if="showSidenav"
      ref="target"
      class="fixed top-0 left-0 z-50 w-full h-full p-6 overflow-y-hidden sm:hidden bg-gray-50"
    >
      <div>
        <button class="absolute text-3xl right-4" @click="toggleSideNav">&#215;</button>
        <div class="flex flex-col items-start gap-y-5" @click="toggleSideNav">
          <router-link class="mb-10 btn btn-primary md:btn-lg" to="/">
            KayGia</router-link
          >
          <p v-if="user">Hi, {{ email }}</p>
          <div class="flex flex-col font-semibold text-blue-600 gap-y-5">
            <router-link v-if="user" class="" :to="{ name: 'CreateAppointment' }">
              Create</router-link
            >
            <button v-if="user" class="font-semibold" @click="handleSignOut">
              Logout
            </button>
            <router-link v-if="!user" class="font-semibold" :to="{ name: 'Login' }">
              Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </transition>
</template>

<style scoped></style>
