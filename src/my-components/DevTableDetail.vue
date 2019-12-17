<template>
  <div>
    <Card title="基础信息" style="margin: 10px 10px auto 10px;" shadow>
      <Form :model="userInfo" :label-width="120" inline>
        <Row>
          <Col span="12">
            <FormItem label="用户名">
              <Input v-model="userInfo.userLoginName" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="年龄">
              <Input v-model="userInfo.age" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="昵称">
              <Input v-model="userInfo.userNameCh" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别">
              <Input v-model="userInfo.sex" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="上次登录时间">
              <Input v-model="userInfo.lastLoginTime" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用户ID">
              <Input v-model="userInfo.userId" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card title="更多信息" style="margin: 10px 10px auto 10px;" shadow>

<!--      <Form :model="userInfo" :label-width="120" inline>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="userInfo.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--      </Form>-->
    </Card>
    <dev-footer/>
    <Affix :offset-bottom="0">
      <Card style="text-align: right">
        <Button type="primary" class="ivu-btn ivu-btn-primary">
          <span>确定</span>
        </Button>
      </Card>
    </Affix>
  </div>

</template>

<script>
import DevHeader from './DevTableHeader'
import DevFooter from './DevTableFooter'

export default {
  name: 'DevTableDetail',
  components: { DevFooter, DevHeader },
  data () {
    return {
      userInfo: {
        // userLoginName: '',
        // age:20,
        // lastLoginTime:'',
        // lastOperateTime:'',
        // sex:'',
        // userId:'',
        // userNameCh:'',
        // userPassword:''
      }
    }
  },
  props: {},
  mounted () {
    this.queryParams()
  },
  methods: {
    queryParams () {
      this.userInfo = this.$store.selectedUserInfo
    }
  }
}

</script>

<style scoped>

</style>
