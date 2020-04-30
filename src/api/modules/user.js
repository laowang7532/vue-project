import axios from 'axios'

//获取用户列表
let list = (data) => axios.get('/api/admin/list',{ params : data});
//用户删除
let remove = (data) => axios.delete('/api/admin',{params:data})

export default{
    list,
    remove,

}