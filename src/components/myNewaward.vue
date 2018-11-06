<template>
  <div id="myawardcontainer">
    <div class="top" @click="wangqi">查看往期中奖纪录></div>
    <div class="list_content">
      <!--<ul class="order-tab">-->
      <!--<li v-for="(o,i) in menuList" v-on:click="tabMenu(i)" :class="{'current':o.active}">-->
      <!--<span>{{o.text}}</span>-->
      <!--</li>-->
      <!--</ul>-->
      <!--//原来1.65rem-->
      <div class="content" style="position:absolute;top:0.45rem;left:0;right:0;bottom:0;">
        <div v-for="(item,index) in shoppList" v-if="shoppList[index].orderStatus!=-9 && item.goodsList.length !=0">
          <section class="goods-simple">
            <div class="store-info">
              <span class="left_logo"></span>
              <span>{{item.comName}} > </span>
              <p>{{formatStatus(item.orderStatus)}}</p>
            </div>
            <ul v-if="item.goodsList" class="goods-show">
              <li v-for="(value,key) in item.goodsList" @click="details(value.orderId,item.orderStatus)">
                <img :src="value.goodsImage | filterss(3)" class="store-logo">
                <span >
                <h2>{{value.goodsName}}</h2>
                <p>规格：{{value.productSpec}}</p>
              </span>
                <aside >
                  <!--<i>￥{{value.price}}</i>-->
                  <i class="pri-line">￥{{value.goodsPrice}}</i>
                  <i>×{{value.buyCount}}</i>
                </aside>
              </li>
            </ul>
            <div v-else class="goods-show">
              <li @click="details(index)">
                <img
                  src="http://img.juyooo.com/goods/20180615/38b10798-23cf-424a-9435-6a0f23effde7.jpg?x-oss-process=image/resize,w_375"
                  class="store-logo">
                <span>
                <h2>{{item.exchangeName}}</h2>
                <p>规格：{{item.specs}}</p>
              </span>
                <aside>
                  <i>{{item.exchangeCoin}}金币</i>
                  <i class="pri-line">￥{{item.mktPrice}}</i>
                  <i>数量：{{item.changeProductNum}}</i>
                </aside>
              </li>
            </div>
            <div class="bottom_btn">
              <span @click="lingqu(shoppList[index].orderId)" v-if="item.orderStatus == 0">立即领取</span>
            </div>
          </section>
          <div class="geceng"></div>
        </div>
      </div>
    </div>

    <div class="duijiangSay" @click="duijiangSay"></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  // import axios from "axios"
  export default {
    name: 'myNewaward',
    data() {
      return {
        length: 5,
        arr: ['全部', '待收取', '待发货', '待收货', '已完成'],
        list: [],
        loading: false,
        finished: false,
        active: 2,
        shoppList: [],
        menuList: [
          {text: "全部", active: true},
          {text: "待领取", active: false},
          {text: "待发货", active: false},
          {text: "待收货", active: false},
          {text: "已完成", active: false}
        ],
      }
    },
    created() {

    },
    mounted() {
      // if (window.history && window.history.pushState) {
      //   history.pushState(null, null, document.URL);
      //   window.addEventListener('popstate', this.goBack, false);
      // }
      var token = sessionStorage.getItem('token');
      this.$axios({
        method: 'post',
        url: '/moon/pageOrder',
        responseType: 'json',
        data: {
          orderType: this.$route.query.orderType,
          // pageNo: 0,
          // pageSize: 1,
          token: token
        }
      }).then(data => {
        this.shoppList = data.data.res_data.dataList;
        sessionStorage.dataList = JSON.stringify(data.data.res_data.dataList);
      }).catch(err => {
        console.log(err)
      })


    },
    destroyed(){
      window.removeEventListener('popstate', this.goBack, false);
    },
    methods: {
      // formatStatus(status){
      //   let text ="";
      //   if(this.isGoldChanger){
      //     text = this.goldStatus[status==(-2||-1||-3)?8:status];
      //   }else{
      //     text = this.stores[status==(-2||-1||-3)?8:status];
      //   }
      //
      //   if(status == -8){
      //     text = "退款成功"
      //   }
      //   if(status == -10){
      //     text = "退货退款成功"
      //   }
      //   return text;
      // },
      // goBack(){
      //   this.$router.replace({path: '/home'});
      //   //replace替换原路由，作用是避免回退死循环
      // },
      duijiangSay(){
        this.$router.push({path:'/rule',query:{ruleId:4}})
      },
      tabMenu(index) {
        this.shop = index;
        this.allLoaded = false;
        this.menuList.forEach((element, i) => {
          if (index == i) {
            element.active = true;
          } else {
            element.active = false;
          }
        });

        sessionStorage.removeItem("managerDetail");
        if (this.$route.query.isGoldChanger && index == 4) {
          index = -1;
        }
        if (index == 5) {
          // this.btnstatus = true;
          // this.$axios({
          //   method: "post",
          //   url: "/order/pageGiftOrder",
          //   responseType: "json",
          //   data: {
          //     token: this.token,
          //     orderType: 0,
          //     pageNo: 1,
          //     pageSize: 10
          //   }
          // })
          //   .then(data => {
          //     this.shoppList = data.data.res_data.dataList;
          //     sessionStorage.managerDetail = "managerDetail";
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          // return;
        } else {
          // this.btnstatus = false;
        }
        // this.$axios({
        //   method: "post",
        //   url: this.url,
        //   responseType: "json",
        //   data: {
        //     token: this.token,
        //     orderType: index,
        //     pageNo: 1,
        //     pageSize: 10
        //   }
        // })
        //   .then(data => {
        //     if (this.isGoldChanger) {
        //       this.shoppList = data.data.res_data.coinExchangeOrderList.rows;
        //     } else {
        //       this.shoppList = data.data.res_data.dataList;
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      },
      details(orderId,statue){
        if (orderId){
          if(statue == 1){
            this.$router.push({path:'/orderDetail',query:{orderId:orderId}})
          }
          else if(statue == 2 || statue == 3 || statue == 4 || statue == 6 || statue == 7 || statue == 8){
            this.$router.push({path:'/orderDetail',query:{orderId:orderId,youwuliu:true,statueOrder:statue}})
          }
          else if (status == 0) {
            // alert('您的奖品尚未领取，请点击"立即领取"')
          }
        }
      },
      formatStatus(status){
        // let text ="";
        // if(this.isGoldChanger){
        //   text = this.goldStatus[status==(-2||-1||-3)?8:status];
        // }else{
        //   text = this.stores[status==(-2||-1||-3)?8:status];
        // }
        //
        // if(status == -8){
        //   text = "退款成功"
        // }
        // if(status == -10){
        //   text = "退货退款成功"
        // }
        var text;
        if(status == 0){
          text = '待领取'
        }
        if(status == 1){
          text = '待付款'
        }
        if(status == 2 || status ==3 || status ==4 ){
          text = '待发货'
        }
        // if(status == 5){
        //   text = '待发货'
        // }
        if(status == 6){
          text = '已发货，待收货'
        }
        if(status == 7){
          text = '已收货'
        }
        if(status == 8){
          text = '已完成'
        }
        // if(status == 5){
        //   text = '已完成'
        // }
        // if(status == 0){
        //
        // }

        return text;
      },
      lingqu(ID){
        // alert(ID);
        this.$router.push({path:'/orderDetail',query:{orderId:ID}})
      },
      wangqi() {
        this.$router.push('/wangqi')
      }
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
  .duijiangSay{
    position: fixed;
    left: 0;
    top: 300px;
    width: 50px;
    height: 156px;
    background: url("../assets/img/duijiang_logo.png") 0 0 no-repeat;
    background-size: 100% 100%;
    z-index: 10000;
  }
  #myawardcontainer {
    .top {
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      letter-spacing: 2px;
      width: 750px;
      height: 48px;
      font-size: 26px;
      color: #f86442;
      background-color: #fff8f6;
      padding-top: 15px;
    }
    .list_content {
      position: absolute;
      left: 0;
      margin-top: 60px;
      background-color: #ffffff;
      width: 750px;
      min-height: 1274px;
      .order-tab {
        padding: 0;
        position: absolute;
        left: 0;
        top: 0;
        background: #ffffff;
        z-index: 15;
        width: 100%;
        white-space: nowrap;
        display: flex !important;
        justify-content: space-around;
        text-align: center;
        border-bottom: #f5f5f5 1px solid;
        li {
          padding: 0 .2rem;
          display: inline-block;
          font-size: 0.37rem;
          &.current {
            color: #e24108;
            border-bottom: #e24108 0.053rem solid;
          }
          span {
            padding: 0.35rem 0;
            display: inline-block;
          }
        }
      }
    }
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
      padding: 0.2rem;
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
        font-size: 0.32rem;
        color: $redCol;
        margin-top: -0.18rem;
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
</style>
