<template>
    <div>
        <div class="all">
            <div class="my_top">
                <div> 
                    <div class="mytop1">
                    <div><img src="../../assets/img/fly.png" alt=""></div>
                    <div>点点</div>
                </div>
                 <div class="mytop2">
                    <div>
                        <div>2</div>
                        <div>关注</div>

                    </div>
                    <div>
                         <div>1</div>
                        <div>粉丝</div>
                    </div>

                </div>
                </div>
               <div class="ilike">
                   <div>我喜欢</div>
               </div>
            </div>

            <div class="all2">
                <div class="luyou">
                    <router-link to="/my" tag="div" :class="{act:isact==0}" @click.native="isact=0">歌曲 {{s1}}</router-link>
                    <router-link to="/my/gedan" tag="div" :class="{act:isact==1}" @click.native="isact=1">歌单 {{s2}}</router-link>
                    <router-link to="/my/diantai" tag="div" :class="{act:isact==2}" @click.native="isact=2">电台 {{s3}}</router-link>

                </div>
                <router-view></router-view>

            </div>

        </div>
        <div class="all3"><kgorder></kgorder></div>
    </div>
</template>

<script>
import kgorder from "../kgorder/kugouorder.vue"

    export default {
        data(){
            return{
                isact:0,

                s1:null,
                s2:null,
                s3:null,
            }
        },
        created(){
   

            this.s1 = this.$store.state.song1.length;
            this.s2 = this.$store.state.song2.length;
            this.s3 = this.$store.state.song3.length;

        },
        components:{
            kgorder
        }
    }
</script>

<style lang="scss" scoped>
.all3{
    width: 100%;
    margin-top: 50px;
}
.act{
    color: #2aa8f6 !important;
}
.all2{
    width: 1000px;
    margin: 0 auto;
    &>.luyou{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        &>div{
            color: #333;
            font-size: 18px;
            margin-right: 100px;
            cursor: pointer;
        }
        &>div:hover{
            color: #2aa8f6;
        }
    }
}
.all{
    width: 100%;
    .my_top{
        width: 100%;
        height: 400px;
        background-image: url("../../assets/img/bgc.jpg");
        position: relative;
        // background-size: cover;
        &>div:nth-child(1){
            width: 120px;
            height: 250px;
            // background-color: skyblue;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -125px;
            margin-left: -60px;
            &>.mytop1{
                width: 100%;
                &>div:nth-child(1){
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                &>div:nth-child(2){
                    width: 100%;
                    font-size: 25px;
                    color: #fff;
                    text-align: center;
                    margin-top: 5px;
                }
            }
            &>.mytop2{
                margin-top: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 18px;
                color: #fff;
                &>div:nth-child(1){
                    width: 50%;
                    cursor: pointer;
                    &>div:nth-child(1){
                        width: 100%;
                        text-align: center;
                        
                    
                    }
                     &>div:nth-child(2){
                        width: 100%;
                        text-align: center;

                    }
                }
                 &>div:nth-child(2){
                     cursor: pointer;
                    width: 50%;
                     &>div:nth-child(1){
                        width: 100%;
                        text-align: center;
                    }
                     &>div:nth-child(2){
                        width: 100%;
                        text-align: center;

                    }
                }
            }
           
        }
          &>.ilike{
              margin: 0 auto;
            width: 1000px;
            height: 50px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -500px;
            
            
            &>div{
                width: 90px;
                height: 100%;
                font-size: 18px;
                color: #2aa8f6;
                line-height: 50px;
                cursor: pointer;
            }
        }
       
    }
}
</style>