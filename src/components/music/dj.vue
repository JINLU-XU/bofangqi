<template>
  <div>
    <div class="all w">
      <div class="value">
        <!-- 歌单详情左部分 -->
        <div class="val_left">
          <!-- 图 -->
          <div class="left_img">
            <img :src="pic" alt="">
          </div>
          <!-- 歌单简介 -->
          <div class="songpro">
            <div>专辑简介</div>
            <div>{{desc}}</div>
            <div>
              <div>
                <span class="iconfont icon-xiazai"></span>
                <span>下载该歌单</span>
              </div>
            </div>
          </div>
          <div class="kw">
            <div class="kuwo">
              <img src="../../assets/img/kuwo.png" alt />
            </div>
          </div>

          <div class="sj">手机扫描二维码下载客户端</div>
        </div>
        <!-- 歌单详情右部分 -->
        <div class="val_right">
            <div class="va_top">
                <div class="tit">{{name}}</div>
                <div class="name"><div><img :src="nickimg" alt=""></div> <span>{{nickname}} </span></div>
                <div class="des">{{signa}}</div>
              
                <div class="ability">
                    <div><span class="iconfont icon-icon--"></span> 立即播放</div>
                    
                     <div><span class="iconfont icon-hao"></span> 添加</div>
                    
                     <div @click="like"><span class="iconfont icon-shoucang1" :class="{act:islike}"></span> 收藏</div>
                    
                     <div><span class="iconfont icon-zhuanfa"></span> 分享</div>
                    
                      
                    
                </div>
            </div>
            <!-- 歌单详情右下部分 -->
            <div class="songorder">
               
                <div class="djorder">
                    <div class="dj_left">
                        <div>{{djname}}</div>
                        <div>{{zuozhe}}</div>
            <!-- 进度条 -->
                        <div class="jindu">
                            <div>
                                <div>{{nowtime|time2}}</div>
                                <div class="jd1" @click="probar"><div class="jd2"></div></div>
                                <div>{{time|time}}</div>
                            </div>
                            <div>
                                <span class="iconfont icon-bofang3" v-show="isShow1" @click="play"></span>
                                 <span class="iconfont icon-zantingtingzhi" v-show="!isShow1" @click="pause"></span>
                                <span class="iconfont icon-xiayishou1" @click="next"></span>
                               


                            </div>
                        </div>
                        
                    </div>
                    <div class="dj_right">
                        <div class="tu"><img :src="img" alt=""></div>
                    </div>
                </div>

                <!-- <div class="ck">查看更多内容，请下载客户端</div>  -->
            </div>
          
            
        </div>
      </div>
    </div>
    <div class="al2">
        <kgorder></kgorder>
    </div>
    <audio :src="this.url" autoplay @timeupdate="canplay" @ended="ended"></audio>
  </div>
</template>

<script>
  import { Toast } from 'vant';

import kgorder from "../kgorder/kugouorder.vue"
export default {
    data(){
        return{
        isShow1:true,

        tu:null,
          djid:null,
          djVal:null,
         
          pic:null,
          name:null,
          desc:null,
          nickname:null,
          nickimg:null,

          djorder:null,
        do:[],
          url:null,
          //电台详情
          djname:"",
          zuozhe:"",
          nowtime:null,
          time:null,
          img:null,

          id:null,
        //dom
           audio:null,
          jd1:null,
          jd2:null,
         
          bu:null,

          nowIndex:0,
          signa:"",

          //喜欢
          islike:false,
          song3:null,
        }
    },
    methods:{
        like(){
          if(this.$store.state.username == null){
            Toast("请登录后操作")
          }else{
             if(this.islike){
        this.$store.commit("del3",this.djid)
        this.islike = false;

      }else if(this.islike == false){
        this.$store.commit("addd3",this.djid)
        this.islike = true;
      }
          }

        
      },
      play(){
          this.isShow1 = !this.isShow1
          this.audio.play()
      },
       pause(){
          this.isShow1 = !this.isShow1
          this.audio.pause()
        

      },
      canplay(){
           this.nowtime = this.audio.currentTime;

            //步长
      this.bu =
        Math.floor(
          (this.nowtime / this.audio.duration) * this.jd1.offsetWidth * 100
        ) / 100;
   
        this.jd2.style.width = this.bu + "px";
      
      },
       //点击进度条时
    probar(e) {
      this.jd2.style.width = e.offsetX + "px";
      this.audio.currentTime =
        (parseFloat(this.jd2.style.width) / parseFloat(this.jd1.offsetWidth)) *
        this.audio.duration;
    },
    next(){
          if(this.nowIndex+1 == this.djorder.length){
           this.nowIndex = -1
        }
        if(this.nowIndex+1 < this.djorder.length)
        this.do = []
        this.nowIndex += 1;
        this.do = this.djorder[this.nowIndex]
    // 
    this.djname = this.do.mainSong.name;
    this.zuozhe = this.do.dj.nickname;
    this.time = this.do.duration;
    this.img = this.do.coverUrl;
    this.id = this.do.mainSong.id;
     this.$axios.get("/song/url?id="+this.id+"").then(res => {
     this.url = res.data.data[0].url
    });
    },
    ended(){
        
        // 
      if(this.nowIndex+1 == this.djorder.length){
            this.audio.pause();
            this.isShow1 = true;
            return;
        }
        if(this.nowIndex+1 < this.djorder.length)
        this.do = []
        this.nowIndex += 1;
        this.do = this.djorder[this.nowIndex]
    // 
    this.djname = this.do.mainSong.name;
    this.zuozhe = this.do.dj.nickname;
    this.time = this.do.duration;
    this.img = this.do.coverUrl;
    this.id = this.do.mainSong.id;
     this.$axios.get("/song/url?id="+this.id+"").then(res => {
     this.url = res.data.data[0].url
    });
        
    },
      
    },
    created(){
   

        this.isShow1 = false;
        this.djid = this.$store.state.song.dj;
        // 
        
    //     this.id = this.$store.state.songlists.lists[0]
    //    //
    this.$axios.get("/dj/detail?rid="+this.djid+"").then(res => {
     
    //  
     this.djVal = res.data.djRadio;
     this.pic = this.djVal.picUrl;
     this.name = this.djVal.name;
     this.desc = this.djVal.desc;
     this.nickname = this.djVal.dj.nickname;
     this.nickimg = this.djVal.dj.avatarUrl;
     
     this.signa = this.djVal.dj.signature
      
    });
  //收藏
  this.song3 = this.$store.state.song3;
   if(this.song3.find(item=>item==this.djid)!=undefined){
   this.islike = true
 }
    //节目
    this.$axios.get("/dj/program?rid="+this.djid+"&limit=40").then(res => {
    
     
    //  
     this.djorder = res.data.programs;
    this.do = this.djorder[0]
    // 
    this.djname = this.do.mainSong.name;
    this.zuozhe = this.do.dj.nickname;
    this.time = this.do.duration;
    this.img = this.do.coverUrl;
    this.id = this.do.mainSong.id;
    
    //  
//节目url  
    this.$axios.get("/song/url?id="+this.id+"").then(res => {
     
    //  
     this.url = res.data.data[0].url
    
    
     
      
    });
    
     
      
    });
   
  
},
mounted(){
    this.audio = document.querySelector("audio");
    this.jd1 = document.querySelector(".jd1");
    this.jd2 = document.querySelector(".jd2");
   
    this.tu = document.querySelector(".tu");

    



},
components:{
    kgorder,
  },
   filters:{
    time(data){
      // 500000  04:02    25623154
      //分钟
      let date1 = Math.round((data/1000/60))<10?"0"+Math.round((data/1000/60)):Math.round((data/1000/60)); 
    //秒
     let date2 = Math.round((data/1000)%60)<10?"0"+Math.round((data/1000)%60):Math.round((data/1000)%60)
     return date1+":"+date2;
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
  },
}
</script>

<style lang="scss" scoped>








.act{
  color: red !important;
}


.ck{
    width: 100%;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height:40px ;
    margin-top: 20px;
}
.al2{
    margin-top: 30px;
    width: 100%;
}
.w {
  width: 1000px;
  margin: 0 auto;
}
.all {
  .value {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .val_left {
      width: 300px;
      // height: 800px;
      & > .left_img {
        width: 300px;
        height: 300px;
        background-color: skyblue;
      }
      & > .songpro {
        // height: 220px;
        margin-top: 50px;
        width: 100%;
        border-bottom: 1px solid #efefef;
        & > div:nth-child(1) {
          font-size: 25px;
          font-weight: 700;
          color: #333;
        }
        & > div:nth-child(2) {
          font-size: 14px;
          margin-top: 10px;
          max-height: 100px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        & > div:nth-child(3) {
          width: 100%;
          margin-top: 30px;
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          & > div {
            width: 200px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #169af3;
            color: #fff;
            border-radius: 20px;
            cursor: pointer;
            & > span:nth-child(1) {
              font-size: 14px;
            }
            & > span:nth-child(2) {
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
      }
      & > .kw {
        margin-top: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        & > .kuwo {
          width: 180px;
          height: 180px;
        }
      }
      .sj {
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin-top: 20px;
      }
    }
    &>.val_right{
        width: 650px;
        &>.va_top{
            width: 100%;
            height: 300px;
            &>.tit{
                font-size: 25px;
                font-weight: 700;
                color: #333333;
            }
            &>.name{
                margin-top: 10px;
                display: flex;
                align-items: center;
                &>div{
                    width: 35px;
                    height: 35px;
                    // background-color: skyblue;
                    overflow: hidden;
                    border-radius: 50%;
                   
                }
                &>span{
                    font-size:16px ;
                    margin-left: 10px;
                }
            }
            &>.catego{
                font-size: 14px;
                margin-top: 10px;
                color: #296294;
            }
            &>.ability{
                width: 500px;
                margin-top: 30px;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &>div{
                    cursor: pointer;
                    height: 40px;
                    border-radius: 20px;
                    line-height: 40px;
                    padding: 0 30px;
                    box-sizing: border-box;
                    background-color: #f2f2f2;
                    font-size: 14px;
                    color: #333;
                }
                &>div:nth-child(1){
                    background-color: #169af3;
                    color: #fff;
                }
                 &>div:nth-child(3){
                   &>span{
                     color: #e0e0e0;
                   }
                }
            }
        }
        &>.songorder{
            width: 100%;
            margin-top: 40px;
          &>.djorder{
              margin-top: 50px;
              width: 100%;
              height: 300px;
              background-color: #f0f0f0;
              display: flex;
              justify-content: space-between;
              padding: 5px 15px;
              box-sizing: border-box;
              &>.dj_left{
                  width: 65%;
                  height: 100%;

                  &>div:nth-child(1){
                      margin-top: 20px;
                      width: 250px;
                      font-size: 20px;
                      color: #333;
                       text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

                  }
                  &>div:nth-child(2){
                      font-size: 16px;
                      width: 150px;
                      color: #333;
                      margin-top: 20px;
                       text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
                  }
                  &>.jindu{
                      width: 90%;
                      height: 80px;
                    //   background-color: pink;
                       margin-top: 90px;
                       &>div:nth-child(1){
                           width: 100%;
                           height: 30px;
                           display: flex;
                           justify-content: space-between;
                           align-items: center;
                           cursor: pointer;
                           &>div:nth-child(1){
                               width: 15%;
                               font-size: 13px;
                               text-align: center;
                           }
                           &>div:nth-child(2){
                               width: 70%;
                               height: 2px;
                               background-color: #e5e5e5;
                               &>div{
                                   width: 0;
                                   height: 100%;
                                   background-color: #b7b7b7;
                               }
                           }
                           &>div:nth-child(3){
                               width: 15%;
                               font-size: 13px;
                               text-align: center;


                           }
                       }
                       &>div:nth-child(2){
                           width: 100%;
                           height: 50px;
                           display: flex;
                           align-items: center;
                           padding: 0 12px;
                           box-sizing: border-box;
                        //    position: relative;
                           &>span{
                               cursor: pointer;
                               font-size: 18px;
                               margin-right: 20px;
                           }
                           &>div{
                            width: 100px;
                            height: 3px;
                            background-color: #e5e5e5;
                            position: relative;
                            &>.qiu{
                                width: 12px;
                                height: 12px;
                                border-radius: 50%;
                                background-color: #5c5c5c;
                                position: absolute;
                                top: -5px;
                                left: -5px;
                                z-index: 20;
                                cursor: pointer;
                            }
                            &>.jdt{
                                width: 10px;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                background-color: #444444;
                            }
                           }
                       }
                  }
              }
               &>.dj_right{
                  width: 35%;
                  height: 100%;
                  padding: 5px 0;
                  box-sizing: border-box;
                  display: flex;
                  align-items: center;
                  &>div{
                      width: 200px;
                      height: 200px;
                      background-color: skyblue;
                      border-radius: 50%;
                      overflow: hidden;
                      animation: tran 30s linear infinite running;

                      &>img{
                          width: 100%;
                          height: 100%;
                      }
                  }
              }
          }
        }
    }
  }
}
.songorder>ul>li:nth-child(even){
                    background-color: #fafafa;
                }
.songorder>ul>li:hover{
    background-color: #f5f5f5;
}

.say{
    width: 100%;
    margin-top: 50px;
  
   
} 
@keyframes tran {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.des{
    width: 450px;
    // background-color: skyblue;
    max-height: 100px;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
}
</style>