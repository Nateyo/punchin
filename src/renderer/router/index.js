import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: require('@/components/Root').default
    },
    {
      path: '/Home',
      name: 'Home',
      component: require('@/components/Home').default
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: require('@/components/admin/Admin').default
    },
    {
      path: '/Reports',
      name: 'Reports',
      component: require('@/components/admin/Reports').default
    },
    {
      path: '/UserManagement',
      name: 'UserManagement',
      component: require('@/components/admin/UserManagement').default
    },
    {
      path: '/FirstTime',
      name: 'FirstTime',
      component: require('@/components/FirstTime').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
