<template>
  <div class="complain-detail">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{  }"><span class="">{{$t('orderService')}}</span></el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('complaints')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <p>{{$t('HousingInfo')}}</p>
      <div class="houseInfo">
        <div>
          <p><span class="key">{{$t('ProcessingCategory')}}:</span><span class="value" style="color:#E21010;">{{$t('complaints')}}</span></p>
          <p><span class="key">{{$t('ComplaintNumber')}}:</span><span class="value">{{detail.complainCode}}</span></p>
          <p><span class="key">{{$t('NameofTheService')}}:</span><span class="value">{{detail.name}}</span></p>
          <p><span class="key">{{$t('telephone')}}:</span><span class="value">{{detail.mobile}}</span></p>
        </div>
        <div>
          <p><span class="key">{{$t('HousingTypes')}}:</span><span class="value">{{detail.leaseType===0 ?
              $t('Rent'):$t('Sale')}}</span></p>
          <p><span class="key">{{$t('SourceInfo')}}:</span><span class="value">APP</span></p>
          <p><span class="key">{{$t('ComplaintsOfTime')}}:</span><span class="value">{{detail.createTime}}</span></p>
          <p><span class="key">{{$t('address')}}:</span><span class="value">{{detail.city}}{{detail.community}}{{detail.subCommunity}}{{detail.address}}</span></p>
        </div>
      </div>
    </div>
    <div class="complain-info">
      <p>{{$t('ComplaintsContent')}}</p>
      <div class="complain-content d_flex" v-if="detail.complainType==0">
        <el-radio v-model="detail.complainReason" :label="0" disabled><span>{{$t('housingStockLeased')}}</span></el-radio>
        <el-radio v-model="detail.complainReason" :label="1" disabled><span>{{$t('priceOfFalse')}}</span></el-radio>
        <el-radio v-model="detail.complainReason" :label="2" disabled><span>{{$t('picturesOfFalse')}}</span></el-radio>
        <el-radio v-model="detail.complainReason" :label="3" disabled><span>{{$t('propertiesOfFalse')}}</span></el-radio>
        <el-radio v-model="detail.complainReason" :label="4" disabled><span>{{$t('other')}}</span></el-radio>
      </div>
      <div class="complain-content d_flex" v-if="detail.complainType==1">
          <el-radio v-model="detail.complainReason" :label="5" disabled><span>业务员未按约定时间到达</span></el-radio>
          <el-radio v-model="detail.complainReason" :label="6" disabled><span>业务员态度恶劣</span></el-radio>
          <el-radio v-model="detail.complainReason" :label="7" disabled><span>业务员收取额外费用</span></el-radio>
      </div>
    </div>
    <div class="supplement">
      <p>{{$t('complainNote')}}</p>
      <div class="supplement-info">
        <textarea v-model="detail.complainExplain" disabled></textarea>
      </div>
    </div>
    <div class="credentials">
      <p>{{$t('UploadDocuments')}}</p>
      <div class="upload-conrtol">
        <img v-if="detail.complainProofPic1" v-bind:src="detail.complainProofPic1" alt="">
        <img v-if="detail.complainProofPic2" v-bind:src="detail.complainProofPic2" alt="">
        <img v-if="detail.complainProofPic3" v-bind:src="detail.complainProofPic3" alt="">
      </div>
    </div>
    <!-- 内勤备注 remarkBackOffice -->
    <div class="remarks">
      <p>{{$t('backOfficeNote')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remarkBackOffice" disabled></textarea>
      </div>
    </div>
    <!-- 财务备注 remarkFinance -->
    <div class="remarks">
      <p>{{$t('financialNote')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remarkFinance" disabled></textarea>
      </div>
    </div>
    <!-- 外看备注  remarkLookOutside -->
    <div class="remarks">
      <p>{{$t('lookOutNote')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remarkLookOutside" disabled></textarea>
      </div>
    </div>
    <!-- 外获备注 remarkOutOf -->
    <div class="remarks">
      <p>{{$t('outsideNote')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remarkOutOf" disabled></textarea>
      </div>
    </div>
    <!-- 区域长 remarkKeyManager -->
    <div class="remarks">
      <p>{{$t('regionalLong')}}</p>
      <div class="remarks-info">
        <textarea v-model="detail.remarkKeyManager" disabled></textarea>
      </div>
    </div>
    <!-- 备注 remark -->
    <div class="remarks">
      <p>{{$t('note')}}</p> 
      <div class="remarks-info">
        <textarea v-model="detail.remark" disabled></textarea>
      </div>
    </div>
    <div class="footer">
      <el-button @click="closeOrder">{{$t('closeOrder')}}</el-button>
      <el-button type="primary" @click="transformOrder">{{$t('TransferOrder')}}</el-button>
      <el-button type="primary" @click="obtained">{{$t('obtained')}}</el-button>
    </div>

    <el-dialog :title="$t('choose')" :visible.sync="checkVisible" width="30%">
      <el-form label-width="100px" :model="transform" ref="ruleForm" :rules="rules">
        <el-row>
           <el-col :span="24">
             <el-form-item prop="type">
                <span slot="label">{{$t('serviceType')}}</span>
               <el-radio-group v-model="transform.type">
                 <el-radio :label="1">{{$t('regionalLong')}}</el-radio>
                 <el-radio :label="2">{{$t('buyerAssistant')}}</el-radio>
                 <el-radio :label="3">{{$t('sellerAssistant')}}</el-radio>
                 <el-radio :label="4">{{$t('internalAssistant')}}</el-radio>  
                 <el-radio :label="5">{{$t('financial')}}</el-radio>
               </el-radio-group>
             </el-form-item>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="remark">
              <span slot="label">{{$t('note')}}</span>
              <el-input label="gdsag" type="textarea" resize="none" rows="5" v-model.trim="transform.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="transformOrderSubmit('ruleForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <!-- 转单前的确认框 -->
    <el-dialog :title="$t('choose')" :visible.sync="withdrawBool" width="50%">
      <el-form label-width="160px" :model="withdrawData" ref="withdrawForm" :rules="withdrawRules">

             <el-form-item prop="obtainedType" :label="$t('pleaseSelectReason')">
               <el-radio-group v-model="withdrawData.obtainedType">
                 <el-radio :label="0">{{$t('pauseSalseOrLeasing')}}</el-radio>
                 <el-radio :label="1">{{$t('propertyCondition')}}</el-radio>
                 <el-radio :label="2">{{$t('serviceRelated')}}</el-radio>  
                 <el-radio :label="3">{{$t('sandyService')}}</el-radio>
                 <el-radio :label="4">{{$t('transferProcess')}}</el-radio>
                 <el-radio :label="5">{{$t('whi')}}</el-radio>
                 <el-radio :label="6">{{$t('sstcp')}}</el-radio>
                 <el-radio :label="7">{{$t('affb')}}</el-radio>
                 <el-radio :label="8">{{$t('other')}}</el-radio>
               </el-radio-group>
             </el-form-item>

            <el-form-item prop="content" :label="$t('added')">
              <el-input label="gdsag" type="textarea" resize="none" rows="5" v-model.trim="withdrawData.content"></el-input>
            </el-form-item>

            <el-form-item :label="$t('UploadDocuments')">

                <el-upload name="submitFile" :file-list="withdrawImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadImg" :on-success="successUploadImg"
                        :on-remove="RemoveUploadImg" 
                        :limit="10"
                        :class="withdrawImgList.length>=3?'no-uploadIcon':''"
                        >
                        <i class="el-icon-plus"></i>
                </el-upload>

            </el-form-item>



      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withdrawBool = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="obtainedSubmit('withdrawForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: "complainDetail",
    props: ["code"],
    data() {
      return {
        checkVisible: false,
        detail: {
          houseId: null,
          city: "",
          remark: "",
          platform: 0,
          leaseType: 0,
          standby5: null,
          updateBy: null,
          complainExplain: "",
          standby2: null,
          standby1: null,
          standby4: null,
          id: null,
          standby3: null,
          complainCode: "",
          complainProofPic1: null,
          salesmanId: null,
          complainProofPic2: null,
          address: "",
          complainProofPic3: null,
          languageVersion: 0,
          mobile: "",
          updateTime: null,
          community: "",
          complainReason: null,
          subCommunity: "",
          houseMainImg: "",
          createBy: null,
          complainType: 0,
          createTime: null,
          poolId: null,
          name: "",
          status: 0
        },
        transform:{
          type:1,
          remark:''
        },
        rules:{
          type:[
          { required: true, message: 'type is required!', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: 'note is required!', trigger: 'change' }
          ]
        },
        withdrawData:{
          houseId:'',
          content:'',
          obtainedType:'',
          obtainedImg1:'',
          obtainedImg2:'',
          obtainedImg3:''
        },
        withdrawRules:{
          obtainedType:[
          { required: true, message: `${this.$t('pleaseSelectReason')}`, trigger: 'blur' }
          ],
          content: [
            { required: true, message: `${this.$t('Pleaseentertheremark')}`, trigger: 'change' }
          ]
        },
        withdrawBool:false,
        withdrawImgList:[]
      };
    },
    mounted(){
      this.withdrawData.houseId = this.detail.houseId;
    },
    methods: {
      transformOrder() {
        this.checkVisible = true;
        this.$refs['ruleForm'].resetFields();
      },
      transformOrderSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.checkVisible = false;
            let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
            this.$axios.post('/api/pc/house/complain/transfer', this.$qs.stringify({ id: this.detail.id, type: this.transform.type, remark: this.transform.remark }))
              .then(res => this.$router.push({ name: 'complain' }))
              .catch(err => this.$message.error(err.message))
              .finally(() => this.$nextTick(() => {
                loadingInstance.close();
              }));
          } else {
            return false;
          }
        });
      },
      closeOrder() {
        this.$prompt(this.$t('Pleaseentertheremark'), this.$t('prompt'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          inputPattern: /\S/,
          inputErrorMessage: 'note is required!'
        }).then(({ value }) => {
          let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
          this.$axios.post('/api/pc/house/complain/close', this.$qs.stringify({ id: this.detail.id, remark: value }))
            .then(res => this.$router.push({ name: 'complain' }))
            .catch(err => this.$message.error(err.message))
            .finally(() => this.$nextTick(() => {
              loadingInstance.close();
            }));
        });
      },

      obtained(){
        this.withdrawBool = true;
      },
      obtainedSubmit(formName) {
          this.withdrawData.houseId = this.detail.houseId;          
          if(this.withdrawImgList.length>0){
            this.withdrawImgList.forEach((ele,i)=>{
              this.withdrawData[`obtainedImg${i+1}`] = ele.response.fid;
            })
          }

          this.$refs[formName].validate((valid) => {
            if(valid){
              let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });

              this.$axios.post('/api/pc/house/apply/withdraw', this.$qs.stringify(this.withdrawData))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.withdrawBool = false;
              this.$router.go(-1);
            })
            .catch(err => {
              this.$message.error(err.message);
            }).finally(() => this.$nextTick(() => {
              loadingInstance.close();
            }))
            }else{

            }
          })
      },
      beforeUploadImg(){

      },
      successUploadImg(res,file,filelist){
        this.withdrawImgList = filelist;
      },
      RemoveUploadImg(file,filelist){
        this.withdrawImgList = filelist;
        // console.log( file )
        this.$axios.post('/api/pc/file/delete', 
          this.$qs.stringify({fid: file.response.fid }))
          .then((res) => {
          }).catch((err)=>{
            
          });        
      },
      previewImg(){

      }
      /**
      beforeUpload() {// before上传凭证

        if (this.detail.complainProofPic3)
          return false;
        else
          return true;
      },
      handleSuccess(res,file) {//success上传凭证
        if (!this.detail.complainProofPic1) {
          this.detail.complainProofPic1= res.fid;
        } else if (!this.detail.complainProofPic2) {
          this.detail.complainProofPic2 = res.fid;
        } else if (!this.detail.complainProofPic3) {
          this.detail.complainProofPic3 = res.fid;
        }
      }
      */
    },
    beforeMount() {
      //console.log("投诉id:", this.$props.code);
      let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
      this.$axios
        .post(`/api/pc/house/complain/detail/${this.$props.code}`)
        .then(res => this.detail = res.dataSet ? res.dataSet : this.detail)
        .catch(err => this.$message.error(err.message))
        .finally(() => this.$nextTick(() => {
          loadingInstance.close();
        }));
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .complain-detail {

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

    >.complain-info {
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

      >.complain-content {
        padding-left: 66px;
        display: flex;
        align-items: center;

        >p {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 212px 0 0;
          width: 100px;
          height: 55px;

          >span {
            color: #333333;
            font-size: 14px;
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

    >.credentials {
      >p {
        height: 14px;
        display: flex;
        align-items: center;
        border-left: 2px solid #00B660;
        text-indent: 3px;
        color: #333333;
        font-size: 14px;
        margin: 40px 0 20px 0;
      }

      >.upload-conrtol {
        margin-left: 6px;
        height: 100px;

        >img {
          width: 100px;
          height: 100px;
          margin: 0 10px 0 0;
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
    .el-radio-group{
      .el-radio{
        margin-left: 0px;
        display: block;
        margin-bottom: 10px;
      }
    }

  }
</style>