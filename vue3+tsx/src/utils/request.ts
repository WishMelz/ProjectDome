import axios from 'axios'
const httpTimeout = 30000 //axios请求超时时间
import router from '../router'
import UserService from '../service/user'
import store from '../store'

const instance = axios.create({
  timeout: httpTimeout,
})

instance.interceptors.request.use(
  (config: any) => {
    const userInfoHeader = UserService.getUserInfoHeader()
    const authority = sessionStorage.getItem('authority')
    const Authorization = sessionStorage.getItem('Authorization')
    const userId = sessionStorage.getItem('userId')
    store.commit('updateLoading', true)

    if (authority) {
      config.headers.authority = authority
    }
    if (userInfoHeader) {
      config.headers.UserInfo = encodeURIComponent(userInfoHeader)
      let user: any = sessionStorage.getItem('userInfo')
      let userInfo: any = JSON.parse(user)
      config.headers.userName = encodeURIComponent(userInfo.userName)
    }

    if (!config.headers.Authorization && Authorization) {
      config.headers.Authorization = Authorization
    }

    if (!config.headers.userId && userId) {
      config.headers.userId = userId
    }

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response: { data: any }) => {
    const { code, data, msg } = response.data
    store.commit('updateLoading', false)
    if (Number(code) === 0) {
      if (!data && data !== 0) {
        response.data.data = true
      }
    } else {
      response.data.data ? response.data.data = false :''
      // Toast(msg)
      console.log(msg)
    }
    return response.data
  },
  (error: any) => {
    if (error?.response?.status === 401) {

    } else {
      let status = '',
        message = error.message
      if (error?.response) {
        status = error.response.status
        message = error.response?.data?.msg || error.message || ''
      }
      console.log(error)
      router.push({
        path: '/error',
        query: { status, message, url: error.config.url },
      })
    }
    store.commit('updateLoading', false)
    return Promise.reject(error)
  }
)

export default instance
