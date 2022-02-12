import { createRouter, createWebHistory } from "vue-router"
import Home from "../view/Home.vue"
import CreateAppointment from "../view/CreateAppointment.vue"
import All from "../view/All.vue"
import Past from "../view/Past.vue"
import Upcoming from "../view/Upcoming.vue"
import ViewAppointment from "../view/ViewAppointment.vue"
import NotFound from "../view/NotFound.vue"
import Login from "../view/Login.vue"
import Signup from "../view/Signup.vue"
import ResetPassword from "../view/ResetPassword.vue"
import ForgottenPassword from "../view/ForgottenPassword.vue"
import EmailConfirmation from "../view/EmailConfirmation.vue"
import EditAppointment from "../view/EditAppointment.vue"
import { supabase } from "../supabase"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/create",
    name: "CreateAppointment",
    component: CreateAppointment,
    meta: {
      auth: true,
    },
  },
  {
    path: "/all",
    name: "All",
    component: All,
    meta: {
      auth: true,
    },
  },
  {
    path: "/past",
    name: "Past",
    component: Past,
    meta: {
      auth: true,
    },
  },
  {
    path: "/appointment/edit/:appointmentId",
    name: "EditAppointment",
    component: EditAppointment,
    meta: {
      auth: true,
    },
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Upcoming,
    meta: {
      auth: true,
    },
  },
  {
    path: "/confirm-email",
    name: "EmailConfirmation",
    component: EmailConfirmation,
  },
  {
    path: "/appointment/:appointmentId",
    name: "ViewAppointment",
    component: ViewAppointment,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/password-recovery",
    name: "ForgottenPassword",
    component: ForgottenPassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },

  {
    // path: "/:catchAll(.*)",
    path: "/*",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route Guard

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: "Login" })
  }
  next()
})

export default router
