import axios from '@/libs/api.request'
import { getYhxtm } from '@/libs/util'
import data from 'echarts/src/visual/aria'
export const getList = (page, pageSize, searchContent, searchCol) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '1',
      pageNum: page,
      perPage: pageSize,
      searchContent: searchContent,
      searchCol
    },
    method: 'post'
  })
}
export const addData = (data, selectRow) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '4',
      data: JSON.stringify(data),
      ryryArray: JSON.stringify(selectRow),
      xtm: getYhxtm()
    },
    method: 'post'
  })
}
export const updateData = (data, selectRow) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '2',
      data: JSON.stringify(data),
      ryryArray: JSON.stringify(selectRow),
      xtm: getYhxtm()
    },
    method: 'post'
  })
}
export const deleteData = (xtmArray) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '3',
      xtmArray: JSON.stringify(xtmArray)
    },
    method: 'post'
  })
}
export const getDepartmentPerson = (gwXtm, page, pageSize, searchContent) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '5',
      pageNum: page,
      perPage: pageSize,
      searchContent: searchContent,
      gwXtm: gwXtm
    },
    method: 'post'
  })
}
export const deleteUser = (xtm) => {
  return axios.request({
    url: '/appservlet/tour/info/postSetting',
    data: {
      requestdir: 'tour.info.postSetting',
      requesttype: 'PostSetting',
      type: '6',
      xtm: xtm
    },
    method: 'post'
  })
}
