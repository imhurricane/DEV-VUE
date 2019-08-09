<template>
    <div class="post-info">
        <div v-show="!isAddPerson">
                <Row>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">编号：</Col>
                            <Col :xs="14" :sm="16">
                                <Input min="0" v-model="getRowData.num"/>
                            </Col>
                        </Row>

                    </Col>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">岗位名称：</Col>
                            <Col :xs="14" :sm="16">
                                <Input placeholder="岗位名称" v-model="getRowData.description"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">专业：</Col>
                            <Col :xs="14" :sm="16">
                                <Select v-model="getRowData.zy" placement="bottom" placeholder="请选择"
                                        class="my-content-item-input" clearable>
                                    <Option v-for="zy in zyArray" :value="zy.xtm">{{zy.description}}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">创建人：</Col>
                            <Col :xs="14" :sm="16">
                                <Input
                                        disabled
                                        v-model="getRowData.user_name || currentUser"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">修改人：</Col>
                            <Col :xs="14" :sm="16">
                                <Input disabled
                                       v-model="getRowData.xg_user || currentUser"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col :span="12" class="my-contentOne">
                        <Row class-name="content-item" type="flex" justify="center" align="middle">
                            <Col :xs="8" :sm="6" class="text-right">修改时间：</Col>
                            <Col :xs="14" :sm="16">
                                <Input disabled
                                       v-model="getRowData.changedate || newDate"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </div>
        <div v-show="!isAddPerson" class="my-content">
            <table-util
                    :columns="columns"
                    :table-data="getTableTwoDataArray"
                    :table-height="tableHeight"
                    :total='total'
                    :pageSizeOpts="pageSizeOpts"
                    :pageSize="pageSize"
                    :current="current"
                    :button-array="buttonArray"
                    @on-select="onSelect"
                    @on-select-cancel="selectCancel"
                    @change-page="changePage"
                    @page-size-change="pageSizeChange"
                    @click-search="clickSearch"
                    @on-input-search="onInputSearch"
                    @on-select-all="selectAll"
                    @on-select-all-cancel="selectCancelAll"
                    @addPersonnel="addPersonnel"
            />
        </div>
        <div v-show="isAddPerson">
            <TableUtil
                    :columns="[
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
                    }
                ]"
                    :table-height="tableHeight"
                    :tableData="tableUserData"
                    :loadingTable="loading"
                    :total='userTotal'
                    :pageSizeOpts="[5 , 10 , 30 , 50]"
                    :pageSize="userPageSize"
                    :current="userCurrent"
                    @change-page="changePageUser"
                    @page-size-change="pageSizeChangeUser"
                    @click-search="clickSearchUser"
                    @on-input-search="onInputSearchUser"
                    @table-selection-change="selectionChange"

            />
        </div>
    </div>

</template>

<script>
    import '@/util/util.css'
    import {getDateString} from '@/libs/util'
    import TableUtil from "../../../../util/TableUtil";
    import {getDepartmentPerson , deleteUser} from '../../../../api/postSettingApi';
    import {mapGetters, mapMutations} from 'vuex';
    import {getUserList} from '../../../../api/userInfoConfig'
    export default {
        name: "PostInfo",
        components: {TableUtil},
        data() {
            return {
                tableUserData: [],
                isAddPerson: false,
                searchContent: '',
                newDate: getDateString(),
                currentUser: JSON.parse(localStorage.getItem('userInfo')).userName,
                tableHeight: 'auto',
                columns: [
                    {
                        title: '姓名',
                        key: 'description'
                    },
                    {
                        title: '用户账号',
                        key: 'dlm'
                    },
                    {
                        title: '岗位',
                        key: 'gw'
                    },
                    {
                        title: '部门',
                        key: 'bm'
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
                                            this.deleteUser(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                buttonArray: [
                    {method: 'addPersonnel', content: '添加人员'}
                ],
                pageSizeOpts: [5, 10, 30, 50],
                current: 1,
                pageSize: 5,
                total: 0,
                bmXtm: '',
                userCurrent: 1,
                userPageSize: 5,
                userTotal: 0,
                userSearchContent: '' ,
                loading: false

            }
        },
        props: {
            zyArray: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            ...mapGetters('publicTableStore', [
                'getTableTwoDataArray',
                'getRowData',
            ]),
        },
        mounted() {
            this.getDepartmentPerson();
        },
        methods: {
            ...mapMutations('publicTableStore', [
                'setUpdateStore',
            ]),
            deleteUser (params) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '确认要删除吗???',
                    onOk: () => {
                        console.log('fasdfasdfasdfasdfasdf',params.row);
                        if (params.row.yhxtm){
                            let data = this.$store.state.publicTableStore.TableTwoDataArray;
                            for (let  i = 0 ; i<data.length ; i++ ) {
                                if (data[i].yhxtm === params.row.yhxtm){
                                    data.splice(i ,1);
                                }
                            }
                            this.setUpdateStore({
                                types: 'TableTwoDataArray',
                                value: data
                            })
                            console.log(data)
                        } else {

                            deleteUser(params.row.xtm).then(res => {
                                if (res.code === '200'){
                                    this.$Message.success(res.msg);
                                    this.getDepartmentPerson(this.bmXtm);

                                } else {
                                    this.$Message.warning(res.msg);
                                }
                            }).catch(err => {
                                this.$Message.error(this.MSGCONTENT.errMsg);
                            })
                        }
                    },
                });

            },
            addPersonnel() {
                this.isAddPerson = true;
                this.getUserList ();
                this.$emit('on-add-person' , this.isAddPerson)
            },
            getUserList () {
                let filtrateXtm  = [];
                console.log(this.getTableTwoDataArray.length>0);
                console.log(this.bmXtm);
                    if(this.bmXtm) {
                        console.log('121212121212121212121212121212121' , this.total);
                        getDepartmentPerson(this.bmXtm, 1, this.total, this.searchContent).then(res => {
                            console.log('afsdf', res.data);
                            if (res.data) {
                                res.data.map(item => {
                                    filtrateXtm.push(item.u_xtm)
                                })
                                let twoDataArray =  this.getTableTwoDataArray
                                console.log(twoDataArray);
                                twoDataArray.map(item => {
                                    if (item.yhxtm) {
                                        filtrateXtm.push(item.yhxtm)
                                    }
                                    if (item.u_xtm) {
                                        filtrateXtm.push(item.u_xtm)
                                    }
                                })
                                filtrateXtm = [... new Set(filtrateXtm)]
                                console.log('44444444444444444444' , filtrateXtm);
                                this.getUserList2(filtrateXtm);
                                return;
                            }
                            // this.isAddPerson = false;
                        }).catch(err => {
                            this.isAddPerson = false;
                            this.$Message.error(this.MSGCONTENT.errMsg);
                        })
                    }
                    let twoDataArray =  this.getTableTwoDataArray
                    console.log(twoDataArray);
                    twoDataArray.map(item => {
                            if (item.yhxtm) {
                                filtrateXtm.push(item.yhxtm)
                            }
                            if (item.u_xtm) {
                                filtrateXtm.push(item.u_xtm)
                            }
                    })
                    filtrateXtm = [... new Set(filtrateXtm)]
                    console.log('44444444444444444444' , filtrateXtm);
                    this.getUserList2(filtrateXtm);
                // }
            },
            getUserList2(filtrateXtm){
                this.loading = true;
                getUserList(this.userCurrent, this.userPageSize, this.userSearchContent ,null , JSON.stringify(filtrateXtm)).then(res => {
                    if (res.code === '200') {
                        this.userTotal = res.totalCount
                        this.tableUserData =res.data
                    } else if (res.code === '500') {
                        this.$Message.error(this.MSGCONTENT.xtErrMsg);
                    } else {
                        this.tableUserData =[]
                        this.$Message.error(res.msg);
                    }
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.$Message.error(this.MSGCONTENT.errMsg);
                })
            },
            getDepartmentPersons () {
                let filtrateXtm  = [];
                getDepartmentPerson(this.bmXtm , 1, this.total, this.searchContent).then(res => {

                    console.log('afsdf' , res.data);
                    if (res.data){
                        res.data.map(item => {
                            filtrateXtm.push(item.u_xtm)
                        })
                        return filtrateXtm;
                    }
                }).catch(err => {
                    this.$Message.error(this.MSGCONTENT.errMsg);
                    return filtrateXtm;
                })

            },
            onInputSearch(content) {
                this.searchContent = content;
            },
            onInputSearchUser(content) {
                this.userSearchContent = content;
            },
            //改变当前页
            changePage(page) {
                this.current = page;
                this.getDepartmentPerson(this.bmXtm);
            },
            //改变当前页
            changePageUser(page) {
                this.userCurrent = page;
                this.getUserList();
            },
            //改变页大小
            pageSizeChange(size) {
                this.pageSize = size;
                this.getDepartmentPerson(this.bmXtm);
            },
            //改变页大小
            pageSizeChangeUser(size) {
                this.userPageSize = size;
                this.getUserList();
            },
            clickSearch(content) {
                console.log('搜索的内容', content);
                this.current = 1;
                this.getDepartmentPerson(this.bmXtm);
            },
            clickSearchUser(content) {
                console.log('搜索的内容', content);
                this.userCurrent = 1;
                this.getUserList();
            },
            getDepartmentPerson(gwXtm) {
                if (gwXtm) {
                    this.bmXtm = gwXtm;
                    getDepartmentPerson(gwXtm , this.current, this.pageSize, this.searchContent).then(res => {
                        this.total = res.totalCount
                        this.setUpdateStore({
                            types: 'TableTwoDataArray',
                            value: res.data
                        })
                    }).catch(err => {
                        this.loading = false;
                        this.$Message.error(this.MSGCONTENT.errMsg);
                    })
                }

            },
            onSelect(selection, row) {
                // let objCopy = this.$store.state.publicTableStore.selectRwo;
                // if (selection.length > objCopy.length){
                //     objCopy.push(row)
                // }
                // objCopy.map(item => {
                //     // if (!item.u_xtm){
                //     //     alert('row.u_xtm' , row.u_xtm);
                //     //     item[_checked] = true
                //     // } else {
                //     //     if (row.u_xtm === item.u_xtm) {
                //     //         item._checked = true
                //     //     }
                //     // }
                //     if (row.u_xtm === item.u_xtm) {
                //         item._checked = true
                //     }
                //     return item;
                // })
                // this.setUpdateStore({
                //     types: 'selectRwo',
                //     value: objCopy
                // })
                // console.log(this.$store.state.publicTableStore.selectRwo)
            },
            selectCancel(selection, row) {
                // let objCopy = Object.assign([],  this.$store.state.publicTableStore.selectRwo);
                // console.log(objCopy);
                // objCopy.map(item=> {
                //     if (row.u_xtm === item.u_xtm){
                //         item._checked = false
                //     }
                //     return item;
                // })
                // this.setUpdateStore({
                //     types: 'selectRwo',
                //     value: objCopy
                // })
            },
            selectAll(selection) {
                // selection.map(item => {
                //     item._checked = true
                //     return item;
                // })
                // this.setUpdateStore({
                //     types: 'selectRwo',
                //     value: selection
                // })

            },
            selectCancelAll(selection) {
                // let objCopy = Object.assign([], this.$store.state.publicTableStore.selectRwo);
                //   objCopy.map(item=> {
                //       item._checked = false
                //       return item;
                //   })
                //   this.setUpdateStore({
                //       types: 'selectRwo',
                //       value: objCopy
                //   })
                //   console.log('fasd ' , objCopy);
            },
            clean () {
                this.isAddPerson = false
                this.userCurrent =1;
            },
            okClean(){
                this.isAddPerson = false
                this.bmXtm = '';
                this.current =1;
                this.total = 0
            },
            selectionChange(selection) {
                this.$emit('selectUser' , selection);
            }
        }
    }
    // function unique(array) {
    //      return Array.from(new Set(array));;
    // }
</script>

<style scoped>

    .my-content {
        justify-content: start;
        margin: 0px auto;
        width: 100%;

    }

    .my-contentOne {
        margin-bottom: 10px;
    }
    .post-info {
        display: flex;
        flex-direction: column;

    }
</style>
