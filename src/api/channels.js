import request from '@/utils/request'
//获取用户频道
export const channels=()=>{
    return request({
        method:'get',
        url:'v1_0/user/channels'
    })
}
//获取所有频道
export const getAllChannels=()=>{
    return request({
        methods:'get',
        url:'/v1_0/channels'
    })
}
//删除用户频道数据
export const deleteChannels=(channels)=>{
    return request({
        method:'DELETE',
        url:'v1_0/user/channels',
        channels
    })
}
//添加用户频道列表
export const addUserChannels=(channels)=>{
    return request({
        method:'PATCH',
        url:'v1_0/user/channels',
        data:{
            channels:[channels]
        }
    })
}