<template>
  <div id="wangqicontainer">
    <div class="top"></div>
    <ul class="list">
      <li class="list_item" v-for="item in dataList">
        <div class="faceImg"><img :src="item.weixinFace"></div>
        <div class="name">{{item.nickname}}</div>
        <div class="bangming">{{item.winningLevelLabel}}</div>
        <div class="time">{{formatDateTime(item.createTime)}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import $ from 'jquery'
  // import axios from "axios"
  export default {
    name: 'wangqi',
    data() {
      return {
        dataList:''
      }
    },
    mounted() {
       this.dataList = JSON.parse(sessionStorage.getItem('dataList'))
    },
    methods: {
      formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*html,body{*/
  /*background-color: #c5420b;*/
  /*}*/
  #wangqicontainer {
    width: 750px;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      width: 750px;
      height: 264px;
      /*background: url("../assets/img/paihang_top.png") 0 0 no-repeat;*/
      background: url("../assets/img/wangqi_top.png") 0 0 no-repeat;
      background-size: cover;
      .meiri {
        position: absolute;
        top: 110px;
        left: 131px;
        width: 186px;
        height: 34px;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 2px;
      }
      .leiji {
        position: absolute;
        top: 110px;
        left: 503px;
        width: 186px;
        height: 34px;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 2px;
      }
      .info {
        position: absolute;
        top: 193px;
        left: 61px;
        width: 640px;
        height: 53px;
        font-size: 26px;
        color: #fdd6c8;
        letter-spacing: 2px;
      }
    }
    .list {
      position: absolute;
      top: 243px;
      background-color: rgb(181, 30, 6);
      /*padding: 0;*/
      min-height: 1067px;
      padding: 24px 0 0 0;
      margin: 0;
      list-style-type: none;
      .list_item {
        position: relative;
        width: 750px;
        height: 126px;
        background: url("../assets/img/wangqilist.png") 0 0 no-repeat;
        background-size: cover;
        div {
          display: inline-block;
        }
        .faceImg {
          position: absolute;
          left: 80px;
          top: 30px;
          height: 80px;
          width: 80px;
          border-radius: 80px;
          img{
            width: 100%;
            height: 100%;
            border-radius: .6rem;
          }
        }
        .name {
          position: absolute;
          left: 180px;
          top: 58px;
          height: 30px;
          width: 135px;
          font-size: 26px;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .bangming {
          position: absolute;
          left: 330px;
          top: 58px;
          height: 30px;
          width: 90px;
          font-size: 26px;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .time {
          position: absolute;
          left: 480px;
          top: 58px;
          height: 30px;
          width: 250px;
          font-size: .2rem;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

</style>
