import axios from '@/libs/api.request'
export const getList = (page, pageSize, searchContent, searchCol) => {
  return axios.request({
    url: '/appservlet/tour/zy',
    data: {
      requestdir: 'tour.zy',
      requesttype: 'ZyServlet',
      type: '1',
      pageNum: page,
      perPage: pageSize,
      searchContent,
      searchCol
    },
    method: 'post'
  })
}
export const addOrUpdateData = (data) => {
  return axios.request({
    url: '/appservlet/tour/zy',
    data: {
      requestdir: 'tour.zy',
      requesttype: 'ZyServlet',
      type: '2',
      data: JSON.stringify(data)
    },
    method: 'post'
  })
}
export const deleteData = (xtmArray) => {
  return axios.request({
    url: '/appservlet/tour/zy',
    data: {
      requestdir: 'tour.zy',
      requesttype: 'ZyServlet',
      type: '3',
      xtmArray: JSON.stringify(xtmArray)
    },
    method: 'post'
  })
}
