<template>
  <div id="paihangcontainer">
    <div class="top">
      <div class="meiri" v-if="shiyuanbao">{{this.memberRank.curDateCoin}}</div>
      <div class="leiji" v-if="shiyuanbao">{{this.memberRank.coin}}</div>
      <div class="hongbaojinri" v-if="shihongbao">{{this.memberRank.curDateCoin}}</div>
      <div class="info">
        您是{{this.memberRank.winningLevelLabel}}头衔，排行第{{this.memberRank.rank}}，共博饼{{this.memberRank.moonCakeNum}}次
      </div>

      <div class="hongbao_meiri"></div>
      <div class=""></div>

    </div>
    <ul class="list">
      <li class="list_item" v-for="(item,index) in dataList" :class="{hongbao:shihongbao,yuanbao:shiyuanbao}">
        <div class="mingci"><img v-if="item.rank<=3" :src="mingciImg[item.rank-1]"><span v-if="item.rank>3">{{item.rank}}</span></div>
        <div class="faceImg"><img :src="item.face"></div>
        <div class="name">{{item.nickname}}</div>
        <div class="bangming">{{item.winningLevelLabel}}</div>
        <div class="shuliang">{{item.coin}}</div>
      </li>
      <!--<li class="list_item">-->
      <!--<div class="mingci"></div>-->
      <!--<div class="faceImg"></div>-->
      <!--<div class="name">upSir</div>-->
      <!--<div class="bangming">王中王</div>-->
      <!--<div class="shuliang">1000000</div>-->
      <!--</li>-->
      <!--<li class="list_item">-->
      <!--<div class="mingci"></div>-->
      <!--<div class="faceImg"></div>-->
      <!--<div class="name">upSir</div>-->
      <!--<div class="bangming">王中王</div>-->
      <!--<div class="shuliang">1000000</div>-->
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
    name: 'paihangbang',
    data() {
      return {
        dataList: [],
        memberRank: '',
        mingciImg: ['https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/1.png', 'https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/2.png', 'https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/3.png'],
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
      var pageNo = 0;
      var pageSize = 1;
      this.$axios({
        method: 'post',
        url: '/moon/queryMoonActivityBank',
        responseType: 'json',
        data: {
          lotteryCycle: lotteryCycle,
          moonId: moonId,
          pageNo: this.yeNum,
          pageSize: 6,
          token: token
        }
      }).then(data => {
        this.dataList = data.data.res_data.dataList;
        // console.log(data.data)
        if(data.data.res_data.memberRank == null){
          this.memberRank = JSON.parse("{\n" +
            "            curDateCoin:0,\n" +
            "            coin:0,\n" +
            "            winningLevelLabel:\"名落孙山\",\n" +
            "            rank:0,\n" +
            "            moonCakeNum:0\n" +
            "          }")
        }
        else {
          this.memberRank =data.data.res_data.memberRank
        }
        this.memberRank = data.data.res_data.memberRank;
        // console.log(this.memberRank)
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
        if (this.yeNum < (this.total / 6)){
          var lotteryCycle = (JSON.parse(sessionStorage.getItem('bobingInfo'))).lotteryCycle;
          var token = sessionStorage.getItem('token');
          var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
          this.$axios({
            method: 'post',
            url: '/moon/queryMoonActivityBank',
            responseType: 'json',
            data: {
              lotteryCycle: lotteryCycle,
              moonId: moonId,
              pageNo: this.yeNum += 1,
              pageSize: 6,
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
            url: '/moon/queryMoonActivityBank',
            responseType: 'json',
            data: {
              lotteryCycle: lotteryCycle,
              moonId: moonId,
              pageNo: this.yeNum -= 1,
              pageSize: 6,
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
    }
  }
</script>
<style lang="scss" scoped>
  /*html,body{*/
  /*background-color: #c5420b;*/
  /*}*/
  .hongbao{
    background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbaolist_hongbaobg.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .yuanbao{
    background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbaolist_bg.png") 0 0 no-repeat;
    background-size: 100% 100%;
  }

  #paihangcontainer {
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
      top: 3.14rem;
      background-color: rgb(181, 30, 6);
      min-height: 1067px;
      padding: 24px 0 0 0;
      margin: 0;
      list-style-type: none;
      .list_item {
        position: relative;
        width: 750px;
        height: 152px;
        /*background: url("../assets/img/yuanbaolist_bg.png") 0 0 no-repeat;*/
        /*background-size: cover;*/
        div {
          display: inline-block;
        }
        .mingci {
          position: absolute;
          left: 62px;
          top: 44px;
          height: 61px;
          width: 48px;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            display: inline-block;
            text-align: center;
            font-size: .5rem;
            color: rgb(229, 94, 20);
            width: 100%;
            height: 100%;
          }
          /*background: url("../assets/img/yi.png") 0 0 no-repeat;*/
          /*background-size: cover;*/
        }
        .faceImg {
          position: absolute;
          left: 135px;
          top: 36px;
          height: 80px;
          width: 80px;
          border-radius: 80px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          position: absolute;
          left: 235px;
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
          left: 400px;
          top: 58px;
          height: 30px;
          width: 90px;
          font-size: 26px;
          color: #8d5d07;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .shuliang {
          position: absolute;
          left: 529px;
          top: 58px;
          height: 30px;
          width: 135px;
          font-size: 30px;
          color: #fba100;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

</style>
