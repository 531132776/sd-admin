<template>
  <div class="inner-user">
    <div class="header d_flex flex_wrap20">

          <el-button type="success" @click="addInnerUser" :disabled="boolList['add']" style="margin-right:15px">{{$t('Addinternalusers')}}</el-button>

           <el-input v-model.trim="pagination.keyword" :placeholder="$t('Pleaseentermobilenumber')" @change="loadInnerUserList">
               <el-button slot="append" icon="el-icon-search"  @click="loadInnerUserList"></el-button>
           </el-input>

    </div>
    <el-table :data="innerUserList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
      size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="usercode" :label="$t('account')" header-align="center" align="center" width="177">
      </el-table-column>
      <el-table-column prop="mobile" :label="$t('telephone')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="city" :label="$t('city')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="gold" :label="$t('integral')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('registerTime')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="roleName" :label="$t('role')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small" :disabled="boolList['detail']" :style="{'color':'#00B660'}">{{$t('edit')}}</el-button>
          <el-button @click="deleteUser(scope.row)" type="text" size="small" :disabled="boolList['delete']" >{{$t('delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
        :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
    <!-- 新增，查看，修改 内部用户 -->
    <el-dialog :title="$t('User')" :visible.sync="dialogVisible" >
      <el-form :data="currentUser" ref="formsd" label-width="150px">
        <el-row>
          <el-col>
            <el-form-item>
              <span slot="label">{{$t('avatar')}}</span>
              <el-upload name="submitFile" class="avatar-uploader" action="/api/pc/file/upload" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imgSrc" :src="imgSrc" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">{{$t('account')}}</span>
              <el-input v-model="currentUser.usercode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('name')}}</span>
              <el-input v-model="currentUser.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">{{$t('telephone')}}</span>
              <el-input v-model="currentUser.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('lockAccount')}}</span>
              <el-select v-model="currentUser.locked">
                <el-option :label="$t('Unlocked')" :value="0"></el-option>
                <el-option :label="$t('Locked')" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">{{$t('city')}}</span>
              <!-- <el-input v-model="currentUser.city"></el-input> -->
              <el-select v-model="currentUser.city" :placeholder="$t('choose')" @change="getCityIndex" >
                  <el-option
                    v-for="(item) in cityList"
                    :key="item.id"
                    :label="item.cityNameCn"
                    :value="item.cityNameCn"
                    >
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('community')}}</span>
              <!-- <el-input v-model="currentUser.community"></el-input> -->
              <el-select v-model="currentUser.community" :placeholder="$t('choose')" @change="getCommuIndex">
                  <el-option
                    v-for="(item) in communityList"
                    :key="item.id"
                    :label="item.cityNameCn"
                    :value="item.cityNameCn">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">{{$t('subCommunity')}}</span>
              <el-select v-model="currentUser.subCommunity" :placeholder="$t('choose')"  >
                  <el-option
                    v-for="(item) in subCommunityList"
                    :key="item.id"
                    :label="item.cityNameCn"
                    :value="item.cityNameCn">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('integral')}}</span>
              <el-input v-model="currentUser.gold"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">{{$t('role')}}</span>
                <el-select v-model="currentUser.roleId" :placeholder="$t('choose')" >
                  <el-option
                    v-for="(item) in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'innerUser',
    data() {
      return {
        loading: true,
        dialogVisible: false,
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          keyword:''
        },
        innerUserList: [],
        currentUser: {// 当前用户
          userLogo: '',
          gold: 0,
          createTime: '',
          locked: 0,
          community: '',
          subCommunity: '',
          city: '',
          username: '',
          mobile: '',
          roles:''
        },
        imgSrc: '',//头像
        roleList:[],
        searchVal:{
            isForbidden:null,
            // pageIndex:1,
            // pageSize:100,
            // total:100,
        },
        cityList:[],
        communityList:[],
        subCommunityList:[],
        boolList:{
          add:!this.$store.state.add,
          update:!this.$store.state.update,
          detail:!this.$store.state.detail,
          delete:!this.$store.state.delete
          }
      }
    },
    mounted(){
      this.queryRoleList();
      this.getCities();
      let _this = this;
    },
    methods: {
      loadInnerUserList() {
        this.loading = true;
        this.$axios.post('/api/pc/user/list', this.$qs.stringify(this.pagination))
          .then(res => {
            this.innerUserList = res.dataSet || [];
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.loading = false);
      },

      addInnerUser() {//新增内部用户
        this.dialogVisible = true;
        this.currentUser = {};

      },
      edit(row) {//查看,编辑内部用户
        this.dialogVisible = true;    
        this.$axios.post(`/api/pc/user/detail/${row.userId}`)
          .then(res => {
            this.currentUser = res.dataSet;
            this.$set(this, 'imgSrc', res.dataSet.userLogo);
          });
      },
      deleteUser(row) {
        this.$confirm(this.$t('Suretodeletetherole'), this.$t('prompt'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
        }).then(() => {
            this.$axios
                .post("/api/pc/user/delete",
                this.$qs.stringify({
                    userId:row.userId
                })
                )
                .then(res => {
                    this.$message.success(this.$t('Deletedsuccessfully'));
                    this.loadInnerUserList();
                })
                .catch(err => this.$message.error(err.message));                     
        }).catch(() => { });        
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadInnerUserList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadInnerUserList();

      },
      beforeAvatarUpload(file) {//上传前校验格式大小
        /**
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
         return isJPG && isLt2M;
         */
        return true;

      },
      handleAvatarSuccess(res, file) { //成功上传
        // console.log('uploadImg:', res)
        this.imgSrc = URL.createObjectURL(file.raw);
        this.$set(this.currentUser, 'userLogo', res.fid);
      },
      cancel() {//取消
        this.dialogVisible = false;
        this.currentUser = {
          userLogo: '',
          gold: 0,
          createTime: '',
          locked: 0,
          community: '',
          subCommunity: '',
          city: '',
          username: '',
          mobile: ''
        }
      },
      confirm() {//新增，编辑，查看用户详情,根据userId区分
        this.dialogVisible=false;
        let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });

        this.currentUser.roles = this.currentUser.roleId;

        //校验参数
        if (this.currentUser.userId) {//编辑, 查看
          this.$axios.post('/api/pc/user/update', this.$qs.stringify(Object.assign(this.currentUser,{id:this.currentUser.userId})))
            .then(res => { 
              this.$message({type:'success',message:res.message});
              this.loadInnerUserList();
            })
            .catch(err =>this.$message.error(err.message))
            .finally(() => this.$nextTick(() => {
              loadingInstance.close();

            }));
        } else {//新增
          this.$axios.post('/api/pc/user/add', this.$qs.stringify(this.currentUser))
            .then(res => {
              this.$message({type:'success',message:res.message});
              this.loadInnerUserList();
             })
            .catch(err =>this.$message.error(err.message))
            .finally(() => this.$nextTick(() => {
              loadingInstance.close();
            }));
        }

      },
              // 请求角色列表
      queryRoleList(){
          this.$axios
              .post("/api/pc/role/list",
              this.$qs.stringify(this.searchVal)
              )
              .then(res => {
                  this.roleList = res.dataSet;
              })
              .catch(err => this.$message.error(err.message));            
      },
      getCities(){ //获取城市，区域，子社区
          this.$axios
              .post("/api/pc/support/cities",
              )
              .then(res => {
                  this.cityList = res.dataSet;
              })
              .catch(err => this.$message.error(err.message));        

      },
      getCityIndex(val){ //勾选城市后出来区域
        this.communityList = [];
        this.cityList.forEach( (ele,i)=>{
            if(ele.cityNameCn == val){
              this.communityList = this.cityList[i].sub;
            }
          })
      },
      getCommuIndex(val){ //勾选区域出来子社区
          this.subCommunityList = [];
          if( this.communityList.length>0){
            this.communityList.forEach((ele,i)=>{
              if( ele.cityNameCn == val ){
                this.subCommunityList = this.communityList[i].sub;
              }
            })
          }
      },
    },
    beforeMount() {
      this.loadInnerUserList();
    }
  }
</script>
<style scoped lang="less">
  .inner-user {

    >.header {
      /* margin: 5px 0; */
      margin-bottom: 5px;
    }

    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 48px;

      >.credent {
        width: 48px;
        height: 48px;
        border: 1px dashed #ccc;
      }

      >.address {
        width: 158px;
        height: 48px;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        >.code {
          padding: 0;
          margin: 0;
          width: 100%;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #00B660;
        }

        >.detail-addr {
          padding: 0;
          margin: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }

      }

      >.type {
        font-size: 10px;

        /**出租*/
        >.lease-type {
          width: 32px;
          height: 16px;
          border-radius: 3px;
          color: #FFFFFF;
          background: rgba(0, 182, 96, 1);
        }

        /**出售*/
        >.sell-type {
          width: 32px;
          height: 16px;
          border-radius: 3px;
          color: #FFFFFF;
          background-color: rgba(243, 151, 0, 1);
        }
      }
    }

    .phone {
      display: flex;
      flex-direction: column;
      justify-content: left;
      height: 100%;

      /* border-left:1px solid #E5E5E5;
                    border-right:1px solid #E5E5E5; */
      >span {
        color: #666666;
        font-size: 12px;

        /* padding: 8px 0; */
        >i {
          color: #007AFF;
        }
      }

      >span:nth-child(1) {
        border-bottom: 1px solid #E5E5E5;
      }
    }

    >.page {
      text-align: right;
      padding: 10px 0;
    }

    .avatar-uploader {
      width: 100px;
      height: 100px;
      border: 1px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;

      img.avatar {
        width: 100%;
        height: 100%;
      }
    }

  }
</style>