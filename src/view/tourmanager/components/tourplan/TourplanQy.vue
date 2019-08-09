<template>
    <div class="tourplan-qy">
        <div v-show="isShowTable" class="my-contentOne">
            <div class="my-content-item" style="width: 60%">
                <label class="my-content-item-label">
                    当前巡检计划：
                </label>
                <Input readonly
                       :value="getGoToData.description"
                       class="my-content-item-input"/>
            </div>
        </div>
        <div v-show="!isShowTable" class="my-contentOne">
            <div class="my-content-item">
                <label class="my-content-item-label">
                    序号：
                </label>
                <Input
                       class="my-content-item-input" v-model="rowData.xh"/>
            </div>
            <div class="my-content-item">
                <label class="my-content-item-label">
                    区域名称：
                </label>
                <Input placeholder="岗位名称"
                       v-model="rowData.description"
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
    import TableUtil from "@/util/TableUtil";
    import {mapGetters , mapActions  , mapMutations} from 'vuex'
    import {getList , addData , deleteData} from '@/api/tourmanagerApi';
    export default {

        name: "TourplanQy",
        data() {
            return {
                minNum: 0,
                rowData: {},
                searchCol: [],
                searchCols: [],
                tableHeight: 'auto',
                buttonArray: [
                    {method: 'addQy', content: '添加巡检区域'}
                ],
                columns: [
                    {
                        title: '序号',
                        key: 'xh',
                        minWidth: 80
                    },
                    {
                        title: '区域名',
                        key: 'description',
                        minWidth: 120
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center',
                        minWidth: 200,
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
                                }, '删除'),
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
                                            this.goEquipment(params)
                                        }
                                    }
                                }, '区域设备')
                            ]);
                        }
                    }
                ],
                tableData: [
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
            ...mapActions('tourplanStore' , [
                'updateStoreAction'
            ]),
            ...mapMutations('tourplanStore' , [
                'closeModalAndTab'
            ]),

            clickItem () {
                this.getDataList(1)
            },
            clickOk () {
                if(!this.isShowTable){
                    //添加区域
                    if (this.rowData){
                        console.log(    this.getGoToData);
                        addData(2 , this.rowData , this.getGoToData.xtm).then(res => {
                           if ( res.code === '200'){
                               this.$Message.success(res.msg);
                               this.isShowTable =true;
                               this.getDataList();
                           } else {
                               this.$Message.success(res.msg);
                           }
                        }).catch(err => {
                            this.$Message.error(this.MSGCONTENT.errMsg);
                        })
                    }
                    this.updateStoreAction({
                        types: 'modalLoading',
                        value: false
                    })

                } else {
                    this.$Message.success("点击确认")
                    this.updateStoreAction({
                        types: 'isShowModal',
                        value: false
                    })
                }
                this.updateStoreAction({
                    types: 'modalTitle',
                    value: '巡检区域信息'
                });


            },
            clickCancel () {
                if(!this.isShowTable){
                    this.getDataList();
                    this.isShowTable =true;
                    this.updateStoreAction({
                        types: 'isShowModal',
                        value: true
                    })
                    this.updateStoreAction({
                        types: 'isTabsShow',
                        value: true
                    })
                } else {
                    // this.updateStoreAction({
                    //     types: 'isShowModal',
                    //     value: false
                    // })
                    this.updateStoreAction({
                        types: 'modalTitle',
                        value: '巡检区域信息'
                    });
                }
                this.rowData = {};
            },
            addQy () {
                this.isShowTable = false
                this.rowData = {};
            },
            updateData (params) {
                this.isShowTable = false;
                this.rowData  = params.row;
            },
            getDataList(pageNum) {
                console.log( '------------------' ,this.getGoToData);
                if (this.getGoToData.xtm){
                    this.loading = true;
                    if (pageNum) {
                        this.current = pageNum;
                    }
                    getList(2 , this.current , this.pageSize , this.searchContent , this.searchCols , this.getGoToData.xtm).then(res => {
                        this.tableData = res.data
                        this.searchCol = res.searchData
                        this.total = res.total
                        console.log('fasdfasdfasd' , res);
                    }).catch(err => {
                        this.loading = false;
                        this.$Message.error(this.MSGCONTENT.errMsg);
                    })
                    this.loading = false;
                } else {
                    this.$Message.warning('xtm为空');
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
            selectCancel(selection, row) {
            },
            searchColChange(content){
              this.searchCols = content;
            },

            deleteData(params) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>确认要删除吗?</p>',
                    onOk: () => {
                        deleteData(2 , params.row.xtm).then(res => {
                            if (res.code === '200'){
                                let pageNum = this.current
                                if ( this.tableData.length === 1){
                                    pageNum = 1;
                                }
                                this.getDataList(pageNum)
                            }else{
                                this.$Message.warning(this.msg);
                            }
                        }).catch(err => {
                            this.$Message.error(this.MSGCONTENT.errMsg);
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            goEquipment (rowData) {
                this.updateStoreAction({
                    types: 'isAddOrUpdate',
                    value: 4
                });
                this.updateStoreAction({
                    types: 'goToSbData',
                    value: rowData.row
                });
                this.updateStoreAction({
                    types: 'modalTitle',
                    value: '巡检设备信息'
                });
                this.$emit('gotoSb');
                this.isShowTable = true
            }
        },
        computed: {
            ...mapGetters('tourplanStore', ['getGoToData'])
        },


    }
</script>

<style scoped>
    .tourplan-qy {
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
        margin-bottom: 0px;
    }

</style>