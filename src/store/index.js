import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)
import {reqAdmin, reqTimeOrder, reqUserInfo} from "@/api";

const actions = {
    async getOrder({commit}){
        const res = await reqTimeOrder(0)
        commit('get_order',res.data)
    },
    async getAdmin({commit}){
        const res = await reqAdmin()
        if(res.data.status === 0){
            commit('get_admin',res.data.data)
        }else{
            commit('get_admin',{})
        }
    },
    async getUserInfo({commit}){
        const res = await reqUserInfo()
        if(res.data.status === 0){
            commit('get_userInfo',res.data.data)
        }
    }
}

const mutations = {
    get_order(state,data){
        state.order = data.data
        state.homeData = [data.num,data.all_money]
    },
    get_admin(state,data){
        state.adminInfo = data
    },
    get_userInfo(state,data){
        state.userInfo = data
    }
}

const state = {
    order: [],
    homeData: [],
    adminInfo: {},
    userInfo:[],
}

const store = new Vuex.Store({
    state,
    actions,
    mutations
})

export default store