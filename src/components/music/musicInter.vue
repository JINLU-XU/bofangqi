<template>
  <div>
    <div class="all2" @mousemove.prevent="mou" @mouseup.prevent="mous">
      <!-- /遮罩层 -->
      <div class="mask" @click.stop="isShow2 = false;isStyle = false;isvol=false"></div>
      <div
        class="bgc"
        v-for="(item,index) in img"
        :key="index"
        :style="{backgroundImage:'url('+songspicurl+')'}"
      ></div>
      <!-- 上部分 -->
      <div class="w" id="mus_top">
        <div class="song">
          <div class="song_left">
            <img :src="songspicurl" alt />
          </div>
          <div class="song_right">
            <div class="songName">{{songName}}</div>
            <div class="songMseeage">
              <div>
                <div>专辑:</div>
                <div>{{zhuanji}}</div>
              </div>
              <div>
                <div>歌手:</div>
                <div>{{singer}}</div>
              </div>
            </div>
            <!-- 歌词 -->
            <div class="lyric" @scroll="scroll">
              <div class="islrc" v-show="islrc">暂无歌词</div>
              <ul>
                <li v-for="(item,index) in ly" :key="index" :class="{active:index==act}">{{item[1]}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 下部分 -->
      <div class="mus_bot">
        <div class="w" id="mb">
          <!-- 播放 -->
          <div class="nextSong">
            <span class="iconfont icon-shangyishou" style="font-size:36px;" @click="beSong"></span>
            <span
              class="iconfont icon-iconset0481"
              style="font-size:50px;"
              @click="playSong"
              v-show="isHas"
            ></span>
            <span
              class="iconfont icon-zanting"
              style="font-size:50px;"
              @click="playSong"
              v-show="!isHas"
            ></span>
            <span class="iconfont icon-xiayishou" style="font-size:36px;" @click="next1"></span>
          </div>
          <!-- 头像 -->
          <div class="tx">
            <img :src="songspicurl" alt />
          </div>
          <!-- 进度条 -->
          <div class="bar">
            <div class="songtime">
              <div class="st1">{{songName}}</div>
              <div class="st2">
                <span>{{nowTime|time2}}</span> /
                <span>{{dt|time}}</span>
              </div>
            </div>
            <div class="songbar">
              <div class="sb1" @click="probar">
                <div class="sb11"></div>
                <div id="yuan" @mousedown.prevent="mm" @click.stop="cc"></div>
              </div>
            </div>
          </div>

          <!--  -->

          <!-- 下右 -->
          <div class="mbright">
            <!-- 播放方式 -->
            <div class="playStyle" v-show="isStyle">
              <div @click="listcir">
                <span class="iconfont icon-ttpodicon"></span>列表循环
              </div>
              <div @click="onecir">
                <span class="iconfont icon-danquxunhuan"></span>单曲循环
              </div>
              <div @click="rancir">
                <span class="iconfont icon-bofangye-caozuolan-suijibofang"></span>随机播放
              </div>
            </div>
            <!-- 音量 -->
            <div class="vol" v-show="isvol">
             
              <div class="ditiao">
                 <div class="qiu" @mousedown.prevent="qiu1"></div>
              <div class="sche"></div>
              </div>
            </div>
            <div class="yl">
              <span class="iconfont icon-icon_horn" @mouseover="isvol=true"></span>
            </div>
            
            <!--  -->
            <span
              v-show="vs1"
              class="iconfont icon-ttpodicon"
              @click="isStyle = !isStyle;isShow2 = false"
            ></span>
            <span
              v-show="vs2"
              class="iconfont icon-danquxunhuan"
              @click="isStyle = !isStyle;isShow2 = false"
            ></span>
            <span
              v-show="vs3"
              class="iconfont icon-bofangye-caozuolan-suijibofang"
              @click="isStyle = !isStyle;isShow2 = false"
            ></span>
            <!-- 喜欢 -->
            <span class="iconfont icon-shoucang1" :class="{actlike:islike==true}" @click.prevent="like"></span>
            <span class="iconfont icon-fenxiangzhuanfafasongzhijiantoufangxingshar"></span>
            <span
              class="iconfont icon-bofangqi_shouyegequliebiao_"
              style="font-size:22px;"
              @click="isShow2 = !isShow2;isStyle = false"
            ></span>

            <!-- 播放队列 -->
            <div class="playlists" v-show="isShow2">
              <div class="bfdl">
                <div>
                  播放队列 /
                  <span>{{arr.length}}</span>
                </div>
                <div>
                  <span class="iconfont icon-lajitong"></span> |
                  <span class="iconfont icon-cha1" @click="isShow2 = false"></span>
                </div>
              </div>
              <!-- 歌曲 -->
              <div class="play_bot">
                <div
                  v-for="(item,index) in arr"
                  :key="index"
                  :class="{act11:index==Nowplay}"
                  @click="clickPlay(index)"
                >
                  <div>{{index+1}}</div>
                  <div :class="{act22:index==Nowplay}">{{item.data.songs[0].name}}</div>
                  <div>{{item.data.songs[0].ar[0].name}}</div>
                  <div>{{item.data.songs[0].dt|time}}</div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>

    <audio :src="this.songUrl" @timeupdate="canplay" @canplay="can" @ended="ended" autoplay></audio>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      //音量
      qiu:null,
      sche:null,
      isvol:false,
      // 播放方式
      vs1: true,
      vs2: false,
      vs3: false,
      //有无歌词
      islrc: false,
      //音量隐藏显示
      isShow3: true,
      isShow2: false,
      img: [{ src: "url(" + require("../../assets/img/fly.png") + ")" }],
      songlists: [],
      songUrl: null,
      audio: null,
      isHas: true,
      //进度条总长度
      sb1: null,
      //进度
      sb11: null,
      //滑块
      yuan: null,
      //当前播放时间
      nowTime: null,
      //步长
      bu: null,
      all2: null,
      iss: false,
      //鼠标按下x
      x1: 0,
      x2: 0,
      x3: 0,
      //歌词
      lyric: null,

      ly: [],
      lyr: null,
      act: null,
      isScroll: true,
      //播放列表
      playlist: [],
      ball: null,
      tiao: null,
      songs: null,
      //
      songspicurl: null,
      //歌名
      songName: null,
      //歌手
      singer: null,
      //专辑
      zhuanji: null,
      //时间
      dt: null,

      arr: [],
      isStyle: false,
      iscan: false,
      //播放曲目id
      Nowplay: 0,

      //有无收藏
      islike: false, //默认没收藏

      song1: null,

      //音量
      yy:null,
      y1:0,
      y2:0,
      y3:0,
      iss2:false,

      ditiao:null,

      va:[],
    };
  },
  beforeUpdate() {
    if (this.song1.find(item => item == this.songlists) != undefined) {
      this.islike = true;
    } else if (this.song1.find(item => item == this.songlists) == undefined) {
      this.islike = false;
    }
  },

  methods: {
    //点击上一首
    beSong() {
      this.isHas = false;
      this.audio.currentTime = 0;

      if (this.vs1 || this.vs2) {
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          if (this.Nowplay == 0) {
            this.Nowplay = this.playlist.length;
          }
          this.Nowplay -= 1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
        //播到最后一首歌时  ||((typeof this.playlist) == 'number')) {
      } else if (this.vs3) {
        //如果是随机播放
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          //     if (this.Nowplay + 1 == this.playlist.length){
          //    this.Nowplay = -1;

          //  }
          var ran1 = Math.floor(Math.random() * (this.playlist.length - 1));
          this.Nowplay = ran1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      }
    },
    //点击下一首
    next1() {
      this.isHas = false;
      this.audio.currentTime = 0;
      
      //如果是列表循环
      if (this.vs1 || this.vs2) {
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          if (this.Nowplay + 1 == this.playlist.length) {
            this.Nowplay = -1;
          }
          this.Nowplay += 1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      } else if (this.vs3) {
        //如果是随机播放
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          //     if (this.Nowplay + 1 == this.playlist.length){
          //    this.Nowplay = -1;

          //  }
          var ran1 = Math.floor(Math.random() * (this.playlist.length - 1));
          this.Nowplay = ran1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      }
    },
    //收藏
    like() {
      if (this.$store.state.username == null) {
        Toast("请登录后操作");
      } else {
        if (this.islike) {
          this.$store.commit("del", this.songlists);
          this.islike = false;
        } else if (this.islike == false) {
          this.$store.commit("addd", this.songlists);
          this.islike = true;
        }
      }

      // 

      // 
    },
    //列表循环
    listcir() {
      this.vs1 = true;
      this.vs2 = false;
      this.vs3 = false;
      this.isStyle = !this.isStyle;
    },
    //单曲循环
    onecir() {
      this.vs1 = false;
      this.vs2 = true;
      this.vs3 = false;
      this.isStyle = !this.isStyle;
    },
    //随机播放
    rancir() {
      this.vs1 = false;
      this.vs2 = false;
      this.vs3 = true;
      this.isStyle = !this.isStyle;
    },
    //点击列表播放歌曲
    clickPlay(index) {
      
      this.isHas = false;
      this.Nowplay = index;
      this.songlists = this.playlist[this.Nowplay];
      //下一首

      //换歌的路径
      this.changeUrl();
      //换图片
      this.changePic();
      //换歌词
      this.changeGC();
    },
    //换歌词
    changeGC() {
      this.$axios.get("/lyric?id=" + this.songlists + "").then(res => {
        this.islrc = false;
        this.ly = [];
        // 
        var lrc = null;
        if (res.data.lrc) {
          lrc = res.data.lrc.lyric;
          lrc = lrc.split("\n");
          // 
          lrc.forEach(ele => {
            var arr = ele.split("]");
            var arr2 = String(arr[0].split("[")[1]);
            arr[0] =
              Number(arr2.substr(0, 2)) * 60 +
              Number(arr2.substr(3, 2)) +
              Number(arr2.substr(7, 3)) / 1000;
            this.ly.push(arr);
          });
        }
        if (this.ly.length == 0) {
          this.islrc = true;
        }
        // 
      });
    },
    //换图片
    changePic() {
      this.$axios.get("/song/detail?ids=" + this.songlists + "").then(res => {
        //  
        this.songspicurl = res.data.songs[0].al.picUrl;
        this.songName = res.data.songs[0].name;
        this.singer = res.data.songs[0].ar[0].name;
        this.zhuanji = res.data.songs[0].al.name;
        this.dt = res.data.songs[0].dt;
      });
    },
    //换歌曲url
    changeUrl() {
      this.$axios.get("/song/url?id=" + this.songlists + "").then(res => {
        //  

        this.songUrl = res.data.data[0].url;
        //  this.audio.play();
      });
    },
    scroll() {
      this.isScroll = false;
      var _this = this;
      setTimeout(function() {
        _this.isScroll = true;
      }, 2000);
    },
    //播放歌曲按键
    playSong() {
      if (this.iscan) {
        if (this.isHas) {
          this.audio.play();
          this.isHas = false;
        } else if (!this.isHas) {
          this.audio.pause();
          this.isHas = true;
        }
      } else {
        return;
      }
    },
    //当音乐可以播放时
    can() {
      this.iscan = true;
          // 
          this.audio.volume = 1;

    },
    //下一首
    nextSong() {
      this.isHas = false;
      this.audio.currentTime = 0;
      //如果是列表循环
      if (this.vs1) {
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          if (this.Nowplay + 1 == this.playlist.length) {
            this.Nowplay = -1;
          }
          this.Nowplay += 1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      } else if (this.vs2) {
        //如果是单曲循环
        this.audio.load();
        this.audio.play();
      } else if (this.vs3) {
        //如果是随机播放
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          //     if (this.Nowplay + 1 == this.playlist.length){
          //    this.Nowplay = -1;

          //  }
          var ran1 = Math.floor(Math.random() * (this.playlist.length - 1));
          this.Nowplay = ran1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      }
    },
    //上一首
    beforeSong() {
      this.isHas = false;
      this.audio.currentTime = 0;

      if (this.vs1) {
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          if (this.Nowplay == 0) {
            this.Nowplay = this.playlist.length;
          }
          this.Nowplay -= 1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
        //播到最后一首歌时  ||((typeof this.playlist) == 'number')) {
      } else if (this.vs2) {
        //如果是单曲循环
        this.audio.load();
        this.audio.play();
      } else if (this.vs3) {
        //如果是随机播放
        if (typeof this.playlist == "number") {
          this.audio.load();
          this.audio.play();
        } else {
          //     if (this.Nowplay + 1 == this.playlist.length){
          //    this.Nowplay = -1;

          //  }
          var ran1 = Math.floor(Math.random() * (this.playlist.length - 1));
          this.Nowplay = ran1;
          this.songlists = this.playlist[this.Nowplay];
          //换歌的路径
          this.changeUrl();
          //换图片
          this.changePic();
          //换歌词
          this.changeGC();
        }
      }
    },
    //当音乐播放结束时
    ended() {
      // this.isHas = true
      this.audio.currentTime = 0;
      //如果是列表循环播放
      this.nextSong();

      // }
      // 

      //  this.isHas = true;
    },
    //当前播放位置更改时
    canplay() {
      
      
      setTimeout(function() {
        this.isHas = false;
      }, 200);
      // 

      this.nowTime = this.audio.currentTime;
      //步长
      this.bu =
        Math.floor(
          (this.nowTime / this.audio.duration) * this.sb1.offsetWidth * 100
        ) / 100;
      // 
      if (this.iss == false) {
        this.yuan.style.left = this.bu - 5 + "px";
        this.sb11.style.width = this.bu + "px";
      }

      //歌词滚动

      for (let i = 0; i < this.ly.length; i++) {
        if (i - 1 < 0) {
          continue;
        }
        if (i + 1 >= this.ly.length) {
          return;
        }
        if (
          this.audio.currentTime > this.ly[i - 1][0] &&
          this.audio.currentTime < this.ly[i + 1][0]
        ) {
          this.act = i;
          if (this.isScroll == true) {
            this.lyr.scrollTop = 30 * i;
          }
          break;
        }
      }
    },
    //点击进度条时
    probar(e) {
      this.sb11.style.width = e.offsetX + "px";
      this.audio.currentTime =
        (parseFloat(this.sb11.style.width) / parseFloat(this.sb1.offsetWidth)) *
        this.audio.duration;
    },
    cc() {
      return;
    },
    //音量
    qiu1(){
      
      this.iss1 = true;

     
         
      
     
    },
    mm(e) {
      this.iss = true;
      this.x1 = e.pageX;
    },
    mou(e) {
      // 音量
      if(this.iss1){
        var length = e.pageY - this.ditiao.getBoundingClientRect().top;
        // 
        length = length>=90?90:length;
        length = length<=0?0:length;
        this.qiu.style.top = length-6+'px'
        this.sche.style.height = -(length-90)+"px";
        var vo = Math.floor((length/90)*100)/100;
        this.audio.volume = -(vo-1)
        
    
      }
 
  
 
      //进度条
      if (this.iss == true) {
        this.x2 = e.pageX - this.x1;
        this.x3 = this.bu - 5 + this.x2;
        if (this.x3 < -5) {
          this.x3 = -5;
        } else if (this.x3 > 367) {
          this.x3 = 367;
        }
        this.yuan.style.left = this.x3 + "px";
        this.sb11.style.width = this.x3 + 5 + "px";
      }
    },
    mous() {
      // if(this.iss1 == true){
      // }
      this.iss1 = false;

      if (this.iss == true) {
        this.audio.currentTime =
          ((this.x3 + 5) / parseFloat(this.sb1.offsetWidth)) *
          this.audio.duration;
      }
      this.iss = false;
    }
  },

  created() {

    //当前播放列表中的第一首歌
   
this.va = this.$store.state.song.lists;

    // this.songlists = this.$store.state.song.lists;
    if(this.va.length>1){
       for(let i=0;i<this.va.length;i++){
            this.songlists.push(this.va[i].id)
          }
    }else{
      this.songlists = this.va.id
    }
    
    this.playlist = this.songlists;
    if (this.songlists.length > 1) {
      this.songlists = this.songlists[0];
    }

    // 
    // 
    //将数据放到播放列表
    if (this.playlist.length > 1) {
      
      for (let i = 0; i < this.playlist.length; i++) {
        this.$axios
          .get("/song/detail?ids=" + this.playlist[i] + "")
          .then(res => {
            //  
            this.arr.push(res);
            
          });
      }
      
    } else {
      this.$axios.get("/song/detail?ids=" + this.playlist + "").then(res => {
        //  
        this.arr.push(res);
      });
    }
    // 

    //我的收藏
    this.song1 = this.$store.state.song1;

    if (this.song1.find(item => item == this.songlists) != undefined) {
      this.islike = true;
    }

    //  

    this.$axios.get("/song/url?id=" + this.songlists + "").then(res => {
      //  

      this.songUrl = res.data.data[0].url;
    });
    this.$axios.get("/song/detail?ids=" + this.songlists + "").then(res => {
      //  
      this.songspicurl = res.data.songs[0].al.picUrl;
      this.songName = res.data.songs[0].name;
      this.singer = res.data.songs[0].ar[0].name;
      this.zhuanji = res.data.songs[0].al.name;
      this.dt = res.data.songs[0].dt;
    });
    //获取歌词
    this.$axios.get("/lyric?id=" + this.songlists + "").then(res => {
      // 
      var lrc = null;
      if (res.data.lrc) {
        lrc = res.data.lrc.lyric;
        lrc = lrc.split("\n");
        // 
        lrc.forEach(ele => {
          var arr = ele.split("]");
          var arr2 = String(arr[0].split("[")[1]);
          arr[0] =
            Number(arr2.substr(0, 2)) * 60 +
            Number(arr2.substr(3, 2)) +
            Number(arr2.substr(7, 3)) / 1000;
          this.ly.push(arr);
        });
      }
      if (this.ly.length == 0) {
        this.islrc = true;
      }
      // 
    });


    
  },
  mounted() {
    this.audio = document.querySelector("audio");
    this.sb1 = document.querySelector(".sb1");
    this.sb11 = document.querySelector(".sb11");
    this.yuan = document.querySelector("#yuan");
    this.all2 = document.querySelector(".all2");
    this.audio.play();
    this.isHas = false;
    this.lyr = document.querySelector(".lyric");
    //  
    //音量
    this.qiu = document.querySelector(".qiu");
    this.sche = document.querySelector(".sche");
    this.ditiao = document.querySelector(".ditiao")
  },
  filters: {
    time(data) {
      // 500000  04:02    25623154
      //分钟
      let date1 =
        Math.floor(data / 1000 / 60) < 10
          ? "0" + Math.floor(data / 1000 / 60)
          : Math.floor(data / 1000 / 60);
      //秒
      let date2 =
        Math.floor((data / 1000) % 60) < 10
          ? "0" + Math.floor((data / 1000) % 60)
          : Math.floor((data / 1000) % 60);
      return date1 + ":" + date2;
    },
    time2(data) {
      //500
      let date1 =
        Math.floor(data / 60) < 10
          ? "0" + Math.floor(data / 60)
          : Math.floor(data / 60);
      //秒
      let date2 =
        Math.floor(data % 60) < 10
          ? "0" + Math.floor(data % 60)
          : Math.floor(data % 60);
      return date1 + ":" + date2;
    }
  }
};
</script>

<style lang="scss" scoped>
.actlike {
  color: red !important;
}
.act11 {
  background-color: rgba(255, 255, 255, 0.2);
}
.act22 {
  color: #20a0d2 !important;
}
.active {
  color: #01e5ff !important;
}
.mbright {
  position: relative;
  width: 240px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  z-index: 120;
  &>.vol{
    width: 30px;
    height: 115px;
    // background-color: skyblue;
    position: absolute;
    top: -116px;
    left: -8px;
    background-image: url("../../assets/img/yinliang.png");
    &>.ditiao{
      width: 4px;
      height: 90px;
      position: absolute;
      bottom: 16px;
      left: 50%;
      margin-left: -3px;
    
      &>.qiu{
        width: 12px;
        height: 12px;
        background-color:#0c8ed9 ;
        position: absolute;
        top: -6px;
        left: 0;
        margin-left: -4px;
        border-radius: 50%;
        cursor: pointer;
      }
      &>.sche{
           width: 4px;
      height: 90px;
      background-color: #0d8ed9;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -2px;
      }
    }
    // &>.qiu{
    //   width: 12px;
    //   height: 12px;
    //   background-color:#0c8ed9 ;
    //   position: absolute;
    //   bottom: 100px;
    //   left: 50%;
    //   margin-left: -7px;
    //   border-radius: 50%;
    //   cursor: pointer;
    // }
    // &>.sche{
    //   //最长 90
    //   width: 4px;
    //   height: 90px;
    //   background-color: #0d8ed9;
    //   position: absolute;
    //   bottom: 16px;
    //   left: 50%;
    //   margin-left: -3px;
    // }
  }
  &>.yl{
    width: 18px;
    height: 80px;
    line-height: 80px;
  }
  // 播放顺序
  & > .playStyle {
    width: 120px;
    height: 115px;
    //  background-color: skyblue;
    background-image: url("../../assets/img/style.png");
    background-size: cover;
    position: absolute;
    top: -116px;
    left: 2px;
    padding: 10px;
    box-sizing: border-box;
    & > div:nth-child(1) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    & > div:nth-child(2) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    & > div:hover {
      color: #19b5f0;
    }

    & > div {
      cursor: pointer;
      width: 100%;
      height: 33.333%;
      color: #fff;
      font-size: 14px;
      text-align: center;

      & > span {
        margin-right: 4px;
      }
    }
  }
  //播放列表
  & > .playlists {
    width: 476px;
    height: 400px;
    background-color: #2f343b;
    position: absolute;
    top: -400px;
    left: -238px;
    z-index: 1000;
    padding: 10px;
    box-sizing: border-box;
    & > .bfdl {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div:nth-child(1) {
        font-size: 16px;
        z-index: 100;
        color: rgba(255, 255, 255, 0.4);
        & > span {
          font-size: 15px;
        }
      }
      & > div:nth-child(2) {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        & > span:nth-child(1) {
          font-size: 12px;
          margin-right: 20px;
        }
        & > span:nth-child(2) {
          font-size: 12px;
          margin-left: 20px;
        }
      }
    }
    & > .play_bot {
      width: 100%;
      height: 350px;
      // background-color: pink;
      overflow-y: auto;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #afa8a6;
        &:hover {
          background: #fff;
          opacity: 0.3;
        }
      }
      & > div:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      & > div {
        width: 100%;
        cursor: pointer;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        & > div {
          font-size: 14px;
        }
        & > div:nth-child(1) {
          width: 10%;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
        }
        & > div:nth-child(2) {
          width: 55%;
          color: rgba(255, 255, 255, 0.8);
          padding-right: 10px;
          box-sizing: border-box;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
        }
        & > div:nth-child(3) {
          width: 20%;
          color: rgba(255, 255, 255, 0.4);
          padding-right: 5px;
          box-sizing: border-box;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
        }
        & > div:nth-child(4) {
          width: 15%;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
        }
      }
    }
  }
}
.mbright span {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
.mbright span:hover {
  color: #0c8ed9;
}
.w {
  width: 1000px;
  margin: 0 auto;
}
.all2 {
  overflow: hidden;
  width: 100%;
  //   height: 582px;
  position: relative;
  position: absolute;
  top: 139px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.99999;
  min-width: 1000px;
}
.mus_bot {
  width: 100%;
  height: 80px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
#mb {
  height: 100%;
  display: flex;
  align-items: center;
}
.nextSong {
  width: 160px;
  height: 100%;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
}
.nextSong span {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
.nextSong span:hover {
  color: #fff;
}
#mus_top {
  // width: 100%;
  height: 86%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  // background-color: pink;
}
.song {
  width: 850px;
  height: 502px;
  float: right;
}
.song_left {
  width: 262px;
  height: 262px;
  margin-top: 2%;
  float: left;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bgc {
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/img/fly.png");
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
  background-size: cover;
  filter: blur(90px);
  opacity: 0.6;
}
.song_right {
  width: 470px;
  height: 500px;
  float: right;
  // margin-top: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  position: relative;
}
.songName {
  font-size: 25px;
  color: #fff;
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.songMseeage {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    width: 60%;
    height: 30px;
    display: flex;
    align-items: center;
    & > div:nth-child(1) {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
    }
    & > div:nth-child(2) {
      font-size: 16px;
      color: rgba(255, 255, 255);
      margin-left: 10px;
      width: 180px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  & > div:nth-child(2) {
    width: 35%;
    height: 30px;
    display: flex;
    align-items: center;
    & > div:nth-child(1) {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
    }
    & > div:nth-child(2) {
      font-size: 16px;
      color: rgba(255, 255, 255);
      margin-left: 10px;
      width: 115px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.tx {
  width: 60px;
  height: 60px;
  margin-left: 30px;
}
.bar {
  width: 412px;
  height: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  .songtime {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;

    .st1 {
      width: 60%;
      color: #c4c3c3;
      float: left;
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .st2 {
      color: rgba(255, 255, 255, 0.4);
      float: right;
    }
  }
  .songbar {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    .sb1 {
      width: 100%;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.3);
      position: relative;
      cursor: pointer;
    }
    #yuan {
      overflow: hidden;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ddd;
      position: absolute;
      top: 50%;
      left: 0px;
      margin-top: -5px;
    }
    .sb11 {
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 100%;
      background-color: #11a4f0;
    }
  }
}
.lyric {
  // margin-top: 50px;
  position: absolute;
  top: 90px;
  width: 100%;
  height: 350px;
  overflow-y: auto;
  & > .islrc {
    position: absolute;
    top: 40%;
    height: 50%;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #afa8a6;
    &:hover {
      background: #fff;
      opacity: 0.3;
    }
  }
  & > ul > li {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    // padding: 5px 0;
    height: 30px;
    line-height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & > ul > li:nth-child(1) {
    margin-top: 90px;
  }
}
</style>