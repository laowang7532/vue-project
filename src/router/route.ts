import * as VueRouter from 'vue-router'

import Home from '@/pages/home/index.vue'
import Demos from '@/pages/demos/demos.vue'
import EchartToMap from '@/pages/demos/components/echartToMap/echartToMap.vue'
import Interstellar from '@/pages/musicBg/interstellar.vue'
import PointCluster from '@/pages/demos/components/pointCluster/pointCluster.vue'
import AsyncData from '@/pages/demos/components/asyncData/asyncData.vue'

const routes = [
  { path: '/', component:()=> Home },
  { path: '/interstellar', component: ()=> Interstellar },
  { path: '/demos', component: ()=> Demos },
  { path: '/echartToMap', component: ()=> EchartToMap },
  { path: '/pointCluster', component: ()=> PointCluster },
  { path: '/asyncData', component: ()=> AsyncData },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
