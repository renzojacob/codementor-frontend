import { API_ENDPOINTS } from '@/core/utils/constants.js'

export default [
  {
    path: '/',
    component: () => import('@/app/layouts/AuthLayout.vue'),
    children: [
      {
        path: API_ENDPOINTS.AUTH.LOGIN,
        name: 'Login',
        component: () => import('./pages/Login.vue'),
        meta: { title: 'Sign In' }
      },
      {
        path: API_ENDPOINTS.AUTH.REGISTER,
        name: 'Register',
        component: () => import('./pages/Register.vue'),
        meta: { title: 'Sign Up' }
      },
      {
        path: API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        name: 'VerifyEmail',
        component: () => import('./pages/VerifyEmail.vue'),
        meta: { title: 'Verify Your Email' }
      }
    ],
  }
];