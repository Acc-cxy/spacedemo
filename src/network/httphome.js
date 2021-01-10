import axios from "./http"

const api = {
    getlist(){
        return axios.get('/space/list')
    },
    islogin(data){
        return axios.post('/user/login',data)
    },
    upload(data){
        return axios.post('/space/imgUpload',data)
    },
    avatar(data){
        return axios.post('/space/avatar',data)
    }
}

export default api
