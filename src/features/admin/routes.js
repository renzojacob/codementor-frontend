// src/features/admin/routes.js

export default [
  {
    path: '/admin',
    component: () => import('@/app/layouts/AdminLayout.vue'),
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('./pages/Users.vue'),
      },
      {
        path: 'content',
        name: 'Content',
        component: () => import('./pages/Content.vue'),
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('./pages/Analytics.vue'),
      }
    ],
  },
]
