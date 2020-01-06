<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Prihlásenie</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field label="Login" v-model="username" name="login"
                                              prepend-icon="mdi-account" type="text"/>
                                <v-text-field id="password" v-model="password" label="Password" name="password"
                                              prepend-icon="mdi-lock" type="password"/>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="primary" v-on:click="loginUser">Prihlásiť sa</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="wrongCred" color="#FF0000" :timeout="3000"> Zadali ste nesprávne prihlasovacie údaje.
        </v-snackbar>
    </v-content>
</template>

<script>

  export default {
    name: "LoginForm",
    data() {
      return {
        username: '',
        password: '',
        wrongCred: false // activates appropriate message if set to true
      }
    },
    methods: {
      loginUser() { // call loginUSer action
        this.$store.dispatch('loginUser', {
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.wrongCred = false
            this.$router.push({name: 'home'})
            this.$store.dispatch('loadMessageList')
          })
          .catch(err => {
            console.error(err)
            this.wrongCred = true // if the credentials were wrong set wrongCred to true
          });
        this.$store.dispatch('loadRooms')
        this.$store.dispatch('loadUsersList')
      }
    }
  }
</script>

<style scoped>

</style>
