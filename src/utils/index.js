import router from '@/router'
import store from '@/store';


export const replaceRouter = function (routerObj, obj) {
  //  console.log(routerObj,"fdghrgr")
  let queryMsg = JSON.parse(JSON.stringify(routerObj.query))
  // console.log(queryMsg,"htdhyjnfjhyf",routerObj)
  router.replace({
    name: routerObj.name,
    query: Object.assign(queryMsg, obj),
  })
}
