<!--客服接单-投诉-->
<template>
  <div class="customer-complaint">
    <div class="header">
        <!-- <el-form-item>
          <el-select v-model="pagination.leaseType" @change="changeType" :placeholder="$t('choose')">
            <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:'0,1',label:$t('all')}]" :key="item.value"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-select v-model="pagination.source" @change="changeApplyType" :placeholder="$t('choose')">
            <el-option v-for="item in [{value:0,label:$t('internal')},{value:1,label:$t('external')},{value:'0,1',label:$t('all')}]" :key="item.value"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

      <el-input :placeholder="$t('ComplaintNumber')"  @change="searchOrder" v-model="pagination.complainCode" class="mb-20">
          <el-button slot="append" icon="el-icon-search"  @click="searchOrder"></el-button>
      </el-input>         
    </div>

    <div class="body">
      <el-table :data="complainList" max-height="500" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
        :row-style="{'backgroundColor':'#F7F7F7'}" size="mini" v-loading="loading" element-loading-text="loading"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column prop="complainCode" :label="$t('ComplaintNumber')" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.complainCode}}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('telephone')" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('SourceInfo')" header-align="center" align="center">
          <template slot-scope="scope">
            app
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('OrderStatus')" header-align="center" align="center">
            <template slot-scope="scope">
               <span v-if="scope.row.status===0">{{$t('noAcceptOrder')}}</span>
               <span v-if="scope.row.status===1">{{$t('SalesmanHandling')}}</span>
               <span v-if="scope.row.status===2">{{$t('processingComplete')}}</span>
               <span v-if="scope.row.status===3">{{$t('closed')}}</span>
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
    </div>

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
    name: "complaint",
    props: {
      msg: String
    },
    data() {
      return {
        loading: true,
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          leaseType: null,//出租-出售
          source: null,//内部-外部,
          complainCode:''
        },
        complainList: []
      };
    },
    methods: {

      loadcomplainList() {
        this.$axios.post('/api/pc/house/complain/list', this.$qs.stringify(this.pagination))
          .then(res => {
            this.complainList = res.dataSet || [];
            this.pagination.pageIndex = res.pageInfo? res.pageInfo.pageNum : 1;
            this.pagination.pageSize =res.pageInfo? res.pageInfo.pageSize : 10;;
            this.pagination.total = res.pageInfo?res.pageInfo.total : 0;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.loading = false);
      },
      changeType() {//切换出租-出售

      },
      changeApplyType() {//切换来源-内部-外部

      },
      searchOrder(){ //按照编号搜索
            this.loading = true;
            this.loadcomplainList();
      },

      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadcomplainList();

      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadcomplainList();
      },
      view(row) {//投诉详情
        this.$router.push({ name: 'complainDetail', params: { code: row.id } });
      }
    },
    beforeMount() {
      this.loadcomplainList();
    }
  };
</script>
<style scoped lang="less">
  .customer-complaint {
    >.header {
      margin: 5px 0;
      width: 350px;
    }

    >.body {}

    >.page {
      text-align: right;
      padding: 10px 0;
    }
  }
</style>