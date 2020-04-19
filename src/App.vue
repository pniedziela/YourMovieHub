<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-toolbar dark prominent src="https://wallpapercave.com/wp/wp121051.jpg">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>YourMovieHub</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-btn flat>Sign In</v-btn>
            <v-btn flat>Login</v-btn>
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

      }
    }
  }
</script>