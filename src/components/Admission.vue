<template>
  <div id="Admission">
    <div class="shuomingshu" @click="shuomingshu"></div>
    <div class="yanshishipin" @click="yanshishipin"></div>
    <div class="ruzhuyanshi" @click="ruzhuyanshi"></div>
    <div class="input_kuang">
      <input class="name" type="text" v-model="name" placeholder="请输入您的姓名">
      <input class="phone" type="text" v-model="phone" placeholder="请输入您的手机号">
      <input class="puName" type="text" v-model="puName" placeholder="请输入您的企业或店铺名称">

      <!--<input type="radio">-->
    </div>
    <div class="select">
      <span>包间类型：</span>
      <input type="radio"   value="0" v-model="dazhong"><span>大众包间</span>

      <input type="radio"    value="1"  v-model="dazhong"><span>VIP包间</span>
    </div>

    <div class="lijidengji" @click="lijishenqing"></div>

  </div>
</template>
<script>
  export default {
    name: 'Admission',
    data() {
      return {
        name:null,
        phone:null,
        puName:null,
        dazhong:'',
        vip:''
      }
    },
    mounted() {

    },
    methods: {
      shuomingshu(){
        this.$router.push('/shuomingshu')
      },
      yanshishipin(){
        // 视频连接
        window.location.href = "https://jymall-test.oss-cn-beijing.aliyuncs.com/other/%E4%B8%AD%E7%A7%8B%E5%8D%9A%E9%A5%BC%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B130M.mp4"
      },
      ruzhuyanshi(){
        window.location.href = "https://jymall.oss-cn-beijing.aliyuncs.com/comment/conf/moon_enter.mp4"
      },
      lijishenqing(){
        // console.log($("input[name='radio']:checked").val())
      // console.log(this.dazhong )

        if(this.name && this.phone && this.puName ){
          sessionStorage.type = this.dazhong
          sessionStorage.name = this.name;
          sessionStorage.phone = this.phone;
          sessionStorage.puName = this.puName;
          this.$router.push('/zpsc')
        }
        else{
          alert('请正确填写信息！')
        }
      }

    }
  }
</script>
<style scoped lang="scss">
  #Admission{
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    margin-top: 20px;
    height: 1334px;
    background: url("../assets/img/ruzhu.png") 0 0 no-repeat;
    background-size: 100% auto;
    .shuomingshu{
      width: 200px;
      height: 26px;
      position: absolute;
      left: 150px;
      top: 457px;
    }
    .ruzhuyanshi{
      width: 200px;
      height: 26px;
      position: absolute;
      left: 175px;
      top: 490px;
    }
    .yanshishipin{
      width: 200px;
      height: 26px;
      position: absolute;
      left: 390px;
      top: 457px;
    }
    .input_kuang{
      position: absolute;
      left: 250px;
      top: 580px;
      height: 280px;
      /*background-color: chartreuse;*/
      /*opacity: .5;*/
      width: 420px;
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
      input{
        display: block;
        font-size: 24px;
        /*background-color: #7c1d0f;*/
        height: 60px;
        width: 360px;
        border: none;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      input{
        border: none;
        outline: none;
      }
    }
    .select{
      padding: 10px;
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      color: red;
      margin: 0 auto;
      top: 900px;
      height: 80px;
      /*background-color: chartreuse;*/
      /*opacity: .5;*/
      width: 520px;
    }
    .lijidengji{
      width: 550px;
      height: 96px;
      position: absolute;
      left: 96px;
      top: 996px;
      opacity: .4;
    }
  }
</style>
