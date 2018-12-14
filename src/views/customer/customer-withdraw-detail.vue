<template>
  <div class="withdraw-detail">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path:'/home/withdraw' }"><span class="">{{$t('orderService')}}</span></el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('obtained')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <p>{{$t('HousingInfo')}}</p>
      <div class="houseInfo">
        <div>
          <p><span class="key">{{$t('ProcessingCategory')}}:</span><span class="value" style="color:#E21010;">{{$t('obtained')}}</span></p>
          <p><span class="key">{{$t('obtainedNumber')}}:</span><span class="value">{{detail.obtainedCode}}</span></p>
          <p><span class="key">{{$t('customerName')}}:</span><span class="value">{{detail.nickName}}</span></p>
          <p><span class="key">{{$t('telephone')}}:</span><span class="value">{{detail.memberMobile}}</span></p>
        </div>
        <div>
          <p><span class="key">{{$t('HousingTypes')}}:</span><span class="value">{{detail.leaseType===0 ? $t('Rent'): $t('Sale') }}</span></p>
          <p><span class="key">{{$t('obtainedSource')}}:</span><span class="value">{{platformState}}</span></p>
          <p><span class="key">{{$t('obtainedTime')}}:</span><span class="value">{{new Date(detail.createTime)}}</span></p>
          <p><span class="key">{{$t('address')}}:</span><span class="value">{{detail.city}}{{detail.community}}{{detail.subCommunity}}{{detail.address}}</span></p>
        </div>
      </div>
    </div>
    <div class="remarks" >
      <p>{{$t('note')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.content"></textarea>
      </div>
    </div>
    <div class="remarks">
      <p>{{$t('noteOfTheService')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remark"></textarea>
      </div>
    </div>
    <div class="footer">
      <el-button v-if="detail.status===0" @click="obtained(1)">{{$t('cancelObtain')}}</el-button>
      <el-button @click="obtained(0)" type="warning" plain>{{$t('return')}}</el-button>
      <el-button v-if="detail.status===0" @click="obtained(2)" type="success">{{$t('confirmObtain')}}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "withdrawDetail",
    props: ["id"],
    data() {
      return {
        detail: {
          houseId: null,
          address: null,
          city: "",
          nickName: "",
          remark: "",
          updateTime: null,
          community: "",
          content: "",
          platform: 0,
          subCommunity: "",
          houseMainImg: "",
          createBy: null,
          leaseType: 0,
          createTime: null,
          updateBy: null,
          id: null,
          isDel: 0,
          obtainedCode: "",
          memberMobile: "",
          status: null,
          name: null
        }
      };
    },
    methods: {
      obtained(status) {//取消下架,确认下架
        if(status==0){
          this.$router.push({ name: 'withdraw' });
          return false;
        }
        let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
        this.$axios.post('/api/pc/update/obtained', this.$qs.stringify({
          remark: this.detail.remark,
          content: this.detail.content,
          platform: this.detail.platform,
          id: this.detail.id,
          houseId:this.detail.houseId,
          //isDel	string	否	是否删除0:不删除，1：删除		
          status: status
        })).then(res => {
          this.$message({ type: 'success', message: res.message });
          this.$router.push({ name: 'withdraw' });
        })
          .catch(err => this.$message.error(err.message))
          .finally(() => this.$nextTick(() => {
            loadingInstance.close();
          }));
      }
    },
    computed: {
      platformState() {
        switch (this.detail.platform) {
          case 1:
            return this.$t('external');
          case 2:
            return this.$t('sellerAssistant');
          case 3:
            return this.$t('buyerAssistant');
          case 4:
            return this.$t('regionalLong');
          case 5:
            return 'PC'
        }
      }
    },
    beforeMount() {
      this.$axios
        .post(`/api/pc/get/obtained/detail/${this.$props.id}`)
        .then(res => {
          // console.log('下架详情', res);
          this.detail = res.dataSet ? res.dataSet : this.detail;
        })
        .catch(err => this.$message.error(err.message));
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .withdraw-detail {
    >.info {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        border-left: 2px solid #00b660;
        text-indent: 3px;
        margin: 20px 0;
        padding: 0;
        color: #333333;
        font-size: 14px;
      }

      >.houseInfo {
        height: 180px;
        background: rgba(247, 247, 247, 1);
        border-radius: 3px;
        margin-left: 6px;
        padding-left: 62px;
        display: flex;

        >div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-right: 120px;

          >p {
            >.key {
              color: #666666;
              font-size: 12px;
              margin-right: 3px;
            }

            >.value {
              color: #333333;
              font-size: 14px;
            }
          }
        }
      }
    }

    >.remarks {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        border-left: 2px solid #00B660;
        text-indent: 3px;
        color: #333333;
        font-size: 14px;
        margin: 40px 0 20px 0;

        >span {
          color: #E21010;
          font-size: 12px;
          margin-left: 17px;
        }
      }

      >.remarks-info {
        margin-left: 6px;

        >textarea {
          width: 100%;
          height: 120px;
          background: rgba(247, 247, 247, 1);
          border-radius: 3px;
          resize: none;
        }
      }
    }

    .footer {
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }
  }
</style>