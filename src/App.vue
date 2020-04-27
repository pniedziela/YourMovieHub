<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-toolbar dark prominent src="https://wallpapercave.com/wp/wp121051.jpg">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>YourMovieHub</v-toolbar-title>
          <v-spacer></v-spacer>
              <v-dialog v-model="signUpDialog" persistent max-width="600px" @save.prevent="onSignup">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Sign Up</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>                
                <v-col cols="12">
                  <v-text-field 
                  label="Email address" 
                  type="email" 
                  id="signUpEmail" 
                  v-model="signUpEmail" 
                  required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                  label="Choose password" 
                  type="password" 
                  id="signUpPassword" 
                  v-model="signUpPassword" 
                  required
                  :rules="[passwordLength]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                  label="Confirm password" 
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
            <v-btn color="blue darken-1" text @click="signUpDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="signUpDialog = false, onSignup()" type ="submit">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            <v-dialog v-model="logInDialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Log In</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Log In</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>                
                <v-col cols="12">
                  <v-text-field 
                  label="Email address" 
                  type="email" 
                  id="logInEmail" 
                  v-model="logInEmail" 
                  required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field 
                  label="Choose password" 
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
            <v-btn color="blue darken-1" text @click="logInDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="logInDialog = false , onLogin()">Log In</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        </v-toolbar>
      </div>
      <v-footer class="pa-3" color="#696969" dark fixed>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear()}}</div>
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
        logInDialog: false
      }
    },
    computed: {
      comaprePasswords () {
        return this.signUpPassword !== this.confirmPassword ? 'Passwords do not match' : true
      },
      passwordLength () {
        return this.signUpPassword.length  < 6 ? 'Password needs to be at least 6 characters long.' : true
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if(value !== null && value !== undefined) {
          console.log(value);
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.signUpEmail, password: this.signUpPassword})
      },
      onLogin () {
        this.$store.dispatch('LogUserIn', {email: this.logInEmail, password: this.logInPassword})
      }
    }
  }
</script>