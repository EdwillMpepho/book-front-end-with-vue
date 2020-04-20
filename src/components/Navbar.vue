<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
          <div class="container">
            <router-link to="/" class="navbar-brand">MET Books</router-link>
            <ul class="menu">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/books">Books</router-link></li>
                <li v-if="!loggedIn"><router-link to="/login">Login</router-link></li>
                <li v-if="!loggedIn"><router-link to="/register">Register</router-link></li>
                <li v-if="loggedIn" @click="signOut"><router-link to="/logout">Logout</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
          </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'navbar',
    computed: {
       loggedIn() {
           return this.$store.getters.loggedIn;
       }
    },
    data(){
      return{
          errorMessage:'',
          response:{},
      }
    },
    methods:{
      signOut(){
         this.$store.dispatch('logOut')
         .then(response => {
            this.response = response;
         })
         .catch(error => {
            this.errorMessage = error.response; 
         })
      }
    },
}
</script>

<style scoped>
.menu li{
    display: inline;
    list-style:none;
}
a{
    color:white;
    margin: auto 3px;
}
</style>