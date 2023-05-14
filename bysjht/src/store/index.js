import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow: true, // 是否显示elementUi container容器布局
    isEdit: false,
    isAdd: false,
    token: '' // token验证
  },
  getters: {
  },
  mutations: {
    isShow (state) {
      state.isShow = !state.isShow
    },
    isEdit (state) {
      state.isEdit = true
      state.isAdd = false
    },
    isAdd (state) {
      state.isAdd = true
      state.isEdit = false
    },
    cancel (state) {
      state.isAdd = false
      state.isEdit = false
    },
    setToken (state) {
      const newToken = localStorage.getItem('token')
      state.token = newToken
    }
  },
  actions: {
  },
  modules: {
  }
})
