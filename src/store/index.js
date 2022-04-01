import Vue from 'vue'
import Vuex from 'vuex'
import {setLocal,getLocal} from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY='TOUTIAO_USER'
export default new Vuex.Store({
    state:{
        //一个对象里面用来存储当前用户信息，包括token等数据
        user:getLocal(TOKEN_KEY)
    },
    mutations:{
        setUser(state,data){
            state.user=data
            setLocal(TOKEN_KEY,state.user)
        }
    },
    actions:{
    },
    modules:{
    }
})
