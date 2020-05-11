import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL
const UserStore = {
  state: {
    user: {}
  },
  getters: {
    user (state) {
      return state.user
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchUsers() {
      try {
        const { data } = await axios.get(`${API_URL}/users`)
        return data
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async createUser({ commit }, payload) {
      try {
        const { data, status } = await axios.post(`${API_URL}/users`, payload)
        if (status === 200) commit('setUser', data)
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}
export default UserStore
