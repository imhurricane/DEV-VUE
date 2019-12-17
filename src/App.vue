<template>
    <div id="app">
        <router-view/>
<!--      <keep-alive>     &lt;!&ndash;使用keep-alive会将页面缓存&ndash;&gt;-->
<!--        <router-view v-if="$route.meta.keepAlive"/>-->
<!--      </keep-alive>-->
<!--      <router-view v-if="!$route.meta.keepAlive"/>-->
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
    .text-right {
        text-align: right;
    }

    .size {
        width: 100%;
        height: 100%;
    }

    html, body {
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        .size;
    }
</style>
