<template>
    <div>
        <v-app>
            <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" v-on:input="startInterval" app>
                <v-img v-if="accessToken!=null" :aspect-ratio="16/9" :src="photo">
                    <v-row align="end" class="lightbox white--text pa-2 fill-height">
                        <v-col>
                            <div class="subheading">{{ first_name }} {{ last_name }}</div>
                            <div class="body-1">{{ username }}</div>
                        </v-col>
                    </v-row>
                </v-img>
                <v-img v-else :aspect-ratio="16/9" src="./assets/mosac.jpg">
                    <v-row align="end" class="lightbox white--text pa-2 fill-height">
                    </v-row>
                </v-img>

                <v-list>
                    <v-list-item link to="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Domov</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/onas">
                        <v-list-item-icon>
                            <v-icon>mdi-information</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>O nás</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-list-group v-if="accessToken!=null" v-model="miestnosti"
                              :prepend-icon="miestnosti ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                              append-icon="">
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Miestnosti
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <div>
                        <v-list-item v-for="(child, i) in rooms" :key="i" link v-bind:to="'/miestnost/' + child.id">
                            <v-list-item-action>
                                <v-icon>mdi-forum</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.nazov }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list-group>
                <v-list-group v-if="accessToken!=null" v-model="spravy"
                              :prepend-icon="spravy ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                              append-icon="">
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Správy
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <v-list-item link v-bind:to="'/chat/new'">
                        <v-list-item-action>
                            <v-icon>mdi-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Nová správa
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-for="(child, i) in messagelist" :key="i" link
                                 v-bind:to="'/chat/' + getMessageId(child.odosielatel)">
                        <v-list-item-avatar>
                            <img v-if="getMessageIcon(child.odosielatel) != null" :src=getMessageIcon(child.odosielatel)
                                 alt="profile">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.sprava }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ child.odosielatel }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                {{ child.timestamp !=null ? new Date(child.timestamp).toLocaleString() : ""}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

            </v-navigation-drawer>
            <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                <div class="d-flex align-center">
                    <v-img alt="Vuetify Logo" class="shrink mr-2" contain
                           src="./assets/logo.png" transition="scale-transition"
                           width="40"/>
                    <v-toolbar-title class="ml-0 pl-4">
                        <span class="hidden-xs-only">Johnnyho Pokec</span>
                    </v-toolbar-title>
                </div>
                <v-spacer/>
                <div class="text-center">
                    <v-menu :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-account</v-icon>
                            </v-btn>
                        </template>

                        <v-card v-if="accessToken!=null">
                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <img :src=photo alt="profile">
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ username }}</v-list-item-title>
                                        <v-list-item-subtitle class="meno">{{ first_name }} {{ last_name }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-divider/>
                            <v-list>
                                <v-list-item link to="/logout" v-on:click="stopInterval">
                                    <v-list-item-icon>
                                        <v-icon>mdi-logout</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>Odhlásiť sa</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>
                        <v-card v-if="accessToken==null">
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
                    </v-menu>
                </div>
            </v-app-bar>

            <v-content class="hello">
                <router-view/>
            </v-content>
            <v-footer color="primary lighten-1" padless>
                <v-row justify="center" no-gutters>
                    <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
                        2019-2020 — <strong>Ján Čáni</strong>
                    </v-col>
                </v-row>
            </v-footer>

        </v-app>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import store from './store'

  export default {
    name: 'app',
    computed: mapState(['accessToken', 'username', 'first_name', 'last_name', 'photo', 'rooms', 'messagelist', 'userslist']),
    data: () => ({
      miestnosti: false,
      spravy: false,
      dialog: false,
      drawer: null,
      interval: null,
    }),
    created: function () {
      if (store.getters.loggedIn) {
        this.$store.dispatch('loadRooms');
        this.fetchMessages();
        this.$store.dispatch('loadUsersList');
      }
    },
    methods: {
      getMessageIcon: function (username) {
        let list = this.$store.getters.userList
        if (list) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].username === username) {
              return list[i].photo
            }
          }
        }
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
      fetchMessages: function () {
        this.$store.dispatch('loadMessageList');
      },
      startInterval: function () {
        if (store.getters.loggedIn && this.interval == null) {
          this.interval = setInterval(this.fetchMessages, 1000);
        }
      },
      stopInterval: function () {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  };
</script>

<style>
    .meno {
        margin-top: 4px;
    }
</style>
