<template>
    <div class="contract-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:$route.query.type ==1?'/home/contractList/1': '/home/contractList/0' }"><span class="">{{$t('AmendingContract')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('Rentalcontractdetails')}}<br> Details of lease contract</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <ul class="passport-wrap" v-if="false">
            <li>
                landlord passport：
                <el-select v-model="detail.leaseType" :placeholder="$t('choose')" > 
                    <el-option
                    v-for="item in [
                    {'value':0,'label':$t('copyOfPOAImg')},
                    {'value':1,'label':$t('principalPassportImg')},
                    {'value':2,'label':$t('clientVisaImg')},
                    {'value':3,'label':$t('IDCardOfPrincipalImg')},
                    {'value':4,'label':$t('CertificateImg')},
                    {'value':5,'label':$t('ownerPassportImg')},
                    ]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="img-box">
                    <img v-lazy="detail.img1" alt="">
                    <img v-lazy="detail.img1" alt="">
                </div>
            </li>
            <li>
                tenant passport：
                <el-select v-model="detail.leaseType" :placeholder="$t('choose')" > 
                    <el-option
                    v-for="item in [{'value':'rent','label':$t('Rent')},{'value':'sale','label':$t('Sale')}]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="img-box">
                    <img v-lazy="detail.img1" alt="">
                    <img v-lazy="detail.img1" alt="">
                </div>
            </li>
        </ul>
        <div class="company-stamp">
            <img src="../../assets/images/company-b.png" alt="">
            <img src="../../assets/images/company-a.png" alt="">
        </div>
        <div class="header">
            <div class="position">
                <span>
                    Date <span v-for="(item,idx) in 3" :key="idx"> <i class="color-light">____</i> <i v-if="idx!=2"> /</i> </span>
                </span>
                <br>
                <span> No <i class="color-light">_____________</i> </span>
            </div>
            <p>TENANCY CONTRACT</p>
        </div>
        <ul class="contart-header">
            <li>Property Usage </li>
            <!-- <li>Industrial <i class="light-dot light"></i></li>
            <li>Commercial <i class="light-dot light"></i></li>
            <li>Residential <i class="light-dot light"></i></li> -->
            <el-radio-group v-model="detail.propertyUsage">
                <el-radio label="industrial">Industrial</el-radio>
                <el-radio label="commercial">Commercial</el-radio>
                <el-radio label="residential">Residential</el-radio>
            </el-radio-group>
        </ul>
        <ul class="contract-from">
            <li>
                <span>Owner Name： <input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerName"> </span>   
            </li>
            <li>
                <span>Landlord Name：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.landlordName"></span> 
            </li>
            <li>
                <span>Tenant Name：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.tenantName"> </span> 
            </li>
            <li>
                <span>Tenant Email：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.tenantEmail"> </span> 
                <span>Landlord Email：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.landlordEmail"> </span>
            </li>
            <li>
                <span>Tenant Phone：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.tenantPhone"> </span> 
                <span>Landlord Phone：<input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.landlordPhone"> </span> 
            </li>
            <li>
                <span>building name：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buildingName"></span> 
                <span>Property location：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.address"></span>
            </li>
            <li>
                <span>building area：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.houseAcreage"></span> 
                <span>Unit Type：
                      <el-select v-model="detail.leaseType" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in [{'value':'rent','label':$t('Rent')},{'value':'sale','label':$t('Sale')}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span> 
                <span>Unit number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.roomName"></span>
            </li>
            <li>
                <span>Premises No (DEWA)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyNo"></span>
                <span>Plot No：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.plotNo"></span>
            </li>
            <li>
                <span>Premises Period To：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.premisesPeriodTo"></span>
                <span>From：
                    <!-- <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.leaseStartDate"> -->
                    {{detail.leaseStartDate}}
                </span>
            </li>
            <li>
                <span>Annual Rent：
                    <!-- <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.leasePrice"> -->
                    AED{{detail.leasePrice}} Only
                </span>
            </li>
            <li>
                <!-- 合同有效期年限，不可更改，显示格式为1 Year /3 Years -->
                <span>Contract Value：
                    <!-- <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.contractValue"> -->
                    <i v-if="detail.contractValue==1">1 Year</i>
                    <i v-else>{{detail.payNode}} Years</i>
                </span>
            </li>
            <li>
                <span>Security Deposit Amount：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.securityDepositAmount"></span> 
                <span>Mode of payment：
                    <!-- 支付节点，不可修改 -->
                    <!-- <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.payNode"> -->
                    <i v-if="detail.payNode==1">1 cheque</i>
                    <i v-else>{{detail.payNode}} cheques</i>
                </span>
            </li>
        </ul>
        <div class="color-bar">Terms & Conditions:</div>
        <ul class="contract-clause">
            <li>1.The tenant has inspected the premises and agreed to lease the unit on its current condition. </li>
            <li>2.Tenant undertakes to use the premises for designated purpose, tenant has no rights to transfer or relinquish the tenancy contract either with or without counterpart to any without landlord written approval Also tenant is not allowed to sublease the premises or any part thereof to third partyin whole or in part unless it is legally permitted.</li>
            <li>3.The tenant undertakes not to make any amendments, modifications or addendums to the premises subject of the contract without obtaining the landlord written approval, tenant shall be liable for any damages or failure due to that.</li>
            <li>4.The tenant shall be responsible for payment of all electricity, water,cooling and gas charges resulting of occupying leased unit unless other condition agreed in written.</li>
            <li>5.The tenant must pay the rent amount in the manner and dates agreed with the landlord.</li>
            <li>6.The Tenant fully undertakes to comply with all the regulations and instructions related to the management of the property and the use of the premises and of common areas such (parking, swimming pools,gymnasium, etc...). </li>
            <li>7. Tenancy contract parties declare all mentioned emails addresses and phone numbers are correct, all formal and legal notifications will be sent to those addresses in case of dispute between parties.</li>
            <li>8. The Landlord undertakes to enable the tenant of the full use of the premises including its facilities (Swimming pool, gym, parking lot, etc)and do the regular maintenance as intended unless other condition agreed in written, and not to do any act that would detract from thepremises benefit.</li>
            <li>9.By signing this agreement from the first party, the “Landlord” hereby confirms and undertakes that he is the current owner of the property or his legal representative under legal power of attorney duly entitled by the competent authorities.</li>
            <li>10. Any disagreement or dispute may arise from execution or interpretation of this contract shall be settled by the Rental Dispute Center.</li>
            <li>11.This Contract is subject to all provisions of Law No (26) of 2OO7 regulating the relation between landlords and tenants in the Emirate of Dubai as amen- ded, and as it will be changed or amended from time to time, as long with any related legislations and regulations applied in the Emirate of Dubai. </li>
            <li>12.Any additional condition will not be considered in case it conflicts with law.</li>
            <li>13.In case of discrepancy occurs between Arabic and non Arabic texts with regards to the interpretation of this agreement or the scope of itsapplication, the Arabic text shall prevail.</li>
            <li>14.The Landlord undertakes to register this tenancy contract on EJARl affiliated to Dubai L and Department and provide with all required documents.</li>
        </ul>
        <div class="color-bar">Know your rights:</div>
        <ul class="contract-clause color-black">
            <li><i class="dot"></i>You may visit Rental Dispute Center website www.rdc.gov.ae and use Smart Judge service in case of any rental dispute between parties.</li>
            <li><i class="dot"></i>Law No 26 of 2007 regulating relationship between landlords and tenants.</li>
            <li><i class="dot"></i>Law No 33 of 2018 amending law 26 ofyear 2007. </li>
            <li><i class="dot"></i>Law No 43 of 2013 determining rent increases for properties.</li>
        </ul>
        <div class="color-bar">Attachments for EJARI registration:</div>
        <ul class="contract-clause">
            <li>1.Original unified tenancy contract.</li>
            <li>2.Copy of Emirates ID or passport for tenant (individuals) Or trade license for tenant (companies).</li>
            <li>3.Original Emirates lD of applicant or representative card by DNRD.</li>
        </ul>
        <div class="color-bar">Additional Terms:</div>
        <ul class="contract-clause">
            <li v-for="(item,idx) in 8" :key="idx">
                <!-- {{idx+1}}. <input type="text" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]">  -->
                {{idx+1}}.<textarea name="" id="" rows="3" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]"></textarea>                  
            </li>
            <p class="color-black">Note: You may add an addendum to this tenancy contract in case you have additional terms while it needs to be signed by all parties.</p>
        </ul>
        <ul class="sign-position color-black">
            <li>Tenant Signature:</li>
            <li>Landlord Signature:</li>
        </ul>
        <!-- <div class="section mb-20">
            <p class="section-title">备注</p>
            <textarea name="" id=""  rows="5" style="width:100%" :placeholder="$t('PleaseEnter')" v-model="detail.remark"></textarea>
        </div> -->        
        <!-- <div class="section mb-20">
            <p class="section-title">请选择生成语言</p>
                <el-radio-group v-model="detail.languageVersion">
                    <el-radio :label="1">English</el-radio>
                    <el-radio :label="2">Arabic</el-radio>
                </el-radio-group>
        </div> -->
        <el-row v-if="$route.query.type ==1">
            <el-button v-if="isDelivery" type="success" @click="GenerateContract()">{{$t('save')}}</el-button>
            <el-button v-else type="success" @click="confirmBool=true">{{$t('Generatethecontract')}}</el-button>
        </el-row>

        <el-row v-else>
            <el-button type="warning" @click="editContract()" :disabled="detail.orderStatus==-3 || detail.orderStatus==-2?false:true">{{$t('AmendingContract')}}</el-button>
            <!--  detail.orderStatus==-3或-2的时候才可以修改合同单 -->
        </el-row>


        <!-- 弹窗 - 是否生成合同单 生成/不生成 -->
        <el-dialog :title="$t('prompt')" :visible.sync="confirmBool">
            <div>
                {{$t('Ifneedgenerateacontractticket')}}
                <el-radio-group v-model="detail.isDelivery">
                    <el-radio :label="0">{{$t('Generatethecontractwithdeliveryticket')}}</el-radio>
                    <el-radio :label="1">{{$t('Generatethecontractwithoutdeliveryticket')}}</el-radio>
                </el-radio-group>
            </div>
            <div class="section mb-20" v-if="detail.isDelivery===0">
                <p class="">{{$t('meetingTimeAndMeetingPlace')}}</p>
                <ul class="contract-from">
                    <li>
                        <span>owner's name:{{detail.memberName}}</span>
                        <span>estimated time: 
                        <el-date-picker
                            v-model="detail.estimatedTime"
                            type="datetime"
                            :placeholder="$t('PleaseSelect')"
                            default-time="10:00:00"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            @change="getTESTtime" ref="datePicker">
                        </el-date-picker>
                        <!-- <el-date-picker
                            v-model="detail.estimatedTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker> -->
                        </span>
                    </li>
                    <li>
                        <span>phone:{{detail.memberMoble}}</span>
                        <span>
                            appointment Meet Place:
                            <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.appointmentMeetPlace">
                        </span>
                    </li>
                </ul>
            </div> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmBool = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="GenerateContract()">{{$t('confirm')}}</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
export default {
  data() {
    return {
        pickerOptions: {
        // 限制预约时间为未来两天内
            disabledDate(time) {
                return (
                    Date.now()-24*60*60*1000 > time.getTime() ||
                    time.getTime() - Date.now() > 2 * 24 * 60 * 60 * 1000
                );
            }
        },        
        detail:{
            orderId	                           :this.$route.query.id, //string	是	订单id		
            languageVersion	                   :2, //string	否	语言版本 0中文 1英文 2阿拉伯语		
            propertyUsage	                   :"industrial", //string	否	财产的使用 Industrial工业 Commercial商业 Residential住宅		
            ownerName	                       :"", //string	否	业主名称		
            landlordName	                   :"", //string	否	房东名称		
            tenantName	                       :"", //string	否	租客名称		
            tenantEmail	                       :"", //string	否	租客Email		
            tenantPhone	                       :"", //string	否	租客电话		
            buildingName	                   :"", //string	否	楼名		
            houseAcreage	                   :"", //string	否	产权大小		
            propertyNo	                       :"", //string	否	物业		
            premisesPeriodTo	               :"", //string	否			
            leasePrice	                       :"", //string	否	每年租金		
            contractValue	                   :"", //string	否	合同金额		
            securityDepositAmount	           :"", //string	否	保证金额		
            landlordEmail	                   :"", //string	否	房东Email		
            landlordPhone	                   :"", //string	否	房东电话		
            address	                           :"", //string	否	地址		
            leaseType	                       :"", //string	否	产权类型		
            plotNo	                           :"", //string	否	图号		
            leaseStartDate	                   :"", //string	否	来源		
            roomName	                       :"", //string	否	门牌号		
            payNode	                           :"", //string	否	付款方式
            additionalTerms                    : [],		
            additionalTerm1	                   :"", //string	否	附加条款1		
            additionalTerm2	                   :"", //string	否	附加条款2		
            additionalTerm3	                   :"", //string	否	附加条款3		
            additionalTerm4	                   :"", //string	否	附加条款4		
            additionalTerm5	                   :"", //string	否	附加条款5		
            additionalTerm6	                   :"", //string	否	附加条款6		
            additionalTerm7	                   :"", //string	否	附加条款7		
            additionalTerm8	                   :"", //string	否	附加条款8		
            remark	                           :"", //string	否	备注		
            estimatedTime:"",
            appointmentMeetPlace:"",  
            isDelivery:'',
            orderStatus:'',
       },
       confirmBool:false,
       isDelivery:''
    };
  },
  mounted(){
      this.queryDetail();
    //   console.log( this.$route.query.id ,this.$route.query.isDelivery)
      if(this.$route.query.isDelivery){
          this.isDelivery = this.$route.query.isDelivery;
      }else{
          this.isDelivery = null;
      }
  },
  methods:{
    queryDetail(){
        this.$axios
        .post(
            "/api/pc/contract/detail",
            this.$qs.stringify({ orderId: this.$route.query.id })
        )
        .then(res => {
            // this.detail = res.dataSet;
            if(res.dataSet.additionalTerms==null ){
                res.dataSet.additionalTerms = [];
            }
            for(let k in res.dataSet){
                this.detail[k] = res.dataSet[k];
            }
            this.detail.ownerMobile = res.dataSet.memberMoble;
            console.log( this.detail ,'detail;');
        })
        .catch(err => this.$message.error(err.message));
      },
    GenerateContract(){
        if(this.isDelivery){
            this.detail.isDelivery = this.isDelivery;
        }else{
        // propertyUsage
            if(this.detail.isDelivery===0){
                if( this.detail.estimatedTime=="" ){
                    this.$message({
                    message: this.$t('pleaseFilemeetingTime'),
                    type: 'warning'
                    });   
                    return false;             
                }else if(this.detail.appointmentMeetPlace==""){
                    this.$message({
                        message: this.$t('pleaseFilemeetingPlace'),
                        type: 'warning'
                    }); 
                    return false;
                }
            }else{
                this.confirmBool = false;
            }
        }

        if( this.detail.additionalTerms.length >0){
            this.detail.additionalTerms.forEach((ele,i)=>{
                this.detail['additionalTerm'+(i+1)] = ele
            })
        }

        delete this.detail.additionalTerms ;
        
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$axios.post('/api/pc/generating/contract',
          this.$qs.stringify(this.detail) 
          ).then(res=>{
              if(res.result==0){
                    loading.close();
                    this.$message.success( this.$t('GeneratethecontractSuccess'));
                    this.$router.push('/home/contractList/1');
              }
          }).catch(err => this.$message.error(err.message)); 
    },
    getTESTtime(val){
        // 48小时内
        let selectTimeStr = new Date(val).getHours()*3600 + new Date(val).getMinutes()*60 + new Date(val).getSeconds();
        let nowTimeStr = new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds();
        // 如果是当天，选择的时间应为当前时间两小时后
        if( new Date(val).getDate() == new Date().getDate() ){
            if(selectTimeStr<nowTimeStr+2*3600){
                this.$refs.datePicker.showPicker();
                this.$message.error('Please select two hours after the current time!');
                this.$set(this.detail,'estimatedTime','');
                //housingApplication.appointmentDoorTime   
            }
        }else if( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000) { //如果是最后一天,所选择的时间不能超过当前时分秒
            if( selectTimeStr > nowTimeStr ){
                this.$refs.datePicker.showPicker();
                this.$message.error('Not more than 48 hours! Please reselect'); 
                this.$set(this.detail,'estimatedTime','');     
            }
        }  
    },
    editContract(){
        // if( this.detail.additionalTerms.length >0){
        //     this.detail.additionalTerms.forEach((ele,i)=>{
        //         this.detail['additionalTerm'+(i+1)] = ele
        //     })
        // }
        this.$axios.post('/api/pc/contract/update',
          
          this.$qs.stringify({orderId:this.$route.query.id,additionalTerms:JSON.stringify(this.detail.additionalTerms)}) 
          ).then(res=>{
              if(res.result==0){
                    this.$message.success(this.$t('Modifiedsuccessfully'));
                    this.queryDetail();
              }
          }).catch(err => this.$message.error(err.message));
      }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contract-detail{
    color:#333;
    input{border: none;&:focus{outline: none;}}
}
.company-stamp{
    height: 40px;
    margin: 5px 40px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;  
}
.header{
    position: relative;
    margin-bottom: 35px;
    padding-left: 20px;
    .position{
        position: absolute;
        left: 20px;
        span{
            &:nth-of-type(1){
                display: inline-block;
                margin-bottom: 7px;
            }
        }
    }
    p{
        color: #030303;
        font-weight: 500;
        text-align: center;
        padding: 22px 0;
    }
}
.contart-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-left: 20px;
    .light-dot{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #D8D8D8;
        vertical-align: bottom;
    }
}
.contract-from{
    padding-left: 20px;
    >li{
        margin-bottom: 10px;
        display: flex;
        >span{ width: 33%;}
    }
}
.color-bar{
    height: 36px;
    line-height: 36px;
    color: #fff;
    background: #80BA6B;
    padding-left: 22px;
    margin: 20px 0;
}
.contract-clause{
    padding-left: 20px;
    &.color-black{color: #000;}
    li{
        line-height: 20px;
        margin-bottom: 10px;
        i.dot{
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #000;
            border-radius: 50%;
            margin-right: 10px;
        }
        input{
            border: none;
            outline:none;
            font-size: 14px;
            &:focus{ outline:none}
            &::-webkit-input-placeholder {color: #ccc; font-size: 14px;}
        }
    textarea{
        border: none;
        outline: none;
        font-size: 14px;
        line-height: 20px;
        width: 90%;
        font-family: 'micosoft yahei';
        margin-top: -3px;
        vertical-align: top;
        &:focus {
            outline: none;
        }
        &::-webkit-input-placeholder {
            color: #ccc;
            font-size: 14px;
        }
    }        
        i.text{color: #ccc;font-style: normal;}
    }
}
.sign-position{
    display: flex;
    padding-left: 20px;
    margin: 40px 0;
    li{
        width: 50%;
    }
}
.el-row{
    text-align: center;
    margin-bottom: 84px;
    button{
        width: 240px;
        height: 44px;
        font-size: 16px;
    }
}
.el-dialog{
    .contract-from{
        li{
            span:nth-child(1){width: 30%}
            span:nth-child(2){width: 70%;}
        }
    }
}
</style>