import axios from 'axios';
//获取商品列表
let list = (data) => axios.get('/api/admin/goods/list', {params: data});
//删除商品
let del = (data) => axios.delete('/api/admin/goods',{params:data})
//发布商品
let release = (data) =>axios.post('/api/admin/goods',data);

//获取商品分类
let category = (data) => axios.get('/api/category/sub',{ params:data });

//新建节点
let add = (data) => axios.post('/api/category',data);

//删除节点
let remove = (data) => axios.delete('/api/category',{params:data});

//编辑节点
let edit = (data) => axios.put('/api/category',data)
export default {
    list,
    del,
    release,
    category,
    add,
    remove,
    edit,
    
}