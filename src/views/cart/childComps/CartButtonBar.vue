<template>
  <div class="bottom-menu">
    <div class="checked">
      <check-button class="select-all"
      :value="isSelectAll"
      @click.native="checkBtnClick"></check-button>
      <span class="check">全选</span>
    </div>
    <div class="add">
      <span class="total-price">合计：{{totalPrice}} ¥</span>
      <span class="buy-product" @click="calculateMoney">
        <span v-show="show">结算 ({{checkLength}})</span>
      </span>
    </div>
  </div>
</template>
<script>
import CheckButton from "content/checkButton/CheckButton";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.getters.cartList.find(item => !item.checked);
    },
    show() {
      return this.$store.getters.cartListLength === 0
        ? this.isShow
        : !this.isShow;
    }
  },
  methods: {
    checkBtnClick() {
      if (this.isSelectAll) {
        // 1.判断是否有未选中的按钮
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        // 2.有未选中的内容, 则全部选中
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calculateMoney() {
      if (this.checkLength === 0) {
        this.$toast.show("请选择要购买的商品~");
      } else {
        this.$toast.show("跳转到结算页面~");
      }
    }
  }
};
</script>

<style scoped >
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 15px;
  box-sizing: border-box;
}
.bottom-menu .check {
  float: left;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 10px;
  top: 13px;
}
.bottom-menu .check {
  padding-left: 18px;
}
.bottom-menu .add {
  width: 200px;
  height: 44px;
  float: right;
}
.bottom-menu .total-price {
  position: absolute;
  right: 120px;
  top: 0;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 80px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  cursor: pointer;
  float: right;
}
.bottom-menu .delete {
  width: 80px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0px;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
}
</style>
