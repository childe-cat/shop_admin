import active from "@/pages/sales/active/active";
import coupons from "@/pages/sales/coupons/coupons";

export default [
    //活动策划
    {
        path:'/sales/active',
        name:'active',
        component:active
    },
    //优惠卷设计
    {
        path:'/sales/coupons',
        name:'coupons',
        component: coupons
    }
]