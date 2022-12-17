import Decimal from 'decimal.js'
;(Number as any).prototype.toFixedR = function(size:number){
    return new Decimal(this as number | string).toFixed(size)
}
