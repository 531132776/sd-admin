<!-- 权限管理-用户列表 -->
<template>
  <div class="admin-list">
    <div class="d_flex flex_wrap20">
        <el-input v-model="searchVal.keyword" :placeholder="$t('Pleaseentermobilenumber')" class="mb-15" @change="loadOuterUserList">
          <el-button slot="append" icon="el-icon-search"  @click="loadOuterUserList"></el-button>
        </el-input>
    </div>

    <el-table :data="outerUserList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
      size="mini" v-loading="table_loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="memberCode" :label="$t('memberNumber')" header-align="center" align="center" width="177">
      </el-table-column>
      <!-- <el-table-column prop="username" :label="'用户名'" header-align="center" align="center">
            </el-table-column> -->
      <el-table-column prop="nickname" :label="$t('membersNickname')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="sex" :label="$t('gender')" header-align="center" align="center" width="80">
        <template slot-scope="scope">
          <i v-if="scope.row.sex==0">{{$t('secret')}}</i>
          <i v-if="scope.row.sex==1">{{$t('female')}}</i>
          <i v-if="scope.row.sex==2">{{$t('male')}}</i>
        </template>
      </el-table-column>
      <el-table-column prop="memberMoble" :label="$t('telephone')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="city" :label="$t('city')" header-align="center" align="center" width="80">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('registerTime')" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="state" :label="$t('memberSattus')" header-align="center" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.state==0">{{$t('disable')}}</i>
          <i v-if="scope.row.state==1">{{$t('enable')}}</i>
          <i v-if="scope.row.state==2">{{$t('deleted')}}</i>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
        <template slot-scope="scope">
          <router-link class="color-primary" :to="{name:'outerUserDetail',params:{'id':scope.row.memberId}}">view</router-link>
          <!-- <el-button @click="view(scope.row)" type="text" size="small">{{$t('view')}}</el-button> -->
          <!-- <el-button @click="delete(scope.row)" type="text" size="small">{{$t('delete')}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchVal.pageIndex*1"
      :page-sizes="[10, 20, 30, 50]" :page-size="searchVal.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
      :total="searchVal.total">
    </el-pagination>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchVal: {
          pageIndex: 1,
          pageSize: 10,
          total: 100,
          keyword: ''
        },
        table_loading: true,
        outerUserList: [],

      }
    },
    created() {

    },
    mounted() {
      this.loadOuterUserList();
    },
    methods: {
      loadOuterUserList() {
        this.$axios.post('/api/pc/member/list', this.$qs.stringify(this.searchVal))
          .then(res => {
            this.outerUserList = res.dataSet || [];
            this.searchVal.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.searchVal.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
            this.searchVal.total = res.pageInfo ? res.pageInfo.total : 0;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.table_loading = false);
      },
      view(val) {

      },
      // 翻页
      handleSizeChange(val) {
        this.table_loading = true;
        this.searchVal.pageSize = val;
        this.loadOuterUserList();
      },
      handleCurrentChange(val) {
        this.table_loading = true;
        this.searchVal.pageIndex = val;
        this.loadOuterUserList();
      }
    }

  }
</script>