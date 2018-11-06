<template>
  <div id="zpsc">
    <div class="back" @click="goback"></div>
    <div class="nav">
      <div class="geren" @click="geren" :class="{'active':show}"><span>个人</span></div>
      <div class="gongsi" @click="gongsi" :class="{'active':!show}"><span>公司</span></div>
    </div>
    <div class="content">
      <div class="SFZ" v-show="show">
        <input type="file" accept="image/*" @change="getkImg" style="display:none" value="" id="img_k"/>
        <input type="file" accept="image/*" @change="getzImg" style="display:none" value="" id="img_z"/>

        <div class="img_wp" id="one" @click="yinhangka">
          <!--<img src="up.png" id="zmz"/>-->
          <div class="img_intro zheng" id="oneintro"></div>
        </div>

        <div class="img_wp" id="two" @click="zhengmian">
          <!--<img src="up.png" id="fmz"/>-->
          <div class="img_intro fan" id="twointro"></div>
        </div>


        <!--<div class="zheng"></div>-->
        <!--<div class="fan"></div>-->
      </div>
      <div class="GS" v-show="!show">
        <input type="file" accept="image/*" @change="getfImg" value="" id="img_f" style="display:none"/>
        <!--<div class="zhizhao"></div>-->
        <div class="img_wp" id="three" @click="fanmian">
          <!--<img src="up.png" id="zmz"/>-->
          <div class="img_intro zhizhao" id="threeintro"></div>
        </div>
      </div>
    </div>
    <div class="tijiao" @click="tijiao"></div>
    <div class="xieyi" @click="xieyi"></div>
    <div class="shengming" @click="shengming"></div>
  </div>
</template>
<script>
  export default {
    name: 'zpsc',
    data() {
      return {
        show: true,
        idCardFront:'',
        idCardReverse:'',
        businessImg:''
      }
    },
    mounted() {

      $(function () {
        $('.img_wp img').height($('.img_wp img').width() * 0.6);
        $(window).resize(function () {
          $('.img_wp img').height($('.img_wp img').width() * 0.6);
        })
      })


    },
    methods: {
      tijiao() {

       //
       //  var that = this;
       // $(function () {
         var businessImg = this.businessImg
         var idCardFront = this.idCardFront
         var idCardReverse = this.idCardReverse

         // alert(this.idCardFront)

         var mobile = sessionStorage.getItem('phone')
         var realName =sessionStorage.getItem('name')
         var storeName =sessionStorage.getItem('puName')
        var type = sessionStorage.getItem('type')


        // if(businessImg !='' && idCardFront !=''  && idCardReverse !=''){
          this.$axios({
            method: 'post',
            url: '/moon/anon/moonActivityEnter',
            responseType: 'json',
            data: {
              type:type,
              businessImg: businessImg,
              idCardFront: idCardFront,
              idCardReverse: idCardReverse,
              mobile: mobile,
              realName:realName,
              storeName:storeName
            }
          }).then(data => {
            alert('信息登记成功，我们将尽快审核！')
          }).catch(err => {
            console.log(err)
            alert('证件信息上传失败！')
          })
        // }
        // else{
        //   alert("请上传完整的证件图片")
        // }



       // })

      },
      getkImg(e) {
        var yinhangkaB = false;
        var zhengB = false;
        var fanB = false;
        var file = e.target.files[0];
        var that = this

        var reader = new FileReader();
        reader.readAsDataURL(file);//将文件读取为Data URL小文件   这里的小文件通常是指图像与 html 等格式的文件
        reader.onload = function (e) {
          $('#one').css({
            'background': 'url("' + e.target.result + '") 0 0 no-repeat',
            'background-size': '100% 100%'
          })
          $('#oneintro').css({
            'display': 'none'
          })



          var image_base64 = this.result.split(",")[1];
          //就是base64
          //
          // alert(image_base64)
          // that.idCardFront = image_base64;

          that.$axios({
            method: 'post',
            url: '/member/anon/base64UploadImg',
            responseType: 'json',
            data: {
              data: image_base64,
              type:6
            }
          }).then(data => {
            // alert('信息登记成功，我们将尽快审核！')
            that.idCardFront = data.data.data.filePath;

          }).catch(err => {
            console.log(err)
          })



        }
      },
      getzImg(e) {
        var yinhangkaB = false;
        var zhengB = false;
        var fanB = false;
        var file = e.target.files[0];

        var that = this
        var reader = new FileReader();
        reader.readAsDataURL(file);//将文件读取为Data URL小文件   这里的小文件通常是指图像与 html 等格式的文件
        reader.onload = function (e) {
          $('#two').css({
            'background': 'url("' + e.target.result + '") 0 0 no-repeat',
            'background-size': '100% 100%'
          })
          $('#twointro').css({
            'display': 'none'
          })

          var image_base64 = this.result.split(",")[1];
          //就是base64
          // that.idCardReverse = image_base64;
          that.$axios({
            method: 'post',
            url: '/member/anon/base64UploadImg',
            responseType: 'json',
            data: {
              data: image_base64,
              type:6
            }
          }).then(data => {
            // alert('信息登记成功，我们将尽快审核！')
            that.idCardReverse = data.data.data.filePath;

          }).catch(err => {
            console.log(err)
          })
        }
      },
      getfImg(e) {
        var yinhangkaB = false;
        var zhengB = false;
        var fanB = false;
        var file = e.target.files[0];
        var that = this

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          $('#three').css({
            'background': 'url("' + e.target.result + '") 0 0 no-repeat',
            'background-size': '100% 100%'
          })
          $('#threeintro').css({
            'display': 'none'
          })


          var image_base64 = this.result.split(",")[1];
          //就是base64
          // that.businessImg = image_base64;
          that.$axios({
            method: 'post',
            url: '/member/anon/base64UploadImg',
            responseType: 'json',
            data: {
              data: image_base64,
              type:6
            }
          }).then(data => {
            // alert('信息登记成功，我们将尽快审核！')
            that.businessImg = data.data.data.filePath;

          }).catch(err => {
            console.log(err)
          })

        }
      },
      zhengmian() {
        $('#img_z').click();
      },
      yinhangka() {
        $('#img_k').click();
      },
      fanmian() {
        $('#img_f').click();
      },
      goback() {
        this.$router.go(-1)
      },
      xieyi() {
        this.$router.push('/xieyi')
      },
      shengming() {
        this.$router.push('/shengming')
      },
      geren() {
        this.show = true
      },
      gongsi() {
        this.show = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .active {
    background-color: #b02f08 !important;
  }

  #zpsc {
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    height: 1334px;
    background: url("../assets/img/zpsc_bg.png") 0 0 no-repeat;
    background-size: 100% auto;

    .back {
      position: absolute;
      width: 35px;
      height: 55px;
      left: 30px;
      top: 24px;
    }
    .nav {
      position: absolute;
      width: 686px;
      padding: 0 32px;
      height: 90px;
      /*left: 30px;*/
      top: 200px;
      display: flex;
      justify-content: space-around;
      div {
        width: 207px;
        height: 100%;
        text-align: center;
        font-size: 38px;
        font-weight: bold;
        color: #ffffff;
        background-color: #e6e1d5;
        border-radius: 25px;
        span {
          display: block;
          margin-top: 20px;
          letter-spacing: 4px;
          vertical-align: middle;
        }
      }
    }
    .content {
      position: absolute;
      width: 750px;
      height: 575px;
      /*left: 30px;*/
      top: 370px;
      .SFZ {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: space-around;
        div {
          width: 390px;
          height: 250px;
        }
        .zheng {
          background: url("../assets/img/IDzheng.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        .fan {
          background: url("../assets/img/IDfan.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }

      }
      .GS {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          width: 390px;
          height: 250px;
        }
        .zhizhao {
          background: url("../assets/img/yingCard.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }

      }
    }
    .tijiao {
      position: absolute;
      width: 570px;
      height: 90px;
      left: 86px;
      top: 1030px;
    }
    .xieyi {
      position: absolute;
      width: 428px;
      height: 27px;
      left: 233px;
      top: 1141px;
    }
    .shengming {
      position: absolute;
      width: 414px;
      height: 21px;
      left: 159px;
      top: 1178px;
    }
  }
</style>
