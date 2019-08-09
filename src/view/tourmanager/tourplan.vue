<template>
    <div>
        <MyTabHeaderAction
                name="巡检计划"
                :thActionBtns="thActionBtns"
                @addBut="addBut"
                @delBtn="delBtn"
                @importBtn="importBtn"
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
                        <tourplan-info ref="myTourplanInfo"/>
                    </div>
                </MyTabs>
            </div>
        </my-modal>
    </div>
</template>
<script>


    import MyModal from "@/util/MyModal";
    import ExportExcelData from "@/util/ExportExcelData";
    import MyTabHeaderAction from "@/util/MyTabHeaderAction";
    import MyTabs from "@/util/MyTabs";
    import TableUtil from "@/util/TableUtil";
    import TourplanInfo from "./components/tourplan/TourplanInfo";
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {getList , addData , deleteData , implData} from '@/api/tourmanagerApi';

    export default {
        name: 'tourplan',
        components: {TourplanInfo, MyModal, MyTabHeaderAction, MyTabs, TableUtil},
        data() {
            return {
                implData: [],
                thActionBtns: [
                    {method: 'addBut', iconName: 'ios-create', content: '新增'},
                    {method: 'delBtn', iconName: 'md-trash', content: '删除'},
                    {method: 'importBtn', iconName: 'ios-cloud-upload', content: '导入数据'}
                ],
                selectionRowArray: [], //选中要删除的行
                searchContent: '',
                current: 1,
                pageSize: 10,
                total: 0,
                modalWidth: window.innerWidth - 360,
                loading: false,
                tabsName: 'list',
                columns: [
                    {
                        //多选
                        type: 'selection',
                        minWidth: 50,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        align: 'center',
                        key: 'num',
                        minWidth: 80
                    },
                    {
                        title: '名称',
                        align: 'center',
                        minWidth: 200,
                        key: 'description'
                    },
                    {
                        title: '专业',
                        align: 'center',
                        minWidth: 60,
                        key: 'zys'
                    },
                    {
                        title: '是否启用',
                        align: 'center',
                        key: 'sfqy',
                        minWidth: 100,
                        render: (h, params) => {
                            return h('span', params.row.isOpen === '0' ? '否' : '是');
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        minWidth: 170,
                        fixed: 'right',
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
                                }, '修改信息'),
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
                            ]);
                        }
                    }
                ],
                searchCol: [],
                searchCols: [],
                tableData: [],
                tabsArray: [
                    {name: 'list', label: '详情', moduleName: 'ListName'},
                ]
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            ...mapActions('tourplanStore', [
                'updateStoreAction'
            ]),
            ...mapMutations('tourplanStore', [
                'openModalAndTab',
                'closeModalAndTab'
            ]),
            /**
             * 获取数据
             */
            getDataList(pageNum) {
                this.loading = true;
                if (pageNum) {
                    this.current = pageNum;
                }

                getList(1 , this.current , this.pageSize , this.searchContent , this.searchCols).then(res => {
                    this.tableData = res.data
                    this.searchCol = res.searchData
                    this.total = res.total
                    console.log('fasdfasdfasd' , res);
                }).catch(err => {
                    this.loading = false;
                    this.$Message.error(this.MSGCONTENT.errMsg);
                })
                this.loading = false;
            },
            //点击修改
            show(rowData) {
                console.log('发射点发' , rowData.row);
                this.updateStoreAction({
                    types: 'isAddOrUpdate',
                    value: 2
                })
                this.updateStoreAction({
                    types: 'goToData',
                    value: rowData.row
                })
                this.openModalAndTabMe();
            },
            //点击区域
            qvShow(rowData) {
                this.updateStoreAction({
                    types: 'isAddOrUpdate',
                    value: 3
                })
                this.updateStoreAction({
                    types: 'goToData',
                    value: rowData.row
                })
                this.openModalAndTabMe();
                this.$refs.myTourplanInfo.goto();
            },
            ok() {
                this.updateStoreAction({
                    types: 'modalLoading',
                    value: true
                })
                if (this.isAddOrUpdate === 1 || this.isAddOrUpdate === 2){
                    console.log('要修改的增加的数据' , this.goToData);
                    if (this.goToData){
                        addData(1 , this.goToData , 'null').then(res => {
                            if (res.code === '200'){
                                this.getDataList();
                                this.$Message.success('操作成功');
                                this.closeModalAndTabMe();
                            }else{
                                this.$Message.warning(this.msg);
                            }
                        }).catch(err => {
                            this.$Message.error(this.MSGCONTENT.errMsg);
                        })
                    }
                }
                this.updateStoreAction({
                    types: 'modalLoading',
                    value: false
                })
                this.$refs.myTourplanInfo.clickOk();
            },
            //点击取消
            cancel() {
                if (this.isAddOrUpdate === 2){
                    this.getDataList();
                }
                this.closeModalAndTabMe();
                // this.updateStoreAction({
                //     types: 'isAddOrUpdate',
                //     value: 1
                // })
                this.$refs.myTourplanInfo.clickCancel();
            },
            addBut() {
                this.openModalAndTabMe();
                this.updateStoreAction({
                    types: 'isAddOrUpdate',
                    value: 1
                })
                this.updateStoreAction({
                    types: 'goToData',
                    value: {}
                });
            },
            delBtn() {
                if (this.selectionRowArray.length == 0) {
                    this.$Modal.error({
                        title: '温馨提示',
                        content: '请选择要删除的行'
                    });
                    return;
                }
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '确认要删除吗???',
                    onOk: () => {
                        deleteData(1 , JSON.stringify(this.selectionRowArray)).then(res => {
                            if (res.code === '200') {

                                let pageNum = null;
                                if (this.selectionRowArray.length === this.tableData.length) {
                                    pageNum = 1;
                                }
                                this.selectionRowArray = [];
                                this.$Message.success(res.msg);
                                this.getDataList(pageNum);
                            } else {
                                this.getDataList(this.current);
                                this.$Message.warning(res.msg);
                            }
                        }).catch(err => {
                            this.$Message.error(this.MSGCONTENT.xtErrMsg);
                        })
                    },
                });
            },
            importBtn() {
                this.$Modal.confirm({
                    render: (h) => {
                        return h(ExportExcelData, {
                            on: {
                                getResult: (val) => {
                                    this.implData = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        implData(this.implData).then(res => {
                            console.log(res);
                            if (res.code !== '200'){
                                this.$Message.warning(res.msg);
                                return;
                            }else {
                                this.getDataList(1);
                            }
                        })
                    },
                    onCancel: () => {
                        this.implData = [];
                    }
                })
            },
            selectionRow(rows) {
                let xtmArray = [];
                rows.map(item => {
                    xtmArray.push(item.xtm)
                })
                this.selectionRowArray = xtmArray
            },
            clickTab(name) {
                this.tabsName = name
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
                    this.getDataList();
                }
            },
            searchColChange (content) {
                this.searchCols = content;
            },
            onInputSearch(content) {
                this.searchContent = content;
            },
            //打开modal tab
            openModalAndTabMe() {
                this.openModalAndTab();
                // this.isShowModal = true
            },
            //关闭modal tab
            closeModalAndTabMe() {
                this.closeModalAndTab();
                // setTimeout ( () =>  {
                //     this.isTabsShow = false
                // },300)
            },
        },
        computed: {
            ...mapState('tourplanStore', [
                'isAddOrUpdate',
                'modalLoading',
                'isShowModal',
                'isTabsShow',
                'modalTitle',
                'goToData'

            ])
        }
    }
</script>
