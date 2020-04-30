import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Layout from '@/components/Layout.vue'

import {Message} from 'element-ui';

Vue.use(VueRouter)

  const routes = [
    { //登录路由
      path: '/',
      name: 'Login',
      alias: '/login',//多个路由地址
      component: Login,
    },
    { //注册路由
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    //--------------------------商品管理-------------------------
    { 
      path: '/goods',
      name: 'Goods',
      component: Layout,
      children: [{
          //商品列表
          path: 'list',
          name: 'GoodsList',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Goods/List.vue'),
        },
        { //发布商品
          path: 'release',
          name: 'GoodsRelease',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Goods/Release.vue'),
        },
        { //分类商品
          path: 'category',
          name: 'GoodsCategory',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Goods/Category.vue'),
        },
      ]
    },
    //--------------------------订单管理-------------------------
    { 
      path: '/order',
      name: 'Order',
      component: Layout,
      children: [{
          //商品列表
          path: 'list',
          name: 'OrderList',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Order/List.vue'),
        },
      ]
    },
    //------------------------权限设置---------------------------
    { 
      path: '/role',
      name: 'Role',
      component: Layout,
      children: [{
          //用户列表
          path: 'list',
          name: 'RoleList',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Role/List.vue'),
        },
        {
          //菜单权限
          path: 'menu',
          name: 'RoleMenu',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Role/Menu.vue'),
        },
      ]
    },
     //------------------------用户管理---------------------------
     { 
      path: '/user',
      name: 'User',
      component: Layout,
      children: [{
          //用户列表
          path: 'list',
          name: 'UserList',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/User/List.vue'),
        },
      ]
    },
    //------------------------账户设置--------------------------------
    { 
      path: '/admin',
      name: 'Admin',
      component: Layout,
      children: [{
          //用户列表
          path: 'info',
          name: 'AdminInfo',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Admin/Info.vue'),
        },
      ]
    },
]

const router = new VueRouter({
  routes
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to);
  // console.log(from);
  // console.log(next);

  //检查目标地址 判断是否要登陆
  let isRquireAuth = to.matched.some((item) => item.meta.requiresAuth );
  if (!isRquireAuth) {
    next();
    return;
  }
  //检查token
  let token = sessionStorage.token;
  if (token) {
    next();
  } else {
    Message.error('登录状态已失效！请重新登录！');
    //跳转登录时，传参redirect    传一个你未登录之前想去的那个页面
    //params  query  两种路由传参方式 以下适合用query传参
    next({
      path: '/login',
      //你想去的页面没有token  先去登录  再回来跳转到你想去的那个页面
      query: {
        redirect: to.path,
      }
    });

  }


})
export default router
