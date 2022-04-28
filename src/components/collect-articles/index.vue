<template>
    <van-icon color="orange" name="star" v-if="collected" @click="changeCollect"/>
    <van-icon color="#777" name="star-o" v-else @click="changeCollect"/>
</template>

<script>
import {cancelCollAPI,collectArtAPI} from '../../api/index'
export default {
    name:'collectArticles',
    model:{
        prop:'collected',
        event:'changecollect'
    },
    props:{
        collected:{
            type:Boolean,
            require:true
        },
        articleId:{
            type:[String,Number,Object],
            require:true
        }
    },
    methods:{
        async changeCollect(){
            console.log(this.articleId)
            try{
                if(this.collected){
                    await cancelCollAPI(parseInt(this.articleId))
                }else{
                    await collectArtAPI(this.articleId)
                }
                this.$emit('changecollect',!this.collected)
            }catch(err){
                this.$toast('关注失败')
            }
        }
    }
}
</script>

<style>

</style>
