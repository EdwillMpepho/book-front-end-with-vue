<template>
    <div class="container">
         <h3>Add Book</h3>
          <hr/>
          <div class="alert alert-danger" v-if="errorMessage">
             {{errorMessage}}
          </div>
          <form class="frm-add" v-on:submit.prevent="addUpdateBook">
            <strong>Title:</strong><input type="text" name="title" v-model="book.title">
            <strong>Body:</strong><input type="text" name="body" v-model="book.body">
            <button type="submit" class="btn-save">save</button>
          </form>
          <div class="book-container">
            <div v-for="(book,index) in allTheBooks" v-bind:key="index" class="box">
               <h5>{{book.title}}</h5>
               <span>{{ book.body }}</span>
             </div>
          </div>
       </div>
</template>

<script>


export default {
  name:'books',
  computed:{
    allTheBooks(){
      return this.$store.getters.allBooks;
    },
   },
   created() {
      this.getAllBooks();
    },
   methods:{
     getAllBooks(){
       this.$store.dispatch('allTheBooks')
       .then(response => {
         this.response = response;
       })
       .catch(error =>{
         this.errorMessage = error.response;
       })
     },
     addUpdateBook() {
       alert('Hi');
     },
   },
   data(){
     return{
       errorMessage:'',
       response:'',
       edit:false,
       book:{
         id:'',
         title:'',
         body:''
       },
     }
   },
}
</script>

<style scoped>

.book-container{
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-column-gap:2px ;

}
.box {
  background: #54e926;
  width:350px;
  height:70px;
  text-align: center;
 }
 .box h5{
   font-family: 'Roboto';
   color:#000000;
   margin:7px auto;
 }
 .box span{
   color:#428bac;
 }
 h3{
  font-family:'Roboto';
  color:#428bac;
   margin:20px auto ;
}
.box{
  border:1px solid #ccc;
}
.frm-add {
 margin: 15px 10px;
 padding: 20px 20px;
 text-align: center
}
.btn-save{
  background-color: #54e926;
  margin-left:3px;
  border:none
}

</style>

