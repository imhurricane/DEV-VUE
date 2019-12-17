<template>
    <div class="tab-header-action" style="padding: 10px;">
        <h3 style="margin-left: 10px;font-size: 16px">{{title}}</h3>
        <p style="margin-left: 10px;margin-top: 5px;font-size: 14px">{{name}}</p>
    </div>
</template>

<script>
export default {
  name: 'devHeader',
  props: {
    name: {
      type: String,
      default () {
        return ''
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .tab-header-action {
    width: 100%;
    margin-bottom: 10px ;
    height: 60px;
    background: #ffffff;
    padding-left: 20px;
  }
</style>
