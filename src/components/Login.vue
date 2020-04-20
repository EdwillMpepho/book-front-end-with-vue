<template>
    <div class="container">
        <div class="frm-login">
            <form @submit.prevent="signIn">
                <h3>Login</h3>
                <hr/>
                <div class="form-group">
                  <label style="float:left">Email:</label>
                  <input type="email" name="email" v-model="details.email" 
                  placeholder="enter email" class="form-control"/>
                </div>
                <div class="form-group">
                  <label style="float:left">Password:</label>
                  <input type="password" name="password" v-model="details.password" 
                  placeholder="enter password" class="form-control"/>
                </div>
                <button type="submit" class="btn-login">Login</button>
            </form>
        </div>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
     return{
         details:{
           email:'',
           password:'',
         },
         errorMessage:'',
         response:{},
     }
    },
    methods:{
        signIn() {
          this.$store.dispatch('logIn',this.details)
          .then(response => {
             this.response = response;
             this.$router.push({name:'books'});
          })
          .catch(error => {
              this.errorMessage = error.response;
          })
        },
    }
}
</script>

<style scoped>
.frm-login{
text-align: center;
margin:20px auto;
padding: 20px 10px;
height: 300px;
width:250px;
border:1px solid #cccccc;
}
.frm-login h3{
    color:#428bac;
    font-family:Roboto;
    font-size:30px;
}
.btn-login{
 width:100%;
 background-color: #428bac;
 border:none;
 color:#111111;
}
</style>