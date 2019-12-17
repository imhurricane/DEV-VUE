<template>

  <div>
    <Card title="基础信息" style="margin: 10px 10px auto 10px;" shadow>
      <Form :model="userInfo" :label-width="120" inline>
        <Row>
          <Col span="12">
            <FormItem label="用户名">
              <Input v-model="userInfo.userLoginName"  @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="年龄">
              <Input v-model="userInfo.age" type="number"  @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="昵称">
              <Input v-model="userInfo.userNameCh"  @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别">
<!--              <Input v-model="userInfo.sex"  @change.native="handlerChange" placeholder="Enter something..."></Input>-->
              <i-switch v-model="userInfo.sex" @on-change="handlerChange" size="large">
                <span slot="open">女</span>
                <span slot="close" >男</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="上次登录时间">
              <Input v-model="userInfo.lastLoginTime"  @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用户ID">
              <Input v-model="userInfo.userId"  @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card title="更多信息" style="margin: 10px 10px auto 10px;min-height: 400px" shadow>

<!--      <Form :model="formItem" :label-width="120" inline>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="12">-->
<!--            <FormItem label="Input">-->
<!--              <Input v-model="formItem.input" placeholder="Enter something..."></Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--      </Form>-->
    </Card>
    <dev-footer/>
    <Affix :offset-bottom="0">
      <Card style="text-align: right">
        <Button type="primary" class="ivu-btn ivu-btn-primary" @click="closeCurrentPage()">
          <span>确定</span>
        </Button>
      </Card>
    </Affix>
  </div>

</template>

<script>
import DevFooter from '../../../../my-components/DevTableFooter'
import { addUser } from '../../../../api/userInfoConfig'
export default {
  name: 'userDetail',
  components: { DevFooter },
  data () {
    return {
      isChanged: false,
      userInfo: {
        userLoginName: '',
        age: '',
        lastLoginTime: '',
        lastOperateTime: '',
        sex: false,
        userId: '',
        userNameCh: '',
        userPassword: ''
      }
    }
  },
  props: {},
  mounted () {
    if (this.$route.params.flag) {
      this.queryParams()
    }
  },
  methods: {
    handlerChange (e) {
      this.isChanged = true
    },
    queryParams () {
      this.userInfo = this.$route.params.userInfo
      console.log('userInfo', this.$route.params.userInfo)
    },
    closeCurrentPage () {
      if (this.isChanged) {
        addUser(this.userInfo).then(res => {
          console.log(res)
          this.$router.go(-1)
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$router.go(-1)
        // this.$router.push('menuInfo')
      }
    }
  }
}

</script>

<style scoped>

</style>
