<template>
  <div class="feedback-detail">

    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:`/home/personalCenter/0` }"><span class="">{{$t('PersonalCenter')}}</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:`/home/personal_close_list/0`   }">{{$t('closerecord')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('feedback')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <p>{{$t('HousingInfo')}}</p>
      <div class="houseInfo">
        <div>
          <p><span class="key">{{$t('ProcessingCategory')}}:</span><span class="value" style="color:#E21010;">{{$t('feedback')}}</span></p>
          <p><span class="key">{{$t('feedbackNumber')}}:</span><span class="value">{{detail.feedbackCode}}</span></p>
          <p><span class="key">{{$t('customerName')}}:</span><span class="value">{{detail.name}}</span></p>
        </div>
        <div>
          <p><span class="key">{{$t('telephone')}}:</span><span class="value">{{detail.mobile}}</span></p>
          <p><span class="key">{{$t('SourceInfo')}}:</span><span class="value">APP</span></p>
          <p><span class="key">{{$t('createTime')}}:</span><span class="value">{{detail.createTime}}</span></p>
        </div>
      </div>
    </div>
    <div class="feedback-info">
      <p>{{$t('feedback')}}</p>
      <div class="feedback-content">
        <p>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="0" disabled>{{$t('housingStatusComplaints')}}</el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="3" disabled><span>{{$t('financialLoans')}}</span></el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="5" disabled><span>{{$t('whi')}}</span></el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="7" disabled><span>{{$t('affb')}}</span></el-radio>
          </span>
        </p>
        <p>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="1" disabled><span>{{$t('feeComplaint')}}</span></el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="4" disabled><span>{{$t('transferComplaint')}}</span></el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType"  :label="6" disabled><span>{{$t('sstcp')}}</span></el-radio>
          </span>
          <span>
            <el-radio v-model="detail.feedbackType" :label="8" disabled><span>{{$t('other')}}</span></el-radio>
          </span>
        </p>
      </div>
    </div>
    <div class="supplement">
      <p>{{$t('added')}}</p>
      <div class="supplement-info"> {{detail.feedbackContent}}</div>
    </div>
    <div class="remarks">
      <p><span>{{$t('niwtoc')}}</span></p>
      <div class="remarks-info">{{detail.remark}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detail: {
          feedbackCode: null,
          mobile: null,
          remark: null,
          updateTime: null,
          platform: null,
          createBy: null,
          feedbackContent: null,
          feedbackProofPic2: null,
          createTime: null,
          feedbackProofPic1: null,
          updateBy: null,
          name: null,
          feedbackProofPic3: null,
          id: null,
          feedbackType: null,
          status: null,
        }
      }
    },
    methods: {

    },
    beforeMount() {

    },
    mounted(){
      this.$axios.post(`/api/pc/get/feedback/detail/${this.$route.params.id}`)
        .then(res => this.detail = res.dataSet ? res.dataSet : this.detail)
        .catch(err => this.$message.error(err.message));
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .feedback-detail {

    >.info {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        border-left: 2px solid #00B660;
        text-indent: 3px;
        margin: 20px 0;
        padding: 0;
        color: #333333;
        font-size: 14px;
      }

      >.houseInfo {
        height: 200px;
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

    >.supplement {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        border-left: 2px solid #00B660;
        text-indent: 3px;
        color: #333333;
        font-size: 14px;
        margin: 20px 0;
      }

      >.supplement-info {
        margin-left: 6px;

        >textarea {
          width: 100%;
          height: 80px;
          background: rgba(247, 247, 247, 1);
          border-radius: 3px;
          resize: none;
        }
      }
    }

    >.feedback-info {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        ;
        border-left: 2px solid #00B660;
        text-indent: 3px;
        color: #333333;
        font-size: 14px;
        margin: 40px 0 20px 0;
      }

      >.feedback-content {
        padding-left: 66px;
        display: flex;
        align-items: center;

        >p {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 190px 0 0;
          width: 130px;
          height: 120px;

          >span {
            color: #333333;
            font-size: 14px;
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