[TOC]

## 第一章 项目介绍

### 技术栈

- React 17.0.0
- Git
- UmiJS 3.2
- Ant Design V4
- Ant Design Pro V4
- RESTful API

### 开发环境

- node v10.13.0
- npm 6.13.4
- yarn 1.15.2
- Git
- Google Chrome 80.0
- Postman

### Api 文档

[Api 文档地址](https://www.showdoc.com.cn/1207745568269674?page_id=6094279351627422)

一定要先看 `说明文档`

数据表字段参考 `数据字典`

登录统一使用 `认证Api`

后台管理使用 `后台Api`

### 课程安排

#### 第一章 项目介绍

1. 项目演示
2. 技术栈
3. 开发环境
4. Api 与文档
5. 课程安排

#### 第二章 UmiJS 基础

1.  快速上手
2.  目录结构
3.  常用配置
4.  路由
5.  页面跳转
6.  HTML 模板
7.  使用 Mock 数据
8.  整合 Dva
9.  运行时配置
10. Umi UI

#### 第三章 Ant Design Pro 应用

1. 安装与体验
2. 目录结构
3. 路由与页面
4. 布局和组件
5. Mock 和连调
6. 区块
7. TodoList-初始化与列表
8. TodoList-服务端获取数据
9. TodoList-使用 Model
10. TodoList-数据共享
11. TodoList-总结

#### 第四章 初始化项目

1. 去除多余的内容
2. Logo 和文字替换
3. 封装网络请求
4. 使用 Git 版本控制

#### 第五章 登录与退出

1. 登录
2. 用户信息
3. 退出
4. 首页统计

#### 第六章 用户管理

1. 用户列表
2. 禁用与启用
3. 用户添加
4. 用户更新
5. 封装添加和更新

#### 第七章 商品管理

1. 商品列表
2. 上架与推荐
3. 添加商品页面
4. 处理商品分类
5. 阿里 OSS 简介
6. 封装 OSS 上传
7. 集成富文本编辑器
8. 富文本编辑器集成阿里 OSS 上传
9. 完成商品添加
10. 商品编辑页面
11. 优化富文本编辑器
12. 完成商品更新

#### 第八章 练习

1. 完成分类管理
2. 完成订单管理
3. 完成轮播图管理
4. 联动-后台发货后, 前台完成确认收货功能
5. 联动-前台确认收货后, 后台完成评论管理

#### 第九章 部署上线

1. 阿里云服务器
2. 部署上线
3. 域名解析
4. HTTPS 证书

## 第二章 第二章 UmiJS 基础

### 快速上手

[UmiJS 文档地址](https://umijs.org/zh-CN)

创建目录并进入目录:

```
$ mkdir umijs

$ cd umijs
```

创建项目:

```
$ yarn create @umijs/umi-app
```

安装依赖:

```
$ yarn
```

启动项目:

```
$ yarn start
```

部署发布:

```
$ yarn build
```

本地验证:

```
$ yarn global add serve
$ serve ./dist
```

### 目录结构

`.editorconfig` 编辑器配置文件

`.gitignore` Git 忽略文件

`.prettierignore` 格式化代码时忽略的文件

`.prettierrc` 格式化代码的配置

`tsconfig.json` typescript 配置文件

`typings.d.ts` typescript 类型定义文件

### 常用配置

`hash`

配置是否让 build 生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。

`base`

设置路由前缀，通常用于部署到非根目录。
比如，你有路由 / 和 /users，然后设置了 base 为 /foo/，那么就可以通过 /foo/ 和 /foo/users 访问到之前的路由。

`publicPath`

配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。

`outputPath`

指定输出路径，将打包生成的文件放到对应目录

`title`

配置标题，也可以在每个路由中为每个页面单独配置标题

`history`

配置 history 类型和配置项。

`targets`

配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。

`proxy`

配置代理能力。

`theme`

配置主题，实际上是配 less 变量。

`routes`

配置路由。

### 路由

在配置文件中通过 routes 进行配置，格式为路由信息的数组:

```
export default {
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/user', component: 'user' },
  ],
}
```

常用配置:

```
routes: [
{ path: '/', component: '@/pages/index' },
//重定向
{ path: '/list', redirect: '/user/one' },
//父路由配置component: '@/layouts/index',子路由共用layouts组件
{
  path: '/user',
  component: '@/layouts/index',
  wrappers: [
    '@/wrappers/auth',
  ],
  routes: [
    {path: '/user/one/:id?', component: '@/pages/index', title: '用户页面一'},
    {path: '/user/two', component: '@/pages/user', title: '用户页面二'},
    {component: '@/pages/404'}
  ]
},
//给每一级路由配置404组件
{component: '@/pages/404'}
],
```

### 页面跳转

声明式跳转:

`<Link>` 和 `<NavLink>` 进行跳转:

```
import { Link } from 'umi';
...

<Link to="/user">用户中心</Link>
<Link to="/user">首页</Link>
```

命令式跳转:

```
import { history } from 'umi';

// 跳转到指定路由
history.push('/list');

// 带参数跳转到指定路由
history.push('/list?a=b');
history.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});

// 跳转到上一个路由
history.goBack();
```

### HTML 模板

默认模板的位置是: `/node_modules/@umijs/core/lib/Html/document.ejs`

但是不要去修改默认的模板, 因为在 `node_modules` 目录下的文件不会进入版本库, 每次 `npm install` 都会重新生成 `/node_modules` 中的文件

可以新建 `src/pages/document.ejs` 作为模板文件

### 使用 Mock 数据

关闭 mock:

```
export default {
  mock: false,
};
```

通过环境变量临时关闭:

```
$ MOCK=none umi dev
```

### 整合 Dva

#### 介绍 dva

dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

#### 在 UmiJS 中使用流程

创建路由组件:

```
import React from 'react';

const Dva = () => {
  return (
    <div>
      dva
    </div>
  );
};

export default Dva;
```

创建 model :

```
export default {
    namespace: 'tags', // model中的effect和reducer要通过命名空间调用，不要和其他model同名
    state: { },  // state,跟react组件中的state差不多一个意思
    effects: { }, // effect通常是调用服务端接口，后调用reducer更新state
    reducers: { }  // state通过reducer来更新
}
```

```
import { request } from 'umi';

const getData = async () => {
  return request('/api/tags')
}

export default {
  namespace: 'tags',

  state: {
    tagsList: []
  },

  effects: {
    *fetchTags({payload, callback}, {put, call}) {
      const response = yield call(getData, payload)

      yield put({
        type: 'setTagsList',
        payload: response
      })
    }

  },

  reducers: {
    setTagsList(state, { payload }) {
      return {...state, tagsList: payload}
    }
  }
}
```

连接 Model 和 组件:

```
import React from 'react';
import {connect} from 'umi'

const Dva = (props: any) => {
  const { dispatch } = props

  const list = props.tags.tagsList.list || []

  const getData = () => {
    dispatch({
      type: 'tags/fetchTags',
      payload: {}
    })
  }

  return (
    <div>
      <h3>dva</h3>
      <button onClick={getData}>加载数据</button>
      {
        list.map((item, index) => {
          return <p key={index}>{item.name}</p>
        })
      }
    </div>
  );
};

export default connect(({tags}) => ({ tags }))(Dva);

```

### 运行时配置

```
import { history } from 'umi';

// 动态添加路由
export function patchRoutes({ routes }) {
  routes.unshift({
    path: '/foo',
    component: require('@/pages/user1').default,
  });

  // 由服务端返回
  const extraRoutes = [
    {path: '/server', component: require('@/pages/user2').default}
  ]
  merge(routes, extraRoutes);
}

// 合并路由的方法
function merge(routes, extraRoutes) {
  extraRoutes.map(item => {
    routes.unshift(item)
  })
}

// 覆盖默认渲染
export function render(oldRender) {
  const isLogin = true
  if (isLogin) {
    oldRender()
  } else {
    history.push('/');
    oldRender()
  }
}

// 路由改变时候触发
export function onRouteChange({ matchedRoutes }) {
  if (matchedRoutes.length) {
    document.title = '融职 ' + (matchedRoutes[matchedRoutes.length - 1].route.title || '');
  }
}
```

### Umi UI

创建一个新项目:

```
$ yarn create @umijs/umi-app
```

安装 `Umi UI`:

```
yarn add @umijs/preset-ui -D
```

## 第三章 Ant Design Pro 应用

### 安装与体验

[ANT DESIGN PRO 文档地址](https://pro.ant.design/index-cn)

创建目录并进入:

```
$ mkdir antd_pro
```

安装:

```
$ yarn create umi
```

安装依赖:

```
$ yarn install
```

启动:

```
$ yarn start
```
