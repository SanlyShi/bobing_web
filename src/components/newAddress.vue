<template>
  <div id="newaddress">
    <div class="content">
      <p class="name">
        <span>收件人</span>
        <span><input type="text" placeholder="你的姓名" v-model="name"/></span>
      </p>
      <p class="tel">
        <span>联系方式</span>
        <span><input type="number" value="" placeholder="你的手机号" @blur="phones" v-model="mobile" class="phones"/></span>
      </p>
      <p class="address">
        <span @click="select">收货地址</span>
        <span @click="select" class="cityadd onSelImp">
  <span @click="select" class="citys">{{provinc?(provinc+city+district):"请选择"}}</span>
          <img src="https://jymall.oss-cn-beijing.aliyuncs.com/mooncake/right.png" slot="icon" />
  </span>
        <textarea name="" placeholder="请输入详细信息" v-model="textareas"></textarea>
      </p>
      <!--<p>-->
        <!--<span>设为默认地址</span>-->
        <!--<input type="radio" value="" class="radio" :class="{'col':bol}" @click="defaults"/>-->
      <!--</p>-->
    </div>
    <div class="footer">
      <p><input type="button" value="完成" @click="save"/></p>
    </div>
    <!--弹出框-->
    <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup' closeOnClickModal>
      <div class="popupTop">
        <p class="cancle" @click="cancle">取消</p>
        <p class="ok" @click="rights">确定</p>
      </div>
      <div class="addlit">
        <mt-picker :slots="slots" value-key='addressName' @change="changeadd"></mt-picker>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { Popup, Picker } from "mint-ui";
  import slot from "../address";

  export default {
    data() {
      return {
        titleMsg: "",
        textareas: "",
        popupVisible: false,
        bol: false,
        bolnum: "",
        mobile: "",
        name: "",
        add: "",
        token: "",
        slots: [
          {
            flex: 1,
            values: slot, //引入省市区数据\
            defaultIndex: 1,
            className: "slot1",
            textAlign: "center"
          },
          {
            divider: true,
            content: "-",
            className: "slot2"
          },
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: "slot3",
            textAlign: "center"
          },
          {
            divider: true,
            content: "-",
            className: "slot4"
          },
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: "slot5",
            textAlign: "center"
          }
        ],
        provinc: "",
        provinc1: "",//过渡用数据，点击确定的时候赋值给正式数据
        city: "",
        district: "",
        district1: "",
        districtId: "",
        provId: "",
        cityId: "",
        districtId1: "",//过渡用数据，点击确定的时候赋值给正式数据
        provId1: "",//过渡用数据，点击确定的时候赋值给正式数据
        cityId1: "",//过渡用数据，点击确定的时候赋值给正式数据
        prov: "",
        city1: "",//过渡用数据，点击确定的时候赋值给正式数据
        picker: ""
      };
    },
    mounted() {
      this.token = sessionStorage.getItem("token");
      let adds = sessionStorage.getItem("add");
      this.add = JSON.parse(adds);
      let bol = JSON.parse(sessionStorage.getItem("bol"));
      if (this.add == null || this.add == "" || this.add == undefined) {
        this.titleMsg = "新增地址";
      } else {
        this.titleMsg = "编辑地址";
      }
      if (bol === 1) {
        sessionStorage.removeItem("bol");
        if (this.add) {
          this.name = this.add.name;
          this.mobile = this.add.mobile;
          this.provinc = this.add.provinceName;
          this.city = this.add.cityName;
          this.district = this.add.districtName
          this.textareas = this.add.addressDetail;
          this.provId = this.add.provinceId;
          this.cityId = this.add.cityId;
          this.districtId = this.add.districtId;

          if (this.add.defAddr == 1) {
            this.bol = true;
            this.bolnum = 1;
          }
        }
      }

    },
    watch: {
      provId1(newValue, oldValue) {
        // console.log("触发选择省份", newValue);
        this.slots[0].values.forEach(element => {
          if (element.provinceId  == newValue) {
            this.provinc1 = element.addressName;
            this.picker.setSlotValues(1, element.addressList);
          }
        });
      },
      cityId1(newValue, oldValue) {
        // console.log("触发选择城市", newValue);
        let arr = this.picker.getSlotValues(1);
        // console.log("cs", this.picker.getSlotValues(1));
        arr.forEach(element => {
          if (element.cityId == newValue) {
            // console.log("element", element);
            this.city1 = element.addressName;
            this.picker.setSlotValues(2, element.addressList);
            // this.slots[2].values=element.addressList[0].addressList
          }
        });
      }
    },
    methods: {
      //城市地区选择
      changeadd(picker, values) {
        // console.log(picker);
        // console.log(values);
        this.picker = picker;
        this.provId1 = values[0].provinceId;
        if (values[1]) {
          this.cityId1 = values[1].cityId;
        }
        if (values[2]) {
          this.districtId1 = values[2].districtId;
          this.district1 = values[2].district;
        }
      },
      cancle() {
        this.popupVisible = false;
        //   this.provinc = "";
        //   this.district = "";
        //   this.city = "";
        //   this.districtId = "";
        //   this.provId = "";
      },
      rights() {
        this.provinc = this.provinc1
        this.district = this.district1
        this.city = this.city1
        this.districtId = this.districtId1
        this.provId = this.provId1
        this.cityId = this.cityId1
        this.popupVisible = false;
      },
      //默认地址
      defaults() {
        if (!this.bol) {
          this.bol = true;
          this.bolnum = 1;
        } else {
          this.bol = false;
          this.bolnum = 0;
        }
        // 				if(!this.bol) {
        // 					this.bol =true
        // 					this.bolnum=1;
        // 					this.$axios({
        // 						method:'post',
        // 						url:'/member/editDefAddr',
        // 						responseType: 'json',
        // 						data:{
        // 							token:this.token,
        // 							addrId:this.add,
        // 						}
        // 					}).then(data=>{
        // //						console.log(data)
        // 					}).catch(err=>{
        // 						console.log(err)
        // 					})

        // 				} else {
        // 					this.bol = false
        // 					this.bolnum=0;
        // 				}
      },
      //返回
      backgo() {
        this.$router.go(-1);
      },
      //电话验证
      phones() {
        var reg = /^1[1-9]\d{9}$/;
        if (!reg.test(this.mobile)) {
          document.getElementsByClassName("phones")[0].style.border =
            "1px solid red";
          alert("号码不正确");
        } else {
          document.getElementsByClassName("phones")[0].style.border = "none";
        }
      },
      //保存
      save() {



        //去除详细地址的空格
        let cityadd = document.getElementsByClassName("cityadd")[0];
        let token = sessionStorage.getItem("token");
        let postAddData = {
          name: this.name,
          mobile: this.mobile,
          defAddr: 1,
          token: token,
          addressDetail: this.textareas,
          cityId: this.cityId,
          districtId: this.districtId,
          provinceId: this.provId
        };
        // console.log(this.add);
        this.$axios({
          url: "member/addMemAddress",
          method: "post",
          responseType: "json",
          data: postAddData
        })
          .then(data => {
            // alert('默认地址新增成功')
            this.$emit('saveClear',this.name,this.mobile,this.provinc+this.city+this.district+this.textareas);
          })
          .catch(err => {
            console.log(err);
          });



        // this.$emit('saveClear',this.name,this.mobile,this.provinc+this.city+this.district+this.textareas);

      },
      select() {
        this.popupVisible = true;
      }
    }
  };
</script>
<style scoped lang="scss">
  .onSelImp {
    overflow: visible;
    display: inline-block;
    width: 510px;
    margin-top: -0.1rem;
    vertical-align: top;
  }

  #newaddress {
    overflow: hidden;
    position: fixed;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
    width: 700px;
    padding-top: 200px;
    padding-left: 25px;
    padding-right: 25px;
    height: 1134px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    input{
      border: none;
    }
    .popup {
      width: 100%;
      font-size: 0.5rem;
      text-align: center;
      padding: 10px;
      .addlit {
        height: 5rem;
      }
      .popupTop {
        display: flex;
        justify-content: space-around;
        p {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 0.2rem;
          font-size: 0.4rem;
          width: 1.73rem;
        }
      }
    }
    .header {
      background: white;
      padding: 10px;
      color: black;
      font-size: 0.6rem;
      border-bottom: 1px solid #eee;
    }
    .content {
      background: white;
      font-size: 0.4rem;
      border-radius: 25px;
      p {
        padding: 10px;
        span:nth-child(1) {
          margin-right: 0.5rem;
        }
        input {
          padding: 10px;
          outline: none;
        }
      }
      .name {
        padding: 20px 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eeeeee;
        span:nth-child(1) {
          display: inline-block;
          width: 1.6rem;
        }
      }
      .tel {
        margin-top: 10px;
        border-bottom: 1px solid #eeeeee;
        span:nth-child(1) {
          display: inline-block;
          width: 1.6rem;
        }
      }
      .address {
        margin-bottom: 0;
        padding-bottom: 40px;
        span:nth-child(1) {
          display: inline-block;
          width: 1.6rem;
        }
        textarea {
          resize: none;
          width: 500px;
          height: 2rem;
          padding: 0;
          margin: 10px;
          padding-top: 10px;
          margin-left: 175px;
          background-color: rgb(250,250,250);
          border: solid 1px rgb(250,250,250);
          border-radius: 20px;
          font-size: .35rem;
          /*margin-top: 0.3rem;*/
          outline: none;
        }
        .citys {
          display: inline-block;
          width: 50%;
          color:  rgb(117,117,117);
          padding-top: 7px;
        }
        span:nth-child(2) {
          overflow: hidden;
          span {
            padding-left: 10px;
            display: inline-block;
            width: 440px;
            line-height: .6rem;
          }
          img {
            width: 0.2rem;
            float: right;
            margin-top: 0.2rem;
          }
        }
      }

    }
    .footer {
      width: 100%;
      border-radius: 25px;
      margin-top: -40px;
      padding: 10px 0;
      background-color: #ffffff;
      text-align: center;
      p {
        margin: auto;
        input {
          width: 90%;
          padding: 10px;
          color: white;
          background: #f22d07;
          border-radius: 25px;
          font-size: 0.5rem;
        }
      }
    }
  }
</style>
