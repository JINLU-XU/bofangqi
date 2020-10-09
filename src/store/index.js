import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import song from "./song/song.js"
import songlists from "./song/songlists.js"


export default new Vuex.Store({
  state: {
    username:null,
    song1:[],//喜欢歌曲
    song2:[],//喜欢歌单
    song3:[],//喜欢电台



  },
  mutations: {
    addd(state,obj){
      if(state.song1.find(item=>item==obj) == undefined){
        state.song1.push(obj);
      }
      return;
    },
    del(state,obj){
      if(state.song1.find(item=>item==obj) != undefined){
        var index = state.song1.indexOf(obj);
        state.song1.splice(index,1)
      }
    },
    addd2(state,obj){
      if(state.song2.find(item=>item==obj) == undefined){
        state.song2.push(obj);
      }
      return;
    },
    del2(state,obj){
      if(state.song2.find(item=>item==obj) != undefined){
        var index = state.song2.indexOf(obj);
        state.song2.splice(index,1)
      }
      
    },
    addd3(state,obj){
      if(state.song3.find(item=>item==obj) == undefined){
        state.song3.push(obj);
      }
      return;
    },
    del3(state,obj){
      if(state.song3.find(item=>item==obj) != undefined){
        var index = state.song3.indexOf(obj);
        state.song3.splice(index,1)
      }
    },
    

  },
  actions: {},
  modules: {
    song,//歌曲详情
    songlists,//歌单详情
  }
});
