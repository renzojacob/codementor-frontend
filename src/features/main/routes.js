export default [
    {
        path: '/',
        component: () => import('@/app/layouts/MainLayout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('./pages/Dashboard.vue'),
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('./pages/Profile.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('./pages/Settings.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'challenges',
                children:[
                    {
                        path: '',
                        name: 'Challenges',
                        component: () => import('./pages/Challenges.vue'),
                        //meta: {requiresAuth: true}
                    },
                    {
                        path: ':id',
                        name: 'ChallengeDetail',
                        component: () => import('./pages/Dashboard.vue'),
                        //meta: {requiresAuth: true}
                    }
                ]
            },
            {
                path: 'leaderboard',
                name: 'Leaderboard',
                component: () => import('./pages/Leaderboard.vue'),
                meta: { requiresAuth: true },
            }

        ]
    }
]