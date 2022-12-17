import uRequest from '../../utils/request.js'

class CommonService {
     /**
     * 获取IP地址
     * @param {*}
     */
      getIp(params) {
        const url = `https://www.taobao.com/help/getip.php`
        return uRequest(url, params)
    }
}

export default new CommonService()