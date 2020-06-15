<template>
  <div class="tips">
    <img src="~assets/img/empty/empty.jpg" alt />
    <p class="subtitle">天啦噜，购物车竟然是空的</p>
    <p class="smalltitle">再忙，也要记得买点东西犒劳自己~</p>
    <div class="btns" @click="toHome">去逛逛</div>
  </div>
</template>
<script>
export default {
  name: "CartTips",
  methods: {
    toHome() {
      this.$router.push("/home");
    }
  }
};
</script>
<style  scoped >
.tips {
  width: 90%;
  height: 200px;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.tips img {
  margin: auto;
}
.tips .subtitle {
  margin: 10px 0;
}
.tips .smalltitle {
  margin: 16px 0;
  font-size: 12px;
  color: #bdbdbd;
}
.tips .btns {
  width: 80px;
  height: 35px;
  text-align: center;
  padding: 6px;
  border: 1px solid #e5e5e5;
  box-shadow: 1px 4px 4px #fff;
  margin: 16px auto;
}
</style>
