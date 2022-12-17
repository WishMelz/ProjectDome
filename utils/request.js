/**
 * 封装uni.request()
 */
 import store from './../store'
 import util from './util'

 // 前端日志记录
 function recordLogInfo(statusCode, url='', remark) {
     let arr = uni.getStorageSync('recordLogList') || []
     if (arr.length > 30) {
         return
     }
     let pages = getCurrentPages()
     let curPages = pages[pages.length - 1] && pages[pages.length - 1].route
     let currentDate =  uni.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
     let response = {
         curPages: curPages,
         statusCode: statusCode,
         remark: remark
     }
     let params = {
         breakTime: currentDate,
         response: JSON.stringify(response),
         userId: store.state.common.userInfo.userId,
         interfaceUrl: url,
     }
     arr.unshift(params)
     uni.setStorageSync('recordLogList', arr)
 }
 // 数据请求
 function requestUrl(url,params,method,responseType,header,resolve){
     // 中断请求任务
    //  let storeRequestStatus = store.state.common.requestStatus
    //  let storeRequestTask = store.state.common.requestTask
    //  if (storeRequestStatus && storeRequestTask) {
    //      storeRequestTask.abort()
    //      store.commit('common/setRequestStatus', false)
    //      store.commit('common/setRequestTask', null)
    //  }
     const requestTask = uni.request({
         url: url,
         formData: {
             file: params.tempPath
         },
         data: params || '',
         method: method || 'GET',
         responseType: responseType,
         timeout:12000,
         header,
         success: (res) => {
             if (res && res.statusCode === 401) {
                 store.dispatch('common/resetStore', '0')
                 store.commit('order/setOrderDetail', {})
                 util.toast('退出登录')
                //  if(util.ishengliYunApp()){
                //      JSBridge.logout()
                //  }
                 return
             }
             if(res && res.data){
                 resolve(res.data)
             }else{
                 resolve(false)
             }
         },
         fail:  (res) => {
             resolve(false)
         },
         complete: (res) => {
             if (String(res.statusCode).includes('50')) {
                 recordLogInfo(res.statusCode, url, '服务器错误')
             }
         }
     })
     // 当前请求存入store里
     store.commit('common/setRequestTask', requestTask)
 }
 // 公共请求
 const uRequest = async function (url, params, method, contentType = 1, responseType = '') {
     await store.dispatch('common/checkNetwork')
     // if (store.state.common.isOffline) {
     //     uni.navigateTo({
     //         url: '/pagesPortal/abnormal/networkStatus'
     //     })
     //     recordLogInfo(0, url, '用户端网络断开')
     //     return
     // }
     params = params || {}
     if (contentType === 1) {
         contentType = 'application/json'
     } else if (contentType === 2) {
         contentType = 'application/x-www-form-urlencoded;charset=UTF-8'
     } else if(contentType === 3) {
         contentType = 'multipart/form-data;charset=UTF-8'
     }
     const header = { //默认header
         'Content-type': contentType,
         'Authorization':'Basic xxx',
         'UserInfo':''
     }
     let userToken = store.state.common.userToken
     let userInfo = store.state.common.userInfo
 
     // let userInfo = this.$store.state.common.UserInfo
     if (userToken) {
         header.Authorization = userToken
     }
     if (userInfo) {
         header.UserInfo = encodeURIComponent(`${userInfo.userName}|${userInfo.userId}|${userInfo.jobNumber}`)
         header.companyName = encodeURIComponent(`${userInfo.companyName}`)
         header.OperatorBusinessType = store.getters.businessType
     }
     return new Promise(async(resolve, reject) => {
             requestUrl(url,params,method,responseType,header,resolve)
     }).catch((e) => {})
 }
 
 module.exports = uRequest