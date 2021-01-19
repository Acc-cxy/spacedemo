import axios from "./http"

const api = {
    edit(id,body){
      return axios.post('/space/edit?id='+id,body)
    },
    getlistlength(){
        return axios.get('/space/length')
    },
    getlimit(id){
        if(id == 'null'){
            return axios.get('/space/limit')
        }
        return axios.get('/space/limit?limit='+ id)
    },
    getlist(author){
        return  axios.get('space/list?author='+author)
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
