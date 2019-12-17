<template>
  <div>
    <dev-header title="菜单管理界面" name="用于对菜单配置维护及查看权限维护等"/>
    <dev-content
      :columns="columns"
      :tableData="tableData"
      :loadingTable="loading"
      :total='total'
      @click-search="clickSearch"
      :pageSizeOpts="[5 , 10 , 30 , 50]"
      :pageSize="pageSize"
      @change-page="changePage"
      @toDetail="toDetail"
      @remove="remove"
      @remove-selections="removeSelections"
      @on-selection-change="selectChanged"
      @page-size-change="pageSizeChange"
      :current="current">

    </dev-content>

    <dev-footer/>
  </div>
</template>

<script>
import DevContent from '../../../my-components/DevTableContent'
import DevHeader from '../../../my-components/DevTableHeader'
import DevFooter from '../../../my-components/DevTableFooter'
import { getMenuList, removeMenuById, removeSelection } from '../../../api/routers'

export default {
  name: 'menuInfo',
  components: {
    DevContent,
    DevHeader,
    DevFooter
  },
  data () {
    return {
      columns: [
        {
          // 多选
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          minWidth: 100
        },
        {
          title: '地址',
          key: 'path',
          minWidth: 110
        },
        {
          title: '菜单级别',
          key: 'level',
          minWidth: 110
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tableData: [], // this.$store.state.userStoreTwo.userInfoArray,
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      selections: []
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList (pageNum) {
      this.loading = true
      if (pageNum) {
        this.current = pageNum
      }
      getMenuList(this.current, this.pageSize).then(res => {
        if (res.code === 200) {
          this.total = res.total
          // this.$store.commit('userStoreTwo/setUserInfoArray', res.data)
          this.tableData = res.data
        } else if (res.code === 500) {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          // this.$store.commit('userStoreTwo/setUserInfoArray', [])
          this.$Message.error(res.msg)
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    clickSearch (content) {
      if (content !== undefined && content !== null && content !== '') {
        this.current = 1
      }
      this.getDataList(1)
    },
    // 改变当前页
    changePage (page) {
      this.current = page
      this.getDataList()
    },
    toDetail (row, flag) {
      this.$router.push({
        name: 'menuDetail',
        params: {
          menuInfo: row,
          flag: flag
        }
      })
    },
    selectChanged (status) {
      console.log(status)
      this.selections = status
    },
    removeSelections (selections) {
      let xtmArray = []
      selections.map(item => {
        xtmArray.push(item.menuId)
      })
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认删除数据吗？',
        onOk: () => {
          removeSelection(xtmArray).then(res => {
            this.$Message.success(res.msg)
            this.clickSearch()
          }).catch(err => {

          })
        }
      })
    },

    remove (menuId, index) {
      removeMenuById(menuId).then(res => {
        if (res.code === 200 && res.data) {
          console.log(res)
          this.tableData.splice(index, 1)
        }
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    // 改变页大小
    pageSizeChange (size) {
      this.pageSize = size
      this.getDataList()
    }
  }

}

function getDateString () {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  return y + '-' + m + '-' + d
}
</script>

<style scoped>

</style>
