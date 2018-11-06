<template>
  <div id="orderDetail_container">
    <newAddress v-show="xindizhi" @saveClear="Save"></newAddress>
    <div class="address" @click="newAddress" v-show="meidizhi">+ 添加地址 <span> > </span></div>
    <!--<div class="liucheng" v-if="youwuliu">-->
    <!--<div class="liucheng_text">配货中</div>-->
    <!--</div>-->
    <div class="wuliuxinxi" v-if="youwuliu">
      <div class="address_info">
        <p>物流信息</p>
        <p>{{wuliuxinxi?wuliuxinxi:"暂无物流信息！"}}</p>
        <p>{{wuliushijian?wuliushijian:""}}</p>
      </div>
      <div class="address_back"><img src="../assets/img/goback.png" alt=""></div>
    </div>
    <div class="geceng"></div>
    <!--<div class="geceng" id="gecengwuliu" v-if="youwuliu"></div>-->
    <div class="has_address" @click="newAddress" v-if="!meidizhi">
      <div class="address_logo"><img src="../assets/img/add_logo.png" alt=""></div>
      <div class="address_info">
        <p>收货人：{{name}}&nbsp&nbsp&nbsp&nbsp<span>{{mobile}}</span></p>
        <p>收货地址：{{address}}</p>
      </div>
      <div class="address_back"><img v-if="!youwuliu" src="../assets/img/goback.png" alt=""></div>
    </div>
    <div class="geceng"></div>


    <!--<div v-for="(item,index) in shoppList" v-if="shoppList[index].orderStatus!=-9">-->
    <!--<section class="goods-simple">-->
    <!--<div class="store-info">-->
    <!--<span class="left_logo"></span>-->
    <!--<span>{{item.comName}}</span>-->
    <!--<p><img src="../assets/img/goback.png" alt=""></p>-->
    <!--</div>-->
    <!--<ul v-if="item.goodsList" class="goods-show">-->
    <!--<li v-for="(value,key) in item.goodsList">-->
    <!--<img-->
    <!--src="http://img.juyooo.com/goods/20180615/38b10798-23cf-424a-9435-6a0f23effde7.jpg?x-oss-process=image/resize,w_375"-->
    <!--class="store-logo" @click="details(index,key)">-->
    <!--<span >-->
    <!--<h2>{{value.goodsName}}</h2>-->
    <!--<p>规格：{{value.productSpec}}</p>-->
    <!--</span>-->
    <!--<aside >-->
    <!--&lt;!&ndash;<i>￥{{value.price}}</i>&ndash;&gt;-->
    <!--<i class="pri-line">￥{{value.goodsPrice}}</i>-->
    <!--<i>×{{value.buyCount}}</i>-->
    <!--</aside>-->
    <!--</li>-->
    <!--</ul>-->
    <!--<div v-else class="goods-show">-->
    <!--<li >-->
    <!--<img-->
    <!--src="http://img.juyooo.com/goods/20180615/38b10798-23cf-424a-9435-6a0f23effde7.jpg?x-oss-process=image/resize,w_375"-->
    <!--class="store-logo">-->
    <!--<span>-->
    <!--<h2>{{item.exchangeName}}</h2>-->
    <!--<p>规格：{{item.specs}}</p>-->
    <!--</span>-->
    <!--<aside>-->
    <!--<i>{{item.exchangeCoin}}金币</i>-->
    <!--<i class="pri-line">￥{{item.mktPrice}}</i>-->
    <!--<i>数量：{{item.changeProductNum}}</i>-->
    <!--</aside>-->
    <!--</li>-->
    <!--</div>-->
    <!--</section>-->
    <!--</div>-->


    <div>
      <section class="goods-simple">
        <div class="store-info">
          <span class="left_logo"></span>
          <span>{{data.storeName}}</span>
          <p><img src="../assets/img/goback.png" class="store-logo" alt=""></p>
        </div>
        <ul class="goods-show">
          <li>
            <img :src="DetailImg  | filterss(3)" class="store-logo">
            <span>
                <h2>{{goodsName}}</h2>
                <p>规格：{{productSpec}}</p>
              </span>
            <aside>
              <!--<i>￥{{price}}</i>-->
              <i class="pri-line">￥{{goodsPrice}}</i>
              <i>×{{buyCount}}</i>
            </aside>
          </li>
        </ul>
      </section>
    </div>


    <div class="jin">
      商品金额
      <span class="heng-line">   ¥{{goodsPrice}}</span>
    </div>
    <!--<div class="yunjifen">-->
    <!--云积分-->
    <!--<span> - ¥0.00</span>-->
    <!--</div>-->
    <div class="yunfei">
      运费
      <span>  ¥{{shipAmount}}</span>
    </div>
    <!--<div class="dikou">-->
    <!--抵扣-->
    <!--<span><img src="../assets/img/yuan.png" alt="">{{dikou}}</span>-->
    <!--</div>-->
    <div class="geceng"></div>
    <div class="dingdaninfo" v-if="youwuliu">
      <div class="dingdanhao">
        <div>订单号</div>
        <div>{{dingdanhao}}</div>
      </div>
      <div class="chuangjianshijian">
        <div>创建时间</div>
        <div>{{chuangjianshijian}}</div>
      </div>
      <div class="chengjiaoshijian" v-if="chengjiaoshijian">
        <div>完成时间</div>
        <div>{{chengjiaoshijian}}</div>
      </div>
    </div>

    <div class="querenshouhuo" v-show="querenshouhuo" @click="querenshouhuoClick">
      <span>确认收货</span>
    </div>

    <div class="bottom" v-if="!youwuliu">
      <p class="one">合计金额</p>
      <div class="three">
        <!--<p class="dikou_bottom">抵扣： {{dikou}} <img src="../assets/img/yuan.png" alt=""></p>-->
        <p class="yunfei_bottom">运费： <span>¥{{shipAmount}}</span></p>
      </div>
      <p class="two" @click="jiesuan">结算</p>
    </div>
  </div>
</template>
<script>
  import newAddress from './newAddress'

  export default {
    name: 'orderDetail',
    data() {
      return {
        querenshouhuo:false,
        shoppList: [],
        xindizhi: false,
        meidizhi: true,
        youwuliu: false,
        name: '',
        wuliuxinxi:'',
        mobile: '',
        address: '',
        data: '',
        DetailImg: '',
        goodsName: '',
        productSpec: '',
        // price:'',
        goodsPrice: '',
        buyCount: '',
        shipAmount: '',
        dikou: '',
        addrID: '',
        chuangjianshijian: '',
        chengjiaoshijian: '',
        dingdanhao: '',
        wuliushijian:''
      }
    },
    mounted() {

      let s = document.createElement("script");
      s.type = 'text/javascript';
      s.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
      document.body.appendChild(s);



      if(this.$route.query.statueOrder == 6) {
        this.querenshouhuo = true
      }
      else{
        this.querenshouhuo = false
      }


      // var orderId = this.$route.query.orderId;
      // var token = sessionStorage.getItem('token');
      // this.$axios({
      //   method: 'get',
      //   url: '/moon/orderDetails' + '?orderId=' + orderId + '&token=' + token,
      //   responseType: 'json',
      //   // data: {
      //   //
      //   // }
      // }).then(data => {
      //   this.data = data.data.res_data;
      //   this.DetailImg = this.data.orderItemsList[0].goodsImage
      //   this.goodsName = this.data.orderItemsList[0].goodsName
      //   this.productSpec = this.data.orderItemsList[0].productSpec
      //   // this.price =this.data.orderItemsList[0].price
      //   this.goodsPrice = this.data.orderItemsList[0].goodsPrice
      //   this.buyCount = this.data.orderItemsList[0].buyCount
      //   this.shipAmount = this.data.order.shipAmount
      //   if (this.data.order.shipAddress) {
      //     this.meidizhi = false
      //     this.xindizhi = false
      //     this.name = this.data.order.shipName
      //     this.mobile = this.data.order.shipMobile
      //     this.address = this.data.order.shipAddress
      //
      //
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })

      // if (window.history && window.history.pushState) {
      //   history.pushState(null, null, document.URL);
      //   window.addEventListener('popstate', this.goBack, false);
      // }


      if (this.$route.query.youwuliu) {
        this.youwuliu = this.$route.query.youwuliu;
        this.meidizhi = false
        this.xindizhi = false
        // this.name = '师胜利'
        // this.mobile = '17625612527'
        // this.address = '厦门市湖里区哈哈哈哈哈哈'

        // if (JSON.parse(sessionStorage.getItem('bobingDetail')).moonActivity.coinType == 0) {
        //   this.dikou = JSON.parse(sessionStorage.getItem('bobingDetail')).goldIngot
        // }
        // else if (JSON.parse(sessionStorage.getItem('bobingDetail')).moonActivity.coinType == 1) {
        //   this.dikou = JSON.parse(sessionStorage.getItem('bobingDetail')).redPager
        // }


        var orderId = this.$route.query.orderId;
        var token = sessionStorage.getItem('token');


        this.$axios({
          method: 'POST',
          url: '/order/LogisticsInfo',
          responseType: 'json',
          data: {
            orderId: orderId,
            token: token,
            type: 8
          }
        }).then(data => {

          if(data.data.res_code == 0){
            this.wuliuxinxi = data.data.res_data.logiInfo.list[0].status
            this.wuliushijian = data.data.res_data.logiInfo.list[0].time
          }
          else{
            this.wuliuxinxi = null
            this.wuliushijian = null
          }

        }).catch(err => {
          console.log(err)
        })


        this.$axios({
          method: 'get',
          url: '/moon/orderDetails' + '?orderId=' + orderId + '&token=' + token,
          responseType: 'json'
        }).then(data => {
          this.data = data.data.res_data;
          this.DetailImg = this.data.orderItemsList[0].goodsImage
          this.goodsName = this.data.orderItemsList[0].goodsName
          this.productSpec = this.data.orderItemsList[0].productSpec
          // this.price =this.data.orderItemsList[0].price
          this.goodsPrice = this.data.orderItemsList[0].goodsPrice
          this.buyCount = this.data.orderItemsList[0].buyCount
          this.shipAmount = this.data.order.shipAmount
          if (this.data.order.shipAddress) {
            this.meidizhi = false
            this.xindizhi = false
            this.name = this.data.order.shipName
            this.mobile = this.data.order.shipMobile
            this.address = this.data.order.shipAddress
            this.dingdanhao = this.data.order.orderSn

            function formatDateTime(inputTime) {
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

            if (this.data.order.createTime) {
              this.chuangjianshijian = formatDateTime(this.data.order.createTime)
            }
            else {
              this.chuangjianshijian = null
            }

            if (this.data.order.completeTime) {
              this.chengjiaoshijian = formatDateTime(this.data.order.completeTime)
            }
            else {
              this.chengjiaoshijian = null
            }


          }
        }).catch(err => {
          console.log(err)
        })
      }
      else {

        // if (JSON.parse(sessionStorage.getItem('bobingDetail')).moonActivity.coinType == 0) {
        //   this.dikou = JSON.parse(sessionStorage.getItem('bobingDetail')).goldIngot
        // }
        // else if (JSON.parse(sessionStorage.getItem('bobingDetail')).moonActivity.coinType == 1) {
        //   this.dikou = JSON.parse(sessionStorage.getItem('bobingDetail')).redPager
        // }

        var orderId = this.$route.query.orderId;
        var token = sessionStorage.getItem('token');
        this.$axios({
          method: 'post',
          url: '/moon/orderCheckout',
          responseType: 'json',
          data: {
            orderId: orderId,
            token: token
          }
        }).then(data => {
          this.data = data.data.res_data;
          this.DetailImg = this.data.orderItemsList[0].goodsImage
          this.goodsName = this.data.orderItemsList[0].goodsName
          this.productSpec = this.data.orderItemsList[0].productSpec
          // this.price =this.data.orderItemsList[0].price
          this.goodsPrice = this.data.orderItemsList[0].goodsPrice
          this.buyCount = this.data.orderItemsList[0].buyCount
          this.shipAmount = this.data.order.shipAmount
          if (this.data.memberAddressList.length > 0) {
            this.meidizhi = false
            this.xindizhi = false
            this.name = this.data.memberAddressList[0].name
            this.mobile = this.data.memberAddressList[0].mobile
            this.address = this.data.memberAddressList[0].provinceName + this.data.memberAddressList[0].cityName + this.data.memberAddressList[0].districtName + this.data.memberAddressList[0].addressDetail
            this.addrID = this.data.memberAddressList[0].addrId


            // this.$axios({
            //   method: 'post',
            //   url: '/moon/computeOrderFreight',
            //   responseType: 'json',
            //   data: {
            //     memberAddressId: this.addrID,
            //     orderId: orderId,
            //     token: token
            //   }
            // }).then(data => {
            //   this.shipAmount = data.data.res_data.shipAmount
            // }).catch(err => {
            //   console.log(err)
            // })

          }
          else {
            this.meidizhi = true
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.goBack, false);
    },
    methods: {
      querenshouhuoClick(){
        var orderId = this.$route.query.orderId;
        var token = sessionStorage.getItem('token');


        this.$axios({
          method: 'POST',
          url: '/moon/orderRog',
          responseType: 'json',
          data: {
            orderId: orderId,
            token: token
          }
        }).then(data => {

          if(data.data.res_code == 0){
            alert('您已成功收货，谢谢')
            this.querenshouhuo = false
          }


        }).catch(err => {
          console.log(err)
        })

      },
      newAddress() {
        if (this.youwuliu == false) {
          this.xindizhi = true
        }
      },
      Save(name, mobile, address) {
        this.xindizhi = false
        this.name = name
        this.mobile = mobile
        this.address = address
        this.meidizhi = false
        window.location.reload()
      },
      jiesuan() {
        // this.shipAmount = 8
        if (this.address == null || this.address == '' || this.address == undefined) {
          // alert('请填写收货地址')
        }
        else {
          // alert("调用领取接口")

          var orderId = this.$route.query.orderId;
          var token = sessionStorage.getItem('token');
          var memberAddressId = this.addrID
          this.$axios({
            method: 'post',
            url: 'moon/orderReceive',
            responseType: 'json',
            data: {
              orderId: orderId,
              token: token,
              memberAddressId: memberAddressId
            }
          }).then(data => {

            // alert('领取接口调用成功，查询到该订单运费是'+data.data.res_data.orderAmount)

            if (data.data.res_data.orderAmount == 0){

              if (data.data.res_code == 0) {
                this.$router.push({path: '/orderDetail', query: {youwuliu: true, orderId: this.$route.query.orderId}})
                window.location.reload()
              }
            }
            else{
              // 运费  支付
              // alert('领取接口成功调用，如果运费不为0，调用支付接口')
              var orderId = this.$route.query.orderId;
              var token = sessionStorage.getItem('token');
              this.$axios({
                method: 'post',
                url: '/pay/activityOrderPay',
                responseType: 'json',
                data: {
                  orderId: orderId,
                  payType: 1,
                  reqType: 0,
                  token: token
                }
              }).then(data => {
                if (data.data.res_code == 0) {
                  var datas = data.data.res_data;
                  var appId = datas.appid;
                  var nonceStr = datas.noncestr;
                  var paySign = datas.sign;
                  var packages = datas.package;
                  var timeStamp = datas.timestamp;
                  var signType = 'MD5';
                  callpay();
                  let that = this;

                  function onBridgeReady() {
                    WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                        "appId": appId, //公众号名称，由商户传入
                        "paySign": paySign, //微信签名
                        "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                        "nonceStr": nonceStr, //随机串
                        "package": packages, //预支付交易会话标识
                        "signType": signType //微信签名方式
                      },
                      function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                          // alert('支付接口调用成功，走到此处，应触发支付状态改变')


                          that.$router.push({
                            path: '/orderDetail',
                            query: {youwuliu: true, orderId: that.$route.query.orderId}
                          })
                          window.location.reload()


                        }
                        else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                          alert('支付取消');
                        }
                        else if (res.err_msg == "get_brand_wcpay_request:fail") {
                          alert('支付失败');
                          that.$router.go(-1);
                        }
                        //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                      }
                    );
                  }

                  function callpay() {
                    if (typeof WeixinJSBridge == "undefined") {
                      if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                      } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                      }
                    } else {
                      onBridgeReady();
                    }
                  }
                }
                else {
                  alert("统一下单失败");
                }
              }).catch(err => {
                console.log(err)
              })
            }

          }).catch(err => {
            console.log(err)
          })
        }
      },
      goBack() {
        this.$router.replace({path: '/myaward'});
        //replace替换原路由，作用是避免回退死循环
      }
    },
    components: {
      newAddress: newAddress
    }
  }
</script>
<style scoped lang="scss">
  $mainCol: #333333;
  $darkCol1b: #1b1b1b;
  $leCole: #eeeeee;
  $leCol9: #999999;
  $leCol6: #666666;
  $leColfa: #fafafa;
  $redCol: #f22d07;
  $bgWhite: #ffffff;
  $bodyCol: #f5f5f5;
  $topHeight: 1.17rem;
  #orderDetail_container {
    width: 750px;
    height: 1334px;
    background-color: #ffffff;
    .address {
      position: relative;
      text-align: center;
      color: red;
      padding: 78px 20px;
      font-size: 28px;
      span {
        float: right;
      }
    }
    .liucheng {
      width: 750px;
      position: relative;
      height: 160px;
      background: url("../assets/img/wuliu.png") 0 0 no-repeat;
      background-size: cover;
      .liucheng_text {
        position: absolute;
        color: white;
        left: 42px;
        top: 64px;
      }
    }
    .wuliuxinxi {
      position: relative;
      padding: 20px 22.5px;
      display: flex;
      justify-content: space-between;
      /*div{*/
      /*display: inline-block;*/
      /*}*/
      .address_logo {
        width: 25px;
        height: 120px;
        img {
          display: inline-block;
          margin-top: 52px;
          width: 25px;
          height: 32px;
        }
      }
      .address_info {
        p {
          margin: 5px 0;
        }
        p:nth-child(1) {
          font-weight: bold;
          font-size: 24px;
        }
        p:nth-child(2) {
          color: #009900;
          font-size: 24px;
          margin-left: -10px;
        }
        p:nth-child(3) {
          font-size: 20px;
          color: #999999;
        }
      }
      .address_back {
        width: 14px;
        height: 120px;
        img {
          display: inline-block;
          margin-top: 52px;
          width: 14px;
          height: 24px;
        }
      }
    }
    .has_address {
      position: relative;
      padding: 6px 22.5px;
      display: flex;
      justify-content: space-between;
      /*div{*/
      /*display: inline-block;*/
      /*}*/
      .address_logo {
        width: 25px;
        height: 120px;
        img {
          display: inline-block;
          margin-top: 52px;
          width: 25px;
          height: 32px;
        }
      }
      .address_info {
        margin-left: -80px;
        width: 560px;
      }
      .address_back {
        width: 14px;
        height: 120px;
        img {
          display: inline-block;
          margin-top: 52px;
          width: 14px;
          height: 24px;
        }
      }
    }
    .geceng {
      height: 20px;
      background-color: #f5f5f5;
    }
    #gecengwuliu {
      height: 5px;
      background-color: #f5f5f5;
    }
    .goods-simple {
      padding: 0 .3rem;
      background: white;
      border-bottom: $bodyCol 0.27rem solid;
      &:last-child {
        border-bottom: none;
      }
      .store-info {
        position: relative;
        z-index: 5;
        padding: 0.25rem;
        border-bottom: solid 2px #f5f5f5;
        background: $bgWhite;
        .left_logo {
          width: 32px;
          height: 32px;
          display: inline-block;
          background-color: red;
          background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/pulogo.png") 0 0 no-repeat;
          background-size: cover;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.2rem;
          &.store-icon {
            width: 0.32rem;
            height: 0.32rem;
            background-position: -2.93rem -1.22rem;
          }
          &.arrow-icon {
            width: 0.13rem;
            height: 0.29rem;
            background-position: -1.81rem -0.88rem;
          }
        }
        p {
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          /*width: 12px;*/
          /*height: 23px;*/
          margin-top: -0.18rem;
          img {
            width: 12px;
            height: 23px;
          }
        }
      }
      .goods-show {
        background: $leColfa;
        padding: 0;
        list-style-type: none;
        margin: 0;
        li {
          border-bottom: $bgWhite 0.026rem solid;
          padding: 0.1rem 0;
          margin-top: 2px;
          &:after {
            content: "";
            display: block;
            clear: both;
            font-size: 0;
          }
          .store-logo {
            width: 1.54rem;
            height: 1.54rem;
            border-radius: 0.1rem;
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.28rem;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            width: 5.29rem;
            h2 {
              font-size: 0.33rem;
              line-height: 1.3;
              margin-bottom: 0.29rem;
              height: 0.8rem;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            p {
              font-size: 0.29rem;
              color: $leCol9;
            }
          }
          aside {
            display: inline-block;
            float: right;
            text-align: right;
            line-height: 1.3;
            i {
              display: block;
              font-size: 0.32rem;
              &.pri-line {
                color: $leCol9;
                text-decoration: line-through;
              }
              &:last-child {
                color: $leCol9;
              }
            }
          }
        }
      }
      .bottom_btn {
        margin: 8px 0;
        position: relative;
        span {
          margin-top: 6px;
          margin-left: 562px;
          display: inline-block;
          right: 0;
          width: 138px;
          height: 40px;
          font-size: 24px;
          color: $redCol;
          text-align: center;
          border: solid 2px $redCol;
          border-radius: 10px;
          padding-top: 7px;
        }
      }
      .geceng {
        height: 15px;
        background-color: #f5f5f5;
      }
    }
    .yunjifen {
      position: relative;
      font-size: 26px;
      color: #999999;
      padding: 30px 20px;
      span {
        float: right;
      }
      border-bottom: solid 2px #f5f5f5;

    }
    .jin {
      position: relative;
      font-size: 26px;
      color: #999999;
      padding: 30px 20px;
      span {
        float: right;
        color: $leCol9;
        text-decoration: line-through;
      }
      border-bottom: solid 2px #f5f5f5;
      /*.heng-line{*/
      /**/
      /*}*/

    }
    .yunfei {
      position: relative;
      font-size: 26px;
      color: #999999;
      padding: 30px 20px;
      span {
        float: right;
      }
      border-bottom: solid 2px #f5f5f5;
    }
    .dikou {
      position: relative;
      font-size: 26px;
      color: #333333;
      padding: 30px 20px;
      span {
        float: right;
        img {
          display: inline-block;
          width: 30px;
          height: 20px;
          padding-right: 6px;
        }
      }
      border-bottom: solid 2px #f5f5f5;
    }
    .dingdaninfo {
      position: relative;
      padding: 30px 20px;
      font-size: 23px;
      color: #333333;
      .dingdanhao {
        display: flex;
        justify-content: space-between;
      }
      .chuangjianshijian {
        display: flex;
        justify-content: space-between;
      }
      .chengjiaoshijian {
        display: flex;
        justify-content: space-between;
      }
    }
    .querenshouhuo{
      position: relative;
      padding: 30px 20px;
      font-size: 23px;
      color: #333333;
      span{
        display: inline-block;
        float: right;
        border: solid 1px red;
        border-radius: 15px;
        padding: 10px;
        background-color: rgb(230,230,230);
      }
    }
    .bottom {
      position: absolute;
      background-color: #f5f5f5;
      bottom: 0;
      left: 0;
      width: 750px;
      height: 92px;
      p {
        display: inline-block;
      }
      .one {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 28px;
        color: #333333;
        padding-left: 37px;
        font-weight: bold;
      }
      .two {
        position: absolute;
        right: 0;
        text-align: center;
        letter-spacing: 10px;
        top: 0;
        font-size: 36px;
        color: #ffffff;
        background-color: #d31414;
        width: 200px;
        margin: 0;
        vertical-align: center;
        padding-top: 22px;
        height: 70px;
      }
      .three {
        position: absolute;
        left: 180px;
        display: inline-block;
        padding-top: .4rem;
        height: 80px;
        p {
          margin: 2px;
          display: block;
          span {
            color: #d31414;
          }
          img {
            display: inline-block;
            width: 30px;
            height: 20px;
            padding-right: 6px;
          }
        }
      }
    }
  }
</style>
