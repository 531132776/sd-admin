<template>
    <div class="contract-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:'/home/contractList'}"><span class="">{{$t('AmendingContract')}}</span></el-breadcrumb-item>
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
            <li>
                <span>Name Of Owner：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.nameOfOwner"></span>    
            </li>
            <li>
                <span>Nationality：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNationality"></span> 
            </li>
            <li>
                <span>ID Card Number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerIDCardNumber"></span> 
            </li>
            <li>
                <span>Passport No：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPassportNo"></span> 
                <span>Expiry Date：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerExpiryDate"></span>
            </li>
            <li>
                <span>Mobile：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerMobile"></span> 
                <span>P.O.Box：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPOBox"></span> 
            </li>
            <li>
                <span>Phone：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPhone"></span> 
                <span>Fax：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerFax"></span>
            </li>
            <li>
                <span>Address：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerAddress"></span>
            </li>
            <li>
                <span>Email：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerEmail"></span>
            </li>
        </ul>

        <div class="color-bar">THE BUYER'S DETAILS (SECOND PARTY)</div>
        <ul class="contract-from">
            <li>
                <span>Name Of Buyer: <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.nameOfBuyer"></span>    
            </li>
            <li>
                <span>Nationality：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNationality"></span> 
            </li>
            <li>
                <span>ID Card Number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerIDCardNumber"></span> 
            </li>
            <li>
                <span>Passport No：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPassportNo"></span> 
                <span>Expiry Date：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerExpiryDate"></span>
            </li>
            <li>
                <span>Mobile：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerMobile"></span> 
                <span>P.O.Box：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPOBox"></span> 
            </li>
            <li>
                <span>Phone：<input type="text" :placeholder="$t('PleaseEnter') " v-model="detail.buyerPhone"></span> 
                <span>Fax：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerFax"></span>
            </li>
            <li>
                <span>Address：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAddress"></span>
            </li>
            <li>
                <span>Email：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerEmail"></span>
            </li>
        </ul>

        <div class="color-bar dark-green">PART 2. THE PROPERTY</div>
        <div class="color-bar">THE PROPERTY DETAILS</div>
        <ul class="contract-from">
            <li>
                <span>Property Status：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyStatus"></span>  
                <span>Plot Number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.plotNumber"></span>  
            </li>
            <li>
                <span>Type of Area：
                    <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.typeOfArea"></span>
                <span>Title Deed Number：
                    <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.titleDeedNumber">
                </span> 
            </li>
            <li>
                <span>Location：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.titleDeedNumber"></span> 
                <span>Property Number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyNumber"></span>
            </li>
            <li>
                <span>Type of Property：
                    <el-select v-model="detail.typeOfProperty" placeholder="请选择">
                        <el-option
                        v-for="item in [{'value':'rent','label':$t('Rent')},{'value':'sale','label':$t('Sale')}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span> 
                <span>Project Name：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.subCommunity"></span>
            </li>
            <li>
                <span>Area：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.area"></span> 
                <span>Master Developer Name：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.masterDevelpoerName"></span> 
            </li>
            <li>
                <span>Present Use：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.presentUse"></span> 
                <span>Community Number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.communityNumber"></span>
            </li>
            <li>
                <span>Additional Information：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.additionalInformation"></span>
            </li>
            <li>
                <span>Type Of Sale：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.typeofSale"></span> 
                <span>NOC from Developer：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.NOCFromDeveloper"></span>
            </li>
        </ul>

        <div class="color-bar">PROPERTY FINANCIALS</div>
        <ul class="contract-from">
            <li>
                <span>Listed Price：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.listedPrice"></span> 
                <span>Original Price：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.originalPrice"></span>
            </li>
            <li>
                <span>Paid Amount：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.paidAmount"></span> 
                <span>Sell Price：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellPrice"></span> 
            </li>
            <li>
                <span>Service Charge：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.serviceCharge"></span> 
                <span>Balance Amount：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.balanceAmount"></span>
            </li>
        </ul>
        <div class="color-bar dark-green">PART 3. COMMISSION & DURATION OF THE AGREEMENT</div>
        <ul class="contract-from margin20">
            <li>
                <span>Seller's Agent's Commission：{{detail.sellerAgentCommission}}</span> 
                <span>Buyer's Agent's Commission：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAgentCommission"></span>
            </li>
        </ul>
        <!--固定信息 -->
        <div class="color-bar">THE SELLER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li>
                <span>Office Name：<b>{{detail.sellerOfficeName}}</b></span>
            </li>
            <li>
                <span>License Authority：<b>{{detail.sellerLicenseAuthority}}</b></span>
            </li>
            <li>
                <span>ORN：<b>{{detail.sellerORN}}</b></span> 
                <span>License Number：<b>{{detail.sellerLicenseNumber}}</b></span>
            </li>
            <li>
                <span>Fax：<b>{{detail.sellerFax}}</b></span> 
                <span>Phone：<b>{{detail.sellerPhone}}</b></span>
            </li>
            <li>
                <span>Address：<b>{{detail.sellerAddress}}</b></span> 
            </li>
            <li>
                <span>Email：<b>{{detail.sellerEmail}}</b></span>
            </li>
            <li>
                <span>Agent Name：<b>{{detail.sellerAgentName}}</b></span>
            </li>
            <li>
                <span>BRN：<b>{{detail.sellerBRN}}</b></span> 
                <span>Mobile：<b>{{detail.sellerMobile}}</b></span>
            </li>
        </ul>
        <!--固定信息 -->
        <div class="color-bar">THE BUYER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li>
                <span>Office Name：<b>{{detail.buyerOfficeName}}</b></span>
            </li>
            <li>
                <span>License Authority：<b>{{detail.buyerLicenseAuthority}}</b></span>
            </li>
            <li>
                <span>ORN：<b>{{detail.buyerORN}}</b></span> 
                <span>License Number：<b>{{detail.buyerLicenseNumber}}</b></span>
            </li>
            <li>
                <span>Fax：<b>{{detail.buyerFax2}}</b></span> 
                <span>Phone：<b>{{detail.buyerPhone2}}</b></span>
            </li>
            <li>
                <span>Address：<b>{{detail.buyerAddress2}}</b></span> 
            </li>
            <li>
                <span>Email：<b>{{detail.buyerEmail2}}</b></span>
            </li>
            <li>
                <span>Agent Name：<b>{{detail.buyerAgentName}}</b></span>
            </li>
            <li>
                <span>BRN：<b>{{detail.buyerBRN}}</b></span> 
                <span>Mobile：<b>{{detail.buyerMobile2}}</b></span>
            </li>
        </ul>

        <div class="color-bar dark-green">PART 4. THE MORTGAGE INFORMATION</div>
        <div class="color-bar">MORTGAGE INFORMATION</div>
        <ul class="contract-from">
            <li>
                <span>Mortgagee：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagee"></span>  
            </li>
            <li>
                <span>Mortgage Amoun：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgageAmoun"></span>  
            </li>
            <li>
                <span>Paid Amount：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.paidAmount2"></span>  
            </li>
            <li>
                <span>Mortgage Period From：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagePeriodFrom"></span>  
            </li>
            <li>
                <span>Mortgage Period To：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagePeriodTo"></span>  
            </li>
            <li>
                <span>Mortgage Level：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgageLevel"></span>  
            </li>
            <li>
                <span>NOC Attachred：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.NOCAttachred"></span>  
            </li>
        </ul>

        <div class="color-bar dark-green">PART 5: TENANCY CONTRACT INFORMATION</div>
        <div class="color-bar">TENANCY CONTRACT INFORMATION</div>
        <ul class="contract-from">
            <li>
                <span>Property Rented：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyRented"></span>  
            </li>
            <li>
                <span>Number of Rented Properties：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.numberOfRentedProperties"></span>  
            </li>
        </ul>

        <div class="color-bar dark-green">PART 6. THE SIGNATURE OF THE PARTIES</div>
        <div class="color-bar">FIRST PARTY : THE OWNERS(S)</div>
        <ul class="contract-from">
            <li>
                <span>Name(English)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNameEnglish"></span>  
            </li>
            <li>
                <span>Name (Arabic)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNameArabic"></span>  
            </li>
            <li>
                <span>Legal Representative Name(English)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerLegalRepresentativeNameEnglish"></span>  
            </li>
            <li>
                <span>Legal Representative Name(Arabic)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerLegalRepresentativeNameArabic"></span>  
            </li>
            <li>
                <span>Representing Type：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerRepresentingType"></span>  
            </li>
            <li>
                <span>Power of attorney number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPowerOfAttorneyNumber"></span>  
            </li>
            <li>
                <span>Signature：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerSignature"></span>
            </li>
        </ul>

        <div class="color-bar">SECOND PARTY : THE BUYER(S)</div>
        <ul class="contract-from">
            <li>
                <span>Name(English)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNameEnglish"></span>  
            </li>
            <li>
                <span>Name (Arabic)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNameArabic"></span>  
            </li>
            <li>
                <span>Legal Representative Name(English)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLegalRepresentativeNameEnglish"></span>  
            </li>
            <li>
                <span>Legal Representative Name(Arabic)：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLegalRepresentativeNameArabic"></span>  
            </li>
            <li>
                <span>Representing Type：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerRepresentingType"></span>  
            </li>
            <li>
                <span>Power of attorney number：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPowerOfAttorneyNumber"></span>  
            </li>
            <li>
                <span>Signature：<input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerSignature"></span>
            </li>
        </ul>

        <div class="color-bar">Terms & Conditions:</div>
        <ul class="contract-clause">
            <li>   
               <el-date-picker
                            v-model="signDate"
                            type="date"
                            :placeholder="$t('PleaseSelect')"
                            value-format="dd/MM/yyyy" @change="getSignTime">
                        </el-date-picker> Both parties have agreed with full legal capacity as follows:  
                
            </li>
            <li>1.The above introduction is an integral part of this contract and shall be read and construed therewith. </li>
            <li>2.The "Seller" undertakes to provide all documents proving that he is the current owner of the property, Also the "Seller" undertakes to complete all procedures and requirements to transfer the property to the buyer's name at Dubai Land Department immediately after taking possession of the agreed price under this contract ,and not later than.</li>
            <li>3.The "Buyer" agrees to pay to the seller:</li>
            <li>A.A deposit Cheque of AED ( <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.serviceFee"> ) simultaneously with signing this contract.</li>
            <li>B.Balance amount of the sale price, AED ( <input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.totalSellingPrice" >  ) by Manager Cheque or any other guaranteed method of payment that is acceptable by the Dubai Land Department, as follows:</li>
            <li>
                
                <div class="block">
                    <span class="demonstration">1.On{{$t('transferTime')}}</span>
                    <el-date-picker
                    v-model="detail.transferDate"
                    type="datetime"
                    :placeholder="$t('PleaseSelect')"
                    default-time="10:00:00"
                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </div>
            </li>
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
                <!-- {{idx+1}}. <input type="text" placeholder="请输入添加条款内容" v-model="detail.additionalTerms[idx]">  -->
                {{idx+1}}.<textarea name="" id="" rows="3" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]"></textarea>  
            </li>
        </ul>
        <ul class="sign-position color-black">
            <li>First Party "seller":</li>
            <li>Second Party "Buyer" :</li>
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
        <el-row>
            <!-- <el-button type="warning" plain @click="editContract()">修改</el-button> -->
            <el-button v-if="isDelivery" type="success" @click="GenerateContract()">{{$t('save')}}</el-button>
            <el-button v-else type="success" @click="confirmBool=true">{{$t('Generatethecontract')}}</el-button>
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
                <p class="">{{$t('meetingTimeAndMeetingPlace')}}:</p>
                <ul class="contract-from">
                    <li>
                        <span>owner's name:{{detail.memberName}}</span>
                        <span>estimated time: 
                        <el-date-picker
                            v-model="detail.estimatedTime"
                            type="datetime"
                            :placeholder="$t('PleaseSelect')"
                            default-time="10:00:00"
                            value-format="yyyy-MM-dd HH:mm:ss">
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
        signDate:'',
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
            nameOfOwner	                       :"", //string	否			
            ownerNationality	               :"", //string	否			
            ownerIDCardNumber	               :"", //string	否			
            ownerPassportNo	                   :"", //string	否			
            ownerMobile	                       :"", //string	否			
            ownerPhone	                       :"", //string	否			
            ownerAddress	                   :"", //string	否			
            ownerEmail	                       :"", //string	否			
            ownerExpiryDate	                   :"", //string	否			
            ownerPOBox	                       :"", //string	否			
            ownerFax	                       :"", //string	否			
            buyerFax	                       :"", //string	否			
            buyerPOBox	                       :"", //string	否			
            buyerExpiryDate	                   :"", //string	否			
            buyerEmail	                       :"", //string	否			
            buyerAddress	                   :"", //string	否			
            buyerPhone	                       :"", //string	否			
            buyerMobile	                       :"", //string	否			
            buyerPassportNo	                   :"", //string	否			
            buyerIDCardNumber	               :"", //string	否			
            buyerNationality	               :"", //string	否			
            nameOfBuyer	                       :"", //string	否			
            propertyStatus	                   :"", //string	否			
            typeOfArea	                       :"", //string	否			
            typeOfProperty	                   :"", //string	否			
            area	                           :"", //string	否			
            presentUse	                       :"", //string	否			
            additionalInformation	           :"", //string	否			
            typeofSale	                       :"", //string	否			
            plotNumber	                       :"", //string	否			
            titleDeedNumber	                   :"", //string	否			
            propertyNumber	                   :"", //string	否			
            subCommunity	                   :"", //string	否			
            masterDevelpoerName	               :"", //string	否			
            communityNumber	                   :"", //string	否			
            NOCFromDeveloper	               :"", //string	否			
            listedPrice	                       :"", //string	否			
            paidAmount	                       :"", //string	否			
            serviceCharge	                   :"", //string	否			
            originalPrice	                   :"", //string	否			
            sellPrice	                       :"", //string	否			
            balanceAmount	                   :"", //string	否			
            sellerAgentCommission	           :0, //string	否			
            buyerAgentCommission	           :0, //string	否			
            sellerOfficeName	               :"UCF Real Estate Broker", //string	否			
            sellerLicenseAuthority	           :"DLD", //string	否			
            sellerORN	                       :"20666", //string	否			
            sellerFax	                       :"", //string	否			
            sellerAddress	                   :"International City CBD D02-S01,Dubai,UAE", //string	否			
            sellerEmail	                       :"sandy.zuo@ucforward.com", //string	否			
            sellerAgentName	                   :"Yi Zuo", //string	否			
            sellerBRN	                       :"34970", //string	否			
            sellerLicenseNumber	               :"796680", //string	否			
            sellerPhone	                       :"+971 4 565 6182", //string	否			
            sellerMobile	                   :"", //string	否			
            buyerOfficeName	                   :"UCF Real Estate Broker", //string	否	
            buyerLicenseAuthority	           :"DLD", //string	否			
            buyerORN	                       :"20666", //string	否			
            buyerFax2	                       :"", //string	否			
            buyerAddress2	                   :"International City CBD D02-S01,Dubai,UAE",
            buyerEmail2	                       :"sandy.zuo@ucforward.com", //string	否			
            buyerAgentName	                   :"Yi Zuo", //string	否			
            buyerBRN	                       :"34970", //string	否			
            buyerLicenseNumber	               :"796680", //string	否			
            buyerPhone2	                       :"+971 4 565 6182", //string	否			
            buyerMobile2	                   :"", //string	否			
            mortgagee	                       :"", //string	否			
            mortgageAmoun	                   :"", //string	否			
            paidAmount2	                       :"", //string	否			
            mortgagePeriodFrom	               :"", //string	否			
            mortgagePeriodTo	               :"", //string	否			
            mortgageLevel	                   :"", //string	否			
            NOCAttachred	                   :"", //string	否			
            propertyRented	                   :"", //string	否			
            numberOfRentedProperties	       :"", //string	否			
            ownerNameEnglish	               :"", //string	否			
            ownerNameArabic	                   :"", //string	否			
            ownerLegalRepresentativeNameEnglish:"",	//string	否			
            ownerLegalRepresentativeNameArabic:"",	//string	否			
            ownerRepresentingType	           :"", //string	否			
            ownerPowerOfAttorneyNumber	       :"", //string	否			
            ownerSignature	                   :"", //string	否			
            buyerNameEnglish	               :"", //string	否			
            buyerNameArabic	                   :"", //string	否			
            buyerLegalRepresentativeNameEnglish:"",	//string	否			
            buyerLegalRepresentativeNameArabic:"",	//string	否			
            buyerRepresentingType	           :"", //string	否			
            buyerPowerOfAttorneyNumber	       :"", //string	否			
            buyerSignature	                   :"", //string	否			
            serviceFee	                       :"", //string	否			
            totalSellingPrice	               :"", //string	否			
            transferDate	                   :"", //string	否
            estimatedTime:"",
            appointmentMeetPlace:"",
            isDelivery:'',
            // signYear:'',
            // signMonth:'',
            // signDay:''
       },
        value1:'',
        confirmBool:false,
        isDelivery:''
    };
  },
  beforeMount() {
    this.queryDetail();
    if(this.$route.query.isDelivery){
        this.isDelivery = this.$route.query.isDelivery;
    }else{
        this.isDelivery = null;
    }
  },
  methods:{
      queryDetail(){
        //   console.log(this.$route,'id'  )
        this.$axios
        .post(
            "/api/pc/contract/detail",
            this.$qs.stringify({ orderId: this.$route.query.id })
        )
        .then(res => {
            if(res.dataSet.additionalTerms==null ){
                res.dataSet.additionalTerms = [];
            }
            for(let k in res.dataSet){
                this.detail[k] = res.dataSet[k];
            }
            this.detail.ownerMobile = res.dataSet.memberMoble;
            this.detail.nameOfOwner = res.dataSet.memberName;
            //购房人员信息
            if(res.dataSet.memberPurchase ){
                this.detail.nameOfBuyer = res.dataSet.memberPurchase.memberName;
                this.detail.buyerMobile = res.dataSet.memberPurchase.phone;
                this.detail.buyerEmail = res.dataSet.memberPurchase.email;
                this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.idCard;
                this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.idCard;
                this.detail.buyerNationality = res.dataSet.memberPurchase.nationality;
                this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.passportNumber;
            }

            // console.log( this.detail ,'detail;');            
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
      },
    GenerateContract(){
        if(this.isDelivery){
            this.detail.isDelivery = this.isDelivery;
        }else{
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

        // propertyUsage
        if( this.detail.additionalTerms.length >0){
            this.detail.additionalTerms.forEach((ele,i)=>{
                this.detail['additionalTerm'+(i+1)] = ele
            })
        }

        // delete this.detail.additionalTerms ;

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
                    this.$message.success(this.$t('GeneratethecontractSuccess'));
                    this.$router.push('/home/contractList');
              }
          }).catch(err => this.$message.error(err.message));
    },
    getSignTime(val){
        // console.log(val,this.signDate);
        this.signDate = val;
        this.detail.signYear = val.split('/')[2];
        this.detail.signMonth = val.split('/')[1];
        this.detail.signDay = val.split('/')[0];
    }   
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contract-detail {
  color: #333;
  input{border: none;&:focus{outline: none;}}
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
      input{
          font-size: 14px;
          font-weight: 500;
          color: #333;
      }
      b{
          font-size: 14px;
          color: #333;
          font-weight: 500;
      }
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
.el-dialog{
    .contract-from{
        li{
            span:nth-child(1){width: 30%}
            span:nth-child(2){width: 70%;}
        }
    }
}
</style>