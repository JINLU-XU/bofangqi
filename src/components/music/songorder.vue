<template>
  <div>
    <div class="all w">
      <div class="value">
        <!-- 歌单详情左部分 -->
        <div class="val_left">
          <!-- 图 -->
          <div class="left_img">
            <img :src="url" alt="">
          </div>
          <!-- 歌单简介 -->
          <div class="songpro">
            <div>歌单简介</div>
            <div>{{des}}</div>
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
                <div class="tit">{{count.name}}</div>
                <div class="name"><div><img :src="url2" alt=""></div> <span>{{name}}</span></div>
                <div class="catego">{{tags}}</div>
                <div class="ability">
                    <div @click="playAllSong"><span class="iconfont icon-icon--"></span> 播放全部</div>
                    
                     <div><span class="iconfont icon-hao"></span> 添加</div>
                    
                     <div @click="like"><span class="iconfont icon-shoucang1" :class="{act:islike}"></span> 收藏</div>
                    
                     <div><span class="iconfont icon-zhuanfa"></span> 分享</div>
                    
                      <div><span class="iconfont icon-pinglun"></span> 评论</div>
                    
                </div>
            </div>
            <!-- 歌单详情右下部分 -->
            <div class="songorder">
                <div class="title">
                    <div>序号</div>
                    <div>歌曲</div>
                    <div>歌手</div>
                    <div>时长</div>
                </div>
                <ul>
                    <li v-for="(item2,index2) in lists" :key="index2" @click="songl(index2)">
                    <div>{{index2+1}}</div>
                    <div>{{item2.name}}</div>
                    <div>{{item2.ar[0].name}}</div>
                    <div>{{item2.dt|time}}</div>
                    </li>
                  
                    
                </ul>

                <div class="ck">查看更多内容，请下载客户端</div> 
            </div>
           <!-- 歌单评论 -->
           <div class="say">
               <div class=""></div>
           </div>
            
        </div>
      </div>
    </div>
    <div class="al2">
        <kgorder></kgorder>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';

import kgorder from "../kgorder/kugouorder.vue"
export default {
    data(){
        return{
            id:null,
            count:[],
            lists:null,
            url:"",
            url2:"",
            name:"",
            des:"",
            tags:"",

            islike:false,
            song2:null,
        }
    },
    methods:{
      like(){
        if(this.$store.state.username == null){
          Toast("请登录后操作")
        }else{
           if(this.islike){
        this.$store.commit("del2",this.id)
        this.islike = false;

      }else if(this.islike == false){
        this.$store.commit("addd2",this.id)
        this.islike = true;
      }
        }
        
      },
        songl(index2){
            this.$store.commit("song/add",this.lists[index2])
            // 
            
            this.$router.push("/music")
        },
        playAllSong(){
          // 
          // var li = []
          // for(let i=0;i<this.lists.length;i++){
          //   li.push(this.lists[i].id)
          // }
          
          
          this.$store.commit("song/add",this.lists)
          
          
          this.$router.push("/music")
          
        }
    },
    created(){
 

        this.id = this.$store.state.songlists.lists[0]
       //获取歌单详情
    this.$axios.get("/playlist/detail?id="+this.id+"").then(res => {
      // this.all.push(res)
    //   
      this.count = res.data.playlist
      this.url = res.data.playlist.coverImgUrl;
      this.url2 = res.data.playlist.creator.avatarUrl;
      this.name = res.data.playlist.creator.nickname
      this.des = res.data.playlist.description
      let a = res.data.playlist.tags
      let b = a.join(",")
    //   
      this.tags = b;
      this.lists = res.data.playlist.tracks
      // 

      //收藏
  this.song2 = this.$store.state.song2;
   if(this.song2.find(item=>item==this.id)!=undefined){
   this.islike = true
 }
      
    });
  
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
                &>div:nth-child(3)>span{
                    
                    color: #e0e0e0;
                }
            }
        }
        &>.songorder{
            width: 100%;
            margin-top: 40px;
            &>.title{
                width: 100%;
                height: 45px;
                display: flex;
                flex-wrap: wrap;
                background-color: #fafafa;
                &>div{
                    font-size: 14px;
                   
                    line-height: 45px;
                    color: #9999a6;
                }
                &>div:nth-child(1){
                    width: 10%;
                    height: 100%;
                     text-align: center;
                }
                &>div:nth-child(2){
                    width: 40%;
                    height: 100%;
                    text-align: left;
                    
                }
                &>div:nth-child(3){
                    width: 40%;
                    height: 100%;
                    text-align: left;

                }
                &>div:nth-child(4){
                    width: 10%;
                    height: 100%;
                     text-align: center;
                }
            }
            &>ul{
                width: 100%;
            }
              
            &>ul>li{
                width: 100%;
                height: 60px;
                 display: flex;
                flex-wrap: wrap;
                color: #333;
                cursor: pointer;
              
            &>div{
                line-height: 60px;
                font-size: 14px;
            }
                  &>div:nth-child(1){
                    width: 10%;
                    height: 100%;
                     text-align: center;
                     font-weight: 700;
                     
                }
                &>div:nth-child(2){
                    width: 40%;
                    height: 100%;
                    text-align: left;
                     text-overflow: ellipsis; 
                white-space: nowrap;   
                overflow: hidden;
                }
                &>div:nth-child(3){
                    width: 40%;
                    height: 100%;
                    text-align: left;

                }
                &>div:nth-child(4){
                    width: 10%;
                    height: 100%;
                     text-align: center;
                     color: #666666;
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

</style>