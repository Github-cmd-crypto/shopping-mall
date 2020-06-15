<template>
  <grid-view>
    <goods-item
      class="goods-item"
      v-for="(item, index) in categoryDetail"
      :key="index"
      :goodsItem="item"
    ></goods-item>
  </grid-view>
</template>
<script>
import GridView from "common/gridView/GridView";
import GoodsItem from "content/goods/GoodListItem";

export default {
  name: "TabContentDetail",
  components: {
    GridView,
    GoodsItem
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style  scoped>
.goods-item {
  width: 40%;
}
</style>
