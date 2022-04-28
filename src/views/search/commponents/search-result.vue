<template>
<div class="searchResult">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(article,ind) in searchResult" :key="ind" :title="article.title" @click='toArticlePage(article.art_id)' />
    </van-list>
</div>
</template>

<script>
import {
    getSearchResultAPI,
    getArticlesItemAPI
} from '../../../api/index.js'
import {
    getLocal,
    setLocal
} from '../../../utils/storage'
export default {
    data() {
        return {
            loading: false,
            finished: false,
            searchResult: [],
            page: 1,
            perpage: 20,
        };
    },
    props: {
        searchInput: {
            type: String,
            require: true
        }
    },
    methods: {
        async onLoad() {
            // setLocal('searchHistory', this.searchInput)
            const searchResultres = await getSearchResultAPI({
                page: this.page,
                per_page: this.perpage,
                q: this.searchInput
            })
            console.log(searchResultres.data.data.results)
            if (searchResultres.data.data.results.length === 0) {
                this.loading = false
                this.finished = true
            } else {
                this.searchResult.push(...searchResultres.data.data.results)
                this.page++
                this.loading = false
            }
        },
        async toArticlePage(val) {
            // const res2 = await getArticlesItemAPI(val)
            // console.log(res2)
            this.$router.push({
                name:'articles',
                params:{
                    articleId:val
                }
            })
        }
    },
}
</script>

<style>

</style>
