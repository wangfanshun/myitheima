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