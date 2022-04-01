<template>
<div class="login-container">

    <van-nav-bar title="登录">
        <van-icon slot='left' color='#fff' name="cross"
        @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref='loginForm'>
        <van-field name='mobile' v-model="user.mobile" placeholder="请输入手机号" :rules="userFormRules.mobile">
            <template #left-icon>
                <slot name="left-icon"><i class=" toutiao toutiao-shouji"></i></slot>
            </template>
        </van-field>
        <van-field v-model="user.code" name="验证码" placeholder="请输入验证码" :rules="userFormRules.code">
            <template #left-icon>
                <i class='toutiao toutiao-yanzhengma'></i>
            </template>
            <template #button>
                <!-- 发送验证码的按钮 -->
                <van-button class='msg-snd-btn' type="primary" round v-if="countFinish" @click="codesnd">发送验证码</van-button>
                <!-- 发送倒计时按钮 -->
                <van-count-down :time="time" format="S秒后再次发送" v-else @finish='countFinish=true'/>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button square block type="info" class='login-sbmt' native-type="submit">登录</van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import {
    loginAPI,
    codesndAPI
} from '@/api'
export default {
    data() {
        return {
            user: {
                mobile: '13911111111',
                code: '246810'
            },
            userFormRules: {
                mobile: [{
                        required: true,
                        message: '手机号不能为空'
                    },
                    {
                        pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '手机号格式不正确'
                    }
                ],
                code: [{
                        required: true,
                        message: '验证码不能为空'
                    },
                    {
                        pattern:/^\d{6}$/,
                        message:'验证码格式错误'
                    }
                ]
            },
            time: 1000*5,
            countFinish:true
        };
    },
    methods: {

        async onSubmit(values) {
            this.$toast.loading({message:'登陆中',forbidclick:true})
            try {
                const {data} = await loginAPI(this.user)
                //将拿到的返回结果放容器中
                this.$store.commit('setUser',data.data)
                this.$toast.success('登录成功')
                this.$router.push('/my')
                console.log(data, '成功')
            } catch (err) {
                console.log(err, '失败')
                this.$toast.fail('登陆失败')
            }
        },
        async codesnd(){
        try{
            await this.$refs.loginForm.validate('mobile')
        }catch(err){
           return console.log('手机号码错误')
        }
        this.countFinish=false
        try{
            const coderes= await codesndAPI(this.user.mobile)
            console.log(coderes)
        }catch(err){
            console.log(err)
            if(err.response.status === 429){
                this.$toast('发送太频繁了，请稍后再试')
            }else{
                this.$toast('发送失败')
            }
        }
        }
    }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__content {
    background-color: #3296fa;

    .van-nav-bar__title {
        color: #fff;
    }
}

.toutiao {
    font-size: 37px
}

.msg-snd-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    padding: 0 10px;
    border: none
}

.login-sbmt {
    margin-top: 52px;
    width: 696px;
    height: 88px;
    background-color: #6db4fb;
    border-radius: 5px;
    border: none
}
</style>
