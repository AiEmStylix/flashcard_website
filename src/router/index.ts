import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import UserTable from '@/components/Datatable/UserTable.vue';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: UserTable,
      meta: { requiresAuths: true }
    }
  ],
})

//Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  //Load the token when refreshing the page
  authStore.loadAccessToken();

  //Convert to pure boolean
  const isAutheticated = !!authStore.accessToken;

  if (to.path === '/login' && isAutheticated) {
    return next('/');
  }

  if (to.meta.requiresAuths && !isAutheticated) {
    return next({ name: 'login' });
  } else {
    next();
  }
})

export default router
