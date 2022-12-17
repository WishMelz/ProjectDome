import store from '../../store'
import service from './../../service/index'
const state = {
    app: {},
    userToken: '', // token
    userInfo: '', // 用户信息
}

const mutations = {
    setApp: (state, data) => {
        state.app = data
    },
    userToken: (state, data) => {
        state.userToken = data
    },
    userInfo: (state, data) => {
        state.userInfo = data
    },
}

const actions = {
    // 获取IP
    async getIp() {
        /* #ifdef MP-WEIXIN */
        let res = await service.CommonService.getIp()
        if (res) {
            let ipObj = res.slice(16, res.length - 3)
            uni.setStorage({
                key: 'accessIp',
                data: ipObj
            })
        }
        /* #endif */
    },
    // 检测网络状态
    checkNetwork(app, data) {
        uni.getNetworkType({
            success: function (res) {
                if (res.networkType === 'none') {
                    store.commit('common/isOffline', true)
                } else {
                    store.commit('common/isOffline', false)
                }
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}