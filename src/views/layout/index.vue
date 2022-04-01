<template>
    <div class="mainpage">
        <!-- 插入标签页面 -->
        <router-view></router-view>
        <!-- 底部导航 -->
                <van-tabbar route>
                <van-tabbar-item icon="home-o" :to='{name:"home"}'>首页</van-tabbar-item>
                <van-tabbar-item icon="search">视频</van-tabbar-item>
                <van-tabbar-item icon="search">问答</van-tabbar-item>
                <van-tabbar-item icon="search" to='my'>我的</van-tabbar-item>
            </van-tabbar>
        </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>

</style>
