<script lang='tsx'>
import { getCurrentInstance, defineComponent, reactive } from "vue";
export default defineComponent({
  name: "pageName",
  setup() {
    const currentInstance: any = getCurrentInstance();
    const { $service } = currentInstance.appContext.config.globalProperties;
    const $router = currentInstance.proxy.$root.$router;
    const route = currentInstance.proxy.$route.redirectedFrom;
    const login = () => {
      sessionStorage.setItem("userInfo", "xxx");
      sessionStorage.setItem("Authorization", `bearer "xxxx"}`);
      $router.push('/')
    };
    return () => (
      <div class="loading">
        <van-button onClick={()=>login()}>登录</van-button>
      </div>
    );
  },
});
</script>
<style lang='scss' scoped></style>