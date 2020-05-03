import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({ 
  state: {
    user: null,
    isAuthenticated:false,
    loadedComments: [],
    ratings:[],
  },
  mutations: {    
    setUser (state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {    
      state.isAuthenticated = payload
    },
    createComment(state, payload) {
      state.loadedComments.push(payload)
    },
    setLoadedComments(state, payload){
      state.loadedComments = payload
    },
    addRating(state, payload){
      state.ratings = payload
    }
  },
    actions: {
      loadCommentsForMovie({commit}){
        firebase.database().ref('ymh_comments').once('value')
          .then((data) => {
            const comments = []
            const obj = data.val()
            for (let key in obj) {
              comments.push({
                movie: obj[key].movie,
                user: obj[key].user,
                content: obj[key].content,
              })
            }
            commit('setLoadedComments', comments)
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      createComment({commit}, payload){
        const comment = {
          content: payload.content,
          movie: payload.movie,
          user: this.state.user
        }
        //Wysłanie komentarza do bazy
        firebase.database().ref('ymh_comments').push(comment)
          .then(() => {
            commit('createComment', comment)
          })
          .catch((error) => {
            console.log(error)
          })
        
      },
      addRating({commit},payload){
          const rating = {
            rating: payload.rating,
            movie: payload.movie,
            user: this.state.user
          }
          //Wysłanie oceny do bazy
        firebase.database().ref('ymh_ratings').push(rating)
        .then(() => {
          commit('addRating', rating)
        })
        .catch((error) => {
          console.log(error)
        })
      },
    signUserUp ({commit},payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setUser', user.user.email);
          commit('setIsAuthenticated', true);

        }
      )
      .catch(()=> 
      {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
      }
      )
    },
    logUserIn ({commit},payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
        commit('setUser', user.user.email);
        commit('setIsAuthenticated', true);
        }
      )
      .catch(()=> 
      {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
      }
      )
    },
    logUserOut({commit}){
      firebase.auth().signOut().then(()=>
      {
        commit('setUser', null);
        commit('setIsAuthenticated', false);
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.isAuthenticated
    },
    loadedComments (state) {
      return state.loadedComments
    }
  }  
})