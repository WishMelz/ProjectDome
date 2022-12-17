const routes = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
            noCache: true,
            keepAlive: true
        },
        component: () => import('@/views/index/index.vue'),
    },
]

export default routes
