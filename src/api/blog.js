import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/search',
        method:'post',
        data,
    })
}