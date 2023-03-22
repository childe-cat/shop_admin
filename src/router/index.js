import Vue from "vue";
import VueRouter from "vue-router";

import main from "@/pages/Main/main";
import mainIndex from "@/pages"
import home from "@/pages/Home/Home"

Vue.use(VueRouter)
// 重写push方法
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
//引入路由文件
import commodity from "@/pages/commodityModule/commodity";
import order from "@/pages/orderModule/order";
import sales from "@/pages/sales/sales";
import client from "@/pages/client/client";
import system from "@/pages/system/system";
import empty from "@/empty";
import {reqAdmin} from "@/api";

const router = new VueRouter({
    routes:[
        {
            path:'*',
            component: main,
        },
        {
            path:'/',
            name:'login',
            component: main,
        },
        {
            path:'/empty',
            name:'empty',
            component:empty
        },
        {
            name:'mainIndex',
            path:'/mainIndex',
            component:mainIndex,
            redirect:'/home',
            beforeEnter(to,from,next){
                reqAdmin().then(res=>{
                    if(res.data.status === 0) return next()
                    next('login')
                })
            },
            children:[
                {
                    path:'/home',
                    name:'home',
                    component:home
                },
                ...commodity,
                ...order,
                ...sales,
                ...client,
                ...system
            ]
        },
    ]
})

export default router
