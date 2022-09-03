import request from '../utils/request'
import { BASE_URL, CONTENT_TYPE } from './config/index'

const bucketName = 'henglink-order-work'
const randomData = Math.ceil(Math.random() * 10)
const userId = sessionStorage.getItem('userId')
const date = new Date().getTime()

class FileService{
  fileUpload(modulePath: string, formData: FormData) {
    const path = `${modulePath}/${userId}/${date}/${randomData}` // 上传到服务器的路径 模块名称/分类ID/用户ID/日期
    formData.append('bucketName', bucketName)
    formData.append('path', path)
    return request({
        url: BASE_URL.FILE + '/fileUpload',
        method: 'post',
        data: formData,
        headers: CONTENT_TYPE.FORMDATA,
    })
  }
  fileDownLoad(params:any,config:any,){
    return request({
      method: 'post',
      url: `${BASE_URL.FILE}/downloadFile`,
      data: params,
      ...config,
    })
  }
}

export default new FileService()