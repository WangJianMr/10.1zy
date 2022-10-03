import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/category/search',
        method:'post',
        data,
    })
}
export const getAdd =(data)=>{
    return request({
        url:'/category',
        method:'post',
        data,
    })
}
export const getComp =(id)=>{
    return request({
        url:`/category/${id}`,
        method:'get',
    })
}
export const getCompOk =()=>{
    return request({
        url:`/category`,
        method:'put',
    })
}
export const getdel =(id)=>{
    return request({
        url:`/category/${id}`,
        method:'DELETE',
    })
}