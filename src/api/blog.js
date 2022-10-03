import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/search',
        method:'post',
        data,
    })
}
export const getExam =(id)=>{
    console.log(id);
    return request({
        url:`/article/${id}`,
        method:'get',
    })
}
export const getLabelExam =()=>{
    return request({
        url:`/category/label/list`,
        method:'get',
    })
}
export const getPassBy =(id)=>{
    return request({
        url:`/article/audit/success/${id}`,
        method:'get',
    })
}
export const getNoPassBy =(id)=>{
    return request({
        url:`/article/audit/fail/${id}`,
        method:'get',
    })
}