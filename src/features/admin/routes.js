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
        meta: { title: 'Admin Dashboard' }
      },
      {
        path: 'users',
        name: 'UsersManagement',
        component: () => import('./pages/Users.vue'),
        meta: { title: 'User Management' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('./pages/Analytics.vue'),
        meta: { title: 'Analytics Dashboard' }
      },
      {
        path: 'learn',
        name: 'LearnManagement',
        component: () => import('./pages/Learn.vue'),
        meta: { title: 'Learning Content' }
      },
      {
        path: 'ai-agent',
        name: 'AI-agent',
        component: () => import('./pages/AI-agent.vue'),
        meta: { title: 'AI Agent' } // Cleaned: no hyphen, title-case
      },
      {
        path: 'challenges',
        name: 'ChallengesManagement',
        component: () => import('./pages/Challenges.vue'),
        meta: { title: 'Challenge Management' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('./pages/Settings.vue'),
        meta: { title: 'Admin Settings' }
      },
    ],
  },
];