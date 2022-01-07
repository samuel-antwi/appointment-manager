<script>
  export default {
    props: [
      'statusMsg',
      'errorMsg',
      'title',
      'appointmentFor',
      'appointmentName',
      'location',
      'date',
      'time',
      'appointmentType',
      'createAppointment',
      'edit',
    ],
    // props: {
    //   title: String,
    //   statusMsg: String,
    //   errorMsg: String,
    //   appointmentFor: String,
    //   appointmentName: String,
    //   location: String,
    //   date: String,
    //   time: String,
    //   appointmentType: String,
    //   edit: Boolean,
    //   handleSubmit: Function,
    //   buttonLabel: String,
    // },
  }
</script>

<template>
  <div class="max-w-2xl px-4 mx-auto mt-12">
    <div v-if="statusMsg || errorMsg" class="p-4 mb-10 rounded-md bg-[#F1F1F1]">
      <p class="text-red-500">{{ errorMsg }}</p>
      <p class="text-success">{{ statusMsg }}</p>
    </div>
    <div class="bg-[#F1F1F1] p-5 rounded-md shadow-lg">
      <h1 class="mb-4 text-2xl text-info">{{ title }}</h1>
      <form @submit.prevent="createAppointment" class="flex flex-col gap-y-4">
        <div class="flex flex-col">
          <label class="mb-1 text-info label-text" for="appointment-name"
            >Appointment name</label
          >
          <input
            required
            v-model="appointmentName"
            class="p-2 rounded-md focus:outline-none form-control"
            type="text"
            id="appointment-name"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="for">Appointent for</label>
          <select
            required
            v-model="appointmentFor"
            class="p-2.5 rounded-md focus:outline-none select w-full"
            id="for"
          >
            <option selected="selected" value="select">Select name</option>
            <option value="kaylee">Kaylee</option>
            <option value="gianna">Gianna</option>
            <option value="kaylee and gianna">Kaylee and Gianna</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="type">Type</label>
          <select
            required
            v-model="appointmentType"
            class="p-2.5 rounded-md select"
            id="type"
          >
            <option selected="selected" value="select type">Select type</option>
            <option value="hospital">Hospital</option>
            <option value="gp surgery">GP Surgery</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="date">Date</label>
          <input
            required
            v-model="date"
            class="p-2 rounded-md focus:outline-none"
            type="date"
            id="date"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="time">Time</label>
          <input
            required
            v-model="time"
            class="p-2 rounded-md focus:outline-none"
            type="time"
            id="time"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-info" for="location">Location</label>
          <input
            required
            v-model="location"
            class="p-2 rounded-md focus:outline-none"
            type="text"
            id="location"
          />
        </div>
        <button class="self-start btn btn-info" type="button">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
