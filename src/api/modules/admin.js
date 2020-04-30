import axios from 'axios';

//管理员登陆
let login = (data) => axios.post('/api/admin/login', data);

//管理员注册
let register = (data) => axios.post('/api/admin/register', data);

//账户信息获取
let detail = (data) => axios.get('/api/admin', { params: data });
//账户信息修改
let edit = (data) => axios.put('/api/admin',data)
//账户权限列表
let role = (data) => axios.get('/api/role/list',{params:data})
export default {
    login,
    register,
    detail,
    edit,
    role,
    
}