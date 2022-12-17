import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import axios from 'axios'
import t from '@/i18n'
// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
        $route: Route
        $store: Store<any>
        $t: t
        $upload: any
        toFixedR: any
        $assign: any
        $getTime: any
        $echarts: any
    }
}
declare module Number {
    interface Number {
        toFixedR: any
    }
}
declare module 'axios' {
    interface IAxios<D = null> {
        code: number
        msg: string
        data: any
        total?: number
        pageNum: number
        rows: any
    }
    export interface AxiosResponse<T = any> extends IAxios<D> {}
}
