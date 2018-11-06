<template>
  <div id="bobing_container">

    <!--音效区-->
    <audio src="http://others.cheertea.com/touzi1.mp3" controls preload="auto" hidden="true" id="touzi"></audio>
    <audio src="http://others.cheertea.com/puto.mp3" controls preload="auto" hidden="true" id="putong"></audio>
    <audio src="http://others.cheertea.com/duitang.mp3" controls preload="auto" hidden="true" id="duitang"></audio>
    <audio src="http://others.cheertea.com/sanhong.mp3" controls preload="auto" hidden="true" id="sanhong"></audio>
    <audio src="http://others.cheertea.com/zhuangyuan.mp3" controls preload="auto" hidden="true"
           id="zhuangyuan"></audio>

    <!--博饼区-->
    <div class="main">
      <div class="daojishi">{{now}}</div>
      <!--<div class="zhi">{{zhi}}</div>-->
      <div class="baojian" @click="baojian"></div>
      <!--<div class="myXiangRoom" @click="myXiangRoom"></div>-->
      <div class="game_rule" @click="goRule"></div>
      <div class="about_us" @click="aboutUs"></div>
      <div class="myaward" @click="myaward"></div>
      <div class="dianpu" :style="{backgroundImage: 'url(' + bobingDetail.moonStyle.styleMoonBowlImage + ')'}"></div>
      <div class="gainTime" @click="gainTime(0)"></div>
      <ul class="dicebox">
        <li v-for="(item,index) in diceArr"
            :style="{backgroundImage: 'url('+'http://images.cheertea.com/'+(index+1)+'.png)'}">
          {{item}}
        </li>
      </ul>
      <div class="begin_bobing" @click="beginBobing()"></div>
      <div class="shengyu">剩余{{leftTime}}次</div>
      <div class="huodongshijian">活动时间：{{beginTime}}-{{endTime}}</div>
    </div>
    <!--banner区-->
    <div class="vip_banner" @click="topHref"
         :style="{backgroundImage: 'url(' + bobingDetail.moonStyle.styleSpreadImage + ')'}"></div>
    <div class="gift_banner">
      <div class="git_top"></div>
      <div class="scroll-wrap" @click="lunboClick">
        <div class="inner-wrap clearfix">
          <div class="wrap-left">
            <img v-for="item in moonAwardList" :src="item.prizeImg" alt="">
          </div>
          <div class="wrap-right">
            <img v-for="item in moonAwardList" :src="item.prizeImg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_banner" @click="bottomHref"
         :style="{backgroundImage: 'url(' + bobingDetail.moonStyle.styleAdvertImage + ')'}"></div>
    <div class="bottom_banner1" @click="bottomHref1"
         :style="{backgroundImage: 'url(' + bobingDetail.moonStyle.styleThemeImage + ')'}"></div>
    <!--说明区-->
    <div class="home_bottom">
      <p>{{jieshiTop}}</p>
      <p>{{jieshiBottom}}</p>
    </div>
    <!--博饼结果弹窗-->
    <div class="mask">
      <div v-show="jieguoShow" class="jieguo_wrap">
        <div class="showmaskbox">
          <div class="zhuangyuan"></div>
          <div v-show="youdejihui" class="kuang1">
            <div class="zhuhe">{{(winKindCode == 99)?"&nbsp;&nbsp;&nbsp;很遗憾&nbsp;&nbsp;未中奖！":"&nbsp;&nbsp;&nbsp;恭喜您&nbsp;&nbsp;中奖啦！"}}</div>
            <div v-if="winKindCode != 99" class="jiangxiang">{{winKind}}</div>
            <div class="shue" v-if="winKindCode != 99">
              <!--<div class="winThingImg" :style="{backgroundImage: 'url(' + winThingImg + ')'}"></div>-->
              <p class="up">{{winOfficial}}</p>
              <!--<p class="down">恭喜您获得了<span>{{winCoin}}</span>个{{coinType==0?"元宝":"红包"}}！</p>-->
            </div>
            <div class="shue" v-if="winKindCode == 99">
              <p class="up1">好遗憾，差点就中状元了</p>
              <p class="down">不要气馁，还有机会，加油加油！</p>
            </div>
            <div class="again" @click="againGame"></div>
            <!--<div class="xuanyao" @click="xuanhuozhuan"></div>-->
          </div>
          <div v-show="meidejihui1" class="kuang2">
            <div class="zhuhe">没有博饼机会啦</div>
            <div class="shue">
              <p class="up">您没有博饼机会</p>
              <p class="down">请等待开启！</p>
            </div>
            <div class="yaoqing" @click="clearT"></div>
          </div>
          <!--<div v-show="meidejihui2" class="kuang3">-->
          <!--<div class="zhuhe">没有博饼机会啦</div>-->
          <!--<div class="shue">-->
          <!--<p class="up">消费一个订单，增加{{dingdanjihui}}次博饼机会</p>-->
          <!--<p class="down">依次类推，消费越多，博饼机会越多</p>-->
          <!--</div>-->
          <!--<div class="yaoqing" @click="gainTime(1)"></div>-->
          <!--</div>-->

        </div>
      </div>
      <div v-show="dengmiShow" class="dengmi_wrap">
        <div class="back" @click="clearDengmiWrap"></div>
        <div v-show="jindu" class="timu">
          <div class="miti">{{timu.split('(')[0]}}</div>
          <div class="tishi">{{"("+timu.split('(')[1]}}</div>
          <ul class="answer">
            <li v-for="(item,index) in daan" :class="{active:index == isActive}" @click="checkItem(index)"><span>{{item.riddleAnswer}}</span>
              <i>{{item.answerId}}</i>
            </li>
          </ul>
        </div>
        <div v-show="!jindu" class="jieguo">
          <div v-show="right">
            <p class="jieguo_top">恭喜您，答对了</p>
            <p class="jieguo_bottom">获得<span>{{songCoin}}</span>{{songCoinType}}</p>
          </div>
          <div v-show="wrong">
            <p class="jieguo_top">很遗憾，答错了</p>
            <p class="jieguo_bottom">没关系，博饼{{dengmiCondition}}次即有猜题机会</p>
          </div>
        </div>
        <div class="queding" @click="quedingAnswer()"></div>
      </div>
      <div v-show="fenxShow" class="fenx_wrap" @click="clearT">
        <!--<div class="yi">分享给好友就能增加{{moonShare}}次博饼机会</div>-->
        <!--<div class="er">邀请好友≥{{invitePerson}}人，增加{{moonShareNum}}次博饼机会</div>-->
      </div>
      <!--<div v-show="phoneAppear" class="phone_wrap">-->
      <!--<div class="cha" @click="clearT"></div>-->
      <!--<input type="number" class="phone" placeholder="11位手机号">-->
      <!--<input type="password" class="yanzhengma" placeholder="请输入验证码">-->
      <!--<p>获取验证码</p>-->
      <!--<div class="queren" @click="clearT"></div>-->
      <!--</div>-->
      <div v-show="yaoqingma" class="yaoqingma">
        <div class="yaoqingma_inner">
          <div class="back111" @click="clearT"></div>
          <div class="input_kuang">
            <input type="text" placeholder="请输入姓名" v-model="realName">
            <input type="text" placeholder="请输入邀请码" v-model="moonVerifiCode">
          </div>
          <div class="enter" @click="enter"></div>
        </div>
      </div>

      <div class="beginAlert" v-show="beginShow">
        <p>{{beginMessage}}</p>
        <div class="knowle" @click="clearT"></div>
      </div>
    </div>
  </div>
</template>

<script>
  // import share from "../assets/js/wxshare";
  import $ from 'jquery'
  // import axios from "axios"
  import wx from "weixin-js-sdk";

  export default {
    name: 'home',
    data() {
      return {
        beginShow: '',
        beginMessage: '',
        isOpen: '',
        yaoqingma: false,
        zhuanpanShow: false,
        dengmiShow: false,
        fenxShow: false,
        maskShow: false,
        jieguoShow: false,
        winOfficial: '',
        moonShareNum: '',
        invitePerson: '',
        moonShare: '',
        diceArr: ["", "", "", "", "", ""],
        begin: false,
        // maskshow: false,
        companyName: '厦门天禾露网络科技有限公司',
        // zhi: '',
        answer: [{name: '肚'}, {name: '腹'}],
        isActive: 0,
        // tanchuang: 0,
        gainHongbao: 366,
        leftTime: '',
        jishu: 0,
        zhuanpanTime: 0,
        jindu: true,
        right: true,
        phoneAppear: false,
        jieguo: false,
        winKindCode: 0,
        winKind: '',
        winCoin: 0,
        // coinType: 0,
        moonAwardList: '',
        back: false,
        timu: '',
        bottomHre1: '',
        daan: [],
        timuID: '',
        zhuanpanLeftTime: '',
        zongcishu: '',
        dengmiCondition: '',
        songCoin: '',
        songCoinType: '',
        datiqueding: true,
        bobingDetail: '',
        // leftTimeSay:'',
        wrong: '',
        topHre: '',
        bottomHre: '',
        huodong: '',
        endBool: '',
        jinxingzhong: false,
        bobingcishu: 0,
        jieshiTop: '',
        jieshiBottom: '',
        first: true,
        youdejihui: '',
        meidejihui1: '',
        meidejihui2: '',
        turntableCondition: '',
        beginTime: '',
        endTime: '',
        shareTitle: '',
        shareDescribe: '',
        shareImg: '',
        memberId: '',
        moonCount: '',
        // turntableCondition:'',
        dingdanjihui: 0,
        fenxClick: false,
        winThingImg: '',
        now: '',
        isJoin: '',
        isOwners: '',
        moonVerifiCode: '',
        realName: '',
        status:''
        // xuyaoMa: 1
      }
    },
    created() {

    },
    mounted() {







      $(function () {
        var scrollWrap = $('.scroll-wrap').get(0);
        var wrapLeft = $('.wrap-left').get(0);
        var wrapRight = $('.wrap-right').get(0);
        wrapRight.innerHTML = wrapLeft.innerHTML;
        var scrollTimer1 = setInterval(Marquee1, 30)

        function Marquee1() {
          // console.log(wrapLeft.offsetWidth)
          if (wrapRight.offsetWidth - scrollWrap.scrollLeft <= 0) {

            scrollWrap.scrollLeft -= wrapLeft.offsetWidth;
          }
          else {
            scrollWrap.scrollLeft++
          }
        }

      })


      if (sessionStorage.getItem('bobingDetail')) {
        this.bobingDetail = JSON.parse(sessionStorage.getItem('bobingDetail'))
        sessionStorage.bobingInfo = JSON.stringify(this.bobingDetail.moonActivity)


        var myDate = new Date();
        var now = myDate.getTime();

        // console.log(parseInt(this.bobingDetail.moonActivity.startDate))
        // console.log(now)




        this.isOpen = this.bobingDetail.moonActivity.isOpen
        // this.isOpen = 1
        if (this.isOpen == 1) {
          // this.beginMessage = '有'
        }
        if (this.isOpen == 2) {
          this.beginMessage = '活动开始，等待博主开启'
        }
        if (this.isOpen == 3) {
          this.beginMessage = '活动已经结束！'
        }
        sessionStorage.isOpen = this.bobingDetail.moonActivity.isOpen



        if(this.isOpen == 2){
          //倒计时
          if( (parseInt(this.bobingDetail.moonActivity.startDate) - now) < 0){
            this.now = "等待开始！"
          }
          else {
            this.countDown(parseInt(this.bobingDetail.moonActivity.startDate) - now)
          }

        }
        if(this.isOpen == 1){
          this.now = "开始博饼！"
          this.endBool = false

        }
        if(this.isOpen == 3){
          this.now = "博饼结束！"
          this.endBool = true
        }







        this.isJoin = this.bobingDetail.isJoin
        this.status = this.bobingDetail.status
        // this.isJoin = 1

        this.isOwners = this.bobingDetail.isOwners
        sessionStorage.isOwners = this.isOwners
        // if (this.bobingDetail.moonActivity.endDate < Date.parse(new Date())) {
        //   this.endBool = true
        // }
        // else {
        //   this.endBool = false
        // }

        // if (this.bobingDetail.moonActivity.coinType == 0) {
        //   this.zhi = this.bobingDetail.goldIngot
        // }
        // else if (this.bobingDetail.moonActivity.coinType == 1) {
        //   this.zhi = this.bobingDetail.redPager
        // }
        this.leftTime = this.bobingDetail.num
        // this.leftTime = 3

        this.zongcishu = this.bobingDetail.num
        // this.coinType = this.bobingDetail.moonActivity.coinType
        this.dengmiCondition = this.bobingDetail.moonActivity.dengmiCondition
        this.topHre = this.bobingDetail.moonStyle.styleSpreadHred
        this.bottomHre = this.bobingDetail.moonStyle.styleAdvertSpread
        this.bottomHre1 = this.bobingDetail.moonStyle.styleThemeHred
        this.moonShare = this.bobingDetail.moonActivity.moonShare
        this.moonShareNum = this.bobingDetail.moonActivity.moonShareNum
        this.invitePerson = this.bobingDetail.moonActivity.invitePerson
        this.turntableCondition = this.bobingDetail.moonActivity.turntableCondition
        this.beginTime = this.formatDateTime(this.bobingDetail.moonActivity.startDate)
        this.endTime = this.formatDateTime(this.bobingDetail.moonActivity.endDate)
        this.moonAwardList = this.bobingDetail.moonChanceList
        this.moonCount = this.bobingDetail.moonCount
        // this.turntableCondition = this.bobingDetail.turntableCondition
        // this.dengmiCondition = this.bobingDetail.moonActivity.dengmiCondition
        this.dingdanjihui = this.bobingDetail.moonActivity.moonConsume
        this.shareTitle = this.bobingDetail.moonActivity.shareTitle
        this.shareDescribe = this.bobingDetail.moonActivity.shareDescribe
        this.shareImg = this.bobingDetail.moonActivity.shareImg
        sessionStorage.ticketRuleImg = this.bobingDetail.moonActivity.ticketRuleImg

        var str = this.bobingDetail.moonActivity.moonExplain
        this.jieshiTop = str.split('，')[0]
        this.jieshiBottom = str.split('，')[1]

        sessionStorage.roomId = this.$route.query.roomId
        if (this.$route.query.memberId) {
          // alert('不是别人分享的')
          this.memberId = this.$route.query.memberId
        }
        else {
          // alert('是从商城进来的')
          this.memberId = JSON.parse(sessionStorage.getItem('details')).memberId
        }

        this.fenx()
      }

      // if (window.history && window.history.pushState) {
      //   history.pushState(null, null, document.URL);
      //   window.addEventListener('popstate', this.goBack, false);
      // }


    },
    // destroyed() {
    //   window.removeEventListener('popstate', this.goBack, false);
    // },
    methods: {
      enter() {
        // $('.mask').hide();

        this.$axios({
          method: 'post',
          url: '/moon/addMoonMember',
          responseType: 'json',
          data: {
            moonId: this.bobingDetail.moonActivity.moonId,
            moonVerifiCode: this.moonVerifiCode,
            realName: this.realName,
            token: sessionStorage.getItem('token')
          }
        }).then(data => {

        // this.xuyaoMa = data.data.res_code

        // this.xuyaoMa = 0
        if (data.data.res_code == 0) {
          this.isJoin = 1;
          this.fenxShow = false
          this.zhuanpanShow = false
          this.jieguoShow = false
          this.dengmiShow = false
          if (this.isOpen == 1) {
            this.beginShow = false
            $('.mask').hide();
          }
          else if (this.isOpen == 2) {
            this.beginShow = true
          }
          else if (this.isOpen == 3) {
            this.beginShow = true
          }

          this.yaoqingma = false;
        }
        else {
          alert(data.data.res_info)

          this.isJoin = 0;
          this.realName = ''
          this.moonVerifiCode = ''
          this.fenxShow = false
          this.zhuanpanShow = false
          this.jieguoShow = false
          this.dengmiShow = false
          this.beginShow = false
          this.yaoqingma = false;
          $(".mask").hide()
        }

        }).catch(err => {
          console.log(err)
        })


      },
      // beginMessage(){
      //
      // },
      lunboClick() {
        this.$router.push({path: '/myaward', query: {orderType: 0}})
      },
      topHref() {
        if (this.topHre) {
          window.location.href = this.topHre
        }
      },
      bottomHref() {
        if (this.bottomHre) {
          window.location.href = this.bottomHre
        }
      },
      formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      bottomHref1() {
        if (this.bottomHre1) {
          window.location.href = this.bottomHre1
        }
      },
      fenx() {
        let us = window.location.href.split('#')[0];
        // this.memberId = sessionStorage.getItem('memberId')
        // alert(this.memberId)
        var _this = this;
        this.$axios({
          method: "post",
          url: "/basics/anon/wxSign",
          responsetype: "json",
          data: {
            url: us
          }
        })
          .then(data => {
            let datas = data.data.res_data.sign_info;
            wx.config({
              // debug: true,
              appId: datas.appId,
              timestamp: datas.timestamp,
              nonceStr: datas.nonceStr,
              signature: datas.signature,
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareQZone",
                "hideMenuItems"
              ]
            });
            wx.ready(function () {
              let obj = {
                title: _this.shareTitle,
                desc: _this.shareDescribe,
                link: "http://" + _this.$urlstate.url + "/bobing/?#/login?roomId=" + _this.$route.query.roomId + "&memberId=" + _this.memberId+"&zhuanc=true",
                imgUrl: _this.shareImg,
                success: function (res) {
                  // alert("微信接口調用成功")
                  var lotteryCycle = (JSON.parse(sessionStorage.getItem('bobingInfo'))).lotteryCycle;
                  var token = sessionStorage.getItem('token');
                  var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
                  _this.$axios({
                    method: 'post',
                    url: '/moon/moonShare',
                    responseType: 'json',
                    data: {
                      lotteryCycle: lotteryCycle,
                      moonId: moonId,
                      token: token
                    }
                  }).then(data => {
                    _this.$axios({
                      method: 'post',
                      url: '/moon/queryMoonActivity',
                      responseType: 'json',
                      data: {
                        moonId: sessionStorage.getItem('roomId'),
                        token: sessionStorage.getItem('token')
                      }
                    }).then(data => {
                      sessionStorage.bobingDetail = JSON.stringify(data.data.res_data)
                      window.location.reload()
                    }).catch(err => {
                      console.log(err)
                    })
                  }).catch(err => {
                    console.log(err)
                  })


                },
                cancel: function (err) {
                  console.log(err);
                }
              };
              console.log('groupobj', obj);
              wx.onMenuShareAppMessage(obj);
              wx.onMenuShareTimeline(obj);
              wx.onMenuShareQQ(obj);
              wx.onMenuShareQZone(obj);
            });

          })
          .catch(err => {
            console.log(err);
          });
        // }

      },
      // goBack() {
      //   this.$router.replace({path: '/roomlist'});
      //   //replace替换原路由，作用是避免回退死循环
      // },
      xuanhuozhuan() {
        if (this.winKindCode == 99) {
          this.$router.push('/zhuanpan')

        }
        else {
          $('.mask').show();
          this.fenxShow = true;
          this.zhuanpanShow = false
          this.jieguoShow = false
          this.dengmiShow = false
          this.yaoqingma = false;
          this.beginShow = false
        }
      },
      quedingAnswer() {
        if (this.datiqueding) {
          this.jindu = false;
          this.right = false;
          this.wrong = false;
          var answerId = $('.answer .active  i').text();

          var moonId = (JSON.parse(sessionStorage.getItem('bobingInfo'))).moonId;
          var token = sessionStorage.getItem('token');
          var timuId = this.timuID;
          this.$axios({
            method: 'post',
            url: '/moon/memberRiddlesGuessing',
            responseType: 'json',
            data: {
              moonId: moonId,
              questionId: timuId,
              token: token,
              answerId: answerId
            }
          }).then(data => {
            if (data.data.res_data.riddlesStatus == 1) {
              this.right = true;
              this.wrong = false;
              this.songCoin = data.data.res_data.coin;
              // this.songCoinType = data.data.res_data.coinType;

              // this.zhi += this.songCoin;

              // if (this.bobingDetail.moonActivity.coinType == 0) {
              //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
              //   m.goldIngot += this.songCoin;
              //   sessionStorage.bobingDetail = JSON.stringify(m);
              // }
              // else if (this.bobingDetail.moonActivity.coinType == 1) {
              //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
              //   m.redPager += this.songCoin;
              //   sessionStorage.bobingDetail = JSON.stringify(m);
              // }


              if (this.songCoinType == 0) {
                this.songCoinType = "金元宝"
              }
              else {
                this.songCoinType = "红包"
              }
            }
            else {
              this.right = false;
              this.wrong = true;
            }
            this.datiqueding = false
          }).catch(err => {
            console.log(err)
          })

        }
        else {
          $('.mask').hide()
          // this.maskShow = false
        }
      },
      gainTime(index) {
        // if(this.coinType == 0){
        $('.mask').show();
        this.fenxShow = true
        this.zhuanpanShow = false
        this.jieguoShow = false
        this.dengmiShow = false
        this.beginShow = false
        this.yaoqingma = false;
        // }
        // if(this.coinType == 1){
        //
        //
        //   if(index == 0){
        //     $('.mask').show();
        //     this.fenxShow = false
        //     this.zhuanpanShow = true
        //     this.jieguoShow = false
        //     this.dengmiShow = false
        //   }
        //   else{
        //     window.location.href = 'http://wx.juyooo.com/?code=021laBqK12KNA50n2jnK1DifqK1laBq1&state=#/specials?relId=141'
        //   }
        // }
      },
      clearT() {
        $('.mask').hide();
        // this.maskShow = false
      },
      baojian() {
        this.$router.push('/participateList')
      },
      checkItem(index) {
        this.isActive = index;
        // if (index == 0){
        //   this.isActive = true;
        // }
      },
      clearDengmiWrap() {
        $('.mask').hide();
        // this.maskShow = false
      },
      againGame() {

        $('.mask').hide();

      },
      aboutUs() {
        this.$router.push('/aboutUs')
      },
      countDown(times) {
        var timer = null;
        var _this = this;
        times = times/1000;

        timer = setInterval(function () {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0;//时间默认值
          if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (day <= 9) day = '0' + day;
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          //
          _this.now = hour + "：" + minute + "：" + second;

          times--;
        }, 1000);
        if (times <= 0) {
          clearInterval(timer);
        }
      },
      goRule() {
        this.$router.push({path: '/rule', query: {ruleId: 2}})
      },
      // gopaihangbang() {
      //   this.$router.push('/paihangbang')
      // },
      zhuanpan() {
        // if (this.coinType == 0) {
        //   this.$router.push('/zhuanpan')
        // }
        // else {
        //   // return;
        // }
      },
      wangqi() {
        this.$router.push('/wangqi')
      },
      gamerule() {
        this.$router.push({path: '/rule', query: {ruleId: 2}})
      },
      myXiangRoom() {
        this.$router.push('/myXiangRoom')
      },
      myaward() {
        //我的奖品列表，参数
        this.$router.push({path: '/myNewaward', query: {orderType: 0}})
      },
      beginBobing() {


        //点击博饼请求到用户是否已经被同意
        //点击判断是不是新用户，如果是，弹出邀请码填写窗口

        //有没有权限

        if (this.isJoin == 1) {


          if(this.isOwners == 1){
            if (this.isOpen == 1) {
              // if (true) {

              // 控制不可以重复博
              // this.jinxingzhong = true




              // 机会大于等于1才可以博
              if (this.leftTime >= 1) {
                function audioAutoPlay() {
                  var musicEle0 = document.getElementById('touzi');
                  musicEle0.play();
                }
                audioAutoPlay();

                if (this.jinxingzhong == false) {
                  this.jinxingzhong = true

                  this.youdejihui = true
                  this.meidejihui1 = false
                  // this.meidejihui2 = false

                  this.$axios({
                    method: 'post',
                    url: '/moon/boCake',
                    responseType: 'json',
                    data: {
                      moonId: this.$route.query.roomId,
                      token: sessionStorage.getItem('token')
                    }
                  }).then(data => {

                    this.huodong = data.data.res_code;
                    // if (data.data.res_code == 0) {


                    var onOff = true
                    var _this = this;
                    this.winKindCode = data.data.res_data.winKindCode;
                    this.winKind = data.data.res_data.winKind;
                    this.winCoin = data.data.res_data.winCoin;
                    this.winImg = data.data.res_data.winImg;
                    this.winOfficial = data.data.res_data.winOfficial + ((data.data.res_data.prizeInfo)?"("+data.data.res_data.prizeInfo +")":"");

                    // this.winKindCode = 99;
                    // this.winKind = '二举';
                    // this.winCoin = "99";
                    // this.winThingImg = "https://jymall-test.oss-cn-beijing.aliyuncs.com/activity/20180904/4b5d6c92-dc5a-4839-a404-1e4882e90c8a.jpg"
                    // this.winImg = "https://jymall-test.oss-cn-beijing.aliyuncs.com/activity/20180904/4b5d6c92-dc5a-4839-a404-1e4882e90c8a.jpg";
                    // this.winOfficial = '1';


                    if (onOff) {
                      // this.bindAudio($('#touzi').get(0));
                      onOff = false;
                      var data = data;


                      // 点击开始，骰子开始摇动，摇动的动画开始
                      if ($("#styles")) {
                        $("head").append(
                          "<style id='styles'></style>"
                        );
                      }
                      var csshtml = "";
                      $.each($(".dicebox li"), function (i) {
                        var oldTop = $(".dicebox li").eq(i).position().top;
                        var oldLeft = $(".dicebox li").eq(i).position().left;
                        csshtml += "@keyframes alls" + i + " {" +
                          "0% {" +
                          "top: " + oldTop + "px;" +
                          "left: " + oldLeft + "px;" +
                          "}" +
                          "20% {" +
                          "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                          "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                          "}" +
                          "40% {" +
                          "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                          "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                          "}" +
                          "60% {" +
                          "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                          "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                          "}" +
                          "80% {" +
                          "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                          "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                          "}" +
                          "100% {" +
                          "top: " + oldTop + "px;" +
                          "left: " + oldLeft + "px;" +
                          "}" +
                          "}\n";

                        $("#styles").html(csshtml);
                        $(".dicebox li").eq(i).css({
                          'background': 'url("http://images.cheertea.com/1.gif") 0 0 no-repeat',
                          'background-size': '100% 100%',
                          'animation': "alls" + i + " .6s linear infinite"
                        });
                      });


                      // 获取到摇动的结果，1500的摇动后执行结果
                      clearTimeout(dicestimer);
                      var dicesArr = data.data.res_data.winningNum.split("");
                      // var dicesArr = "442244".split("");

                      var result = 1;
                      var dicestimer = setTimeout(function () {
                        $.each(dicesArr, function (i) {
                          // 根据拿到的结果渲染摇动结束后的骰子
                          $(".dicebox li").eq(i).css({
                            background: "url(" + 'http://images.cheertea.com/' + dicesArr[i] + ".png) 0 0 no-repeat",
                            backgroundSize: "100% 100%",
                            animation: "none"
                          });
                        });


                        // 1000之后判断中奖的将次和类型
                        clearTimeout(timerbox);
                        var timerbox = setTimeout(function () {
                          //判断是否中奖

                          $('.mask').show();
                          // this.maskShow = true
                          _this.jinxingzhong = false
                          // _this.tanchuang = 1;
                          _this.jieguoShow = true
                          _this.zhuanpanShow = false
                          _this.fenxShow = false
                          _this.dengmiShow = false
                          _this.beginShow = false
                          _this.yaoqingma = false;
                          // _this.zhi += _this.winCoin;
                          _this.leftTime -= 1;


                          // if (_this.bobingDetail.moonActivity.coinType == 0) {
                          //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                          //   m.goldIngot += _this.winCoin;
                          //   sessionStorage.bobingDetail = JSON.stringify(m);
                          // }
                          // else if (_this.bobingDetail.moonActivity.coinType == 1) {
                          //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                          //   m.redPager += _this.winCoin;
                          //   sessionStorage.bobingDetail = JSON.stringify(m);
                          // }


                          // $(function () {
                          if (_this.winKindCode == 5 || _this.winKindCode == 6 || _this.winKindCode == 7 || _this.winKindCode == 8 || _this.winKindCode == 9 || _this.winKindCode == 10) {

                            // alert('中奖了')

                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }

                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 0) {
                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }
                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 1) {
                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }
                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 2) {
                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }
                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 3) {
                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }
                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 4) {
                            $(function () {
                              // $('.zhuangyuan').css({
                              //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.shue').css({
                                'margin-top': ".8rem"
                              })
                              // if (_this.bobingDetail.moonActivity.coinType == 0) {
                              //   $('.jieguo_wrap').css({
                              //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                              //     backgroundSize: "100% 100%",
                              //   })
                              // }
                              // if (_this.bobingDetail.moonActivity.coinType == 1) {
                              $('.jieguo_wrap').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // }
                              $('.showmaskbox').css({
                                background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                backgroundSize: "100% 100%",
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })
                          }
                          if (_this.winKindCode == 99) {
                            $(function () {
                              $('.jieguo_wrap').css({
                                'background': "none"
                              })
                              // $('.zhuangyuan').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                              $('.showmaskbox').css({
                                'background': "none"
                              })
                              $('.shue').css({
                                'margin-top': "2rem"
                              })
                              // $('.kuang1').css({
                              //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong_zhuanpan.png") 0 0 no-repeat',
                              //   backgroundSize: "100% 100%",
                              // })
                            })

                          }
                          _this.bindAudio($('#putong').get(0));
                          onOff = true;
                        }, 500);
                      }, 1600);
                    }
                    // }
                    // else {
                    //   alert(data.data.res_info)
                    // }


                  }).catch(err => {
                    console.log(err)
                  })

                  var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                  m.num -= 1;
                  sessionStorage.bobingDetail = JSON.stringify(m);
                }
                else {
                  alert('请勿重复点击哦！')
                }
              }
              else if (this.leftTime == 0) {
                this.youdejihui = false
                // if (this.coinType == 0) {
                this.meidejihui1 = true
                // this.meidejihui2 = false
                // }
                // if (this.coinType == 1) {
                //   this.meidejihui1 = false
                //   this.meidejihui2 = true
                // }

                $('.mask').show();
                this.jieguoShow = true
                this.dengmiShow = false
                this.zhuanpanShow = false
                this.fenxShow = false
                this.beginShow = false
                this.yaoqingma = false;
                $(function () {
                  // $('.zhuangyuan').css({
                  //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong.png") 0 0 no-repeat',
                  //   backgroundSize: "100% 100%",
                  // })
                  $('.jieguo_wrap').css({
                    'background': "none"
                  })
                  $('.shue').css({
                    'margin-top': "2rem"
                  })
                  $('.showmaskbox').css({
                    'background': "none"
                  })
                })
              }
              else if (this.leftTime == null) {
                alert('本场博饼活动已经结束！')
              }

            }
            else if(this.isOpen == 2){
              alert('本场博饼活动尚未开始！')
            }
            else if(this.isOpen == 3){
              alert('本场博饼活动已经结束！')
            }
          }
          else if(this.isOwners == 0){

            if(this.status == 1){

              if (this.isOpen == 1) {
                // if (true) {

                // 控制不可以重复博
                // this.jinxingzhong = true




                // 机会大于等于1才可以博
                if (this.leftTime >= 1) {

                  function audioAutoPlay() {
                    var musicEle0 = document.getElementById('touzi');
                    musicEle0.play();
                  }
                  audioAutoPlay();

                  if (this.jinxingzhong == false) {
                    this.jinxingzhong = true

                    this.youdejihui = true
                    this.meidejihui1 = false
                    // this.meidejihui2 = false

                    this.$axios({
                      method: 'post',
                      url: '/moon/boCake',
                      responseType: 'json',
                      data: {
                        moonId: this.$route.query.roomId,
                        token: sessionStorage.getItem('token')
                      }
                    }).then(data => {

                      this.huodong = data.data.res_code;
                      // if (data.data.res_code == 0) {


                      var onOff = true
                      var _this = this;
                      this.winKindCode = data.data.res_data.winKindCode;
                      this.winKind = data.data.res_data.winKind;
                      this.winCoin = data.data.res_data.winCoin;
                      this.winImg = data.data.res_data.winImg;
                      this.winOfficial = data.data.res_data.winOfficial + ((data.data.res_data.prizeInfo)?"("+data.data.res_data.prizeInfo +")":"");

                      // this.winKindCode = 99;
                      // this.winKind = '二举';
                      // this.winCoin = "99";
                      // this.winThingImg = "https://jymall-test.oss-cn-beijing.aliyuncs.com/activity/20180904/4b5d6c92-dc5a-4839-a404-1e4882e90c8a.jpg"
                      // this.winImg = "https://jymall-test.oss-cn-beijing.aliyuncs.com/activity/20180904/4b5d6c92-dc5a-4839-a404-1e4882e90c8a.jpg";
                      // this.winOfficial = '1';


                      if (onOff) {
                        // this.bindAudio($('#touzi').get(0));
                        onOff = false;
                        var data = data;


                        // 点击开始，骰子开始摇动，摇动的动画开始
                        if ($("#styles")) {
                          $("head").append(
                            "<style id='styles'></style>"
                          );
                        }
                        var csshtml = "";
                        $.each($(".dicebox li"), function (i) {
                          var oldTop = $(".dicebox li").eq(i).position().top;
                          var oldLeft = $(".dicebox li").eq(i).position().left;
                          csshtml += "@keyframes alls" + i + " {" +
                            "0% {" +
                            "top: " + oldTop + "px;" +
                            "left: " + oldLeft + "px;" +
                            "}" +
                            "20% {" +
                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                            "}" +
                            "40% {" +
                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                            "}" +
                            "60% {" +
                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                            "}" +
                            "80% {" +
                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 14) + "px;" +
                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 20) + "px;" +
                            "}" +
                            "100% {" +
                            "top: " + oldTop + "px;" +
                            "left: " + oldLeft + "px;" +
                            "}" +
                            "}\n";

                          $("#styles").html(csshtml);
                          $(".dicebox li").eq(i).css({
                            'background': 'url("http://images.cheertea.com/1.gif") 0 0 no-repeat',
                            'background-size': '100% 100%',
                            'animation': "alls" + i + " .6s linear infinite"
                          });
                        });


                        // 获取到摇动的结果，1500的摇动后执行结果
                        clearTimeout(dicestimer);
                        var dicesArr = data.data.res_data.winningNum.split("");
                        // var dicesArr = "442244".split("");

                        var result = 1;
                        var dicestimer = setTimeout(function () {
                          $.each(dicesArr, function (i) {
                            // 根据拿到的结果渲染摇动结束后的骰子
                            $(".dicebox li").eq(i).css({
                              background: "url(" + 'http://images.cheertea.com/' + dicesArr[i] + ".png) 0 0 no-repeat",
                              backgroundSize: "100% 100%",
                              animation: "none"
                            });
                          });


                          // 1000之后判断中奖的将次和类型
                          clearTimeout(timerbox);
                          var timerbox = setTimeout(function () {
                            //判断是否中奖

                            $('.mask').show();
                            // this.maskShow = true
                            _this.jinxingzhong = false
                            // _this.tanchuang = 1;
                            _this.jieguoShow = true
                            _this.zhuanpanShow = false
                            _this.fenxShow = false
                            _this.dengmiShow = false
                            _this.beginShow = false
                            _this.yaoqingma = false;
                            // _this.zhi += _this.winCoin;
                            _this.leftTime -= 1;


                            // if (_this.bobingDetail.moonActivity.coinType == 0) {
                            //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                            //   m.goldIngot += _this.winCoin;
                            //   sessionStorage.bobingDetail = JSON.stringify(m);
                            // }
                            // else if (_this.bobingDetail.moonActivity.coinType == 1) {
                            //   var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                            //   m.redPager += _this.winCoin;
                            //   sessionStorage.bobingDetail = JSON.stringify(m);
                            // }


                            // $(function () {
                            if (_this.winKindCode == 5 || _this.winKindCode == 6 || _this.winKindCode == 7 || _this.winKindCode == 8 || _this.winKindCode == 9 || _this.winKindCode == 10) {

                              // alert('中奖了')

                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }

                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 0) {
                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }
                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 1) {
                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }
                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 2) {
                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }
                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 3) {
                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }
                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 4) {
                              $(function () {
                                // $('.zhuangyuan').css({
                                //   background: 'url("' + _this.winImg + '") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.shue').css({
                                  'margin-top': ".8rem"
                                })
                                // if (_this.bobingDetail.moonActivity.coinType == 0) {
                                //   $('.jieguo_wrap').css({
                                //     background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/yuanbao.gif") 0 0 no-repeat',
                                //     backgroundSize: "100% 100%",
                                //   })
                                // }
                                // if (_this.bobingDetail.moonActivity.coinType == 1) {
                                $('.jieguo_wrap').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/hongbao_gif.gif") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // }
                                $('.showmaskbox').css({
                                  background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/caidai.png") 0 0 no-repeat',
                                  backgroundSize: "100% 100%",
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/kuang.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })
                            }
                            if (_this.winKindCode == 99) {
                              $(function () {
                                $('.jieguo_wrap').css({
                                  'background': "none"
                                })
                                // $('.zhuangyuan').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                                $('.showmaskbox').css({
                                  'background': "none"
                                })
                                $('.shue').css({
                                  'margin-top': "2rem"
                                })
                                // $('.kuang1').css({
                                //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong_zhuanpan.png") 0 0 no-repeat',
                                //   backgroundSize: "100% 100%",
                                // })
                              })

                            }
                            _this.bindAudio($('#putong').get(0));
                            onOff = true;
                          }, 500);
                        }, 1600);
                      }
                      // }
                      // else {
                      //   alert(data.data.res_info)
                      // }


                    }).catch(err => {
                      console.log(err)
                    })

                    var m = JSON.parse(sessionStorage.getItem('bobingDetail'));
                    m.num -= 1;
                    sessionStorage.bobingDetail = JSON.stringify(m);
                  }
                  else {
                    alert('请勿重复点击哦！')
                  }
                }
                else if (this.leftTime == 0) {
                  this.youdejihui = false
                  // if (this.coinType == 0) {
                  this.meidejihui1 = true
                  // this.meidejihui2 = false
                  // }
                  // if (this.coinType == 1) {
                  //   this.meidejihui1 = false
                  //   this.meidejihui2 = true
                  // }

                  $('.mask').show();
                  this.jieguoShow = true
                  this.dengmiShow = false
                  this.zhuanpanShow = false
                  this.fenxShow = false
                  this.beginShow = false
                  this.yaoqingma = false;
                  $(function () {
                    // $('.zhuangyuan').css({
                    //   background: 'url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/weizhong.png") 0 0 no-repeat',
                    //   backgroundSize: "100% 100%",
                    // })
                    $('.jieguo_wrap').css({
                      'background': "none"
                    })
                    $('.shue').css({
                      'margin-top': "2rem"
                    })
                    $('.showmaskbox').css({
                      'background': "none"
                    })
                  })
                }
                else if (this.leftTime == null) {
                  alert('本场博饼活动已经结束！')
                }

              }
              else if(this.isOpen == 2){
                alert('本场博饼活动尚未开始！')
              }
              else if(this.isOpen == 3){
                alert('本场博饼活动已经结束！')
              }
            }
            else if(this.status == 2){
              alert("您被拒绝加入房间")
            }
            else if(this.status == 0){
              alert("请等待博主审核")
            }
          }







        }
        else {
          $('.mask').show();
          this.yaoqingma = true
          this.zhuanpanShow = false
          this.jieguoShow = false
          this.dengmiShow = false
          this.beginShow = false
          this.fenxShow = false
        }


      },
      bindAudio(item) {

        item.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
          item.play();
        }, false);

      },
    }
  }
</script>

<style scoped lang="scss">
  .active {
    background-color: #ce4514;
  }

  #bobing_container {
    width: 750px;
    background-color: #ad1e19;
    .main {
      width: 750px;
      height: 1141px;
      color: #ffffff;
      background: url("../assets/img/new_bg.png") 0 0 no-repeat;
      background-size: cover;
      /*.zhi {*/
      /*text-align: center;*/
      /*position: absolute;*/
      /*left: 110px;*/
      /*top: 48px;*/
      /*width: 210px;*/
      /*letter-spacing: 2px;*/
      /*font-size: 33px;*/
      /*font-weight: bold;*/
      /*}*/
      .baojian {
        position: absolute;
        top: 190px;
        left: 644px;
        width: 100px;
        height: 112px;
      }
      .myXiangRoom {
        position: absolute;
        top: 187px;
        left: 644px;
        width: 95px;
        height: 124px;
      }
      .game_rule {
        position: absolute;
        top: 190px;
        left: 12px;
        width: 100px;
        height: 112px;
      }
      .begin_bobing {
        position: absolute;
        top: 740px;
        left: 279px;
        width: 216px;
        height: 210px;
      }
      .myaward {
        position: absolute;
        top: 354px;
        left: 644px;
        width: 100px;
        height: 112px;
      }
      .dianpu {
        position: absolute;
        top: 500px;
        left: 333.5px;
        width: 83px;
        height: 144px;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .about_us {
        position: absolute;
        top: 350px;
        left: 8px;
        width: 100px;
        height: 112px;
      }
      .zhuanpan {
        position: absolute;
        top: 520px;
        left: 640px;
        width: 104px;
        height: 115px;
      }
      .gainTime {
        position: absolute;
        top: 545px;
        left: 620px;
        width: 130px;
        height: 125px;
      }
      .shengyu {
        position: absolute;
        top: 999px;
        left: 326px;
        width: 150px;
        height: 40px;
        letter-spacing: 2px;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        color: #ffcc00;
      }
      .huodongshijian {
        position: absolute;
        top: 15.2rem;
        text-align: center;
        color: #ce4514;
        margin: 0 auto;
        left: 0;
        right: 0;
      }
    }
    .daojishi {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 74px;
      width: 750px;
      height: 50px;
      z-index: 99;
      text-align: center;
      font-size: 28px;
      letter-spacing: 3px;
      color: #ffcc00;
    }
    .vip_banner {
      width: 750px;
      height: 230px;
      /*background: url("../assets/img/vip.png") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .gift_banner {
      width: 750px;
      height: 366px;
      /*background: url("../assets/img/gift_banner.png") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
      .git_top {
        width: 750px;
        height: 90px;
        background: url("../assets/img/gitbanner_text.png") 0 0 no-repeat;
        background-size: cover;
      }
      .scroll-wrap {
        height: 220px;
        overflow: hidden;
        .inner-wrap {
          width: 3840px;
          div {
            float: left;
            position: relative;
            width: 1920px;
            height: 220px;
            img {
              width: 240px;
              height: 220px;
            }
          }
        }

      }
    }
    .bottom_banner {
      width: 750px;
      height: 312px;
      /*background: url("../assets/img/bottom_banner.png") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .bottom_banner1 {
      width: 750px;
      height: 312px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      /*background: url("../assets/img/bottom_banner.png") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
    }
    .home_bottom {
      text-align: center;
      color: #ffcfc6;
      background-color: #b31f03;
      padding-bottom: 20px;
      p {
        margin: 0;
        font-size: 20px;
      }
    }

  }

  .bobing #hongbaoE {
    position: absolute;
    top: 45px;
    left: 45px;
    background-color: chartreuse;
  }

  .bobing #jinbiE {
    position: absolute;
    top: 45px;
    right: 45px;
    background-color: chartreuse;
  }

  .bobing #paihangbang {
    position: absolute;
    top: 210px;
    left: 45px;
    background-color: chartreuse;
    border-radius: 20px;
  }

  .bobing #wangqi {
    position: absolute;
    top: 210px;
    right: 45px;
    background-color: chartreuse;
    border-radius: 50px;
  }

  .bobing #gamerule {
    position: absolute;
    top: 350px;
    left: 45px;
    background-color: chartreuse;
    border-radius: 50px;
  }

  .bobing #myXiangRoom {
    position: absolute;
    top: 350px;
    right: 45px;
    background-color: chartreuse;
    border-radius: 50px;
  }

  .bobing #aboutus {
    position: absolute;
    top: 490px;
    left: 45px;
    background-color: chartreuse;
    border-radius: 50px;
  }

  .bobing #zhuanpan {
    position: absolute;
    top: 850px;
    right: 45px;
    background-color: chartreuse;
    border-radius: 50px;
  }

  .bobing #gong {
    position: absolute;
    top: 1150px;
    text-align: center;
    margin: auto;
    left: 0;
    width: 150px;
    right: 0;
    background-color: chartreuse;
    border-radius: 50px;
  }

  #gong p {
    margin: 0;
  }

  .bobing #gametimeout {
    position: absolute;
    margin: auto;
    top: 1200px;
    left: 0;
    text-align: center;
    /*width: 200px;*/
    right: 0;
    /*background-color: chartreuse;*/
    border-radius: 50px;
  }

  .dicebox {
    position: absolute;
    left: 170px;
    width: 5.46875rem;
    height: 3.75rem;
    top: 375px;
    list-style-type: none;
    padding: 0;
  }

  .dicebox li {
    position: absolute;
    width: 0.78125rem;
    height: 0.875rem;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .dicebox li:nth-child(1) {
    top: 1.5625rem;
    left: 1.40625rem;
    /*background: url("http://images.cheertea.com/1.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
  }

  .dicebox li:nth-child(2) {
    top: 2.5rem;
    left: 1.640625rem;
    /*background: url("http://images.cheertea.com/2.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
  }

  .dicebox li:nth-child(3) {
    top: 1.5625rem;
    left: 2.34375rem;
    /*background: url("http://images.cheertea.com/3.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
  }

  .dicebox li:nth-child(4) {
    top: 2.5rem;
    left: 2.578125rem;
    /*background: url("http://images.cheertea.com/4.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
  }

  .dicebox li:nth-child(5) {
    top: 1.5625rem;
    left: 3.28125rem;
    /*background: url("http://images.cheertea.com/5.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
  }

  .dicebox li:nth-child(6) {
    position: absolute;
    top: 2.5rem;
    left: 3.515625rem;
    /*background: url("http://images.cheertea.com/6.png") 0 0 no-repeat;*/
    /*-o-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
    -webkit-animation: addli 1s linear infinite;
    animation: addli 1s linear infinite;
  }

  .gamestartbetting {
    position: absolute;
    left: 50%;
    bottom: 17%;
    width: 5.28125rem;
    height: 0.890625rem;
    margin-left: -2.640625rem;
    background: url("http://images.cheertea.com/moonroom_btn.png") 0 0 no-repeat;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
  }

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
          background: url("../assets/img/kongzhuangyuan_logo.png") 0 0 no-repeat;
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
          background: url("../assets/img/meiyouhongjiang.png") 0 0 no-repeat;
          background-size: 100% 100%;
          text-align: center;
          .zhuhe {
            margin-top: 14px;
            font-size: 40px;
            font-weight: bold;
            color: #ffffff;
          }
          .jiangxiang {
            margin-top: 60px;
            letter-spacing: 3px;
            font-size: 38px;
            font-weight: bold;
            color: #ffcc00;
          }
          .shue {
            margin-top: 10px;
            font-size: 27px;
            color: #ffffff;
            letter-spacing: 2px;
            .winThingImg {
              position: absolute;
              width: 300px;
              height: 120px;
              top: 190px;
              left: 0;
              right: 0;
              margin: 0 auto;
              border-radius: 15px;
            }
            .down {
              span {
                color: #ffcc00;
              }
            }
            .up {
              /*padding: 0 ;*/
              width: 80%;
              margin-left: 10%;
            }
            .up1 {
              padding: .1rem;
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
            left: 195px;
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
          background: url("../assets/img/new_meijihui.png") 0 0 no-repeat;
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
      background: url("../assets/img/new_fenx.png") 0 0 no-repeat;
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
    .yaoqingma {
      position: absolute;
      left: 0;
      top: 300px;
      width: 750px;
      height: 560px;
      .yaoqingma_inner {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 531px;
        height: 536px;
        background: url("../assets/img/new_yaoqing.png") 0 0 no-repeat;
        background-size: 100% 100%;
        .input_kuang {
          position: absolute;
          left: 150px;
          top: 170px;
          height: 160px;
          width: 420px;
          display: flex;
          align-content: space-between;
          flex-wrap: wrap;
          input {
            display: block;
            font-size: 24px;
            height: 55px;
            width: 360px;
            border: none;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0;
          }
          input {
            border: none;
            outline: none;
          }
        }
        .back111 {
          position: absolute;
          right: 0;
          top: 0;
          width: 55px;
          height: 55px;
        }
        .enter {
          position: absolute;
          right: 0;
          left: 0;
          margin: 0 auto;
          top: 400px;
          width: 300px;
          height: 90px;
        }
      }
    }
    .beginAlert {
      position: absolute;
      left: 59px;
      top: 300px;
      width: 632px;
      height: 540px;
      background: url("../assets/img/alll.png") 0 0 no-repeat;
      background-size: 100% 100%;
      p {
        text-align: center;
        color: #fff;
        padding-top: 200px;
      }
      .knowle {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 360px;
        width: 250px;
        height: 85px;
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
      background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/zhuanpan0.png") 0 0 no-repeat;
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
      .cha {
        position: absolute;
        right: 0;
        top: 0;
        width: 65px;
        height: 65px;
      }
      .buy {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 180px;
        width: 288px;
        height: 83px;
      }
    }
  }

  .showmaskbox .title {
    font-size: 35px !important;
    font-weight: bold;
  }

  .showmaskbox .answer ul {
    padding: 0;
  }

  .showmaskbox .answer ul li {
    padding: .1rem;
    width: 45%;
    display: inline-block;
  }

  .moonclose {
    position: absolute;
    width: 43px;
    height: 43px;
    top: 435px;
    right: 110px;
    background: url('http://images.cheertea.com/moonclose.png') 0 0 no-repeat;
    background-size: 100% 100%;
  }
</style>
