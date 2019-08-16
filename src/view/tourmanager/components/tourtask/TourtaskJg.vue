<template>
    <div class="tourplan-sb">
        <div v-show="isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label" style="width: 60%">
                    当前项目名称：
                </label>
                <Input readonly
                       :value="getXmData.description"
                       class="my-content-item-input"/>
            </div>
        </div>
        <div v-show="!isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label">
                    区域：
                </label>
                <Input :value="rowData.qyms" disabled min="0"
                       class="my-content-item-input" />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查人：
                </label>
                <Input :value="rowData.xjr" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label  class="my-content-item-label">
                    设备：
                </label>
                <Input :value="rowData.sbms" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点结果：
                </label>
                <Input :value="rowData.cdjg" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查项目：
                </label>
                <Input :value="rowData.xmms" disabled
                       class="my-content-item-input"
                />
            </div>

            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备状态：
                </label>
                <Input :value="rowData.sbzt" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    扫描区域：
                </label>
                <Input :value="rowData.smqyms" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备编码：
                </label>
                <Input :value="rowData.equipment_code" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    巡检时间：
                </label>
                <Input :value="rowData.date" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    扫描区域时间：
                </label>
                <Input :value="rowData.smsj" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    联系人：
                </label>
                <Input :value="rowData.lxr" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    联系专业：
                </label>
                <Input  :value="rowData.lxzy" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    是否异常点：
                </label>
                <Input :value="rowData.sfycd === '0' ? '否' : '是'" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    缺陷登记：
                </label>
                <Input :value="rowData.isqx === '0' ? '否' : '是'" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    缺陷等级：
                </label>
                <Input :value="rowData.qxdj" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    备注：
                </label>
                <Input :value="rowData.qxms" disabled
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
import { getList } from '@/api/taskManagerApi'
export default {

  name: 'TourtaskJg',
  data () {
    return {
      rowData: [],
      searchCol: [],
      searchCols: [],
      tableHeight: 'auto',
      columns: [
        {
          title: '序号',
          key: 'xh'
        },
        {
          title: '区域',
          key: 'qyms'
        },
        {
          title: '设备',
          key: 'sbms'
        },
        {
          title: '检查项目',
          key: 'xmms'
        },
        {
          title: '检查人',
          key: 'xjr'
        },
        {
          title: '测点结果',
          key: 'cdjg'
        },
        {
          title: '是否异常点',
          key: 'sfycd',
          render: (h, params) => {
            return h('span', params.row.sfycd === '0' ? '否' : '是')
          }
        },
        {
          title: '缺陷登记',
          key: 'isqx',
          render: (h, params) => {
            return h('span', params.row.isqx === '0' ? '否' : '是')
          }
        },
        {
          title: 'Action',
          slot: 'action',
          align: 'center',
          width: 180,
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
              }, '查看')
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
    clickOk () {
      if (!this.isShowTable) {
        this.$Message.success('添加结果成功')
        this.isShowTable = true
      } else {
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 5
        })
        this.isShowTable = true
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检任务项目信息'
        })
      }
    },
    clickCancel () {
      if (!this.isShowTable) {
        this.isShowTable = true
      } else {
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 5
        })
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检任务项目信息'
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
      if (this.getXmData.xtm) {
        this.loading = true
        if (pageNum) {
          this.current = pageNum
        }
        getList(2, this.current, this.pageSize, this.searchContent, this.searchCols, this.getXmData.xtm).then(res => {
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
      'getXmData'
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
    .my-content-item-label{
        flex: 2;
    }
</style>
