<script>
  import { useMainStore } from "../store/main"
  import { computed } from "vue"
  import { useUser } from "../store/useUser"
  import { supabase } from "../supabase"

  export default {
    setup() {
      const main = useMainStore()
      const userStore = useUser()

      const user = computed(() => userStore.user)

      // console.log(supabase.auth.user())
      const data = main.getAppointments()

      return { main, data }
    },
  }
</script>

<template>
  <div class="height-wrapper home padding-wrapper">
    <div class="max-w-5xl px-5 mx-auto">
      <div class="grid gap-x-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          :to="{ name: 'All' }"
          class="relative p-8 mb-4 shadow-2xl custom-card rounded-3xl bg-primary text-primary-content"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">All Appointments</h2>
          <p class="text-lg text-gray-300">View all scheduled appointment(s)</p>
          <router-link :to="{ name: 'All' }" class="justify-end card-actions">
            <button class="btn btn-primary">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </router-link>
        </router-link>
        <router-link
          :to="{ name: 'Upcoming' }"
          class="relative p-8 mb-4 shadow-2xl custom-card rounded-3xl bg-accent text-accent-content"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">Next Appointment(s)</h2>
          <p class="text-lg">View the very next upcoming appointment(s).</p>
          <router-link :to="{ name: 'Upcoming' }" class="justify-end card-actions">
            <button class="btn btn-accent bottom-2">
              Next appointment(s)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </router-link>
        </router-link>
        <router-link
          :to="{ name: 'Past' }"
          class="relative p-8 shadow-2xl custom-card rounded-3xl bg-secondary text-secondary-content"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">Past Appointment(s)</h2>
          <p class="text-lg">View all past appoitment(s)</p>
          <router-link :to="{ name: 'Past' }" class="justify-end card-actions">
            <button class="btn btn-secondary">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </router-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .custom-card {
      height: 400px;
      position: relative;
      .btn {
        position: absolute !important;
        bottom: 10px;
      }
    }

    @media (max-width: 640px) {
      .custom-card {
        height: 250px;
      }
    }
  }
</style>
