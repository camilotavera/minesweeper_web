import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

const GameStore = {
  state: {
    game: {},
    board: [],
    levels: [],
    currentLevel: {}
  },
  getters: {
    levels (state) {
      return state.levels
    },
    currentLevel (state) {
      return state.currentLevel
    },
    board (state) {
      return state.board
    } 
  },
  mutations: {
    setLevels(state, levels) {
      state.levels = levels
    },
    setCurrentLevel(state, currentLevel) {
      state.currentLevel = currentLevel
    },
    startGame() { },
    setBoard(state, board) {
      state.board = board
    }
  },
  actions: {
    chooseLevel ({ state, commit, dispatch }, currentLevel) {
      commit('setCurrentLevel', currentLevel)
      dispatch('createGrid', state.currentLevel)
    },
    async fetchLevels({ commit, dispatch, state }) {
      try {
        const { data } = await axios.get(`${API_URL}/levels`)
        commit('setLevels', data)
        dispatch('chooseLevel', state.levels[0])
        return data
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    createMinesPositions({ state }, mines = 10) {
      let minePositions = []
      do {
        let position = Math.abs(Math.floor(Math.random() * (1 - state.board.length)))
        if (!minePositions.includes(position)) minePositions.push(position)
      } while (minePositions.length < mines)
      minePositions.forEach(mine => state.board[mine].value = '💣')
    },
    createGrid({ commit, dispatch }, level) {
      let columns = new Array(level.column)
      let rows = new Array(level.row)
      let board = []
      for (let i = 0; i <= rows.length; i++) {
        for (let k = 0; k <= columns.length; k++) {
          // if (Math.random(1) < 0.5) board.push({ row: i ,column: k, value: '💣' })
          board.push({ row: i ,column: k, value: '' })
        }
      }
      commit('setBoard', board)
      dispatch('createMinesPositions', level.mine)
    }
  }
}
export default GameStore