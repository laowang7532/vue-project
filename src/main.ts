import './assets/main.css'
/**
 *  文档地址：https://cn.vuejs.org/guide/essentials/application.html
 *  引入创建应用实例的方法 createApp 
 * */ 
import { createApp } from 'vue'
// 引入根组件
import App from './App.vue'
import HelloWorldVue from './components/HelloWorld.vue'


// 1. 创建应用实例
const app = createApp(App)


// 提供应用配置
app.config.errorHandler = (err, vm, info) => {
    console.log('errorHandler', err, vm, info)
}

// 提供注册全局组件 这样全局注册就不需要在任何地方引入了 可以直接在组件中使用
app.component('HelloWorld', HelloWorldVue)


// 2. 挂载 确保在挂载之前完成所有的组件注册及配置
app.mount('#app')
// 简写
// createApp(App).mount('#app')


// 3. 多个应用实例 不是很常见 但是要了解
// const app1 = createApp(App1)
// const app2 = createApp(App2)
// app1.mount('#app1')
// app2.mount('#app2')

// 4.安装一个插件
// app.use(MyPlugin)
// 第一个参数插件本身 可选的第二个参数是要传递给插件的选项
// app.use(MyPlugin, { someOption: true })
// 如何编写一个插件 https://cn.vuejs.org/guide/reusability/plugins.html 暂时先知道了解


/**
 *  5.app.provide()
 *  提供一个值，可以在应用中的所有后代组件中注入使用
 *  第一个参数应当是注入的 key，第二个参数则是提供的值。返回应用实例本身。
 */
// app.provide('globalProperty', 'globalProperty')

// TODO:明天查看依赖注入 应用层 app.runWithContext()