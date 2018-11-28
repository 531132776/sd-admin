<template>
  <div class="login">
    <div class="login-window">
      <div class="title">welcome hi sandy</div>
      <div class="in">
          <!-- <input type="text" v-model.trim="loginInfo.username" placeholder="account" style="margin:24px 0 20px 0;"> -->
          <el-input type="text" class="username" v-model.trim="loginInfo.username" placeholder="account" style="margin:24px 0 20px 0;"></el-input>
      </div>
      <div class="in">
        <!-- <input type="password" v-model.trim="loginInfo.password" @keyup.enter="submitForm" placeholder="password"> -->
            <el-input type="password" class="password" v-model.trim="loginInfo.password" @keyup.enter.native="submitForm" placeholder="password"></el-input>
      </div>
      <div class="forget">
        <label for="">
          <!-- <input type="checkbox" v-model="remember" /><span>remember</span> -->
          <el-checkbox v-model="remember">remember</el-checkbox>
        </label>
        <span>Forgot password</span>
      </div>
      <div class="btn" @click="submitForm">Login</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Login',
  components: {
    // HelloWorld
  },
  data(){
    return {
      message:'hello',
      loginInfo:{
        username:'',
        password:''
      },
      remember:false,
      permissionList:[],
      routePath:'',
      routeIndex:[]
    }
  },
  computed:{
    msg(){
      return this.message+"1234";
    }
  },
  mounted(){
    this.getCookie();
  },
  methods:{
    submitForm() {
        //保存的账号
        var name=this.loginInfo.username;
        //保存的密码
        var pass=this.loginInfo.password;
        if(name==''||name==null){
          this.$message({
          message: '请输入正确的用户名',
          type: 'warning'
        });
          return
        }else if(pass==''||pass==null) {
          this.$message({
          message: '请输入正确的密码',
          type: 'warning'
        });
          return
        }
        //判断复选框是否被勾选 勾选则调用配置cookie方法
        if(this.remember==true){
            //传入账号名，密码，和保存天数3个参数
          this.setCookie(name,pass,7);
        }
        //接口
        this.$axios.post('/api/pc/login',this.$qs.stringify(this.loginInfo))
          .then(res=>{
            console.log(res)
            sessionStorage.setItem('accessToken','DFSAGHJKFHSDJKG');
            if(res.result !== 1002){
             this.$message({
                message: '用户名或密码错误,请重新输入',
                type: 'warning'
              });
              this.loginInfo.username='';
              this.loginInfo.password='';
              return
            } else{
              this.$message({
                message: '登入成功',
                type: 'success'
              });
              this.getPermissionList();
            }
      })
      .catch(err=>this.$message.error(err.message));
    },
//设置cookie
  setCookie(c_name,c_pwd,exdays) {
    var exdate=new Date();//获取时间
    exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
    //字符串拼接cookie
    window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
    window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
  },
  //读取cookie
  getCookie:function () {
    if (document.cookie.length>0) {
      var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
      for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='userName'){
          this.loginInfo.username=arr2[1];//保存到保存数据的地方
        }else if(arr2[0]=='userPwd'){
          this.loginInfo.password=arr2[1];
        }
      }
    }
  },
  //清除cookie
  clearCookie:function () {
    this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
  },

    login(){
      this.$axios.post('/api/pc/login',this.$qs.stringify(this.loginInfo)).then(res=>{
                  this.getPermissionList(); 
                  sessionStorage.setItem('accessToken','DFSAGHJKFHSDJKG');
                  // this.$router.replace({name:'home'});                        

               }).catch(err=>this.$message.error(err.message));
    },
    getPermissionList() {
      //获取资源列表
      this.$axios
        .post("/api/pc/get/permissions")
        .then(res => {
          if (res.result == 0) {
            if( res.dataSet == null || res.dataSet.length == 0){
              this.$message.warning(this.$t('Nopermission'));
              return false;
            }else{
              console.log('-----------------------login---------------------------')
              this.permissionList = res.dataSet;
              let arr = [];//处理四级/三级增删改查的权限，和第一个要跳转的路径
              res.dataSet[0].children.forEach((element,i) => {
                  if(i==0){
                    if(element.children.length==0){
                      arr = res.dataSet[0].children;
                      this.routePath = element.permissionUrl;
                      this.routeIndex = [`1-${i}`,element.permissionUrl];

                    }else if(element.children.length>0){
                      arr = element.children;
                      element.children.forEach((item,i2)=>{

                        if(i2==0){

                          if(item.children.length==0){
                            arr = element.children;
                            this.routePath = item.permissionUrl;
                            this.routeIndex = [`1-${i}`,`2-${i2}`,item.permissionUrl];

                          }else if( item.children.length>0){
                            arr =  item.children;
                            arr.forEach((item3,i3)=>{

                              if(i3==0){

                                if(item3.permissionUrl!=null && item3.permissionUrl!=""){
                                  this.routePath = item3.permissionUrl;
                                  this.routeIndex = [`1-${i}`,`2-${i2}`];

                                }else{
                                  this.routePath = item.permissionUrl;
                                  this.routeIndex = [`1-${i}`,`2-${i2}`,item.permissionUrl];
                                }
                              }
                            })
                          }
                        }
                      })
                    }
                  }
              });

              this.$store.dispatch('addpermissionList',res.dataSet);
              this.$store.dispatch('addPermission',arr);
              this.$store.dispatch('setRoutePath',this.routePath);
              this.$store.dispatch('setRouteIndex',this.routeIndex);
              if(arr.length>0){
                arr.forEach((ele)=>{
                  if( ele.permissionCode!=''||ele.permissionCode!=null){
                    if(ele.permissionCode.split(':')[1]=='add'||ele.permissionCode.split(':')[1]=='update'||ele.permissionCode.split(':')[1]=='detail'||ele.permissionCode.split(':')[1]=='delete'){
                      this.$store.dispatch('setpermissionCode',ele.permissionCode.split(':')[1]);
                    }
                  }
                })
              }else{
                this.$store.dispatch('setpermissionCode',null);
              }

              localStorage.setItem("store",JSON.stringify(this.$store.state))
              // console.log( this.routePath ,'this.routePath')
              this.$router.replace({path:this.routePath }) 
            } 
          }
        })
        .catch(err => this.$message.error(err.message));
    }

  }
}
</script>
<style lang="less">
  .forget > label .el-checkbox__input.is-checked .el-checkbox__inner{
            background-color: rgba(0,182,96,1);
            border-color: rgba(0,182,96,1);
          }
         
  .password > .el-input__inner:focus,
  .password > .el-input__inner:hover{
    border-color: #00b660
  }
   .username > .el-input__inner, .password > .el-input__inner{
    width:418px;
          height:61px;
          border-radius:8px;
          border:1px solid rgba(0,182,96,1);
          font-size:18px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          outline:none;
          text-indent:12px;
    }
  .login{
    width:100vw;
    height:100vh;
    background:url('../assets/images/login.png');
    display: flex;
    justify-content: center;
    align-items: center;
    >.login-window{
      width:596px;
      height:420px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 6px 0px rgba(153,153,153,1);
      border-radius:8px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      >.title{
        height:49px;
        font-size:42px;
        font-family:Bauhaus;
        color:rgba(0,147,69,1);
        line-height:49px;
        display: flex;
        justify-content: center
        
      }
      >.in{
        .username{
          .el-input__inner{

          
            width:418px;
            height:61px;
            border-radius:8px;
            border:1px solid rgba(0,182,96,1);
            font-size:18px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            outline:none;
            text-indent:12px;
        }
        }
      
      }
      >.forget{
        margin:8px 0 41px 0;
        width: 418px;
        display: flex;
        justify-content: space-between;
        >label{
          padding-left:12px;
          display: flex;
          align-items: center;
          input[type="checkbox"]{
            width:19px;
            height:20px;
            background:rgba(255,255,255,1);
            border-radius:3px;
            border:1px solid rgba(204,204,204,1);
          }
        }
        span{
          font-size:16px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:22px;
          >.el-checkbox__inner{
            width: 18px;
            height: 18px;
          }
          
          .el-checkbox__inner::after{
              height: 10px;
              left: 6px;
            }
        }
        >span{
          padding-right:12px;
        }
      }
      >.btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width:418px;
        height:61px;
        /* background:rgba(0,147,69,1); */
        background:rgba(0,182,96,1);
        border-radius:8px;
        font-size:32px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:45px;
        cursor:pointer;
      }
    }
  }

  

</style>
