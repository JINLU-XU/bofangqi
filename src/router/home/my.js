export default
    {
       path:"/my",
       name:"个人中心",
       component:()=>import("../../components/music/my.vue"),
       children:[
           {
               path:"/",
               name:"歌曲",
               component:()=>import("../../components/my/gequ.vue")
           },
           {
            path:"gedan",
            name:"歌单",
            component:()=>import("../../components/my/gedan.vue")
        },
        {
            path:"diantai",
            name:"电台",
            component:()=>import("../../components/my/diantai.vue")
        },
       ]
   }
 
  
