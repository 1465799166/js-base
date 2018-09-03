/*请求 基本信息配置*/
import Qs from 'qs'

//请求url的前缀
//这里配置的请求方法如method和url在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
let baseURL = "";

const objBase = {
    url: 'get',
    // 请求方式，默认为get
    method: 'get', // default
    // 基础url前缀
    baseURL: baseURL,
    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: [
        function(data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs
            data = Qs.stringify(data);
            return data;
        }
    ],
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    //设置超时时间
    timeout: 10000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default
    //返回数据类型
    responseType: 'json' // default
}

const postBase = {
    url: '/post',
    method: 'post',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    },
    timeout: 500000,
    withCredentials: true,
    responseType: 'json'
}
const postBase_responseText = {
    url: '/post',
    method: 'post',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    },
    timeout: 10000,
    withCredentials: true,
    responseType: 'text'
}
const postBase_jsontype = {
    url: '/post',
    method: 'post',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 10000,
    withCredentials: true,
    responseType: 'json',
    validateStatus: function(status) {
        return status >= 200 && status < 800;
    }
}
const post_File = {
    url: '/post',
    method: 'post',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }, 
}
const post_resArraybuffer = {
    url: '/post',
    method: 'post',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }, 
    withCredentials: true,
    responseType: 'arraybuffer'
}
export {
    baseURL,
    objBase,
    postBase,
    postBase_responseText,
    post_File,
    postBase_jsontype,
    post_resArraybuffer
}
