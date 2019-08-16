export default {
  namespaced: true,
  // 存数据
  state: {
    rowData: {}, // 巡检计划信息
    modalTitle: '巡检区域信息',
    isAddOrUpdate: 1, // 1为添加 2为修改 3区域 4设备
    goToData: {}, // 区域
    goToSbData: {}, // 设备
    goToXmData: {}, // 项目
    modalLoading: false,
    isShowModal: false,
    isTabsShow: false
  },
  // 获取数据
  getters: {
    getGoToData: state => {
      return state.goToData
    },
    getSbData: state => {
      return state.goToSbData
    },
    getXmData: state => {
      return state.goToXmData
    }
  },
  // 改变状态方法
  mutations: {
    setUpdateStore (state, payload) {
      console.log('提交的数据', payload)
      state[payload.types] = payload.value
    },
    openModalAndTab (state) {
      // state.modalLoading = true
      state.isShowModal = true
      state.isTabsShow = true
    },
    closeModalAndTab (state) {
      state.isShowModal = false
      state.modalLoading = false
      state.isTabsShow = false
    }
  },
  actions: {
    updateStoreAction ({ commit, state }, products) {
      commit('setUpdateStore', products)
    }
  }
}
