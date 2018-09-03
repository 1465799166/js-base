import axios from "axios"
// elementui的loading效果
import {
    Loading
} from 'element-ui';
// 接口地址
import {
    apiurl
} from "@/service/api.js";
// 封装的console.log方法
import {
    logger
} from "@/util/index"
// elementui的轻提示效果
import {
    Message
} from 'element-ui';
import {
    objBase,
    postBase_responseText,
    postBase,
    post_File,
    postBase_jsontype,
    post_resArraybuffer
} from "@/util/config.js";
/**
 * option {
    isLoading: boolean true 菊花， false， 没有菊花（ 相当于无声请求）
    loadingTarget: 覆盖的元素,默认是ts - main - content, 传入body全屏
    loadingText: 请稍等...
    url: '' //可以传apiurl中的key, 也可以传整个url
    param: 作为post数据传过去，json对象或者字符串, 如果是字符串那么可能是body形式传过去，
    postType: postBase//不写默认 text:postBase_responseText json postBase_jsontype file: post_File, arraybuffer: post_resArraybuffer
  }
  返回 Promise
 */
let loading;
export const post = (option) => {
    let url = option.url.indexOf('http') > -1 ? option.url : apiurl[option.url];
    let isLoading = option.isLoading;
    if (isLoading) {
        if (loading) {
            loading.close();
        }
        loading = Loading.service({
            lock: true,
            text: option.loadingText ? option.loadingText : '加载中...',
            // loading的logo
            spinner: 'el-icon-ts-loading',
            // background: 'rgba(0, 0, 0, 0.7)',
            // loading作用的区域
            target: option.loadingTarget ? option.loadingTarget : '.ts-main-content'
        });
    }
    let param;

    if (option.param) {
        if (typeof option.param === 'string') {
            param = option.param
        } else {
            if (option.postType == 'json' || option.postType === 'file') {
                param = option.param
            } else {
                param = new URLSearchParams();
                for (let x in option.param) {
                    param.append(x, option.param[x]);
                }
            }
        }
    }
    let postType = postBase;
    if (option.postType == 'text') {
        postType = postBase_responseText;
    } else if (option.postType == 'json') {
        postType = postBase_jsontype;
    } else if (option.postType == 'file') {
        postType = post_File;
    } else if (option.postType == 'arraybuffer') {
        postType = post_resArraybuffer
    }
    let method = option.method ? option.method : 'post';
    return new Promise((resolve, reject) => {
        axios[method](url, param, postType).then((response) => {
            if (isLoading) {
                if (loading) {
                    loading.close();
                }
            }
            if (response.status == 200) {
                resolve(response)
            } else {
                if (isLoading) {
                    //看看哪些状态不要手动处理的
                }
                reject(response)
            }
            logger.log('=====>' + url + '<=======');
            logger.log(param);
            logger.log(response.data);
        }).catch((error) => {

            if (isLoading) {
                if (loading) {
                    loading.close();
                }
                if (!error || error.status == '404' || error.status == '500' ||
                    error.status == '502' || error.status == '503' || error.status == '504') {
                    Message({
                        message: '网络或服务器异常,请检查网络',
                        type: 'warning'
                    })
                }
            }
            reject(error || {});
            logger.log('=====>' + url + '<=======');
            logger.log(param);
            logger.log(response.data);
        })
    })
}

export const get = (option) => {
    option.method = 'get';
    this.post(option);
}