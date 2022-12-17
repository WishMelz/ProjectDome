import axios, { AxiosRequestConfig } from 'axios'
import { Message, Loading } from 'element-ui'
import router from '../router'
import { EResponseCode } from '@/common/config'
import { httpTimeout } from '@/common/config'
import store from '@/store'
const ECONNABORTED = 'ECONNABORTED'
const instance = axios.create({
    timeout: httpTimeout, // request timeout
})

let loading: any = null

instance.interceptors.request.use(
    (config) => {
        const Authorization = sessionStorage.getItem('Authorization')
        const userId = sessionStorage.getItem('userId')
        const userName = sessionStorage.getItem('userName')
        if (userId) {
            config.headers.userId = userId
        }
        if (userName) {
            config.headers.userName = encodeURI(userName)
        }

        if (!config.headers.Authorization && Authorization) {
            config.headers.Authorization = Authorization
        }
        if (!store.state.loading) {
            loading = Loading.service({
                lock: true,
                background: 'rgba(255, 255, 255, 0.65)',
            })
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

function removeLoadingDom() {
    const loadingDom = document.getElementsByClassName('el-loading-mask')[0]
    if (loadingDom) {
        loadingDom.remove()
    }
    const messageError = document.getElementsByClassName('el-message--error')[1]
    if (messageError) {
        messageError.remove()
    }
}
function closeLoading() {
    try {
        loading.close()
    } catch (error) {
        console.log(error, 'loading錯誤')
    }
}
instance.interceptors.response.use(
    (response) => {
        closeLoading()
        const { code, data, msg } = response.data
        if (Number(code) === EResponseCode.SUCCESS) {
            if (!data) {
                response.data.data = true
            }
        } else {
            Message({
                type: 'error',
                message: msg,
            })
            response.data.data = false
            store.state.loading = false
        }
        return response.data
    },
    (error) => {
        closeLoading()
        store.state.loading = false
        console.log(error)
        if (error?.response?.status === EResponseCode.TOKEN_EXPIRED) {
            //token过期
            // message.success('登录超时，请重新登录', 1);
            sessionStorage.clear()
            router.push('/')
        } else if (error.code === ECONNABORTED) {
            //超时,config中添加isTimeout 再次请求
            Message.error('请求超时，请稍候再试')
            removeLoadingDom()
            return
        } else {
            //其他接口异常
            Message.error('请求异常，请稍候再试')
            removeLoadingDom()
            return
        }
        return Promise.reject(error)
    },
)

export default instance
