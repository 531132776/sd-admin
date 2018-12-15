<!--客服接单-下架-->
<template>
  <div class="customer-withdraw">
    <div class="header d_flex flex_wrap20">
             <el-select v-model="pagination.status" @change="changeType" :placeholder="$t('choose')">
                 <el-option v-for="item in [{value:0,label:$t('applyObtained')},{value:2,label:$t('obtainedSuccess')},{value:null,label:$t('all')}]" :key="item.value"
                   :label="item.label" :value="item.value">
                 </el-option>
             </el-select>

             <el-input v-model.trim="pagination.obtainedCode" @keyup.enter.native="searchComplaint" :placeholder="$t('obtainedNumber')">
                 <el-button slot="append" icon="el-icon-search"  @click="searchComplaint"></el-button>
             </el-input>
    </div>
    <el-table
        :data="withdrawList"
        :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" 
        max-height="600" 
        size="mini" 
        v-loading="loading" 
        element-loading-text="loading" 
        element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" width="500">
            <template slot-scope="scope">
              <img class="float-left" v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
              <div class="float-left order-detail">
                <span class="color-primary house_number_span">
                  {{$t('obtainedNumber')}}: {{scope.row.obtainedCode}}
                </span> 
                <br>
                <span class="house_address_span">
                  <img class="map_pic" src="../../assets/images/map.png" alt="">
                  {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                </span>
                <i v-if="scope.row.leaseType==0" class="label bg-primary">{{$t('Rent')}}</i>
                <i v-if="scope.row.leaseType==1" class="label bg-orange">{{$t('Sale')}}</i>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="memberMobile" :label="$t('telephone')" align="center">
        </el-table-column>
        <el-table-column prop="status" :label="$t('obtainedStatus')" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">{{$t('applyObtained')}}</span>
              <span v-if="scope.row.status===2">{{$t('obtainedSuccess')}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('applyTime')" align="center">
        </el-table-column>
        <el-table-column prop="nickname" :label="$t('operation')" width="180" align="center">
            <template slot-scope="scope">
              <el-button @click="view(scope.row)" type="text" size="small" :style="{'color':'#00b660'}">{{$t('view')}}</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
        :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
    <div style="text-align:center">
        <el-button type="success" @click="setWithdraw" :style="{width: '240px'}">{{$t('obtained')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'withdraw',
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
        status:null,
        obtainedCode:''//下架code
      },
      withdrawList:[]
    };
  },
  methods: { 

    loadWithdrawList(){
      this.$axios.post('/api/pc/get/obtained/list', this.$qs.stringify(this.pagination))
          .then(res => {
            // console.log(res);
            this.withdrawList = res.dataSet || [];
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10 ;
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0 ;
          }).catch(err => this.$message.error(err.message))
          .finally(() => this.loading = false);
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pagination.pageSize = val;
      this.loadWithdrawList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.pagination.pageIndex = val;
      this.loadWithdrawList();
    },
     changeType(){
      this.loading = true;
      this.loadWithdrawList();
    },
    searchComplaint(){//输入框搜索
      this.loading = true;
      this.loadWithdrawList();
    },
    setWithdraw(){//下架
       //跳转到下架页面
       this.$router.push({name:'withdrawSearch'});
    },
    submit(){

    },
    view(row){
      this.$router.push({name:'withdrawDetail',params:{id:row.id}});
    }
  },
  beforeMount(){
    this.loadWithdrawList();
  }
}
</script>
<style scoped lang="less">
  .house_number_span,
  .house_address_span{
    display: inline-block;
    width: 80%;
  }
    .customer-withdraw{
        >.header{
            margin:5px 0;
        }
        > .page {
            text-align: right;
            padding: 10px 0;
        }
    }
</style>
