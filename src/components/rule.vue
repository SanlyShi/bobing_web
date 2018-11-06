<template>
  <div id="rule_container">
    <div class="topyindao_bg" v-if="ruleId == 1"></div>
    <div class="tophuodong_bg" v-if="ruleId == 2">
      <img :src="ruleImg">
    </div>
    <div class="topzhuanpan_bg" v-if="ruleId == 3">
      <img :src="ruleImg">
    </div>
    <div class="topzhuanpan_bg" v-if="ruleId == 4">
      <img :src="ruleImg">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'rule',
    data() {
      return {
        ruleId: '',
        ruleImg:''
      }
    },
    mounted() {
      this.ruleId = this.$route.query.ruleId;

      if(this.ruleId == 2){
        this.ruleImg = (JSON.parse(sessionStorage.getItem('bobingDetail'))).moonStyle.styleRuleImage
      }
      if(this.ruleId == 3){
        this.ruleImg = sessionStorage.getItem('turntableRuleImg')
      }
      if (this.ruleId == 4){
        this.ruleImg = sessionStorage.getItem('ticketRuleImg')
      }
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  #rule_container {
    width: 750px;
    height: 1334px;
    background-color: #b42003;
    .topyindao_bg {
      width: 750px;
      min-height: 1206px;
      background: url("../assets/img/yindao_rule.png") 0 0 no-repeat;
      background-size: 100% 100%;
      /*img{*/
        /*width: 100%;*/
      /*}*/
    }
    .tophuodong_bg {
      width: 750px;
      min-height: 1322px;
      img{
        width: 100%;
      }
    }
    .topzhuanpan_bg {
      width: 750px;
      min-height: 1206px;
      /*background: url("../assets/img/zhuanpan_rule.png") 0 0 no-repeat;*/
      /*background-size: 100% 100%;*/
      img{
        width: 100%;
      }
    }
  }
</style>
