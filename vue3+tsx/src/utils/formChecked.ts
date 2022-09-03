import { Toast } from 'vant'
//校验手机号
export function checkedMobile(value:any){
    var ext = /^1[3456789]\d{9}/
    return ext.test(value)
  }
  
  //校验电话号码
  export function checkedTelphone(value:any){
    var ext = /^(\d{3,4}|\d{3,4}-|\s)?\d{7,8}$/
    return ext.test(value)
  }
  
  //校验传真号
  export function checkedFax(value:any){
    var ext = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
    return ext.test(value)
  }
  
  //校验银行账号
  export function checkedBankAccount(value:any){
    var ext = /^[0-9]{16,19}$/
    // return ext.test(value)
    return true
  }
  
  //校验统一社会信用代码
  export function checkedTanuNo(value:any){
    var ext = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
    return ext.test(value)
  }

  //表单校验
export function formChecked(){
  let checkedValue = document.querySelectorAll("[data-checked]")
  console.log(checkedValue);
  
  let oTurn = true
  let oTitle:any = []
  checkedValue.forEach(val=>{
    let checkedValue = val.getAttribute('data-checkedValue')
    if(!checkedValue){
      oTitle.push(val.getAttribute('data-checkedTitle')||val.getAttribute('data-checked-title'))
      oTurn = false
    }else{
      //校验手机号
      if(val.getAttribute('data-checkedMobile') != null){
        if(!checkedMobile(checkedValue)){
          oTitle.push("请输入正确的手机号")
          oTurn = false
        }
      }
      //校验电话号码
      if(val.getAttribute('data-checkedTelphone') != null){
        if(!checkedTelphone(checkedValue)){
          oTitle.push("请输入正确的电话号码")
          oTurn = false
        }
      }
      //校验银行账号
      if(val.getAttribute('data-checkedBankAccount') != null){
        if(!checkedBankAccount(checkedValue)){
          oTitle.push("请输入正确的银行账号")
          oTurn = false
        }
      }
      //校验统一社会信用代码
      if(val.getAttribute('data-checkedTanuNo') != null){
        if(!checkedTanuNo(checkedValue)){
          oTitle.push("请输入正确的统一社会信用代码")
          oTurn = false
        }
      }
    }
  })
  if(oTitle.length){
    Toast(oTitle[0])
  }
  return oTurn
}
