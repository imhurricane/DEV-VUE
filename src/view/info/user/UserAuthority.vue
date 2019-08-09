<template>
    <div class="user-auth">
        <TableUtil
                :columns="columns"
                :tableData="tableData"
                :table-height=400
                :loading-table="loading"
                :isShowExportBtn="false"
                :button-array="[{method: 'addAuth' , content: '添加权限组'}]"
                @addAuth="addAuth"
        />
    </div>
</template>

<script>
    import TableUtil from "../../../util/TableUtil";

    export default {
        name: "UserAuthority",
        components : {
            TableUtil
        },
        data () {
            return {
                columns: [
                    {
                    title: '权限组名称',
                    key: 'authName',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h ,params) => {
                            return h('div' , [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '0px',
                                        fontSize: '16px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                tableData: [
                    {
                       id: '1',
                        authName : '超级管理员'
                    },
                    {
                        id: '2',
                        authName : '管理员'
                    }
                ],
                loading: false
            }
        },
        methods : {
            delete (data) {
                console.log(data);
            },
            addAuth() {
                alert('添加权限组');
            }
        }
    }
</script>

<style scoped>

</style>