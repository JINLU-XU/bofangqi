<template>
    <div>
        <!-- <div class="sou">
            <div>
                <input type="text" placeholder="河图 第九戒">
                
               <span class="iconfont icon-sousuosearch82"></span>
    </div>
        </div> -->
        <!-- 搜索结果 -->
        <div class="search_over">
            <div class="w">
                <div>
                    <div>
                        搜索到 <span>"{{sea}}"</span>  相关歌曲
                        </div> 
                        <div @click="playAllSong"><span class="iconfont icon-icon--"></span>播放</div>
                   </div>
                     <!-- 歌曲详情 -->
            <div class="songorder">
                <div class="tit">
                    <div>歌曲名</div>
                    <div>专辑</div>
                    <div>时长</div>

                </div>
                <!-- 内容 -->
                <div class="val" v-for="(item,index) in lists" :key="index" @click="click(index)">
                     <div>
                         <div>{{item.name}}</div>
                         </div>
                    <div>
                      <div class="al">{{item.album.name}}</div>
                        <div class="sp">
                            <span class="iconfont icon-icon--"></span>
                            <span class="iconfont icon-xiazai"></span>
                            <span class="iconfont icon-zhuanfa"></span>
                            </div>
                    </div>
                    <div>{{item.duration|time}}</div>
                </div>
            </div>
            </div>
          
        </div>
        <div class="kg">
            <kgorder></kgorder>
        </div>
    </div>
</template>

<script>
import kgorder from "../kgorder/kugouorder.vue"
    export default {
        inject:['sousuo','sousuo2'],
        data(){
            return{
            sea:"",
            lists:null,
            song:null,
        
            }
        },
        methods:{
            flushCom:function(){
                this.sousuo();
                this.sousuo2();

            },
            click(index){
                // 
                this.$store.commit("song/add",this.lists[index]);
                this.$router.push("/music")
                // 
               
                
            },
             playAllSong(){
          // 
        //   var li = []
        //   for(let i=0;i<this.lists.length;i++){
        //     li.push(this.lists[i].id)
        //   }
        //   
          
          this.$store.commit("song/add",this.lists)
          
          
          this.$router.push("/music")
          
        }
        },
        created(){
 

           this.sea = this.$store.state.song.sea
        //    
             this.$axios.get("/search?keywords="+this.sea+"").then(res => {
     
                //  
                 this.lists = res.data.result.songs
                //  
                 
                 
    
    });
           
        },
         components:{
    kgorder,
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
   
  }
    }
</script>

<style lang="scss" scoped>
.kg{
    margin-top: 20px;
}
.sou{
    width: 100%;
    height: 140px;
    // background-color: #f8f8f8;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
&>div{
    width: 500px;
    height: 45px;
    position: relative;
    &>input{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #cccccc;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 13px;
    }
    &>span{
        font-size: 25px;
        position: absolute;
        top: 4px;
        right: 10px;
        color: #848484;
        cursor: pointer;
    }
     &>span:hover{
         color: #3395e9;
     }
}
}
.search_over{
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    .w{
        background-color: #fff;
        width: 1000px;
        margin: 0 auto;
        &>div:nth-child(1){

            width: 100%;
            height: 50px;
            
            display: flex;
         
            justify-content: space-between;
            &>div:nth-child(1){
                font-size: 14px;
                &>span{
                color: #14a9ff;
            }
            }
            &>div:nth-child(2){
                color: #fff;
                   font-size: 16px;
                   height: 38px;
                   padding: 0 15px;
                   line-height: 36px;
                   background-color: #169af3;
                   border-radius: 5px;
                   cursor: pointer;

            }
            
        }
        .songorder{
            background-color: #fff;
            width: 100%;
            &>.tit{
                width: 100%;
                height: 50px;
                background-color: #f8f8f8;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #999999;
                &>div{
                    font-size: 14px;
                }
                &>div:nth-child(1){
                    padding: 0 20px;
                    box-sizing: border-box;
                    width: 55%;
                    
                }
                 &>div:nth-child(2){
                    width: 40%;
                    
                }
                 &>div:nth-child(3){
                    width: 5%;
                }
            }
            &>.val{
                 width: 100%;
                height: 50px;
                border-bottom: 1px solid #f2f2f2;
                box-sizing: border-box;
                 display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                 &>div{
                    font-size: 14px;
                }
                &>div:nth-child(1){
                    padding: 0 20px;
                    box-sizing: border-box;
                    width: 55%;
                    &>div{
                          width: 350px;
                        text-overflow: ellipsis; 
            white-space: nowrap;   
            overflow: hidden;
                    }
                }
                 &>div:nth-child(2){
                    width: 40%;
                    display: flex;
                   align-items: center;
                    justify-content: space-between;
                    &>div:nth-child(1){
                        width: 250px;
                        text-overflow: ellipsis; 
            white-space: nowrap;   
            overflow: hidden;

                    }
                    &>div:nth-child(2){
                        // display: none;
                        color: #999;
                        width: 70px;
                        margin-right: 30px;
                        &>span{
                            margin-right: 10px;
                        }
                    //      display: flex;
                    
                    // justify-content: space-between;
                    }
                }
                
               
                 &>div:nth-child(3){
                    width: 5%;
                    color: #999999;
                }
            }
            &>.val:hover{
                background-color: #f5f8fb;
            }
        }

    }
}
.sp{
    display: none;
}
.val:hover .sp{
    display: block;
}

</style>