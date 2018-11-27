<template>
    <div class="contract-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/home/contract'}"><span class="">{{$t('AmendingContract')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('Salescontractdetails')}}<br> Details of lease contract</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="company-stamp">
            <img src="../../assets/images/company-a.png" alt="">
            <div>
                <span class="black_s">Property Sale Conrtact between Seller and Buyer</span>
                <br>
                <span class="font-s">Contract Number</span>
            </div>
            <img src="../../assets/images/company-b.png" alt="">
        </div>

        <div class="color-bar dark-green">PART 1. THE PARTIES</div>
        <div class="color-bar">THE PROPERTY OWNER'S DETAILS (FIRST PARTY)</div>
        <ul class="contract-from">
            <li><span>Name Of Owner：</span>    </li>
            <li><span>Nationality：</span> </li>
            <li><span>ID Card Number：</span> </li>
            <li><span>Passport No：</span> <span>Expiry Date：</span></li>
            <li><span>Mobile：</span> <span>P.O.Box：</span> </li>
            <li><span>Phone：</span> <span>Fax：</span></li>
            <li><span>Address：</span></li>
            <li><span>Email：</span></li>
        </ul>

        <div class="color-bar">THE BUYER'S DETAILS (SECOND PARTY)</div>
        <ul class="contract-from">
            <li><span>Name Of Owner：</span>    </li>
            <li><span>Nationality：</span> </li>
            <li><span>ID Card Number：</span> </li>
            <li><span>Passport No：</span> <span>Expiry Date：</span></li>
            <li><span>Mobile：</span> <span>P.O.Box：</span> </li>
            <li><span>Phone：</span> <span>Fax：</span></li>
            <li><span>Address：</span></li>
            <li><span>Email：</span></li>
        </ul>

        <div class="color-bar dark-green">PART 2. THE PROPERTY</div>
        <div class="color-bar">THE PROPERTY DETAILS</div>
        <ul class="contract-from">
            <li><span>Property Status：</span>  <span>Plot Number：{{detail.plotNumber}}</span>  </li>
            <li><span>Type of Area：{{detail.typeOfArea===0?"Free Hold":"Lease Hold"}}</span><span>Title Deed Number：{{detail.titleDeedNumber}}</span> </li>
            <li><span>Location：{{detail.address}}</span> <span>Property Number：{{detail.propertyNumber}}</span></li>
            <li><span>Type of Property：{{detail.leaseType==0?$t('Rent'):$t('Sale')}}</span> <span>Project Name：{{detail.subCommunity}}</span></li>
            <li><span>Area：{{detail.community}}</span> <span>Master Developer Name：{{detail.masterDevelpoerName}}</span> </li>
            <li><span>Present Use：</span> <span>Community Number：</span></li>
            <li><span>Additional Information：</span></li>
            <li><span>Type Of Sale：</span> <span>NOC from Developer：</span></li>
        </ul>

        <div class="color-bar">PROPERTY FINANCIALS</div>
        <ul class="contract-from">
            <li><span>Listed Price：</span> <span>Original Price：</span></li>
            <li><span>Paid Amount：</span> <span>Sell Price：{{detail.leasePrice}}</span> </li>
            <li><span>Service Charge：</span> <span>Balance Amount：</span></li>
        </ul>
        <div class="color-bar dark-green">PART 3. COMMISSION & DURATION OF THE AGREEMENT</div>
        <ul class="contract-from margin20">
            <li><span>Seller's Agent's Commission：0</span> <span>Buyer's Agent's Commission：</span></li>
        </ul>

        <div class="color-bar">THE SELLER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li><span>Office Name：UCF Real Estate Broker</span></li>
            <li><span>License Authority：DLD</span></li>
            <li><span>ORN：20666</span> <span>License Number：796680</span></li>
            <li><span>Fax：</span> <span>Phone：+971 4 565 6182</span></li>
            <li><span>Address：International City CBD D02-S01,Dubai,UAE</span> </li>
            <li><span>Email：sandy.zuo@ucforward.com</span></li>
            <li><span>Agent Name：Yi Zuo</span></li>
            <li><span>BRN：34970</span> <span>Mobile：</span></li>
        </ul>

        <div class="color-bar">THE BUYER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li><span>Office Name：UCF Real Estate Broker</span></li>
            <li><span>License Authority：DLD</span></li>
            <li><span>ORN：20666</span> <span>License Number：796680</span></li>
            <li><span>Fax：</span> <span>Phone：+971 4 565 6182</span></li>
            <li><span>Address：International City CBD D02-S01,Dubai,UAE</span> </li>
            <li><span>Email：sandy.zuo@ucforward.com</span></li>
            <li><span>Agent Name：Yi Zuo</span></li>
            <li><span>BRN：34970</span> <span>Mobile：</span></li>
        </ul>

        <div class="color-bar dark-green">PART 4. THE MORTGAGE INFORMATION</div>
        <div class="color-bar">MORTGAGE INFORMATION</div>
        <ul class="contract-from">
            <li><span>Mortgagee：</span>  </li>
            <li><span>Mortgage Amoun：</span>  </li>
            <li><span>Paid Amount：</span>  </li>
            <li><span>Mortgage Period From：</span>  </li>
            <li><span>Mortgage Period To：</span>  </li>
            <li><span>Mortgage Level：</span>  </li>
            <li><span>NOC Attachred：</span>  </li>
        </ul>

        <div class="color-bar dark-green">PART 5: TENANCY CONTRACT INFORMATION</div>
        <div class="color-bar">TENANCY CONTRACT INFORMATION</div>
        <ul class="contract-from">
            <li><span>Property Rented：</span>  </li>
            <li><span>Number of Rented Properties：</span>  </li>
        </ul>

        <div class="color-bar dark-green">PART 6. THE SIGNATURE OF THE PARTIES</div>
        <div class="color-bar">FIRST PARTY : THE OWNERS(S)</div>
        <ul class="contract-from">
            <li><span>Name(English)：</span>  </li>
            <li><span>Name (Arabic)：</span>  </li>
            <li><span>Legal Representative Name(English)：</span>  </li>
            <li><span>Legal Representative Name(Arabic)：</span>  </li>
            <li><span>Representing Type：</span>  </li>
            <li><span>Power of attorney number：</span>  </li>
            <li><span>Signature：</span></li>
        </ul>

        <div class="color-bar">SECOND PARTY : THE BUYER(S)</div>
        <ul class="contract-from">
            <li><span>Name(English)：</span>  </li>
            <li><span>Name (Arabic)：</span>  </li>
            <li><span>Legal Representative Name(English)：</span>  </li>
            <li><span>Legal Representative Name(Arabic)：</span>  </li>
            <li><span>Representing Type：</span>  </li>
            <li><span>Power of attorney number：</span>  </li>
            <li><span>Signature：</span></li>
        </ul>

        <div class="color-bar">Terms & Conditions:</div>
        <ul class="contract-clause">
            <li> <i class="color-light">{{$t('Pleasefillinthedate')}}</i> Both parties have agreed with full legal capacity as follows: </li>
            <li>1.The above introduction is an integral part of this contract and shall be read and construed therewith. </li>
            <li>2.The "Seller" undertakes to provide all documents proving that he is the current owner of the property, Also the "Seller" undertakes to complete all procedures and requirements to transfer the property to the buyer's name at Dubai Land Department immediately after taking possession of the agreed price under this contract ,and not later than.</li>
            <li>3.The "Buyer" agrees to pay to the seller:</li>
            <li>A.A deposit Cheque of AED (&nbsp; &nbsp; &nbsp; ) simultaneously with signing this contract.</li>
            <li>B.Balance amount of the sale price, AED (&nbsp; &nbsp; &nbsp;  ) by Manager Cheque or any other guaranteed method of payment that is acceptable by the Dubai Land Department, as follows:</li>
            <li>1.On加过户时间</li>
            <li>2.Deposit Cheque will be refunded to the Buyer accordingly</li>
            <li>4.Both parties agree to pay transfer fees to the Land Department as follows:</li>
            <li>A.The "seller" ( 0 % ） representing ( 0 % ）of the fees amount payable to the Land Department at the date of transfer.</li>
            <li>B.The "buyer" ( 4 %) representing ( 100 %) of the fees amount payable to the Land Department at the date of transfer.</li>
            <li>5.Both parties agree to pay an agent / Broker commission - if any - as follows: </li>
            <li>A.The seller's agent commission: ( 0 %) paid by the seller. ( 0 %) paid by the buyer.</li>
            <li>B.The buyer's agent commission: ( 0 %) paid by the seller. ( 0 %) paid by the buyer.</li>
            <li>6.In the event that the "buyer" fails to pay the payments as agreed date in clause (3) or fails to complete the transfer on the agreed date due to his own act or omissions, then the "seller" has the right to terminate this contract, and he shall be entitled to retain the deposit, as long as the termination of the contract was due to violation of the agreed terms, unless they agreed amicably to different terms or dates.</li>
            <li>7.In the event that the "seller" fails to complete the transfer on the agreed date due to his own act or omissions, then the full deposit will be refunded to the buyer, and also the "seller" agrees to pay the same deposit amount to the buyer as a compensation for the loss of the said property, unless they agreed amicably to different terms or dates.</li>
            <li>8.Both parties confirm and undertake that the sale price is non- changeable and they shall not increase or decrease it whatever occurred in the market prices.</li>
            <li>9.The “Seller” undertakes to settle any and all outstanding penalties, taxes, charges or any unpaid fees due to the developer or any third party prior to the date of transfer.</li>
            <li>10.The "seller" hereby confirms that the property does not have any disputes, mortgages, lease agreements or restrictions which may prevent the buyer to take advantage of it unless it is clearly mentioned in this contract.</li>
            <li>11.The "seller" hereby confirms that the sold property is free of debts, rights, or any other unknown claims, in the case of any, the first party undertakes that it will be in his own full responsibility.</li>
            <li>12.The "buyer" acknowledges that he inspected and previewed the property and agreed to buy it on its current condition .</li>
            <li>13.By signing this contract from the first party, the "seller" hereby confirms and undertakes that he is the current owner of the property or his legal representative under legal power of attorney duly authorized by the competent authorities.</li>
            <li>14.The parties agree to consider any conditions or clauses contained in any other document or agreement in a manner contrary to what is explicitly agreed in this contract is not valid against them, and will not arrange any rights or obligations for any party against the other party.</li>
            <li>15.The "seller" undertakes to hand over the property to the "buyer" on the date of transfer as it previewed when signing the contract, along with any cheques or cash payments arising from lease agreements – if any - from &nbsp;&nbsp;&nbsp;  / &nbsp;&nbsp;&nbsp;  / .</li>
            <li>16.By signing this contract, both parties approve that they agreed all its terms conditions.</li>
            <li>17.This contract is governed by and shall be construed in accordance with the local and federal laws applicable within the Emirate of Dubai</li>
            <li>18.Any dispute arising in connection with this contract or its interpretation shall be resolved amicably between the parties within (7) seven days from the date of notification by one party to the other regarding the dispute, in the case if the parties unable to reach an amicable solution, the dispute shall be referred to the competent courts in the Emirate of Dubai.The address of each party in this contract will be consider as his chosen address in this regard.</li>
            <li>19.In case of discrepancy occurs between Arabic and English texts with regards to the interpretation of this contract or the scope of its application, the Arabic text shall prevail.</li>
            <li>20.The parties have signed this contract in three origin al copies in both Arabic and English language, each party has a copy, and the third copy will submit to The Land Department at the date of transfer.</li>
        </ul>
        <div class="color-bar">Additional Terms:</div>
        <ul class="contract-clause">
            <li v-for="(item,idx) in 8" :key="idx">
                 <!-- <input type="text" :placeholder="$t('Pleasefillintheadditionalterms')"  v-model="detail.additionalTerms[idx]" :readonly="detail.orderStatus!=-3 && detail.orderStatus!=-2">  -->
                {{idx+1}}.<textarea name="" id="" rows="3" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]" :readonly="detail.orderStatus!=-3 && detail.orderStatus!=-2"></textarea>
            </li>
        </ul>
        <ul class="sign-position color-black">
            <li>First Party "seller":</li>
            <li>Second Party "Buyer" :</li>
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
        transferDate: null,
        orderStatus:''
      },
    };
  },
  beforeMount() {
    console.log("id:", this.$props.id);
    this.queryDetail();
  },
  mounted(){
      
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
            console.log( res.dataSet  )
        })
        .catch(err => this.$message.error(err.message));
      },
      editContract(){
          console.log(this.additionalTerms)
          this.$axios.post('/api/pc/contract/update',
          this.$qs.stringify({orderId:this.$props.id,additionalTerms:JSON.stringify(this.detail.additionalTerms)}) 
          ).then(res=>{
              if(res.result==0){
                    this.$message.success('修改成功！');
                    this.queryDetail();
              }
          }).catch(err => this.$message.error(err.message));
      }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contract-detail {
  color: #333;
}
.company-stamp {
  height: 40px;
  margin: 5px 40px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  span.black_s{
      color: #030303;
      font-size: 14px;
      font-weight:500;
  }
}
.contract-from {
  padding-left: 20px;
  &.margin20{margin-top: 40px;}
  > li {
    margin-bottom: 10px;
    display: flex;
    > span {
      width: 50%;
    }
  }
}
.color-bar {
  height: 36px;
  line-height: 36px;
  color: #fff;
  background: #80ba6b;
  padding-left: 22px;
  margin: 20px 0;
  &.dark-green{
      background: #679753;
      padding-left: 30px;
      margin-bottom: -20px;
  }
}
.contract-clause {
  padding-left: 20px;
  &.color-black {
    color: #000;
  }
  li {
    line-height: 20px;
    margin-bottom: 10px;
    i.dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #000;
      border-radius: 50%;
      margin-right: 10px;
    }
    input {
      border: none;
      outline: none;
      font-size: 14px;
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder {
        color: #ccc;
        font-size: 14px;
      }
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
    i.text {
      color: #ccc;
      font-style: normal;
    }
  }
}
.sign-position {
  padding-left: 20px;
  margin: 40px 0;
  li:nth-of-type(1){margin-bottom: 20px;}
}
.el-row {
  text-align: center;
  margin-bottom: 84px;
  button {
    width: 240px;
    height: 44px;
    font-size: 16px;
  }
}
</style>