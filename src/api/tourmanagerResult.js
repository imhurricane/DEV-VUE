import axios from '@/libs/api.request'
export const implData = (data) => {
    return axios.request({
        url: '/appservlet/fddt',
        data: {
            requestdir: 'fddt',
            requesttype: 'FddtAction',
            type: '1',
            data: JSON.stringify(data)
        },
        method: 'post',
    })
};