import mailQueue from "@/pages/system/mailQueue/mailQueue";
import safetyManagement from "@/pages/system/safetyManagement/safetyManagement";
export default [
    {
        path:'/system/mailQueue',
        name:'mailQueue',
        component:mailQueue
    },
    {
        path:'/system/safetyManagement',
        name:'safetyManagement',
        component: safetyManagement
    }
]