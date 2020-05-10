import axios from 'axios'
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
    
  },
  actions: {
    async fetchUsers() {
      try {
        const { data } = await axios('http://localhost:3000/users')
        return data
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}
export default UserStore
