import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/label/search',
        method:'post',
        data,
    })
}
export const getComp =(id)=>{
    return request({
        url:`/label/${id}`,
        method:'get',
    })
}
export const getCompOk =()=>{
    return request({
        url:`/label`,
        method:'put',
    })
}
export const getdel =(id)=>{
    return request({
        url:`/label/${id}`,
        method:'DELETE',
    })
}