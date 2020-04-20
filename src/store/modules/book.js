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
};

export default{
    state,
    getters,
    actions,
    mutations,
}