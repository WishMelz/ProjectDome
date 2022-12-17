import zhCN from './zh-CN'
import en from './en'

const langObj: any = {
    zhCN,
    en,
}

//获取浏览器所设置的语种，当没有对应文字文件时，默认取简体中文。
let lang: any = navigator.language.replace(/-/g, '')
lang = langObj[lang] ? lang : 'zhCN'

function getField(data: any, fields: string, pattern?: boolean) {
    let arr = fields.split('.')
    let key: any = arr.shift()
    let value: any = data[key]

    if (value == null) {
        return value
    } else if (arr.length == 0) {
        if (!pattern) return value
        let type = Object.prototype.toString
            .call(value)
            .replace('[object ', '')
            .replace(']', '')
        if (pattern === true) {
            return type
        } else if (!pattern) {
            return value
        } else {
            return type == pattern
        }
    }

    const result: any = getField(value, arr.join('.'), pattern)
    return result
}

/**
 *
 * @param str
 * @param insertArr
 * @returns
 */
export default function _t(str: any, insertArr?: Array<string | number>) {
    let result = ''
    const strLabel = getLabel(str)
    if (insertArr?.length) {
        let strLabelArr = strLabel.split('{}')
        strLabelArr.forEach((item: string, index: number) => {
            if (index !== strLabelArr.length - 1) {
                result += item + getLabel(insertArr[index])
            } else {
                result += strLabelArr[strLabelArr.length - 1]
            }
        })
    } else {
        result = strLabel
    }
    return result
}

function getLabel(str: any) {
    let result
    if (typeof str == 'string') {
        if (str.indexOf('.') !== -1) {
            result = getField(langObj[lang], str)
        } else {
            result = str
        }
    } else {
        result = str
    }

    if (!result) {
        result = str
    }
    return result
}
