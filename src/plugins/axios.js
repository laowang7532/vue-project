import axios from 'axios';
import {
    Loading,
    Message
} from 'element-ui';

//路由实例
import router from '@/router/index';
//loading 实例
let loading;
//设置默认的api前置端口地址
axios.defaults.baseURL = 'http://localhost:3003/';

//请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config)

    //开启Loading
    loading = Loading.service({
        background: 'rgba(0,0,0,0.7)'
    });
    //注册登录的api 不添加token  config 不需要添加修改
    if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
        return config;
    }
    // 在发送请求之前  headers头中加token（除登录注册以外）
    //取token
    let token = sessionStorage.token;
    //判断是否已经登录  拥有token
    //没有token ,提示用户，跳转页面
    if (!token) {
        Message.error('token令牌失效，请重新登录！');
        // 最好是重定向 延迟跳转
        router.replace('/login');
        loading.close();
    }
    //设置token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(function (response) {
    //关闭loading
    loading.close();
    //在这里你可以判断后台返回数据携带的请求码
    if (response.status === 200) {
        return response.data //return出去了data中我们需要的数据  去掉了外部我们不需要的数据
    }
    //后台监测token非法或失效
    if (response.status === 401) {
        Message.error('token令牌失效，请重新登录！');
        // 最好是重定向 延迟跳转
        router.replace('/login');
        loading.close();
    }
    //  else {
    //     // 非200请求抱错
    //     throw Error(response.data.msg || '服务异常')
    // }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;