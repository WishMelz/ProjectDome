<script lang='tsx'>
import { getCurrentInstance, defineComponent, reactive, ref } from 'vue'
import loadingImg from '../assets/loadingUrl.gif'
export default defineComponent({
    name: 'home-index',
    setup() {
        const currentInstance: any = getCurrentInstance();
        const { $service } = currentInstance.appContext.config.globalProperties
        const $router = currentInstance.proxy.$root.$router;
        const route = currentInstance.proxy.$route.redirectedFrom
        const $store = currentInstance.proxy.$store
        const showCurrencyLoading: any = ref(false)

        const renderLoading = () => {
            showCurrencyLoading.value = $store.state.showLoading
            return (
                <div class='loaidng'>
                    <van-overlay show={showCurrencyLoading.value} />
                    {showCurrencyLoading.value ? <img src={loadingImg} /> : ''}
                </div>
            )
        }
        return () => (
            <div class='home-index'>
                {renderLoading()}
                <router-view />
            </div>
        )
    }
})
</script>
<style lang='scss' scoped>
.loaidng {
    .van-overlay {
        background: rgba(0, 0, 0, 0);
        z-index: 1000;
    }

    img {
        position: fixed;
        z-index: 10000;
        width: 100px;
        top: 50%;
        left: 50%;
        margin-left: -50px;
    }
}
</style>