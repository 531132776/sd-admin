<template>
    <div class="contract-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/home/contract'}"><span class="">{{$t('AmendingContract')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('Rentalcontractdetails')}}<br> Details of lease contract</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="company-stamp">
            <img src="../../assets/images/company-a.png" alt="">
            <img src="../../assets/images/company-b.png" alt="">
        </div>
        <div class="header">
            <div class="position">
                <span>
                    Date <span v-for="(item,idx) in 3" :key="idx"> <i class="color-light">____</i> <i v-if="idx!=2"> /</i> </span>
                </span>
                <br>
                <span> No <i class="color-light"> ________________</i> </span>
            </div>
            <p>TENANCY CONTRACT</p>
        </div>
        <ul class="contart-header">
            <li>Property Usage </li>
            <li>Industrial <i class="light-dot light"></i></li>
            <li>Commercial <i class="light-dot light"></i></li>
            <li>Residential <i class="light-dot light"></i></li>
            <li>{{$t('Dontfillin')}}</li>
        </ul>
        <ul class="contract-from">
            <li><span>Owner Name：</span>    </li>
            <li><span>Landlord Name：</span> </li>
            <li><span>Tenant Name：</span> </li>
            <li><span>Tenant Emall：</span> <span>Landlord Emall：</span></li>
            <li><span>Tenant Phone：</span> <span>Landlord Phone：</span> </li>
            <li><span>Building Name：{{detail.buildingName}}</span> <span>Location：{{detail.address}}</span></li>
            <li><span>Property Siz：{{detail.houseAcreage}}</span> <span>Property Type：{{detail.leaseType==0?$t('Rent'):$t('Sale')}}</span> <span>Property NO：{{detail.roomName}}</span></li>
            <li><span>Property NO(DWWA)：</span><span>Plot No：</span></li>
            <li><span>Premises Period To：{{detail.contractPeriodTo}}</span><span>From：{{detail.leaseStartDate}}</span></li>
            <li><span>Annual Rent：{{detail.leasePrice}}</span></li>
            <li><span>Contract Value：</span></li>
            <li><span>Security Deposit Amount：{{detail.securityDepositAmount}}</span> <span>Mode of payment：{{detail.payNode}}</span></li>
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
                <!-- {{idx+1}}. 
                <input type="text" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]" :readonly="detail.orderStatus!=-3 && detail.orderStatus!=-2">  -->
                {{idx+1}}.<textarea name="" id="" rows="3" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]" :readonly="detail.orderStatus!=-3 && detail.orderStatus!=-2"></textarea>               
            </li>
            <p class="color-black">Note: You may add an addendum to this tenancy contract in case you have additional terms while it needs to be signed by all parties.</p>
        </ul>
        <ul class="sign-position color-black">
            <li>Tenant Signature:</li>
            <li>Landlord Signature:</li>
        </ul>
        <el-row>
            <el-button type="warning" plain @click="editContract()" :disabled="detail.orderStatus!=-3 && detail.orderStatus!=-2">{{$t('AmendingContract')}}</el-button>
            <!--  detail.orderStatus==-3或-2的时候才可以修改合同单 -->
            <!-- <el-button type="success">保存并发给用户</el-button> -->
        </el-row>
    </div>
</template>

<script>
export default {
  name: "contractDetail",
  props: ["id"],
  data() {
    return {
      detail: {
        buildingName: "",
        address: "",
        houseAcreage: 0,
        leaseType: 0,
        roomName: "",
        contractPeriodTo: null,
        leaseStartDate: "",
        leasePrice: 1,
        securityDepositAmount: 0.1,
        payNode: 1,
        additionalTerms: [],
        plotNumber: null,
        typeOfArea: null,
        titleDeedNumber: null,
        propertyNumber: null,
        community: "",
        subCommunity: "",
        masterDevelpoerName: null,
        transferDate: null
      },
    };
  },
  beforeMount() {
    // console.log("id:", this.$props.id);
    this.queryDetail();
  },
  methods:{
      queryDetail(){
        this.$axios
        .post(
            "/api/pc/contract/detail",
            this.$qs.stringify({ orderId: this.$props.id })
        )
        .then(res => {
            this.detail = res.dataSet;
            
            if(this.detail.additionalTerms==null ){
                this.detail.additionalTerms = [];
            }
            
        })
        .catch(err => this.$message.error(err.message));
      },
      editContract(){
        //   console.log(this.additionalTerms)
          this.$axios.post('/api/pc/contract/update',
          
          this.$qs.stringify({orderId:this.$props.id,additionalTerms:JSON.stringify(this.detail.additionalTerms)}) 
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
</style>