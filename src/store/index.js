import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({ 
  state: {
    user: {
      id: 'aaa'
    }
  },
  mutations: {    
    setUser (state, payload) {
      state.user = payload
    }
  },
    actions: {
    signUserUp ({commit},payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
          console.log(`Sign up: ${newUser}`)
          //console.log(`Sign up: ${user.credential}`)
          //commit('setUser', user.email)

        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    LogUserIn ({commit},payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
          console.log(`Log in: ${newUser}`)
          // console.log(`Log in: ${user.credential}`)
          // commit('setUser', user.email)

        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }  
})