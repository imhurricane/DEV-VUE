export default {
  namespaced: true,
  // 存数据
  state: {
    rowData: {},
    TableDataArray: [],
    TableTwoDataArray: [],
    selectRwo: [] // 选中的行
  },
  // 获取数据
  getters: {
    getRowData: state => {
      return state.rowData === undefined ? {} : state.rowData
    },
    getTableDataArray: state => {
      return state.TableDataArray
    },
    getTableTwoDataArray: state => {
      return state.TableTwoDataArray
    }
  },
  // 改变状态方法
  mutations: {
    setUpdateStore (state, payload) {
      console.log('提交的数据', payload)
      state[payload.types] = payload.value
    },
    /**
         * 修改信息单个
         * @param state
         * @param payload
         */
    updateRowData: (state, payload) => {
      let prop = payload.types
      let value = payload.value
      state.rowData[prop] = value
      console.log('修改之后得值', state.rowData)
    }
  },
  actions: {
    // updateUserInfoAction ({ commit, state }, products) {
    //     commit('updateUserInfo' ,products.products)
    // }
  }
}
