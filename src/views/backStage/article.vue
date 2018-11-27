<!-- 网站管理-文章管理 -->
<template>
  <div class="article">
    <div class="header">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="success" @click="addArticle">{{$t('addBtn')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagination.status" @change="changeStatus" :placeholder="$t('choose')">
            <el-option :label="$t('disable')" :value="0"></el-option>
            <el-option :label="$t('enable')" :value="1"></el-option>
            <el-option :label="$t('all')" :value="null"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagination.articleType" @change="changeStatus" :placeholder="$t('choose')">
            <el-option :label="$t('buyerToRent')" :value="0"></el-option>
            <el-option :label="$t('buyerToBuy')" :value="1"></el-option>
            <el-option :label="$t('sellerForRent')" :value="2"></el-option>
            <el-option :label="$t('sellerSell')" :value="3"></el-option>
            <el-option :label="$t('FAQPage')" :value="4"></el-option>
            <el-option :label="$t('all')" :value="null"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="articleList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
      size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="articleName" :label="$t('articleName')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('articleType')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.articleType | articleTypeF}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('articleStatus')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status | articleStatusF}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seoTitle" :label="$t('seoTitle')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="seoKeywords" :label="$t('seoKeywords')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('createTime')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
          <el-button @click="deleteArticle(scope.row)" type="text" size="small">{{$t('delete')}}</el-button>
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
    <el-dialog :title="article.id ? '编辑文章' : '新增文章'" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('languageVersion')}}:</span>
              <el-select v-model="article.languageVersion">
                <el-option label="chainese" :value="0"></el-option>
                <el-option label="english" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">Title:</span>
              <el-input v-model="article.articleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">Type:</span>
              <el-select v-model="article.articleType">
                <el-option :label="$t('buyerToRent')" :value="0"></el-option>
                <el-option :label="$t('buyerToBuy')" :value="1"></el-option>
                <el-option :label="$t('sellerForRent')" :value="2"></el-option>
                <el-option :label="$t('sellerSell')" :value="3"></el-option>
                <el-option :label="$t('sellerSell')" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('sort')}}:</span>
              <el-select v-model="article.articleSort">
                <el-option :label="$t('enable')" :value="0"></el-option>
                <el-option :label="$t('disable')" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">Status:</span>
              <el-select v-model="article.status">
                <el-option :label="$t('disable')" :value="0"></el-option>
                <el-option :label="$t('enable')" :value="1"></el-option>
                <el-option :label="$t('deleted')" :value="2"></el-option>
                <el-option :label="$t('Inmodify')" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('seoTitle')}}</span>
              <el-input v-model="article.seoTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('seoKeywords')}}:</span>
              <el-input v-model="article.seoKeywords"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('isDelete')}}:</span>
              <el-select v-model="article.isDel">
                <el-option label="no" :value="0"></el-option>
                <el-option label="yes" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item>
              <span slot="label">{{$t('seoDes')}}:</span>
              <el-input v-model="article.seoDescription" type="textarea" resize="none"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item>
              <span slot="label">Description:</span>
              <el-input v-model="article.articleDesc" type="textarea" resize="none"></el-input>
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
    name: 'articleCtrl',
    data() {
      return {
        dialogVisible: false,
        dialogVisible: false,
        loading: true,
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          status: null,//启用禁用
          articleType: null
        },
        article: {
          articleDesc: "",
          articleName: "",
          articleSort: 0,
          articleType: 4,
          bid: 0,
          isDel: 0,
          languageVersion: 0,
          seoDescription: null,
          seoKeywords: null,
          seoTitle: null,
          standby1: null,
          standby2: null,
          standby3: null,
          standby4: null,
          standby5: null,
          status: 1,
        },
        articleList: []
      }
    },
    methods: {
      loadArticlelList() {//改为退款审批的接口 
        this.loading = true;
        this.$axios.post('/api/pc/article/list', this.$qs.stringify(this.pagination))
          .then(res => {
            console.log(res);
            this.articleList = res.dataSet || [];
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
        this.loadArticlelList();
      },
      search() {
        this.loading = true;
        //重置pagination参数重新请求
        this.pagination.pageIndex = 1;
        this.pagination.pageSize = 10;
        this.loadArticlelList();
      },
      addArticle() {
        this.article = {
          articleDesc: "",
          articleName: "",
          articleSort: 0,
          articleType: 4,
          bid: 0,
          isDel: 0,
          languageVersion: 0,
          seoDescription: null,
          seoKeywords: null,
          seoTitle: null,
          standby1: null,
          standby2: null,
          standby3: null,
          standby4: null,
          standby5: null,
          status: 1,
        };
        this.dialogVisible = true;
      },
      view(row) {
        this.$axios.post(`/api/pc/article/detail/${row.articleId}`)
          .then(res => {
            this.article = res.dataSet;
            this.dialogVisible = true;
          })
          .catch(err => this.$message.error(err.message));
      },
      deleteArticle(row) {
        this.$confirm('确定要删除该文章吗？', this.$t('prompt'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }).then(() => {
          this.$axios
            .post(`/api/pc/article/delete/${row.articleId}`)
            .then(res => {
              this.$message.success(this.$t('Deletedsuccessfully'));
              this.loadArticlelList();
            })
            .catch(err => this.$message.error(err.message));
        });
      },
      submit() {

        this.dialogVisible = false;

        if (this.article.articleId) {// 更新

          this.$axios.post('/api/pc/article/update', this.$qs.stringify(this.article))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadArticlelList();
            })
            .catch(err => this.$message.error(err.message));

        } else {//新增
          this.$axios.post('/api/pc/article/add', this.$qs.stringify({
            articleDesc: this.article.articleDesc,
            articleName: this.article.articleName,
            articleSort: this.article.articleSort,
            articleType: this.article.articleType,
            isDel: this.article.isDel,
            languageVersion: this.article.languageVersion,
            seoDescription: this.article.seoDescription,
            seoKeywords: this.article.seoKeywords,
            seoTitle: this.article.seoTitle,
            standby1: null,
            standby2: null,
            standby3: null,
            standby4: null,
            standby5: null,
            status: this.article.status,
          }))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadArticlelList();
            })
            .catch(err => this.$message.error(err.message));
        }

      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadArticlelList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadArticlelList();
      },
    },
    beforeMount() {
      this.loadArticlelList();
    }

  }
</script>
<style scoped lang="less">
  .article {
    >.header {
      margin: 5px 0;
    }

    >.page {
      text-align: right;
      padding: 10px 0;
    }
  }
</style>