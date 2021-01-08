import {request} from "./request";

function getbloglist(){
    return request({
        url: 'http://8.131.236.131:8003/api/space/list'
    })
}

function isLogins(data){
    return request(
        {url: 'http://8.131.236.131:8003/api/user/login'},
        "POST",
        data
    )
}

function getdaylist(){
    return request({
        url: 'http://8.131.236.131:8000/api/blog/list'
    })
}



export {
    getbloglist,
    isLogins,
    getdaylist
}
