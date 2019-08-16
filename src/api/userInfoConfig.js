import axios from '@/libs/api.request'
import { getYhxtm } from '@/libs/util'
import config from '@/config'
const { baseUri } = config
export const getUserList = (page, pageSize, searchContent, searchCol, filtrateXtm) => {
  return axios.request({
    url: baseUri + '/info/user',
    // url: '/appservlet/tour',
    data: {
      requestdir: 'tour.info.user',
      requesttype: 'UserInfoServlet',
      type: '1',
      pageNum: page,
      perPage: pageSize,
      searchContent,
      filtrateXtm,
      searchCol
    },
    method: 'post'
  })
}
export const addUser = (data) => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.info.user',
      requesttype: 'UserInfoServlet',
      type: '2',
      xtm: getYhxtm(),
      data: JSON.stringify(data)
    },
    method: 'post'
  })
}
export const updateUser = (data) => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.info.user',
      requesttype: 'UserInfoServlet',
      type: '4',
      xtm: getYhxtm(),
      data: JSON.stringify(data)
    },
    method: 'post'
  })
}
export const detail = (xtm) => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.info.user',
      requesttype: 'UserInfoServlet',
      type: '5',
      xtm: xtm
    },
    method: 'post'
  })
}
export const deletUsers = (xtmArray) => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.info.user',
      requesttype: 'UserInfoServlet',
      type: '3',
      xtmArray: JSON.stringify(xtmArray)
    },
    method: 'post'
  })
}
export const getDeptInfo = () => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.organization',
      requesttype: 'OrganizationServlet',
      userXtm: getYhxtm(),
      type: '6'
    },
    method: 'post'
  })
}
export const getDeptInfoList = (siteXtm) => {
  return axios.request({
    url: '/appservlet/tour/info/user',
    data: {
      requestdir: 'tour.organization',
      requesttype: 'OrganizationServlet',
      siteXtm: siteXtm,
      type: '7'
    },
    method: 'post'
  })
}
