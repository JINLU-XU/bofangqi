export default[
     {
        path:"/home",
        name:"首页",
        component:()=>import("../../views/home.vue")
    },
    {
        path:"/list",
        name:"榜单",
        component:()=>import("../../views/list.vue")
    },
    {
        path:"/client",
        name:"下载客户端",
        component:()=>import("../../views/client.vue")
    },
]
   
