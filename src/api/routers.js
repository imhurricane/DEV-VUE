import axios from '@/libs/api.request'
import config from '@/config'
import { getYhxtm } from '../libs/util'

export const getMenuData = (user) => {
  return axios.request({
    url: '/getMenu',
    data: {
      userId: getYhxtm()
    },
    method: 'post'
  })
}

export const saveMenu = (menuInfo) => {
  return axios.request({
    url: '/saveMenu',
    data: {
      userId: getYhxtm(),
      menuInfo: JSON.stringify(menuInfo)
    },
    method: 'post'
  })
}

export const getMenuList = (page, pageSize) => {
  return axios.request({
    url: '/getMenuList',
    data: {
      pageNum: page,
      perPage: pageSize
    },
    method: 'post'
  })
}
export const queryParentMenus = (currentLevel) => {
  return axios.request({
    url: '/queryParentMenus',
    data: {
      currentLevel: currentLevel + ''
    },
    method: 'post'
  })
}

export const removeMenuById = (menuId) => {
  return axios.request({
    url: '/removeMenuById',
    data: {
      menuId: menuId
    },
    method: 'post'
  })
}

export const removeSelection = (selections) => {
  return axios.request({
    url: '/removeSelection',
    data: {
      selections: JSON.stringify(selections)
    },
    method: 'post'
  })
}
