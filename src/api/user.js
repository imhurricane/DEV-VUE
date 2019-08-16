import axios from '../libs/api.request'
import md5 from 'md5'
import config from '@/config'
const { baseUri } = config
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: baseUri + '/login',
    data: {
      requestdir: 'tour',
      requesttype: 'LoginServlet',
      userName: userName,
      password: md5(password),
      // password: password
      systemName: config.systemName
    },
    method: 'post'
  })
}

export const getAccess = (yhxtm) => {
  var infoReturn = axios.request({
    url: baseUri,
    params: {
      requestdir: 'tour',
      requesttype: 'AuthServlet',
      yhxtm,
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
