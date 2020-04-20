import Vue from 'vue';
import Router from 'vue-router';
import Books from './components/Books.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';


Vue.use(Router);

export default new Router({
 
    routes:[
             {
             name:'home', 
             path:'/', 
             component:Home
            },
            {name:'books', 
            path:'/books', 
            component:Books, 
            meta:{ 
              requiresAuth:true
             },
            },
            {
            name:'about', 
            path:'/about',
             component:About
            },
            {
            name:'login', 
            path:'/login', 
            component:Login, 
            meta: { 
              requiresGuest:true
             },
            },
            {
             name:'register',
             path:'/register', 
             component:Register, 
             meta: { 
               requiresGuest:true
             }
            },
            {
             name:'logout',
             path:'/logout', 
             component:Logout
            },
           ]

});

