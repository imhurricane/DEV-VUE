import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import userStore from './module/userStore'
import userStoreTwo from './module/userStoreTwo'
import PublicTableStore from "./module/PublicTableStore";
import tourplanStore from "./module/tourplanStore";
import tourtaskStore from "./module/tourtaskStore";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    userStore,
    userStoreTwo:userStoreTwo,
    publicTableStore:PublicTableStore,
    tourplanStore,
    tourtaskStore
  }
})
