const getters = {
    navigationBarHeight: state => {
        return (state.common.app.statusBarHeight * 2 + 88) + 'rpx'
    },
    styleNavigationBarHeight: state => {
        return `padding-top:${(state.common.app.statusBarHeight * 2 + 88) + 'rpx'}`
    },
    statusBarHeight: state => {
        return (state.common.app.statusBarHeight * 2 + 4) + 'rpx'
    },
    styleStatusBarHeight: state => {
        return `padding-top:${(state.common.app.statusBarHeight * 2 + 4) + 'rpx'}`
    },
    customHeaderBarHeight: state => {
        return (state.common.app.statusBarHeight * 2 + 112)
    },
    styleCustomHeaderBarHeight: state => {
        return `padding-top:${(state.common.app.statusBarHeight * 2 + 112)}`
    },
    screenHeight: state => {
        return state.common.app.screenHeight
    },
    styleCcreenHeight: state => {
        return `padding-top:${state.common.app.screenHeight}`
    },
    navBar: state => {
        const { statusBarHeight, system } = state.common.app;
        let navbarHeight;
        const isiOS = system.indexOf("iOS") > -1;
        if (!isiOS) {
            navbarHeight = 48;
        } else {
            navbarHeight = 44;
        }
        return {
            navHeight: statusBarHeight + navbarHeight || 0,
            statusHeight: statusBarHeight || 0,
            navbarHeight: navbarHeight || 0,
        }
    },
    /**/
    // productCategoryId: state => state.common.productCategoryId,
    // navigationRecommendation: state => state.common.navigationRecommendation,
    // systemInfo: state => state.common.app,
    // userToken: state => state.common.userToken,
    // refreshToken: state => state.common.refreshToken,
    // userInfo: state => state.common.userInfo,
    // deptInfo: state => state.common.deptInfo,
    // crmOrg: state => state.common.crmOrg,
    // shopDetail: state => state.shop.shopDetail || uni.getStorageSync('shopDetail'),
    // salesman: state => state.shop.salesman || uni.getStorageSync('salesman'),
    // mySalesmanList: state => state.shop.mySalesmanList,
    // authorityList: state => state.common.authorityList,
    // invitationInfo: state => state.common.invitationInfo,
    // shopInvitationInfo: state => state.common.shopInvitationInfo,
    // isUser: state => {
    //     // 店主
    //     if (state.common.userInfo?.userType?.includes(2) && state.shop?.shopDetail?.auditStatus === 1 && state.shop?.shopDetail?.status === 1) {
    //         return 0
    //     }
    //     if (!state.common.userInfo) {
    //         // 未登录
    //         return 1
    //     } else {
    //         // 已认证企业
    //         return 2
    //     }
    // },
    // // 是否店主（考虑是否开店），用户产品查询
    // shopFlag: state => {
    //     if (state.common.userInfo?.userType?.includes('2') && state.shop?.shopDetail?.auditStatus === 1) {
    //         return '1'
    //     } else {
    //         return '0'
    //     }
    // },
    // // 是否店主（考虑是否开店）
    // isShopkeeper: state => {
    //     if (state.common.userInfo?.userType?.includes('2') && state.shop?.shopDetail?.auditStatus === 1 && state.shop?.shopDetail?.status === 1) {
    //         return true
    //     } else {
    //         return false
    //     }
    // },
    // // 区分是否业务员（不考虑开店情况）
    // isSalesman: state => {
    //     if (state.common.userInfo?.userType?.includes('2')) {
    //         return true
    //     } else {
    //         return false
    //     }
    // },
    // // 检测客户类型是否是炼化
    // isArtifice: state => {
    //     let { userBusinessIntention } = state.common.userInfo
    //     let isArtifice = userBusinessIntention?.includes('炼化')
    //     if (isArtifice) {
    //         return true
    //     } else {
    //         return false
    //     }
    // },
    // /**/
    // businessType: state => {
    //     let businessScope = state.shop?.shopDetail?.businessScope
    //     // businessScope===3 炼化 businessScope!==3 化纤
    //     // 1、化纤 2、化纤 3、炼化店铺首页 4、新材料店铺首页 5、纺织店铺首页
    //     if (businessScope === '1') {
    //         return 1
    //     } else if (businessScope === '2') {
    //         return 1
    //     } else if (businessScope === '3') {
    //         return 2
    //     }  else if (businessScope === '4') {
    //         return 4
    //     }  else if (businessScope === '5') {
    //         return 5
    //     } else {
    //         // 未登录时，默认显示化纤分类
    //         return 1
    //     }
    // },
    // /**/
    // homePageType: state => {
    //     let shopDetail =  uni.getStorageSync('shopDetail')
    //     let businessScope = state.shop?.shopDetail?.businessScope || shopDetail?.businessScope
    //     // 1、游客首页 2、化纤店铺首页 3、炼化店铺首页 4、新材料店铺首页 5、纺织店铺首页
    //     if (businessScope === '1') {
    //         return 2
    //     } else if (businessScope === '2') {
    //         return 2
    //     } else if (businessScope === '3') {
    //         return 3
    //     } else if (businessScope === '4') {
    //         return 4
    //     } else if (businessScope === '5') {
    //         return 5
    //     } else {
    //         // 未登录时，默认显示游客首页
    //         return 1
    //     }
    // },
    // /**/
    // versionNum: state => state.common.versionNum,
    // authUserInfo: state => state.common.authUserInfo,
    // authUserPhone: state => state.common.authUserPhone,
    // baseImgUrl: state => state.common.baseImgUrl,
    // isImJump: state => state.common.isImJump,
    // isImJumpList: state => state.common.isImJumpList,
    // isUserInfoShow: state => state.common.isUserInfoShow,
    // imgParams: state => state.common.imgParams,
    // imgListParams: state => state.common.imgListParams,
    // /*订单*/
    // orderDetail: state => state.order.orderDetail,
    // productSpec: state => state.order.productSpec,
    // dictionary: state => state.order.dictionary,
    // systemCount: state => state.message.systemCount,
    // messageList: state => state.message.messageList,
    // publicSocket: state => state.activity.publicSocket,
    // privateSocket: state => state.activity.privateSocket,
    // isContact: state => state.message.isContact,

    // twistDirection: state => state.order.twistDirection,
    // orderAddress: state => state.order.orderAddress,
}
export default getters
