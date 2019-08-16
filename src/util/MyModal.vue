<template>
    <div class="my-modal">
        <Modal
                class="my-modal"
                :mask-closable="false"
                :closable="false"
                :value='isShowModal'
                :fullscreen="isFullscreen"
                :width= 'modalWidth'
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <div slot="header" class="model-header" >

                <div class="model-header-text">
                    <span style="font-size: 16px; font-weight: bold">{{modalTitle}}</span>
                </div>
                <div class="model-header-icon">
                    <a v-on:click="modelLargen" style="color: #000" href="#">
                        <Icon size="16" :type="magnifyIcon ? 'md-expand' : 'md-contract'" />
                    </a>
                </div>
                <div class="model-header-icon">
                    <a v-on:click="cancel" style="color: #000" href="#">
                        <Icon size="18" type="md-close" />
                    </a>
                </div>

            </div>
            <div class="modalContent">
                <slot name="modalContent"></slot>
            </div>

            <div slot="footer">
                <i-button type="text" size="large" @click="cancel">{{ cancelText }}</i-button>
                <i-button type="primary" size="large" :loading="modalLoading" @click="ok">{{ okText }}</i-button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'MyModal',
  data () {
    return {
      isFullscreen: false,
      magnifyIcon: true
    }
  },
  props: {
    isShowModal: {
      type: [Boolean, String],
      default () {
        return false
      }
    },
    // 确认按钮加载
    modalLoading: {
      type: [Boolean, String],
      default () {
        return false
      }
    },
    modalWidth: {
      type: [Number, String],
      default () {
        return window.innerWidth - 360
      }
    },
    okText: {
      type: String,
      default () {
        return '确定'
      }
    },
    cancelText: {
      type: String,
      default () {
        return '取消'
      }
    },
    modalTitle: {
      type: String,
      default () {
        return '欢迎使用定制modal'
      }
    }
  },
  mounted () {
    let myModal = document.getElementsByClassName('ivu-modal-content')
    for (let i = 0; i < myModal.length; i++) {
      myModal[i].style.minWidth = window.innerWidth / 2.5 + 'px'
    }
  },
  methods: {
    modelLargen () {
      this.isFullscreen = !this.isFullscreen
      this.magnifyIcon = !this.magnifyIcon
      this.$emit('on-largen', this.isFullscreen)
    },
    ok () {
      this.$emit('on-ok', null)
      this.isFullscreen = false
      this.magnifyIcon = true
      this.$emit('on-largen', this.isFullscreen)
    },
    cancel () {
      this.$emit('on-cancel', null)
      this.isFullscreen = false
      this.magnifyIcon = true
      this.$emit('on-largen', this.isFullscreen)
    }
  },
  watch: {
    isShowModal (val) {
      if (val) {
        let tabListItem = document.getElementsByClassName('tab-list-item')
        console.log(tabListItem.length)
        for (let i = 0; i < tabListItem.length; i++) {
          tabListItem[i].style.maxHeight = window.innerHeight - 350 + 'px'
          tabListItem[i].style.minHeight = window.innerHeight - 350 + 'px'
        }
      }
    },
    isFullscreen (val) {
      let tabListItem = document.getElementsByClassName('tab-list-item')
      if (val) {
        for (let i = 0; i < tabListItem.length; i++) {
          tabListItem[i].style.maxHeight = window.innerHeight - 200 + 'px'
        }
      } else {
        for (let i = 0; i < tabListItem.length; i++) {
          tabListItem[i].style.maxHeight = window.innerHeight - 350 + 'px'
        }
      }
    }
  }
}
</script>

<style scoped>
    .model-header{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .model-header-text {
        text-align: center;
        flex: 1;
    }
    .model-header-icon {
        text-align: right;
        margin-right: 5px;
    }
    .modalContent{
        /*border:  1px red solid;*/
        /*overflow: auto;*/
    }
</style>
