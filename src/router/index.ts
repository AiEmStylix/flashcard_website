import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import { useAuthStore } from '@/stores/authStore';
import NotFound from '@/views/NotFound.vue';
const AdminDashboard = () => import ('@/views/AdminDashboard.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: { requiresAuths: true }
    },
  ],
})

//Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  //Load the token when refreshing the page
  authStore.loadAccessToken();

  const tokenPayload = authStore.userInfo;

  const isTokenExpired = tokenPayload ? tokenPayload.exp * 1000 < Date.now(): false;

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
})

export default router
