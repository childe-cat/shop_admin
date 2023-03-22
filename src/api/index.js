import request from "@/api/request";

//登录
//post 参数一：管理员账户名 参数二：密码
export const reqLogin = (username,password) =>{
    return request({
        url:'api/adminLogin',
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}
//获取管理员信息
export const reqAdmin = (username,password) =>{
    return request({
        url:'manage/managerInfo',
        method:'get',
        data:{
            username:username,
            password:password
        }
    })
}
//获取用户表
export const reqUserInfo = ()=>{
    return request({
        url:'manage/userInfo',
        method:'get',
    })
}
/*获取表行*/
export const reqMeterNum = (tableName) =>{
    return request({
        url:'manage/meter_num',
        method:'post',
        data:{
            table_name:tableName
        }
    })
}
//获取订单信息
export const reqTimeOrder = (time) =>{
    return request({
        url:'manage/time_order',
        method:'post',
        data:{
            timeout:time
        }
    })
}
//获取热词
export const reqHotWord = (num) =>{
    return request({
        url:'manage/hot_word',
        method:'post',
        data:{
            num:num
        }
    })
}
//获取所有商品信息
export const reqAllGoods = ()=>{
    return request({
        url:'api/all_goods',
        method:'get',
    })
}
//获取分类信息
export const reqSearchClassify = ()=>{
    return request({
        url:'api/classify',
        method:'get',
    })
}
//编辑分类
export const reqTheSmallClassification = (data)=>{
    return request({
        url:'manage/The_small_classification',
        method:'post',
        data:data
    })
}
//新增分类
export const reqAddClassify = (data)=>{
    return request({
        url:'manage/add_classify',
        method:'post',
        data:data
    })
}
//删除分类
export const reqDelClassify = (id)=>{
    return request({
        url:'manage/del_classify',
        method:'post',
        data:{
            id:id
        }
    })
}
//添加商品
export const reqAdd_goods = (data)=>{
    return request({
        url:'manage/add_goods',
        method:'post',
        data:data
    })
}
//下架商品
export const reqDownGoods = (data)=>{
    return request({
        url:'manage/down_goods',
        method:'post',
        data:data
    })
}
//获取下架商品
export const reqGetUpGoods = ()=>{
    return request({
        url:'manage/get_up_goods',
        method:"get"
    })
}
//上架新商品
export const reqUpGoods = (id)=>{
    return request({
        url:'manage/up_goods',
        method:'post',
        data:{
            id:id
        }
    })
}
//重新发布下架商品
export const reqUpDownGoods = (id)=>{
    return request({
        url:'manage/up_down_goods',
        method:'post',
        data:{
            id:id
        }
    })
}
//编辑商品
export const reqEditGood = (data)=>{
    return request({
        url:'manage/edit_goods',
        method:'post',
        data: data,
    })
}
//新增图片
export const reqUploadImg = (dataForm)=>{
    return request({
        url:'manage/upload_imgs',
        method:'post',
        data: dataForm,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
//获取聊天信息
export const reqChatList = ()=>{
    return request({
        url:'ws/chat',
        method:'post'
    })
}