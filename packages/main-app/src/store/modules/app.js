export default {
  namespaced: true,
  state: {
    size: 10,
    token: ''
  },
  motations: {
    SET_PAGE_SIZE (state, data) {
      state.size = data
    },
    SET_TOKEN (state, data) {
      state.token = data
    }
  },
  actions: {
    setPageSize ({ commit }, data) {
      commit('SET_PAGE_SIZE', data)
    },

    setToken ({ commit }, data) {
      commit('SET_TOKEN', data)
    }
  }
}