<template>
  <div id="aboutUs_container">
    <div class="aboutUs_bg" v-html="moonDescribe">
      <!--<p>{{moonDescribe}}</p>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'aboutUs',
    data() {
      return {
        moonDescribe:''
      }
    },
    mounted() {
         this.moonDescribe = JSON.parse(sessionStorage.getItem('bobingDetail')).moonActivity.moonDescribe;
         if(this.moonDescribe.split('img').length > 1){
           this.moonDescribe = this.moonDescribe.split('img')[0]+'img style="width:8.5rem;height:8.5rem"'+this.moonDescribe.split('img')[1]

         }
         else if (this.moonDescribe.split('img').length == 1) {
           this.moonDescribe = this.moonDescribe.split('img')[0]
         }
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  #aboutUs_container {
    width: 750px;
    height: 1334px;
    background-color: #b42003;
    .aboutUs_bg {
      width: 650px;
      height: 1000px;
      background: url("../assets/img/aboutUs.png") 0 0 no-repeat;
      background-size: 100% 100%;
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 180px;
      p{
        img{
          width: 100%;
        }
      }
    }
  }
</style>
