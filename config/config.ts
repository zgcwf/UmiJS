import { defineConfig } from 'umi';

import routes from './routes'
import defaultSettings from './defaultSettings';
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  // base: '/admin/',
  // publicPath: 'http://xxx.com/cdn/',
  // outputPath: 'build',
  title: defaultSettings.title,
  // history: {
  //   type: 'hash'
  // },
  targets: {
    ie: 11,
  },
  proxy: proxy['dev'],
  theme: {
    '@primary-color': defaultSettings.primaryColor,
  },
  routes,
  fastRefresh: {},
  // mock: false,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {
    immer: true,
    hmr: false,
  },
});
