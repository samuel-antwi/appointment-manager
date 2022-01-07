<script>
  import { ref } from 'vue'
  import Modal from '../components/Modal.vue'
  export default {
    components: { Modal },
    props: ['data', 'editMode', 'updateAppointment', 'modalActive', 'toggleModal'],
  }
</script>

<template>
  <div @click.self="toggleModal" class="edit" v-if="modalActive">
    <Modal :modalActive="modalActive" :toggleModal="toggleModal">
      <div class="modal-content">
        <div
          class="
            bg-[#F1F1F1]
            w-[300px]
            md:w-[600px] md:p-10
            p-5
            mb-10
            rounded-md
            shadow-lg
          "
        >
          <h1 class="mb-4 text-2xl text-info">Update appointment</h1>
          <form @submit.prevent="updateAppointment" class="flex flex-col gap-y-4">
            <div class="flex flex-col">
              <label class="mb-1 text-info label-text" for="appointment-name"
                >Appointment name</label
              >
              <input
                required
                v-model="data.appointmentName"
                class="p-2 rounded-md focus:outline-none form-control"
                type="text"
                id="appointment-name"
              />
            </div>
            <div class="flex flex-col">
              <label class="mb-1 text-info" for="for">Appointent for</label>
              <select
                required
                v-model="data.appointmentFor"
                class="p-2.5 rounded-md focus:outline-none w-full"
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
                v-model="data.appointmentType"
                class="p-2.5 rounded-md focus:outline-none"
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
                v-model="data.date"
                class="p-2 rounded-md focus:outline-none"
                type="date"
                id="date"
              />
            </div>
            <div class="flex flex-col">
              <label class="mb-1 text-info" for="time">Time</label>
              <input
                required
                v-model="data.time"
                class="p-2 rounded-md focus:outline-none"
                type="time"
                id="time"
              />
            </div>
            <div class="flex flex-col">
              <label class="mb-1 text-info" for="location">Location</label>
              <input
                required
                v-model="data.location"
                class="p-2 rounded-md focus:outline-none"
                type="text"
                id="location"
              />
            </div>
            <button class="self-start w-full sm:w-auto btn btn-info" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
  .edit {
    background-color: rgba(0, 176, 234, 0.5);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
