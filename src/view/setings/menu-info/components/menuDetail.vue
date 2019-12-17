<template>

  <div>
    <Card title="基础信息" style="margin: 10px 10px auto 10px;" shadow>
      <Form :model="this.menuInfo" :rules="menuValidate" :label-width="120" inline>
        <Row>
          <Col span="12">
            <FormItem label="名称" prop="name">
              <Input v-model="menuInfo.name" placeholder="Enter something..." @change.native="handlerChange"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="地址">
              <Input v-model="menuInfo.path" placeholder="Enter something..." @change.native="handlerChange"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="组件">
              <Input v-model="menuInfo.component" placeholder="Enter something..." @change.native="handlerChange"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="父菜单">
              <Select v-model="menuInfo.parentId" @on-change="handlerChange" @click.native="queryParentMenus" placeholder="Select your menu level" style="width: 162px">
<!--                <Option v-for="item in parentMenus" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <Option v-for="(option, index) in parentMenus" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="序号">
              <Input v-model="menuInfo.xh" type="number" placeholder="Enter something..." @change.native="handlerChange"></Input>
            </FormItem>
          </Col>
          <Col span="12">
          </Col>
        </Row>

      </Form>
    </Card>

    <Card title="更多信息" style="margin: 10px 10px auto 10px;min-height: 400px" shadow>
      <Form :model="menuInfo" :label-width="120" inline>
        <Row>
          <Col span="12">
            <FormItem label="图标">
              <Input v-model="menuInfo.meta.icon" @change.native="handlerChange" type="text" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="菜单title">
              <Input v-model="menuInfo.meta.title" @change.native="handlerChange" placeholder="Enter something..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="缓存">
              <i-switch v-model="menuInfo.meta.notCache" @on-change="handlerChange" size="large">
                <span slot="open">false</span>
                <span slot="close">true</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="菜单级别">
<!--              <Input v-model="menuInfo.level" placeholder="Enter something..."></Input>-->
              <Select v-model="menuInfo.level" @on-change="handlerChange" placeholder="Select your menu level" style="width: 162px">
                <Option v-for="item in levelOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
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
import { saveMenu } from '@/api/routers'
import { queryParentMenus } from '../../../../api/routers'

export default {
  name: 'menuDetail',
  components: { DevFooter },
  data () {
    return {
      isChanged: false,
      menuInfo: {
        name: '',
        path: '',
        component: '',
        parentId: '',
        meta: {
          icon: '',
          title: '',
          notCache: false,
          access: ''
        },
        level: '',
        xh: 1
      },
      menuValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      },
      parentMenus: [],
      levelOptions: [
        {
          value: 0,
          label: '根菜单'
        },
        {
          value: 1,
          label: '一级菜单'
        },
        {
          value: 2,
          label: '二级菜单'
        },
        {
          value: 3,
          label: '三级菜单'
        }
      ]
    }
  },
  mounted () {
    if (this.$route.params.flag) {
      this.queryParams()
    }
    this.queryParentMenus()
  },
  methods: {
    handlerChange (e) {
      this.isChanged = true
    },
    queryParams () {
      this.menuInfo = this.$route.params.menuInfo
    },
    closeCurrentPage () {
      if (this.isChanged) {
        saveMenu(this.menuInfo).then(res => {
          console.log(res)
          this.$router.go(-1)
          // this.$router.push('menuInfo')
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$router.go(-1)
        // this.$router.push('menuInfo')
      }
    },
    queryParentMenus () {
      if (this.parentMenus.length === 0) {
        if (this.menuInfo.level === '') this.menuInfo.level = 0
        queryParentMenus(this.menuInfo.level).then(res => {
          if (res.code === 200) {
            this.parentMenus = res.data
          }
        }).catch(err => {
          this.loading = false
          this.$Message.error(this.MSGCONTENT.errMsg)
        })
      }
    }

  }
}

</script>

<style scoped>

</style>
