import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({ 
  state: {
    user: null,
    isAuthenticated:false
  },
  mutations: {    
    setUser (state, payload) {
      state.user = payload;
      console.log(payload);
    },
    setIsAuthenticated(state, payload) {    
      state.isAuthenticated = payload
    }

  },
    actions: {
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
    isAuthenticated (state){
      return state.isAuthenticated
    }
  }  
})