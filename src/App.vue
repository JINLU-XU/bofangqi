<template>
  <div @click.stop="div">
    <!-- 登录 -->
    <div class="Mask" v-show="ismask">
      <div class="denglu" v-show="isdeng">
        <span class="iconfont icon-cha1 sp" @click="ismask = false"></span>
        <div class="tt">登录账号</div>
        <div class="zh">
          账号:
          <input type="text" v-model="us" />
        </div>
        <div class="mima">
          密码:
          <input type="password" v-model="ps1" />
        </div>
        <div class="btn">
          <div @click="reg">登录</div>
        </div>
        <div class="tozc">
          <span @click="isdeng = !isdeng">注册</span> | 忘记密码?
        </div>
      </div>
      <div class="zhuce" v-show="!isdeng">
        <span class="iconfont icon-cha1 sp" @click="ismask = false"></span>
        <div class="tt">注册账号</div>
        <div class="zh">
          账号:
          <input type="text" v-model="username" />
        </div>
        <div class="mima">
          密码:
          <input type="password" v-model="password1" />
        </div>
        <div class="mima">
          确认密码:
          <input type="password" v-model="password2" />
        </div>

        <div class="btn">
          <div @click="log">注册</div>
        </div>
      </div>
    </div>

    <div class="all">
      <!-- 搜索栏 -->
      <div class="search w">
        <!-- logo -->
        <div class="logo1" @click="$router.push('/home')">
        <img class="img-auto fl" src="./assets/img/mida.png" alt="">
          <span style="font-size:25px;">咪哒音乐</span>
        </div>
        <!-- 搜索 -->
        <div class="ipt1">
          <div class="sear" v-show="isshow">
            <div
              class="val"
              v-for="(item,index) in hotsearch"
              :key="index"
              @click="val(index)"
            >{{item.name}}</div>
          </div>
          <input type="text" placeholder="海伦-游京" v-model="keywords" @click="focus1" />
          <div class="sou">
            <span
              class="iconfont icon-sousuosearch82"
              style="font-size:24px;color:#b2b2b2;"
              @click="sousuo"
            ></span>
          </div>
        </div>
        <!-- 右侧导航 -->
        <div class="sear_right">
          <ul>
            <li>客服中心</li>
            <li>招贤纳士</li>
            <li>会员中心</li>
          </ul>
          <div class="login" @click="login" v-show="isLogin">登录</div>
          <div class="login2" v-show="!isLogin">
            <div @click="$router.push('/my')">
              <img src="./assets/img/fly.png" alt />
            </div>
            <div>{{na}}</div>
            <div class="tui" @click="tui">退出</div>
          </div>
        </div>
      </div>

      <!-- 一级路由 -->
      <div class="nav">
        <div class="nav1 w">
          <div class="nav1_left">
            <ul>
              <router-link tag="li" to="/home">首页</router-link>
              <router-link tag="li" to="/list">榜单</router-link>
              <li>下载客户端</li>
              <li>
                更多
                <div class="nav1_span1">
                  <svg
                    t="1592035127021"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2632"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M508.025406 655.446718c-14.45307 0-28.183486-5.781228-39.023289-15.898376l-231.249118-231.249118c-10.117149-10.117149-10.117149-26.015526 0-36.132675s26.015526-10.117149 36.132675 0l231.249118 231.249118c2.16796 2.16796 4.335921 2.16796 5.781228 0l231.971771-231.971771c10.117149-10.117149 26.015526-10.117149 35.410021 0 10.117149 10.117149 10.117149 26.015526 0 36.132674l-231.971771 231.971772c-9.394495 10.117149-23.124912 15.898377-38.300635 15.898376z"
                      p-id="2633"
                      fill="#dddddd"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav1_right">
            <ul>
              <li>
                <span class="iconfont icon-ai64" style="font-size:15px"></span> 直播
              </li>
              <li>
                <span class="iconfont icon-shangcheng" style="font-size:15px"></span> 商城
              </li>
              <li>
                <span class="iconfont icon-V" style="font-size:15px"></span> 音乐人
              </li>
              <li>
                <span class="iconfont icon-dailishang" style="font-size:15px"></span> 代理商
              </li>
              <li>
                <span class="iconfont icon-maikefeng" style="font-size:15px"></span> 主播电台
              </li>
              <li>
                <span class="iconfont icon-RectangleCopy" style="font-size:15px"></span> 开放平台
              </li>
            </ul>
          </div>
        </div>
      </div>
      <router-view v-if="IsRouterAlive"></router-view>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  provide() {
    return {
      sousuo: this.sousuo,
      sousuo2: this.sousuo2
    };
  },
  data() {
    return {
      isshow: false,
      // 热门搜索
      hotsearch: [],
      keywords: "",
      songs: [],
      IsRouterAlive: true,
      isa: 1,
      isLogin: true,
      ismask: false,

      isdeng: true,

      username: null,
      password1: null,
      password2: null,

      us: null,
      ps1: null,

      na: null
    };
  },
  methods: {
    tui() {
      this.$store.state.username = null;
      this.isLogin = true;
      this.$router.push("/home");
      Toast("退出成功");
    },
    login() {
      this.ismask = true;
      this.isdeng = true;
    },
    // 注册点击事件
    log() {
      this.$axios
        .get("http://120.27.68.116:3001/register", {
          params: {
            username: this.username,
            password: this.password1,
            password2: this.password2
          }
        })
        .then(res => {
          
          if (res.data == 200) {
            Toast("注册成功");

            this.isdeng = !this.isdeng;
          } else if (res.data == 201) {
            Toast("注册失败");
          }
        });
    },
    // 登录点击事件
    reg() {
      this.$axios
        .get("http://120.27.68.116:3001/login", {
          params: {
            username: this.us,
            password: this.ps1
          }
        })
        .then(res => {
          
          if (res.data == 200) {
            Toast("登录成功");
            this.$store.state.username = "点点";
            this.na = this.$store.state.username;
            this.ismask = !this.ismask;
            this.isLogin = !this.isLogin;
          } else if (res.data == 201) {
            Toast("登录失败");
          }
        });
    },
    div() {
      this.isshow = false;
    },
    val(index) {
      // 
      // 
      this.$store.commit("song/key", this.hotsearch[index].name);
      this.IsRouterAlive = false;
      this.$nextTick(function() {
        this.IsRouterAlive = true;
      });
      this.$router.push("/search");
    },

    focus1() {
      if (this.keywords.length > 0) {
        this.isshow = true;
      }
    },

    sousuo() {
      if (this.keywords.length > 0) {
        this.$store.commit("song/sear", this.keywords);
        this.$router.push("/search");

        this.IsRouterAlive = false;
        this.$nextTick(function() {
          this.IsRouterAlive = true;
        });
      }
    }
  },
  created() {
    this.$store.state.isa = 1;
  },
  watch: {
    keywords: function(keywords) {
      this.isshow = true;
      if (this.keywords.length == 0) {
        this.isshow = false;
      }

      if (this.keywords.length > 0) {
        this.$axios.get("/search?keywords=" + keywords + "").then(res => {
          // 
          if (res.data.result.songs.length > 0) {
            this.hotsearch = [];
            for (let i = 0; i < 10; i++) {
              this.hotsearch.push(res.data.result.songs[i]);
            }
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.act11 {
  background-color: #0c8ed9 !important;
}
.img-auto{
   width: 100%;
  display: block;
}
.tui {
  margin-left: 10px;
  width: 40px;
  height: 20px;
  background-color: #1e84e4;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  cursor: pointer;
}
.Mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  & > .denglu {
    position: relative;
    width: 370px;
    height: 400px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -185px;
    margin-top: -200px;
    border-radius: 10px;
    & > .sp {
      font-size: 20px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    & > .tt {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      margin-top: 20px;
    }
    & > .mima {
      margin-top: 15px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      text-align: center;
      & > input {
        border: 1px solid #ddd;
      }
    }
    & > .zh {
      margin-top: 60px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      text-align: center;
      & > input {
        border: 1px solid #ddd;
      }
    }
    & > .btn {
      margin-top: 10px;
      width: 100%;
      height: 40;
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        width: 240px;
        height: 40px;
        background-color: #3985ff;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
    & > .tozc {
      margin-top: 10px;
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 16px;
      & > span {
        cursor: pointer;
      }
    }
  }
  & > .zhuce {
    position: relative;
    width: 370px;
    height: 400px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -185px;
    margin-top: -200px;
    border-radius: 10px;
    & > .sp {
      font-size: 20px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    & > .tt {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      margin-top: 20px;
    }
    & > .mima {
      margin-top: 15px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      text-align: center;
      & > input {
        border: 1px solid #ddd;
      }
    }
    & > .zh {
      margin-top: 60px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      text-align: center;
      & > input {
        border: 1px solid #ddd;
      }
    }
    & > .btn {
      margin-top: 10px;
      width: 100%;
      height: 40;
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        width: 240px;
        height: 40px;
        background-color: #3985ff;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
    & > .tozc {
      margin-top: 10px;
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 16px;
      & > span {
        cursor: pointer;
      }
    }
  }
}

.nav1_right {
  float: right;
  width: 50%;
  height: 100%;
}
.nav1_right ul {
  height: 100%;
  width: 460px;
  float: right;
}
.nav1_right ul li {
  float: left;

  height: 100%;
  text-align: center;
  padding: 0 10px;
  color: #ddd;
  display: flex;
  align-items: center;
}
.nav1_right ul li span {
  margin-right: 5px;
}

.all {
  width: 100%;
  background-color: #fff;
}
.w {
  width: 1000px;
  margin: 0 auto;
}
.search {
  height: 80px;
  // background-color: pink;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.logo1 {
  width: 150px;
  height: 37px;
  font-size: 25px !important;
  color: #129be2;
  &>img{
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-top: 2px;
  }
}
.ipt1 {
  width: 300px;
  height: 35px;
  margin-left: 50px;
  position: relative;
  & > .sear {
    width: 300px;
    max-height: 311px;
    overflow: hidden;
    position: absolute;
    bottom: -311px;
    left: 0;
    background-color: #fff;
    border: 1px solid #cccccc;
    border-top: 0;
    z-index: 200;
    padding: 5px;
    box-sizing: border-box;
    & > div {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      box-sizing: border-box;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    & > div:hover {
      background-color: #f4f4f4;
    }
  }
}
.ipt1 input {
  width: 300px;
  height: 100%;
  outline: none;
  border: 1px solid #cccccc;
  padding: 0 10px;
  box-sizing: border-box;
}
.sou {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  margin-top: -18px;
  right: 10px;
}

.sear_right {
  width: 390px;
  height: 30px;
  // background-color: skyblue;
  margin-left: 100px;
}
.sear_right ul {
  margin-left: 55px;
  line-height: 30px;
}
.sear_right ul li {
  float: left;
  margin-right: 15px;
  font-size: 13px;
}
.login {
  width: 50px;
  height: 30px;
  background-color: #169af3;
  text-align: center;
  line-height: 30px;
  float: right;
  color: #fff;
  position: relative;
  cursor: pointer;
}
.login::after {
  content: "";
  width: 1px;
  height: 20px;
  background-color: #e6e6e6;
  position: absolute;
  top: 5px;
  left: -35px;
}
.nav {
  width: 100%;
  height: 59px;
  background-color: #2c323b;
}
.nav_2 {
  height: 100%;
}
.nav1 {
  height: 100%;
}
.nav1_left {
  float: left;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.nav1_left ul li {
  color: #dddddd;
  float: left;
  height: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
}
.nav1_left ul li:hover {
  background-color: #0c8ed9;
  color: #fff;
}
.nav1_span1 {
  float: right;
  margin-top: 5px;
  margin-left: 5px;
}
.login2 {
  width: 130px;
  height: 30px;
  float: right;
  display: flex;
  align-items: center;
  & > div:nth-child(1) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>