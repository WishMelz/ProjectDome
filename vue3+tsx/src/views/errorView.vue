<script lang='tsx'>
import { getCurrentInstance, defineComponent, reactive } from 'vue'
export default defineComponent({
    name:'pageName',
    setup(){
        const currentInstance: any = getCurrentInstance();
        const { $service } = currentInstance.appContext.config.globalProperties
        const $router = currentInstance.proxy.$root.$router;
        const route = currentInstance.proxy.$route.redirectedFrom
        return ()=>(
            <div class='pageName'>
            error</div>
        )
    }
})
</script>
<style lang='scss' scoped></style>