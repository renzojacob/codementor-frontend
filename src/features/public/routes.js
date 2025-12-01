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
        meta: {title: "Home"}
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('./pages/About.vue'),
        meta: {title: "About"}
      },
    ],
  },
]
