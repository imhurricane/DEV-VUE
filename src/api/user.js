import axios from '../libs/api.request'
import md5 from 'md5'
import config from '@/config'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'userInfo/login',
    data: {
      userName: userName,
      password: md5(password),
      systemName: config.systemName
    },
    method: 'post'
  })
}

export const getAccess = (yhxtm) => {
  var infoReturn = axios.request({
    url: 'userInfo/getAccess',
    params: {
      systemName: config.systemName
    },
    method: 'post'
  })
  return infoReturn
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
