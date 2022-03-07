
const routes = [
  {
    path: "/",
    name: "repos",
    component: () => import('../components/Repositories.vue'),
    // beforeEnter: (to, from, next) => {
    //     try {
    //         console.log('test');
    //     } catch (err) {
    //         console.error(err);
    //         window.localStorage.clear();
    //         next({ ame: 'auth' })
    //     }
    // },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import('../components/Auth.vue'),
  },
  // {
  //   path: '*',
  //   redirect: 'main',
  // },
]

export default routes;
