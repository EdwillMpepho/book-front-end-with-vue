import axios from 'axios';


const state = {
    books:[],
    loginToken:localStorage.getItem('signInToken') || null,
};

const getters = {
    allBooks(state){
        return state.books;
    },
    loggedIn(state){
        return state.loginToken != null;
    },
};

const actions = {
  
   allTheBooks(context) {
       return new Promise((resolve,reject) =>{
          axios.get('http://vuex-app.test/api/Book')
          .then(response => {
             resolve(response);
             context.commit('setAllBooks',response.data);
          })
          .catch(error =>{
              reject(error);
          })
       });
   },
   newUser(context,details) {
     return new Promise((resolve,reject) => {
         axios.post('http://vuex-app.test/api/register',
          {name:details.name,email:details.email,password:details.password})
         .then(response => {
            context.commit('registerUser',response.data)
            resolve(response);
         })
         .catch(error => {
             reject(error);
         })
     })
   },
   logIn(context,details) {
      return new Promise((resolve,reject) =>{
          axios.post('http://vuex-app.test/api/login',
          {email:details.email,password:details.password})
          .then(response => {
              const loginToken = response.data.token;
              localStorage.setItem('signInToken',loginToken);
              context.commit('signIn',response.data);
              resolve(response);
          })
          .catch(error => {
              reject(error);
          })
      })
   },
   logOut(context) {
   
    //  console.log(state.loginToken.token);
      axios.defaults.headers.common['Authorization']='Bearer '+state.loginToken.token;
      return new Promise((resolve,reject) =>{
        axios.post('http://vuex-app.test/api/logout')
        .then(response => {
           localStorage.removeItem('signInToken');
            resolve(response);
            context.commit('signOut',response.data);
        })
        .catch(error => {
            localStorage.removeItem('signInToken');
            reject(error);
        })
    })
        
   },
   addBook(context,book) {
    axios.defaults.headers.common['Authorization']='Bearer '+state.loginToken.token;
    return new Promise((resolve, reject) => {
        axios.post('http://vuex-app.test/api/Book',
         {title: book.title, body: book.body})
        .then((response) => {
            context.commit('addNewBook',response.data);
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
   },
   updateBook(context, book) {
    axios.defaults.headers.common['Authorization']='Bearer '+state.loginToken.token;
    return new Promise((resolve, reject) => {
        axios.put('http://vuex-app.test/api/Book/'+book.id,
         {title: book.title, body: book.body})
        .then((response) => {
            context.commit('updateUserBook',response.data);
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
   },
   deleteTheBook(context, id) {
    axios.defaults.headers.common['Authorization']='Bearer '+state.loginToken.token;
    return new Promise((resolve, reject) => {
      axios.delete('http://vuex-app.test/api/Book/'+id)
      .then((response) => {
          context.commit('deleteBook',response.data);
          resolve(response);
      })
      .catch((error) => {
          reject(error);
      })
    })
   },
   
   
};

const mutations = {
  setAllBooks(state,books) {
        state.books = books;
  },
  signIn(state,token) {
      state.loginToken = token;
  },
  signOut(state) {
      state.loginToken = null;
  },
  addNewBook(state,book) {
      state.books.push(book);
  },
  updateBook(state,book){
      state.book = book;
  },
  deleteBook(state,book){
    state.books = state.books.filter((b) => (b.id !== book.id));
  },
  
};

export default{
    state,
    getters,
    actions,
    mutations,
}