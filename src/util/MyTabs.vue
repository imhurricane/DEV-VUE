<template>
    <div class="my-tabs">
<!--         type="card"-->
        <Tabs type="card" @on-click="clickTab" :value="tabsName">
            <template v-for="pane in  tabsArray">
                    <TabPane :name="pane.name" :label="pane.label">
                        <div class="tab-list-item">
                            <slot  :name="pane.moduleName"></slot>
                        </div>
                    </TabPane>
            </template>
        </Tabs>
    </div>
</template>

<script>
export default {
  name: 'MyTabs',
  props: {
    tabsName: {
      type: String
    },
    tabsArray: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clickTab (name) {
      this.$emit('on-click-tab', name)
    }
  }
}
</script>
<style>
    .tab-list-item{
        overflow: auto;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        padding-bottom: 0px !important;
    }
    /*.my-tabs,.my-tabs>div{*/
    /*    height: 100%;*/
    /*}*/
    /*.ivu-tabs>.ivu-tabs-content{*/
    /*    !*height: calc(100% - 36px);*!*/
    /*    height: 100%;*/
    /*    overflow: auto;*/
    /*}*/
</style>
