import axios from '@/libs/api.request'
import {getYhxtm} from '@/libs/util'
export const getList = (type , page , pageSize , searchContent , searchCol , parentxtm) => {
    return axios.request({
        url: '/appservlet/tour/tourmanager/plan',
        data: {
            requestdir: 'tour.tourmanager.plan',
            requesttype: 'PlanManager',
            type,
            pageNum : page,
            perPage : pageSize ,
            searchContent,
            whereCase :searchCol ,
            yhxtm:  getYhxtm(),
            parentxtm
        },
        method: 'post',
    })
};
export const addData = (type , data , parentxtm)=> {
    return axios.request({
        url: '/appservlet/tour/tourmanager/plan',
        data: {
            requestdir: 'tour.tourmanager.plan',
            requesttype: 'PlanManagerAdd',
            type,
            data :JSON.stringify(data),
            parentxtm,
            yhxtm:  getYhxtm(),
        },
        method: 'post',
    })
}
export const deleteData = (type ,xtm)=> {
    return axios.request({
        url: '/appservlet/tour/tourmanager/plan',
        data: {
            requestdir: 'tour.tourmanager.plan',
            requesttype: 'PlanManagerDelete',
            xtm,
            type
        },
        method: 'post',
    })
}
export const implData = (data) => {
    return axios.request({
        url: '/appservlet/tour/tourmanager/plan',
        data: {
            requestdir: 'tour.tourmanager.plan',
            requesttype: 'PlanManager',
            type: '5',
            pageNum : 'null',
            perPage : 'null' ,
            yhxtm:  getYhxtm(),
            data: JSON.stringify(data)
        },
        method: 'post',
    })
};