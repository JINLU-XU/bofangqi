<template>
  <div>
    <div class="all2">
      <!-- 轮播图 -->
      <div class="lunbo">
        <!-- 遮罩 -->
        <div class="shade">
          <div class="shade_w">
            <div>
              <span
                class="iconfont icon-pc"
                style="font-size:25px;color:#e0d6d8;margin-right:20px;"
              ></span>下载PC版
            </div>
            <div>
              <span
                class="iconfont icon-iphone"
                style="font-size:25px;color:#e0d6d8;margin-right:20px;"
              ></span>下载iPhone版
            </div>
            <div>
              <span
                class="iconfont icon-anzhuo"
                style="font-size:25px;color:#e0d6d8;margin-right:20px;"
              ></span>下载Android版
            </div>
          </div>
        </div>
        <!-- 轮播 -->
        <div class="swiper-container newswiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in lunbo"
              :key="index"
              :style="{backgroundImage:item.src}"
            ></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination swiper-pagination-white"></div>
          <!-- Add Arrows -->
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>
      </div>

      <!-- 精选歌单 -->
      <div class="w" id="omnibus">
        <div class="om_top">
          <div class="om_tLeft">
            <div class="om_tt">
              <span class="omtt-span1">
                <span>精选</span>歌单
              </span>
              <span class="omtt-span2" @click="$router.push('/songLists')">更多</span>
            </div>

            <!--  -->
            <div class="om_bb">
              <div class="ob-l pr b cur" @click="gd">
                <div class="obl1_b">
                  <div>{{gd2}}</div>
                  <div>{{gd3}}</div>
                </div>
                <div class="mask1">
                  <span class="iconfont icon-bofang2"></span>
                </div>
                <img :src="gd1" alt />
              </div>
              <div class="ob-r">
                <div class="obr1">
                  <div
                    class="pr b obr11 cur"
                    v-for="(item,index) in sl"
                    :key="index"
                    @click="gd_gd(index)"
                  >
                    <div class="mask1">
                      <span class="iconfont icon-bofang2"></span>
                    </div>
                    <img :src="item.picUrl" alt />
                    <div class="obl2_b">
                      <div>{{item.name}}</div>
                      <div>{{item.copywriter}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 精选歌单右边 -->
          <div class="om_tRight">
            <div class="or_t">
              <span class="ort-span1">
                <span>热门</span>榜单
              </span>
              <span class="ort-span2 cur act2" @click="$router.push('/list')">更多</span>
            </div>

            <div class="or_b">
              <div
                class="orb1 cur"
                v-for="(item5,index5) in hotbd"
                :key="index5"
                @click="$router.push('/list')"
              >
                <div class="orb1_img pr">
                  <div class="mask5">
                    <span class="iconfont icon-bofang" style="font-size:40px;"></span>
                  </div>
                  <img :src="item5.img" alt />
                </div>
                <div class="orb1_l">
                  <div>{{item5.title}}</div>
                  <div>
                    1 .
                    <span>{{item5.music1}}</span>
                    <span class="iconfont icon-youjiantou fr" style="font-size:16px;color:#dddddd;"></span>
                  </div>
                  <div>
                    2 .
                    <span>{{item5.music2}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="om_bot">
          <img src="../assets/img/gg1.png" alt />
        </div>
      </div>
      <!-- 新歌首发 -->
      <div class="w" id="first">
        <!-- 首发上部分 -->
        <div class="first_top">
          <!-- 上左部分 -->
          <div class="ft-left pr">
            <div class="ftl-top">
              <span class="ftlt1">
                <span>歌曲</span>榜单
              </span>
              <ul>
                <li
                  v-for="(item,index6) in coun"
                  :key="index6"
                  @mouseover="nation(index6)"
                  :class="{act4:isshow2==index6}"
                >{{item.nation}}</li>
              </ul>
            </div>
            <div class="ftl-bot">
              <div class="ftb">
                <ul>
                  <li v-for="(item,index) in mus" :key="index" @click="music(index)">
                    <span>
                      {{item.ar[0].name}} - {{item.name}}
                      <span class="ftb_span">独家</span>
                    </span>

                    <span class="time">{{item.dt|time}}</span>
                    <span
                      class="iconfont icon-xiazai ftb_span2"
                      style="font-size:18px;float:right;margin-right:20px;color:#999;"
                    ></span>
                    <span
                      class="iconfont icon-icon-- ftb_span2"
                      style="font-size:18px;float:right;margin-right:10px;color:#999;"
                    ></span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="fenye" style="user-select:none">
              <span
                class="iconfont icon-zuojiantou cur"
                style="font-size:12px;color:#555555;"
                @click="left"
              ></span>
              <span>{{pageNum}}</span> /
              <span>3</span>
              <span
                class="iconfont icon-youjiantou cur"
                style="font-size:12px;color:#555555;"
                @click="right"
              ></span>
            </div>
          </div>
          <!-- 上右部分 -->
          <div class="ft-right">
            <div class="ftr-top1">
              <span class="ftlt1">
                <span>推荐</span>MV
              </span>
              <span class="omtt-span2 cur act2">更多</span>
            </div>
            <div class="ftr-bot1">
              <div class="ftrb1 pr b2">
                <div class="mask2">
                  <span class="iconfont icon-bofang2"></span>
                </div>
                <!-- <div class=""></div> -->
                <img src="../assets/img/shou1.png" alt />
                <div class="obl2_b">
                  <div>Up To Me</div>
                  <div>宋茜</div>
                </div>
              </div>
              <div class="ftrb2">
                <div class="ftrb2_d1" v-for="(item1,index1) in tuijian" :key="index1">
                  <div class="ftrb2_dd1 pr b2">
                    <div class="mask2">
                      <span class="iconfont icon-bofang2"></span>
                    </div>
                    <img :src="item1.img" alt />
                  </div>
                  <div class="ftrb2_dd2 ov">{{item1.tit1}}</div>
                  <div class="ftrb2_dd3 ov">{{item1.tit2}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 首发下部分 -->
        <div class="first_bot">
          <img src="../assets/img/gg2.png" alt />
        </div>
      </div>
      <!-- 热门电台 -->
      <div class="w" id="hotdj">
        <div class="hotdj_top">
          <div class="ht-left">
            <div class="om_tt">
              <span class="omtt-span1">
                <span>热门</span>电台
              </span>
            </div>
         
            <div class="htl_b">
              <div
                class="htlb1 b3 cur"
                v-for="(item2,index2) in dj"
                :key="index2"
                @click="dtdj(index2)"
              >
                <div class="htlb1_img pr">
                  <div class="mask3">
                    <span class="iconfont icon-bofang"></span>
                  </div>
                  <img :src="item2.picUrl" alt />
                </div>
                <div class="htlb1_font">{{item2.name}}</div>
              </div>
            </div>
          </div>
          <!-- 热门电台右部分 -->
          <div class="ht-right">
            <div class="htr_top">
              <div class="ftr-top1">
                <span class="ftlt1">
                  <span>热门</span>歌手
                </span>
                <span class="omtt-span2 cur act2">更多</span>
              </div>
            </div>
            <!-- 右下 -->
            <div class="htr_bot pr">
              <div
                v-for="(item,index) in hs"
                :key="index"
                :class="{htrb_top:index==0,htrb_bot:index==1}"
              >
                <div v-for="(item2,index2) in item" :key="index2" class="cur">
                  <div class="mask4"></div>
                  <span>{{item2.name}}</span>
                  <img :src="item2.img" alt />
                </div>
              </div>
              <ul>
                <li
                  v-for="item4 in 3"
                  :key="item4"
                  :class="{act:isshow==item4}"
                  @mouseover="hss(item4)"
                ></li>
              </ul>
            </div>
            <!-- 右下 -->
          </div>
          <!-- 热门电台右部分 -->
        </div>
        <div class="hotdj_bot">
          <img src="../assets/img/gg3.png" alt />
        </div>
      </div>
      <!-- 友情链接 -->
      <div class="w" id="friend">
        <div class="friend_top">
          <div class="or_t">
            <span class="ort-span1">
              <span>友情</span>链接
            </span>
            <span class="ort-span2 cur act2">更多</span>
          </div>
        </div>
        <div class="friend_bot">
          <a
            href="javascript:void(0);"
            class="fb_a"
            v-for="(item,index) in friend"
            :key="item+index"
          >{{item.name}}</a>
        </div>
      </div>
      <!-- 友情链接 -->
    </div>
      <kgorder></kgorder>
  </div>
</template>

<script>
import Swiper from "swiper";
import kgorder from "../components/kgorder/kugouorder.vue";
export default {
  data() {
    return {
      isshow: 1,
      isshow2: 0,
      hs: null,
      hsinger: [
        [
          { img: require("../assets/img/hs1.png"), name: "周杰伦" },
          { img: require("../assets/img/hs2.png"), name: "刘德华" }
        ],
        [
          { img: require("../assets/img/hs3.png"), name: "小阿枫" },
          { img: require("../assets/img/hs4.png"), name: "薛之谦" },
          { img: require("../assets/img/hs5.png"), name: "林俊杰" }
        ]
      ],
      lunbo: [
        { src: "url(" + require("../assets/img/lun6.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun1.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun3.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun4.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun5.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun6.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun7.png") + ")" },
        { src: "url(" + require("../assets/img/lun8.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun10.jpg") + ")" },
        { src: "url(" + require("../assets/img/lun7.jpg") + ")" }
      ],

      tuijian: [
        {
          img: require("../assets/img/shou2.png"),
          tit2: "《酷爱大牌》第96期：Dua Lipa啪姐独家专访"
        },
        {
          img: require("../assets/img/shou3.png"),
          tit1: "深度对话邓紫棋：我已经浴火重生成凤凰",
          tit2: "由你音乐榜、G.E.M. 邓紫棋"
        }
      ],

      hotSinger: [
        [
          [
            { img: require("../assets/img/hs1.png"), name: "周杰伦" },
            { img: require("../assets/img/hs2.png"), name: "刘德华" }
          ],
          [
            { img: require("../assets/img/hs3.png"), name: "小阿枫" },
            { img: require("../assets/img/hs4.png"), name: "薛之谦" },
            { img: require("../assets/img/hs5.png"), name: "林俊杰" }
          ]
        ],

        [
          [
            { img: require("../assets/img/hs21.png"), name: "张学友" },
            { img: require("../assets/img/hs22.png"), name: "G.E.M.邓紫棋" }
          ],
          [
            { img: require("../assets/img/hs23.png"), name: "刀郎" },
            { img: require("../assets/img/hs24.png"), name: "半吨兄弟" },
            { img: require("../assets/img/hs25.png"), name: "毛不易" }
          ]
        ],
        [
          [
            { img: require("../assets/img/hs31.png"), name: "花姐" },
            { img: require("../assets/img/hs32.png"), name: "海来阿木" }
          ],
          [
            { img: require("../assets/img/hs33.png"), name: "许嵩" },
            { img: require("../assets/img/hs34.png"), name: "黄家驹" },
            { img: require("../assets/img/hs35.png"), name: "阿悠悠" }
          ]
        ]
      ],
      friend: [
        { href: "", name: "爱美网" },
        { href: "", name: "汽车论坛" },
        { href: "", name: "IT之家" },
        { href: "", name: "iphone游戏" },
        { href: "", name: "旅游攻略" },
        { href: "", name: "华为商城" },
        { href: "", name: "365音乐网" },
        { href: "", name: "软件下载" },
        { href: "", name: "漫漫看漫画" },
        { href: "", name: "手机游戏" },
        { href: "", name: "5sing原创音乐" },
        { href: "", name: "腾讯音乐人" },
        { href: "", name: "豌豆荚" },
        { href: "", name: "5sing众筹" },
        { href: "", name: "智能电视网" }
      ],
      coun: [
        { nation: "新歌榜" },
        { nation: "热歌榜" },
        { nation: "原创榜" },
        { nation: "飙升榜" }
      ],
      hotbd: [
        {
          img: require("../assets/img/hot1.png"),
          title: "酷狗飙升榜",
          music1: "张云雷 - 探清冰河",
          music2: "李碧华 - 分手"
        },
        {
          img: require("../assets/img/hot2.png"),
          title: "酷狗TOP500",
          music1: "大壮 - 上了年纪的男人",
          music2: "山水组合 - 你莫走"
        },
        {
          img: require("../assets/img/hot3.png"),
          title: "网络红歌榜",
          music1: "崔伟立 - 酒醉的蝴蝶",
          music2: "马健涛 - 忘情牛肉面"
        }
      ],
      mus: null,
      ChinaMusic: [],
      EnglandMusic: [],
      hanguoMusic: [],
      JapanMusic: [],
      all: [],
      Cm1: [],
      Cm2: [],
      Cm3: [],
      //传给vuex的歌曲数据
      lis: [],
      //页数
      pageNum: 1,
      //精选歌单
      songlists: null,

      gd1: null,
      gd2: "",
      gd3: "",
      sl: [],
      //电台
      dj: []
    };
  },
  methods: {
    // dj
    dtdj(index2) {
      
      this.$store.commit("song/addDJ", this.dj[index2].id);
      this.$router.push("/dj");
    },
    //歌单1
    gd() {
      this.$store.commit("songlists/add", this.songlists[0].id);
      this.$router.push("/songorder");
    },
    //歌单2
    gd_gd(index) {
      this.$store.commit("songlists/add", this.sl[index].id);
      this.$router.push("/songorder");
    },
    music(index) {
      if (this.pageNum == 1) {
        this.lis = this.Cm1[index];
      } else if (this.pageNum == 2) {
        this.lis = this.Cm2[index];
      } else if (this.pageNum == 3) {
        this.lis = this.Cm3[index];
      }
      this.$store.commit("song/add", this.lis);

      this.$router.push("/music");
    },
    hss(item4) {
      //  
      this.isshow = item4;

      if (item4 == 1) {
        this.hs = this.hotSinger[0];
      } else if (item4 == 2) {
        this.hs = this.hotSinger[1];
      } else if (item4 == 3) {
        this.hs = this.hotSinger[2];
      }
    },
    right() {
      if (this.pageNum < 3) {
        this.pageNum += 1;
      }
      switch (this.pageNum) {
        case 1:
          this.mus = this.Cm1;
          break;
        case 2:
          this.mus = this.Cm2;
          break;
        case 3:
          this.mus = this.Cm3;
          break;
      }
    },
    left() {
      if (this.pageNum > 1) {
        this.pageNum -= 1;
      }
      switch (this.pageNum) {
        case 1:
          this.mus = this.Cm1;
          break;
        case 2:
          this.mus = this.Cm2;
          break;
        case 3:
          this.mus = this.Cm3;
          break;
      }
    },
    nation(index6) {
      this.isshow2 = index6;
      this.Cm1 = [];
      this.Cm2 = [];
      this.Cm3 = [];
      this.pageNum = 1;
      // 

      //华语
      if (index6 == 0) {
        for (let i = 0; i < 24; i++) {
          if (i >= 0 && i < 8) {
            this.Cm1.push(this.ChinaMusic.data.playlist.tracks[i]);
          } else if (i >= 8 && i < 16) {
            this.Cm2.push(this.ChinaMusic.data.playlist.tracks[i]);
          } else if (i >= 16 && i < 24) {
            this.Cm3.push(this.ChinaMusic.data.playlist.tracks[i]);
          }
        }
        this.mus = this.Cm1;
      }
      //欧美
      if (index6 == 1) {
        for (let i = 0; i < 24; i++) {
          if (i >= 0 && i < 8) {
            this.Cm1.push(this.EnglandMusic.data.playlist.tracks[i]);
          } else if (i >= 8 && i < 16) {
            this.Cm2.push(this.EnglandMusic.data.playlist.tracks[i]);
          } else if (i >= 16 && i < 24) {
            this.Cm3.push(this.EnglandMusic.data.playlist.tracks[i]);
          }
        }
        this.mus = this.Cm1;
      }
      //韩国
      if (index6 == 2) {
        for (let i = 0; i < 24; i++) {
          if (i >= 0 && i < 8) {
            this.Cm1.push(this.hanguoMusic.data.playlist.tracks[i]);
          } else if (i >= 8 && i < 16) {
            this.Cm2.push(this.hanguoMusic.data.playlist.tracks[i]);
          } else if (i >= 16 && i < 24) {
            this.Cm3.push(this.hanguoMusic.data.playlist.tracks[i]);
          }
        }
        this.mus = this.Cm1;
      }
      //日本
      if (index6 == 3) {
        for (let i = 24; i < 48; i++) {
          if (i >= 24 && i < 32) {
            this.Cm1.push(this.hanguoMusic.data.playlist.tracks[i]);
          } else if (i >= 32 && i < 40) {
            this.Cm2.push(this.hanguoMusic.data.playlist.tracks[i]);
          } else if (i >= 40 && i < 48) {
            this.Cm3.push(this.hanguoMusic.data.playlist.tracks[i]);
          }
        }
        this.mus = this.Cm1;
      }
    }
  },
  created() {
    //电台
    this.$axios.get("/dj/recommend").then(res => {
      for (let i = 0; i < res.data.djRadios.length; i++) {
        this.dj.push(res.data.djRadios[i]);
      }
      // 
    });
    //精选歌单
    // 获取五个歌单
    this.$axios.get("/personalized?limit=5").then(res => {
      this.songlists = res.data.result;
      // 
      this.gd1 = this.songlists[0].picUrl;
      this.gd2 = this.songlists[0].name;
      this.gd3 = this.songlists[0].copywriter;
      for (let i = 1; i < this.songlists.length; i++) {
        this.sl.push(this.songlists[i]);
      }
      // 
    });
    //歌曲榜单列表
    this.hs = this.hsinger;
    //  华语
    this.$axios.get("/top/list?idx=0").then(res => {
      this.all.push(res);
    });

    this.$axios.get("/top/list?idx=1").then(res => {
      // this.EnglandMusic = res
      this.all.push(res);
    });
    this.$axios.get("/top/list?idx=2").then(res => {
      // this.hanguoMusic = res
      this.all.push(res);
    });
    this.$axios.get("/top/list?idx=3").then(res => {
      // this.JapanMusic = res
      this.all.push(res);
      // 
      this.ChinaMusic = this.all[0];
      this.EnglandMusic = this.all[1];
      this.hanguoMusic = this.all[2];
      this.JapanMusic = this.all[0];

      //  this.mus = this.ChinaMusic
      for (let i = 0; i < 24; i++) {
        if (i >= 0 && i < 8) {
          this.Cm1.push(this.ChinaMusic.data.playlist.tracks[i]);
        } else if (i >= 8 && i < 16) {
          this.Cm2.push(this.ChinaMusic.data.playlist.tracks[i]);
        } else if (i >= 16 && i < 24) {
          this.Cm3.push(this.ChinaMusic.data.playlist.tracks[i]);
        }
      }
      this.mus = this.Cm1;
    });
  },
  filters: {
    time(data) {
      // 500000  04:02    25623154
      //分钟
      let date1 =
        Math.round(data / 1000 / 60) < 10
          ? "0" + Math.round(data / 1000 / 60)
          : Math.round(data / 1000 / 60);
      //秒
      let date2 =
        Math.round((data / 1000) % 60) < 10
          ? "0" + Math.round((data / 1000) % 60)
          : Math.round((data / 1000) % 60);
      return date1 + ":" + date2;
    }
  },
  mounted() {
    new Swiper(".newswiper", {
      spaceBetween: 30,
      effect: "fade",
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  },
  components: {
    kgorder
  }
};
</script>

<style lang="scss" scoped>
.act2:hover {
  color: #009af3;
}
.act {
  background-color: #009af3 !important;
}
.ov {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cur {
  cursor: pointer;
}
#friend {
  height: 150px;
  margin-top: 50px;
  // background-color: pink;
}
.friend_top {
  width: 100%;
  height: 30px;
}
.friend_bot {
  width: 100%;
  height: 90px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}
.fb_a {
  width: 125px;
  height: 24px;

  color: #555555;
  font-size: 13px;
}
.fb_a:hover {
  color: #009af3;
}
.ftb_span {
  font-size: 8px;
  border: 1px solid #ff7f0d;
  color: #ff7f0d;
  border-radius: 4px;
  // line-height: 10px;
  margin-left: 10px;
}
.ftb_span2 {
  display: none;
}

.fr {
  float: right;
}
img {
  width: 100%;
  height: 100%;
}
.shade_w {
  width: 700px;
  height: 100%;
  margin: 0 auto;
  // background-color: pink;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.shade_w div {
  // width: 80px;
  height: 100%;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 16px;
  position: relative;
}
.shade_w div:nth-child(1)::before {
  content: "";
  width: 1px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 25px;
  right: -50px;
}
.shade_w div:nth-child(2)::after {
  content: "";
  width: 1px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 25px;
  right: -50px;
}
#omnibus {
  // background-color: skyblue;
  margin-top: 50px;

  height: 480px;
}

.om_top {
  width: 100%;
  height: 385px;
}
.om_tLeft {
  width: 650px;
  height: 100%;
  float: left;
  // background-color: pink;
}
.om_tt {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.omtt-span1 {
  font-size: 28px;
  color: #a6a6a6;
}
.omtt-span1 span {
  color: #2aa8f6;
}
.omtt-span2 {
  float: right;
  color: #999999;
  cursor: pointer;
}
.omtt-span2:hover {
  color: #009af3;
}
.om_bb {
  width: 100%;
  height: 355px;
  padding-top: 30px;
  box-sizing: border-box;
}
.ob-l {
  width: 49%;
  height: 325px;
  float: left;
}
.ob-r {
  width: 50%;
  height: 325px;
  float: right;
  // margin-left: 5px;
}

.obr1 {
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div:nth-child(1) {
    margin-bottom: 5px;
  }
  & > div:nth-child(2) {
    margin-bottom: 5px;
  }
}

.obr11 {
  width: 160px;
  height: 160px;
}
.obr2 > div {
  width: 160px;
  height: 160px;
  margin-top: 2px;
}
.om_tRight {
  width: 320px;
  height: 100%;
  float: right;
}
.or_t {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.ort-span1 {
  font-size: 28px;
  color: #a6a6a6;
}
.ort-span1 span {
  color: #2aa8f6;
}
.ort-span2 {
  float: right;
  color: #999999;
}
.or_b {
  width: 100%;
  height: 355px;
  padding-top: 30px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.orb1 {
  width: 100%;
  height: 95px;
  margin-bottom: 20px;
}
.orb1:nth-child(3) {
  margin-bottom: 0px;
}
.orb1_img {
  width: 95px;
  height: 95px;
  float: left;
}
.orb1_l {
  width: 225px;
  height: 100%;
  padding: 10px 10px;
  float: right;
  box-sizing: border-box;
}
.orb1_l div {
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
.orb1_l div:nth-child(1) {
  font-weight: 700;
  color: #333333;
}

.om_bot {
  width: 100%;
  height: 80px;
  margin-top: 15px;
}
.obl1_b {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  box-sizing: border-box;
}
.obl1_b div:nth-child(1) {
  width: 90%;
  color: #fff;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.obl1_b div:nth-child(2) {
  width: 80%;
  color: #bfcfcf;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.obl2_b {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  box-sizing: border-box;
}
.obl2_b div:nth-child(1) {
  width: 70%;
  height: 21px;
  font-size: 14px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.obl2_b div:nth-child(2) {
  height: 21px;
  width: 70%;
  font-size: 14px;
  color: #bfcfcf;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.all2 {
  width: 100%;
  margin: 0;
  padding: 0;
}
.w {
  width: 1000px;
  margin: 0 auto;
}
.lunbo {
  width: 100%;
  height: 430px;
  position: relative;
  // z-index: -1;
}
.newswiper {
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  background-repeat: no-repeat;
  background-position: center center;
}

.swiper-pagination {
  margin-bottom: 60px;
}
.shade {
  width: 100%;
  height: 60px;

  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  // filter: blur(90px);

  z-index: 100;
}
.pr {
  position: relative;
}
.mask1 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 500;
}
.mask1 span {
  position: absolute;
  bottom: 0px;
  right: 10px;
  font-size: 30px;
  color: #fff;
}
.b:hover .mask1 {
  display: block;
}
.b2:hover .mask2 {
  display: block;
}
.b3:hover .mask3 {
  display: block;
}
.b3:hover .htlb1_font {
  color: #00a7f6;
}
.b3:hover .htlb2_font {
  color: #00a7f6;
}
.b4:hover .mask4 {
  display: block;
}
.mask2 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 500;
}
.mask2 span {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -30px;
  font-size: 40px;
  color: #fff;
}
.mask3 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 500;
}
.mask3 span {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -30px;
  font-size: 40px;
  color: #fff;
}
.mask4 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.mask5 {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.mask5 span {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -30px;
  font-size: 40px;
  color: #fff;
  font-size: 30px;
}
.orb1:hover .mask5 {
  display: block;
}

#first {
  // background-color: pink;
  margin-top: 50px;
}
.first_top {
  width: 100%;
  height: 380px;
}
.ft-left {
  width: 650px;
  height: 100%;
  float: left;
  // background-color: skyblue;
}
.ftl-top {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.ftlt1 {
  font-size: 28px;
  color: #a6a6a6;
  float: left;
}
.ftlt1 span {
  color: #2aa8f6;
}

.ftl-top ul {
  float: left;
  margin-left: 50px;
}
.ftl-top ul li {
  float: left;
  font-size: 14px;
  margin-right: 20px;
  color: #000;
  cursor: pointer;
}
.act4 {
  color: #009af3 !important;
}
.first_bot {
  width: 100%;
  height: 100px;
  margin-top: 40px;
}

.ftl-bot {
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
  width: 100%;
  height: 300px;
  // background-color: pink;
  padding: 10px 0;
  box-sizing: border-box;
  overflow: hidden;
}
.ftl-bot ul li {
  font-size: 14px;
  color: #333;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  cursor: pointer;
}
.ftl-bot ul li:hover {
  background-color: #f5f8fb;
  color: #00a6f5;
}
.ftl-bot ul li:hover .ftb_span {
  display: none;
}
.ftl-bot ul li:hover .ftb_span2 {
  display: block;
}
.time {
  float: right;
}
.fenye {
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -18px;
}

.ft-right {
  width: 320px;
  float: right;
  height: 100%;
}
.ftr-top1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.ftr-bot1 {
  width: 100%;
  height: 330px;
  margin-top: 20px;
  // background-color: skyblue;
}
.ftrb1 {
  width: 100%;
  height: 175px;
}
.ftrb2 {
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.ftrb2_d1 {
  width: 154px;
  height: 125px;
}
.ftrb2_dd1 {
  width: 100%;
  height: 84px;
  margin-bottom: 5px;
}
.ftrb2_dd2 {
  font-size: 14px;
  color: #444;
}
.ftrb2_dd3 {
  width: 90%;
  font-size: 12px;
  color: #888888;
}
#hotdj {
  margin-top: 50px;
}
.hotdj_top {
  width: 100%;
  height: 370px;
}
.ht-left {
  width: 650px;
  height: 100%;
  float: left;
}
.hotdj_bot {
  width: 100%;
  height: 100px;
  margin-top: 40px;
}
.htl_b {
  width: 100%;
  height: 310px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.htl_b1 {
  width: 100%;
  height: 155px;
  display: flex;
  justify-content: space-between;
}
.htlb1 {
  width: 110px;
  height: 155px;
}
.htlb1_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.htlb1_font {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #333333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ht-right {
  width: 320px;
  height: 370px;
  float: right;
  // background-color: pink;
}
.htr_bot {
  width: 100%;
  height: 310px;
  margin-top: 30px;
  // background-color: skyblue;
}
.htrb_top {
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: space-between;
}
.htrb_top > div {
  width: 158px;
  height: 158px;
  position: relative;
}
.htrb_top > div > span {
  font-size: 14px;
  color: #fff;
  position: absolute;
  bottom: 5px;
  left: 5px;
}
.htrb_top > div:hover .mask4 {
  display: block;
}
.htrb_bot {
  width: 100%;
  height: 105px;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
}
.htrb_bot > div {
  width: 103px;
  height: 103px;
  position: relative;
}
.htrb_bot > div > span {
  font-size: 14px;
  color: #fff;
  position: absolute;
  bottom: 5px;
  left: 5px;
}
.htrb_bot > div:hover .mask4 {
  display: block;
}

.htr_bot ul {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -22.5px;
}
.htr_bot ul li {
  width: 5px;
  height: 5px;
  float: left;
  margin-right: 15px;
  border-radius: 50%;
  background-color: #cccccc;
}
.htr_bot ul li:nth-child(3) {
  margin-right: 0;
}
</style>