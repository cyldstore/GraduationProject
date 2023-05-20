import axios from 'axios'
import router from '@/router'
import store from '../store/index'

const http = axios.create({
  baseURL: 'http://localhost:3000/api/houtai'
})

// axios请求拦截
http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
}, function (error) {
  return Promise.reject(error)
})

// axios响应拦截
http.interceptors.response.use(function (response) {
  const { authorization } = response.headers
  authorization && localStorage.setItem('token', authorization)
  store.commit('setToken')
  return response
}, function (error) {
  const { status } = error.response
  if (status === 401) {
    localStorage.removeItem('token')
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return Promise.reject(error)
})

export default http
