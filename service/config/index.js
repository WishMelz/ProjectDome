let baseUrl = ''
let env = process.env.NODE_ENV === 'production'
if (env) {
    baseUrl = '/api'
} else {
    baseUrl = 'https://' + apiUrl + '.'+domain+'.com'
}
export {
    baseUrl,
}
