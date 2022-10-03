import request from '../utils/request'
export const getAllList =(data)=>{
    return request({
        url:'/article/article/search',
        method:'post',
        data,
    })
}
export const getExam =(id)=>{
    console.log(id);
    return request({
        url:`/article/article/${id}`,
        method:'get',
    })
}
export const getLabelExam =()=>{
    return request({
        url:`/article/category/label/list`,
        method:'get',
    })
}
export const getPassBy =(id)=>{
    return request({
        url:`/article/article/audit/success/${id}`,
        method:'get',
    })
}
export const getNoPassBy =(id)=>{
    return request({
        url:`/article/article/audit/fail/${id}`,
        method:'get',
    })
}