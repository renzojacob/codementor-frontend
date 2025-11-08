// src/features/learn/routes.js

export default [
  {
    path: '/learn',
    component: () => import('@/app/layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'LearnHome',
        component: () => import('./pages/LearnHome.vue'),
      },
      {
        path: ':lang',
        component: () => import('@/app/layouts/LearnLayout.vue'),
        children: [
          {
            path: '',
            redirect: (to) => `/learn/${to.params.lang}/intro`, // Default redirect
          },
          {
            path: 'try',
            name: 'TryItEditor',
            component: () => import('./pages/TryItEditor.vue'),
          },
          {
            path: ':topic',
            name: 'LearnDynamic',
            component: () => import('./pages/LearnDynamic.vue'),
          },
        ],
      },
    ],
  },
]
