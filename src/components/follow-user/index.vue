<template>
<div>
    <van-button class="follow-btn" :loading='loading' round size="small" v-if="followed" @click="changefollow2">已关注</van-button>
    <van-button class="follow-btn" :loading='loading' round size="small" icon="plus" v-else @click="changefollow2">关注</van-button>
</div>
</template>

<script>
import {
    addfollowAPI,
    removefollowAPI
} from '../../api/index'
export default {
    model: {
        prop: 'followed',
        event: 'changeFollow'
    },
    props: {
        followed: {
            type: Boolean,
            require: true
        },
        userId: {
            type: [String, Number, Object],
            require: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async changefollow2() {
            this.loading = true
            // console.log(this.followed)
            try {
                if (this.followed) {
                    //删除关注
                    // console.log(this.userId)
                    await removefollowAPI(this.userId)
                } else {
                    //添加关注
                    await addfollowAPI(this.userId)
                }
                this.$emit('changeFollow', !this.followed)
            } catch (err) {
                let message = '操作失败，请重试！'
                if (err.response && err.response.status === 401) {
                    message = '你不能关注你自己！'
                }
                this.$toast(message)
            }
            this.loading = false
        }
    }
}
</script>

<style>
</style>
