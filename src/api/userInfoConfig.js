import axios from '@/libs/api.request'
import { getYhxtm } from '@/libs/util'
export const getUserList = (page, pageSize, searchContent, searchCol, filtrateXtm) => {
  return axios.request({
    url: '/userInfo/getUser',
    data: {
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
    url: '/userInfo/addUser',
    data: {
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

export const deleteUsers = (xtmArray) => {
  return axios.request({
    url: '/userInfo/deleteSelectionsUser',
    data: {
      xtmArray: JSON.stringify(xtmArray)
    },
    method: 'post'
  })
}
export const getDeptInfo = () => {
  return axios.request({
    url: 'userInfo/organization',
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
