<template>
    <v-container>
        <v-layout text-xs-center wrap row align-center justify-center>
            <v-flex xs12 class="nadpis">
                <p class="display-3">{{ other }}</p>
            </v-flex>
            <v-flex xs12 sm11>
                <v-card class="karty">
                    <v-toolbar color="primary lighten-1" dark flat>
                        <v-text-field label="Správa" v-model="sprava" prepend-icon="mdi-pen" dense class="chat"/>
                        <v-btn v-on:click="odosliSpravu" color="primary darken-1">Odošli</v-btn>
                        <v-snackbar v-model="chyba" color="#FF0000" :timeout="3000"> Nastala chyba v odosielaní správy. Skontrolujte či
                            ste zadali správu.
                        </v-snackbar>
                    </v-toolbar>
                    <v-list v-for="(child, i) in spravy" :key="i">
                        <v-layout>
                            <v-flex xs6 v-if="child.odosielatel!==username">
                                <v-list-item
                                        v-bind:class="{ ja: child.odosielatel===username, on: child.odosielatel!==username }">

                                    <div v-bind:class="{ 'ja-content': child.odosielatel===username, 'on-content': child.odosielatel!==username }" class="elevation-4">
                                        {{ child.sprava }}
                                    </div>
                                    <div class="caption">
                                        {{ new Date(child.timestamp).toLocaleString() }}
                                    </div>

                                </v-list-item>
                            </v-flex>
                            <v-flex xs6 v-if="child.odosielatel!==username"/>
                        </v-layout>
                        <v-layout>
                            <v-flex xs6 v-if="child.odosielatel===username"/>
                            <v-flex xs6 v-if="child.odosielatel===username">
                                <v-list-item
                                        v-bind:class="{ ja: child.odosielatel===username, on: child.odosielatel!==username }">

                                    <div v-bind:class="{ 'ja-content': child.odosielatel===username, 'on-content': child.odosielatel!==username }" class="elevation-4">
                                        {{ child.sprava }}
                                    </div>
                                    <div class="caption">
                                        {{ new Date(child.timestamp).toLocaleString() }}
                                    </div>

                                </v-list-item>
                            </v-flex>
                        </v-layout>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import axios from 'axios';
  import {mapState} from "vuex";

  export default {
    name: 'Chat',
    computed: mapState(['username']),
    data() {
      return {
        spravy: [],
        sprava: '',
        other: '',
        chyba: false,
        interval: null
      }
    },
    created() {
      this.fetchData()
      this.interval = setInterval(this.fetchData, 1000)
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        axios.get('api/messages/' + this.$route.params.id + "/" + this.$store.getters.loggedInId)
          .then((resp) => {
            this.spravy = resp.data
            this.getUsername()
          })
      },
      odosliSpravu() {
        axios.post('api/messages/', {
          odosielatel: this.$store.getters.loggedInUsername,
          prijmatel: this.other,
          sprava: this.sprava
        })
          .then(() => {
            this.sprava = '';
            this.fetchData()
          })
          .catch(() => {
            this.chyba = true;
          })
      },
      getUsername() {
        if (this.spravy[0]) {
          if (this.spravy[0].odosielatel === this.$store.getters.loggedInUsername) {
            this.other = this.spravy[0].prijmatel
          } else {
            this.other = this.spravy[0].odosielatel
          }
        }
      }
    }
  }
</script>

<style>
    .chat {
        height: 26px;
        margin-right: 20px;
    }

    .ja {
        float: right;
        display: inline-block;
    }

    .ja-content {
        background-color: #eaeaea;
        padding: 10px;
        border-radius: 10px;
    }

    .on {
        display: inline-block;
    }

    .on-content {
        background-color: #4b8eec;
        padding: 10px;
        border-radius: 10px;
        color: white;
    }
</style>
