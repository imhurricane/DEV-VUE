<template>
    <div class="tourplan-sb">
        <div v-show="isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label" style="width: 60%">
                    当前设备名称：
                </label>
                <Input readonly
                       :value="getXmData.description"
                       class="my-content-item-input"/>
            </div>
        </div>
        <div v-show="!isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label">
                    巡检项目描述：
                </label>
                <Input
                        v-model="rowData.description"
                        type="textarea"
                        :rows="4"
                        placeholder="巡检项目描述"
                        class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查标准：
                </label>
                <Input
                        v-model="rowData.djbz"
                        type="textarea"
                        :rows="4"
                        placeholder="岗位名称"
                        class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    序号：
                </label>
                <Input
                        v-model="rowData.xh"
                        class="my-content-item-input"/>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    项目编码：
                </label>
                <Input v-model="rowData.xmbm"
                       placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    启停点：
                </label>
                <Select v-model="rowData.qtd" placement="top" placeholder="请选择"
                        class="my-content-item-input" clearable>
                    <Option v-for="tqd in tqdArray" :value="tqd.value">{{tqd.description}}</Option>
                </Select>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点类型：
                </label>
                <Select v-model="rowData.cdlx" placeholder="请选择"
                        class="my-content-item-input" clearable>
                    <Option v-for="cdType in cdTypeArray" :value="cdType.value">{{cdType.description}}</Option>
                </Select>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测量单位：
                </label>
                <Select v-model="rowData.cddw" placeholder="请选择"
                        class="my-content-item-input" clearable>
                    <Option v-for="cldw in clDwArray" :value="cldw.value">{{cldw.description}}</Option>
                </Select>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点结果值列表：
                </label>
                <Select v-model="rowData.cdjgzlb" placeholder="请选择"
                        class="my-content-item-input" clearable>
                    <!--                        <Option v-for="zy in zyArray" :value="zy.xtm">{{zy.description}}</Option>-->
                    <Option :value="1">部门</Option>
                    <Option :value="1">部门</Option>
                    <Option :value="1">部门</Option>
                    <Option :value="1">部门</Option>
                </Select>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    上限值：
                </label>
                <InputNumber :min="0" v-model="rowData.sxz" placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    下限值：
                </label>
                <InputNumber :min="0"   v-model="rowData.xxz" placeholder="岗位名称"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    振动类型：
                </label>
                <Select v-model="rowData.zdlx" placement="top" placeholder="请选择"
                        class="my-content-item-input" clearable>
                    <Option v-for="zd in zdArray" :value="zd.value">{{zd.description}}</Option>
                </Select>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    是否启用：
                </label>
                <div class="my-content-item-input">
                    <i-switch v-model="rowData.sfqy" true-value="1" false-value="0"  size="large">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </div>
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
                    :buttonArray="buttonArray"
                    @on-select-cancel="selectCancel"
                    @change-page="changePage"
                    @page-size-change="pageSizeChange"
                    @click-search="clickSearch"
                    @on-input-search="onInputSearch"
                    @addQy="addQy"
                    @searchColChange="searchColChange"
            />
        </div>
    </div>
</template>

<script>
import '@/util/util.css'
import TableUtil from '@/util/TableUtil'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getZyList } from '@/api/utilApi'
import { getList, addData, deleteData } from '@/api/tourmanagerApi'
export default {

  name: 'TourplanXm',
  data () {
    return {
      rowData: {},
      tqdArray: [],
      cdTypeArray: [],
      clDwArray: [],
      cdJgArray: [],
      zdArray: [],
      searchCol: [],
      searchCols: [],
      tableHeight: 'auto',
      buttonArray: [
        { method: 'addQy', content: '添加设备项目' }
      ],
      columns: [
        {
          title: '序号',
          key: 'xh'
        },
        {
          title: '巡检项目描述',
          key: 'description'
        },
        {
          title: '测点类型',
          key: 'cdlx'
        },
        {
          title: '是否启用',
          align: 'center',
          key: 'sfqy',
          render: (h, params) => {
            return h('span', params.row.sfqy === '0' ? '否' : '是')
          }
        },
        {
          title: 'Action',
          slot: 'action',
          align: 'center',
          width: 150,
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
              }, '修改'),
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
                    this.deleteData(params)
                  }
                }
              }, '删除')
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
    ...mapActions('tourplanStore', [
      'updateStoreAction'
    ]),
    ...mapMutations('tourplanStore', [
      'closeModalAndTab'
    ]),
    getZyList () {
      // 停起点
      getZyList(4).then(res => {
        console.log('---------停起点-----------', res)
        this.tqdArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 测点类型
      getZyList(5).then(res => {
        console.log('---------测点类型-----------', res)
        this.cdTypeArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 测量单位
      getZyList(6).then(res => {
        console.log('---------测量单位-----------', res)
        this.clDwArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 测点结果值列表
      getZyList(7).then(res => {
        console.log('---------测点结果值列表-----------', res)
        this.cdJgArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 振动类型
      getZyList(8).then(res => {
        console.log('---------振动类型-----------', res)
        this.zdArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    clickItem () {
      this.getDataList(1)
    },
    clickOk () {
      if (!this.isShowTable) {
        // 添加区域
        if (this.rowData) {
          addData(4, this.rowData, this.getXmData.xtm).then(res => {
            if (res.code === '200') {
              let msg = '操作成功'
              this.rowData = {}
              this.isShowTable = true
              this.$Message.success(msg)
              this.getDataList(1)
            } else {
              this.$Message.warning(res.msg)
            }
          }).catch(err => {
            this.$Message.error(this.MSGCONTENT.errMsg)
          })
        }
      } else {
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 4
        })
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检设备信息'
        })
      }
    },
    clickCancel () {
      if (!this.isShowTable) {
        this.isShowTable = true
        this.getDataList()
      } else {
        this.updateStoreAction({
          types: 'isAddOrUpdate',
          value: 4
        })
        this.updateStoreAction({
          types: 'modalTitle',
          value: '巡检设备信息'
        })
      }
      this.rowData = {}
      this.updateStoreAction({
        types: 'isShowModal',
        value: true
      })
      this.updateStoreAction({
        types: 'isTabsShow',
        value: true
      })
    },
    addQy () {
      this.isShowTable = false
      this.rowData = {}
    },
    getDataList (pageNum) {
      if (this.getXmData.xtm) {
        this.loading = true
        if (pageNum) {
          this.current = pageNum
        }
        getList(4, this.current, this.pageSize, this.searchContent, this.searchCols, this.getXmData.xtm).then(res => {
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
      console.log('修改之前', this.rowData)
      this.isShowTable = false
      this.rowData = params.row
      console.log('修改之后', this.rowData)
    },
    deleteData (params) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p>确认要删除吗?</p>',
        onOk: () => {
          deleteData(4, params.row.xtm).then(res => {
            if (res.code === '200') {
              let pageNum = this.current
              if (this.tableData.length === 1) {
                pageNum = 1
              }
              this.getDataList(pageNum)
            }
          }).catch(err => {
            this.$Message.error(this.MSGCONTENT.errMsg)
          })
        },
        onCancel: () => {

        }
      })
    }
  },
  computed: {
    ...mapGetters('tourplanStore', [
      'getXmData'
    ])
  },
  mounted () {
    this.getZyList()
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
        /*justify-content: center;*/
        flex-wrap: wrap;
        height: 100%;
    }

    .my-contentOne > div {
        width: 45%;
    }

    .my-content-item {
        margin-bottom: 10px;
    }

    .my-content-item-label {
        flex: 2;
    }
</style>
