<template>
<div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <van-cell v-for="item in list" :key="item.com_id">
            <van-image slot="icon" round width="30" height="30" style="margin-right: 10px;" :src="item.aut_photo" />
            <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
            <div slot="label">
                <p style="color: #363636;">{{item.content}}</p>
                <p>
                    <span style="margin-right: 10px;">{{item.pubdate|relativeTime}}</span>
                    <van-button size="mini" type="default">回复</van-button>
                </p>
            </div>
            <van-icon slot="right-icon" name="like-o" />
        </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
        <van-field clearable placeholder="请输入评论内容">
            <van-button slot="button" size="mini" type="info">发布</van-button>
        </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
</div>
</template>

<script>
import { getCommentsAPI } from '../../../api';
export default {
    name: "ArticleComment",
    props: {
        articleId: {
            type: [String, Number, Object],
            require: true
        },
        list:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            // list: [], // 评论列表
            loading: false, // 上拉加载更多的 loading
            finished: false, // 是否加载结束
            q:{
                type:'a',
                source:this.articleId,
                offset:'',
                limit:10
            }
        };
    },
    created() {
        this.onLoad()
    },
    methods: {

        async onLoad() {
            // 异步更新数据
            // this.loading=true
            // console.log(this.articleId)
            const comres= await getCommentsAPI(this.q)
            console.log(comres)
            const addToList=comres.data.data.results
            this.loading = false
            console.log(addToList)
            // console.log(comres.data.data.last_id)
            if(addToList.length) {
                this.list.push(...addToList)
                this.q.offset=comres.data.data.last_id
                console.log(this.list)
            }else{
                this.finished=true
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完
        }
    }
};
</script>

<style lang="less" scoped>
.publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.van-list {
    margin-bottom: 45px;
}
.article-comments{
    height:100vh;
}
</style>
