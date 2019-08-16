<template>
    <div>
        <MyTabHeaderAction
                name="用户配置"
                @addBut="addBut"
                @delBtn="delBtn"
        />
        <TableUtil
                :columns="columns"
                :searchCol="searchCol"
                :tableData="tableData"
                :loadingTable="loading"
                :total='total'
                :pageSizeOpts="[5 , 10 , 30 , 50]"
                :pageSize="pageSize"
                :current="current"
                :buttonArray=[]
                @table-selection-change="selectionRow"
                @change-page="changePage"
                @page-size-change="pageSizeChange"
                @click-search="clickSearch"
                @on-input-search="onInputSearch"
                @searchColChange="searchColChange"
        />
        <my-modal
                :is-show-modal="isShowModal"
                :modal-loading="modalLoading"
                modal-title='用户信息'
                @on-ok="ok"
                @on-cancel="cancel"
                @on-largen="modelLargen"
        >
            <div style="height: 100%" slot="modalContent" v-show="isTabsShow">
                <MyTabs @on-click-tab="clickTab"
                        :tabs-name="tabsName"
                        :tabs-array="tabsArray">
                    <div class="tab-list-item" slot="ListName">
                        <UserInfo ref="myUserInfo"/>
                    </div>
                </MyTabs>
            </div>
        </my-modal>
    </div>
</template>
<script>
import { getUserList, deletUsers, addUser, updateUser, getDeptInfo, detail } from '@/api/userInfoConfig'
import TableUtil from '@/util/TableUtil'
import MyTabs from '@/util/MyTabs'
import UserInfo from './components/UserInfo'
import MyTabHeaderAction from '@/util/MyTabHeaderAction'
import MyModal from '@/util/MyModal'
export default {
  name: 'UserMap',
  components: { MyModal, MyTabHeaderAction, UserInfo, MyTabs, TableUtil },
  data () {
    return {
      selectionRowArray: [], // 选中要删除的行
      searchContent: '',
      searchCol: [],
      searchCols: '',
      current: 1,
      pageSize: 10,
      total: 0,
      modalWidth: window.innerWidth - 360,
      loading: false,
      tabsName: 'list',
      isTabsShow: false,
      modalLoading: false,
      isShowModal: false,
      isAddData: false,
      columns: [
        {
          // 多选
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'dlm',
          minWidth: 100
        },
        {
          title: '姓名',
          key: 'description',
          minWidth: 110
        },
        {
          title: '部门',
          key: 'bm',
          minWidth: 100
        },
        {
          title: '班组',
          key: 'address',
          minWidth: 100
        },
        {
          title: '创建日期',
          key: 'reportdate',
          minWidth: 150
        },
        {
          title: '操作',
          minWidth: 100,
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params)
                  }
                }
              }, '修改')
            ])
          }
        }
      ],

      tableData: this.$store.state.userStoreTwo.userInfoArray,
      tabsArray: [
        { name: 'list', label: '详情', moduleName: 'ListName' }
      ]
    }
  },
  // 页面初始化完成
  mounted () {
    this.getDataList()
    // let tabListItem = document.getElementsByClassName('tab-list-item');
    // for (let i = 0; i < tabListItem.length; i++) {
    //     tabListItem[i].style.maxHeight = window.innerHeight - 300 + 'px'
    // }
    getDeptInfo().then(res => {
      console.log(res)
      if (res.code === '200') {
        this.$store.commit('userStoreTwo/setSiteDataArray', res.addressDataArray)
        this.$store.commit('userStoreTwo/setOrgDataArray', res.jsDataArray)
      } else if (res.code === '500') {
        this.$Message.error(this.MSGCONTENT.xtErrMsg)
      } else {
        this.$Message.error(res.msg)
      }
    }).catch(err => {
      console.log(err)
      this.$Message.error(this.MSGCONTENT.errMsg)
    })
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
      getUserList(this.current, this.pageSize, this.searchContent, this.searchCols).then(res => {
        console.log(res)
        if (res.code === '200') {
          this.total = res.totalCount
          this.$store.commit('userStoreTwo/setUserInfoArray', res.data)
          this.tableData = res.data
        } else if (res.code === '500') {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          this.$store.commit('userStoreTwo/setUserInfoArray', [])
          this.$Message.error(res.msg)
        }
        this.searchCol = res.searchCol
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    // 放大模态框
    modelLargen (fullscreen) {
      // let tabListItem = document.getElementsByClassName('tab-list-item');
      // if (fullscreen) {
      //     for (let i = 0; i < tabListItem.length; i++) {
      //         tabListItem[i].removeAttribute('style');
      //     }
      // } else {
      //     for (let i = 0; i < tabListItem.length; i++) {
      //         tabListItem[i].style.maxHeight = window.innerHeight - 300 + 'px'
      //     }
      // }
    },
    // 点击修改
    show (rowData) {
      detail(rowData.row.yhxtm).then(res => {
        console.log('点击修改之后得信息', res)
        console.log('点击修改之后得部门信息', res.dept)
        if (res.code === '200') {
          // if (res.data.dept){
          //     res.data.dept = [res.data.dept]
          // } else{
          //     res.data.dept = ['000000000000']
          // }
          console.log('点击修改之后得部门信息', res.dept.length)
          if (res.dept) {
            res.data.dept = [...res.dept.split(',').reverse()]
          } else {
            res.data.dept = undefined
          }
          console.log('点击修改之后得信息', res.data)
          this.$store.commit('userStoreTwo/setRowData', res.data)
          this.openModalAndTab()
          this.$refs.myUserInfo.getMyUserInfoLeft(res.data.site)

          this.tabsName = 'list'
          this.isAddData = false
        } else if (res.code === '500') {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    ok () {
      console.log('要保存的数据', this.$store.state.userStoreTwo.rowData)
      console.log('要保存的数据', this.isAddData)
      console.log('要保存的数据', this.modalLoading)

      this.modalLoading = true
      if (this.isAddData) {
        addUser(this.$store.state.userStoreTwo.rowData).then(res => {
          console.log(res)
          if (res.code === '200') {
            this.getDataList(this.current)
            this.closeModalAndTab()
          } else if (res.code === '500') {
            this.modalLoading = false
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          } else {
            this.modalLoading = false
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.modalLoading = false
          this.$Message.error(this.MSGCONTENT.errMsg)
        })
      } else {
        this.modalLoading = false
        updateUser(this.$store.state.userStoreTwo.rowData).then(res => {
          console.log(res)
          if (res.code === '200') {
            this.$Message.success('修改成功')
            this.getDataList(this.current)
            this.closeModalAndTab()
          } else if (res.code === '500') {
            this.modalLoading = false
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          } else {
            this.modalLoading = false
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.modalLoading = false
          this.$Message.error(this.MSGCONTENT.errMsg)
        })
      }
    },
    // 点击取消
    cancel () {
      this.closeModalAndTab()
      // this.getDataList(this.current)
    },
    addBut () {
      this.openModalAndTab()
      this.isAddData = true
      this.$store.commit('userStoreTwo/setRowData', {})
    },
    delBtn () {
      if (this.selectionRowArray.length == 0) {
        this.$Modal.error({
          title: '温馨提示',
          content: '请选择要删除的行'
        })
        return
      }
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认要删除吗???',
        onOk: () => {
          deletUsers(this.selectionRowArray).then(res => {
            if (res.code === '200') {
              let pageNum = null
              if (this.selectionRowArray.length === this.$store.state.userStoreTwo.userInfoArray.length) {
                pageNum = 1
              }
              this.$Message.success(res.msg)
              this.getDataList(pageNum)
            } else {
              this.$Message.warning(res.msg)
            }
          }).catch(err => {
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          })
        }
      })
    },
    selectionRow (rows) {
      let xtmArray = []
      rows.map(item => {
        xtmArray.push(item.yhxtm)
      })
      this.selectionRowArray = xtmArray
    },
    clickTab (name) {
      this.tabsName = name
    },
    // 改变当前页
    changePage (page) {
      this.current = page
      this.getDataList()
    },
    // 改变页大小
    pageSizeChange (size) {
      this.pageSize = size
      this.getDataList()
    },
    clickSearch (content) {
      console.log('搜索的内容', content)
      if (content !== undefined && content !== null && content !== '') {
        this.current = 1
      }
      this.getDataList()
    },
    onInputSearch (content) {
      this.searchContent = content
    },
    searchColChange (content) {
      this.searchCols = content
    },
    // 打开modal tab
    openModalAndTab () {
      this.isShowModal = true
      this.isTabsShow = true
    },
    // 关闭modal tab
    closeModalAndTab () {
      this.isShowModal = false
      this.modalLoading = false
      setTimeout(() => {
        this.isTabsShow = false
      }, 500)
    }
  }
}
</script>
<style scoped>

</style>
