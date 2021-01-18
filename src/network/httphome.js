import axios from "./http"

const api = {
    getlistlength(){
        return axios.get('/space/length')
    },
    getlist(id){
        if(!id){
            return axios.get('/space/limit')
        }
        return axios.get('/space/limit?limit='+ id)
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
