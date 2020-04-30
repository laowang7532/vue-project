import axios from 'axios'

//获取角色列表
let list = (data) => axios.get('/api/role/list',{ params : data});
//添加角色
let add = (data) => axios.post('/api/role',{name:data});
//删除角色
let del = (data) => axios.delete('/api/role',{params:data});
//编辑角色
let updata = (data)=>axios.put('/api/role', data);

// 获得角色菜单栏
let menu = (data) => axios.get('/api/role/config', { params: data });
// 添加菜单
let addmenu = (data) => axios.post('/api/role/menu', data);
// 删除菜单
let removemenu = (rid, mid) => axios.delete(`/api/role/menu?role_id=${rid}&menu_id=${mid}`);

//-------------Menu.vue-------------------------------------

//获取菜单分类
let category = (data) => axios.get('/api/menu/sub',{params:data});

//添加菜单分类
let insert = (data) => axios.post('/api/menu',data);

//编辑菜单分类
let edit = (data) => axios.put('/api/menu',data)

//删除菜单分类
let remove = (data) => axios.delete('/api/menu',{params:data});
export default{
    list,
    add,
    del,
    updata,
    menu,
    addmenu,
    removemenu,
    category,
    insert,
    edit,
    remove,

}