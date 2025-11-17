export default [
  {
    path: '/app',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('./pages/Dashboard.vue') },
      { path: 'challenges', name: 'challenges', component: () => import('./pages/Challenges.vue') },
      { path: 'challenges/:slug', name: 'challenge-detail', component: () => import('./pages/ChallengeDetail.vue') },
      { path: 'leaderboard', name: 'leaderboard', component: () => import('./pages/Leaderboard.vue') },
      { path: 'profile', name: 'profile', component: () => import('./pages/Profile.vue') },
      { path: 'settings', name: 'settings', component: () => import('./pages/Settings.vue') },
      { path: 'achievements', name: 'achievements', component: () => import('./pages/Achievements.vue') },
      {
        path: 'learn',
        children: [
          {
            path: '',
            name: 'MainLearnHome',
            component: () => import('@/features/learn/pages/LearnHome.vue'),
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
                name: 'MainTryItEditor',
                component: () => import('@/features/learn/pages/TryItEditor.vue'),
              },
              {
                path: ':topic',
                name: 'MainLearnDynamic',
                component: () => import('@/features/learn/pages/LearnDynamic.vue'),
              },
            ],
          },
        ],
      },
    ]
  }
]
