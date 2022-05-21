import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '@/views/Authentication.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Profile from '@/views/Profile.vue'
import Timeline from '@/views/Timeline.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '',
        component: Login
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/timeline',
        name: 'Timeline',
        component: Timeline
      },
      {
        path: '/post',
        name: 'Post',
        component: Post
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '',
        component: Timeline
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/login"
  },  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
