
<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detaiNav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentOffset">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgload="imgload"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'common/scroll/Scroll'
  import GoodsList from 'content/goods/GoodsList'
  // import Toast from 'common/toast/Toast'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {itemListenerMixin,backTopMixin} from '../../common/mixin'
  import { debounce } from '../../common/utils'
  export default {
    name:"Detail",
    components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList},
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 2.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 5.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 6.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 7.取出评论的信息
        if (data.rate.CRate !== 0) {
          this.commentInfo = data.rate.list[0]
          // console.log(data.rate.list[0]);
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      // 4.给getThemeTopY赋值(对其赋值操作进行防抖处理以增加性能)
      this.getThemeTopY = debounce(() => {
        this.getThemeTopY = []
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs);
      })
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      imgload() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
      },
      contentOffset(position) {
        let positionY = -position.y
        let length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++) {
          if (
            this.currentIndex !== i &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]
          ) {
            this.currentIndex = i;
            this.$refs.detaiNav.currentIndex = this.currentIndex;
          }
        }
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        // console.log('加入购物车');
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price= this.goods.realPrice;
        product.iid = this.iid;
        // 2.将商品添加到购物车里面
        this.$store.dispatch('addCart',product).then(res => {
          console.log(res);
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // },2000)
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  background-color: #fff;
  z-index: 666;
}
.detail .content {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 62px;
  overflow: hidden;
}
</style>
