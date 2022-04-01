<template>
<div class='homepage_a'>
    <!-- 搜索框 -->
    <van-search  fixed v-model="value" placeholder="搜索" shape='round' background='#3296fa' input-align='left' show-action class='search-bar'>
        <van-icon name="wap-nav" slot='left' class='searchBurger' size='36' />
        <van-icon name="search" size='36' slot='action' />
    </van-search>
    <!-- TAB栏 -->
    <van-tabs v-model="active" swipeable animated>
        <van-tab :title='obj.name' v-for="obj in channels" :key='obj.id'>
            <mylist :channel='obj.id'></mylist>
        </van-tab>
        <div slot='nav-right' class='palceHolder'></div>
        <div slot='nav-right' class='humburger-btn'>
            <i class="toutiao toutiao-gengduo"></i>
        </div>
    </van-tabs>
    <!-- 显示列表 -->

</div>
</template>

<script>
import { channelsAPI, getArticlesAPI } from "../../api/index";
import mylist from "./components/list";
export default {
  data() {
    return {
      value: "",
      channels: [],
      active: 0,
      articles: ""
    };
  },
  created() {
    this.getchannels();
    // this.getArticles();
  },
  methods: {
    async getchannels() {
      const channelsres = await channelsAPI();
      this.channels = channelsres.data.data.channels;
      console.log(this.channels);
    }
    // async getArticles() {
    //   const articlesres = await getArticlesAPI();
    //   console.log(articlesres);
    // }
  },
  components: {
    mylist
  }
};
</script>

<style lang='less' scoped>
		/deep/.search-bar{
    position: fixed;
		width: 100%;
		z-index: 999;
		top:0;
    align-items: center;
    .searchBurger {
      padding-right: 20px;
    }
    .van-search__action {
      line-height: 36px;
    }
  }
  /deep/.van-tabs {
    border-right: 1px solid #aeaeae;
    margin-top: 180px;
    .van-tabs__wrap {
      border-bottom: 1px solid #aeaeae;
      position: fixed;
			z-index: 999;
			top:96px;
      // border-right:1px,solid #aeaeae;

      .van-tabs__line {
        bottom: 35px;
      }
      .humburger-btn {
        position: fixed;
        display: flex;
        justify-content: space-around;
        align-items: center;
        right: 0;
        width: 60px;
        height: 88px;
        opacity: 0.9;
        background-color: #fff;

        .toutiao-gengduo {
          font-size: 0.5rem;
        }

        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .palceHolder {
        flex-shrink: 0;
        width: 60px;
        height: 88px;
      }
		}
		.van-tabs__content{

		}
	}
	.homepage_a{
		margin-bottom:100px;
	}
</style>