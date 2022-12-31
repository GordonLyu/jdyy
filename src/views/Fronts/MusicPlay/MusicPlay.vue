<template>
    <!-- 背景图 -->
    <div class="bg">
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 0"
      />
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 1"
      />
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 2"
      />
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 3"
      />
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 4"
      />
      <img
        src="https://hype4.academy/_next/static/media/ovalShadow.793e2be7.svg"
        alt="图片迷路了~"
        style="--x: 5"
      />
    </div>
    <div id="player">
      <div class="musicList">
        <div class="cover">
          <div class="image">
            <img :src="`http://localhost:8080/${musicData.coverURL}`" alt="" />
          </div>
          <div class="message">
            <h1>{{ musicData.musicName }}</h1>
            <p style="width: max-content">{{ musicData.author }}</p>
          </div>
        </div>
  
        <div class="control">
          <div class="player">
            <div class="finally">
              <button @click="stop"><span class="fa-stop"></span></button>
            </div>
  
            <button @click="pre"><span class="fa-step-backward"></span></button>
  
            <button @click="play(true)" v-show="show">
              <span class="fa-play"></span>
            </button>
            <button @click="pause(true)" v-show="!show">
              <span class="fa-pause"></span>
            </button>
  
            <button @click="next"><span class="fa-step-forward"></span></button>
            <div class="quiet">
              <button @click="mute(true)" v-show="!muted">
                <span class="fa-volume-up"></span>
              </button>
              <button @click="mute(false)" v-show="muted">
                <span class="fa-volume-off"></span>
              </button>
            </div>
          </div>
  
          <div class="controlAfter">
            <div class="volume">
              <span class="fa-music"></span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                v-model="volume"
                @input="volumeChange"
              />
            </div>
  
            <div class="progress">
              <input
                type="range"
                v-model="value"
                min="0"
                max="100"
                @drag-start="pause"
                @drag-end="play"
                @input="change"
              />
            </div>
  
            <div class="speed">
              <select @change="rateChange" v-model="rate">
                <option :value="0.5">0.5</option>
                <option :value="1.0">1.0</option>
                <option :value="1.25">1.25</option>
                <option :value="1.5">1.5</option>
                <option :value="2.0">2.0</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  
      <Remark :mid="mid" />
    </div>
  </template>
  <script>
  import { Howl } from "howler";
  
  import Remark from "@/components/Remark/Remark.vue";
  
  export default {
    name: "video-test",
    data() {
      return {
        rate: 1,
        volume: 1,
        audioSrc: [],
        value: 0,
        timer: "",
        show: true,
        currentIndex: 0,
        muted: false,
        musicData: [], //音乐数据
        mid: 0,
      };
    },
    components: {
      Remark,
      // slider
    },
    created() {
      //添加歌曲至歌单
      const form = JSON.parse(window.sessionStorage.getItem("MusicData"));
      this.audioSrc.push("http://localhost:8080/" + form.url);
    },
    mounted() {
      //调用howl
      this.audioPlayer();
      //获取当前路径的音乐id
      this.mid = this.$route.params.id;
      console.log(this.mid, "开始");
      // 获取存储在session的音乐数据
      console.log(this);
      const form = JSON.parse(window.sessionStorage.getItem("MusicData"));
  
      console.log(this.audioSrc);
      //将音乐 本地的音乐数据赋值给musicData
      this.musicData = form;
      console.log(this.audioSrc);
      console.log(this.musicData);
    },
    beforeRouteLeave() {
      this.sound.stop();
    },
    destroyed() {
      console.log("destroyed");
    },
    methods: {
      audioPlayer() {
        let that = this;
        let img = document.querySelector(".image>img");
        this.sound = new Howl({
          src: this.audioSrc[this.currentIndex % this.audioSrc.length],
          autoplay: false,
          loop: false,
          volume: this.volume,
          html5: true,
          preload: true,
          rate: this.rate,
          mute: that.muted,
          onload() {
            console.log("onload! 初始化成功", this);
          },
          onplay() {
            //旋转动画
            img.classList.add("rotate");
            img.classList.remove("pause");
            //旋转动画 end
            //that.duration = that.formatTime(Math.round(this._duration));
            that.show = false;
            that.step();
            console.log("onload!", this);
          },
          onmute() {
            that.muted = this._muted;
          },
          onpause() {
            img.classList.add("pause");
            that.show = true;
            that.cancelAF();
          },
          onstop() {
            img.classList.add("pause");
            that.show = true;
            that.setTimerAndValue();
            that.cancelAF();
          },
          onend() {
            console.log("end");
            that.cancelAF();
            that.next();
          },
        });
      },
      formatTime(secs) {
        let minutes = Math.floor(secs / 60) || 0;
        let seconds = secs - minutes * 60 || 0;
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      },
      play() {
        this.sound.play();
      },
      pause() {
        this.sound.pause();
      },
      stop() {
        this.sound.stop();
      },
      volumeChange(e) {
        this.sound.volume(e.target.value);
      },
      mute(boolean) {
        this.sound.mute(boolean);
      },
      rateChange(e) {
        this.sound.rate(e.target.value);
      },
      pre() {
        this.stop();
        this.currentIndex = this.currentIndex >= 1 ? this.currentIndex - 1 : 0;
        this.audioPlayer(this.currentIndex);
        this.play();
      },
      next() {
        this.stop();
        this.currentIndex = this.currentIndex + 1;
        this.audioPlayer(this.currentIndex);
        this.play();
      },
      setTimerAndValue() {
        let seek = this.sound.seek();
        if (typeof seek === "number") {
          this.timer = this.formatTime(Math.round(seek));
          this.value = Math.round((seek / this.sound._duration) * 100) || 0;
        }
      },
      step() {
        this.setTimerAndValue();
        this.s = requestAnimationFrame(this.step);
      },
  
      cancelAF() {
        cancelAnimationFrame(this.s);
      },
      change(e) {
        this.sound.seek((this.sound._duration * e.target.value) / 100);
        this.setTimerAndValue();
      },
    },
    beforeDestroy() {
      this.cancelAF();
    },
  };
  </script>
  
  <style lang="less" scoped>
  #player {
    width: 100%;
    height: 100%;
    /* border-top: 5px solid var(--color-theme); */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #player .musicList {
    width: 80%;
    min-width: 30rem;
    height: 50rem;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(1px);
    /*-webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    /* 优化高斯模糊 */
    transform: translateZ(0);
  }
  
  /* 背景圆 */
  /* 背景圆动画 */
  
  @keyframes animate {
    0%,
    100% {
      transform: translateY(-50px);
    }
  
    50% {
      transform: translateY(50px);
    }
  }
  
  /* 背景圆*/
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: linear-gradient(
      180deg,
      #2f6ed3 5%,
      #5095e4 20%,
      #5095e4 60%,
      #2f6ed3 95%
    );
    z-index: -1;
  }
  
  .bg > img {
    position: absolute;
    animation: animate 10s linear infinite;
    animation-delay: calc(var(--x) * -10s);
  }
  
  .bg > img:nth-of-type(1) {
    width: 15%;
    top: 10%;
    left: 70%;
  }
  
  .bg > img:nth-of-type(2) {
    width: 25%;
    top: 20%;
    left: 10%;
  }
  
  .bg > img:nth-of-type(3) {
    width: 10%;
    top: 40%;
    left: 50%;
  }
  
  .bg > img:nth-of-type(4) {
    width: 30%;
    top: 50%;
    left: 60%;
  }
  
  .bg > img:nth-of-type(5) {
    width: 15%;
    top: 70%;
    left: 15%;
  }
  
  .bg > img:nth-of-type(6) {
    width: 15%;
    top: 5%;
    left: 35%;
  }
  
  // 音乐播放封面
  .cover {
    width: 100%;
    height: 40rem;
    // border: 1px solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .cover .image {
    // width: 35%;
    // flex: 1;
    // border: 1px solid;
    width: 20rem;
    margin-top: 2rem;
  }
  
  // 唱片动画
  .rotate {
    animation: a 10s linear infinite forwards;
  }
  
  .pause {
    animation-play-state: paused;
  }
  
  @keyframes a {
    from {
      transform: rotate(0);
    }
  
    to {
      transform: rotate(360deg);
    }
  }
  
  .cover .image img {
    width: 100%;
    border-radius: 50%;
  }
  
  .cover .message {
    // width: 35%;
    height: 15rem;
    // border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // flex: 1;
    min-width: 10rem;
  }
  
  .cover .message h1 {
    color: var(--color-white);
    margin-bottom: 2rem;
  }
  
  .cover .message p:nth-child(2) {
    width: 80%;
    color: rgb(88, 88, 88);
    text-shadow: 0px 0px 0px black;
  }
  
  .control icon:hover {
    color: #2f6ed3;
  }
  
  //音乐播放器控制层
  .control {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid;
    border-top: 1px solid var(--color-white);
  }
  
  .controlAfter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
  
  //播放/暂停/上下一首
  .player {
    width: 30%;
    // border: 1px solid;
    display: flex;
    justify-content: space-around;
  }
  .player > button {
    margin: 0 1rem;
  }
  
  .player button,
  .finally button,
  .quiet button,
  .speed select,
  .volume {
    width: 4rem;
    height: 4rem;
    color: var(--color-white);
    background-color: transparent;
    border: none;
    outline: none;
    font-family: fontawesome;
    cursor: pointer;
    // color: var(--color-white);
    // background: rgba(255, 255, 255, 0.15);
    // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    // backdrop-filter: blur(1px);
    // /*-webkit-backdrop-filter: blur(1px); */
    // border-radius: 10px;
    // border: 1px solid rgba(255, 255, 255, 0.18);
    // /* 优化高斯模糊 */
    // transform: translateZ(0);
  }
  
  //音量
  .volume {
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    position: relative;
  }
  
  .volume input {
    // position: absolute;
    // top: -3rem;
    // transform: rotate(270deg);
    // margin-left: 1rem;
    // display: none;
    margin-left: 1rem;
  }
  @media screen and (max-width: 938px) {
    .volume input {
      position: absolute;
      top: -3rem;
      transform: rotate(270deg);
      margin-left: 0rem;
      display: none;
    }
    .volume:hover input {
      display: block;
    }
  }
  
  //音量条
  .volume input {
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(1px);
    /*-webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border: none;
    -webkit-appearance: none;
  }
  
  .volume input::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: default;
    height: 10px;
    width: 10px;
    background: none repeat scroll 0 0 var(--color-white);
    border-radius: 50%;
  }
  
  //进度条
  .progress {
    width: 50%;
    // border: 1px solid;
    display: flex;
    align-items: center;
    color: var(--color-white);
  }
  
  .progress input {
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(1px);
    /*-webkit-backdrop-filter: blur(1px); */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    /* 优化高斯模糊 */
    transform: translateZ(0);
    border: none;
    -webkit-appearance: none;
  }
  
  .progress input::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    height: 10px;
    width: 10px;
    background: none repeat scroll 0 0 var(--color-white);
    border-radius: 15px;
  }
  
  //选项里面的内容
  .speed select option {
    color: black;
  }
  
  select option {
    /* 清除默认的箭头样式 */
    appearance: none;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(1px);
  }
  
  .finally {
    width: 4rem;
    // border: 1px solid;
  }
  
  .progress input {
    width: 100%;
  }
  </style>
  