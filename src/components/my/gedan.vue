<template>
    <div>
        <div class="all" v-show="!isvalue">
             <!-- 歌单 -->
      <div class="s_lists">
        <div class="song" v-for="(item,index) in lists" :key="index" @click="song(index)">
          <div class="lists_img">
            <img :src="item.data.playlist.coverImgUrl" alt />
            <div class="mask">
              <span class="iconfont icon-bofang"></span>
            </div>
          </div>
          <div class="descript">
            <span>{{item.data.playlist.name}}</span>
          </div>
          <div class="playCount">
            <span class="iconfont icon-icon--"></span>
            <span>{{item.data.playlist.playCount|playCount}}</span>
          </div>
        </div>
      </div>
        </div>
       <nosong v-show="isvalue"></nosong>
    </div>
</template>

<script>
import nosong from "../kgorder/nosong.vue"

    export default {
        data(){
            return{
                isvalue:true,
                songlists:null,

                id:null,
                lists:[],

            }
        },
        created(){
               this.id = this.$store.state.song2;
            if(this.id.length>0){
                this.isvalue = false
            }
            
            for(let i=0;i<this.id.length;i++){
                 this.$axios.get("/playlist/detail?id="+this.id[i]+"").then(res => {
                     this.lists.push(res)
                     
    });
            }
        },
        methods:{
             song(index){
          this.$store.commit("songlists/add",this.id[index])
          this.$router.push("/songorder")
          
      }
        },
        components:{
            nosong,
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
    }
</script>

<style lang="scss" scoped>
.all{
    width: 1000px;
    margin: 0 auto;
}
.s_lists {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    &>.song:nth-child(4n){
        margin-right: 0;
    }
    .song {
        margin-right: 40px;
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