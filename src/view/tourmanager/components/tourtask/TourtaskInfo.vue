<template>
    <div>
        <!--主信息        -->
        <div v-show="isAddOrUpdate === 1 || isAddOrUpdate === 2" class="tourplan-info">
            <div class="my-contentOne">
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        任务编号：
                    </label>
                    <Input disabled
                           class="my-content-item-input"/>
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        任务名称：
                    </label>
                    <Input disabled :value="goToData.description"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        专业：
                    </label>
                    <Input disabled :value="goToData.zy"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        计划开始时间：
                    </label>
                    <Input disabled :value="goToData.kssj"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        计划完成时间：
                    </label>
                    <Input disabled
                           class="my-content-item-input"
                    />
                </div>

                <div class="my-content-item">
                    <label class="my-content-item-label">
                        实际开始时间：
                    </label>
                    <Input disabled :value="goToData.jssj"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        实际结束时间：
                    </label>
                    <Input disabled :value="goToData.sjwcsj"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        巡检员：
                    </label>
                    <Input disabled :value="goToData.jcr"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        班次：
                    </label>
                    <Input disabled v-model="goToData.bc"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        岗位名称：
                    </label>
                    <Input disabled v-model="goToData.gwmc"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        巡检分类：
                    </label>
                    <Input disabled v-model="goToData.xjfl"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        状态日期：
                    </label>
                    <Input disabled v-model="goToData.statusdate"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        状态：
                    </label>
                    <Input disabled v-model="goToData.status"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        到位率：
                    </label>
                    <Input disabled v-model="goToData.dwl"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        应到区域：
                    </label>
                    <Input disabled v-model="goToData.sdqy"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        实到区域：
                    </label>
                    <Input disabled v-model="goToData.ydqy"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        应检点：
                    </label>
                    <Input disabled v-model="goToData.yjd"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        实检点：
                    </label>
                    <Input disabled v-model="goToData.sjd"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        异常点：
                    </label>
                    <Input disabled v-model="goToData.ycd"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        漏检点：
                    </label>
                    <Input disabled v-model="goToData.ljd"
                           class="my-content-item-input"
                    />
                </div>
                <div class="my-content-item">
                    <label class="my-content-item-label">
                        过滤点：
                    </label>
                    <Input disabled v-model="goToData.gld"
                           class="my-content-item-input"
                    />
                </div>
            </div>
        </div>
        <!--区域信息        -->
        <tourtask-qy @gotoSb="gotoSb" ref="myTourtaskInfo" v-show="isAddOrUpdate === 3"/>
        <tourtask-sb @togoXm="togoXm" ref="myTourtaskInfoSb" v-show="isAddOrUpdate === 4"/>
        <tourtask-xm @togoJg="togoJg" ref="myTourtaskInfoXm" v-show="isAddOrUpdate === 5"/>
        <tourtask-jg ref="myTourtaskInfoJg" v-show="isAddOrUpdate === 6"/>
    </div>
</template>

<script>
    import {getZyList} from '@/api/utilApi';
    import '@/util/util.css'
    import TableUtil from "@/util/TableUtil";
    import {mapState, mapActions, mapGetters} from 'vuex'
    import TourtaskQy from "./TourtaskQy";
    import TourtaskSb from "./TourtaskSb";
    import TourtaskXm from "./TourtaskXm";
    import TourtaskJg from "./TourtaskJg";

    export default {
        name: "TourtaskInfo",
        components: {TourtaskJg, TourtaskXm, TourtaskSb, TourtaskQy, TableUtil},
        data() {
            return {
                zyArray: [],
                gw: [1, 2, 4]
            }
        },
        methods: {
            getZyList() {
                getZyList(1).then(res => {
                    this.zyArray = res.data
                }).catch(err => {
                    this.$Message.error(this.MSGCONTENT.errMsg);
                })
            },
            gotoSb() {
                this.$refs.myTourtaskInfoSb.clickItem();
            },
            togoXm() {
                this.$refs.myTourtaskInfoXm.clickItem();
            },
            togoJg() {
                this.$refs.myTourtaskInfoJg.clickItem();
            },
            onSelectChange(value) {
                console.log(value);
            },
            clickOk() {
                if (this.isAddOrUpdate === 3) {
                    this.$refs.myTourtaskInfo.clickOk();
                } else if (this.isAddOrUpdate === 4) {
                    this.$refs.myTourtaskInfoSb.clickOk();
                } else if (this.isAddOrUpdate === 5) {
                    this.$refs.myTourtaskInfoXm.clickOk();
                } else if (this.isAddOrUpdate === 6) {
                    this.$refs.myTourtaskInfoJg.clickOk();
                }

            },
            clickCancel() {
                if (this.isAddOrUpdate === 3) {
                    this.$refs.myTourtaskInfo.clickCancel();
                } else if (this.isAddOrUpdate === 4) {
                    this.$refs.myTourtaskInfoSb.clickCancel();
                } else if (this.isAddOrUpdate === 5) {
                    this.$refs.myTourtaskInfoXm.clickCancel();
                } else if (this.isAddOrUpdate === 6) {
                    this.$refs.myTourtaskInfoJg.clickCancel();
                }
            },
            goto() {
                if (this.isAddOrUpdate === 3) {
                    this.$refs.myTourtaskInfo.clickItem();
                }
                // else if (this.isAddOrUpdate === 4) {
                //     this.$refs.myTourplanInfoSb.clickItem();
                // } else if (this.isAddOrUpdate === 5) {
                //     this.$refs.myTourplanInfoXm.clickItem();
                // }
            },
        },
        computed: {
            ...mapState('tourtaskStore', [
                'isAddOrUpdate',
                'goToData'
            ])
        },
        mounted() {
            this.getZyList();
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
        align-items: center;
        /*justify-content: center;*/
        flex-wrap: wrap;
        height: 100%;
    }

    .my-contentOne > div {
        width: 45%;
    }

    .my-content-item-label {
        flex: 2;
    }

</style>