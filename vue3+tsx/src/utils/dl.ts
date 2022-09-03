import Decimal from 'decimal.js'
export function numAdd(...args:any) {
    let result = new Decimal(args[0]);
    for (let i = 1; i < args.length; i++) {
        result = result.add(new Decimal(args[i]));
    }
    return result.toNumber();
}

export function numSub(...args: any) {
    let result = new Decimal(args[0]);
    for (let i = 1; i < args.length; i++) {
        result = result.sub(new Decimal(args[i]));
    }
    return result.toNumber();
}
export function numMul(...args:any) {
    let result = new Decimal(args[0]);
    for (let i = 1; i < args.length; i++) {
        result = result.mul(new Decimal(args[i]));
    }
    return result.toNumber();
}

export function numDiv(...args:any) {
    let result = new Decimal(args[0]);
    for (let i = 1; i < args.length; i++) {
        result = result.div(new Decimal(args[i]));
    }
    return result.toNumber();
}