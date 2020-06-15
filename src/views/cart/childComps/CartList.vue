<template>
  <div class="cartList">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import CartListItem from "./CartListItem";

import Scroll from "common/scroll/Scroll";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.cartList {
  height: calc(100% - 44px - 95px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
