<template>
    <div>
        <MyTabHeaderAction
                name="岗位管理"
                @addBut="addBut"
                @delBtn="delBtn"
        />
        <TableUtil
                :searchCol="searchCol"
                :columns="columns"
                :tableData="getTableData"
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
                modal-title='岗位管理信息'
                @on-ok="ok"
                @on-cancel="cancel"
                @on-largen="modelLargen"
        >
            <div style="height: 100%" slot="modalContent" v-show="isTabsShow">
                    <MyTabs style="height: 100%;" @on-click-tab="clickTab"
                        :tabs-name="tabsName"
                        :tabs-array="tabsArray">
                    <div class="tab-list-item" slot="ListName">
                        <PostInfo
                                @selectUser = 'selectUser'
                                @on-add-person="addPersonnel"
                                ref="myPostInfo"
                                :zy-array="zyArray"/>
                    </div>
                </MyTabs>
            </div>
        </my-modal>
    </div>
</template>

<script>
import TableUtil from '@/util/TableUtil'
import MyTabs from '@/util/MyTabs'
import MyTabHeaderAction from '@/util/MyTabHeaderAction'
import MyModal from '@/util/MyModal'
import PostInfo from './components/PostInfo'
import { getList, addData, updateData, deleteData } from '@/api/postSettingApi'
import { mapMutations } from 'vuex'
export default {
  name: 'PostSetting',
  components: { MyModal, MyTabHeaderAction, MyTabs, TableUtil, PostInfo },
  data () {
    return {
      searchCol: [],
      searchCols: '',
      selectionRowArray: [], // 选中要删除的行
      searchContent: '',
      current: 1,
      pageSize: 10,
      total: 0,
      modalWidth: window.innerWidth - 360,
      tableLoading: false,
      saveOrDelBtnData: true,
      isTabsShow: false,
      modalLoading: false,
      isShowModal: false,
      tabsName: 'list',
      isAddData: false,
      selectUserArray: [],
      columns: [
        {
          // 多选
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '编号',
          minWidth: 80,
          align: 'center',
          key: 'num'
        },
        {
          title: '岗位名称',
          minWidth: 130,
          align: 'center',
          key: 'description'
        },
        {
          title: '创建人',
          minWidth: 100,
          align: 'center',
          key: 'user_name'
        },
        {
          title: '创建时间',
          minWidth: 120,
          align: 'center',
          key: 'reportdate'
        },
        {
          title: '操作',
          minWidth: 60,
          align: 'center',
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
      tabsArray: [
        { name: 'list', label: '岗位信息', moduleName: 'ListName' }
      ],
      zyArray: [],
      isAddPersonnel: false

    }
  },
  mounted () {
    // 页面初始化
    this.getDataList(this.current)
    // let tabListItem = document.getElementsByClassName('tab-list-item');
    // for (let i = 0; i < tabListItem.length; i++) {
    //     tabListItem[i].style.height = window.innerHeight - 350 + 'px'
    // }
  },
  methods: {
    ...mapMutations('publicTableStore', [
      'setUpdateStore'
    ]),
    addPersonnel (bool) {
      // 添加添加人员
      this.isAddPersonnel = bool
    },
    selectUser (selection) {
      this.selectUserArray = selection
      console.log(this.selectUserArray)
    },
    /**
             * 获取数据
             */
    getDataList (pageNum) {
      this.loading = true
      if (pageNum) {
        this.current = pageNum
      }
      getList(this.current, this.pageSize, this.searchContent, this.searchCols).then(res => {
        if (res.code === '200') {
          this.total = res.totalCount
          this.$store.commit('publicTableStore/setUpdateStore', {
            types: 'TableDataArray',
            value: res.data
          })
          // this.tableData = res.data
          console.log('专业................', res.zyDictionay)
          this.zyArray = res.zyDictionay
          this.searchCol = res.searchCol
        } else if (res.code === '500') {
          this.$Message.error(this.MSGCONTENT.xtErrMsg)
        } else {
          this.$store.commit('publicTableStore/setUpdateStore', {
            types: 'TableDataArray',
            value: []
          })
          if (res.zyDictionay) {
            this.zyArray = res.zyDictionay
          }
          this.$Message.error(res.msg)
        }
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
      //         tabListItem[i].style.height = window.innerHeight - 200   + 'px'
      //     }
      // } else {
      //     for (let i = 0; i < tabListItem.length; i++) {
      //         tabListItem[i].style.height = window.innerHeight - 300 + 'px'
      //     }
      // }
    },
    // 点击修改
    show (rowData) {
      this.isAddData = false
      let objCopy = Object.assign({}, rowData.row)
      this.$store.commit('publicTableStore/setUpdateStore', {
        types: 'rowData',
        value: objCopy
      })
      this.$refs.myPostInfo.getDepartmentPerson(rowData.row.xtm)
      this.openModalAndTab()
    },
    ok () {
      console.log('要添加的数据', this.$store.state.publicTableStore.TableTwoDataArray)
      if (this.isAddPersonnel) {
        // 添加人员
        this.$refs.myPostInfo.clean()
        this.isShowModal = true
        this.isAddPersonnel = false
        if (this.selectUserArray.length > 0) {
          let selectUserArray = []
          selectUserArray.push(...this.selectUserArray)
          selectUserArray.push(...this.$store.state.publicTableStore.TableTwoDataArray)
          this.setUpdateStore({
            types: 'TableTwoDataArray',
            value: selectUserArray
          })
        }
      } else {
        this.modalLoading = true
        if (this.isAddData) {
          addData(this.$store.state.publicTableStore.rowData, this.$store.state.publicTableStore.TableTwoDataArray).then(res => {
            console.log(res)
            if (res.code === '200') {
              this.getDataList(this.current)
              this.closeModalAndTab()
              this.clean()
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
          updateData(this.$store.state.publicTableStore.rowData, this.$store.state.publicTableStore.TableTwoDataArray).then(res => {
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
        this.$refs.myPostInfo.okClean()
      }
    },
    // 点击取消
    cancel () {
      if (this.isAddPersonnel) {
        this.$refs.myPostInfo.clean()
        this.isShowModal = true
        this.isAddPersonnel = false
      } else {
        setTimeout(() => {
          this.$refs.myPostInfo.clean()
          this.$refs.myPostInfo.okClean()
        }, 500)
        this.closeModalAndTab()
      }

      // this.getDataList(this.current)
    },
    addBut () {
      this.clean()
      this.$refs.myPostInfo.clean()
      this.openModalAndTab()
      this.isAddData = true
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
          console.log('fasdfasdfasdfasdfasdf', this.selectionRowArray)
          deleteData(this.selectionRowArray).then(res => {
            if (res.code === '200') {
              let pageNum = null
              if (this.selectionRowArray.length === this.$store.state.userStoreTwo.userInfoArray.length) {
                pageNum = 1
              }
              this.selectionRowArray = []
              this.$Message.success(res.msg)
              this.getDataList(pageNum)
            } else {
              this.getDataList(this.current)
              this.$Message.warning(res.msg)
            }
          }).catch(err => {
            alert('fasdf')
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          })
        }
      })
    },
    selectionRow (rows) {
      console.log(rows)
      let xtmArray = []
      rows.map(item => {
        xtmArray.push(item.xtm)
      })
      this.selectionRowArray = xtmArray
    },
    clickTab (name) {
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
      // if (content !== undefined && content !== null && content !== '') {
      //     this.current = 1;
      //     this.getDataList();
      // }
      this.current = 1
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
    },
    clean () {
      this.$store.commit('publicTableStore/setUpdateStore', {
        types: 'rowData',
        value: {}
      })
      this.setUpdateStore({
        types: 'TableTwoDataArray',
        value: []
      })
    }
  },
  computed: {
    getTableData () {
      return this.$store.getters['publicTableStore/getTableDataArray']
    }
  }
}
</script>

<style scoped>

</style>
