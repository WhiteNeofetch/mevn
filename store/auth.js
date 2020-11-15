import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: false
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
  async login({
    commit,
    dispatch
  }, formData) {
    try {
      const {
        token
      } = await this.$axios.$post('/backend/api/auth/admin/login', formData)
      console.log('token', token)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {
        root: true
      })
      throw e
    }
  },
  async createUser({
    commit
  }, formData) {
    try {
      await this.$axios.$post('/backend/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, {
        root: true
      })
      throw e
    }
  },
  setToken({
    commit
  }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token',token)
  },
  logout({
    commit
  }) {
    Cookies.remove('jwt-token')
    this.$axios.setToken(false)
    commit('clearToken')
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser ?
      document.cookie :
      this.app.context.req.headers.cookie
    
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if(isJWTValid(token)){
      dispatch('setToken',token)
    } else{
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token
}

function isJWTValid(token){
  if(!token){
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}