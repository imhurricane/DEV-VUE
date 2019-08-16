<template>
    <div style="min-width: 1024px">
        <MyTabHeaderAction
                :thActionBtns="thActionBtns"
                name="巡检任务"
                @delBtn="delBtn"
        />
        <TableUtil
                :searchCol="searchCol"
                :columns="columns"
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
                :modal-title='modalTitle'
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <div slot="modalContent" v-show="isTabsShow">
                <MyTabs @on-click-tab="clickTab"
                        :tabs-name="tabsName"
                        :tabs-array="tabsArray">
                    <div class="tab-list-item" slot="ListName">
                        <tourtask-info ref="myTourplanInfo"/>
                    </div>
                    <div class="tab-list-item" slot="jgName">
                        <tourtask-result ref="myTourtaskResult"/>
                    </div>
                    <div class="tab-list-item" slot="ycdName">
                        <tourtask-error ref="myTourtaskError"/>
                    </div>
                    <div class="tab-list-item" slot="gldName">
                        <tourtask-filter ref="myTourtaskFilter"/>
                    </div>
                    <div class="tab-list-item" slot="ljdName">
                        <tourtask-lose ref="myTourtaskLose"/>
                    </div>
                </MyTabs>
            </div>
        </my-modal>
    </div>
</template>
<script>

import MyModal from '@/util/MyModal'
import MyTabHeaderAction from '@/util/MyTabHeaderAction'
import MyTabs from '@/util/MyTabs'
import TableUtil from '@/util/TableUtil'
import { mapState, mapActions, mapMutations } from 'vuex'
import { getList } from '@/api/taskManagerApi'
import TourtaskInfo from './components/tourtask/TourtaskInfo'
import TourtaskResult from './components/tourtask/TourtaskResult'
import TourtaskError from './components/tourtask/TourtaskError'
import TourtaskFilter from './components/tourtask/TourtaskFilter'
import TourtaskLose from './components/tourtask/TourtaskLose'

export default {
  name: 'tourtask',
  components: {
    TourtaskLose,
    TourtaskFilter,
    TourtaskError,
    TourtaskResult,
    TourtaskInfo,
    MyModal,
    MyTabHeaderAction,
    MyTabs,
    TableUtil },
  data () {
    return {
      thActionBtns: [
        // {method: 'addBut', iconName: 'ios-create', content: '新增'},
        { method: 'delBtn', iconName: 'md-trash', content: '删除' }
      ],
      selectionRowArray: [], // 选中要删除的行
      searchContent: '',
      current: 1,
      pageSize: 10,
      total: 0,
      modalWidth: window.innerWidth - 360,
      loading: false,
      columns: [
        {
          // 多选
          type: 'selection',
          align: 'center'
        },
        {
          title: '编号',
          align: 'center',
          key: 'rwbh'
        },
        {
          title: '任务名称',
          align: 'center',
          width: 170,
          key: 'description'
        },
        {
          title: '专业',
          align: 'center',
          key: 'zy'
        },
        {
          title: '实际开始时间',
          width: 110,
          align: 'center',
          key: 'sjkssj'
        },
        {
          title: '实际完成时间',
          width: 110,
          align: 'center',
          key: 'sjwcsj'
        },

        {
          width: 90,
          title: '应到区域',
          align: 'center',
          key: 'ydqy'
        },
        {
          title: '状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '检查人',
          width: 100,
          align: 'center',
          key: 'jcr'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 170,
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
              }, '查看信息'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {},
                on: {
                  click: () => {
                    this.qvShow(params)
                  }
                }
              }, '巡检区域')
            ])
          }
        }
      ],
      searchCol: [],
      searchCols: [],
      tableData: []
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    ...mapActions('tourtaskStore', [
      'updateStoreAction'
    ]),
    ...mapMutations('tourtaskStore', [
      'openModalAndTab',
      'closeModalAndTab'
    ]),
    /**
             * 获取数据
             */
    getDataList (pageNum) {
      this.loading = true
      if (pageNum) {
        this.current = pageNum
      }

      getList(1, this.current, this.pageSize, this.searchContent, this.searchCols).then(res => {
        this.tableData = res.data
        this.searchCol = res.searchData
        this.total = res.total
        console.log('fasdfasdfasd', res)
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      this.loading = false
    },
    // 点击修改
    show (rowData) {
      this.updateStoreAction({
        types: 'isAddOrUpdate',
        value: 2
      })
      this.updateStoreAction({
        types: 'tabsArray',
        value: [
          { name: 'list', label: '详情', moduleName: 'ListName' },
          { name: 'jg', label: '检查结果', moduleName: 'jgName' },
          { name: 'ycd', label: '异常点', moduleName: 'ycdName' },
          { name: 'gld', label: '过滤点', moduleName: 'gldName' },
          { name: 'ljd', label: '漏检点', moduleName: 'ljdName' }
        ]
      })

      this.updateStoreAction({
        types: 'goToData',
        value: rowData.row
      })
      this.openModalAndTabMe()
    },
    // 点击区域
    qvShow (rowData) {
      this.updateStoreAction({
        types: 'isAddOrUpdate',
        value: 3
      })
      this.updateStoreAction({
        types: 'goToData',
        value: rowData.row
      })
      this.openModalAndTabMe()
      this.$refs.myTourplanInfo.goto()
      this.updateStoreAction({
        types: 'tabsArray',
        value: [
          { name: 'list', label: '详情', moduleName: 'ListName' }
        ]
      })
    },
    ok () {
      this.updateStoreAction({
        types: 'modalLoading',
        value: true
      })
      this.updateStoreAction({
        types: 'modalLoading',
        value: false
      })
      if (this.isAddOrUpdate === 2) {
        if (this.tabsName === 'list') {
          this.closeModalAndTabMe()
        } else if (this.tabsName === 'jg') {
          this.$refs.myTourtaskResult.ok()
        } else if (this.tabsName === 'ycd') {
          this.$refs.myTourtaskError.ok()
        } else if (this.tabsName === 'gld') {
          this.$refs.myTourtaskFilter.ok()
        } else if (this.tabsName === 'ljd') {
          this.$refs.myTourtaskLose.ok()
        }
      } else {
        this.$refs.myTourplanInfo.clickOk()
      }
    },
    // 点击取消
    cancel () {
      this.closeModalAndTabMe()
      if (this.isAddOrUpdate === 2) {
        if (this.tabsName === 'jg') {
          this.$refs.myTourtaskResult.cancel()
        } else if (this.tabsName === 'ycd') {
          this.$refs.myTourtaskError.cancel()
        } else if (this.tabsName === 'gld') {
          this.$refs.myTourtaskFilter.cancel()
        } else if (this.tabsName === 'ljd') {
          this.$refs.myTourtaskLose.cancel()
        }
      } else {
        this.$refs.myTourplanInfo.clickCancel()
      }
    },

    delBtn () {
      if (this.selectionRowArray.length === 0) {
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
          // deleteData(this.selectionRowArray).then(res => {
          //     if (res.code === '200') {
          //         let pageNum = null;
          //         if (this.selectionRowArray.length === this.$store.state.userStoreTwo.userInfoArray.length) {
          //             pageNum = 1;
          //         }
          //         this.selectionRowArray = [];
          //         this.$Message.success(res.msg);
          //         this.getDataList(pageNum);
          //     } else {
          //         this.getDataList(this.current);
          //         this.$Message.warning(res.msg);
          //     }
          // }).catch(err => {
          //     alert('fasdf');
          //     this.$Message.error(this.MSGCONTENT.xtErrMsg);
          // })
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
      if (name !== this.tabsName) {
        this.updateStoreAction({
          types: 'tabsName',
          value: name
        })
        if (name === 'jg') {
          this.$refs.myTourtaskResult.getDataList()
        } else if (name === 'ycd') {
          this.$refs.myTourtaskError.getDataList()
        } else if (name === 'gld') {
          this.$refs.myTourtaskFilter.getDataList()
        } else if (name === 'ljd') {
          this.$refs.myTourtaskLose.getDataList()
        }
        this.$refs.myTourtaskResult.close()
        this.$refs.myTourtaskError.close()
        this.$refs.myTourtaskFilter.close()
        this.$refs.myTourtaskLose.close()
      }
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
        this.getDataList()
      }
    },
    searchColChange (content) {
      this.searchCols = content
    },
    onInputSearch (content) {
      this.searchContent = content
    },
    // 打开modal tab
    openModalAndTabMe () {
      this.openModalAndTab()
      // this.isShowModal = true
    },
    // 关闭modal tab
    closeModalAndTabMe () {
      this.closeModalAndTab()
      // setTimeout ( () =>  {
      //     this.isTabsShow = false
      // },300)
    }
  },
  computed: {
    ...mapState('tourtaskStore', [
      'isAddOrUpdate',
      'modalLoading',
      'isShowModal',
      'isTabsShow',
      'modalTitle',
      'tabsArray',
      'tabsName'
    ])
  }
}
</script>
