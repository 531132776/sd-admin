<!--客服接单-反馈-->
<template>
  <div class="customer-feedback">
    <div class="header">
          <el-input :placeholder="$t('feedbackNumber')" @change="searchComplaint" v-model="pagination.feedbackCode" class="mb-20">
            <el-button slot="append" icon="el-icon-search"  @click="searchComplaint"></el-button>
          </el-input>

    </div>
    <el-table :data="feedbackList" max-height="500" size="mini" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
      v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="feedbackCode" :label="$t('feedbackNumber')" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.feedbackCode}}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" :label="$t('telephone')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('SourceInfo')" header-align="center" align="center">
        <template slot-scope="scope">
            app
          </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('createTime')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">{{$t('view')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
        :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'feedback',
    data() {
      return {
        loading: true,
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          leaseType: null,//出租-出售
          source: null,//内部-外部
          feedbackCode:''
        },
        feedbackList: []//反馈列表
      };
    },
    methods: {

      loadFeedbackList() {
        this.$axios.post('/api/pc/get/feedback/list', this.$qs.stringify(this.pagination))
          .then(res => {
            console.log(res);
            this.feedbackList = res.dataSet || [];
            this.pagination.pageIndex = res.pageInfo?res.pageInfo.pageNum:1;
            this.pagination.pageSize = res.pageInfo?res.pageInfo.pageSize:10;
            this.pagination.total = res.pageInfo?res.pageInfo.total:0;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.loading = false);
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadFeedbackList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadFeedbackList();
      },
      changeType() {

      },
      changeApplyType() { },
      searchComplaint() {//输入框搜索
          this.loading = true;
          this.loadFeedbackList();
      },  
      view(row) {//view

        console.log('反馈', row)

        this.$router.push({ name: 'feedbackDetail', params: { id: row.id } });

      }
    },
    beforeMount() {
      this.loadFeedbackList();
    }
  }
</script>
<style scoped lang="less">
  .customer-feedback {
    >.header {
      margin: 5px 0;
      width: 350px;
    }

    >.page {
      text-align: right;
      padding: 10px 0;
    }
  }
</style>