<!-- 房源管理-房源列表 -->
<template>
  <div class="house-list">
    <p class="header d_flex flex_wrap20">

           <el-select v-model="pagination.leaseType" @change="changeType" :placeholder="$t('choose')">
             <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]"
               :key="item.value" :label="item.label" :value="item.value">
             </el-option>
           </el-select>

           <el-select v-model="pagination.applyTypes" @change="changeType" :placeholder="$t('choose')" >
             <el-option v-for="item in [{value:'1',label:$t('CompleteService')},{value:'2',label:$t('CompleteOutSide')},{value:'0',label:$t('CompleteOwner')},{value:'0,1,2',label:$t('all')}]"
               :key="item.value" :label="item.label" :value="item.value">
             </el-option>
           </el-select>

           <el-input v-model.trim="pagination.applyCode" @keyup.enter.native="searchHouse" :placeholder="$t('UploadNumber')" >
             <el-button slot="append" icon="el-icon-search"  @click="searchHouse"></el-button>
           </el-input>

    </p>

    <el-table class="house_upload" :data="trialHouseList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="600"
      size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="date" :label="$t('info')" header-align="center" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="credent">
              <img :src="scope.row.houseHoldImg" alt="">
            </div>
            <div class="address">
              <p class="code" v-bind:style="{color:scope.row.leaseType===0 ? '#00B660' :'#F39700'}">{{$t('UploadNumber')}}：{{scope.row.applyCode}}</p>
              <p class="detail-addr">
                <i class="el-icon-location-outline" style="width:10px;height:13px;margin-right:4px;;"></i>
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
      <el-table-column prop="phoneNumber" :label="$t('Contactnumber')" header-align="center" width="180" align="center" >
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('applyTime')" header-align="center" width="230" align="center" >
      </el-table-column>
      <el-table-column prop="nickname" :label="$t('operation')" header-align="center" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="checkHouse(scope.row)" type="text" size="small" :style="{'color':'#00B660'}">{{$t('edit')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
        :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <el-row type="flex" justify="center">
      <el-button @click="checkVisible=true;uploadType='UploadOutSide'">{{$t('UploadOutSide')}}</el-button>
      <el-button type="success" @click="checkVisible=true;uploadType='UploadService';">{{$t('UploadService')}}</el-button>
    </el-row>

    <!-- 填写手机验证码 -->
    <el-dialog :title="$t('VerifyMobile')" :visible.sync="checkVisible" width="30%">

      <el-form label-width="80px">
        <!-- <el-form-item>
          <span slot="label">{{$t('city')}}</span>
          <el-select v-model="PhoneValid.areaCode" filterable :placeholder="$t('choose')">
            <el-option v-for="item in cityList" :key="item.id" :label="item.region_name_en" :value="item.regionCode">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <span slot="label"></span>
          <el-input v-model.trim="PhoneValid.mobile" style="width:216px;" :placeholder="$t('telephone')"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input v-model="PhoneValid.validateCode" style="width:216px;" :placeholder="$t('VerificationCode')"></el-input>
          <el-button @click="getValidCode">{{$t('VerificationCode')}}</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkRole">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "houseList",
    data() {
      return {
        uploadType: '',
        loading: true,
        trialHouseList: [], //初审列表
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          leaseType: null,
          houseCode: null,
          applyTypes: "0,1,2",
          applyCode:''
        },
        checkVisible: false, //手机号获取验证码对话框,
        //验证码的数据
        PhoneValid: {
          mobile: null,
          areaCode: "",
          validateCode: '123456',//后台写死
          isTest: 'aaa',//测试使用,不用输入验证码
        },
        cityList: []// 城市列表 


      };
    },
    methods: {
      searchHouse() {//输入框搜索房源
        this.loading = true;
        this.pagination.pageIndex=1;
        this.pagination.pageSize=10;
        this.reloadTrailHouseList();
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.reloadTrailHouseList();

      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.reloadTrailHouseList();

      },
      checkHouse(row) {
        //编辑->房源审核--->如果是外获上传的数据->外获上传页面
        if(row.applyType===2){
            // this.$router.push({name:'outsideEdit',params:{id:row.id}});
            this.$router.push({ name: 'outsideUpload',query:{id:row.id}});
         }else{
            this.$router.push({ name: "trialhouse", params: { id: row.id ,type:'upload'}});
         }
      },
      changeType(val) {
        //筛选出租或者出售
        this.loading = true;
        this.pagination.pageIndex=1;
        this.pagination.pageSize=10;
        //this.pagination.leaseType = val;
        this.reloadTrailHouseList();
      },
      reloadTrailHouseList() {
        //获取初审房源列表
        this.$axios
          .post("/api/pc/owner/apply/list", this.$qs.stringify(this.pagination))
          .then(res => {
            this.trialHouseList = res.dataSet || [];
            this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
            this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
            this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
          })
          .catch(error => this.$message.error(error.message))
          .finally(() => this.loading = false);
      },
      getValidCode() {
        //获取手机验证码
        // console.log("验证码");
        this.$axios.post('/api/pc/send/sms/code', this.$qs.stringify({ mobile: this.PhoneValid.mobile }))
          .then(res => {
            // console.log('获取验证码:', res);
          })
      },
      checkRole() {//客服上传房源-判断是否是新用户
        //客服上传入口
        this.$axios.post('/api/pc/member/isNewUser', this.$qs.stringify(this.PhoneValid))
          .then(res => {
            //判断是客服上传还是外获上传
            if (this.uploadType === 'UploadService') {//客服上传
              // this.$router.push({ name: 'uploadHouse', params: { memberId: res.dataSet.id },query:{ phoneNumber:this.PhoneValid.mobile} });

              this.$router.push({ name: 'trialhouse', params: { id:0 },query:{ memberMobile:this.PhoneValid.mobile,memberId: res.dataSet.id} });

              // trialhouse
            } else if (this.uploadType === 'UploadOutSide') {//外获上传
              this.$router.push({ name: 'outsideUpload',query:{memberMobile:this.PhoneValid.mobile,memberId: res.dataSet.id}});
            }
          }).catch(err => {
            this.$alert(err.message, this.$t('reminder'), {
              confirmButtonText: this.$t('confirm'),
              callback: action => {
                this.checkVisible = false;
              }
            });
          })
      }
    },
    beforeMount() {
      this.reloadTrailHouseList();
      //获取城市列表
      this.$axios.post('/api/pc/city/code')
        .then(res => this.cityList = res.dataSet || [])
        .catch(err => this.$message.error(err.message));
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
        /* width: 158px; */
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
          text-align: left;
          overflow: hidden;
          /* white-space: nowrap; */
          /* text-overflow: ellipsis; */
        }

        >.detail-addr {
          padding: 0;
          margin: 0;
          /* width: 100%; */
          width:90%;
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

        >.owner-type,
        .customer-type,
        .external-type {
          /* width: 52px; */
          /* height: 16px; */
          padding: 3px;
          margin-left: 10px;
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