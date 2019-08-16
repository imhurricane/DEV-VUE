import axios from '@/libs/api.request'
import { getYhxtm } from '@/libs/util'
export const getZyList = (type) => {
  return axios.request({
    url: '/appservlet/tour/info/comm',
    data: {
      requestdir: 'tour.info.comm',
      requesttype: 'RequestNetForCommData',
      type,
      yhxtm: getYhxtm()
    },
    method: 'post'
  })
}
