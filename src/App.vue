<template>
  <div id="app">
    <v-app id="inspire">

      <v-toolbar :style="{'background-image':`${background}`}" src="https://www.ecopetit.cat/wpic/mpic/43-437293_2560x1600-black-abstract-wallpaper-for-iphone-data-high.jpg">
        <v-title class="white--text" > YOURMOVIEHUB</v-title>
        <template v-if="isAuthenticated">
        <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">FILMY</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">SERIALE</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">DLA DZIECI</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1">POLECANE</v-btn>
          <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1">#ZOSTAŃ W DOMU</v-btn>
        <input class="white--text" type="text" v-model="search" placeholder="Wyszukaj film,serial"/>
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
            <v-btn color="blue darken-1" text @click="signUpDialog = false">Zamknij</v-btn>
            <v-btn color="blue darken-1" text @click="signUpDialog = false, onSignup()" type ="submit">Zarejestruj</v-btn>
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
            <v-btn color="blue darken-1" text @click="logInDialog = false">Zamknij</v-btn>
            <v-btn color="blue darken-1" text @click="logInDialog = false , onLogin()">Zaloguj</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </template>
      <v-icon depressed large class="light-blue white--text btn btn-outline-primary mr-1" v-if="isAuthenticated">mdi-account</v-icon>
      <v-label depressed large class="light-blue white--text btn btn-outline-primary mr-1" v-if="isAuthenticated">Witaj, </v-label>
    <div class="mx-2"></div>
       <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text v-if="isAuthenticated" @click="onLogOut()">Wyloguj się</v-btn>
        </v-toolbar>

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
        posters: 'url(https://www.bu.edu/files/2020/02/Oscar-Predictions-Posters.jpg)'
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
          console.log();
        }
      }  
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.signUpEmail, password: this.signUpPassword}).then(()=>
        {
          this.signUpEmail = "",
          this.signUpPassword = "",
          this.confirmPassword = "",
          this.background = ''
        })

      },
      onLogin () {
        this.$store.dispatch('logUserIn', {email: this.logInEmail, password: this.logInPassword}).then(()=>
        {
          this.logInEmail = "",
          this.logInPassword = "",
          this.background = ''
        })
      },
      onLogOut() {
        this.$store.dispatch('logUserOut').then(()=>
        {
          this.background = this.posters
        })
      }
    }
  }
</script>