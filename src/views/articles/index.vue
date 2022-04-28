<template>
<div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="onClickLeft" title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
        <!-- 加载中 -->
        <div class="loading-wrap" v-if="loadingStatus">
            <van-loading color="#3296fa" vertical>加载中</van-loading>
        </div>
        <!-- /加载中 -->

        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-else-if="articleinfo.title">
            <!-- 文章标题 -->
            <h1 class="article-title">{{articleinfo.title}}</h1>
            <!-- /文章标题 -->

            <!-- 用户信息 -->
            <van-cell class="user-info" center :border="false">
                <van-image class="avatar" slot="icon" round fit="cover" :src="articleinfo.aut_photo" />
                <div slot="title" class="user-name">{{articleinfo.aut_name}}</div>
                <div slot="label" class="publish-date">{{articleinfo.pubdate|relativeTime}}</div>
                <!-- <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" @click="articleinfo.is_followed=!articleinfo.is_followed"
                :class="{
                    'followed':articleinfo.is_followed
                }"
                >
                    {{articleinfo.is_followed?'已关注':'关注'}}
                    </van-button> -->
                <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
                <followUser v-model="articleinfo.is_followed" :userId='articleinfo.aut_id'></followUser>
            </van-cell>
            <!-- /用户信息 -->

            <!-- 文章内容 -->
            <div class="article-content markdown-body" v-html="articleinfo.content" ref="article_content"></div>
            <van-divider>正文结束</van-divider>
            <ArticleComment :articleId='articleinfo.art_id' :list='commentList'></ArticleComment>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="errStatus===404">
            <van-icon name="failure" />
            <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
            <van-icon name="failure" />
            <p class="text">内容加载失败！</p>
            <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
        <!-- 评论区 -->
        <van-button class="comment-btn" type="default" round size="small" @click="postShow=true">写评论</van-button>
        <van-icon name="comment-o" :badge="articleinfo.comm_count" color="#777" />
        <collectArticles v-model='articleinfo.is_collected' :articleId='articleinfo.art_id'></collectArticles>
        <like-article
            class="btn-item"
            v-model="articleinfo.attitude"
            :articleId="articleinfo.art_id"

          />
        <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 弹出层 -->
    <van-popup v-model="postShow" position='bottom' :style="{ height: '30%' }">
        <CommentPost :articleId='articleinfo.art_id' :list='commentList'
        :count='articleinfo.comm_count' @postsuccess='onpostsuccess'></CommentPost>
    </van-popup>
    <!-- 弹出层 -->
</div>
</template>

<script>
import {
    getArticlesItemAPI
} from '../../api/index'
import followUser from '../../components/follow-user/index'
import collectArticles from '../../components/collect-articles/index'
import ArticleComment from './components/commend-item'
import CommentPost from './components/comment-post'
import {
    ImagePreview
} from 'vant'
import LikeArticle from '@/components/like-article'
export default {
    name: 'ArticleIndex',
    components: {
        followUser,
        collectArticles,
        ArticleComment,
        CommentPost,
        LikeArticle,
    },
    props: {
        articleId: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            loadingStatus: true,
            articleinfo: {},
            errStatus: 0,
            postShow: false,
            commentList:[]
        }
    },
    computed: {},
    watch: {},
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'height: 100%')
    },
    created() {
        this.getArticlesdetail();
    },
    mounted() {},
    methods: {
        async getArticlesdetail() {
            this.loadingStatus = true
            try {
                const articleres = await getArticlesItemAPI(this.articleId)
                this.articleinfo = articleres.data.data
                console.log(this.articleinfo)
                console.log(this.articleinfo.attitude)
                setTimeout(() => {
                    this.previewImage()
                }, 0);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    this.errStatus = 404
                }
            }
            this.loadingStatus = false
        },
        onClickLeft() {
            this.$router.back()
        },
        previewImage() {
            const articleContent = this.$refs.article_content
            const images = articleContent.querySelectorAll('img');
            console.log(images)
            const imgsrcs = [];
            images.forEach((val, ind) => {
                imgsrcs.push(val.src)
                val.onclick = () => {
                    ImagePreview({
                        images: imgsrcs,
                        startPosition: ind,
                        // closeable:true
                    })
                }
            })
            // console.log(imgsrcs)
        },
        onpostsuccess(val,count){
            this.postShow=false
            this.commentList.unshift(val.new_obj)
            this.articleinfo.comm_count=count
        }

    }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';

.article-container {
    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        background-color: #fff;
    }

    .article-detail {
        .article-title {
            font-size: 40px;
            padding: 50px 32px;
            margin: 0;
            color: #3a3a3a;
        }

        .user-info {
            padding: 0 32px;

            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }

            .van-cell__label {
                margin-top: 0;
            }

            .user-name {
                font-size: 24px;
                color: #3a3a3a;
            }

            .publish-date {
                font-size: 23px;
                color: #b7b7b7;
            }

            .follow-btn {
                width: 170px;
                height: 58px;
            }
        }

        .article-content {
            padding: 55px 32px;

            /deep/ p {
                text-align: justify;
            }
        }
    }

    .loading-wrap {
        padding: 200px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }

        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }

        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }

    .article-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;

        .comment-btn {
            width: 282px;
            height: 46px;
            border: 2px solid #eeeeee;
            font-size: 30px;
            line-height: 46px;
            color: #a7a7a7;
        }

        .van-icon {
            font-size: 40px;

            .van-info {
                font-size: 16px;
                background-color: #e22829;
            }
        }
    }
}
</style>
