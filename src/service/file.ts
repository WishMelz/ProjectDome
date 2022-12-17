import request from '../utils/http'
import { BASE_URL, CONTENT_TYPE } from './config/index'
const bucketName = 'files'



class FileService {

    fileUpload(modulePath: string, formData: FormData) {
        const path = `/files` // 上传到服务器的路径 模块名称/分类ID/用户ID/日期
        formData.append('bucketName', bucketName)
        formData.append('path', path)
        return request({
            url: BASE_URL + '/fileUpload',
            method: 'post',
            data: formData,
            headers: CONTENT_TYPE.FORMDATA,
        })
    }
}

export default new FileService()
