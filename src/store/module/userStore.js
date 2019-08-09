export default {
    namespaced: true,
    //存数据
    state: {
        rowData: undefined,
        isAddOrUpdate: false,
        isUpdate: false, //数据是否已经修改
        tabValue: 'userList',
        userInfoArray: [],
        isSaveOrDelBtn: true , //true 为删除  反正保存,
        selectRowData: [],

    },
    //获取数据
    getters: {
        getRowData: state => {
            return state.rowData === undefined ? {} : state.rowData;
        }
    },
    //改变状态方法
    mutations: {
        addUserInfArray: (state, payload) => {
            state.userInfoArray = payload
        },
        /**
         * 切换tab
         * @param state
         * @param payload
         */
        updateTab: (state, payload) => {
            console.log("切换tab前" , state.rowData);
            console.log("state.isSaveOrDelBtn" , state.isSaveOrDelBtn);
            //判断按钮是否删除还是保存
            if (payload.tabName === 'userList') {
                state.isSaveOrDelBtn = true
            } else {
                state.isSaveOrDelBtn = false
            }
            if ((state.rowData === undefined || state.isUpdate) && state.isSaveOrDelBtn ) {
                if (state.userInfoArray.length > 0) {
                    let row = {...state.userInfoArray[0]};
                    state.rowData = row;
                }
            }
            state.isUpdate = false;
            state.tabValue = payload.tabName
            console.log("切换tab后" , state.rowData);
        },
        /**
         * 修改信息所有
         * @param state
         * @param payload
         */
        updateUserInfoAll: (state, payload) => {
            state.rowData = payload;
            console.log('修改信息所有' , state.rowData);
        },

        /**
         * 修改信息单个
         * @param state
         * @param payload
         */
        updateUserInfo: (state, payload) => {
            let prop = payload.types;
            let value = payload.value;
             state.isUpdate = true;
            if (state.rowData === undefined) {
                state.rowData = {};
            }
            state.rowData[prop] = value
            console.log('修改之后得值' , state.rowData);
        },
        /**
         * 更改添加修改按钮状态
         * @param state
         * @param bool
         */
        updateIsUpdate: (state, bool) => {
            state.isAddOrUpdate = bool
        },

        setSelectRowData : (state , payload) => {
            console.log(payload);
            state.selectRowData = payload
        }
    },
    actions: {
        // updateUserInfoAction ({ commit, state }, products) {
        //     commit('updateUserInfo' ,products.products)
        // }
    }
}