<script setup>
  import Nav from "./components/Nav.vue"
  import Footer from "./components/Footer.vue"
  import { supabase } from "./supabase"
  import { ref, onMounted } from "vue"
  import { useUser } from "./store/useUser"
  import { useRouter, useRoute } from "vue-router"

  const user = supabase.auth.user()
  let appReady = ref(null)

  let router = useRouter()
  const route = useRoute()

  const store = useUser()

  // Check if user is logged in
  if (!user) {
    appReady.value = true
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      router.push({ name: "ResetPassword" })
    } else {
      store.setUser(session)
      appReady.value = true
    }
  })
</script>

<template>
  <div class="font-futura">
    <Nav />
    <router-view />
    <Footer />
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
