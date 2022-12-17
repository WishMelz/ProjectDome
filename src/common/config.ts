// 通用配置
export const httpTimeout = 30000 //axios请求超时时间

export enum EResponseCode {
    SUCCESS = 0, //请求成功
    TOKEN_EXPIRED = 401, //token过期
}

export const menuKey = 'weave' //请求头中的menuKey
