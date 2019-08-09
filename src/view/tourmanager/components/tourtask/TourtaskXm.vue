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
                <Input :value="rowData.description"  type="textarea" :rows="4" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    检查标准：
                </label>
                <Input :value="rowData.djbz" disabled  type="textarea" :rows="4"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    序号：
                </label>
                <Input :value="rowData.xh" disabled
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    设备名称：
                </label>
                <Input disabled :value="rowData.shebeimc"
                       class="my-content-item-input"
                />
            </div>


            <div class="my-content-item">
                <label class="my-content-item-label">
                    项目编码：
                </label>
                <Input disabled :value="rowData.xmbm"
                       class="my-content-item-input"
                />
            </div>

            <div class="my-content-item">
                <label class="my-content-item-label">
                    启停点：
                </label>
                <Input disabled :value="rowData.qtd"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点类型：
                </label>
                <Input disabled :value="rowData.cdlx"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测量单位：
                </label>
                <Input disabled :value="rowData.cddw"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    振动类型：
                </label>
                <Input disabled :value="rowData.zdlx"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    测点结果列表：
                </label>
                <Input disabled :value="rowData.cdjgzlb"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    上限值：
                </label>
                <Input disabled :value="rowData.sxz"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    下限值：
                </label>
                <Input disabled :value="rowData.xxz"
                       class="my-content-item-input"
                />
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    是否启用：
                </label>
                <Input disabled :value="rowData.sfqy === 0 ? '否' : '是'"
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
    import TableUtil from "@/util/TableUtil";
    import {mapGetters , mapActions  , mapMutations} from 'vuex'
    import {getList} from '@/api/tourmanagerApi';
    export default {

        name: "TourtaskXm",
        data() {
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
                        title: '巡检项目描述',
                        key: 'description'
                    },
                    {
                        title: '检查方法',
                        key: 'jcff'
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
                            return h('span', params.row.isOpen === '0' ? '否' : '是');
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
                                            this.gotoResult(params)
                                        }
                                    }
                                }, '检查结果')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {num: '1' , name: '区域1'},
                    {num: '2' , name: '区域2'},
                    {num: '3' , name: '区域3'},
                ],
                pageSizeOpts: [5, 10, 30, 50],
                current: 1,
                pageSize: 5,
                total: 0,
                isShowTable: true
            }
        },
        components: {TableUtil},
        methods: {
            ...mapActions('tourtaskStore' , [
                'updateStoreAction'
            ]),
            ...mapMutations('tourtaskStore' , [
                'closeModalAndTab'
            ]),
            gotoResult (rowData){
                this.updateStoreAction({
                    types: 'isAddOrUpdate',
                    value: 6
                })
                this.updateStoreAction({
                    types: 'goToXmData',
                    value: rowData.row
                })
                this.updateStoreAction({
                    types: 'modalTitle',
                    value: '巡检任务结果信息'
                });
                this.$emit('togoJg');
                this.isShowTable = true
            },
            clickItem () {
                this.getDataList(1);

            },
            clickOk () {
                if(!this.isShowTable){
                    //添加区域
                    // if (this.rowData){
                    //     this.tableData.push(this.rowData);
                    // }
                    this.$Message.success("添加区域成功")
                    this.isShowTable =true;
                } else {
                    this.updateStoreAction({
                        types: 'isAddOrUpdate',
                        value: 4
                    })
                    this.isShowTable =true;
                    this.updateStoreAction({
                        types: 'modalTitle',
                        value: '巡检任务设备信息'
                    });

                }


            },
            clickCancel () {
                if(!this.isShowTable){
                    this.isShowTable =true;

                } else {
                    this.updateStoreAction({
                        types: 'isAddOrUpdate',
                        value: 4
                    })
                    this.updateStoreAction({
                        types: 'modalTitle',
                        value: '巡检任务设备信息'
                    });
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
            getDataList(pageNum) {
                if (this.getXmData.xtm){
                    this.loading = true;
                    if (pageNum) {
                        this.current = pageNum;
                    }
                    getList(4, this.current , this.pageSize , this.searchContent , this.searchCols , this.getXmData.xtm).then(res => {
                        this.tableData = res.data
                        this.searchCol = res.searchData
                        this.total = res.total
                        console.log('fasdfasdfasd' , res);
                    }).catch(err => {
                        this.loading = false;
                        this.$Message.error(this.MSGCONTENT.errMsg);
                    })
                    this.loading = false;
                }


            },
            //改变当前页
            changePage(page) {
                this.current = page;
                this.getDataList();
            },
            //改变页大小
            pageSizeChange(size) {
                this.pageSize = size;
                this.getDataList();
            },
            clickSearch(content) {
                console.log('搜索的内容', content);
                if (content !== undefined && content !== null && content !== '') {
                    this.current = 1;

                }
                this.getDataList();
            },
            onInputSearch(content) {
                this.searchContent = content;
            },
            searchColChange(content){
                this.searchCols = content;
            },
            selectCancel(selection, row) {
            },
            updateData (params) {
                this.isShowTable = false;
                this.rowData  = params.row;
            },
        },
        computed: {
            ...mapGetters('tourtaskStore' ,[
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
        /*justify-content: center;*/
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