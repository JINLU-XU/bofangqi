import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import "./assets/css/base.css"
import "./assets/font/iconfont.css"

import 'vant/lib/index.css';
// import Vant from 'vant';
import "swiper/css/swiper.min.css";

import axios from "axios"

// router.beforeEach((to,from,next)=>{
//   next(true)
// })
// router.afterEach((to,from)=>{
//   
//   
// })


Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://music.kele8.cn'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
