import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/system/role/search',
        method:'post',
        data,
    })
}
export const getAdd =(data)=>{
    return request({
        url:'/system/role',
        method:'post',
        data,
    })
}
export const getcomp =(id)=>{
    return request({
        url:`/system/role/${id}`,
        method:'get',
    })
}
export const getcompOk =(data)=>{
    return request({
        url:`/system/role`,
        method:'put',
        data,
    })
}
export const getdel =(id)=>{
    return request({
        url:`/system/role/${id}`,
        method:'DELETE',
    })
}
export const getlim =(id)=>{
    return request({
        url:`/system/role/${id}/menu/ids`,
        method:'GET',
    })
}
export const gettree =(data)=>{
    return request({
        url:`/system/menu/search`,
        method:'post',
        data,
    })
}
export const gettreeOk =(id,data)=>{
    return request({
        url:`/system/role/${id}/menu/save`,
        method:'post',
        data,
    })
}