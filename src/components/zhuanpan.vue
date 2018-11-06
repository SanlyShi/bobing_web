<template>
  <div class="wrap">
    <div id="zhuanpancontainer">
      <!--音效-->
      <audio src="http://others.cheertea.com/zhuanpan.wav" controls preload="auto" hidden="true" id="zhuanpan"></audio>
      <!--按钮-->
      <div class="left_time">你有{{leftTime}}次抽奖机会</div>
      <div class="game_rule" @click="goRule"></div>
      <div class="my_jiangpin" @click="goJiang"></div>
      <!--弹窗-->
      <div class="getWindow">
        <div class="show-result">
          <div class="jiang_content">
            <!--<p>{{awardLevel}}</p>-->
            <p>{{awardName}}</p>
          </div>
          <div class="know"></div>
        </div>
      </div>
      <!--<h1>辛运大转盘</h1>-->
      <div class="mainlotterycontent">
        <div class="mainlotter_outer">
          <div class="mainlotter_inner"></div>
        </div>
        <div class="lotterselect">
          <img src="../assets/img/zhuanpan_zhizhen.png" alt="" class="lotterselectimg" @click="start(!begin)">
        </div>
      </div>

    </div>
    <div class="home_bottom">
      <p>{{jieshiTop}}</p>
      <p>{{jieshiBottom}}</p>
    </div>


    <div class="mask">
      <div class="zhuanpan0_wrap" @click="clearT">
        <p>您还没有大转盘机会</p>
        <p>参加{{dingdanjihui}}次博饼即可获取机会</p>
        <!--<p>依次类推，消费越多，博饼机会越多</p>-->
      </div>
    </div>


  </div>
</template>
<script>
  import $ from 'jquery'
  // import axios from "axios"
  export default {
    name: 'zhuanpan',
    data() {
      return {
        // zhuanpanShow:false,
        begin: false,
        leftTime: '',
        dingdanjihui:'',
        awardName: '',
        // awardLevel: '',
        zhongjianginfo: '',
        zhongjiangjieguo: '',
        jieshiTop:'',
        jieshiBottom:'',
        bobingDetail:'',
        turntableRuleImg:''
      }
    },
    mounted() {

      this.bobingDetail = JSON.parse(sessionStorage.getItem('bobingDetail'))

      var str = this.bobingDetail.moonActivity.moonExplain
      this.jieshiTop = str.split('，')[0]
      this.jieshiBottom = str.split('，')[1]

      this.bobingDetail = JSON.parse(sessionStorage.getItem('bobingDetail'))
      this.dingdanjihui = this.bobingDetail.moonActivity.turntableCondition




      var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
      var token = sessionStorage.getItem('token');

      this.$axios({
        method: 'post',
        url: '/moon/queryMoonTurntable',
        responseType: 'json',
        data: {
          moonId: moonId,
          token: token
        }
      }).then(data => {
        sessionStorage.turntableRuleImg = data.data.res_data.moonStyle.styleRuleImage
        if(data.data.res_data.num == null){
          this.leftTime = 0
        }
        else{
          this.leftTime = data.data.res_data.num


        }

      $(function () {
        $('.mainlotter_inner').css({
          background: 'url('+data.data.res_data.moonStyle.styleMoonImage+') 0 0 no-repeat',
          backgroundSize: "100% 100%",
        })

        // $('.mainlotter_inner').css({
        //   background: 'url('+'https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/zhuanpan_pan.png'+') 0 0 no-repeat',
        //   backgroundSize: "100% 100%",
        // })
      })


      }).catch(err => {
        console.log(err)
      })


    },
    methods: {
      clearT(){
        this.$router.go(-1)
      },
      goRule() {
        this.$router.push({path: '/rule', query: {ruleId: 3}})
      },
      goJiang() {
        // this.$router.push('/myaward')
        this.$router.push({path: '/myaward', query: {orderType: 1}})
      },
      // know() {
      //   $('.getWindow').hide();
      // },
      start(begin) {
       if(begin){
         function audioAutoPlay() {
           var musicEle0 = document.getElementById('zhuanpan');
           musicEle0.play();
         }
         audioAutoPlay();

         this.begin = true;
         if (this.leftTime == null || this.leftTime == 0){
           // alert('您的抽奖次数不足！')
           $('.mask').show();
           this.begin = false;
         }
         else if(this.leftTime > 0){
           var prizeOnOff = true;
           var winTimer = null;
           var angle = 0;
           var _this = this;


           var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
           var token = sessionStorage.getItem('token');
           this.$axios({
             method: 'post',
             url: '/moon/memberLuckyDraw',
             responseType: 'json',
             data: {
               moonId: moonId,
               token: token
             }
           }).then(data => {
             this.zhongjianginfo = data.data.res_data;
             this.zhongjiangjieguo = data.data.res_code;
             if (true) {
               this.leftTime -= 1;
               // $('#zhuanpan').get(0).play();




               // rotate即奖项
               var rotate = this.zhongjianginfo.awardLevel;

               // var rotate = 1;
               angle = 360 * 5 - (rotate-1)*60 - 30;
               $(".mainlotter_inner").css({
                 "-webkit-transform": "rotate(" + angle + "deg)",
                 "transform": "rotate(" + angle + "deg)",
                 "-webkit-transition": "all 2.3s",
                 "transition": "all 2.3s"
               });
               clearTimeout(winTimer);
               winTimer = setTimeout(function () {
                 $('.getWindow').show();
                 $(function () {
                   if (_this.zhongjiangjieguo == 0 && _this.zhongjianginfo.awardLevel !== 0) {
                     $('.show-result').css({
                       'background': 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/zhuan_zhong.png") 0 0 no-repeat',
                       'background-size': '100% 100%'
                     })
                     // _this.awardLevel = _this.zhongjianginfo.awardLevel;
                     _this.awardName = _this.zhongjianginfo.awardName;
                   }
                   if (_this.zhongjiangjieguo == 1 || _this.zhongjianginfo.awardLevel == 0) {
                     $('.show-result').css({
                       'background': 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/zhuan_weizhong.png") 0 0 no-repeat',
                       'background-size': '100% 100%'
                     })
                     _this.awardLevel = "";
                     _this.awardName = "";
                   }
                 })

                 // $('.show-result-prize').html(data.res_data.draw_result);
                 if (/*data.res_data.reward_grade == 18*/true) {
                   $('.congra').hide();
                   $('.show-result-prize').css({color: '#333'});
                 } else {
                   $('.congra').show();
                   $('.show-result-prize').css({color: '#07d602'});
                 }
                 prizeOnOff = true;
                 _this.begin = false;
               }, 3000);
               $('.know').on('click', function () {
                 $(".mainlotter_inner").css({
                   "-webkit-transform": "rotate(" + 0 + "deg)",
                   "-moz-transform": "rotate(" + 0 + "deg)",
                   "-ms-transform": "rotate(" + 0 + "deg)",
                   "transform": "rotate(" + 0 + "deg)",
                   "-webkit-transition": "all 0s",
                   "transition": "all 0s"
                 });
                 $('.getWindow').hide();


               });
               //             },
               //             error:function (data) {
               //                 console.log(data)
               //             }
               //         })
             }
           }).catch(err => {
             console.log(err)
           })
         }
       }
       else {
         alert("转盘转动中，请勿点击！")
       }
      }
    }
  }
</script>
<style scoped lang="scss">
  .mask {
    display: none;
    position: fixed;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
    top: 0;
    width: 100%;
    height: 100%;
    .jieguo_wrap {
      width: 100%;
      height: 100%;
      /*background: url("../assets/img/hongbao_gif.gif") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
      .showmaskbox {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 31px;
        width: 750px;
        height: 980px;
        background: url("../assets/img/caidai.png") 0 0 no-repeat;
        background-size: 100% 100%;
        .zhuangyuan {
          position: absolute;
          top: 55px;
          left: 0;
          right: 0;
          margin: auto;
          width: 331px;
          height: 386px;
          background: url("../assets/img/zhuangyuan_logo.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .kuang1 {
          position: absolute;
          top: 398px;
          left: 0;
          right: 0;
          margin: auto;
          width: 632px;
          height: 555px;
          background: url("../assets/img/kuang.png") 0 0 no-repeat;
          background-size: 100% 100%;
          text-align: center;
          .zhuhe {
            margin-top: 14px;
            font-size: 40px;
            font-weight: bold;
            color: #ffffff;
          }
          .jiangxiang {
            margin-top: 70px;
            letter-spacing: 3px;
            font-size: 38px;
            font-weight: bold;
            color: #ffcc00;
          }
          .shue {
            margin-top: 60px;
            font-size: 27px;
            color: #ffffff;
            letter-spacing: 2px;
            .down {
              span {
                color: #ffcc00;
              }
            }
            .up{
              padding: 0 .5rem;
            }
          }
          .yaoqing {
            position: absolute;
            margin: auto;
            right: 0;
            left: 0;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .again {
            position: absolute;
            left: 60px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .xuanyao {
            position: absolute;
            left: 334px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
        }
        .kuang3 {
          position: absolute;
          top: 398px;
          left: 0;
          right: 0;
          margin: auto;
          width: 632px;
          height: 555px;
          background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yaoqing1.png") 0 0 no-repeat;
          background-size: 100% 100%;
          /*background: url("../assets/img/kuang.png") 0 0 no-repeat;*/
          /*background-size: 100% 100%;*/
          text-align: center;
          .zhuhe {
            margin-top: 14px;
            font-size: 40px;
            font-weight: bold;
            color: #ffffff;
          }
          .jiangxiang {
            margin-top: 70px;
            letter-spacing: 3px;
            font-size: 38px;
            font-weight: bold;
            color: #ffcc00;
          }
          .shue {
            margin-top: 60px;
            font-size: 27px;
            color: #ffffff;
            letter-spacing: 2px;
            .down {
              span {
                color: #ffcc00;
              }
            }
          }
          .yaoqing {
            position: absolute;
            margin: auto;
            right: 0;
            left: 0;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .again {
            position: absolute;
            left: 60px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .xuanyao {
            position: absolute;
            left: 334px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
        }
        .kuang2 {
          position: absolute;
          top: 398px;
          left: 0;
          right: 0;
          margin: auto;
          width: 632px;
          height: 555px;
          background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yaoqing.png") 0 0 no-repeat;
          background-size: 100% 100%;
          /*background: url("../assets/img/kuang.png") 0 0 no-repeat;*/
          /*background-size: 100% 100%;*/
          text-align: center;
          .zhuhe {
            margin-top: 14px;
            font-size: 40px;
            font-weight: bold;
            color: #ffffff;
          }
          .jiangxiang {
            margin-top: 70px;
            letter-spacing: 3px;
            font-size: 38px;
            font-weight: bold;
            color: #ffcc00;
          }
          .shue {
            margin-top: 60px;
            font-size: 27px;
            color: #ffffff;
            letter-spacing: 2px;
            .down {
              span {
                color: #ffcc00;
              }
            }
          }
          .yaoqing {
            position: absolute;
            margin: auto;
            right: 0;
            left: 0;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .again {
            position: absolute;
            left: 60px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
          .xuanyao {
            position: absolute;
            left: 334px;
            top: 380px;
            width: 240px;
            height: 70px;
          }
        }
      }
    }
    .dengmi_wrap {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 230px;
      width: 592px;
      height: 772px;
      background: url("../assets/img/dengmi_bg.png") 0 0 no-repeat;
      background-size: 100% 100%;
      .back {
        width: 65px;
        height: 65px;
        position: absolute;
        right: 0;
        top: 0;
      }
      .timu {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 330px;
        width: 80%;
        text-align: center;
        .miti {
          color: #800504;
          font-size: .5rem;
        }
        .tishi {
          color: #cc6613;
          font-size: 27px;
        }
        .answer {
          position: absolute;
          top: 190px;
          margin: 0 auto;
          left: 0;
          right: 0;
          padding: 0;
          width: 375px;
          height: 170px;
          list-style-type: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          li {
            width: 2.4rem;
            height: 60px;
            border-radius: 5px;
            border: solid 2px #7c1d0f;
            /*&:hover {*/
            /*background-color: #ce4514;*/
            /*}*/
            span {
              display: inline-block;
              font-size: 24px;
              padding-top: 12px;
              color: #800504;
            }
            i {
              display: inline-block;
              width: 0;
              visibility: hidden;
            }
          }
        }
      }
      .jieguo {
        position: absolute;
        top: 380px;
        width: 100%;
        text-align: center;
        .jieguo_top {
          margin: 10px;
          color: #800504;
          font-size: 52.5px;
        }
        .jieguo_bottom {
          margin: 10px;
          color: #800504;
          font-size: 30px;
          span {
            color: #ff8a00;
          }
        }
      }
      .queding {
        width: 244px;
        height: 78px;
        position: absolute;
        top: 666px;
        margin: auto;
        left: 0;
        right: 0;
      }
    }
    .fenx_wrap {
      position: absolute;
      left: 0;
      top: 30px;
      width: 750px;
      height: 666px;
      color: #ffffff;
      background: url("../assets/img/fenxT.png") 0 0 no-repeat;
      background-size: 100% 100%;
      .yi {
        position: absolute;
        font-size: 30px;
        top: 350px;
        left: 150px;
      }
      .er {
        position: absolute;
        font-size: 30px;
        top: 420px;
        left: 150px;
      }
    }
    .phone_wrap {
      position: absolute;
      left: 109.5px;
      top: 320px;
      width: 531px;
      height: 558px;
      background: url("../assets/img/phone.png") 0 0 no-repeat;
      background-size: 100% 100%;
      .queren {
        position: absolute;
        left: 128px;
        top: 416px;
        width: 281px;
        height: 82px;
      }
      .cha {
        position: absolute;
        right: 0;
        top: 0;
        width: 65px;
        height: 65px;
      }
      input {
        border: none;
        -webkit-appearance: none;
        outline: none;
        caret-color: #800504;
        font-size: 24px;
        color: #939599;
      }
      .phone {
        position: absolute;
        left: 167px;
        top: 200px;
        width: 320px;
      }
      .yanzhengma {
        position: absolute;
        left: 167px;
        top: 296px;
        width: 165px;
      }
      p {
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        left: 360px;
        top: 304px;
        width: 128px;
        height: 24px;
        text-align: center;
        margin: 0;
      }
    }
    .zhuanpan0_wrap {
      position: absolute;
      left: 109.5px;
      top: 450px;
      width: 531px;
      height: 343px;
      background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/zhuanpan00.png") 0 0 no-repeat;
      background-size: 100% 100%;
      text-align: center;
      p {
        margin: 4px;
        color: #ffffff;
        font-size: 28px;
      }
      p:nth-child(1) {
        margin-top: 1.4rem;
      }
    }
  }
  .wrap {
    position: absolute;
    width: 750px;
    height: 1334px;
    background-color: rgb(181, 30, 6);
    left: 0;
    top: 0;
    .home_bottom {
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: .2rem;
      text-align: center;
      color: #ffcfc6;
      background-color: #b31f03;
      padding-bottom: 20px;
      p {
        margin: 0;
        font-size: 20px;
      }
    }
    #zhuanpancontainer {
      position: absolute;
      text-align: center;
      width: 750px;
      height: 1203px;
      background: url("../assets/img/zhuanpan_bg.png") no-repeat 0 0;
      background-size: 100% 100%;
      .left_time {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 4.75rem;
        width: 320px;
        height: 67px;
        color: #ffffff;
        font-size: .38rem;
        letter-spacing: 2px;
      }
      .game_rule {
        position: absolute;
        left: 54px;
        top: 1095px;
        width: 288px;
        height: 93px;
      }
      .my_jiangpin {
        position: absolute;
        left: 420px;
        top: 1095px;
        width: 288px;
        height: 90px;
      }
    }
  }

  .mainlotterycontent {
    position: relative;
  }

  .mainlotter_outer {
    position: relative;
    overflow: hidden;
    width: 617px;
    height: 617px;
    margin: 448px auto 0;
  }

  .mainlotter_inner {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 617px;
    height: 617px;
    border-radius: 50%;
    /*background: url("../assets/img/zhuanpan_pan.png") 0 0 no-repeat;*/
    /*background-size: cover;*/
  }

  .lotterselect {
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    left: 375px;
    top: 270px;
    width: 219px;
    height: 279px;
    border-radius: 50%;
    z-index: 1
  }

  .lotterselect .lotterselectimg {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 100
  }

  .getWindow {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .show-result {
      position: absolute;
      width: 608px;
      height: 621px;
      top: 270px;
      margin: auto;
      left: 0;
      right: 0;
      background: url("../assets/img/zhuan_zhong.png") 0 0 no-repeat;
      background-size: cover;
      .jiang_content {
        position: absolute;
        left: 85px;
        width: 452px;
        top: 340px;
        text-align: center;
        p {
          margin: 2px 4px;
          letter-spacing: 1px;
          font-size: 37px;
          color: #ffffff;
        }
      }
      .know {
        position: absolute;
        width: 290px;
        height: 92px;
        top: 523px;
        margin: auto;
        left: 0;
        right: 0;
        border-radius: 20px;
      }
    }
  }
</style>
