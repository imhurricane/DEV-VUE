<template>
    <div style="height: 100% ; width: 100%" class="table-utile">
        <div class="header-util">

            <div  class="header-util-input-div">
                <Select @on-change="searchColChange" v-show="searchCol.length>0" placeholder="选择搜索的列名" class="header-util-select">
                    <Option v-for="item in searchCol" :value="item.column" :key="item.column">{{ item.label }}</Option>
<!--                    <Option  :value="1" >2</Option>-->
                </Select>
                <Input
                        class="header-util-input"
                        search
                        enter-button
                        placeholder="请输入要搜索的内容"
                        @on-search="onSearch"
                        @on-change="onInputSearch"
                />
            </div>
            <div class="header-util-button-div">
                <div v-if="buttonArray.length || buttonArray.length > 0 " v-for="btn in buttonArray">
                    <!--          <div style="margin-left: 5px; margin-right: 5px"/>-->
                    <Button v-on:click="commonBut(btn.method)" type="text" class="header-util-button">{{btn.content}}
                    </Button>
                </div>
                <!--        <Button v-on:click="refData" type="text" class="header-util-button" >刷新数据</Button>-->
                <!--        <div style="margin-left: 5px; margin-right: 5px"/>-->

<!--                <Button v-show="isShowExportBtn" v-on:click="exportData" type="text" class="header-util-button">导出数据-->
<!--                </Button>-->
            </div>

        </div>
        <Table
                class="util-table"
                highlight-row
                stripe
                :height='tableHeight'
                :columns="column"
                :data="tableData"
                :loading="loadingTable"
                @on-selection-change="selectionChange"
                @on-select-all="selectAll"
                @on-select-all-cancel="selectCancelAll"
                @on-row-click="rowClick"
                @on-select-cancel="selectCancel"
                @on-select="onSelect"
                :value="itemTab"
        >
        </Table>
        <div class="page-div">
            <div style="float: right;">
                <Page show-sizer show-elevator
                      :total="total"
                      :page-size="pageSize"
                      :page-size-opts="pageSizeOpts"
                      :current="current"
                      placement="top"
                      @on-change="changePage"
                      @on-page-size-change="pageSizeChange"
                >
                </Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TableUtil',
  data () {
    return {
      itemTab: '2',
      column: []
    }
  },
  methods: {
    // 多选框发生变化
    selectionChange (selection) {
      this.$emit('table-selection-change', selection)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    selectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    selectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    selectCancelAll (selection) {
      this.$emit('on-select-all-cancel', selection)
    },
    // 页码改变的回调
    changePage (current) {
      this.$emit('change-page', current)
    },
    // 切换每页条数时的回调
    pageSizeChange (pageSize) {
      this.$emit('page-size-change', pageSize)
    },
    // 点击搜索
    onSearch (content) {
      this.$emit('click-search', content)
    },
    searchColChange (content) {
      this.$emit('searchColChange', content)
    },
    onInputSearch (event) {
      this.$emit('on-input-search', event.target.value)
    },
    // 点击刷新数据
    refData () {
      this.$emit('click-refresh-data', null)
    },
    // 导出数据
    exportData () {
      this.$emit('click-export-data', null)
    },
    // 自定义按钮
    commonBut (method) {
      this.$emit(method, null)
    },
    // 点击行获取数据
    rowClick (data, index) {
      this.$emit('currentRowData', data, index)
    },
    updateColumns () {
      let c = this.columns
      c.map(res => {
        if (!res.align) {
          res.align = 'center'
          return res
        }
      })
      this.column = c
    }
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    loadingTable: Boolean,
    total: Number, // 总记录数
    current: Number, // 当前页码
    pageSizeOpts: Array, // 每页条数切换的配置
    pageSize: Number, // 每页条数
    tableHeight: {
      type: [Number, String],
      default () {
        return window.innerHeight - 320
      }
    },
    buttonArray: {
      type: Array,
      default () {
        return []
      }
    },
    isShowExportBtn: {
      type: Boolean,
      default () {
        return true
      }
    },
    searchCol: {
      type: Array,
      default () {
        return []
      }
    }
  },
  beforeMount () {
    this.updateColumns()
  },
  mounted () {
    // let a  = document.getElementsByClassName('table-utile');
    // console.log(a , '11123232');
    // console.log(a.length);
    // for (let i = 0; i <a.length ; i++) {
    //     a[i].parentNode
    //     console.log(a[i].parentNode, '234234');
    //
    // }
    //
    // console.log(document.parentNode, '1231231');
  },
  watch: {
  }

}
</script>

<style>
    @import "util.css";
    /*.ivu-table-overflowX{*/
    /*    overflow: hidden !important;*/
    /*}*/
    /*.ivu-table-tip{*/
    /*    overflow: hidden !important;*/
    /*}*/
</style>
                             
