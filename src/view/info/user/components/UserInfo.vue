<template>
  <div class="user-info">
    <UserInfoLeft ref="myUserInfoLeft"/>
<!--    <Divider style="height: 100% ; width: 5px" type="vertical" />-->
    <UserInfoRight/>
  </div>
</template>

<script>
  import UserInfoLeft from "./UserInfoLeft";
  import UserInfoRight from "./UserInfoRight";
  export default {
    name: "UserInfo",
    components: {UserInfoRight, UserInfoLeft},
    data() {
      return {
        split1: 0.5
      }
    },
    methods: {
      getMyUserInfoLeft (xtm){
        this.$refs.myUserInfoLeft.getDeptList(xtm);
      }
    }
  }
</script>

<style scoped>
  .user-info{
    height: 100%;
    display: flex;
  }
  .demo-split{
    height: 100%;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    height: 100%;
    padding: 10px;
  }
</style>
