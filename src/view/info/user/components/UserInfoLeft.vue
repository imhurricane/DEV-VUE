<template>
    <div class="user-info-left">
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">用户名：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.dlm" placeholder="用户名"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">姓名：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.description" placeholder="姓名"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">密码：</Col>
            <Col :xs="14" :sm="16">
                <Input
                        type="password"
                        v-model="getRowData.pwd"
                        placeholder="密码"
                        />
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">确认密码：</Col>
            <Col :xs="14" :sm="16">
                <Input type="password" v-model="getRowData.ispwd"
                       placeholder="确认密码"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">职务：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.zw" placeholder="职务"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">所属机构：</Col>
            <Col :xs="14" :sm="16">
                <Select @on-clear="selectClear('jg')" v-model="getRowData.jg"  clearable>
                    <template v-for="org in getOrgDataArray">
                        <Option :value="org.id">{{org.name}}</Option>
                    </template>
                </Select>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">所属地点：</Col>
            <Col :xs="14" :sm="16">
                <Select
                        @on-clear="selectClear('site')"
                        @on-change="siteChange"
                        :disabled="getRowData.jg== undefined ||getRowData.jg== null || getRowData.jg== ''  "
                        v-model="getRowData.site"  clearable>
                    <template v-for="site in getSiteDataArray">
                        <Option :value="site.id">{{site.name}}</Option>
                    </template>
                </Select>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">所属部门：</Col>
            <Col :xs="14" :sm="16">
                <Cascader :disabled="getRowData.site== undefined ||getRowData.site== null || getRowData.site== ''  "
                          change-on-select
                          :render-format="format"
                          :data="deptData"
                          v-model="getRowData.dept"
                          >

                </Cascader>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">所属专业：</Col>
            <Col :xs="14" :sm="16">
                <Select placement="top"  v-model="getRowData.zy" placeholder="请选择"
                         clearable>

                    <template v-for="zy in zyArray">
                        <Option :value="zy.xtm">{{zy.description}}</Option>
                    </template>
                </Select>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {getList} from '@/api/zyApi'
    import {getDeptInfoList} from '@/api/userInfoConfig'
    import DropdownUtil from "@/util/DropdownUtil";

    export default {
        name: "UserInfoLeft",
        data() {
            return {
                deptData: [],
                zy: null,
                ktStart: false,
                glAddress: true,
                // bm: this.$store.getters['userStoreTwo/getRowData'].bm || '请选择部门',
                // bj: this.$store.getters['userStoreTwo/getRowData'].bj || '请选择班组'
                zyArray: [],
            }
        },
        components: {
            DropdownUtil
        },
        methods: {
            getDeptList(xtm) {
                // this.$forceUpdate();
                console.log('地点', xtm);
                console.log('刷新部门信息');
                if (xtm == undefined) {
                    this.deptData = [];
                } else {
                    getDeptInfoList(xtm).then(res => {
                        console.log('部门信息', res.data);
                        this.deptData = res.data
                    })
                }

            },
            format(labels, selectedData) {
                console.log('发射点发');
                console.log("labels", labels);
                console.log("selectedData", selectedData);
                const index = labels.length - 1;
                return labels[index];
            },
            updateUser(event, type) {
                this.$store.commit({
                    type: 'userStore/updateUserInfo',
                    types: type,
                    value: event.target.value
                });
            },
            clickBm(name) {
                alert(name);
                console.log(name);
            },
            clear() {
                alert('清除信息');
            },
            siteChange(value) {
                if (value !== undefined) {
                    this.getDeptList(value)
                }
            },
            zyChange(value) {
                this.$store.commit({
                    type: 'userStore/updateUserInfo',
                    types: 'zy',
                    value: value
                });
            },
            // switchChange(value, type) {
            //     if (type === 'kt') {
            //         value = value ? 'Y' : 'N'
            //     }
            //     if (type === 'glszd') {
            //         value = value ? '1' : '0'
            //     }
            //     this.$store.commit({
            //         type: 'userStoreTwo/updateUserInfo',
            //         types: type,
            //         value: value
            //     });
            // },
            selectClear(type) {
                if ('jg') {
                    this.$store.commit({
                        type: 'userStoreTwo/updateUserInfo',
                        types: 'site',
                        value: null
                    });
                    this.$store.commit({
                        type: 'userStoreTwo/updateUserInfo',
                        types: 'dept',
                        value: []
                    });
                }
                if ('site') {
                    this.$store.commit({
                        type: 'userStoreTwo/updateUserInfo',
                        types: 'dept',
                        value: []
                    });
                }
            },
            getZyList() {
                if (this.zyArray.length === 0) {
                    getList(1, 100).then(res => {
                        console.log('专业', res.data);
                        this.zyArray = res.data
                    })
                }
            }
        },
        computed: {
            getRowData() {
                if (this.$store.getters['userStoreTwo/getRowData'] === undefined) {
                    return {};
                }
                // if (this.$store.getters['userStoreTwo/getRowData'].site !== undefined) {
                //     this.getDeptList(this.$store.state.userStoreTwo.rowData.site)
                // }
                return this.$store.getters['userStoreTwo/getRowData'];
            },
            getOrgDataArray() {
                return this.$store.getters['userStoreTwo/getOrgDataArray']
            },
            getSiteDataArray() {
                return this.$store.getters['userStoreTwo/getSiteDataArray']
            },
        },
        mounted() {
            this.getZyList();

        }

    }
</script>

<style scoped>
    .user-info-left {
        width: 50%;
        height: 100%;
    }

    .content-item {
        height: 32px;
        margin-bottom: 20px;
    }

    .content-item:last-child {
        margin-bottom: 0px;
    }
</style>
