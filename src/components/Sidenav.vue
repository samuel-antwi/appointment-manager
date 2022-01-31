<script setup>
  import { computed } from 'vue'
  import { useUser } from '../store/useUser'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'
  import { onClickOutside } from '@vueuse/core'
  import { ref } from 'vue'
  import { defineProps } from 'vue'

  const props = defineProps(['showSidenav', 'toggleSideNav'])

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
    router.push({ name: 'Login' })
  }

  // return { handleSignOut, email, user, target }
</script>

<template>
  <transition name="mobile-animation">
    <nav
      ref="target"
      v-if="showSidenav"
      class="fixed top-0 left-0 z-50 w-full h-full p-6 overflow-y-hidden sm:hidden bg-gray-50"
    >
      <div>
        <button @click="toggleSideNav" class="absolute text-3xl right-4">&#215;</button>
        <div @click="toggleSideNav" class="flex flex-col items-start gap-y-5">
          <router-link class="mb-10 btn btn-primary md:btn-lg" to="/">
            KayGia</router-link
          >
          <p v-if="user">Hi, {{ email }}</p>
          <div class="flex flex-col font-semibold text-blue-600 gap-y-5">
            <router-link v-if="user" class="" :to="{ name: 'Create' }">
              Create</router-link
            >
            <button class="font-semibold" v-if="user" @click="handleSignOut">
              Logout
            </button>
            <router-link class="font-semibold" v-if="!user" :to="{ name: 'Login' }">
              Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </transition>
</template>

<style scoped></style>
