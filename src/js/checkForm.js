/**
 * 表单验证, 返回 { pass: true, value: Object }
 * 在页面有多个子组件引入多个表单的时候,用这个方法方便很多(各自验证,然后将结果返回给父组件)
 * @param form
 */
export async function checkForm (form) {
  const result = await new Promise((resolve) => {
    form.validateFieldsAndScroll((err, values) => {
      // console.log('Received values of form: ', values)
      resolve({ passed: err === null, value: values })
    })
  })
  return result
}
