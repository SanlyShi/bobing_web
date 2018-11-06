<template>
  <div id="roomlist_container">
    <div class="roomlist_top">
      <img :src='topImg'>
    </div>
    <div class="roomlist_content">
      <ul>
        <li v-for="item in roomlist" @click="goRoom(item.moonId,item.moonType)">
          <img :src="item.roomImage">
        </li>
      </ul>
      <div class="pref" @click="prefYe"></div>
      <div class="next" @click="nextYe"></div>
    </div>
    <div class="roomlist_bottom">
      <p>本次活动在法律允许的范围内</p>
      <p>{{companyName}}保留对本次活动的最终解释</p>
    </div>

    <div class="ruzhu" @click="ruzhu">
    </div>
    <div class="libao" @click="libao"></div>
  </div>
</template>
<script>
  export default {
    name: 'roomlist',
    data() {
      return {
        companyName: '厦门天禾露网络科技有限公司',
        roomlist: '',
        topImg: 'https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/roomlist_top.png',
        yeNum:1,
        total:''
      }
    },
    mounted() {
      // 请求房间列表 活动的场次号

      // pageNo
      // pageSize
      if(this.$route.query.token){
        // alert(this.$route.query.token)
        sessionStorage.token = this.$route.query.token
        // alert(sessionStorage.token)
      }
      this.$axios({
        method: "post",
        url: 'moon/anon/queryMoonActivityList',
        data:{
          pageNo:this.yeNum,
          pageSize:9,
        },
        responseType: "json"
      })
        .then(data => {
          this.roomlist = data.data.res_data.dataList
          this.total = data.data.res_data.total
        })
        .catch(err => {
          console.log(err);
        });


    },
    methods: {
      ruzhu(){
        this.$router.push({path: '/Admission'})
      },
      libao(){
        window.location.href = "https://wx.juyooo.com/?code=0113C4q01is29025DHn01c1Sp013C4qL&state=#/specials?relId=141"
      },
      prefYe(){
        if (this.yeNum > 1)
        this.$axios({
          method: "post",
          url: 'moon/anon/queryMoonActivityList',
          data:{
            pageNo:this.yeNum -= 1,
            pageSize:9,
          },
          responseType: "json"
        })
          .then(data => {
            this.roomlist = data.data.res_data.dataList
          })
          .catch(err => {
            console.log(err);
          });
      },
      nextYe(){
        if (this.yeNum < (this.total / 9))
        this.$axios({
          method: "post",
          url: 'moon/anon/queryMoonActivityList',
          data:{
            pageNo:this.yeNum += 1,
            pageSize:9,
          },
          responseType: "json"
        })
          .then(data => {
            this.roomlist = data.data.res_data.dataList
          })
          .catch(err => {
            console.log(err);
          });
      },
      goRoom(index,type) {
        // alert(type)
        if(type == 1){
          this.$router.push({path: '/login', query: {roomId: index,zhuanc:true}})
        }
        if(type == 0){
          this.$router.push({path: '/yindao', query: {roomId: index}})
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #roomlist_container {
    width: 750px;
    height: 1334px;
    .roomlist_top {
      width: 750px;
      height: 467px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .roomlist_content {
      position: relative;
      width: 750px;
      height: 949px;
      background: url("../assets/img/roomlist_content.png") 0 0 no-repeat;
      background-size: 100% 100%;
      background-color: #b31f03;
      ul {
        margin: 0;
        width: 650px;
        height: 700px;
        padding: 85px 50px;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
        list-style-type: none;
        li {
          width: 179px;
          height: 176px;
          padding: 28.66px 18.83px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .pref{
        position: absolute;
        width: 2rem;
        bottom: 1rem;
        left: 2rem;
        height: .7rem;
      }
      .next{
        position: absolute;
        width: 2rem;
        bottom: 1rem;
        right: 2rem;
        height: .7rem;
      }
    }
    .roomlist_bottom {
      text-align: center;
      color: #ffcfc6;
      background-color: #b31f03;
      padding-bottom: 20px;
      p {
        margin: 0;
        font-size: 20px;
      }
    }
    .ruzhu{
      position: absolute;
      width: 200px;
      left: 550px;
      top: 450px;
      height: 139.5px;
      /*background-color: green;*/
      z-index: 30;
      background: url("../assets/img/shenq.gif") 0 0 no-repeat;
      background-size:  100% 100%;
    }
    .libao{
      position: absolute;
      width: 160px;
      left: 10px;
      top: 440px;
      height: 150px;
      /*background-color: green;*/
      z-index: 30;
      background: url("../assets/img/libao.gif") 0 0 no-repeat;
      background-size:  100% 100%;
    }
  }
</style>
