import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = "http://8.131.236.131:8003/api";
axios.defaults.timeout = 10000;
// axios.defaults.withCredentials = true;

//请求格式
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlenconded';

// axios.defaults.processData = false;
// axios.defaults.transformRequest = data => {qs.stringify(data)}


axios.interceptors.request.use(config => {
    if(config.url == "/user/login" || "/space/edit"){
        axios.defaults.headers['Content-Type'] = 'application/JSON';
    }else if(config.url == "/space/avatar"){
        axios.defaults.headers['Content-Type'] = false;
    }
    if (config.method === 'post') {
        // config.data = qs.stringify(config.data)
    }
    return config
}, err => {
    console.log(err);
})

// 2.2.响应拦截
axios.interceptors.response.use(res => {
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

export default axios;
