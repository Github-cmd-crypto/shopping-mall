<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-tips v-show="tipsShow"></cart-tips>
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import CartList from "./childComps/CartList"
import CartButtonBar from './childComps/CartButtonBar'
import CartTips from './childComps/CartTips'

import NavBar from "components/common/navbar/NavBar"

import {mapGetters} from "vuex"


export default {
  name:'Cart',
  components: {
    CartList,
    CartButtonBar,
    CartTips,
    NavBar
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    // 两种语法
    // 第一种(数组)
    // ...mapGetters(['cartLength','cartList'])
    // 第二种(对象)
    ...mapGetters({
      length:'cartLength'
    }),
    tipsShow() {
      return this.$store.getters.cartLength> 0 ? !this.show : this.show;
    }
  }
}
</script>

<style scoped>
  #cart {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
