<script setup>
  import Nav from "./components/Nav.vue"
  import { supabase } from "./supabase"
  import { ref } from "vue"
  import { useUser } from "./store/useUser"

  const user = supabase.auth.user()
  let appReady = ref(null)

  const store = useUser()

  // Check if user is logged in
  if (!user) {
    appReady.value = true
  }

  supabase.auth.onAuthStateChange((_, session) => {
    store.setUser(session)
    appReady.value = true
  })
</script>

<template>
  <div class="font-futura">
    <Nav />
    <router-view />
  </div>
</template>

<style>
  body {
    background: #eeeeee;
    overflow-x: hidden;
  }

  .padding-wrapper {
    padding-top: 2.5rem;
    padding-bottom: 3.5rem;
  }
</style>
