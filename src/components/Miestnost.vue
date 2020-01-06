<template>
    <v-container>
        <v-layout text-xs-center wrap row align-center justify-center>
            <v-flex xs12 class="nadpis">
                <p class="display-3" v-if="miestnost[0] != null">{{ miestnost[0].miestnostNazov }}</p>
            </v-flex>
            <v-flex xs12 sm11>
                <v-card class="karty">
                    <v-toolbar color="primary lighten-1" dark flat>
                        <v-text-field label="Správa" v-model="sprava" prepend-icon="mdi-pen" dense class="sendmess"/>
                        <v-btn v-on:click="odosliSpravu" color="primary darken-1">Odošli</v-btn>
                        <v-snackbar v-model="chyba" color="#FF0000" :timeout="3000"> Nastala chyba v odosielaní správy. Skontrolujte či
                            ste zadali správu.
                        </v-snackbar>
                    </v-toolbar>
                    <v-list v-for="(child, i) in miestnost" :key="i">
                        <v-list-item class="mess elevation-5">
                            <v-list-item-icon class="time">
                                {{ new Date(child.timestamp).toLocaleString() }}
                            </v-list-item-icon>
                            <v-list-item-title>{{ child.odosielatel }}: {{ child.sprava }}</v-list-item-title>
                        </v-list-item>
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
    name: 'Miestnost',
    computed: mapState(['username']),
    data() {
      return {
        miestnost: [],
        sprava: '',
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
        axios.get('api/miestnost/' + this.$route.params.id)
          .then((resp) => {
            this.miestnost = resp.data
          })
      },
      odosliSpravu() {
        axios.post('api/posts/', {
          odosielatel: this.$store.getters.loggedInUsername,
          miestnost: this.miestnost[0].miestnost,
          sprava: this.sprava
        })
          .then(() => {
            this.sprava = '';
            this.fetchData()
          })
          .catch(() => {
            this.chyba = true;
          })
      }
    }
  }
</script>

<style>
    .sendmess {
        height: 26px;
        margin-right: 20px;
    }
    .mess {
        margin: 0 10px ;
        background-color: #6aaaff;
        border-radius: 10px;
        word-wrap: break-word;
        max-width: 100%;
    }
    .time {
        width: 210px;
    }
</style>
