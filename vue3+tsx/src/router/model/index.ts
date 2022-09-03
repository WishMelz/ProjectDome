import { createRouter, RouteRecordRaw } from 'vue-router'
import router from '../index'
import page from './page'

export async function AllRoutes() {
  let routes: any = [
    ...page,
  ]
  routes.forEach((item: RouteRecordRaw) => {
    //添加到路由
    router.addRoute('index', item)
  })
  return true
}
