//时间戳转换
function add0(m){return m<10?'0'+m:m };
function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    const times = y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    return times;
}
// 获取URL相对路径
function GetUrlRelativePath(url)
{
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
export {
    add0,
    format,
    GetUrlRelativePath
}
