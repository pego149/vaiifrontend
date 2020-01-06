<template>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md8>
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Registrácia</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="Používateľské meno" v-model="username" :rules="[rules.required]" prepend-icon="mdi-account"/>
                                    <v-text-field label="Heslo" v-model="password" :rules="[rules.required]" prepend-icon="mdi-lock" type="password" loading>
                                        <template v-slot:progress>
                                            <v-progress-linear :value="progress" :color="color" absolute height="7"/>
                                        </template>
                                    </v-text-field>
                                    <v-text-field label="Heslo znovu"  v-model="confirm" name="pass" :rules="[rules.required, pass]" prepend-icon="mdi-lock" type="password"/>
                                    <v-text-field label="E-mail" v-model="email" prepend-icon="mdi-email" :rules="[rules.required, rules.email]"/>
                                    <v-text-field label="Krstné meno" v-model="first_name" :rules="[rules.required]" prepend-icon="mdi-pen"/>
                                    <v-text-field label="Priezvisko" v-model="last_name" :rules="[rules.required]" prepend-icon="mdi-pen"/>
                                    <v-text-field label="Titul" v-model="title" prepend-icon="mdi-school"/>
                                    <v-menu v-model="datemenu">
                                        <template v-slot:activator="{on}">
                                            <v-text-field
                                                    v-model="dob"
                                                    v-on="on"
                                                    prepend-icon="mdi-calendar"
                                                    label="Dátum narodenia"
                                                    :rules="[rules.required]"/>
                                        </template>
                                        <v-date-picker v-model="dob"/>
                                    </v-menu>
                                    <v-text-field label="Štát" :rules="[rules.required]" v-model="country" prepend-icon="mdi-earth"/>
                                    <v-text-field label="Mesto" :rules="[rules.required]" v-model="city" prepend-icon="mdi-city"/>
                                    <v-text-field label="Adresa" :rules="[rules.required]" v-model="address" prepend-icon="mdi-home"/>
                                    <v-text-field label="PSČ" :rules="[rules.required]" v-model="zip" prepend-icon="mdi-post"/>
                                    <v-file-input label="Fotka" accept="image/*" @change="onFileChange"/>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn :disabled="!formIsValid" type="file" color="primary" v-on:click="registerUser">Registrovať sa</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
</template>

<script>
  export default {
    name: "Register",
    data () {
      return {
        datemenu: '',
        username: '',
        password: '',
        confirm: '',
        email: '',
        first_name: '',
        last_name: '',
        title: '',
        address: '',
        dob: '',
        country: '',
        zip: '',
        city: '',
        photo: '',
        rules: {
          required: value => !!value || 'Povinné.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Neplatný e-mail.'
          },
        },
      }
    },
    computed: {
      progress () {
        return Math.min(100, this.password.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
      pass() {
        return () => (this.password === this.confirm) || 'Heslá sa musia zhodovať'
      },
      formIsValid () {
        return (
          this.username &&
          this.password &&
          this.confirm &&
          this.email &&
          this.first_name &&
          this.last_name &&
          this.dob &&
          this.address &&
          this.country &&
          this.city &&
          this.zip
        )
      },
    },
    methods: {
      registerUser () {
        let data = new FormData();
        data.append('username', this.username);
        data.append('password', this.password);
        data.append('email', this.email);
        data.append('first_name', this.first_name);
        data.append('last_name', this.last_name);
        data.append('title', this.title);
        data.append('dob', this.dob);
        data.append('address', this.address);
        data.append('country', this.country);
        data.append('city', this.city);
        data.append('zip', this.zip);
        data.append('photo', this.photo, this.photo.filename);
        this.$store.dispatch('registerUser', data
            ).then(() => {
          this.$router.push({ name: 'login' })
        })
      },
      onFileChange (e) {
        let files = e
        if(files !== undefined) {
          const fr = new FileReader ()
          fr.readAsDataURL(files)
          fr.addEventListener('load', () => {
            this.photo = files // this is an image file that can be sent to server...
          })
        } else {
          this.photo = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
