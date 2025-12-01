// src/features/main/routes.js
export default [
  {
    path: '/ai',
    component: () => import('@/app/layouts/ChatbotLayout.vue'),
    children: [
      {
        path: '',
        name: 'AIChatbot',
        component: () => import('./pages/Dashboard.vue')
      }]
  },
  {
    path: '/app',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('./pages/Dashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'challenges',
        name: 'challenges',
        component: () => import('./pages/Challenges.vue'),
        meta: { title: 'Coding Challenges' }
      },
      {
        path: 'challenges/:slug',
        name: 'challenge-detail',
        component: () => import('./pages/ChallengeDetail.vue')
        // \u26a0\ufe0f No meta.title \u2014 set in component (slug-dependent)
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('./pages/Leaderboard.vue'),
        meta: { title: 'Leaderboard' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('./pages/Profile.vue'),
        meta: { title: 'My Profile' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('./pages/Settings.vue'),
        meta: { title: 'Account Settings' }
      },
      {
        path: 'achievements',
        name: 'achievements',
        component: () => import('./pages/Achievements.vue'),
        meta: { title: 'Achievements' }
      },
      {
        path: 'learn',
        children: [
          {
            path: '',
            name: 'MainLearnHome',
            component: () => import('@/features/learn/pages/LearnHome.vue'),
            meta: { title: 'Learn to Code' }
          },
          {
            path: ':lang',
            component: () => import('@/app/layouts/LearnLayout.vue'),
            children: [
              {
                path: '',
                // FIX: Use relative path to preserve /app base
                redirect: (to) => `/app/learn/${to.params.lang}/intro`,
              },
              {
                path: 'try',
                name: 'MainTryItEditor',
                component: () => import('@/features/learn/pages/TryItEditor.vue'),
                meta: { title: 'Try It Yourself' }
              },
              {
                path: ':topic',
                name: 'MainLearnDynamic',
                component: () => import('@/features/learn/pages/LearnDynamic.vue')
              },
            ],
          },
        ],
      },
    ]
  }
];