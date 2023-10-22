import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: false,
    login: "",
    partner: "",
    APP_URL: "https://mint-daily-longhorn.ngrok-free.app", // Использую ngrok как редирект на локальную машину, где запущен сервис на FastAPI
    authRequiredMessage: false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
