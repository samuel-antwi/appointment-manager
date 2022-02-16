<script setup>
  const props = defineProps({
    data: Array,
    filteredData: Array,
    sort: String,
    filterAppointments: Function,
  })
</script>

<template>
  <div class="mb-5 flex flex-col md:max-w-xs">
    <div v-if="props.data.length > 1">
      <div class="flex items-center justify-between">
        <label class="label-text mb-1">Filter by:</label>
        <div>
          <button
            @click="resetFilter"
            v-if="props.filteredData.length > 0"
            type="button"
            class="text-info ml-3"
          >
            Reset
          </button>
          <button
            disabled
            @click="resetFilter"
            v-else
            type="button"
            class="cursor-not-allowed text-blue-300"
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <select
          @change="props.filterAppointments(props.sort)"
          v-model="props.sort"
          class="ca mt-1 w-full rounded-md text-gray-500 focus:outline-none"
        >
          <option defaultValue="relevance">Relevance</option>
          <option defaultValue="closest date">Closest date</option>
          <option defaultValue="future date">Future date</option>
          <option defaultValue="appointment for">Appointment for</option>
          <div v-if="props.sort.value === 'appointment for'">
            <p v-for="name in data" :key="name.id">
              {{ name.appointmentFor }}
            </p>
          </div>
        </select>
      </div>
    </div>
  </div>
</template>

<style></style>
