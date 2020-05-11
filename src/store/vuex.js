import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './modules/user'
import GameStore from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserStore,
    GameStore
  }
})
