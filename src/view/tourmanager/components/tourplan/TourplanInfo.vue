<template>
    <div>
        <!--主信息        -->
        <div v-show="isAddOrUpdate === 1 || isAddOrUpdate === 2" class="tourplan-info">
            <div class="my-contentOne">
                <div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            序号：
                        </label>
                        <Input v-model="goToData.num"
                               class="my-content-item-input"/>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            计划名称：
                        </label>
                        <Input v-model="goToData.description"
                               placeholder="岗位名称"
                               class="my-content-item-input"
                        />
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            巡检分类：
                        </label>
                        <Select
                                v-model="goToData.xjfl"
                                placement="bottom" placeholder="请选择"
                                class="my-content-item-input" clearable>
                            <template v-for="type in xjTypeArray">
                                <Option  :value="type.value">{{type.description}}</Option>
                            </template>

                        </Select>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            所属专业：
                        </label>
                        <Select v-model="goToData.zy" placement="bottom" placeholder="请选择"
                                class="my-content-item-input" clearable>
                            <template v-for="zy in zyArray">
                                <Option  :value="zy.xtm">{{zy.description}}</Option>
                            </template>

                        </Select>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            按周或月的日期频率：
                        </label>
                        <div class="my-content-item-input">
                            <i-switch true-value="1" false-value="0" v-model="goToData.cycle" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            计划周期：
                        </label>
                        <InputNumber
                                v-model="goToData.jhzq"
                                :min="minNum"
                                class="my-content-item-input"
                        />
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            周期单位：
                        </label>
<!--                        multiple-->
                        <Select v-model="goToData.zqdw" placement="bottom" placeholder="请选择"
                                class="my-content-item-input" clearable>
                            <template  v-for="zq in zqDwArray">
                                <Option :value="zq.value">{{zq.description}}</Option>
                            </template>

                        </Select>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            提前生成任务（天）：
                        </label>
                        <InputNumber
                                v-model="goToData.beforedays"
                                :min="minNum"
                                class="my-content-item-input"
                        />
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            总是生成最新任务：
                        </label>
                        <div class="my-content-item-input">
                            <i-switch true-value="1" false-value="0" v-model="goToData.createnew" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            所属班次：
                        </label>
                        <Select v-model="goToData.varchar01" placement="bottom" placeholder="请选择"
                                class="my-content-item-input" clearable>
                            <!--                        <Option v-for="zy in zyArray" :value="zy.xtm">{{zy.description}}</Option>-->
                            <Option :value="1">部门1</Option>
                            <Option :value="2">部门2</Option>
                            <Option :value="3">部门3</Option>
                            <Option :value="4">部门4</Option>
                        </Select>
                    </div>

                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            所属岗位：
                        </label>
<!--                        multiple-->
                        <Select @on-change="onSelectChange" v-model="goToData.gwmc"  placement="bottom" placeholder="请选择"
                                class="my-content-item-input" clearable>
                            <Option v-for="gw in gwArray" :value="gw.xtm">{{gw.description}}</Option>
                        </Select>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            任务时长(分钟)：
                        </label>
                        <InputNumber
                                v-model="goToData.sc"
                                :min="minNum"
                                class="my-content-item-input"
                        />
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            是否启用：
                        </label>
                        <div class="my-content-item-input">
                            <i-switch true-value="1" false-value="0" v-model="goToData.sfqy" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            计划周期起始时间：
                        </label>
                        <div class="my-content-item-input">
                            <DatePicker v-model="goToData.qssj"   format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            上次任务时间：
                        </label>
                        <div class="my-content-item-input">
                            <DatePicker v-model="goToData.scrwsj" placement="top"  format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            下次任务时间：
                        </label>
                        <div class="my-content-item-input">
                            <DatePicker v-model="goToData.xcrwsj" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            有效起始时间：
                        </label>
                        <div class="my-content-item-input">
                            <DatePicker v-model="goToData.validstarttime" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            有效结束时间：
                        </label>
                        <div class="my-content-item-input">
                            <DatePicker v-model="goToData.validendtime" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date"></DatePicker>
                        </div>
                    </div>

                    <div class="my-content-item">
                        <label class="my-content-item-label">
                            有效结束时间是否跨年：
                        </label>
                        <div class="my-content-item-input">
                            <i-switch v-model='goToData.iscountdown' true-value="1" false-value="0" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--区域信息        -->
        <tourplan-qy @gotoSb="gotoSb"  ref="myTourplanInfo" v-show="isAddOrUpdate === 3"/>
        <tourplan-sb @togoXm="togoXm" ref="myTourplanInfoSb" v-show="isAddOrUpdate === 4"/>
        <tourplan-xm ref="myTourplanInfoXm" v-show="isAddOrUpdate === 5"/>
    </div>
</template>

<script>
import { getZyList } from '@/api/utilApi'
import '@/util/util.css'
import TableUtil from '@/util/TableUtil'
import { mapState, mapActions, mapGetters } from 'vuex'
import TourplanQy from './TourplanQy'
import TourplanSb from './TourplanSb'
import TourplanXm from './TourplanXm'

export default {
  name: 'TourplanInfo',
  components: { TourplanXm, TourplanSb, TourplanQy, TableUtil },
  data () {
    return {
      minNum: 0,
      zyArray: [],
      gwArray: [],
      xjTypeArray: [],
      zqDwArray: [],
      gw: [1, 2, 4]
    }
  },
  methods: {
    getZyList () {
      // 专业
      getZyList(1).then(res => {
        console.log('--------------------', res)
        this.zyArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 巡检分类
      getZyList(2).then(res => {
        this.xjTypeArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 岗位
      getZyList(3).then(res => {
        this.gwArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
      // 周期
      getZyList(9).then(res => {
        this.zqDwArray = res.data
      }).catch(err => {
        this.$Message.error(this.MSGCONTENT.errMsg)
      })
    },
    gotoSb () {
      this.$refs.myTourplanInfoSb.clickItem()
    },
    togoXm () {
      this.$refs.myTourplanInfoXm.clickItem()
    },
    onSelectChange (value) {
      console.log(value)
    },
    clickOk () {
      if (this.isAddOrUpdate === 3) {
        this.$refs.myTourplanInfo.clickOk()
      } else if (this.isAddOrUpdate === 4) {
        this.$refs.myTourplanInfoSb.clickOk()
      } else if (this.isAddOrUpdate === 5) {
        this.$refs.myTourplanInfoXm.clickOk()
      }
    },
    clickCancel () {
      if (this.isAddOrUpdate === 3) {
        this.$refs.myTourplanInfo.clickCancel()
      } else if (this.isAddOrUpdate === 4) {
        this.$refs.myTourplanInfoSb.clickCancel()
      } else if (this.isAddOrUpdate === 5) {
        this.$refs.myTourplanInfoXm.clickCancel()
      }
    },
    goto () {
      if (this.isAddOrUpdate === 3) {
        this.$refs.myTourplanInfo.clickItem()
      }
      // else if (this.isAddOrUpdate === 4) {
      //     this.$refs.myTourplanInfoSb.clickItem();
      // } else if (this.isAddOrUpdate === 5) {
      //     this.$refs.myTourplanInfoXm.clickItem();
      // }
    }
  },
  computed: {
    ...mapState('tourplanStore', [
      'isAddOrUpdate',
      'goToData'
    ])
  },
  mounted () {
    this.getZyList()
  }
}
</script>

<style scoped>
    .tourplan-info {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .my-contentOne {
        display: flex;
        margin-bottom: 10px;
    }

    .my-contentOne > div {
        width: 50%;
    }

    .my-content-item-label {
        flex: 2;
    }

</style>
