export function debounce(func,delays){
    let timer = null;
    return function (...args) {
        let that = this;
        if(timer !== null)  clearInterval(timer)
        timer = setTimeout(()=>{
            func.apply(that,args)
        },delays)
    }
}

export function throttle(func,delay){
    let valid = true
    let delays = 0
    return function () {
        if(!valid){
            //休息时间 暂不接客
            return false;
        }
        valid = false;
        setTimeout(()=>{
            this[func]();
            valid = true;
            delays = delay;
        },delays)
    }
}
