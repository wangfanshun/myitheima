<template>
<div class="comment-post">
    <van-field class="post-field" v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="postComments">发布</van-button>
</div>
</template>

<script>
import {
    postCommentsAPI
} from '../../../api/index'
export default {
    name: 'CommentPost',
    components: {},
    props: {
        articleId: {
            type: [String, Number, Object],
            require: true
        },
        count:{
            type:Number,
            reqiure:true,
            // default:0
        }
    },
    data() {
        return {
            message: '',
            // loading: false,
            inputvalue: ''
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        async postComments() {
            if (this.message == '') {
                this.$toast('请输入文件内容')
            } else {
                this.$toast.loading({
                    message: '发布中...',
                    forbidClick: true, // 禁用背景点击
                    duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
                })
                try {
                    // console.log(this.articleId)
                    this.loading = true
                    const {
                        data
                    } = await postCommentsAPI({
                        target: this.articleId,
                        content: this.message,
                        aet_id: this.articleId
                    })
                    // this.loading = false
                    // console.log(data.data)
                    this.count++
                    this.$emit('postsuccess', data.data,this.count)
                    this.$toast.success('发布成功')
                    this.message = ''
                } catch (err) {
                    this.$toast.fail('发送评论失败')
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;

        &::before {
            display: none;
        }
    }
}
</style>
