<template>
  <div>
    <div class="all w">
      <!-- 头部 -->
      <div class="jxgd">
        <span>
          精选歌单
          <span class="iconfont icon-xiajiantou"></span>
        </span>
      </div>
      <!-- 歌单 -->
      <div class="s_lists">
        <div class="song" v-for="(item,index) in songlists" :key="index" @click="song(index)">
          <div class="lists_img">
            <img :src="item.picUrl" alt />
            <div class="mask">
              <span class="iconfont icon-bofang"></span>
            </div>
          </div>
          <div class="descript">
            <span>{{item.name}}</span>
          </div>
          <div class="playCount">
            <span class="iconfont icon-icon--"></span>
            <span>{{item.playCount|playCount}}</span>
          </div>
        </div>
      </div>
      <!-- 查看更多内容 -->
      <div class="va">查看更多内容，请下载客户端</div>
    </div>
    <div class="over">
        <kgorder></kgorder>
    </div>
  </div>
</template>

<script>
import kgorder from "../kgorder/kugouorder.vue"
export default {
  data() {
    return {
      all: [],
      songlists: []
    };
  },
  methods:{
      song(index){
          this.$store.commit("songlists/add",this.songlists[index].id)
          this.$router.push("/songorder")
          
      }
  },
  created() {
  
   
    //获取50个歌单
    this.$axios.get("/personalized?limit=40").then(res => {
      this.songlists = res.data.result;
    });
  },
  filters:{
      playCount(cou){
          let a
          if(cou<10000){
              a=cou
          }else if(cou>=10000){
              a = Math.floor((cou/10000*10))/10  + '万'
          }
          return a;
      }
  },
   components:{
    kgorder,
  }
};
</script>

<style lang="scss" scoped>
.va{
    width: 210px;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 50px;
}
.w {
  width: 1000px;
  margin: 0 auto;
}
.all {
  .jxgd {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: flex-end;
    & > span:nth-child(1) {
      font-size: 25px;
      font-weight: 700;
      color: #333;
      cursor: pointer;
    }
    & > span:nth-child(1) span {
      font-size: 20px;
      font-weight: 700;
      margin-left: 5px;
    }
  }
  .s_lists {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .song {
      width: 220px;
      margin-top: 30px;
      .lists_img {
        width: 220px;
        height: 220px;
        overflow: hidden;
        // background-color: skyblue;
        position: relative;
        cursor: pointer;
      }
      .descript {
        width: 100%;
        font-size: 16px;
        color: #333;
        margin-top: 5px;
      }
      .playCount {
        font-size: 14px;
        color: #999999;
        margin-top: 5px;
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  & > span {
    font-size: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -60px;
    margin-left: -40px;
    color: #fff;
  }
}
.lists_img:hover .mask {
  // background-color: pink;
  display: block;
}
.lists_img img {
  transition: all 1s;
}
.song:hover .lists_img>img {
  // width: 240px;
  // height: 240px;
  // transition: ;
  transform: scale(1.1);
}
.descript > span:hover {
  font-weight: 700;
  cursor: pointer;
}
.over{
    margin-top: 50px;
}
</style>