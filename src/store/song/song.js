export default {//地址
    namespaced:true,//命名空间
    state:{
     lists:[],
     allSong:null,
     sea:"",

     dj:null,
    
    },
    mutations:{
      addDJ(state,obj){
        state.dj = null;
        state.dj = obj
      },
      add(state,obj){
        state.lists = [],
        state.lists = obj
      
        
        
      },
      sear(state,obj){
        state.sea = "";
        state.sea = obj;
      },
      key(state,obj){
        state.sea = "",
        state.sea = obj
      }
      // addSong(state,obj){
      //   state.allSong = null;
      //   state.allSong = obj;
    
        
        
      // }
    },
    actions:{}
}