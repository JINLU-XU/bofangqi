<template>
    <div>
        <div class="all" v-show="!isvalue">
            <div class="playAll">
                <div @click="playAllSong"><span class="iconfont icon-icon--"></span>播放全部</div>
            </div>
            <!-- 喜欢内容 -->
            <div class="like">
                <div class="tit">
                    <div>歌曲</div>
                    <div>歌手</div>
                    <div>专辑</div>
                    <div>时长</div>

                </div>
                <div class="likevalue" v-for="(item,index) in lists" :key="index" @click="song11(index)">
                     <div>{{item.data.songs[0].name}}</div>
                    <div>{{item.data.songs[0].ar[0].name}}</div>
                    <div>{{item.data.songs[0].al.name}}</div>
                    <div>{{item.data.songs[0].dt|time}}</div>
                    <div class="bf">
                        <span class="iconfont icon-icon--"></span>
                        <span class="iconfont icon-hao"></span>
                        <span class="iconfont icon-zhuanfa"></span>

                    </div>
                </div>
            </div>
                <div class="ck">查看更多内容，请下载客户端</div>

            
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
                id:null,
                lists:[],
               

           

            }
        },
        created(){
            
            this.id = this.$store.state.song1;
            if(this.id.length>0){
                this.isvalue = false
            }
            
            for(let i=0;i<this.id.length;i++){
                 this.$axios.get("/song/detail?ids="+this.id[i]+"").then(res => {
                     this.lists.push(res)
                     
    });
            }
            
            
        },
        methods:{
            song11(index){
                 this.$store.commit("song/add",this.lists[index])
     
            
            this.$router.push("/music")
            },
             playAllSong(){
  
        //   var li = []
        //   for(let i=0;i<this.id.length;i++){
        //     li.push(this.id[i])
        //   }
   
          
          this.$store.commit("song/add",this.lists)
          
          
          this.$router.push("/music")
          
        },
        },
        components:{
            nosong,
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
    }
</script>

<style lang="scss" scoped>
.all{
    width: 1000px;
    margin: 0 auto;
    &>.playAll{
        margin-top: 50px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        &>div{
            font-size: 16px;
            height: 40px;
            color: #fff;
            background-color: #2aa8f6;
            padding: 0 20px;
            box-sizing: border-box;
            line-height: 40px;
            border-radius: 5px;
            cursor: pointer;

        }
    }
    &>.like{
        width: 100%;
        margin-top: 20px;
        
          &>div:nth-child(odd){
                background-color: #f7f7f7;

            }
        &>.tit{
            width: 100%;
            height: 60px;
            // background-color: #f7f7f7;
            display: flex;
            align-items: center;
            justify-content: space-between;
           
            &>div{
                color: #b19999;
                font-size: 16px;
            }
            &>div:nth-child(1){
                width: 50%;
                padding: 0 20px;
                box-sizing: border-box;
            }
            &>div:nth-child(2){
                width: 21%;
            }
            &>div:nth-child(3){
                width: 21%;
            }
            &>div:nth-child(4){
                text-align: center;
                width: 6%;
            }
        }
        &>.likevalue:hover .bf{
            display: block;
        }
        &>.likevalue{
             width: 100%;
            height: 60px;
            // background-color: #f7f7f7;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            position: relative;
            &>.bf{
                position: absolute;
                top: 0;
                left: 400px;
                width: 120px;
                height: 100%;
                font-size: 20px;
                line-height: 60px;
                display: none;
                &>span{
                margin-right: 10px;
                cursor: pointer;
                }
                &>span:hover{
                    color: #2aa8f6;
                }
            }
           
             &>div{
                color: #333;
                font-size: 16px;
            }
            &>div:nth-child(1){
                width: 50%;
                padding: 0 20px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            &>div:nth-child(2){
                width: 21%;
                text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
            }
            &>div:nth-child(3){
                width: 21%;
                text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
            }
            &>div:nth-child(4){
                text-align: center;
                width: 6%;
                color: #b19999;
            }
        }
       
    }
    .ck{
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        margin-top: 50px;
    }
}
</style>