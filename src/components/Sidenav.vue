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
      class="fixed top-0 left-0 z-50 w-full min-h-screen p-6 sm:hidden bg-gray-50"
    >
      <div class="flex justify-between">
        <router-link class="mb-10 btn btn-primary md:btn-lg" to="/"> KayGia</router-link>
        <div>
          <button @click="toggleSideNav" class="text-3xl">&#215;</button>
        </div>
      </div>
      <div @click="toggleSideNav" class="flex flex-col items-center gap-y-6">
        <p class="text-center" v-if="user">Hi, {{ email }}</p>
        <router-link
          v-if="user"
          class="text-xl font-semibold tracking-wider"
          :to="{ name: 'CreateAppointment' }"
        >
          Create</router-link
        >
        <button
          v-if="user"
          class="text-xl font-semibold tracking-wider"
          @click="handleSignOut"
        >
          Logout
        </button>
        <router-link
          v-if="!user"
          class="text-xl font-semibold tracking-wider"
          :to="{ name: 'Login' }"
        >
          Login</router-link
        >
      </div>
    </nav>
  </transition>
</template>

<style scoped></style>
