<!-- 搜索下架-->
<template>
        <div class="customer-withdraw">
          <div class="header">
              <el-input v-model.trim="pagination.keyword" @keyup.enter.native="search"  :placeholder="$t('UploadNumber')" style="width:500px;margin-right:10px;">
                  <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
              </el-input> 
          </div>
          <el-table
              :data="withdrawList"
              :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" 
              max-height="500" 
              size="mini" 
              v-loading="loading" 
              element-loading-text="loading" 
              element-loading-spinner="el-icon-loading" 
              element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" width="400">
                  <template slot-scope="scope">
                    <img class="float-left" v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
                    <div class="float-left order-detail">
                      <span class="color-primary">
                        {{$t('UploadNumber')}}: {{scope.row.houseCode}}
                      </span> 
                      <br>
                      <span>
                        <img class="map_pic" src="../../assets/images/map.png" alt="">
                        {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                      </span>
                      <i v-if="scope.row.leaseType==0" class="label bg-primary">{{$t('Rent')}}</i>
                      <i v-if="scope.row.leaseType==1" class="label bg-orange">{{$t('Sale')}}</i>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column prop="memberMobile" :label="$t('telephone')">
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('SourceInfo')">
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('applyTime')">
              </el-table-column>
              <el-table-column prop="nickname" :label="$t('operation')" width="100">
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
        name: 'withdrawSearch',
        data() {
          return {
            loading: true,
            pagination: {
              pageIndex: 1,
              pageSize: 10,
              total: 0,
              keyword:''
            },
            withdrawList:[]
          };
        },
        methods: { 
      
          loadWithdrawList(){
            this.$axios.post('/api/pc/search/house', this.$qs.stringify(this.pagination))
                .then(res => {
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
          search(){//输入框搜索
            this.loading = true;
            this.loadWithdrawList();
          },
          view(row){
            this.$router.push({name:'withdrawHouse',params:{id:row.houseId}});
          }
        },
        beforeMount(){
          this.loadWithdrawList();
        }
      }
      </script>
      <style scoped lang="less">
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
      