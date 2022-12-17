import Vue from 'vue'
const requireComponent = require.context('.', true, /\.tsx$/)
requireComponent.keys().forEach((filePath: any) => {
    const componentName = filePath.match(/.\/(\S*).tsx/)[1]
    Vue.component(componentName, requireComponent(filePath).default)
})
