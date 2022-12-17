<script lang='tsx'>
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
    route: any = this.$route;
    keepAlive: any = false
    @Watch("route", { immediate: true, deep: true })
    onWatchRoute(newVal: any, oldVal: any) {
        this.keepAlive = newVal.meta.keepAlive
    }

    render() {
        return <div class="Home">
            {this.keepAlive ? (
                <keep-alive>
                    <router-view />
                </keep-alive>
            ) : (
                <router-view v-if="!keepAlive" />
            )}
        </div>
    }
}
</script>
<style lang='less' scoped>

</style>
