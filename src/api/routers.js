import axios from '@/libs/api.request'
import config from '@/config'
export const getMenuData = (user) => {
  return axios.request({
    url: '/appservlet/tour',
    params: {
      requestdir: 'tour',
      requesttype: 'GetMenuServelet',
      systemName: config.systemName
    },
    method: 'post'
  })
}
