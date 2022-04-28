<template>
<div class="searchResult">
    <van-cell-group>
        <van-cell
        v-for="(list,ind) in suggestionList"
        :key="ind"
        icon='search'
        @click="$emit('search',list)"
        >
        <span slot="title" v-html="heightStr(list)"></span>
        </van-cell>
    </van-cell-group>
</div>
</template>

<script>
import {
    getSearchSuggestionAPI
} from '@/api/index'
import {
    debounce
} from 'lodash'
export default {
    data() {
        return {
            suggestionList: [],
        }
    },
    props: {
        searchInput: {
            type: String,
            reqiure: true
        }
    },
    watch: {
        searchInput: {
            handler: debounce(function () {
                this.loadSuggestion()
            }, 500),
            immediate: true
        }
    },
    methods: {
        async loadSuggestion() {
            try {
                const suggestionres = await getSearchSuggestionAPI(this.searchInput)
                // console.log(suggestionres)
                if(suggestionres.data.data.options.length===1&&suggestionres.data.data.options[0]===null){
                    this.suggestionList=[]
                }else{
                    this.suggestionList = suggestionres.data.data.options
                }

            } catch (err) {
                this.$toast('获取建议失败')
            }
        },
        heightStr(text){
            const textReg= new RegExp(this.searchInput,'gi')
            const highLightStr=`<span class="active">${this.searchInput}</span>`
            // console.log(text)
            if(text){
                return text.replace(textReg,highLightStr)
            }

        }
    }
}
</script>

<style scoped lang='less'>
    /deep/.active{
        color: blue;
    }
</style>
