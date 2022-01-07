<script setup>
  import { computed } from 'vue-demi'
  import { useUser } from '../store/useUser'
  import { supabase } from '../supabase'
  import { useRouter } from 'vue-router'

  const userStore = useUser()

  const user = computed(() => userStore.user)

  const email = computed(() => userStore.getUserEmail)
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push({ name: 'Login' })
  }
</script>

<template>
  <nav class="px-4 py-5 text-white bg-gray-900">
    <div class="flex items-center justify-between max-w-5xl mx-auto">
      <router-link class="btn btn-secondary md:btn-lg" to="/"> 👶 KayGia 👶</router-link>
      <div class="items-center hidden sm:flex gap-x-4">
        <p v-if="user">Logged in as: {{ email }}</p>
        <router-link v-if="user" class="btn btn-primary" :to="{ name: 'Create' }"
          >Create</router-link
        >
        <button @click="handleSignOut" v-if="user" class="btn btn-primary">Logout</button>
        <router-link v-else class="btn btn-primary" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </div>
      <button class="sm:hidden" type="button">
        <fa class="text-3xl" icon="bars" />
      </button>
    </div>
  </nav>
</template>

<style scoped></style>
