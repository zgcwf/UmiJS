import {history} from 'umi';

// 定义额外路由变量
let extraRoutes;

// 动态添加路由,常与render连用,请求服务端根据响应--动态更新路由，
export function patchRoutes({ routes }) {
  routes.unshift({
    path: '/foo',
    title: 'foo',
  // 注意这里component后面不是字符串,而是组件
    component: require('@/pages/user1').default,
  });

  // 合并服务端返回的路由
  extraRoutes.map(item => {
    routes.unshift({
      path: item.path,
      component: require(`@/pages${item.component}`).default
    })
  })
}

// 覆写 render, 会在 patchRoutes 之前执行
export function render(oldRender) {
  // 模拟从服务端请求获得的 路由
  // fetch('/api/auth').then(auth => {
  //   if (auth.isLogin) { oldRender() }
  //   else { 
  //     history.push('/login'); 
  //     oldRender()
  //   }
  // });
  extraRoutes = [
    {path: '/server', component: '/user2'}
  ]

  // 渲染之前, 做一些权限的校验
  const isLogin = true
  if (!isLogin) {
    history.push('/login')
  }

  oldRender();
}

// 在初始加载和路由切换时做一些事情, 在 patchRoutes 之后执行
export function onRouteChange({ location, routes, action, matchedRoutes }) {
  // 用于做埋点统计
  console.log(location.pathname, '被访问了')

  // 设置标题
  if (matchedRoutes.length) {
    document.title = '前缀在app.ts中 - ' + (matchedRoutes[matchedRoutes.length - 1].route.title || '');
  }
}
