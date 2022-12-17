import { IOptionProp } from '@/serviceType'
import _t from '@/i18n/index'
export function stringToObject(str: string) {
    try {
        if (str && str.length > 0) {
            return JSON.parse(str)
        } else {
            return null
        }
    } catch (e: any) {
        console.log('err', e.message)
    }
}

export function isEmptyObject(obj: object) {
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false
    }
}

/**
 * @description 从指定数组格式中查找对应文字
 * @param {string | number } value
 * @param { Array } arr   constants/product
 * @returns { string }
 */
export function findLabel(value: string | number, arr: Array<IOptionProp>) {
    if (arr?.length < 0) {
        return
    }
    const item = arr.find((val: IOptionProp) => {
        return val.value === value
    })
    return item?.label
}

/**
 * @description 数组元素互换
 * @param { Array } arr
 * @param { number } index1
 * @param { number } index2
 */
export function swipArray(arr: Array<any>, index1: number, index2: number) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}

/**
 * @description 根据数组对象中的key 拼接成字符串
 * @param { Array } arr
 * @param { string } key
 * @returns { string }
 */
export function spliceStrFromArray(arr: Array<any>, key: string) {
    if (arr?.length === 0) {
        return
    }
    let str = ''
    arr.forEach((item: any, index: number) => {
        str += `${item[key]}${index !== arr?.length - 1 ? ' | ' : ''}`
    })
    return str
}

/**
 * @description 查找B数组对象中的某个key 匹配A数组中的元素 ，并生成新数组
 * @param { Array } arrA 生成map的数组A
 * @param { Array } arrB 需要查找的数组B
 * @param { string } key
 * @returns { Array }
 */
export function matchArrBykey(arrA: Array<any>, arrB: Array<any>, key: string) {
    const map: any = {}
    arrA.forEach(function (item: any) {
        map[item] = item
    })

    const arr = arrB.filter((item: any) => {
        return map[item[key]]
    })
    return arr
}

/**
 * @description 根据key 遍历数组，生成新的数组
 * @param { Array } arr
 * @param { string } key
 */
export function mapNewArrayByKey(arr: Array<any>, key: string) {
    if (arr?.length === 0) {
        return false
    }
    const tempArr: any = []
    arr.forEach((item: any) => {
        tempArr.push(item[key])
    })
    return tempArr
}

/**
 * @description 日期格式化为 20210203
 * @param {Date} date
 */
export function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('')
}

export function formatNumber(n: any) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * @description 深拷贝
 */
export function deepClone<T extends Array<T> | any>(sourceData: T): T {
    if (Array.isArray(sourceData)) {
        return sourceData.map((item) => deepClone(item)) as T
    }
    const obj: T = {} as T
    for (let key in sourceData) {
        if (typeof sourceData[key] === 'object' && sourceData[key] !== null) {
            obj[key] = deepClone(sourceData[key])
        } else {
            obj[key] = sourceData[key]
        }
    }
    return obj
}

/**
 * @description 根据数组中的key 生成map对象
 */
export function arrayToMap(arr: any, key: string) {
    const map: any = {}
    if (arr?.length) {
        arr.forEach(function (item: any) {
            map[item[key]] = item
        })
    }

    return map
}

// 树状变成单级
export function transformCategory(arr: any, tempArr?: any) {
    if (!tempArr) {
        tempArr = []
    }
    arr.forEach((item: any, index: number) => {
        tempArr.push(item)
        if (item.subCategoryList) {
            transformCategory(item.subCategoryList, tempArr)
        }
    })
    return tempArr
}

/**
 * @description 对象数据去重
 * @param {Array} arr 数组
 * @param {string} key 对象的key
 */
export function unique(arr: any, key: string) {
    const res = new Map()
    const newArr = arr.filter(
        (item: any) => !res.has(item[key]) && res.set(item[key], 1),
    )
    return newArr
}

/**
 * @description 去除特殊字符
 */
export function stripscript(s: string) {
    var pattern = new RegExp(
        "[`!$^&*()=|{}':',\\[\\]<>/?~！@#￥……%*（）;—{}【】‘；：”“'。，、？]",
    )
    var rs = ''
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '')
    }
    let index = rs.lastIndexOf('.')
    if (index == 0) {
        rs = new Date().getTime() + rs
    }
    return rs
}

/**
 * 验证浮点数位数
 * @param float 浮点数
 * @param numLen 整数位最多几位（decimalLen不传时，校验浮点数位数）
 * @param decimalLen 小数位最多
 * @returns
 */
export function validateNumLen(
    float: string,
    numLen: number,
    decimalLen: number,
) {
    float = float.toString()
    if (!float) return false
    const reg = /^([1-9][0-9]*|0)(\.[0-9]?[0-9])?$/
    if (!reg.test(float)) return false

    const [numStr, decimalStr = ''] = float.split('.')
    return numStr.length <= numLen && decimalStr.length <= decimalLen
}

/**
 * @description 将字典数据转化成options数据
 * @param {string | number } value
 * @param { Array } arr   constants/product
 * @returns { string }
 */
export function transformDict(arr: Array<any>) {
    if (arr?.length < 0) {
        return
    }
    const newArr = arr.map((item: any) => {
        const obj = {
            label: item.dictLabel,
            value: item.dictValue,
        }
        return obj
    })
    return newArr
}

/**
 * @description 获取最小最大值
 */
export function getMinAndMax(arr: Array<number>) {
    const newArr = Array.from(new Set(arr))
    const min = Math.min.apply(null, newArr)
    const max = Math.max.apply(null, newArr)

    const obj = {
        min,
        max,
    }
    return obj
}

/**
 *
 * @description 限制金额.整数或小数价格,小数点前保留8位,小数点后保留2位,且不可为0
 * @returns
 */
export function formatPrice(value: any) {
    let newValue
    // let val = (value && value.split('')) || []

    let sNum = value.toString() //先转换成字符串类型
    var pattern = new RegExp(
        "[`~!@#$^&%*()=|{}':;',\\[\\]<>/?~！@#￥……*（）&;—|{}【】‘；：”“'。，、？]",
    )
    sNum = sNum.replace(pattern, '')
    if (sNum.indexOf('.') === 0) {
        //第一位就是 .
        sNum = '0' + sNum
    }
    sNum = sNum.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
    sNum = sNum.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
    sNum = sNum.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    sNum = sNum.replace(/^(\/-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (sNum.indexOf('.') < 0 && sNum !== '') {
        //没有小数点，且有值
        if (sNum?.length > 5) {
            newValue = sNum.substring(0, 5)
        } else {
            newValue = sNum
        }
    } else {
        const arr = sNum.split('.')
        if (arr[0]?.length > 5) {
            newValue = arr[0].substring(0, 5) + '.' + arr[1]
        } else {
            newValue = sNum
        }
    }
    if (newValue) {
        return newValue
    }
    return null
}



// 数组设置 同步 将其他数据转为想要的数据结构，比如将array转为字典想要的key value
export function setArrDictKey(keyArr: any, list: any) {
    // keyArr = ['name,dictLabel','id,dictValue']
    let arr: any = []
    list.map((v: any) => {
        let obj: any = {}
        keyArr.map((keyV:any)=>{
            let keys = keyV.split(',')
            obj[keys[1]] = v[keys[0]]
        })
        arr.push({
            ...v,
            ...obj
        })
    })
    return arr
}

//
/**
 * @description 将配置文件的key 添加到addData  初始化表单的数据 key
 * @param initData 默认的数据 可以覆盖掉初始化数据
 * @param strucList form表单的结构数据
 *
 * 根据form表单的配置文件更新addData的key值，可以不配置addData的默认数据，此方法处理el-form的校验无效问题
*/
export function initFormData(initData:any,strucList:any){
    let obj:any = {}
    strucList.map((v:any)=>{
        v.childer.map((vv:any)=>{
            obj[String(vv.key)] = ''
        })
    })
    // 将默认的数据添加到obj中，可以覆盖上面的 空字符串 形成默认数据
    obj = {
        ...obj,
        ...initData
    }
    return obj
}
