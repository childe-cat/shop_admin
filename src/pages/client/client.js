import linkupOl from "@/pages/client/linkupOl/linkupOl";
import userCenter from "@/pages/client/userCenter/userCenter";
export default[
    //在线沟通
    {
        path:'/client/linkupOl',
        name:'linkupOl',
        component:linkupOl
    },
    //用户中心
    {
        path:'/client/userCenter',
        name:'userCenter',
        component:userCenter
    },
]