<template>
  <div id="app">
     <navbar></navbar>
     <div class="container">
        
     </div>
  </div>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: 'app',
  components:{
      navbar,
  },
}
</script>

<style>
@import url('./bootstrap.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:0px;
}

</style>
