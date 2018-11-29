<!-- 房源管理-房源列表 -->
<template>
  <div class="house-list">

    <!-- v-model="activeName" @tab-click="getTrialHouseList" -->
    <el-tabs v-model="auditType" @tab-click="getHouseList">
      <!-- 初审列表 -->
      <el-tab-pane :label="$t('trialHouse')" name="trial">
        <p class="header d_flex flex_wrap20">

               <el-select v-model="pagination.leaseType" @change="changeType" :placeholder="$t('choose')">
                 <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]"
                   :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
               </el-select>

               <el-select v-model="pagination.applyTypes" @change="changeApplyType" :placeholder="$t('choose')" >
                 <el-option v-for="item in [{value:'1',label:$t('CompleteService')},{value:'2',label:$t('CompleteOutSide')},{value:'0',label:$t('CompleteOwner')},{value:'0,1,2',label:$t('all')}]"
                   :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
               </el-select>

               <el-input v-model.trim="pagination.applyCode" @keyup.enter.native="searchHouse" :placeholder="$t('UploadNumber')" >
                 <el-button slot="append" icon="el-icon-search"  @click="searchHouse"></el-button>
               </el-input>

        </p>

        <el-table :data="trialHouseList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe
          max-height="622" size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" >
            <template slot-scope="scope">
              <div class="info">
                <div class="credent">
                  <img :src="scope.row.houseHoldImg" alt="">
                </div>
                <div class="address">
                  <p class="code" v-bind:style="{color:scope.row.leaseType===0 ? '#00B660' :'#F39700'}">{{$t('UploadNumber')}}:{{scope.row.applyCode}}</p>
                  <p class="detail-addr">
                    <i class="el-icon-location-outline" style="width:10px;height:13px;margin-right:4px;"></i>
                    {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                  </p>
                </div>
                <div class="type">
                  <span class="lease-type" v-if="scope.row.leaseType===0">{{$t('Rent')}}</span>
                  <span class="sell-type" v-if="scope.row.leaseType===1">{{$t('Sale')}}</span>
                  <span class="owner-type" v-if="scope.row.applyType===0">{{$t('CompleteOwner')}}</span>
                  <span class="customer-type" v-if="scope.row.applyType===1">{{$t('CompleteService')}}</span>
                  <span class="external-type" v-if="scope.row.applyType===2">{{$t('CompleteOutSide')}}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNumber" :label="$t('Contactnumber')" header-align="center" align="center" width="180">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('applyTime')" header-align="center" align="center" width="230">
          </el-table-column>
          <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center" width="180">
            <template slot-scope="scope">
              <el-button @click="checkHouse(scope.row)" type="text" size="small" :style="{'color':'#00b660'}">{{$t('edit')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 终审列表 -->
      <el-tab-pane :label="$t('finalHouse')" name="final">

        <p class="header d_flex flex_wrap20">

              <el-select v-model="pagination.leaseType" @change="changeType" :placeholder="$t('choose')" >
                <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]"
                  :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model="pagination.applyTypes" @change="changeApplyType" :placeholder="$t('choose')" >
                 <el-option v-for="item in [{value:'1',label:$t('CompleteService')},{value:'2',label:$t('CompleteOutSide')},{value:'0',label:$t('CompleteOwner')},{value:'0,1,2',label:$t('all')}]"
                   :key="item.value" :label="item.label" :value="item.value">
                 </el-option>
               </el-select>

              <!-- <el-select v-model="pagination.applicantType" @change="ChangeApplicantType" :placeholder="$t('choose')">
                <el-option v-for="item in [{value:'0',label:$t('CompleteOwner')},{value:'1',label:'POA上传'},{value:'',label:$t('all')}]"
                  :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->

              <el-input v-model.trim="pagination.houseCode" @keyup.enter.native="searchHouse"  :placeholder="$t('UploadNumber')">
                <el-button slot="append" icon="el-icon-search"  @click="searchHouse"></el-button>
              </el-input>

        </p>
        <el-table :data="finalHouseList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
          size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column prop="date" :label="$t('info')" align="center">
            <template slot-scope="scope">
              <div class="info">
                <img class="float-left" v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
                <div class="address">

                  <p class="code" v-bind:style="{color:scope.row.leaseType===0 ? '#00B660' :'#F39700'}">{{$t('UploadNumber')}}:{{scope.row.houseCode}}</p>
                  <p class="detail-addr">
                    <i class="el-icon-location-outline" style="width:10px;height:13px;margin-right:4px;"></i>
                    {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                  </p>
                </div>
                <div class="type">
                  <span class="lease-type" v-if="scope.row.leaseType===0">{{$t('Rent')}}</span>
                  <span class="sell-type" v-if="scope.row.leaseType===1">{{$t('Sale')}}</span>
                  <!-- <span class="owner-type" v-if="scope.row.applicantType===0">{{$t('CompleteOwner')}}</span>
                  <span class="customer-type" v-if="scope.row.applicantType===1">POA</span>   -->

                  <span class="owner-type" v-if="scope.row.applyType===0">{{$t('CompleteOwner')}}</span>
                  <span class="customer-type" v-if="scope.row.applyType===1">{{$t('CompleteService')}}</span>
                  <span class="external-type" v-if="scope.row.applyType===2">{{$t('CompleteOutSide')}}</span>

                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNumber" :label="$t('Contactnumber')" width="180" align="center">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('applyTime')" width="230" align="center">
          </el-table-column>
          <el-table-column prop="nickname" :label="$t('operation')" width="180" align="center">
            <template slot-scope="scope">
              <el-button @click="viewFinalHouse(scope.row)" type="text" size="small" :style="{'color':'#00b660'}">{{$t('view')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
    name: "houseList",
    data() {
      return {
        auditType: "trial",
        loading: true,
        trialHouseList: [], //初审列表
        finalHouseList: [], //终审列表
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          leaseType: null,
          houseCode: null,
          applyCode:null,
          applyTypes: "0,1,2"
        },
      };
    },
    methods: {
      searchHouse() {//输入框搜索房源
        this.loading = true;
        this.pagination.pageIndex=1;
        this.pagination.pageSize=10;
        if (this.auditType === "trial") {
          this.reloadTrailHouseList();
        } else if (this.auditType === "final") {
          this.reloadFinalHouseList();
        }
      },
      getHouseList(val) {
        this.loading = true;
        //tab切换获取房源列表
        if (val.name === "trial") {
          //重置分页数据
          this.pagination = {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            leaseType: null,
            houseCode: null,
            applyCode:null,
            applyTypes: "0,1,2"
          };
          this.reloadTrailHouseList();
        } else if (val.name === "final") {
          //重置分页数据
          this.pagination = {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            leaseType: null,
            houseCode: null,
            applyCode:null,
            applicantType: ""
          };
          this.reloadFinalHouseList();
        }
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        if (this.auditType === "trial") this.reloadTrailHouseList();
        else this.reloadFinalHouseList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        if (this.auditType === "trial") this.reloadTrailHouseList();
        else this.reloadFinalHouseList();
      },
      checkHouse(row) {
        //编辑->房源审核
        // console.log(row);
        if(row.applyType===2){
            // this.$router.push({name:'outsideEdit',params:{id:row.id}});
            this.$router.push({ name: 'outsideUpload',query:{id:row.id}});
        }else{
          this.$router.push({ name: "trialhouse", params: { id: row.id } });
        }
      },
      changeType(val) {
        //筛选出租或者出售
        this.loading = true;
        this.pagination.pageIndex=1;
        this.pagination.pageSize=10;
        this.pagination.leaseType = val;
        if (this.auditType === "trial") this.reloadTrailHouseList();
        else this.reloadFinalHouseList();
      },
      changeApplyType(val) {
        //初审-客服完善，外获完善，业主完善筛选
        this.loading = true;
        this.pagination.pageIndex=1;
        this.pagination.pageSize=10;
        this.pagination.applyTypes = val;
        if (this.auditType === "trial"){this.reloadTrailHouseList();}else{
          this.reloadFinalHouseList();
        } 
      },
      ChangeApplicantType(val) {
        //终审-筛选业主、POA上传
        // console.log(val);
        this.loading = true;
        this.pagination.applicantType = val;
        this.reloadFinalHouseList();
      },
      viewFinalHouse(row) {
        //查看终审房源
        // console.log("查看终审房源", row);
        this.$router.push({ name: "finalhouse", params: { id: row.id } });
      },
      reloadTrailHouseList() {
        //获取初审房源列表
        this.$axios
          .post("/api/pc/owner/apply/list", this.$qs.stringify(this.pagination))
          .then(res => {
            // console.log("初审房源列表", res);
            this.trialHouseList = res.dataSet || [];
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
          })
          .catch(error => this.$message.error(error.message))
          .finally(() => this.loading = false);
      },
      reloadFinalHouseList() {
        //获取终审房源列表
        this.$axios
          .post("/api/pc/house/list", this.$qs.stringify(this.pagination))
          .then(res => {
            // console.log("终审房源列表", res);
            this.finalHouseList = res.dataSet || [];
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
          })
          .catch(error => this.$message.error(error.message))
          .finally(() => this.loading = false);
      },
      selectArea() {
        //级联选择地区
        // console.log("获取地区");
      },
    },
    beforeMount() {
      // console.log("当前路由", this.$route)
      this.reloadTrailHouseList();
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .house-list {
    .header {
      text-align: left;

      >.add {
        background-color: #009688;
        color: #fff;
      }
    }

    /* .data-grid{
      } */
    >.page {
      text-align: right;
      padding: 10px 0;
    }

    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* height: 48px; */

      >.credent {
        width: 48px;
        height: 48px;
        border: 1px dashed #ccc;
      }

      >.address {
        /*  width: 300px; */
        /* height: 48px; */
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 55%;

        >.code {
          padding: 0;
          margin: 0;
          /* width: 100%; */
          width: 90%;
          text-align:left;
          overflow: hidden;
          /* white-space: nowrap; */
          /* text-overflow: ellipsis; */
        }

        >.detail-addr {
          padding: 0;
          margin: 0;
          /* width: 100%; */
          width: 90%;
          overflow: hidden;
          /* white-space: nowrap; */
          /* text-overflow: ellipsis; */
          text-align: left;
        }

      }

      >.type {
        font-size: 10px;

        /**出租*/
        >.lease-type {
          /* width: 32px; */
          /* height: 16px; */
          padding: 3px;
          border-radius: 3px;
          color: #FFFFFF;
          background: rgba(0, 182, 96, 1);
        }

        /**出售*/
        >.sell-type {
          /* width: 32px; */
          /* height: 16px; */
          padding: 3px;
          border-radius: 3px;
          color: #FFFFFF;
          background-color: rgba(243, 151, 0, 1);
        }

        >.owner-type,.customer-type,.external-type {
          /* width: 52px; */
          /* height: 16px; */
          padding: 3px;
          margin-left:10px;
          border-radius: 3px;
          border: 1px solid rgba(0, 182, 96, 1);
          color: #00B660;
        }

        >.customer-type {}

        >.external-type {}
      }
    }

  }
</style>
<!--

 <span class="self-type" v-if="scope.row.applyType===0">自主</span>
                  <span class="customer-type" v-if="scope.row.applyType===1">客服</span>
                  <span class="external-type" v-if="scope.row.applyType===2">外获</span>

-->