<template>
  <safe-area-view class="container">
    <view class="header">
      <text class="title">Coffee</text>
    </view>
    <view class="body">
      <text class="">Machine state</text>
    </view>
  </safe-area-view>
</template>



<script>
export default {
  components: {  },
};
</script>


<style>
.container {
  flex: 1;
}
.title {
  font-size: 30;
  margin: 5;
  align-items: center;
  text-align: center;
}
.body {
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
