export const setLocal = (key, val) => {
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(key, val)
}
export const getLocal = (key) => {
    const data = window.localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
}