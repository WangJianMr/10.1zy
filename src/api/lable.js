import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/label/search',
        method:'post',
        data,
    })
}
export const getComp =(id)=>{
    return request({
        url:`/article/label/${id}`,
        method:'get',
    })
}
export const getCompOk =()=>{
    return request({
        url:`/article/label`,
        method:'put',
    })
}
export const getdel =(id)=>{
    return request({
        url:`/article/label/${id}`,
        method:'DELETE',
    })
}