<template>
    <div class="container">
        <div class="frm-register">
            <form @submit.prevent="registerUser">
                <h3>Register</h3>
                <hr/>
                <div class="form-group">
                  <label style="float:left">Username:</label>
                  <input type="text" name="name" v-model="details.name" 
                  placeholder="enter username" class="form-control"/>
                </div>
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
                <button type="submit" class="btn-register">register</button>
            </form>
        </div>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name:'register',
    data(){
        return{
          details:{
          name:'',
          email:'',
          password:'',
          },
          errorMessage:'',
        }
    },
    methods:{
        registerUser(){
          this.$store.dispatch('newUser',this.details)
          .then(response => {
              this.$router.push({name:'login'});
          })
          .catch(error => {
            this.errorMessage = error.response;
          })
        },
    }
}
</script>

<style scoped>
.frm-register{
text-align: center;
margin:20px auto;
padding: 20px 10px;
height: 385px;
width:250px;
border:1px solid #cccccc;
}
.frm-register h3{
    color:#428bac;
    font-family:Roboto;
    font-size:30px;
}
.btn-register{
 width:100%;
 background-color: #428bac;
 border:none;
 color:#111111;
}
</style>