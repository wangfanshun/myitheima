<template>
<div class='article-list'>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
            <van-cell v-for="item in list" :key="item.art_id" :title="item.title" @click="toArticlePage(item.art_id)">
                <!-- 三张封面是显示内容-->
                <div slot="label" v-if="item.cover.images&&item.cover.type===3">
                    <van-row>
                        <van-col span="8" v-for="(pic,index) in item.cover.images" :key="index">
                            <van-image width="127" height="70" :src="pic" />
                        </van-col>
                    </van-row>
                    <div class="label-info-wrap">
                        <span>{{ item.aut_name }}</span>
                        <span>{{ item.comm_count }}评论</span>
                        <span>{{ item.pubdate | relativeTime }}</span>
                    </div>
                </div>

                <!-- 一张图片时候显示 -->
                <van-image slot="default" width="127" height="70" :src="item.cover.images[0]" v-else-if="item.cover.images&&item.cover.type===1" />
                <div class="label-info-wrap" slot="label" v-show="(item.cover.images&&item.cover.type===1)||(item.cover.type===0)">
                    <span>{{ item.aut_name }}</span>
                    <span>{{ item.comm_count }}评论</span>
                    <span>{{ item.pubdate | relativeTime }}</span>
                </div>
            </van-cell>
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import {
    getArticlesAPI
} from "@/api/index";
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            error: false,
            refreshing: false,
            timestamp: null
        };
    },
    props: {
        channel: {
            require: true,
            type: Number
        }
    },
    methods: {
        async onLoad() {
            // 异步更新数据
            try {
                const {
                    data
                } = await getArticlesAPI({
                    timestamp: this.timestamp || Date.now(),
                    channel_id: this.channel,
                    with_top: 1
                });
                console.log(data);
                this.list.push(...data.data.results);
                if (this.list.length && data.data.pre_timestamp === null) {
                    this.finished = true;
                } else if (this.list.length) {
                    this.timestamp = data.data.pre_timestamp;
                    this.loading = false;
                }
            } catch (err) {
                this.error = true;
                this.loading = false;
            }
            // 加载状态结束
            // this.loading = false;
            // 数据全部加载完成
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
            this.refreshing = false;
        },
        async toArticlePage(val) {
            // const res2 = await getArticlesItemAPI(val)
            // console.log(res2)
            this.$router.push({
                name: 'articles',
                params: {
                    articleId: val
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
.article-list {
    height: 79vh;
    overflow-y: auto;
}

.label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
}
// .van-cell__title{
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between
// }
</style>
