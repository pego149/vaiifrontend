import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Onas from '@/components/Onas'
import Miestnost from '@/components/Miestnost.vue'
import Chat from '@/components/Chat.vue'
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import Register from "@/components/Register";
import NotFound from "@/components/NotFound";
import NewMessage from "@/components/NewMessage";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Hello},
    {path: '/onas', component: Onas},
    {path: '/miestnost/:id', name: 'Miestnost', component: Miestnost},
    {path: '/chat/new', name: 'NewMessage', component: NewMessage},
    {path: '/chat/:id', name: 'Chat', component: Chat},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register, meta: {requiresLogged: true}},
    {path: '/logout', name: 'logout', component: Logout, meta: {requiresAuth: true}},
    {path: '*', name: 'NotFound', component: NotFound,}
  ]
})
