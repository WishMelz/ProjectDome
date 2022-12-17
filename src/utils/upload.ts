import FileService from '@/service/file'
import { Message } from 'element-ui'

/**
 * @description 封装全局文件上传
 * @param modulePath 模块路径  如 'product/分类ID' 没有具体的分类ID 直接传模块名 'article'
 * @param file 文件
 * @returns 
 */
async function upload(modulePath: string, file: File) {
    const formData = new FormData()
    const name = file.name?.replace(/\s*/g, '')
    formData.set('file', file, name)

    const { data, msg } = await FileService.fileUpload(modulePath, formData)
    if (data) {
        return data.fileUrl
    } else {
        Message.warning(msg)
        return false
    }
}

export default upload