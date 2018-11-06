import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/roomlist'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve)
    },
    {
      path: '/paihangbang',
      name: 'paihangbang',
      component: resolve => require(['@/components/paihangbang'], resolve)
    },
    {
      path: '/wangqi',
      name: 'wangqi',
      component: resolve => require(['@/components/wangqi'], resolve)
    },
    {
      path: '/gamerule',
      name: 'gamerule',
      component: resolve => require(['@/components/gamerule'], resolve)
    },
    {
      path: '/myaward',
      name: 'myaward',
      component: resolve => require(['@/components/myaward'], resolve)
    },
    {
      path: '/myXiangRoom',
      name: 'myXiangRoom',
      component: resolve => require(['@/components/myXiangRoom'], resolve)
    },
    {
      path: '/zhuanpan',
      name: 'zhuanpan',
      component: resolve => require(['@/components/zhuanpan'], resolve)
    },
    {
      path: '/roomlist',
      name: 'roomlist',
      component: resolve => require(['@/components/roomlist'], resolve)
    },
    {
      path: '/yindao',
      name: 'yindao',
      component: resolve => require(['@/components/yindao'], resolve)
    },
    {
      path: '/rule',
      name: 'rule',
      component: resolve => require(['@/components/rule'], resolve)
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['@/components/aboutUs'], resolve)
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: resolve => require(['@/components/orderDetail'], resolve)
    },
    {
      path: '/wangqi',
      name: 'wangqi',
      component: resolve => require(['@/components/wangqi'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/Admission',
      name: 'Admission',
      component: resolve => require(['@/components/Admission'], resolve)
    },
    {
      path: '/shuomingshu',
      name: 'shuomingshu',
      component: resolve => require(['@/components/shuomingshu'], resolve)
    },
    {
      path: '/zpsc',
      name: 'zpsc',
      component: resolve => require(['@/components/zpsc'], resolve)
    },
    {
      path: '/xieyi',
      name: 'xieyi',
      component: resolve => require(['@/components/xieyi'], resolve)
    },
    {
      path: '/shengming',
      name: 'shengming',
      component: resolve => require(['@/components/shengming'], resolve)
    },
    {
      path: '/newHome',
      name: 'newHome',
      component: resolve => require(['@/components/newHome'], resolve)
    }
    ,
    {
      path: '/myNewaward',
      name: 'myNewaward',
      component: resolve => require(['@/components/myNewaward'], resolve)
    }
    ,
    {
      path: '/participateList',
      name: 'participateList',
      component: resolve => require(['@/components/participateList'], resolve)
    }

  ]
})
