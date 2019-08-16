import { login, logout, getAccess } from '@/api/user'
import { setToken, getToken, setYhxtm, getYhxtm, localSave } from '@/libs/util'
import { initRouter } from '@/libs/router-util'
export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    yhxtm: getYhxtm()
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setYhxtm (state, yhxtm) {
      state.yhxtm = yhxtm
      setYhxtm(yhxtm)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res
          if (data.code === '200' && data.token) {
            commit('setToken', data.token)
            commit('setYhxtm', data.yhxtm)
            console.log(data.user)
            localSave('userInfo', JSON.stringify(data.user))
            console.log(JSON.parse(localStorage.getItem('userInfo')).userName)
            initRouter()
            resolve()
          } else {
            alert(data.msg)
            reject(new Error('msg错误'))
          }
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        commit('setYhxtm', '')
        commit('setHasGetInfo', false)
        localSave('dynamicRouter', [])
        localSave('userInfo', null)
        location.reload()
        resolve()
      })
    },
    // 获取用户权限相关信息
    getAccess ({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          getAccess(state.yhxtm).then(res => {
            const data = res
            commit('setToken', data.token)
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
