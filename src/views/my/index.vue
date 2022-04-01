<template>
<div>
    <!-- 手机图标和注册登录按钮 -->
    <div class="login_un" v-if="!user" @click='toLogin'>
        <van-image class='icon_img' round width="66px" height="66px" :src='require("../../assets/mobile.png")' />
        <span>登录 / 注册</span>
    </div>
    <!-- 登录后显示的个人主页的页面 -->
    <div class="show_ps" v-else>
        <!-- 个人信息 -->
        <div class="psinfo">
            <div class="priate left">
                <van-image width="100" height="100" round :src='userInfo.photo'/>
                <span>{{userInfo.name}}</span>
            </div>
            <van-button round type="info" class='right' size='mini' hairline=''>编辑资料</van-button>
        </div>
        <div class="data_status">
            <div class="data_msg"><span class='number'>{{userInfo.art_count}}</span><span class="text">头条</span></div>
            <div class="data_msg"><span class='number'>{{userInfo.follow_count}}</span><span class="text">关注</span></div>
            <div class="data_msg"><span class='number'>{{userInfo.fans_count}}</span><span class="text">粉丝</span></div>
            <div class="data_msg"><span class='number'>{{userInfo.like_count}}</span><span class="text">获赞</span></div>
        </div>
    </div>
    <!-- 收藏和历史 -->
    <div class="fav_hsy">
        <div class="fav">
            <van-icon name="star-o" />
            <span>收藏</span>
        </div>
        <div class="hsy">
            <van-icon name="underway-o" color='#abaabb' />
            <span>历史</span>
        </div>
    </div>
    <!-- 消息通知和小智同学 -->
    <van-cell-group>
        <van-cell center title="消息通知" clickable>
            <van-icon name="arrow" slot="right-icon"/>
        </van-cell>
        <van-cell title="小智同学" clickable>
            <van-icon name="arrow" slot="right-icon"/>
        </van-cell>
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button type="primary"
    block
    color='#fff'
    class="logOut"
    v-if='user'
    @click='onLogOut'
    >退出登录</van-button>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserInfoAPI} from '../../api/index'
export default {
    data(){
        return{
            userInfo:{}
        }
    },
    created(){
        if(this.user){
            this.loadUserInfo()
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        onLogOut(){
            this.$dialog.confirm({
                title: '提示',
                message: '确认退出吗',
            })
            .then(() => {
            // on confirm
            this.$store.commit('setUser',null);
            })
            .catch(() => {
            // on cancel
            });
        },
        toLogin(){
            this.$router.push('./login')
        },
        async loadUserInfo(){
            try{
                const{data}=await getUserInfoAPI()
                this.userInfo=data.data
                // console.log(this.userInfo)
            }catch(err){
                console.log(err)
                this.$toast('获取数据失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login_un {
    display: flex;
    height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.37333rem;

    .icon_img {
        margin-bottom: 15px;
    }
}

.fav_hsy {
    display: flex;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
    padding: 16px 8px;

    .fav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 50px;

        span {
            font-size: 28px;
        }
    }

    .hsy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 50px;

        span {
            font-size: 28px;
        }
    }
}

//个人信息的样式
.show_ps {
    // display: flex;
    padding-top: 110px;
    // height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    color: #fff;
    font-size: 0.37333rem;
    box-sizing: border-box;
    .psinfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        .priate {
            display: flex;
            align-items: center;

            span {
                padding-left: 30px;
            }
        }
        .van-button--mini {
            width: 116px;
            height: 50px;
            background-color: #fff;
            color: #747474;
        }
    }
    .data_status{
        display: flex;
        justify-content: space-around;
        .data_msg{
            display: flex;
            flex-direction:column;
            align-items: center;
            padding:30px 0px;
        }
    }
}
.logOut{
    margin-top:20px;
    .van-button__text{
    color:#000;
    }
}

</style>
