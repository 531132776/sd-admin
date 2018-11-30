<template>
    <div class="personal_center">
        <!-- <div class="personal_pic">
            <img v-lazy="userInfo.userLogo" alt="">
            <div >
                <span class="name">{{userInfo.username}}</span>
                <p>个人积分：<i class="warning">{{userInfo.gold}}</i></p>
            </div>
        </div> -->
        <userInfo></userInfo>
        <!-- <el-tabs v-model="activeName">
            <el-tab-pane label="个人信息" name="first"> -->
                <p class="title">{{$t('Personalinformation')}}</p>
                <div class="personal_detail">
                    <el-form :label-position="labelPosition" label-width="195px" >
                        <el-form-item :label="$t('Nickname')"> {{userInfo.username}} </el-form-item>
                        <el-form-item :label="$t('avatar')"> 
                            <!-- <img class="personal_detail_pic" v-lazy="userInfo.userLogo" alt=""> -->
                            <el-upload
                              name="submitFile"
                              class="avatar-uploader"
                              action="/api/pc/file/upload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="userLogo==''" class="personal_detail_pic" :src="userInfo.userLogo" alt="">
                              <img v-else class="personal_detail_pic" :src="userLogoUrl" alt="">
                              <el-button type="text" class="ml-10" style="vertical-align: text-bottom;">{{$t('Modify')}}</el-button>
                            </el-upload>
                            
                            <el-button type="text" v-if="userLogoBool" @click="updateLogo">{{$t('Reupload')}}</el-button>

                        </el-form-item>
                        <el-form-item :label="$t('Loginmobilenumber')">{{userInfo.mobile}}</el-form-item>
                        <el-form-item :label="$t('telephone')">{{userInfo.mobile}} <el-button type="text" @click="phone_dialog = true">{{$t('Modify')}}</el-button></el-form-item>
                        <el-form-item :label="$t('Loginpassword')">******  <el-button type="text" @click="pwd_dialog = true">{{$t('Modify')}}</el-button></el-form-item>
                    </el-form>
                    
                </div>
            <!-- </el-tab-pane> -->

            <!-- 关单记录 -->
            <!-- <el-tab-pane label="关单记录" name="second">
                <pClostList></pClostList>
            </el-tab-pane> -->

            <!-- 成单结佣记录 -->
            <!-- <el-tab-pane label="成单结佣记录" name="four" v-if="moduleType==2 ">                
                <pCommissionList></pCommissionList>
            </el-tab-pane> -->

            <!-- 排班 -->
            <!-- <el-tab-pane label="月度出勤排班表" name="third" v-if="moduleType!=1">                
                <pSchedule :permission=1></pSchedule>
            </el-tab-pane> -->
        <!-- </el-tabs> -->


        <!-- 修改手机号弹窗 -->
        <el-dialog title="修改手机号" :visible.sync="phone_dialog" >
            <el-form :model="phoneData" :label-position="labelPosition">
                <el-form-item label="请输入密码" :label-width="formLabelWidth" v-if="editPhone_show!==true">
                    <el-input v-model="phoneData.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="请输入新手机号" :label-width="formLabelWidth" v-if="editPhone_show==true">
                    <el-input v-model="phoneDataphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="validateCode_input" label="请输验证码" :label-width="formLabelWidth" v-if="editPhone_show==true">
                    <el-input v-model="phoneDatavalidateCode" autocomplete="off"></el-input>
                    <el-button type="success" @click="sendCode()">发送验证码</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkPassword(phoneData.password)" v-if="editPhone_show!==true">下一步</el-button>
                <el-button type="primary" @click="updatePhone()" v-if="editPhone_show==true">确定</el-button>
            </div>
        </el-dialog>

        <!-- 修改密码弹窗 -->
        <el-dialog title="修改密码" :visible.sync="pwd_dialog" >
            <el-form :model="pwdData" status-icon :label-position="labelPosition" :rules="pwd_rules" ref="pwdData">
                <el-form-item label="当前密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input v-model="pwdData.oldPassword" type="password" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="pwdData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" :label-width="formLabelWidth"  prop="password_confirm">
                    <el-input v-model="pwdData.password_confirm" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updatePwd('pwdData')" >保存</el-button>
            </div>
        </el-dialog>

        <!-- 修改密码成功提示 -->
        
    </div>
</template>

<script>
import userInfo from './userInfo.vue';
import pClostList from './personal_close_list.vue';
import pSchedule from './personal_schedule.vue';
import pCommissionList from './commission_list.vue';

export default {
  components:{
    pClostList,
    pSchedule,
    pCommissionList,
    userInfo
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdData.password_confirm !== "") {
          this.$refs.pwdData.validateField("password_confirm");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "first",
      userInfo: "",
      labelPosition: "right",
      phone_dialog: false,
      formLabelWidth: "120px",
      phoneData: {
        password: "",
        phone: "",
        validateCode: ""
      },
      editPhone_show: false,
      pwd_dialog: false,
      pwdData: {
        oldPassword: "",
        password: "",
        password_confirm: ""
      },
      pwd_rules: {
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirm: [{ validator: validatePass2, trigger: "blur" }]
      },
      moduleType:0,//从哪个模块访问的  0-pc客服 1-pc财务 2-pc内勤
      userLogo:'',
      userLogoUrl:'',
      userLogoBool:false
    };
  },
  created() {
    this.getUserInfo();
    this.moduleType = this.$route.params.type;
    sessionStorage.setItem('closeListType',this.$route.params.type)    
  },
  mounted() {},
  methods: {
    // 获取个人中心会员信息
    getUserInfo() {
      this.$axios
        .post("/api/pc/center/user/info")
        .then(res => {
          this.userInfo = res.dataSet; //获取个人信息
        })
        .catch(err => this.$message.error(err.message));
    },
    // 修改手机号，校验密码
    checkPassword(val) {
      this.$axios
        .post("/api/pc/center/pwd/check", this.$qs.stringify({ password: val }))
        .then(res => {
          if (res.result == 0) {
            this.$message.success(this.$t('pswCheckSuccess'));
            this.editPhone_show = true;
          }
        })
        .catch(err => this.$message.error(err.message));
    },
    // 发送短信验证码
    sendCode() {
      this.$axios
        .post(
          "/api/pc/send/sms/code",
          this.$qs.stringify({ mobile: this.phoneDataphone })
        )
        .then(res => {
          if (res.result == 0) {
            this.$message.success(this.$t('verificationCodeSentSuccess'));
          }
        })
        .catch(err => this.$message.error(err.message));
    },
    // 修改手机号
    updatePhone() {
      this.$axios
        .post(
          "/api/pc/center/phone/update",
          this.$qs.stringify({
            phone: this.phoneDataphone,
            validateCode: this.phoneDatavalidateCode
          })
        )
        .then(res => {
          if (res.result == 0) {
            this.$message.success(this.$t('phoneModifySuccess'));
            this.phone_dialog = false;
          }
        })
        .catch(err => this.$message.error(err.message));
    },
    // 修改密码
    updatePwd(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/api/pc/center/pwd/update",
              this.$qs.stringify({
                oldPassword: this.pwdData.oldPassword,
                password: this.pwdData.password
              })
            )
            .then(res => {
              if (res.result == 0) {
                this.$message.success(this.$t('pswChangeSuccess'));
                this.pwd_dialog = false;
                setTimeout(() => {
                  _this.$alert(this.$t('pswSetSuccess'), this.$t('prompt'), {
                    confirmButtonText: this.$t('IveGotIt'),
                    callback: action => {
                      this.$router.push({ name: "home" });
                    }
                  });
                }, 1000);
              }
            })
            .catch(err => this.$message.error(err.message));
        } else {
          this.$message.error(this.$t('pleaseReEnter'));
          return false;
        }
      });
    },
    // 上传头像
    handleAvatarSuccess(res, file){
      // console.log(res)
      if(res.state==0){
        this.userLogo = res.fid;
        this.userLogoUrl = res.url;
        this.updateLogo();
      }
    },
    beforeAvatarUpload(){

    },
    updateLogo(){
        this.$axios
          .post(
            "/api/pc/center/user/logo/update",
            this.$qs.stringify({ userLogo: this.userLogo })
          )
          .then(res => {
            if (res.result == 0) {
                this.getUserInfo();
                window.location.reload();
            }else{
              this.userLogoBool = true;
            }
          })
          .catch(err => this.$message.error(err.message));
    }
  },
};
</script>


