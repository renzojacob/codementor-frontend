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
        name: 'UsersManagement',
        component: () => import('./pages/Users.vue'),
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('./pages/Analytics.vue'),
      },
      {
        path: 'learn',
        name: 'LearnManagement',
        component: () => import('./pages/Learn.vue'),
      },
      {
        path: 'ai-agent',
        name: 'AI-agent',
        component: () => import('./pages/AI-agent.vue'),
      },
      {
        path: 'challenges',
        name: 'ChallengesManagement',
        component: () => import('./pages/Challenges.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('./pages/Settings.vue'),
      },
    ],
  },
]
