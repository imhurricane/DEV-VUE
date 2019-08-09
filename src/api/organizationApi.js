import axios from '../libs/api.request'
import {getYhxtm} from '@/libs/util'
export const getList = () => {
    return axios.request({
        url: '/appservlet/tour/organization',
        data: {
            requestdir: 'tour.organization',
            requesttype: 'OrganizationServlet',
            userXtm: getYhxtm(),
            type: '1',
        },
        method: 'post',
    })
};
export const detail = (xtm , source) => {
    return axios.request({
        url: '/appservlet/tour/organization',
        data: {
            requestdir: 'tour.organization',
            requesttype: 'OrganizationServlet',
            xtm: xtm,
            source: source,
            type: '2',
        },
        method: 'post',
    })
};

export const update = (data , source) => {
    return axios.request({
        url: '/appservlet/tour/organization',
        data: {
            requestdir: 'tour.organization',
            requesttype: 'OrganizationServlet',
            data: JSON.stringify(data),
            source: source,
            type: '3',
        },
        method: 'post',
    })
};
export const deleteOrg = (xtm , source) => {
    return axios.request({
        url: '/appservlet/tour/organization',
        data: {
            requestdir: 'tour.organization',
            requesttype: 'OrganizationServlet',
            xtm: xtm,
            source: source,
            type: '4',
        },
        method: 'post',
    })
};
export const add = (data , source , paternalXtm) => {
    return axios.request({
        url: '/appservlet/tour/organization',
        data: {
            requestdir: 'tour.organization',
            requesttype: 'OrganizationServlet',
            data: JSON.stringify(data),
            userXtm: getYhxtm(),
            source: source,
            paternalXtm: paternalXtm,
            type: '5',
        },
        method: 'post',
    })
};
