export default {
    namespaced: true,
    //存数据
    state: {
        rowData: undefined,
        userInfoArray: [],
        siteDataArray: [],
        orgDataArray: [],
    },
    //获取数据
    getters: {
        getRowData: state => {
            return state.rowData === undefined ? {} : state.rowData;
        },
        getSiteDataArray: state => {
            return state.siteDataArray
        },
        getOrgDataArray: state => {
            return state.orgDataArray
        },
    },
    //改变状态方法
    mutations: {
        setSiteDataArray (state, payload) {
            state.siteDataArray = payload
        },
        setOrgDataArray (state, payload) {
            state.orgDataArray = payload
        },
        setUserInfoArray (state, payload) {
            state.userInfoArray = payload
        },
        setRowData (state, payload) {
            state.rowData = payload
        },
        /**
         * 修改信息单个
         * @param state
         * @param payload
         */
        updateUserInfo: (state, payload) => {
            let prop = payload.types;
            let value = payload.value;
            state.rowData[prop] = value
            console.log('修改之后得值' , state.rowData );
        },
    },
    actions: {
        // updateUserInfoAction ({ commit, state }, products) {
        //     commit('updateUserInfo' ,products.products)
        // }
    }
}