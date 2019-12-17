<template>
  <div>
    <dev-header title="用户管理界面" name="用于对用户的信息维护及查看等"/>
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
      @page-size-change="pageSizeChange"
      :current="current">

    </dev-content>

    <dev-footer/>
  </div>
</template>

<script>

import '../user-info/user.less'
import DevContent from '../../../my-components/DevTableContent'
import DevHeader from '../../../my-components/DevTableHeader'
import DevFooter from '../../../my-components/DevTableFooter'
import { deleteUsers, getUserList } from '../../../api/userInfoConfig'

export default {
  name: 'userInfo',
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
          title: '用户名',
          key: 'userLoginName',
          minWidth: 100
        },
        {
          title: '姓名',
          key: 'userNameCh',
          minWidth: 110
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tableData: this.$store.state.userStoreTwo.userInfoArray,
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false
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
      getUserList(this.current, this.pageSize).then(res => {
        console.log('res', res)
        if (res.code === 200) {
          this.total = res.total
          this.$store.commit('userStoreTwo/setUserInfoArray', res.data)
          this.tableData = res.data
        } else if (res.code === 500) {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          this.$store.commit('userStoreTwo/setUserInfoArray', [])
          this.$Message.error(res.msg)
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    clickSearch (content) {
      console.log('搜索的内容', content)
      if (content !== undefined && content !== null && content !== '') {
        this.current = 1
      }
      this.getDataList()
    },
    // 改变当前页
    changePage (page) {
      this.current = page
      this.getDataList()
    },
    toDetail (row, flag) {
      this.$router.push({
        name: 'userDetail',
        params: { userInfo: row, flag: flag }
      })
    },
    removeSelections (selections) {
      let xtmArray = []
      selections.map(item => {
        xtmArray.push(item.userId)
      })
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认删除数据吗？',
        onOk: () => {
          deleteUsers(xtmArray).then(res => {
            this.$Message.success(res.msg)
            this.clickSearch()
          }).catch(err => {

          })
        }
      })
    },
    remove (index) {
      this.tableData.splice(index, 1)
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
