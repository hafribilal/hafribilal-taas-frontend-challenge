import { useUser } from '../store/user'

const routes = [
  {
    path: "/",
    name: "repos",
    component: () => import('../components/Repositories.vue'),
    beforeEnter: (to, from, next) => {
      const user = useUser();
      if (!user.isConnected) {
        next({ name: 'auth' });
        console.log('connect your gh account');
      } else {
        next();
        console.log('welcome back');
      }
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import('../components/Auth.vue'),
    beforeEnter: (to, from, next) => {
      const user = useUser();
      if (user.isConnected) {
        next({ name: 'repos' })
      } else {
        next();
      }
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

export default routes;
