import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './service'
import { useRoute } from 'vue-router'
import i18n from './i18n'
import { vantPlugins } from './plugins/vant'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(vantPlugins)

// 全局注入
app.config.globalProperties.$router = router
app.config.globalProperties.route = useRoute()
app.config.globalProperties.$store = store
app.config.globalProperties.$service = service

app.mount('#app')
