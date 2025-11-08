// src/features/public/routes.js

export default [
  {
    path: '/',
    component: () => import('@/app/layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('./pages/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('./pages/About.vue'),
      },
    ],
  },
]
