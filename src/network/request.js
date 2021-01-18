import axios from 'axios'

export function request(config,method,datas) {
    // 1.创建axios的实例
    const instance = axios.create({
        // baseURL: 'http://8.131.236.131:3000/api',
        method:method || "GET",
        data:datas,
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        if (config.method === 'post') {
            config.data = datas
        }
        return config
    }, err => {
        console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        let {response} = err;
        if(response){

        }else {
            if(!window.navigator.onLine){
                return ; //断电处理
            }
            return Promise.err;
        }
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}
