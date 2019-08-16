<template>
    <Card shadow style="height: 100%;width: 100%;overflow:hidden">
        <div class="department-outer">
            <div class="zoom-box">
                <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
            </div>
            <!--            <div class="zoom-btn">-->
            <!--                <ButtonGroup>-->
            <!--                    <Button :type="isExpand ? 'primary' : ''" @click="()=>{ this.isExpand =  true}">展开全部</Button>-->
            <!--                    <Button :type="!isExpand ? 'primary' : ''" @click="()=>{ this.isExpand =  false}">闭合</Button>-->
            <!--                </ButtonGroup>-->
            <!--            </div>-->
            <div v-show="data === null || data === undefined" class="zoom-add">
<!--                <Button @click="addOrg" type="primary">添加组织</Button>-->
                您还没有任何机构
            </div>
            <div class="view-box">
                <org-view
                        :isExpand="isExpand"
                        v-if="data"
                        :data="data"
                        :zoom-handled="zoomHandled"
                        @on-menu-click="handleMenuClick"
                ></org-view>
            </div>
        </div>
        <!--部门操作模态框-->
        <MyModal @on-ok="alertModalOk" @on-cancel="cancel" :isShowModal="isShowModal" modal-title="架构设计">
            <div slot="modalContent">
                <div v-show="comeSource === '1'" >
                    <!--编辑结构-->
                    <div class="org-update">
                        <div class="org-item">
                            <div class="org-update-left">
                                <div>
                                    组织名称:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.description" placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    简称:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.jc" placeholder="Enter something..."/>
                                </div>
                            </div>
                            <!--                        <div class="org-update-left">-->
                            <!--                            <div>-->
                            <!--                                序号:-->
                            <!--                            </div>-->
                            <!--                            <div  class="org-update-left-input">-->
                            <!--                                <Input v-model="detailData.xh" placeholder="Enter something..."/>-->
                            <!--                            </div>-->
                            <!--                        </div>-->
                            <!--                        <div class="org-update-left">-->
                            <!--                            <div>-->
                            <!--                                上级组织:-->
                            <!--                            </div>-->
                            <!--                            <div class="org-update-left-input">-->
                            <!--                                <Input placeholder="Enter something..."/>-->
                            <!--                            </div>-->
                            <!--                        </div>-->
                            <div class="org-update-left">
                                <div>
                                    组织地址:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.orgaddress" placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    联系电话:
                                </div>
                                <div class="org-update-left-input">
                                    <!--                                <InputNumber style="width: 100%" v-model="detailData.orgtelphone"  placeholder="Enter something..."/>-->
                                    <Input v-model="detailData.orgtelphone" placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    备注:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.remark" type="textarea" placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    创建人:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.c_name || currentUser" disabled placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    创建日期:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.reportdate || newDate" disabled placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    修改人:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.x_name || currentUser" disabled placeholder="Enter something..."/>
                                </div>
                            </div>
                            <div class="org-update-left">
                                <div>
                                    修改日期:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.changedate || newDate" disabled placeholder="Enter something..."/>
                                </div>
                            </div>

                        </div>
                        <!--                    <div class="org-divider" />-->
                        <!--                    <div class="org-item" ></div>-->
                    </div>

                </div>
                <div v-show="comeSource === '2'">
                    <div class="org-update">
                        <div class="org-item">
                            <div class="org-update-left">
                                <div>
                                    地点名称:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.description" placeholder="Enter something..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="comeSource === '3' || comeSource === '4'">
                    <div class="org-update">
                        <div class="org-item">
                            <div class="org-update-left">
                                <div>
                                    部门名称:
                                </div>
                                <div class="org-update-left-input">
                                    <Input v-model="detailData.description" placeholder="Enter something..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MyModal>
    </Card>
</template>

<script>

import OrgView from './components/org-view.vue'
import ZoomController from './components/zoom-controller.vue'
import { getList, detail, update, deleteOrg, add } from '@/api/organizationApi'
import './index.less'
import MyModal from '../../../util/MyModal'
export default {
  name: 'org_tree_page',
  components: {
    MyModal,
    OrgView,
    ZoomController
  },
  data () {
    return {
      data: null,
      zoom: 100,
      isShowModal: false,
      isExpand: true,
      isMeAdd: null, // 是否是自己创建得
      detailData: {},
      comeSource: null,
      isAdd: false,
      comeKey: null,
      paternalXtm: null,
      newDate: getDateString(),
      currentUser: JSON.parse(localStorage.getItem('userInfo')).userName
    }
  },
  computed: {
    zoomHandled () {
      return this.zoom / 100
    }
  },
  methods: {
    setDepartmentData (data) {
      data.isRoot = true
      return data
    },
    handleMenuClick ({ data, key }) {
      this.comeSource = data.source
      this.comeKey = data.key
      this.paternalXtm = data.id
      if (key === 'delete') {
        if (this.isMeAdd === '1') {
          this.$Modal.confirm({
            title: '温馨提示',
            content: '<p>确认要删除吗?</p>',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              deleteOrg(data.id, this.comeSource).then(res => {
                if (res.code === '200') {
                  this.getDepartmentData()
                } else if (res.code === '500') {
                  this.$Message.error(this.MSGCONTENT.xtErrMsg)
                } else {
                  this.$Message.error(res.msg)
                }
              })
            }
          })
        } else {
          this.$Message.error('您无权删除')
        }
      } else {
        if (this.isMeAdd !== '1') {
          this.$Message.error('您无权操作')
          return
        }
        if (key === 'newAddress') {
          this.detailData = {}
          this.isAdd = true
          this.comeSource = '2'
          this.isShowModal = true
        }
        if (key === 'new') {
          this.isAdd = true
          this.detailData = {}
          if (data.source === '1') {
            // 添加地点
            this.comeSource = '2'
            this.isShowModal = true
          }
          if (data.source === '2') {
            // 添加部门
            this.isShowModal = true
            this.comeSource = '3'
          }
          if (data.source === '3') {
            // 添加子部门
            this.isShowModal = true
            this.comeSource = '4'
          }
        }
        if (key === 'edit') {
          if (key === 'edit') {
            this.isAdd = false
          }
          detail(data.id, data.source).then(res => {
            if (res.code === '200') {
              this.detailData = res.data
              this.isShowModal = true
            } else if (res.code === '500') {
              this.$Message.error(this.MSGCONTENT.xtErrMsg)
              this.isShowModal = true
            } else {
              this.$Message.error(res.msg)
              this.isShowModal = true
            }
          })
        }
      }
    },
    getDepartmentData () {
      getList().then(res => {
        const { data, isAdd } = res
        this.data = data
        this.isMeAdd = isAdd
      }).catch(err => {
        this.loading = false
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    cancel () {
      this.isShowModal = false
    },
    alertModalOk () {
      if (this.isAdd) {
        // 添加
        add(this.detailData, this.comeSource, this.paternalXtm).then(res => {
          if (res.code === '200') {
            this.isShowModal = false
            this.getDepartmentData()
          } else if (res.code === '500') {
            this.isShowModal = false
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          } else {
            this.isShowModal = false
            this.$Message.error(res.msg)
          }
        })
      } else {
        // 进行修改
        update(this.detailData, this.comeSource).then(res => {
          if (res.code === '200') {
            this.$Message.success('修改成功')
            this.isShowModal = false
            this.getDepartmentData()
          } else if (res.code === '500') {
            this.isShowModal = false
            this.$Message.error(this.MSGCONTENT.xtErrMsg)
          } else {
            this.isShowModal = false
            this.$Message.error(res.msg)
          }
        })
      }
    },
    addOrg () {
      this.comeSource = '1'
      this.detailData = {}
      this.isShowModal = true
      this.isAdd = true
    }

  },
  mounted () {
    this.getDepartmentData()
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
    .org-update {
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .org-item {
        border: 1px solid #dcdee2;
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        transition: all 0.2s ease-in-out;
        padding: 10px;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
    }

    .org-item:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        border-color: #eee;
    }

    .org-update-left {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;
    }

    .org-update-left-input {
        margin-left: 5px;
        width: 75%;
    }

    /*.org-divider {*/
    /*    width: 6px;*/
    /*    margin-right: 3px;*/
    /*    margin-left: 3px;*/
    /*    background: #e8eaec;*/
    /*}*/
    /*.org-update-right {*/
    /*    !*border: 1px green solid;*!*/
    /*}*/
</style>
