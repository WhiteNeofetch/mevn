export const state = () => ({
    token: true
  })
  
  export const mutations = {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = true
    }
  }
  
  export const actions = {
    async login({commit, dispatch}, formData) {
      try {
        const {token} = this.$axios.$post('localhost:1337/api/auth/admin/login',formData)
        console.log('token', token)
        dispatch('setToken', token)
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async createUser({commit}, formData) {
        try {
          await this.$axios.$post('/backend/api/auth/admin/create',formData)
        } catch (e) {
          commit('setError', e, {root: true})
          throw e
        }
      }, 
    setToken({commit}, token) {
      commit('setToken', token)
    },
    logout({commit}) {
      commit('clearToken')
    }
  }
  
  export const getters = {
    isAuthenticated: state => Boolean(state.token)
  }
  