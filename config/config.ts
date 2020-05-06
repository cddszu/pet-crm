// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/pet',
            }, // {
            //   path: '/welcome',
            //   name: 'welcome',
            //   icon: 'smile',
            //   component: './Welcome',
            // },
            // {
            // path: '/admin',
            // name: 'admin',
            // icon: 'crown',
            // component: './ListTableList',
            // authority: ['admin'],
            // routes: [
            //   {
            //     path: '/admin/sub-page',
            //     name: 'sub-page',
            //     icon: 'smile',
            //     component: './ListTableList',
            //     authority: ['admin'],
            //   },
            // ],
            // },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              name: 'list.master',
              icon: 'smile',
              path: '/master',
              component: './Matser',
            },
            // {
            //   name: 'list.speciality',
            //   icon: 'smile',
            //   path: '/speciality',
            //   component: './Speciality',
            //   authority: ['admin'],
            // },
            {
              name: 'list.doctor',
              icon: 'smile',
              path: '/doctor',
              component: './Doctor',
              authority: ['admin'],
            },
            {
              name: 'list.pet',
              icon: 'smile',
              path: '/pet',
              component: './Pet',
            },
            {
              name: '个人设置',
              icon: 'smile',
              path: '/accountsettings',
              component: './AccountSettings',
              authority: ['user'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
