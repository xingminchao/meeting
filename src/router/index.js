import Vue from 'vue'
import VueRouter from 'vue-router'
import * as utils from '@/utils'
import store from '@/store'
import Layout from '@/views/layout/index.vue'


Vue.use(VueRouter)

const routes = [
    {
    path: '/404',
    name: '404',
    component: () => import('@/views/test.vue')
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/',
    name: '/',
    redirect: '/menu/index',
    component: () => import('@/views/menu/index.vue')
  },
  {
    path: '/login',
    name: '/Login',
    meta: {
      queryObj: {
        type: 'login'
      }
    },
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   path: '/register',
  //   name: '/Register',
  //   component: () => import('../views/login/Register.vue')
  // },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/index',
    children: [
      {
        path: 'index',
        name: 'agendaIndex',
        meta: {
          requireAuth: true,
          activeMenu: 'agendaIndex'
        },
        component: () => import('@/views/menu/index.vue')
      },
      {
        path: 'stage',
        name: 'mainStage',
        meta: {
          requireAuth: true,
          activeMenu: 'mainStage'
        },
        component: () => import('@/views/menu/stage.vue')
      },
      {
        path: 'pavilion',
        name: 'ThePavilion',
        meta: {
          requireAuth: true,
          activeMenu: 'ThePavilion'
        },
        component: () => import('@/views/menu/ThePavilion.vue')
      },
      {
        path: 'issue',
        name: 'issue',
        meta: {
          requireAuth: true,
          activeMenu: 'issue'
        },
        component: () => import('@/views/menu/issue.vue')
      }
    ]
  },
]


const router = new VueRouter({
  routes,
  mode: 'history',
  // linkActiveClass:'active'
})

router.beforeEach(async(to, from,next) => {
  console.log(to, '路由t哦 form状态', from,next)

  if (to.meta.requireAuth) {
    let Token = sessionStorage.getItem("userInfo");
    console.log(typeof(Token),'vgserghdfghftuyj')
    console.log(Token, '获取到的token')
    if (!Token) {
      console.log(Token,'是否存在')
      next({
      replace: true,
      path:'/login?type=login'
      })
    } else {
     next()
    }
  } else {
    next(
      console.log('其他通道')
    )
  }
})

router.afterEach((to, from) => { })


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch((error) => error)
}


export default router
