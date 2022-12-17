<template>
    <view class="ww" :style="styleNavigationBarHeight">
       <u-navbar
            title="个人中心"
        />
        789
        <view class="item" v-for="(v, i) in 13">
            {{ v }}
        </view>
    </view>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters([
            "navigationBarHeight",
            "statusBarHeight",
            "styleNavigationBarHeight"
        ]),
    },
    methods: {
        onReachBottom() {
            console.log('页面到底了')
        },
        onPullDownRefresh() {
            console.log('refresh');

        }
    }
}
</script>

<style>
.item {
    height: 130px;
}
</style>