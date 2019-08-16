<template>
    <div class="tourplan-sb">
        <div v-show="isShowTable" class="my-contentOne">
            <div class="my-content-item" style="width: 60%">
                <label style="width: 40%" class="my-content-item-label">
                    当前区域名称：
                </label>
                <Input readonly
                       :value="getSbData.description"
                       class="my-content-item-input"/>
            </div>
        </div>
        <div v-show="!isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label">
                    序号：
                </label>
                <Input disabled
                       class="my-content-item-input" v-model="rowData.xh"/>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备名称：
                </label>
                <Input disabled
                       v-model="rowData.description"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备状态：
                </label>
                <Input disabled
                       v-model="rowData.sbzt"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    KKS编码：
                </label>
                <Input disabled
                       v-model="rowData.kks"
                       class="my-content-item-input"
                />
            </div>

        </div>
        <div v-show="isShowTable" class="my-content">
            <TableUtil
                    :searchCol="searchCol"
                    :tableHeight="tableHeight"
                    :columns="columns"
                    :table-data="tableData"
                    :total='total'
                    :pageSizeOpts="pageSizeOpts"
                    :pageSize="pageSize"
                    :current="current"
                    @on-select-cancel="selectCancel"
                    @change-page="changePage"
                    @page-size-change="pageSizeChange"
                    @click-search="clickSearch"
                    @on-input-search="onInputSearch"
                    @searchColChange="searchColChange"
            />
        </div>
    </div>
</template>

<script>
import '@/util/util.css'
import TableUtil from '@/util/TableUtil'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getList } from '@/api/tourmanagerApi'
export default {

  name: 'TourtaskSb',
  data () {
    return {
      rowData: {},
      searchCol: [],
      searchCols: [],
      tableHeight: 'auto',
      columns: [
        {
          title: '序号',
          key: 'xh'
        },
        {
          title: '设备名称',
          key: 'description'
        },
        {
          title: '设备编码',
          key: 'description'
        },
        {
          title: 'KKS编码',
          key: 'kks'
        },
        {
          title: 'Action',
          slot: 'action',
          align: 'center',
          width: 200,
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
                    this.updateData(params)
                  }
                }
              }, '查看'),
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
                    this.goProject(params)
                  }
                }
              }, '设备项目')

            ])
          }
        }
      ],
      tableData: [
        { num: '1', name: '区域1' },
        { num: '2', name: '区域2' },
        { num: '3', name: '区域3' }
      ],
      pageSizeOpts: [5, 10, 30, 50],
      current: 1,
      pageSize: 5,
      total: 0,
      isShowTable: true
    }
  },
  components: { TableUtil },
  methods: {
    ...mapActions('tourtaskStore', [
      'updateStoreAction'
    ]),
    ...mapMutations('tourtaskStore', [
      'closeModalAndTab'
    ]),
    clickItem () {
      this.getDataList(1)
    },
    goProject (rowData) {
      this.updateStoreAction({
        types: 'isAddOrUpdate',
        value: 5
      })
      this.updateStoreAction({
        types: 'goToXmData',
        value: rowData.row
      })
      this.updateStoreAction({
        types: 'modalTitle',
        value: '巡检任务项目信息'
      })
      this.$emit('togoXm')
      this.isShowTable = true
    },
    clickOk () {
      if (!this.isShowTable) {
        // 添加区域
        // if (this.rowData){
        //     this.tableData.push(this.rowData);
        // }
        this.$Message.success('添加设备成功', this.isShowTable)
        this.isShowTable = true
      } else {
        // 返回上一层
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 3
        })
        this.isShowTable = true
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检任务区域信息'
        })
      }
    },
    clickCancel () {
      if (!this.isShowTable) {
        this.isShowTable = true
      } else {
        // 返回上一层
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 3
        })
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检任务区域信息'
        })
      }
      this.updateStoreAction({
        types: 'isShowModal',
        value: true
      })
      this.updateStoreAction({
        types: 'isTabsShow',
        value: true
      })
    },
    getDataList (pageNum) {
      if (this.getSbData.xtm) {
        this.loading = true
        if (pageNum) {
          this.current = pageNum
        }
        console.log('fasdfasdfasdf', this.getSbData)
        getList(3, this.current, this.pageSize, this.searchContent, this.searchCols, this.getSbData.xtm).then(res => {
          this.tableData = res.data
          this.searchCol = res.searchData
          this.total = res.total
          console.log('fasdfasdfasd', res)
        }).catch(err => {
          this.loading = false
          this.$Message.error(this.MSGCONTENT.errMsg)
        })
        this.loading = false
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
      }
      this.getDataList()
    },
    onInputSearch (content) {
      this.searchContent = content
    },
    searchColChange (content) {
      this.searchCols = content
    },
    selectCancel (selection, row) {
    },
    updateData (params) {
      this.isShowTable = false
      this.rowData = params.row
    }
  },
  computed: {
    ...mapGetters('tourtaskStore', [
      'getSbData'
    ])
  }
}
</script>

<style scoped>
    .tourplan-sb {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .my-contentOne {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        height: 100%;
    }

    .my-contentOne > div {
        width: 45%;
    }
    .my-content-item{
        margin-bottom: 10px;
    }

</style>
