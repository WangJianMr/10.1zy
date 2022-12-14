import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/category/search',
        method:'post',
        data,
    })
}
export const getAdd =(data)=>{
    return request({
        url:'/article/category',
        method:'post',
        data,
    })
}
export const getComp =(id)=>{
    return request({
        url:`/article/category/${id}`,
        method:'get',
    })
}
export const getCompOk =()=>{
    return request({
        url:`/article/category`,
        method:'put',
    })
}
export const getdel =(id)=>{
    return request({
        url:`/article/category/${id}`,
        method:'DELETE',
    })
}