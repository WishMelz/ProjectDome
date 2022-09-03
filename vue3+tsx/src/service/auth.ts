import request from '../utils/request'
import { BASE_URL } from './config/index'
import qs from 'qs'
import { Base64 } from 'js-base64'
const tokenCheckStr = '36f8645f6b735b9a36032'

interface loginParams {
  username: string,
  password: string
}
class AuthService {
  toLogin(params: loginParams) {
    return request({
      url: '/api/auth/oauth/token',
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic jUMzJlZDFlNGIyMTlkMTg1Y2ZkZWQ4ZGU="
      },
      data: qs.stringify({
        "grant_type": "password",
        "username": params.username,
        "password": params.password,
        "scope": "app",
      })
    })
  }

  interCheckToken(token: string) {
    return request({
        url: `${BASE_URL.AUTH}/oauth/checkToken/v2?token=${token}`,
        headers: {
            Authorization: `Basic ${Base64.encode(tokenCheckStr)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
}

export default new AuthService()