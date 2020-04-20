import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from ,next) => {
  //check if router requires Auth
  if(to.matched.some(record => (record.meta.requiresAuth))) {
    //check if the user not logged In
    if(! store.getters.loggedIn){
      next({path:'/login'})
    }else {
      next();
    } 
  }else  if(to.matched.some(record => (record.meta.requiresGuest))) {
     // chect if user logged In
     if(store.getters.loggedIn) {
       next({path:'/books'})
     }else {
       next()
     }
  }else {
    next()
  }
})