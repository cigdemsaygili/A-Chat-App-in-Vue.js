import Vue from 'vue'
import VueRouter from 'vue-router'
import PrivateChat from  '../views/PrivateChat'
import SignIn from '../views/SignIn'
import CreateAccount from '../views/CreateAccount'
import LoginScreen from '../views/LoginScreen'
Vue.use(VueRouter)

const routes = [
  {
    path:'/', 
    component:LoginScreen
  },
  {
    path:'/signIn',
    name:'Login',
    component:SignIn
  },
  {
    path:'/createAcc',
    name:'CreateAcc',
    component:CreateAccount
  },
  {
    path: '/home',
    name: 'Home',
    component: PrivateChat
  }
  
]

const router = new VueRouter({
  routes
})

export default router
