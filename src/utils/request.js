import axios from 'axios'
import store from '../store/index'
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'
});
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(store.state.user&&store.state.user.token){
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
export default request