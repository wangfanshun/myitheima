import request from '../utils/request'
export const login=data=>request({
    method:'post',
    url:'/v1_0/authorizations',
    data
})
export const codesnd=(mobile)=>request({
    method:'get',
    url:`/mp/v1_0/captchas/${mobile}`,
})