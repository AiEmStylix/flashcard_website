import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/index.vue'),
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: () => import('@/views/login.vue'),
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      children: [{ path: 'inbox', component: () => import('@/views/dashboard/inbox.vue') }],
    },
  ],
});

//Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  //Load the token when refreshing the page
  authStore.loadAccessToken();

  const tokenPayload = authStore.userInfo;

  const isTokenExpired = tokenPayload ? tokenPayload.exp * 1000 < Date.now() : false;

  if (isTokenExpired) {
    authStore.clearAccessToken();
  }

  //Convert to pure boolean
  const isAutheticated = !!authStore.accessToken;
  if ((to.path === '/login' || to.path === '/register') && isAutheticated) {
    return next('/');
  }

  if (to.meta.requiresAuths && !isAutheticated) {
    return next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
