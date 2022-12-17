import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { addDynamicRoutes } from './model/util'

Vue.use(VueRouter)

const routes: any = [
    {
        path: '/',
        name: 'indexs',
        redirect:"/index"
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "login" */ '@/views/login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        meta: { title: '首页', noCache: true },
        component: () =>
            import(/* webpackChunkName: "index" */ '@/views/home.vue'),
        // redirect:'/home/index',
        children: [],
    },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
    return (originalPush.call(this, location) as any).catch((err: any) => err)
}

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach(async (to, from, next) => {
    // const auth = sessionStorage.getItem('Authorization') //获取Authorization 如果需要有逻辑处理则在路由里控制
    const auth = 12 //获取Authorization 如果需要有逻辑处理则在路由里控制
    if (to.name === 'login') {
        next()
    } else {
        if (!auth) {
            next("/login");
            return;
          }
        const routes = router.getRoutes()
        if (routes?.length === 3) {
            const res = await addDynamicRoutes()
            if (res) {
                next({
                    path: to.fullPath,
                    replace: true,
                })
            }
        } else {
            next()
        }
    }
})

export default router
