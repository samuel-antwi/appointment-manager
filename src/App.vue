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

  .height-wrapper {
    min-height: calc(100vh - 100px);
  }

  label {
    font-weight: 600;
    color: #777777 !important;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  input,
  select,
  textarea {
    border-color: #cccccc !important;
  }
</style>
