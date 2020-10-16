<template>
  <safe-area-view class="container">
    <view class="header">
      <text class="title">Coffee machine</text>
    </view>
    <view class="body">
      <text class="text">Machine state : {{commandTab[0]}}</text>
    </view>
  </safe-area-view>
</template>

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
.text {
  font-size : 25;
}

</style>

<script>
import { checkStatus, sendStatus, WAIT } from "./firebase/commands";

export default {
  data() {
    return {
      commandTab: [WAIT],
    };
  },
  mounted: async function(){
    let that = this;
    that.commandTab = await checkStatus(that.commandTab);
  },
};
</script>