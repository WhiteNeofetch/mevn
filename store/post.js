const posts = [
  {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: 'id1'},
  {title: 'Post 2', date: new Date(), views: 22, comments: [1, 2], _id: 'id2'}
]

export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/backend/api/post/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/backend/api/post')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/backend/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async update({commit}, {id, text}) {
    try {
      return await this.$axios.$put(`/backend/api/post/admin/${id}`, {text})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async create({commit}, {title, text, image}) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/backend/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/backend/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/backend/api/post/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async addView({commit}, {views,_id} ){
    try {
      return await this.$axios.$put(`/backend/api/post/add/view/${_id}`,{views})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getAnalytics({commit}){
    try{
      return await this.$axios.$get('/backend/api/post/admin/get/analytics')
    } catch(e){
      commit('setError',e , {root:true})
      throw e
    } 
  }
}