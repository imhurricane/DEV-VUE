<template>
  <div class="user-list" style="height: 100%">
    <TableUtil
      :columns="columns"
      :tableData="getData"
      :loadingTable="loading"

      :pageSizeOpts="[5 , 10 , 30 , 50]"
      :total='total'
      :pageSize="pageSize"
      :current="current"
      :buttonArray = "buttonArray"
      :tableHeight = 'tableHeight'
      @table-selection-change="selectionRow"
      @change-page="changePage"
      @page-size-change="pageSizeChange"
      @click-search="clickSearch"
      @click-refresh-data="refreshData"
      @click-export-data="exportData"
      @add="add"
      @currentRowData="currentRowData"

    />
  </div>
</template>
<script>
import TableUtil from '../../../util/TableUtil'
import { getUserList } from '../../../api/userInfoConfig'
export default {
  name: 'UserList',
  // 页面初始化完成
  mounted () {
    this.getDataList()
    this.tableHeight = window.innerHeight - 320
  },
  components: {
    TableUtil
  },
  data () {
    return {
      tableHeight: 0,
      tableLoading: false,
      columns: [
        {
          // 多选
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'dlm'
        },
        {
          title: '姓名',
          key: 'description'
        },
        {
          title: '部门',
          key: 'bm'
        },
        {
          title: '班组',
          key: 'address'
        },
        {
          title: '创建日期',
          key: 'reportdate'
        }
      ],
      buttonArray: [
        { method: 'add', content: '添加按钮' }
      ],
      current: 1,
      pageSize: 10,
      total: 0,
      searchContent: null
    }
  },
  methods: {
    /**
         * 获取数据
         */
    getDataList (pageNum) {
      this.loading = true
      if (pageNum) {
        this.current = pageNum
      }
      getUserList(this.current, this.pageSize, this.searchContent).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.total = res.totalCount
          this.$store.commit('addUserInfArray', res.data)
        } else if (res.code === '500') {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          this.$Message.error(res.msg)
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    selectionRow (rows) {
      let xtmArray = []
      rows.map(item => {
        xtmArray.push(item.yhxtm)
      })
      this.$store.commit('setSelectRowData', xtmArray)
    },
    changePage (page) {
      this.current = page
      this.getDataList()
    },
    pageSizeChange (size) {
      this.pageSize = size
      this.getDataList()
    },
    clickSearch (content) {
      console.log('搜索的内容', content)
      if (content !== undefined && content !== null && content != '') {
        this.searchContent = content
        this.current = 1
        this.getDataList()
      }
    },
    refreshData () {
      alert('点击刷新按钮')
    },
    exportData () {
      alert('点击导出数据')
    },
    add () {
      alert('添加按钮')
    },
    currentRowData (data, index) {
      this.$store.commit('updateUserInfoAll', data)
      this.$store.commit({
        type: 'updateTab',
        tabName: 'userInfo'
      })
    }
  },
  computed: {
    getData () {
      return this.$store.state.userStore.userInfoArray
    }
  }
}
</script>

<style scoped>
  @import "user.less";
</style>
