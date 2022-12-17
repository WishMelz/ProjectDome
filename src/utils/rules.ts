// export function formRulesAll() {
//     // 非空验证
export const empty = {
    required: true,
    message: '值不能为空',
    trigger: 'blur',
}
// 正整数
export const positiveint = {
    pattern: /^[1-9]\d*$/,
    message: '请输入正整数',
    trigger: 'blur',
}
// 正整数两位小数
export const positiveintTwoDl = {
    pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
    message: '请输入2位小数的正整数',
    trigger: 'blur',
}
// 1-8 工位数 输入
export const stationNo = {
    pattern: /^([1-8])$/,
    message: '请输入1到8的正整数',
    trigger: 'blur',
}

export const textNotCN = {
  pattern: /(^$)|(^[^\u4e00-\u9fa5]{1,10}$)/g,
  message: '不能输入中文',
  trigger: 'blur',
}

export const enNum = {
  pattern: /(^$)|[\d|a-z|A-Z]/g,
  message: '只能输入英文和数字',
  trigger: 'blur',
}
