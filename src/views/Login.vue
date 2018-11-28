<template>
  <div class="login">
    <div class="login-window">
      <div class="title">welcome hi sandy</div>
      <div class="in">
          <input type="text" v-model.trim="loginInfo.username" placeholder="account" style="margin:24px 0 20px 0;">
      </div>
      <div class="in">
        <input type="password" v-model.trim="loginInfo.password" @keyup.enter="login" placeholder="password">
      </div>
      <div class="forget">
        <label for=""><input type="checkbox" v-model="remember" /><span>remember</span></label>
        <span>Forgot password</span>
      </div>
      <div class="btn" @click="login">Login</div>
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
    
  },
  methods:{
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
<style scoped lang="less">

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
        input[type="text"],input[type="password"]{
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
        background:rgba(0,147,69,1);
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
