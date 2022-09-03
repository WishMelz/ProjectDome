class UserService {
    userInfoHeader = ''
    userInfo = null

    /**
     * @description  从缓存中获取用户信息
     */
    getUserInfoHeader() {
        if (this.userInfoHeader) {
            return this.userInfoHeader
        }
        const userInfoCache = sessionStorage.getItem('userInfo')
        if (userInfoCache && userInfoCache?.length > 0) {
            const userInfo = JSON.parse(userInfoCache)
            this.userInfo = userInfo
            this.userInfoHeader = `${userInfo.userName}|${userInfo.userId}|${userInfo.jobNumber}`
            return this.userInfoHeader
        }
    }

    getUserInfo() {
        if (!this.userInfo) {
            this.getUserInfoHeader()
        }
        return this.userInfo
    }


}

export default new UserService()
