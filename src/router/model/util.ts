import router from '@/router'
import { RouteConfig } from 'vue-router'
import Service from '@/service'
import store from '@/store/index'
import _t from '@/i18n/index'

// const testRoutes = [
//     //路由示例  需要手动添加的路由

//     {
//         //订单列表
//         path: ERoutePath.ORDER,
//         name: ERouteName.ORDER,
//         meta: {
//             title: _t('order.title'),
//             noCache: true,
//             menuId: ERouteName.ORDER,
//             menuType: EMenuType.MENU,
//         },
//         component: () => import('@/views/orderManage/index.vue'),
//     },
// ]
// 优化路由引入 只负责写路由文件，自动引入路由
const routerList:any = []
const routerUrls = require.context('./', true, /\.ts/)
routerUrls.keys().forEach((item) => {
    if (item.indexOf('util.ts') === -1) {
        routerList.push(...routerUrls(item).default)
    }
})

// const oldRoutes = [
    //路由示例  需要手动添加的路由

    // {
    //     path: '/dictList',
    //     name: 'dictList',
    //     component: () => import('@/pages/dict/list.vue'),
    //     meta: {
    //         pageTitle: '字典列表',
    //         keepAlive: true,
    //     },
    // },

// ]

export async function addDynamicRoutes() {
    routerList.forEach((item: RouteConfig) => {
        //添加到路由
        router.addRoute('home', item)
    })
    return true
}
