<template>
  <div id="loding">
    <div v-show="phoneAppear" class="phone_wrap">
    <div class="cha" @click="clearT"></div>
    <input type="number" class="phone" placeholder="11位手机号" v-model="mobile">
    <input type="password" class="yanzhengma" placeholder="请输入验证码" v-model="codes">
    <p @click="gaincodes" class="codebtn">获取验证码</p>
    <div class="queren" @click="bidingmobile"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        phoneAppear:false,
        mobile:'',
        codes:'',
        clicks: true,
        // dianji:true
        // states: true,
      }
    },
    beforeRouteEnter(to, from , next) {
      // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      // if (answer) {
      //   // next()
      // } else {
      //   // next(false)//可以通过在这里写逻辑来处理用户点了物理返回之后的操作
      //   alert('要返回')
      // }
      // console.log(from.name);
      if(from.name == 'yindao'){
        next()
      }
      if(from.name == null){
        next()
      }
      if(from.name == 'roomlist'){
        next()
      }
      if(from.name == 'home'){
        // this.$router.push('/roomlist')
        window.location.href='https://wx.juyooo.com/bobing/#/roomlist'
      }
      if(from.name == 'newHome'){
        // this.$router.push('/roomlist')
        window.location.href='https://wx.juyooo.com/bobing/#/roomlist'
      }
    },
    created(){

      if(this.$route.query.token){
        // alert(this.$route.query.token)
        sessionStorage.token = this.$route.query.token
        // alert(sessionStorage.token)
      }

      // alert(window.location.href)
        // alert(sessionStorage.getItem("token"))
        if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == undefined) {
          // alert(window.location.href)
          // alert('token是空')
          var agent = navigator.userAgent.toLowerCase();
          if (agent.match(/MicroMessenger/i) == "micromessenger") {

            this.login();
          }
          else {
            alert('请使用微信或者进入巨柚APP打开！')
          }

        }
        else {
          // alert('token不是空')
          if(sessionStorage.getItem('details')){
            sessionStorage.memberId = JSON.parse(sessionStorage.getItem('details')).memberId
          }
          this.$axios({
            method: 'post',
            url: '/moon/queryMoonActivity',
            responseType: 'json',
            data: {
              moonId: this.$route.query.roomId,
              token: sessionStorage.getItem('token')
            }
          }).then(data => {
            sessionStorage.bobingDetail = JSON.stringify(data.data.res_data)
            var memberId = sessionStorage.getItem('memberId')

            // alert("进入查询")
            if(this.$route.query.zhuanc == true){
              this.$router.push({path: '/newHome', query: {roomId: this.$route.query.roomId,memberId:memberId}})
            }
            else{
              // alert("进入首页")
              this.$router.push({path: '/home', query: {roomId: this.$route.query.roomId,memberId:memberId}})
            }
          }).catch(err => {
            console.log(err)
          })
        }

    },
    mounted() {

    },
    methods: {
      clearT() {
        this.phoneAppear = false
        this.$router.go(-1)
      },
      login() {
        // alert(window.location.href)
        var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        let token = sessionStorage.getItem("token")
        if (token == null) {
          if (r == null) {
            // alert("开始进行微信授权")
            // alert('开始尽心微信回调，回调链接是'+'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$urlstate.appid + '&redirect_uri=https%3a%2f%2f' + this.$urlstate.url + '%2Fbobing%2F%23%2Flogin%3FroomId%3D' + this.$route.query.roomId+"%26memberId%3D"+this.$route.query.memberId + '&response_type=code&scope=snsapi_userinfo#wechat_redirect')
           if(this.$route.query.zhuanc){
             location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$urlstate.appid + '&redirect_uri=https%3a%2f%2f' + this.$urlstate.url + '%2Fbobing%2F%23%2Flogin%3FroomId%3D' + this.$route.query.roomId+'%26zhuanc%3Dtrue' + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';

           }
           else{
             location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$urlstate.appid + '&redirect_uri=https%3a%2f%2f' + this.$urlstate.url + '%2Fbobing%2F%23%2Flogin%3FroomId%3D' + this.$route.query.roomId + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';

           }
          } else {
            this.$axios({
              method: 'post',
              url: '/basics/anon/appWxAuth',
              responseType: 'json',
              data: {
                code: r[2],
                reqType: 0
              }
            }).then(data => {
              // alert('appWxAuth接口请求成功，数据是'+JSON.stringify(data.data))
              // if(data.data.res_data.returnCode == 1){
                // alert("如果绑定了手机")
              sessionStorage.details = JSON.stringify(data.data.res_data);

              if (data.data.res_data.member) {
                sessionStorage.details = JSON.stringify(data.data.res_data.member)
                sessionStorage.token = data.data.res_data.token;
                // alert('token获取到')

                // 用户自身的memberID
                var memberId = data.data.res_data.member.memberId;
                sessionStorage.memberId = data.data.res_data.member.memberId;


                this.$axios({
                  method: 'post',
                  url: '/moon/queryMoonActivity',
                  responseType: 'json',
                  data: {
                    moonId: this.$route.query.roomId,
                    token: sessionStorage.getItem('token')
                  }
                }).then(data => {
                  sessionStorage.bobingDetail = JSON.stringify(data.data.res_data)
                  // alert(this.$route.query.zhuanc)
                  if(this.$route.query.zhuanc){
                    // alert("进入新的专场主页")
                    this.$router.push({path: '/newHome', query: {roomId: this.$route.query.roomId,memberId:memberId}})
                  }
                  else{
                    this.$router.push({path: '/home', query: {roomId: this.$route.query.roomId,memberId:memberId}})
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
              if (data.data.res_data.returnCode == 0) {
                this.phoneAppear = true
              }
            }).catch(err => {
              console.log(err)
            })

          }
        }
      },
      gaincodes() {
        // let token = sessionStorage.getItem("token");
        if (this.clicks == false) {
          return false;
        }

        var reg = /^1[1-9]\d{9}$/;
        if (!reg.test(this.mobile)) {
          alert("号码不正确");
        }
        else {
          this.clicks = false;
          let times = 60;
          var tim = document.getElementsByClassName("codebtn")[0];
          tim.innerHTML = times + "S";
          let _this = this;
          var time = setInterval(function() {
            times--;
            tim.innerHTML = times + "S";
            if (times == 0) {
              _this.clicks = true;
              tim.innerHTML = "获取验证码";
              clearInterval(time);
            }
          }, 1000);
          // alert(this.mobile)
          this.$axios({
            method: "post",
            url: "/basics/anon/sendMobileCode",
            responseType: "json",
            data: {
              mobile: this.mobile,
              type: 8
            }
          })
            .then(data => {
              // console.log(data);
              // alert('验证码发送成功')
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      bidingmobile() {
          if (!this.mobile) {
            alert('手机号码不能为空')
            return;
          }
          if (!this.codes) {
            alert('请输入验证码')
            return;
          }

          var parentId	= sessionStorage.getItem('FumemberId');

        var member = JSON.parse(sessionStorage.details)

        var obj = {
          'authType': 1,
          'face': member.face,
          'parentId': parentId,
          'memberStatus': member.memberStatus,
          'mobile': this.mobile,
          'mobileCode': this.codes,
          'nickname': member.nickname,
          'openId': member.openId,
          'sex': member.sex,
          'subscribe': member.subscribe,
          'type': 8,
          'unionId': member.unionId
        }


          this.$axios({
            method: "post",
            url: "/basics/anon/loginAuthorizedCode",
            responseType: "json",
            data: obj
          })
            .then(data => {
              if (data.data.res_code == 0) {
                sessionStorage.details = JSON.stringify(data.data.res_data.member)
                sessionStorage.token = data.data.res_data.token;
                this.phoneAppear = false
                window.location.reload()

                // this.$axios({
                //   method: 'post',
                //   url: '/moon/queryMoonActivity',
                //   responseType: 'json',
                //   data: {
                //     moonId: this.$route.query.roomId,
                //     token: sessionStorage.getItem('token')
                //   }
                // }).then(data => {
                //   sessionStorage.bobingDetail = JSON.stringify(data.data.res_data)
                //   this.$router.push({path: '/home', query: {roomId: this.$route.query.roomId}})
                // }).catch(err => {
                //   console.log(err)
                // })

              } else {
                alert("绑定失败："+data.data.res_info)
              }
            })
            .catch(err => {
              console.log(err);
            });
      },
    }


  }
</script>
<style scoped lang="scss">
  #loding{
    width: 100%;
    height: 100%;
    background: url("https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/loding.gif") 0 0 no-repeat;
    background-size: 100% 100%;
  .phone_wrap {
    position: absolute;
    left: 109.5px;
    top: 380px;
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
    /*background-color: black;*/
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
    left:2rem;
    top: 200px;
    width: 320px;
  }
  .yanzhengma {
    position: absolute;
    left: 2rem;
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
  }
</style>
