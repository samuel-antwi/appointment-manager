import { defineStore } from "pinia"
import { supabase } from "../supabase"

export const useAppointments = defineStore({
  id: "appointmentStore",
  state: () => ({
    data: [],
    appointment: null,
    pastAppointments: [],
    isLoading: false,
    errorMsg: null,
    statusMsg: null,
  }),
  getters: {
    getFormattedDate() {
      let dt = new Date()
      const newDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
      return newDate
    },
  },
  actions: {
    // Get all appointments
    async getAppointments() {
      this.isLoading = true
      try {
        const { data: appointments, error } = await supabase
          .from("appointments")
          .select("*")
          .gte("date", this.getFormattedDate)
          .order("date", { ascending: true })
        if (error) throw error
        this.data = appointments
        this.isLoading = false
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
      }
    },

    // Get appointment by ID
    async getAppointmentById(id) {
      this.isLoading = true
      try {
        const { error, data: appointments } = await supabase
          .from("appointments")
          .select("*")
          .eq("id", id)
        if (error) throw error
        this.appointment = appointments[0]
        this.isLoading = false
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
      }
    },

    // Delete appointment.
    async deleteAppointment(currentId, router) {
      try {
        if (confirm("Are you sure you want to delete this appointment?")) {
          const { error } = await supabase
            .from("appointments")
            .delete()
            .eq("id", currentId)
          if (error) throw error
          router.push({ name: "All" })
        }
      } catch (error) {
        this.errorMsg = error.message
        setTimeout(() => {
          this.errorMsg = null
        }, 5000)
      }
    },
    // Update appointment
    async updateAppointment(currentId) {
      try {
        const { error } = await supabase
          .from("appointments")
          .update({
            appointmentName: this.appointment.appointmentName,
            appointmentFor: this.appointment.appointmentFor,
            appointmentType: this.appointment.appointmentType,
            postCode: this.appointment.postCode,
            appointmentLocationDetails: this.appointment.appointmentLocationDetails,
            time: this.appointment.time,
            date: this.appointment.date,
            location: this.appointment.location,
            completed: false,
          })
          .eq("id", currentId)
        this.statusMsg = "Appointment updated successfully!"
        setTimeout(() => {
          this.statusMsg = null
        }, 5000)
        if (error) throw error
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
        setTimeout(() => {
          this.errorMsg = null
        }, 5000)
      }
    },

    // Get Past appointments
    async getPastAppointments() {
      this.isLoading = true
      try {
        const { error, data: appointments } = await supabase
          .from("appointments")
          .select("*")
          .lt("date", this.getFormattedDate)
          .order("date", { ascending: true })
        if (error) throw error
        this.pastAppointments = appointments
        this.isLoading = false
      } catch (error) {
        console.log(error.message)
        this.errorMsg = error.message
      }
    },
  },
})
