export interface IinvoiceListByParams {
  invoiceType: Number, // 发货单类型：1-化纤 2-薄膜 3-炼化NC 4-炼化SAP
  invoiceSubType: string, //薄膜时：5-膜；6-切片)
  traderMode: string, // 贸易模式：1-内贸 2-外贸
  pageNum: Number,
  pageSize: Number,
  operatorCode: string,
  auditType?: string, // 筛选状态
}