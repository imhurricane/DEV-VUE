<template>
    <div class="tourplan-result">
        <div v-show="!isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label">
                    区域：
                </label>
                <Input min="0"
                       class="my-content-item-input"/>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查项目：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查人：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点结果：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    巡检时间：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备编码：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备状态：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    扫描区域：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    扫描区域时间：
                </label>
                <Input placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    是否异常点：
                </label>
                <div class="my-content-item-input">
                    <i-switch size="large">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </div>
            </div>

        </div>
        <table-util
                v-show="isShowTable"
                :searchCol="searchCol"
                :table-height="tableHeight"
                :columns="columns"
                :tableData="tableData"
                :loadingTable="loading"
                :total='total'
                :pageSizeOpts="[5 , 10 , 30 , 50]"
                :pageSize="pageSize"
                :current="current"
                :buttonArray=[]
                @change-page="changePage"
                @page-size-change="pageSizeChange"
                @click-search="clickSearch"
                @on-input-search="onInputSearch"
                @searchColChange="searchColChange"
        />
    </div>

</template>
<script>
import TableUtil from '@/util/TableUtil'
import { mapState, mapActions } from 'vuex'
import { getList } from '@/api/taskManagerApi'
export default {
  name: 'TourtaskError',
  components: { TableUtil },
  data () {
    return {
      isShowTable: true,
      searchCol: [],
      searchCols: [],
      tableData: [{ dlm: 1 }],

      tableHeight: 'auto',
      searchContent: '',
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: '区域',
          align: 'center',
          key: 'qyms'
        },
        {
          title: '设备',
          align: 'center',
          key: 'sbms'
        },
        {
          title: '设备状态',
          align: 'center',
          key: 'sbzt'
        },
        {
          title: '检查项目',
          align: 'center',
          key: 'xmms'
        },
        {
          title: '检查人',
          align: 'center',
          key: 'xjr'
        },
        {
          title: '巡检时间',
          align: 'center',
          key: 'date'
        }, {
          title: '测点结果',
          align: 'center',
          key: 'cdjg'
        }
        // {
        //     title: 'Action',
        //     slot: 'action',
        //     align: 'center',
        //     render: (h, params) => {
        //         return h('div', [
        //             h('Button', {
        //                 props: {
        //                     type: 'primary',
        //                     size: 'small'
        //                 },
        //                 style: {
        //                     marginRight: '5px'
        //                 },
        //                 on: {
        //                     click: () => {
        //                         this.show(params)
        //                     }
        //                 }
        //             }, '查看')
        //         ]);
        //     }
        // }
      ]
    }
  },
  methods: {
    ...mapActions('tourtaskStore', [
      'updateStoreAction'
    ]),
    ok () {
      if (this.isShowTable) {
        // 返回主页
        this.updateStoreAction({
          types: 'isShowModal',
          value: false
        })
        this.updateStoreAction({
          types: 'isTabsShow',
          value: false
        })
        this.updateStoreAction({
          types: 'tabsName',
          value: 'list'
        })
      } else {
        // 返回table
        this.isShowTable = true
        this.updateStoreAction({
          types: 'isShowModal',
          value: true
        })
        this.updateStoreAction({
          types: 'isTabsShow',
          value: true
        })
      }
    },
    // 点击取消
    cancel () {
      if (this.isShowTable) {
        // 返回主页
        this.updateStoreAction({
          types: 'tabsName',
          value: 'list'
        })
      } else {
        // 返回table
        this.isShowTable = true
        this.updateStoreAction({
          types: 'isShowModal',
          value: true
        })
        this.updateStoreAction({
          types: 'isTabsShow',
          value: true
        })
      }
    },

    show (params) {
      this.isShowTable = false
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
    onInputSearch (content) {
      this.searchContent = content
    },
    searchColChange (content) {
      this.searchCols = content
    },
    getDataList (pageNum) {
      if (this.goToData.xtm) {
        this.loading = true
        if (pageNum) {
          this.current = pageNum
        }
        getList(4, this.current, this.pageSize, this.searchContent, this.searchCols, this.goToData.xtm).then(res => {
          console.log(res)
          this.tableData = res.data
          this.searchCol = res.searchData
          this.total = res.total
        }).catch(err => {
          this.loading = false
          this.$Message.error(this.MSGCONTENT.errMsg)
        })
        this.loading = false
      }
    },
    close () {
      this.isShowTable = true
    }
  },
  computed: {
    ...mapState('tourtaskStore', ['goToData'])
  },
  mounted () {
    let tabListItem = document.getElementsByClassName('tab-list-item')
    console.log(tabListItem.length)
    for (let i = 0; i < tabListItem.length; i++) {
      tabListItem[i].style.maxHeight = window.innerHeight - 300 + 'px'
      tabListItem[i].style.minHeight = window.innerHeight - 320 + 'px'
    }
  }
}
</script>

<style scoped>
    .tourplan-result {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .my-contentOne {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        /*justify-content: center;*/
        flex-wrap: wrap;
        height: 100%;
    }

    .my-contentOne > div {
        width: 33%;
        margin-bottom: 10px;
    }

    .my-content-item {
        margin-bottom: 0px;
    }
</style>
