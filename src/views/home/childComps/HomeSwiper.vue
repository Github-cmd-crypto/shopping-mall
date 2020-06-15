<template>
  <div>
    <swiper>
      <swiper-item :key="index" v-for="(item,index) in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageload">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'common/swiper'
  export default {
    name:'HomeSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isload:false
      }
    },
    methods: {
      imageload() {
        if (!this.isload) {
          this.$emit('swiperImageLoad')
          this.isload = true
        }
      }
    }
  }
</script>

<style>

</style>
