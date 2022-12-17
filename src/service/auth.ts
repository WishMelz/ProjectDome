import request from '../utils/http'
import { BASE_URL } from './config/index'
const Base64 = require('js-base64').Base64
const tokenCheckStr =
    '8d33a5636f854c59a97b1d3f72c170b6:f775f16fbde645f6b735b9a36032c037'

interface interLoginParams {
    username: string
    password: string
}

class AuthService {
    interLogin(data: interLoginParams) {
        return request({
            url: `/api/gmMes/user/login`,
            method: 'post',
            data: {
                username: data.username,
                password: data.password,
            },
        })
    }

    logout(token: string) {
        return request({
            url: `${BASE_URL.AUTH}/oauth/revoke?${token}`,
        })
    }

    interCheckToken(token: string) {
        return request({
            url: `${BASE_URL.AUTH}/oauth/checkToken/v2?token=${token}`,
            headers: {
                Authorization: `Basic ${Base64.encode(tokenCheckStr)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    }
    getList(data: any){
        return request({
            url: `${BASE_URL}/order/pageList`,
            method: 'post',
            data
        })
    }
    detail(params:any){
        return request({
            url: `${BASE_URL}/order/detail`,
            method: 'get',
            params
        })
    }
}

export default new AuthService()
