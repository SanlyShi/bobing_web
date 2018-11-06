<template>
  <div id="myXiangRoomcontainer">
    <div class="top">
      <div class="meiri" v-if="shiyuanbao">{{this.memberRank.curDateCoin}}</div>
      <div class="leiji" v-if="shiyuanbao">{{this.memberRank.coin}}</div>
      <div class="hongbaojinri" v-if="shihongbao">{{this.memberRank.curDateCoin}}</div>
      <div class="info">您是{{this.memberRank.winningLevelLabel}}头衔，排行第{{this.memberRank.rank}}，共博饼{{this.memberRank.moonCakeNum}}次</div>


      <div class="hongbao_meiri"></div>
      <div class=""></div>

    </div>
    <div class="list_top" :class="{hongbao:shihongbao,yuanbao:shiyuanbao}"></div>
    <ul class="list">
      <li class="list_item" v-for="item in dataList">
        <div class="name">{{item.moonTitle}}</div>
        <div class="bangming">{{item.coin}}</div>
        <div class="shuliang">{{formatDateTime(item.createDate)}}</div>
      </li>


      <!--<li class="list_item">-->
        <!--<div class="name">巨柚13145号</div>-->
        <!--<div class="bangming">5000</div>-->
        <!--<div class="shuliang">2018-07-15 15:30</div>-->
      <!--</li>-->
      <!--<li class="list_item">-->
        <!--<div class="name">巨柚13145号</div>-->
        <!--<div class="bangming">5000</div>-->
        <!--<div class="shuliang">2018-07-15 15:30</div>-->
      <!--</li>-->
    </ul>
    <div class="fenye">
      <div @click="pre"><&nbsp上一页</div>
      <div @click="nex">下一页&nbsp></div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  // import axios from "axios"
  export default {
    name: 'myXiangRoom',
    data() {
      return {
        dataList:[],
        memberRank:'',
        shihongbao:false,
        shiyuanbao:false,
        yeNum:1,
        total:''
      }
    },
    mounted() {

      var lotteryCycle = (JSON.parse(sessionStorage.getItem('bobingInfo'))).lotteryCycle;
      var token = sessionStorage.getItem('token');
      var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
      // var pageNo = 0;
      // var pageSize = 1;
      this.$axios({
        method: 'post',
        url: '/moon/queryMoonBox',
        responseType: 'json',
        data: {
          lotteryCycle: lotteryCycle,
          moonId: moonId,
          pageNo: this.yeNum,
          pageSize: 10,
          token: token
        }
      }).then(data => {
        this.dataList = data.data.res_data.dataList
        this.memberRank = data.data.res_data.memberRank
        this.total = data.data.res_data.total
      }).catch(err => {
        console.log(err)
      })


      var coinType = (JSON.parse(sessionStorage.getItem('bobingInfo'))).coinType;
      // var coinType = 0;
      if (coinType == 0) {
        //金元宝
        this.shihongbao = false;
        this.shiyuanbao = true;
        $(function () {
          $('.top').css({
            background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_top.png") 0 0 no-repeat',
            backgroundSize: "100% 100%",
          })
        })
      }
      else{
        //红包
        this.shihongbao = true;
        this.shiyuanbao = false;
        $(function () {
          $('.top').css({
            background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_hongbaotop.png") 0 0 no-repeat',
            backgroundSize: "100% 100%",
          })
        })
      }

    },
    methods: {
      nex(){
        if (this.yeNum < (this.total / 10)){
          var lotteryCycle = (JSON.parse(sessionStorage.getItem('bobingInfo'))).lotteryCycle;
          var token = sessionStorage.getItem('token');
          var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
          this.$axios({
            method: 'post',
            url: '/moon/queryMoonBox',
            responseType: 'json',
            data: {
              lotteryCycle: lotteryCycle,
              moonId: moonId,
              pageNo: this.yeNum += 1,
              pageSize: 10,
              token: token
            }
          }).then(data => {
            this.dataList = data.data.res_data.dataList
            this.memberRank = data.data.res_data.memberRank
          }).catch(err => {
            console.log(err)
          })


          var coinType = (JSON.parse(sessionStorage.getItem('bobingInfo'))).coinType;
          // var coinType = 0;
          if (coinType == 0) {
            //金元宝
            this.shihongbao = false;
            this.shiyuanbao = true;
            $(function () {
              $('.top').css({
                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_top.png") 0 0 no-repeat',
                backgroundSize: "100% 100%",
              })
            })
          }
          else{
            //红包
            this.shihongbao = true;
            this.shiyuanbao = false;
            $(function () {
              $('.top').css({
                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_hongbaotop.png") 0 0 no-repeat',
                backgroundSize: "100% 100%",
              })
            })
          }
        }

      },
      pre(){
        if (this.yeNum > 1){
          var lotteryCycle = (JSON.parse(sessionStorage.getItem('bobingInfo'))).lotteryCycle;
          var token = sessionStorage.getItem('token');
          var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
          this.$axios({
            method: 'post',
            url: '/moon/queryMoonBox',
            responseType: 'json',
            data: {
              lotteryCycle: lotteryCycle,
              moonId: moonId,
              pageNo: this.yeNum -= 1,
              pageSize: 10,
              token: token
            }
          }).then(data => {
            this.dataList = data.data.res_data.dataList
            this.memberRank = data.data.res_data.memberRank
          }).catch(err => {
            console.log(err)
          })


          var coinType = (JSON.parse(sessionStorage.getItem('bobingInfo'))).coinType;
          // var coinType = 0;
          if (coinType == 0) {
            //金元宝
            this.shihongbao = false;
            this.shiyuanbao = true;
            $(function () {
              $('.top').css({
                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_top.png") 0 0 no-repeat',
                backgroundSize: "100% 100%",
              })
            })
          }
          else{
            //红包
            this.shihongbao = true;
            this.shiyuanbao = false;
            $(function () {
              $('.top').css({
                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/paihang_hongbaotop.png") 0 0 no-repeat',
                backgroundSize: "100% 100%",
              })
            })
          }
        }


      },
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
<style lang="scss">
  /*html,body{*/
  /*background-color: #c5420b;*/
  /*}*/
  .hongbao{
    background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_listT.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .yuanbao{
    background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao_listT.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }
  #myXiangRoomcontainer {
    width: 750px;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      width: 750px;
      height: 243px;
      /*background: url("../assets/img/paihang_top.png") 0 0 no-repeat;*/
      /*background: url("../assets/img/paihang_hongbaotop.png") 0 0 no-repeat;*/
      /*background-size: cover;*/
      .hongbaojinri{
        position: absolute;
        text-align: center;
        top: 110px;
        left:0;
        right: 0;
        margin: 0 auto;
        width: 186px;
        height: 34px;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 2px;
      }
      .meiri {
        position: absolute;
        text-align: center;
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
        text-align: center;
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
    .list_top{
      width: 750px;
      height: 74px;
      /*background: url("../assets/img/myX_top.png") 0 0 no-repeat;*/
      /*background-size: cover;*/
      position: absolute;
      top: 3.14rem;
      left: 0;
    }
    .fenye{
      position: absolute;
      margin: 0 auto;
      /*padding: 35px;*/
      display: flex;
      width: 100%;
      top: 16.3rem;
      justify-content: space-around;
      color: #8d5d07;
      div{
        text-align: center;
        width: 140px;
        background-color:rgb(255,243,228);
        border-radius: 25px;
        font-size: 28px;
        height: 40px;
        padding-top: 2px;
      }
    }
    .list {
      position: absolute;
      top: 300px;
      left: 0;
      background-color: rgb(181, 30, 6);
      min-height: 1067px;
      padding: 0;
      margin: 0;
      list-style-type: none;
      .list_item {
        position: relative;
        width: 750px;
        height: 88px;
        background: url("../assets/img/myX_list.png") 0 0 no-repeat;
        background-size: 100.25% 100%;
        div {
          display: inline-block;
        }
        .mingci {
          position: absolute;
          left: 62px;
          top: 44px;
          height: 61px;
          width: 48px;
          background: url("../assets/img/yi.png") 0 0 no-repeat;
          background-size: cover;
        }
        .faceImg {
          position: absolute;
          left: 135px;
          top: 36px;
          height: 80px;
          width: 80px;
          border-radius: 80px;
          background: url("../assets/img/face.png") 0 0 no-repeat;
          background-size: cover;
        }
        .name {
          position: absolute;
          left: 60px;
          top: 30px;
          height: 30px;
          text-align: center;
          width: 180px;
          font-size: 26px;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .bangming {
          position: absolute;
          left: 300px;
          top: 30px;
          text-align: center;
          height: 30px;
          width: 125px;
          font-size: 26px;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .shuliang {
          position: absolute;
          left: 470px;
          top: 30px;
          height: 30px;
          width: 230px;
          text-align: center;
          font-size: 26px;
          color: #fba100;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

</style>
