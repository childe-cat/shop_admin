import axios from 'axios'

const request = axios.create({
    timeout:3000,
    baseURL:'http://127.0.0.1'
})

request.interceptors.request.use(function (config){
    const token = localStorage.getItem('token')
    config.headers.Authorization = token
    return config
},(error)=>{
    return Promise.reject(error)
})

request.interceptors.response.use(function (response){
    return response
},(error)=>{
    return Promise.reject(error)
})

export default request