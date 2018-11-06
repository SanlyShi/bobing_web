<template>
  <div id="yindao_container">
    <div class="top_bg">
      <div class="rule" @click="goRule"></div>
      <div class="in_game" @click="goPlay"></div>
    </div>
    <div class="banner_bg" @click="goShop">
      <div class="banner_img"></div>
    </div>
      <div class="footer_say">
      <p>{{jieshiTop}}</p>
      <p>{{jieshiBottom}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'yindao',
    data() {
      return {
        jieshiTop: '',
        jieshiBottom: ''
      }
    },
    mounted() {
      if(this.$route.query.token){
        // alert(this.$route.query.token)
        sessionStorage.token = this.$route.query.token
        // alert(sessionStorage.token)
      }

      if (this.$route.query.memberId) {
        sessionStorage.FumemberId = this.$route.query.memberId
      }


      this.$axios({
        method: 'post',
        url: '/moon/anon/queryMoonActivityConf',
        responseType: 'json',
        data: {
          moonId: this.$route.query.roomId
        }
      }).then(data => {
        sessionStorage.styleRuleImage = data.data.res_data.moonStyle.styleRuleImage
        // sessionStorage.guideBannerImage = data.data.res_data.moonStyle.guideBannerImage
        sessionStorage.guideBannerHred = data.data.res_data.moonStyle.guideBannerHred

        var str = data.data.res_data.moonActivity.moonExplain
        this.jieshiTop = str.split('，')[0]
        this.jieshiBottom = str.split('，')[1]

        $(function () {
          $('.top_bg').css({
            background: 'url("' + data.data.res_data.moonStyle.styleBackgroundImage + '") 0 0 no-repeat',
            backgroundSize: "100% 100%"
          })

          $('.banner_img').css({
            background: 'url("' + data.data.res_data.moonStyle.guideBannerImage + '") 0 0 no-repeat',
            backgroundSize: "100% 100%"
          })
        })

      }).catch(err => {
        console.log(err)
      })

    },
    methods: {
      goRule() {
        this.$router.push({path: '/rule', query: {ruleId: 1}})
      },
      goShop(){
        window.location.href= sessionStorage.getItem('guideBannerHred')
      },
      goPlay() {
        this.$router.push({path: './login', query: {roomId: this.$route.query.roomId}})
      }
    }
  }
</script>
<style scoped lang="scss">
  #yindao_container {
    position: relative;
    width: 750px;
    height: 1400px;
    background-color: #fdf6ec;
    .top_bg {
      width: 750px;
      height: 1093px;
      /*background: url("../assets/img/yindao_bg.png") no-repeat 0 0;*/
      /*background-size: 100% 100%;*/
      .rule {
        position: absolute;
        top: 180px;
        left: 2px;
        width: 60px;
        height: 180px;
      }
      .in_game {
        position: absolute;
        top: 986px;
        border-radius: 30px;
        left: 220px;
        width: 328px;
        height: 100px;
      }
    }
    .banner_bg {
      position: relative;
      width: 750px;
      height: 270px;
      .banner_img {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 30px;
        width: 690px;
        height: 230px;
        /*background: url("../assets/img/yin_banner.png") 0 0 no-repeat;*/
        /*background-size: 100% 100%;*/
      }
    }
    .footer_say {
      padding-top:25px;
      text-align: center;
      color: #b4afa9;
      background-color: #fdf6ec;
      p {
        margin: 2px;
        font-size: 20px;
      }
    }
  }

</style>
