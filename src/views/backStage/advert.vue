<!-- 网站管理-广告数据管理 -->
<template>
  <div class="advert">
    <div class="header">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="success" @click="addAdvert">{{$t('addBtn')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="advertList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
      size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="adShortTitle" :label="$t('adTtitle')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="adSn" :label="$t('sort')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="adType" :label="$t('addType')" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.adType===1">{{$t('img')}}</span>
          <span v-else>{{$t('theText')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('img')" header-align="center" align="center">
        <template slot-scope="scope">
          <img class="list" v-bind:src="scope.row.adImgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column :label="$t('adStatus')" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.adState===0">{{$t('enable')}}</span>
          <span v-else>{{$t('disable')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('createTime')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="isDel" :label="$t('isDelete')" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel===0">{{$t('notDelete')}}</span>
          <span v-else>{{$t('deleted')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
          <el-button @click="deleteAdvert(scope.row)" type="text" size="small">{{$t('delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
        :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <!-- 查看，编辑,新增 -->
    <el-dialog :title="advert.id ? '编辑查看广告' : '新增广告'" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">Type:</span>
              <el-select v-model="advert.adType">
                <el-option :label="$t('img')" :value="1"></el-option>
                <el-option :label="$t('theText')" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="advert.adType===2" :span="10" :offset="1">
            <el-form-item>
              <span slot="label">Content:</span>
              <el-input v-model="advert.adContent"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="advert.adType===1" :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('img')}}:</span>
              <el-upload name="submitFile" class="advert-uploader" action="/api/pc/file/upload" :show-file-list="false"
                :on-success="handleAdvertSuccess" :before-upload="beforeAdvertUpload">
                <img v-if="imageUrl" :src="imageUrl" class="advertImage">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('languageVersion')}}:</span>
              <el-select v-model="advert.languageVersion">
                <el-option label="chinese" :value="0"></el-option>
                <el-option label="english" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('sort')}}:</span>
              <el-input v-model="advert.adSn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">FullTitle:</span>
              <el-input v-model="advert.adFullTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">ShortTitle:</span>
              <el-input v-model="advert.adShortTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">status:</span>
              <el-select v-model="advert.adState">
                <el-option :label="$t('disable')" :value="0"></el-option>
                <el-option :label="$t('enable')" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('isDelete')}}:</span>
              <el-select v-model="advert.isDel">
                <el-option label="no" :value="0"></el-option>
                <el-option label="yes" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item>
              <span slot="label">urlAddress:</span>
              <el-input v-model="advert.adLink"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item>
              <span slot="label">{{$t('contentDescription')}}</span>
              <el-input type="textarea" v-model="advert.adDesc" resize="none"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="submit">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'advert',
    data() {
      return {
        loading: true,
        dialogVisible: false,
        imageUrl: '',
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
        },
        advert: {
          adCCount: 0,
          adContent: null,
          adDesc: "",
          adFCount: 0,
          adFullTitle: "",
          adImgUrl: "",
          adLink: "",
          adShortTitle: "",
          adSn: 0,
          adState: 1,
          adType: 1,
          isDel: 0,
          languageVersion: 0
        },
        advertList: []
      }
    },
    methods: {
      loadAdvertList() {//改为退款审批的接口 
        this.loading=true;
        this.$axios.post('/api/pc/advert/list', this.$qs.stringify(this.pagination))
          .then(res => {
            this.advertList = res.dataSet || [];
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.loading = false);
      },
      changeStatus() {
        this.loading = true;
        //重置pagination参数重新请求
        this.pagination.pageIndex = 1;
        this.pagination.pageSize = 10;
        this.loadAdvertList();
      },
      search() {
        this.loading = true;
        //重置pagination参数重新请求
        this.pagination.pageIndex = 1;
        this.pagination.pageSize = 10;
        this.loadAdvertList();
      },
      addAdvert() {
        this.advert = {
          adCCount: 0,
          adContent: null,
          adDesc: "",
          adFCount: 0,
          adFullTitle: "",
          adImgUrl: "",
          adLink: "",
          adShortTitle: "",
          adSn: 0,
          adState: 1,
          adType: 1,
          isDel: 0,
          languageVersion: 0,
        };
        this.dialogVisible = true;
      },
      view(row) {
        this.$axios.post(`/api/pc/advert/detail/${row.advertId}`)
          .then(res => {
            this.advert = res.dataSet;
            this.imageUrl=res.dataSet.adImgUrl;
            this.dialogVisible = true;
          })
      },
      deleteAdvert(row) {
        this.$confirm('确定要删除该广告？', this.$('prompt'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios
            .post(`/api/pc/advert/delete/${row.advertId}`)
            .then(res => {
              this.$message.success(this.$('Deletedsuccessfully'));
              this.loadAdvertList();
            })
            .catch(err => this.$message.error(err.message));
        });
      },
      beforeAdvertUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return true;
      },
      handleAdvertSuccess(res, file) {// 修改广告图片
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$set(this.advert, 'adImgUrl', res.fid);
      },
      submit() {

        this.dialogVisible = false;
        if (this.advert.id) {//修改
          this.$axios.post('/api/pc/advert/update', this.$qs.stringify({
            id: this.advert.id,
            languageVersion: this.advert.languageVersion,	//string	是	语言版本（0：中文，1：英文）默认为0		
            adFullTitle: this.advert.adFullTitle,//	string	是	广告长标题		
            adShortTitle: this.advert.adShortTitle,//	string	是	广告短标题		
            adType: this.advert.adType,//	string	是	广告类型(1:图片类型, 2:文字类型)		
            adImgUrl: this.advert.adImgUrl,//	string	是	广告图片上传名称(当ad_type=1有效)		
            adContent: this.advert.adContent,//	string	是	广告文字内容(当ad_type=2有效)		
            adSn: this.advert.adSn,//	string	是	排序序号		
            adCCount: this.advert.adCCount,//	string	是	点击次数		
            adFCount: this.advert.adFCount,//	string	是	关注次数		
            adDesc: this.advert.adDesc,//	string	是	广告内容的备注描述		
            adLink: this.advert.adLink,//	string	是	广告内容点击链接的URL地址		
            adState: this.advert.adState,//	string	是	状态(0:未启用 1:启用)		
            isDel: this.advert.isDel
          }))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadAdvertList();
            })
            .catch(err => this.$message.error(err.message));
        } else {//新增
           this.$axios.post('/api/pc/advert/add', this.$qs.stringify(this.advert))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadAdvertList();
            })
            .catch(err => this.$message.error(err.message));
        }
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadAdvertList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadAdvertList();
      },
    },
    beforeMount() {
      this.loadAdvertList();
    }
  }
</script>
<style scoped lang="less">
  .advert {
    >.header {
      margin: 5px 0;
    }

    img.list {
      width: 30px;
      height: 30px;
    }
    .advert-uploader{
      width:100px;
      height:100px;
      border:1px dashed #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      img.advertImage{
        width:100%;
        height:100%;
      }
    }

    >.page {
      text-align: right;
      padding: 10px 0;
    }
  }
</style>