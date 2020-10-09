import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home/home.js";
import music from "./home/music.js";
import dj from "./home/dj.js";
import my from "./home/my.js";




import songLists from "./home/songLists.js";
import songorder from "./home/songorder.js";
import search from "./home/search.js";
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}







Vue.use(VueRouter);

const routes = [
  {path:'/',redirect:'/home'},
  ...home,//首页
  music,//音乐界面
  songLists,//歌单界面
  songorder,//歌单详情页
  search,//搜索
  dj,//电台
  my,//个人中心
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"act11",
});

export default router;
