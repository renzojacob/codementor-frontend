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
        meta: { title: 'Learn to Code' }
      },
      {
        path: ':lang',
        component: () => import('@/app/layouts/LearnLayout.vue'),
        children: [
          {
            path: '',
            redirect: (to) => `/learn/${to.params.lang}/intro`,
          },
          {
            path: 'try',
            name: 'TryItEditor',
            component: () => import('./pages/TryItEditor.vue'),
            meta: { title: 'Try It Yourself' }
          },
          {
            path: ':topic',
            name: 'LearnDynamic',
            component: () => import('./pages/LearnDynamic.vue'),
            // \u26a0\ufe0f No meta.title \u2014 title depends on lang/topic/data
          },
        ],
      },
    ],
  },
];