<template>
    <v-container>
        <v-layout text-xs-center wrap row align-center justify-center>
            <v-flex xs12 class="nadpis">
                <p class="display-3">{{ msg }}</p>
            </v-flex>
            <v-flex v-if="accessToken==null" xs12 text-xs-center wrap row align-center justify-center>
                <v-hover v-slot:default="{ hover }" xs12 sm5 md3 lg3 xl2>
                    <v-card class="karty" :elevation="hover ? 12 : 2">
                        <v-toolbar color="primary lighten-1" dark flat>
                            <v-toolbar-title>Nie ste prihlásení</v-toolbar-title>
                        </v-toolbar>
                        <v-list>
                            <v-list-item link to="/login">
                                <v-list-item-icon>
                                    <v-icon>mdi-login</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Prihlásiť sa</v-list-item-title>
                            </v-list-item>
                            <v-list-item link to="/register">
                                <v-list-item-icon>
                                    <v-icon>mdi-account-plus</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Registrovať sa</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex v-else xs12 class="nadpis">
                <p class="headline">Dobrý deň {{ first_name }} {{ last_name }}. Prosím vyberte si položku z menu
                    vľavo.</p>
            </v-flex>
            <v-flex xs3 md2 lg1>
                <v-img src="../assets/logo.png"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    computed: mapState(['accessToken', 'first_name', 'last_name']),
    name: 'Hello',
    data() {
      return {
        msg: 'Vitajte na Johnnyho pokeci'
      }
    }
  }
</script>

<style>
    .nadpis {
        text-align: center;
        padding-top: 20px;
    }

    .karty {
        margin: 10px;
    }

    .hello {
        background-image: url("../assets/wallpaper.jpg");
        background-size: cover;
    }
</style>
