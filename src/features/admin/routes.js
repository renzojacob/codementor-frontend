// src/features/admin/routes.js

export default [
  {
    path: '/admin',
    component: () => import('@/app/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('./pages/Dashboard.vue'),
      },
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
      },
        {
        path: 'learn',
        name: 'Learn',
        component: () => import('./pages/learn.vue'),
      },
        {
        path: 'AI-agent',
        name: 'AI-agent',
        component: () => import('./pages/AI-agent.vue'),
      },
        {
        path: 'challenge',
        name: 'Challenge',
        component: () => import('./pages/challenge.vue'),
      },
        {
        path: 'Settings',
        name: 'Settings',
        component: () => import('./pages/Settings.vue'),
      },
    ],
  },
]
