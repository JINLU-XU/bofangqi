<template>
  <div>
    <div id="all2" class="w">
      <div class="all">
        <!-- 榜单列表 -->
        <div class="list">
          <div>云音乐榜单</div>
          <ul>
            <li
              v-for="(item,index) in lists"
              :key="index"
              :class="{act:index==isindex}"
              @click="changelists(index)"
            >
              <div class="img">
                <img :src="item.data.playlist.coverImgUrl" alt />
              </div>
              {{item.data.playlist.name}}
            </li>
          </ul>
        </div>

        <!-- 榜单 -->
        <div class="list2">
          <!-- 标题 -->
          <div class="tit">
            <span class="titt">{{bang}}</span>
            <div class="playAll" @click="playAll">
              <span class="iconfont icon-icon--"></span>播放全部
            </div>
          </div>
          <!-- 内容 -->
          <div class="val">
            <div
              class="song"
              v-for="(item2,index2) in song"
              :key="index2"
              @click="playSong(index2)"
            >
              <span class="span1">{{index2+1}}</span>
              <!-- <div class="new">new</div> -->
              <span class="songname">
                <span>{{item2.ar[0].name}}</span> -
                <span>{{item2.name}}</span>
              </span>
              <span class="time2">{{item2.dt|time}}</span>
              <div class="font">
                <span class="iconfont icon-icon--"></span>
                <span class="iconfont icon-xiazai"></span>
                <span class="iconfont icon-fenxiangzhuanfafasongzhijiantoufangxingshar"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="al">
      <kgorder></kgorder>
    </div>
  </div>
</template>

<script>
import kgorder from "../components/kgorder/kugouorder.vue";
export default {
  data() {
    return {
      isShow: false,
      lists: [],
      isindex: 0,
      song: [],
      bang: null,
      all: null,
      id: 0
    };
  },

  created() {
    for (let i = 0; i < 10; i++) {
      this.$axios.get("/top/list?idx=" + i + "").then(res => {
        this.lists.push(res);

        if (i == 9) {
          var a = 0;
          // for(let z=0;z<this.lists.length;z++){

          a =
            this.lists[0].data.playlist.tracks.length <= 20
              ? this.lists[0].data.playlist.tracks.length
              : 20;
          for (let j = 0; j < a; j++) {
            this.song.push(this.lists[0].data.playlist.tracks[j]);
          }
          this.bang = this.lists[0].data.playlist.name;

          // }
        }
      });
    }
  },
  methods: {
    playAll() {
      //  var li = []
      //   for(let i=0;i<this.song.length;i++){
      //     li.push(this.song[i].id)
      //   }
      // 

      this.$store.commit("song/add", this.song);

      this.$router.push("/music");
    },
    changelists(index) {
      this.song = [];
      //高亮显示
      this.isindex = index;
      //数据切换
      // this.bang = this.lists[index].data.playlist.name
      //    for(let i=0;i<this.lists[index].data.playlist.tracks.length;i++){
      //      this.song.push(this.lists[index].data.playlist.tracks[i])

      //  }
      var a = 0;
      a =
        this.lists[index].data.playlist.tracks.length <= 20
          ? this.lists[index].data.playlist.tracks.length
          : 20;
      for (let j = 0; j < a; j++) {
        this.song.push(this.lists[index].data.playlist.tracks[j]);
      }

      this.bang = this.lists[index].data.playlist.name;
    },
    playSong(index2) {
      this.$store.commit("song/add", this.song[index2]);
      this.$router.push("/music");
    }
  },
  components: {
    kgorder
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
};
</script>

<style lang="scss" scoped>
.al {
  width: 100%;
  margin-top: 30px;
}
.act {
  background-color: rgba(22, 154, 243, 0.7) !important;
  color: #fff !important;
}
.w {
  width: 1000px;
  margin: 0 auto;
  background-color: #fff;
}
.all {
  display: flex;
  justify-content: space-between;
}
#all2 {
  // height: 1000px;
  .list {
    width: 220px;
    margin-top: 30px;
    //  border: 1px solid #ebeef5;

    // float: left;
    & > div {
      height: 50px;
      width: 100%;
      line-height: 50px;
      font-size: 20px;
      padding: 0 10px;
      box-sizing: border-box;
      color: #333;
    }
    & ul {
      height: 1200px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
        cursor: pointer;
      }
    }
    & ul li {
      height: 60px;
      font-size: 14px;
      // line-height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
    }
    & ul li:hover {
      background-color: rgba(245, 248, 251);
      color: rgba(40, 143, 234);
    }
    .img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 6px;
      overflow: hidden;
    }
  }
  .list2 {
    width: 740px;
    // float: right;
    height: 1200px;
    overflow-y: hidden;
    margin-top: 30px;
    position: relative;

    .tit {
      width: 100%;
      height: 60px;
      margin-top: 15px;
      position: relative;
      & > .playAll {
        width: 100px;
        height: 35px;
        background-color: #169af3;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 35px;
      }
      .titt {
        font-size: 25px;
        color: #333;
      }
      .newTime {
        font-size: 14px;
        color: #999999;
        margin-left: 30px;
      }
    }
    .val {
      width: 100%;
      border-top: 1px solid #ebeef5;
      padding-top: 10px;
      box-sizing: border-box;
      .song {
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        height: 55px;
        border-bottom: 1px solid #ebeef5;
        //  display: flex;
        //  align-items: center;
        line-height: 55px;
        position: relative;
        & > span:nth-child(1) {
          font-size: 20px;
        }

        // .new{
        //   color: #fff;
        //   background-color:#f64152 ;
        //   font-size: 8px;
        //   width: 18px;
        //   height: 10px;
        //   line-height: 10px;
        //   margin-left: 20px;
        //   position: absolute;
        //   top: 20px;
        //   left: 50px;
        // }
        .songname {
          font-size: 14px;
          margin-left: 15px;
        }
        .time2 {
          position: absolute;
          right: 10px;
          font-size: 14px;
          // color: #999999;
        }
        .font {
          position: absolute;
          right: 60px;
          top: 0px;
          display: none;

          & > span {
            color: #999999;
            margin-left: 10px;
          }
          & > span:hover {
            color: #00a6f5;
          }
        }
      }
    }
  }
}

.song:hover {
  background-color: #f5f8fb;
}
.song:hover .songname {
  color: #00a6f5;
}
.song:hover .time2 {
  color: #00a6f5;
}
.song:hover .font {
  display: block !important;
}
.song:nth-child(1) .span1 {
  color: rgba(254, 44, 123);
}
.song:nth-child(2) .span1 {
  color: rgba(254, 44, 123);
}
.song:nth-child(3) .span1 {
  color: rgba(254, 44, 123);
}
</style>