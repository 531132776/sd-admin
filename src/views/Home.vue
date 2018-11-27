<template>
  <div class="home">
      <el-container>
        
          <!-- <el-header>
          </el-header> -->
          <!-- <el-container> -->
            <el-aside  style="background-color:#20222A;color:#fff;height:100vh;">
              <el-row class="tac">
                    <el-col :span="24">
                        <h1 class="ml-20">HS管理系统</h1>
                      <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#20222A" 
                        text-color="#fff"
                        :unique-opened="true"
                        :default-active="routePath"  
                        :default-openeds="routeIndex"
                        active-text-color="#409EFF" 
                        router
                        @open="handleOpen"
                        @close="handleClose"
                        @select="selectIndex">
                        <!-- permissionList循环 -->
                        <!-- {{$route.path}} -->
                        <el-submenu :index="item.currentLevel+'-'+idx" :key="item.id" v-for="(item,idx) in permissionList">
                          <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>{{$t(item.permissionName)}}</span>
                          </template>
                          <el-submenu v-if="item2.children.length>0" :index="item2.currentLevel+'-'+idx2" v-for="(item2,idx2) in item.children" :key="item2.id">
                              <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>{{$t(item2.permissionName)}}</span>
                              </template>

                              <el-menu-item :index="item3.permissionUrl" v-for="(item3) in item2.children" :key="item3.id" v-if="item3.permissionUrl!=null">
                                <!-- {{$route.path == item3.permissionUrl}} -->
                                {{$t(item3.permissionName)}}
                              </el-menu-item>                         
                          </el-submenu>
                          <el-menu-item v-if="item2.children.length==0" :index="item2.permissionUrl" v-for="(item2) in item.children" :key="item2.id">
                                <template slot="title">
                                  <i class="el-icon-document"></i>
                                  <span>{{$t(item2.permissionName)}}</span>
                                </template>
                          </el-menu-item> 
                        </el-submenu>
                      </el-menu>
                    </el-col>
                  </el-row>
            </el-aside>
            <el-main style="height:100vh;" v-loading="loading" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div class="main-header">
                  <el-button class="mr-10" @click="changeLanguage">{{$i18n.locale === "zh" ? 'English' : 'Chinese' }}</el-button>
                    <!-- <a href="javascript:void(0);">消息</a>
                    <a href="javascript:void(0);">客服接单列表</a> -->
                    <el-button type="text" @click="loginOut()">{{$t('exit')}}</el-button>

                    <!-- <el-dropdown>
                        <span class="el-dropdown-link">
                          {{$t('username')}}<i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>个人详情</el-dropdown-item>
                          <el-dropdown-item>修改手机号码</el-dropdown-item>
                          <el-dropdown-item>修改手机号码</el-dropdown-item>
                          <el-dropdown-item>
                            <el-button type="text" @click="loginOut()" style="display:block;width:100%;text-align:left;">{{$t('exit')}}</el-button>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </div>
                <!--子路由插座-->
                <router-view/>
            </el-main>
          <!-- </el-container> -->
      </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permissionList: [],
      routePath:'',
      routeIndex:[]
    };
  },
  computed: {
    loading() {
      return this.$store.state.loadingState;
    }
  },
  mounted() {
    this.routePath=this.$route.fullPath;
    this.routeIndex = this.$store.getters.getRouteIndex;
    setTimeout(() => {
      this.permissionList = this.$store.getters.getPermissionList;
    }, 300);
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      // console.log(this.$router);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changeLanguage() {
      console.log("切换语言", this.$i18n.locale);
      this.$i18n.locale = this.$i18n.locale === "zh" ? "en" : "zh";
    },
    // getPermissionList() {//获取资源列表
    //   this.$axios
    //     .post("/api/pc/get/permissions")
    //     .then(res => {
    //       if (res.result == 0) {
    //         this.permissionList = res.dataSet;
    //       }
    //     })
    //     .catch(err => this.$message.error(err.message));
    // },
    selectIndex(index,indexPath){
      // console.log( index,indexPath  )
      this.$store.dispatch('setRouteIndex',indexPath);
      // if(index != '/home/innerUser'){
        if( indexPath.length>2){ //当前点击为三级,设置页面增删改查权限
          let arr = this.permissionList[indexPath[0].split('-')[1]].children[indexPath[1].split('-')[1]].children;
          arr.forEach(element => {
            if(element.permissionUrl == index){
              this.$store.dispatch('addPermission',element.children);
              if(element.children.length>0){
                element.children.forEach((ele)=>{
                  // console.log(ele.permissionCode.split(':')[1])
                  let str = ele.permissionCode.split(':')[1];
                  this.$store.dispatch('setpermissionCode',str);
                })
              }else{
                this.$store.dispatch('setpermissionCode',null);
              }
              localStorage.setItem("store",JSON.stringify(this.$store.state));
            }
          });
        }else{
            let arr = this.permissionList[indexPath[0].split('-')[1]].children;
            arr.forEach(element=>{
              if(element.permissionUrl == index){
                this.$store.dispatch('addPermission',element.children);
                localStorage.setItem("store",JSON.stringify(this.$store.state))
              }
            })
          }
      // }
    },
    loginOut(){
      console.log('logout')
      this.$axios
        .post("/api/pc/logout")
        .then(res => {
          if (res.result == 0) {
            this.$message.success(res.message);
            this.$router.replace({name:'login'});
          }
        })
        .catch(err => this.$message.error(err.message));      
    }
  },
  beforeCreate() {
    //  this.$axios.get('/api/kinds').then(res=>this.options=res.data.children);
  }
};
</script>
<style scoped lang="less">
div.home {
  a {
    text-decoration: none;
    &.router-link-exact-active {
      color: #95c9ff;
    }
  }
  .el-menu-vertical-demo {
    border-right: none;
  }

  .main-header {
    height: 50px;
    margin: -20px -20px 0 -20px;
    padding-right: 30px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > a {
      color: #606266;
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
</style>
