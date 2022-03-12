import { useUser } from '../store/user'

const routes = [
  {
    path: "/",
    name: "repos",
    component: () => import('../components/Repositories.vue'),
    beforeEnter: (to, from, next) => {
      const user = useUser();
      console.log('isConnected', user.isConnected);
      if (!user.isConnected) {
        next({ name: 'auth' });
      } else {
        next();
      }
    },
    meta: {
      title: 'Repositories Page'
    }
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
    meta: {
      title: 'Authorization Page'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

export default routes;
