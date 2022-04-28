<template>
<div class="searchHistory">
    <van-cell-group>
        <van-cell title="搜索历史">
            <!-- 搜索历史编辑行 -->
            <div class="deleteControl" slot='default'>
                <span class="deleteEdit" v-if="isEdit">
                    <span @click="$emit('emptyHistories')" >全部删除</span>
                    &nbsp;&nbsp;
                    <span @click="isEdit=false">完成</span>
                </span>
                <van-icon name="delete-o" v-else @click="isEdit=true" />
            </div>
        </van-cell>
        <!-- 搜索历史列表行 -->
        <van-cell v-for="(history,ind) in searchHistories " :key="ind" :title="history" @click="Search(history)">
            <van-icon name="close" slot="right-icon" v-show="isEdit" @click.stop='removehistory(ind)' />
        </van-cell>
    </van-cell-group>
</div>
</template>

<script>
import {
    setLocal,
    getLocal
} from '@/utils/storage'
export default {
    data() {
        return {
            isEdit: false,
        }
    },
    props: {
        searchHistories: {
            type: Array,
            require: true
        }
    },
    methods: {
        removehistory(ind) {
            this.$emit('removeitem', ind)
        },
        Search(history){
            this.$emit('onSearch',history)
        }
    }
}
</script>

<style>

</style>
