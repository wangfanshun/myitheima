import request from '@/utils/request'
export const channels=()=>{
    return request({
        method:'get',
        url:'/v1_0/channels'
    })
}