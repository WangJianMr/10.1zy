import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/system/menu/search',
        method:'post',
        data,
    })
}
export const getAddOk =(data)=>{
    return request({
        url:'/system/menu',
        method:'post',
        data,
    })
}
export const getCompInq =(id)=>{
    return request({
        url:`/system/menu/${id}`,
        method:'get',
    })
}
export const getcompOk =(data)=>{
    return request({
        url:'/system/menu',
        method:'put',
        data,
    })
}
export const getDelOk =(id)=>{
    return request({
        url:`/system/menu/${id}`,
        method:'DELETE',
    })
}