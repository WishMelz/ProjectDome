// eslint-disable-next-line require-jsdoc
export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}
// 权限检查方法
// eslint-disable-next-line require-jsdoc
export function checkPermission (value) {
  // 获取用户按钮权限
  // let isExist = false
  // const dynamicButtons = actionToObject(sessionStorage.getItem('buttonAuth'))
  // if (dynamicButtons === undefined || dynamicButtons === null || dynamicButtons.length < 1) {
  //   return isExist
  // }
  // dynamicButtons.forEach((button) => {
  //   if (button.menuKey === value) {
  //     isExist = true
  //     return isExist
  //   }
  // })
  return true
}
