import payClearing from "@/pages/orderModule/payClearing/payClearing";
import orderManagement from "@/pages/orderModule/orderManagement/orderManagement";
export default [
    {
        //订单管理
        path:'/order/management',
        name:'orderManagement',
        component:orderManagement
    },
    {
        //支付结算
        path:'/order/payClearing',
        name:'payClearing',
        component:payClearing
    }
]