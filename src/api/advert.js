import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/advert/search',
        method:'post',
        data,
    })
}
export const getadvertDel =(id)=>{
    return request({
        url:`/article/advert/${id}`,
        method:'DELETE',
    })
}
export const getSubOk =(data)=>{
    return request({
        url:`/article/advert`,
        method:'POST',
        data
    })
}
export const getcomp =(id)=>{
    return request({
        url:`/article/advert/${id}`,
        method:'GET',
    })
}
export const getVComp =()=>{
    return request({
        url:`/article/advert`,
        method:'put',
    })
}