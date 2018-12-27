import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default,
    },
    {
      path: '/about',
      name: 'About',
      component: require('@/components/About').default,
    },
    {
      path: '/modeler',
      name: 'Modeler',
      component: require('@/components/Modeler').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
