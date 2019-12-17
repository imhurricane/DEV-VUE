<template>

  <div class="i-table-no-border" style="background-color: white;margin-left: 20px;margin-right: 20px">
    <div :style="{display:(isChecked?'none':'')}" style="margin-left: 30px;padding-top: 10px">
      <Row>
        <Col span="8">
          <span style="font-size: 16px">用户名:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
          <span style="font-size: 16px">姓名:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
        <span>
            <button type="primary" class="ivu-btn ivu-btn-primary" @click="onSearch('asfasfa')"><span>查询</span></button>
            <button type="text" class="ivu-ml-8 ivu-btn ivu-btn-default" style="margin-left: 5px"
                    @click="changeLoading(false)"><span>重置</span></button>
            <a class="ivu-ml-8" style="font-size: 14px;margin-left: 5px" @click="updateUI(true)">
              展开 <i class="ivu-icon ivu-icon-ios-arrow-down"></i></a>
        </span>
        </Col>
      </Row>
    </div>
    <div :style="{display:(isChecked?'':'none')}" style="margin-left: 30px;padding-top: 10px">
      <Row>
        <Col span="8">
          <span style="font-size: 16px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
          <span style="font-size: 16px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
          <span style="font-size: 14px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
      </Row>
      <Row style="padding-top: 10px">
        <Col span="8">
          <span style="font-size: 16px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
          <span style="font-size: 16px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
        <Col span="8">
          <span style="font-size: 14px">规则名称:</span>
          <input class="ivu-input ivu-input-default" placeholder="请输入" style="margin-left: 10px;width: 50%"></input>
        </Col>
      </Row>
      <Row style="padding-top: 10px">
        <Col span="8" offset="16" style="text-align: center">
          <span>
            <button type="primary" class="ivu-btn ivu-btn-primary" @click="onSearch('asdas')" title="查询"><span>查询</span></button>
            <button type="text" class="ivu-ml-8 ivu-btn ivu-btn-default" style="margin-left: 5px"
                    @click="changeLoading(false)"><span>重置</span></button>
            <a class="ivu-ml-8" style="font-size: 14px;margin-left: 5px" @click="updateUI(false)">
              收起 <i class="ivu-icon ivu-icon-ios-arrow-up"></i></a>
        </span>
        </Col>
      </Row>
    </div>
    <div style="padding-left: 10px;padding-right: 10px;margin-top: 10px">
      <Button type="primary" class="ivu-btn ivu-btn-primary" @click="toDetail('',false)">
        <i class="ivu-icon ivu-icon-md-add"></i>
        <span>新建</span>
      </Button>
      <Button type="primary" class="ivu-btn ivu-btn-primary"  @click="onSearch()" style="padding: 5px;margin-left: 5px;width: 40px">
        <Icon type="md-refresh" size="18"/>
      </Button>
      <Button type="text" :style="{display:(tableTitle<=1?'none':'')}" style="margin-left: 5px">
        <Dropdown trigger="click" placement="bottom-start" style="text-align: start;width: 70px">
          <i class="ivu-icon ivu-icon-md-list"></i>
          <a href="javascript:void(0)" style="color: #363e4f">
            批量操作
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="removeSelections()">删除</DropdownItem>
            <DropdownItem @click.native="approvalSelections()">审批</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Button>
      <div class="ivu-mt ivu-alert ivu-alert-info ivu-alert-with-icon" style="margin-top: 2px">
          <span class="ivu-alert-icon">
            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
          </span>
        <span class="ivu-alert-message">
            <div style="font-size: 14px;">
              已选择  <strong style="color: rgb(45, 140, 240);">{{this.tableTitle}}</strong>  项数据
              <a class="ivu-ml" @click="handleSelectAll(false)">清空</a>
            </div>
          </span>
        <span class="ivu-alert-desc"></span>
      </div>

      <Table :loading="loadingTable"
             :columns="columns"
             :data="tableData"
             :height='tableHeight'
             style="margin-top: -10px"
             stripe
             border ref="selection"
             @on-selection-change="selectChanged">

        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <a type="primary" size="small" @click="toDetail(row,true)" style="margin-right: 10px">编辑</a>
          <a type="primary" size="small" @click="remove(row,index)">删除</a>
        </template>

      </Table>

      <Page :total="total"
            :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            :current="current"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"
            style="text-align: center;margin-top: 10px"/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'devContent',
  data () {
    return {
      tableTitle: 0,
      isChecked: false,
      selections: []
    }
  },
  props: {
    loadingTable: Boolean,
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
    total: Number, // 总记录数
    current: Number, // 当前页码
    pageSizeOpts: Array, // 每页条数切换的配置
    pageSize: Number, // 每页条数
    tableHeight: {
      type: [Number, String],
      default () {
        return window.innerHeight - 370
      }
    }
  },
  methods: {
    selectChanged (status) {
      this.tableTitle = status.length
      this.selections = status
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    toDetail (row, flag) {
      this.$emit('toDetail', row, flag)
    },
    // 页码改变的回调
    changePage (current) {
      this.$emit('change-page', current)
    },
    // 切换每页条数时的回调
    pageSizeChange (pageSize) {
      this.$emit('page-size-change', pageSize)
    },
    remove (row, index) {
      this.$emit('remove', row.menuId, index)
    },
    removeSelections () {
      this.$emit('remove-selections', this.selections)
    },
    approvalSelections (selections) {
      alert('审批通过')
    },
    updateUI (flag) {
      this.isChecked = flag
    },
    changeLoading (flag) {
      this.loading = flag
    },
    // 点击搜索
    onSearch (content) {
      this.tableTitle = 0
      this.$emit('click-search', content)
    }

  }
}
</script>

<style scoped>

</style>
