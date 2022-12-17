const API_HOST = process.env.VUE_APP_API_HOST

export const BASE_URL = {
    AUTH: `${API_HOST}/auth`,
}

export const CONTENT_TYPE = {
    JSON: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    FORMDATA: {
        'Content-Type': 'multipart/form-data',
    },
    URLENCODED: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
}
