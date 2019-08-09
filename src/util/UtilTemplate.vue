<template>
    <div>
        <MyTabHeaderAction
                name="专业配置"
                @addBut="addBut"
                @delBtn="delBtn"
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
                modal-title='用户信息'
                @on-ok="ok"
                @on-cancel="cancel"
                @on-largen="modelLargen"
        >
            <div slot="modalContent" v-show="isTabsShow">
                <MyTabs @on-click-tab="clickTab"
                        :tabs-name="tabsName"
                        :tabs-array="tabsArray">
                    <div class="tab-list-item" slot="ListName">
                        内容
                    </div>
                </MyTabs>
            </div>
        </my-modal>
    </div>
</template>
<script>


    import MyModal from "@/util/MyModal";
    import MyTabHeaderAction from "@/util/MyTabHeaderAction";
    import MyTabs from "@/util/MyTabs";
    import TableUtil from "@/util/TableUtil";

    export default {
        name: 'UtilTemplate',
        components: {MyModal, MyTabHeaderAction, MyTabs, TableUtil},
        data (){
            return {
                searchCol: [],
                searchCols: [],
                selectionRowArray: [], //选中要删除的行
                searchContent: '',
                current: 1,
                pageSize: 10,
                total: 0,
                modalWidth: window.innerWidth - 360,
                loading: false,
                tabsName: 'list',
                isTabsShow: false,
                modalLoading: false,
                isShowModal: false,
                isAddData: false,
                columns: [
                    {
                        //多选
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'dlm'
                    },
                    {
                        title: '姓名',
                        key: 'description'
                    },
                    {
                        title: '部门',
                        key: 'bm'
                    },
                    {
                        title: '班组',
                        key: 'address'
                    },
                    {
                        title: '创建日期',
                        key: 'reportdate'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center',
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
                                }, '修改')
                            ]);
                        }
                    }
                ],
                tableData:  [],
                tabsArray: [
                    {name: 'list', label: '详情', moduleName: 'ListName'},
                ]
            }
        },
        mounted() {

        },
        methods : {
            /**
             * 获取数据
             */
            getDataList(pageNum) {
                this.loading = true;
                if (pageNum) {
                    this.current = pageNum;
                }
            },
            //点击修改
            show(rowData) {
                this.isAddData = false;
                let objCopy = Object.assign({}, rowData.row);
                this.openModalAndTab();

            },
            ok() {
                this.modalLoading = true;
                if (this.isAddData){

                } else {

                }
            },
            //点击取消
            cancel() {
                this.closeModalAndTab();
                this.isAddData = false
            },
            addBut() {
                this.openModalAndTab();
                this.isAddData = true
                this.setUpdateStore({
                    types: 'rowData',
                    value: {}
                });
            },
            delBtn() {
                if(this.selectionRowArray.length ==0 ) {
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
                        // deleteData(this.selectionRowArray).then(res => {
                        //     if (res.code === '200') {
                        //         let pageNum = null;
                        //         if (this.selectionRowArray.length === this.$store.state.userStoreTwo.userInfoArray.length) {
                        //             pageNum = 1;
                        //         }
                        //         this.selectionRowArray = [];
                        //         this.$Message.success(res.msg);
                        //         this.getDataList(pageNum);
                        //     } else {
                        //         this.getDataList(this.current);
                        //         this.$Message.warning(res.msg);
                        //     }
                        // }).catch(err => {
                        //     alert('fasdf');
                        //     this.$Message.error(this.MSGCONTENT.xtErrMsg);
                        // })
                    },
                });
            },
            selectionRow(rows) {
                let xtmArray = [];
                rows.map(item => {
                    xtmArray.push(item.yhxtm)
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
            onInputSearch(content) {
                this.searchContent = content;
            },
            //打开modal tab
            openModalAndTab(){
                this.isShowModal = true
                this.isTabsShow = true
            },
            //关闭modal tab
            closeModalAndTab(){
                this.isShowModal = false;
                this.modalLoading = false
                setTimeout ( () =>  {
                    this.isTabsShow = false
                },500)
            },
            searchColChange(content){
                this.searchCols = content;
            },



        }
    }
</script>
