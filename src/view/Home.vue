<script>
  import { useAppointments } from "../store/Appointments"
  import { computed, onMounted } from "vue"
  import { useUser } from "../store/useUser"
  import { supabase } from "../supabase"
  import { useRoute } from "vue-router"

  export default {
    setup() {
      const appointments = useAppointments()
      const userStore = useUser()

      const user = computed(() => userStore.user)

      const route = useRoute()

      // console.log(route.fullPath)

      // console.log(supabase.auth.user())
      const data = appointments.getAppointments()

      return { appointments, data, route }
    },
  }
</script>

<template>
  <div class="height-wrapper home padding-wrapper">
    <div class="mx-auto mb-10 max-w-5xl px-5">
      <div class="grid-col-1 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          :to="{ name: 'All' }"
          class="custom-card bg-primary text-primary-content relative mb-4 rounded-3xl p-8 shadow-2xl"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">All Appointments</h2>
          <p class="text-lg text-gray-300">View all scheduled appointment(s)</p>
          <router-link :to="{ name: 'All' }" class="card-actions justify-end">
            <button class="btn btn-primary">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="ml-2 inline-block h-6 w-6 stroke-current"
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
          class="custom-card bg-accent text-accent-content relative mb-4 rounded-3xl p-8 shadow-2xl"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">Next Appointment(s)</h2>
          <p class="text-lg">View the very next upcoming appointment(s).</p>
          <router-link :to="{ name: 'Upcoming' }" class="card-actions justify-end">
            <button class="btn btn-accent bottom-2">
              Next appointment(s)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="ml-2 inline-block h-6 w-6 stroke-current"
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
          class="custom-card bg-secondary text-secondary-content relative rounded-3xl p-8 shadow-2xl"
        >
          <h2 class="mb-6 text-xl font-medium uppercase">Past Appointment(s)</h2>
          <p class="text-lg">View all past appoitment(s)</p>
          <router-link :to="{ name: 'Past' }" class="card-actions justify-end">
            <button class="btn btn-secondary">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="ml-2 inline-block h-6 w-6 stroke-current"
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
