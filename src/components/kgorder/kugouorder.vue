<template>
    <div>
        <div class="all">
            <div class="all_top">
                <div class="al">
                     <ul>
                    <li v-for="(item2,index2) in ku" :key="index2">{{item2.name}}</li>
                    

                </ul>
                </div>
               
            </div>
            <div class="all_bot">
                <div class="ab">
                    <p>我们致力于推动网络正版音乐发展，相关版权合作请联系copyrights@kugou.com</p>
                    <p>信息网络传播视听节目许可证 1910564 增值电信业务经营许可证粤B2-20060339    粤ICP备09017694号</p>
                    <p>广播电视节目制作经营许可证（粤）字第01270号    营业性演出许可证穗天演440106026   营业执照</p>
                    <p>穗公网监备案证第44010650010167    互联网药品信息服务资格证编号（粤）-非经营性-2012-0018 粤公网安备 44010602000141号 </p>
                    <p>互联网不良信息举报中心：www.12377.cn     酷狗不良信息举报邮箱：jubao_music@kugou.net    客服邮箱：kefu@kugou.net</p>
                    <p>Copyright  ©  2004-2020 KuGou-Inc.All Rights Reserved
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                ku:[
                    {name:"关于酷狗"},
                    {name:"监督举报"},
                    {name:"广告服务"},
                    {name:"投诉指引"},
                    {name:"隐私政策"},
                    {name:"儿童隐私政策"},
                    {name:"酷狗音乐人"},
                    {name:"酷狗直通车"},
                    {name:"招聘信息"},
                    {name:"客服中心"},
                    {name:"用户体验提升计划"},

                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.all{
    width: 100%;
    height: 320px;
    background-color: #2c323b;
    color: #b1b3b9;
   &>.all_top{
       width: 100%;
       margin: 0 auto;
       height: 50px;
       border-bottom: 1px solid #3d424a;
       &>.al{
           width: 1000px;
           height: 100%;
           margin: 0 auto;
           display: flex;
           justify-content: space-between;
           align-items: center;
           & li{
               position: relative;
               float: left;
           }
           &>ul{
               width: 100%;
               height: 100%;
                display: flex;
           justify-content: space-between;
           align-items: center;
           }
           &>ul li::before{
               content: "";
               width: 1px;
               height: 14px;
               position: absolute;
               top: 2px;
               right: -20px;
               background-color: #b1b3b9;
           }
           &>ul li:last-child::before{
               display: none;
           }
       }
    }
    .all_bot{
        width: 100%;
        height: 270px;
        display: flex;
        align-items: center;
        .ab{
        width: 1000px;
        margin: 0 auto;
        height: 180px;
        &>p{
            font-size: 13px;
            text-align: center;
            margin-bottom: 10px;
        }
        }
    }
}
</style>