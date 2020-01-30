<template>
    <v-container>
        <v-layout text-xs-center wrap row align-center justify-center>
            <v-flex xs12 class="nadpis">
                <p class="display-3">Nová správa</p>
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
                    <v-list>
                        <v-list-item >
                            <v-text-field label="Komu" v-model="prijmatel" prepend-icon="mdi-account" dense class="sendmess"/>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'NewMessage',
    data() {
      return {
        sprava: '',
        prijmatel: '',
        chyba: false,
      }
    },
    methods: {
      odosliSpravu() {
        let me = this;
        axios.post('https://pego149.pythonanywhere.com/api/messages/', {
          odosielatel: this.$store.getters.loggedInUsername,
          prijmatel: this.prijmatel,
          sprava: this.sprava
        })
          .then(() => {
            me.sprava = '';
            me.chyba = false;
            me.$router.push({path: '/chat/' + me.getMessageId(me.prijmatel)})

          })
          .catch(() => {
            me.chyba = true;
          })
      },
      getMessageId: function (username) {
        let list = this.$store.getters.userList
        if (list) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].username === username) {
              return list[i].id
            }
          }
        }
      },
    }
  }
</script>

<style>
    .sendmess {
        height: 26px;
        margin-right: 20px;
    }
</style>
