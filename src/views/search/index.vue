<template>
<div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
        <van-search v-model="searchInput" show-action placeholder="黑马" @search="onSearch" @cancel="onCancel" background='#3296fa' @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow" :searchInput='searchInput'></searchResult>
    <!-- 联想建议 -->
    <searchSuggestion v-else-if="searchInput" :searchInput='searchInput' @search='onSearch'></searchSuggestion>
    <!-- 搜索历史 -->
    <searchHistory v-else :searchHistories='searchHistory2' @removeitem='onRemoveitem' @onSearch='onSearch' @emptyHistories='onEmptyHistories'></searchHistory>
</div>
</template>

<script>
import searchHistory from "./commponents/search-history";
import searchResult from "./commponents/search-result";
import searchSuggestion from "./commponents/search-suggestion";
import {
    setLocal,
    getLocal
} from "../../utils/storage";
import {
    getArticlesAPI
} from "../../api";
export default {
    data() {
        return {
            searchInput: "",
            isResultShow: false,
            searchHistory2: getLocal('searchHistory') || []
        };
    },
    components: {
        searchHistory,
        searchResult,
        searchSuggestion
    },
    watch:{
        searchHistory2(){
            setLocal("searchHistory", this.searchHistory2)
        },
    },
    methods: {
        onSearch(val) {
            console.log(this.searchHistory2);
            this.isResultShow = true;
            this.searchInput = val;
            const index = this.searchHistory2.indexOf(this.searchInput);
            if (index !== -1) {
                this.searchHistory2.splice(index, 1);
            }
            this.searchHistory2.unshift(this.searchInput);
            console.log(this.searchHistory2)
            // console.log(this.searchHistory);
        },
        onCancel() {
            this.$router.back()
        },
        onRemoveitem(ind){
            this.searchHistory2.splice(ind,1)
        },
        onEmptyHistories(){
            this.searchHistory2=[]
        }
    }
};
</script>

<style>
</style>
