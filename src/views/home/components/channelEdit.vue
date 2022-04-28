<template>
<div class="channelEdit">
    <van-cell-group :border='false'>
        <van-cell title="我的频道">
            <van-button type="info" slot="default" color='none' @click="isEdit=!isEdit">
                {{isEdit?'完成':'编辑'}}
            </van-button>
        </van-cell>
    </van-cell-group>
    <!-- 我的频道列表 -->
    <van-grid :gutter="10" :border='false' :column-num='10'>
        <van-grid-item class='channel_item' v-for="(obj,ind) in channels" :key="ind" @click="removeChannel(obj.id,ind)">
            <van-tag type="primary" slot="default" color='gray'>
                {{obj.name}}
                <van-icon name="close" slot="default" class='tag_close' v-if="isEdit" />
            </van-tag>
        </van-grid-item>
    </van-grid>
    <!-- 推荐频道列表 -->
    <van-cell-group :border='false'>
        <van-cell title="频道推荐">
        </van-cell>
    </van-cell-group>
    <!-- 推荐频道中的项 -->
    <van-grid :gutter="10" :border='false' :column-num='10'>
        <van-grid-item class='channel_item' v-for="(obj,ind) in recommend" :key="ind" @click="addchannels(obj,obj.id)">
            <van-tag type="primary" slot="default" color='gray'>{{obj.name}}</van-tag>
        </van-grid-item>
    </van-grid>
</div>
</template>

<script>
import {
    getAllChannelsAPI,
    deleteChannelsAPI,
    addUserChannelsAPI
} from "@/api/index"
import {
    mapState
} from 'vuex'
import {
    getLocal,
    setLocal
} from '../../../utils/storage.js'
export default {
    data() {
        return {
            allChannels: [], //所有频道
            isEdit: false,
            fixedChannel: [0]
        };
    },
    props: {
        channels: { //用户频道
            type: Array,
            require: true
        }
    },
    computed: {
        //推荐频道列表
        recommend() {
            return this.allChannels.filter(channel => {
                return !this.channels.find(mychannel => {
                    return mychannel.id === channel.id;
                });
            });
        },
        ...mapState(['user'])
    },
    created() {
        // console.log(this.channels);
        this.loadAllchannels();
    },
    methods: {
        async loadAllchannels() {
            const allChannels = await getAllChannelsAPI();
            console.log(allChannels);
            this.allChannels = allChannels.data.data.channels;
            console.log(this.allChannels);
        },
        async removeChannel(id, index) {
            if (this.isEdit && !this.fixedChannel.includes(id)) {
                try {
                    this.channels.splice(index, 1);
                    if (this.user) {
                        await deleteChannelsAPI(id)
                    } else {
                        setLocal('TOUTIAO_channels',this.channels)
                    }
                } catch {
                    this.$toast('删除列表失败')
                }

            } else {
                this.$emit('changeChannel', index)
            }
        },
        async addchannels(obj,id) {
            console.log(obj)
            this.channels.push(obj);
            if(this.user){
                await addUserChannelsAPI({
                    id:obj.id,
                    seq:this.channels.length
                })
            }else{
                setLocal('TOUTIAO_channels',this.channels)
            }
        }
    }
};
</script>

<style lang="less" scoped>
.van-cell-group {
    margin-top: 111px;

    .van-button {
        height: 44px;
        border-radius: 26px;
        padding: 0 16px;
        border-color: red;

        .van-button__content {
            color: red;
        }
    }
}

/deep/.channel_item.van-grid-item {
    // flex-basis: auto !important;
    .van-grid-item__content {
        padding: 10px 0;

        .van-tag--primary {
            white-space: nowrap;
            font-size: 15px;
            line-height: 50px;
        }
    }
}

.tag_close {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 999;
    color: black;
}
</style>
