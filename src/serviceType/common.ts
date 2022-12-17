// 通用
import _t from '@/i18n'

export enum EHttpMethod {
    POST = 'post',
    GET = 'get',
}

export enum EMenuType {
    APPLICATION = 'A', // 应用
    DIRECTORY = 'M', // 目录
    MENU = 'C', // 菜单
    BUTTON = 'F', // 按钮
}

export enum EMenuStatus {
    SHOW = '0', //显示
    HIDE = '1', //隐藏
}

export enum EWhether {
    YES = 1, // 是
    NO = 0, // 否
}

export const EWhetherSelet = [
    { label: '是', value: 1 },
    { label: '否', value: 0 },
]

export interface IColumnFilters {
    text: string
    value: string | number
}

export enum EColumnType {
    SELECTION = 'selection', //显示多选框
    INDEX = 'index', //显示该行的索引（从 1 开始计算）
    EXPAND = 'expand', //显示为一个可展开的按钮
}
export interface IColumnProp {
    //表格通用
    label?: string
    prop?: string
    width?: string
    type?: EColumnType
    showTooltip?: boolean
    fixed?: boolean | string
    index: number | Function
    sortable: string
    children?: Array<IColumnProp>
    filters?: Array<IColumnFilters>
    filterMethod?: Function
}

export interface IOptionProp {
    //下拉框通用
    label: string
    value: string | number | null
    dictLabel?: string //数据字典类型时的label
    dictValue?: string | number | null //数据字典类型时的value
    disabled?: boolean
}

// 搜索栏
export interface IConfigDataProp {
    placeholder: string
    value: string
    type: string //搜索框类型
    placeholderOther?: string // 时间选择可用
    optionLists?: Array<any> // 下拉框可用
    multiple?: boolean // 多选框可用
}

export enum EDictType { //字典枚举
    TEXTILE_SALE_ORDER_STATUS_TYPE = 'textile.sale.order.status.type',
    TEXTILE_SALE_ORDER_STATUS = 'textile.sale.order.status',
}

export enum EMutations { //store 的Mutations
    SET_ROLE_TYPE = 'setRoleType',
    SET_WATER_MARK = 'setWaterMark',
    SET_ALL_CATEGORY_LIST = 'setAllCategoryList',
    SET_ALL_CATEGORY_MAP = 'setAllCategoryMap',
    SET_ALL_AUTH_CATEGORY_LIST = 'setAllAuthCategoryList',
    SET_ALL_AUTH_CATEGORY_MAP = 'setAllAuthCategoryMap',
    SET_DICT_DATA = 'setDictData',
    SET_CONFIG_DATA = 'setConfigData',
    SET_SALESMAN_LIST = 'setSalesManList',
    SET_DYNAMIC_ROUTES = 'setDynamicRoutes',
    SET_NAV_LIST = 'setNavList',
    SET_RESET_STATE = 'setResetState',
    SET_DYNAMIC_BUTTONS_MAP = 'setDynamicButtonsMap',
    SET_ALL_MENU_MAP = 'setAllMenuMap',
    SET_PRODUCT_CATEGORY_TREE = 'setProductCategoryTree',

    SET_USER_INFO = 'setUserInfo',
}

export enum EActions { //store action
    GET_ALL_CATEGORY_MAP = 'getAllCategoryMap',
    GET_USER_INFO = 'getUserInfo',
}

export enum EPageType { //页面类型
    ADD = 'add',
    EDIT = 'edit',
    DETAIL = 'detail',
}

export const gutter: number = 40 //栅格间隔
export const span: number = 12 //栅格占据的列数
export const labelWidth: string = '90px' //列表页顶部查询的label宽度

export const selectPlaceholder: string = _t('common.pleaseSelect')
export const enterPlaceholder: string = _t('common.pleaseEnter')

export enum ETrigger {
    BLUR = 'blur',
    CHANGE = 'change',
}

export enum EDynamicButtons { //按钮权限
    PRODUCTMANAGE_PRODUCT_SEARCH = 'productManage_product_search',
}

export const headerCellStyle = {
    background: '#F6F6FA',
    color: '#333333',
}

export interface ITabsProp {
    label?: string
    name?: string
    dictLabel?: string
    dictValue?: string
    query?: any //路由跳转的参数
}

export interface ICheckboxProp {
    value?: boolean
    label: string
    border?: boolean
}

export interface IRadioProp {
    key: number
    value?: boolean
    label: string
    border?: boolean
}

export enum EStatus {
    NORMAL = 0,
    DISABLE = 1,
}

export enum EFileType {
    HTML = 'html',
    DOCX = 'docx',
    PDF = 'pdf',
}

export const statusOptions = [
    {
        label: _t('common.normal'),
        value: EStatus.NORMAL,
    },
    {
        label: _t('common.disable'),
        value: EStatus.DISABLE,
    },
]

export enum ESex {
    MALE = 0, //男
    FEMALE = 1, //女
}

export const sexOptions = [
    {
        label: _t('common.male'),
        value: ESex.MALE,
    },
    {
        label: _t('common.female'),
        value: ESex.FEMALE,
    },
]

export enum EDateFormat { // 日期组件的 format
    DATE = 'yyyy-MM-dd',
    DATE_TIME = 'yyyy-MM-dd hh:mm:ss', //12小时制
    DATE_TIME_SEPARATOR = 'yyyy-MM-dd HH:mm:ss', //24小时制
    HOUR_MINIUTE = 'HH:mm',
}

export enum EDatePickerType { // DateTimePicker 类型
    YEAR = 'year',
    MONTH = 'month',
    DATE = 'date',
    WEEK = 'week',
    DATE_TIME = 'datetime',
    DATE_TIME_RANGE = 'datetimerange',
    DATE_RANGE = 'daterange',
}

export enum EInputType { // el-input 类型
    TEXT = 'text',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    PASSWORD = 'password',
}

export enum EButtonType { // el-button 类型
    TEXT = 'text',
    PRIMARY = 'primary',
    DANGER = 'danger',
}

export enum ETabsType { // el-tabs 类型
    CARD = 'card',
    BORDER_CARD = 'border-card',
}

export interface IListParams {
    pageNum: number
    pageSize: number
}

function setNum(num:any){
   return num > 9 ? num : "0" + num
}
export const getCurrentTime = (str: any = '') => {
    let newDate: any = ''
    if (str != '') {
        newDate = new Date(str)
    } else {
        newDate = new Date()
    }
    let strData = `${newDate.getFullYear()}-${
        setNum(newDate.getMonth() + 1)
    }-${setNum(newDate.getDate())} ${setNum(newDate.getHours())}:${setNum(newDate.getMinutes())}:${setNum(newDate.getSeconds())}`
    return strData
}
