import Decimal from 'decimal.js'
Number.prototype.toFixedR = function(size:number){
    return new Decimal(this).toFixed(size)
}