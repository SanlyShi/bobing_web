<template>
  <div style="background:#fff3e4;width:100%;height:100%;position:relative;">
    <div class="toptip" v-show="isOpen == 2" >已有{{totalMan}}个人加入，博饼即将开始</div>
    <!--<div class="toptip" >博饼即将结束</div>-->
    <div v-if="isOwners" class="flex button_wrap">
      <a @click="begin" v-show="isOpen == 2" class="begin button">开始博饼</a>
      <a @click="sure(3)" v-show="isOpen == 1" class="end button">结束博饼</a>
      <a  v-show="isOpen == 3" class="begin button">活动结束</a>
    </div>
    <div v-else class="banner2"></div>
    <ul class="flex">
      <li @click="selectThis(index)" v-for="(item,index) in menuList" :class="item.active?'active':''">
        {{item.text}}
      </li>
    </ul>
    <div class="list_wrap">
      <div class="flex " v-for="item in personList">
        <div class="face flex">
          <img :src="item.face" />
        </div>
        <div class="info flex">
          <p class="name">{{item.realName}}</p>
          <p class="phone">{{item.phone}}</p>
          <p class="state" :class="item.status==0?'active':''">{{formatState(item.status)}}</p>
        </div>
        <div v-if="isOwners&&item.status==0" class="right flex">
          <a @click="agree(item.memberId,1)">同意</a>
          <a @click="agree(item.memberId,2)" class="disagree">拒绝</a>
        </div>
        <div v-if="isOwners&&item.status==1" class="right flex">
          <a @click="agree(item.memberId,2)">拒绝</a>
        </div>
        <div v-if="isOwners&&item.status==2" class="right flex">
          <a @click="agree(item.memberId,1)">同意</a>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" style="width:296px;height:195px;background:#d34305;border-radius:10px;" position="center">
      <h3>提示</h3>
      <div class="msg">
        <p>是否确定开始博饼，</p>
        <p>开始博饼则其他玩家无法再次加入！</p>
      </div>
      <div class="flex button_wrap2">
        <a @click="sure(1)" class="begin button">确定</a>
        <a @click="cancel()" class="end button">取消</a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
export default {
  name: "participateList",
  data() {
    return {
      selected: "1",
      isOwners: false,
      isOpen:2,
      pageNo: 1,
      menuList: [
        { text: "全部", active: true },
        // { text: "待审核", active: false },
        // { text: "已同意", active: false },
        // { text: "已拒绝", active: false },
        // { text: "已结束", active: false }
      ],
      popupVisible: false,
      personList: [],
      totalMan:''
    };
  },
  methods: {
    begin() {
      // if(this.isOpen == 3){
      //     // alert("活动结束，")   qing
      // }
      // else {
        this.popupVisible = true;

      // }
    },
    sure(state) {
      let url = "moon/boMoonInstall";
      let params = {
        status: state, //1开启，3关闭
        moonId: sessionStorage.getItem('roomId'),
        token: sessionStorage.token
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        responseType: "json"
      })
        .then(data => {
          if(this.isOpen == 2){
            this.popupVisible = false
            this.isOpen  = 1
          }
          if(state == 3){
            this.isOpen = 3
          }
          // alert("去登录页")

          window.location.href='https://wx.juyooo.com/bobing/#/login?roomId='+sessionStorage.getItem('roomId')+'&zhuanc=true'
          // this.$router.push({
          //   path: "/login",query:{roomId:sessionStorage.getItem('roomId'),zhuanc:true}
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    agree(memberId, status) {
      // var moonId = sessionStorage.getItem('')
      let url = "moon/boAudit";
      let params = {
        memberId,
        status,
        moonId: sessionStorage.getItem('roomId'),
        token: sessionStorage.token
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        responseType: "json"
      })
        .then(data => {
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.popupVisible = false;
    },
    selectThis(index) {
      this.menuList.forEach((o, i) => {
        if (index == i) {
          o.active = true;
        } else {
          o.active = false;
        }
      });
    },
    formatState(state) {
      switch (state) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "已同意";
          break;
        case 2:
          return "已拒绝";
          break;
      }
    },
    getList() {
      let url = "/moon/pageMoonMember";
      let params = {
        moonId: sessionStorage.getItem('roomId'),
        pageSize: 100,
        pageNo: this.pageNo,
        token: sessionStorage.token
          ? sessionStorage.token
          : "uIShEVkGVrTYNUWHRmck1Q=="
      };
      this.$axios({
        method: "post",
        url: url,
        data: params,
        responseType: "json"
      })
        .then(data => {
          console.log(data);
          this.personList = data.data.res_data.dataList;
          this.totalMan = data.data.res_data.total
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getList();
    this.isOwners = (sessionStorage.isOwners == 0) ? false : true;
    this.isOpen = sessionStorage.getItem('isOpen')
    if (!this.isOwners) {
      this.menuList = [
        { text: "成员列表", active: true },
        // { text: "已结束", active: false }
      ];
      // console.log(12);
    }
  }
};
</script>
<style scoped>
h3 {
  width: 100%;
  text-align: center;
  font-size: 35px;
  color: white;
}
.flex {
  display: flex;
  display: -webkit-flex;
}
.between {
  justify-content: space-between;
}
.button_wrap {
  justify-content: center;
  height: 243px;
  background-image: url("../assets/img/banner1.png");
  background-size: 100% 100%;
}
.banner2 {
  height: 82px;
  width: 100%;
  background-image: url("../assets/img/banner2.png");
  background-size: 100% 100%;
}
.button_wrap2 {
  justify-content: space-around;
  height: 243px;
}
.toptip {
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  color: white;
  height: 70px;
  line-height: 70px;
}
.list_wrap .flex {
  border-bottom: 1px solid #e6d7c5;
  height: 150px;
}
ul.flex {
  padding: 0;
  margin: 0;
}
.face {
  height: 100%;
  align-items: center;
  padding-left: 26px;
}
.face img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.info {
  line-height: 30px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}
.info p {
  margin: 0;
}
.msg p {
  margin: 0;
  text-align: center;
  color: white;
  font-size: 31px;
  height: 42px;
  line-height: 42px;
}
.info .name {
  color: #8d5d07;
  font-size: 26px;
}
.info .phone {
  color: #998f7d;
  font-size: 26px;
}
.info .state {
  color: #a8a6a4;
  font-size: 26px;
}
.info .state.active {
  color: #cb3c11;
  font-size: 26px;
}
.right {
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
}
.right a {
  border: 2px solid #cb3c11;
  height: 52px;
  padding: 0 32px;
  font-size: 25px;
  line-height: 52px;
  margin-right: 32px;
  border-radius: 26px;
  color: #cb3c11;
}
.right a.disagree {
  border: 2px solid #a8a6a4;
  color: #a8a6a4;
}
.button_wrap .button {
  padding: 0px 36px;
  border-radius: 37px;
  margin-top: 125px;
  height: 65px;
  color: #cb3c11;
  font-size: 30px;
  font-weight: bold;
  line-height: 67px;
  background-image: url("../assets/img/button1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.button_wrap2 .button {
  padding: 0px 76px;
  border-radius: 37px;
  margin-top: 55px;
  height: 82px;
  color: #cb3c11;
  font-size: 30px;
  font-weight: bold;
  line-height: 82px;
  background-image: url("../assets/img/button2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.button.begin {
  /*margin-right: 75px;*/
}
ul.flex li {
  flex-grow: 1;
  list-style: none;
  text-align: center;
  font-size: 30px;
  padding: 20px 0 20px;
}
ul.flex li.active {
  border-bottom: 3px solid #cb3c11;
  color: #cb3c11;
}
</style>
