export const setLocal=(itemkey,val)=>{
    return window.localStorage.setItem(itemkey,JSON.stringify(val))
}
export const getLocal=(val)=>{
    return JSON.parse(window.localStorage.getItem(val))
}