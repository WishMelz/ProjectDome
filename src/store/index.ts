import Vue from 'vue'
import Vuex from 'vuex'
import Service from '@/service'
import { EDictType, EMutations, EActions } from '@/serviceType'
Vue.use(Vuex)

interface IStateProps {
    dictData: any,
    loading:any
}
const defaultState = {
    dictData: {}, // 数据字典
    common: {
        isSaving: false, // 按钮保存状态
    },
    loading:false
}
export default new Vuex.Store<IStateProps>({
    state: { ...defaultState },
    mutations: {
        setDictData(state, data) {
            state.dictData = data
        },
    },
    getters: {
        // getRoleType(state) {
        //     return state.roleType
        // },
    },
    actions: {
        // getDictsByTypes
        //清空store 退出登录时用
        resetStore({ commit, state }) {
            sessionStorage.clear()
            commit(EMutations.SET_RESET_STATE)
            location.reload() //通过reload清空router
        },
    },
    modules: {},
})
