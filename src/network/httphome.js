import axios from "./http"

const api = {
    get(){
        return axios.get('/space/list')
    }
}
export default api
