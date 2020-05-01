<template>
  <div id="app">
    <v-app id="inspire">

      <v-toolbar :style="{'background-image':`${background}`}" src="https://www.ecopetit.cat/wpic/mpic/43-437293_2560x1600-black-abstract-wallpaper-for-iphone-data-high.jpg">
        <v-title class="white--text" > YOURMOVIEHUB</v-title>
        <template v-if="isAuthenticated">
        <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">FILMY</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">SERIALE</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">POLECANE</v-btn>
          <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1">#ZOSTAŃ W DOMU</v-btn>

        <input class="white--text" type="text" v-model="searchKey" placeholder="Wyszukaj film,serial"/>
          <v-btn depressed large  class="light-blue white--text" v-on:click="searchMovies">Szukaj</v-btn>
        </template>
        <template v-else>
          <v-spacer></v-spacer>
              <v-dialog dark v-model="signUpDialog" persistent max-width="600px" @save.prevent="onSignup">
        <template v-slot:activator="{ on }">
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text v-on="on" >Zarejestruj się</v-btn>
        </template>
       
        <v-card>
          <v-card-title>
            <span class="headline">Zarejestruj się</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  label="E-Mail"
                  type="email"
                  id="signUpEmail"
                  v-model="signUpEmail"
                  required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  label="Wybierz hasło"
                  type="password"
                  id="signUpPassword"
                  v-model="signUpPassword"
                  required
                  :rules="[passwordLength]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  label="Potwierdź hasło"
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :rules="[comaprePasswords]" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="signUpDialog = false">Zamknij</v-btn>
            <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="signUpDialog = false, onSignup()" type ="submit">Zarejestruj</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            <v-dialog dark v-model="logInDialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text v-on="on">Zaloguj się</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Zaloguj się</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  label="Email"
                  type="email"
                  id="logInEmail"
                  v-model="logInEmail"
                  required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  label="Hasło"
                  type="password"
                  id="logInPassword"
                  v-model="logInPassword"
                  required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="logInDialog = false">Zamknij</v-btn>
            <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="logInDialog = false , onLogin()">Zaloguj</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </template>

      <v-icon depressed large class="white--text" v-if="isAuthenticated">mdi-account</v-icon>
      <span depressed large class="white--text" v-if="isAuthenticated">Witaj, {{user.split("@")[0]}}</span>
    <div class="mx-2"></div>
       <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text v-if="isAuthenticated" @click="onLogOut()">Wyloguj się</v-btn>
        </v-toolbar>
      <body style="background-color: #010105;">

      <div class="row" v-if="isAuthenticated">

        <div class="row" style="margin:5px; float: left; border:5px solid;">
          <div v-for="(movie, movieKey) in moviesList.Search" :key="movieKey">
            <div class="column">
              <v-dialog dark v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-img style="width: 100%; height: auto" v-bind:src="movie.Poster" v-on="on"></v-img>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                          <v-textarea dark depressed large class="white--text" label="Informacje o filmie:" required></v-textarea>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="dialog = false">Zamknij</v-btn>
                    <v-btn cdepressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="dialog = false">Dodaj komenatarz</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <div class="title white--text" style="color: darkgray">{{movie.Title}}</div>
            </div>
          </div>
        </div>
      </div>
  </body>

      <v-footer class="pa-3" color="#000000" dark fixed>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear()}} </div>

        <v-spacer></v-spacer>
      </v-footer>

    </v-app>
  </div>


</template>

<script>
  export default {
    name: 'App',
    mounted:function(){
      this.loadRandom()
    },
    data () {
      return {
        signUpEmail: '',
        signUpPassword: '',
        confirmPassword: '',
        logInEmail: '',
        logInPassword: '',
        signUpDialog: false,
        logInDialog: false,
        films: [],
        search:'',
        background: 'url(https://www.bu.edu/files/2020/02/Oscar-Predictions-Posters.jpg)',
        posters: 'url(https://www.bu.edu/files/2020/02/Oscar-Predictions-Posters.jpg)',
        searchKey:'',
        moviesList:[],
        randomkeywords:['Shaman','Lord','Capitan','Super','naruto']
      }
    },
    computed: {
      comaprePasswords () {
        return this.signUpPassword !== this.confirmPassword ? 'Hasła różnią się.' : true
      },
      passwordLength () {
        return this.signUpPassword.length  < 6 ? 'Hasło musi posiadać co najmniej 6 znaków.' : true
      },
      user () {
        return this.$store.getters.user
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated
      }
    },
    watch: {
      user (value) {
        if(value !== null && value !== undefined) {
         this.background = '';
        }
      }  
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.signUpEmail, password: this.signUpPassword}).then(()=>
        {
          this.signUpEmail = "",
          this.signUpPassword = "",
          this.confirmPassword = ""
        })
      },
      onLogin () {
        this.$store.dispatch('logUserIn', {email: this.logInEmail, password: this.logInPassword}).then(()=>
        {
          this.logInEmail = "",
          this.logInPassword = ""
        })
      },
      onLogOut() {
        this.$store.dispatch('logUserOut').then(()=>
        {
          this.background = this.posters
        })
        this.$store.dispatch('LogUserIn', {email: this.logInEmail, password: this.logInPassword})
      },
      searchMovies()
      {
        var url = 'http://www.omdbapi.com/?s=' + this.searchKey + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;

                })
      },
      loadRandom()
      {
        const randomElement = this.randomkeywords[Math.floor(Math.random() * this.randomkeywords.length)];
        var url = 'http://www.omdbapi.com/?s=' + randomElement + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;
                })
      }
    }
  }
</script>

<style>

.row {
  display: flex;
}

.column {
  flex: 10%;
  padding: 5px;
}
</style>

