import request from '../utils/request'
class CommonService {

  uploadFile(data: any) {
    return request({
      url: '/api/fileUpload',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    })
  }
}

export default new CommonService()
