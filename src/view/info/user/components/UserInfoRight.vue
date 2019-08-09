<template>
    <div class="user-info-left">
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">手机号：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.telephone" placeholder="手机号"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">电子邮箱：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.emails" placeholder="电子邮箱"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">备注：</Col>
            <Col :xs="14" :sm="16">
                <Input v-model="getRowData.remark" placeholder="备注"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">创建人：</Col>
            <Col :xs="14" :sm="16">
                <Input disabled v-model="getRowData.cj_username || currentUser" placeholder="创建人"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">创建日期：</Col>
            <Col :xs="14" :sm="16">
                <Input disabled v-model="getRowData.reportdate ||  newDate" placeholder="创建日期"/>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">修改人：</Col>
            <Col :xs="14" :sm="16">
                <Input disabled v-model="getRowData.xg_username || currentUser" placeholder="修改人"/>
            </Col>
        </Row>

        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">修改日期：</Col>
            <Col :xs="14" :sm="16">
                <Input disabled v-model="getRowData.changedate || newDate" placeholder="修改日期"/>
            </Col>
        </Row>

        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">开通状态：</Col>
            <Col :xs="14" :sm="16">
                <i-switch @on-change="switchChange($event , 'kt')" :value='getRowData.kt === "Y" ? true : false '
                          size="large">
                    <span slot="open">开通</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </Col>
        </Row>
        <Row class-name="content-item" type="flex" justify="center" align="middle">
            <Col :xs="8" :sm="6" class="text-right">管理所有地点：</Col>
            <Col :xs="14" :sm="16">
                <i-switch @on-change="switchChange($event , 'glszd')"
                          :value='getRowData.glszd === "1" ? true : false' size="large">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {getDateString} from '@/libs/util'
    import DropdownUtil from "@/util/DropdownUtil";

    export default {
        name: "UserInfoRight",
        data() {
            return {
                zy: null,
                ktStart: false,
                glAddress: true,
                newDate: getDateString(),
                currentUser: JSON.parse(localStorage.getItem('userInfo')).userName
            }
        },
        components: {
            DropdownUtil
        },
        methods: {
            updateUser(event, type) {
                this.$store.commit({
                    type: 'updateUserInfo',
                    types: type,
                    value: event.target.value
                });
            },
            clickBm(name) {
                console.log(name);
            },
            clear() {
                alert('清除信息');
            },
            zyChange(value) {
                console.log(value);
            },
            switchChange(value, type) {
                if (type === 'kt') {
                    value = value ? 'Y' : 'N'
                }
                if (type === 'glszd') {
                    value = value ? '1' : '0'
                }
                this.$store.commit({
                    type: 'userStoreTwo/updateUserInfo',
                    types: type,
                    value: value
                });
            },
        },
        computed: {
            getRowData() {
                if (this.$store.getters['userStoreTwo/getRowData'] === undefined) {
                    return {};
                }
                return this.$store.getters['userStoreTwo/getRowData'];
            }
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
