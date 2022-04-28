import request from '@/utils/request'
// import store from '../store/index'
export const getUserInfo=()=>{
    return request({
        method:'get',
        url:'/v1_0/user',
            // 发送请求头数据
    //     headers: {
    // //   // 注意：该接口需要授权才能访问
    // //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //     Authorization: `Bearer ${store.state.user.token}`
    //  }
    })
}
//关注用户
export const addfollow=userId=>{
    return request({
        method:'post',
        url:'/v1_0/user/followings',
        data:{
            target:userId
        }
    })
}
//取消关注
export const removefollow=target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
    })
}
//收藏文章
export const collectArt=target=>{
    return request({
        method:'post',
        url:'/v1_0/article/collections',
        data:{
            target
        }
    })
}
//取消收藏文章
export const cancelColl=target=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${target}`,
    })
}
export const getUserProfile = target => {
    return request({
      method: 'GET',
      url: '/v1_0/user/profile'
    })
  }
/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
    return request({
      method: 'PATCH',
      url: '/v1_0/user/photo',
      data
    })
  }
/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
    return request({
      method: 'PATCH',
      url: '/v1_0/user/profile',
      data
    })
  }