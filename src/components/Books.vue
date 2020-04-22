<template>
    <div class="container">
         <h3>Add Book</h3>
          <hr/>
          <!-- bootstrap error message -->
          <div class="alert alert-danger" v-if="errorMessage">
             {{errorMessage}}
          </div>
          <!-- this form add and update each book we do not use two forms -->
          <form class="frm-add" v-on:submit.prevent="addUpdateBook">
            <strong>Title:</strong><input type="text" name="title" v-model="book.title">
            <strong>Body:</strong><input type="text" name="body" v-model="book.body">
            <button type="submit" class="btn-save">save</button>
          </form>
          <!-- bootstrap successful message -->
          <div class="alert alert-success" v-if="successMessage">
             {{ successMessage }}
          </div>
          <div class="book-container">
            <div v-for="(book,index) in allTheBooks" v-bind:key="index" class="box">
              <button type="button"  class="btn btn-warning btn-sm btn-edit" 
              @click="editBook(book)">Edit</button>
              <button type="button" class="btn btn-danger btn-sm btn-delete"
              @click="deleteBook(book.id)">Delete</button>
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
    // get all the books from getters of the vuex
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
       if (this.edit == false) {
         // add a book
         this.$store.dispatch('addBook',this.book)
         .then((response) => {
           this.response = response;
           this.successMessage = 'This book was added successfully';
           this.book.title = '';
           this.book.body = '';
         })
         .catch((error) => {
           this.errorMessage = error.response.data;
           this.book.title = '';
           this.book.body = '';
         })
       }else{
         // update book
          this.$store.dispatch('updateBook',this.book)
         .then((response) => {
           this.response = response;
           this.successMessage = 'This book was updated successfully';
          })
         .catch((error) => {
           this.errorMessage = error.response.data;
           this.book.title = '';
           this.book.body = '';
         })
       }
     },
     editBook(book) {
       if(this.book.id = book.id) {
         this.book = book;
         this.edit = true;
       }
     },
     deleteBook($id){
       let confirmDelete = confirm('Are you sure you want to delete this book');
       if(confirmDelete == true){
          this.$store.dispatch('deleteTheBook',$id)
          .then((response) => {
            this.response = response;
           })
          .catch((error) => {
            this.errorMessage = error.response.data;
          })
       }
     },
   },
   data(){
     return{
       errorMessage:'',
       response:'',
       successMessage:'',
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
  width:360px;
  height:85px;
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
.btn-edit{
  float:left;
  margin:4px 5px;
  
}
.btn-delete{
  float:left;
  margin: 4px;
  margin-right:2px;
  
}

</style>

