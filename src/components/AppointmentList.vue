<script setup>
  import moment from "moment"

  const props = defineProps({
    data: Array,
    filteredData: Array,
  })
</script>

<template>
  <div
    v-if="props.data.length > 0"
    class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
  >
    <router-link
      v-for="item in props.filteredData.length > 0 ? props.filteredData : props.data"
      :key="item.id"
      class="flex flex-col items-center gap-y-5 rounded-xl bg-[#ffffff] p-5"
      :to="{ name: 'ViewAppointment', params: { appointmentId: item.id } }"
    >
      <fa
        v-if="item.appointmentType === 'hospital'"
        class="text-4xl text-red-500"
        icon="hospital-symbol"
      />
      <fa
        v-else-if="item.appointmentType === 'gp surgery'"
        class="text-4xl text-gray-500"
        icon="clinic-medical"
      />
      <fa v-else class="text-4xl text-gray-500" icon="home" />
      <p class="text-secondary text-xl font-bold capitalize">
        {{ item.appointmentFor }}
      </p>
      <p>
        <fa class="mr-2 text-gray-500" icon="calendar-check" />
        <span class="text-lg font-medium capitalize">{{ item.appointmentType }}</span>
      </p>
      <h1 class="bg-secondary rounded-lg p-2 capitalize text-gray-50">
        {{ item.appointmentName }}
      </h1>
      <p class="-mb-3">
        <fa class="mr-1 text-gray-500" icon="calendar-alt" />
        {{ moment(item.date).format("dddd, Do MMMM YYYY") }}
      </p>
      <p><fa class="mr-1 text-gray-500" icon="clock" /> {{ item.time }}</p>
    </router-link>
  </div>
</template>

<style scoped></style>
