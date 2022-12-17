import Vue from 'vue'
import { checkPermission } from './permission'

// 权限指令
Vue.directive('permission', {
    inserted: function (el: any, binding: any) {
        // v-permission='xxx' or 'xxx,ccc'  && 运算
        // v-permission=['xxx'] or ['xxx,ccc']  || 运算
        let arr: any = []
        let flg = false
        if (typeof binding.value == 'string') {
            flg = true
            arr = binding.value.split(',')
            arr.map((v: any) => {
                if (!checkPermission(v)) {
                    flg = false
                }
            })
        } else if (binding.value instanceof Array) {
            flg = false
            arr = binding.value
            arr.map((v: any) => {
                if (checkPermission(v)) {
                    flg = true
                }
            })
        }
        if (!flg) {
            // el.parentNode.removeChild(el)
            el.style.display = 'none'
        }
    },
})

// 权限指令
Vue.directive('p', {
    inserted: function (el: any, binding: any) {
        // v-permission='xxx' or 'xxx,ccc'  && 运算
        // v-permission=['xxx'] or ['xxx,ccc']  || 运算
        let arr: any = []
        let flg = false
        if (typeof binding.value == 'string') {
            flg = true
            arr = binding.value.split(',')
            arr.map((v: any) => {
                if (!checkPermission(v)) {
                    flg = false
                }
            })
        } else if (binding.value instanceof Array) {
            flg = false
            arr = binding.value
            arr.map((v: any) => {
                if (checkPermission(v)) {
                    flg = true
                }
            })
        }
        if (!flg) {
            // el.parentNode.removeChild(el)
            el.style.display = 'none'
        }
    },
})

Vue.directive('debounce', {
    inserted: function (el:any, binding:any) {
        console.log(binding);
        
        let timer:any
        el.addEventListener('click', () => {
            console.log('2323');
            
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                binding.value()
            }, 1000)
        })
    },
})
