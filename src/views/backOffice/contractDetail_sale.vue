<template>
    <div class="contract-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path:$route.query.type ==1?'/home/contractList/1': '/home/contractList/0'}"><span class="">{{$t('AmendingContract')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('Salescontractdetails')}}<br> Details of lease contract</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 20181212新增内勤合同-业主/租客护照图片 -->
        <ul class="passport-wrap" v-if="$route.query.type ==1">
            <li>
                <!-- ownerImgs -->
                landlord passport：
                <el-select v-model="detail.ownerImgsPick" :placeholder="$t('choose')" @change="selectOwnerImgs"> 
                    <el-option
                    v-for="(item,key) in detail.ownerImgs"
                    :key="key"
                    :value-key="key"
                    :label="key"
                    :value="key">
                    </el-option>
                </el-select>
                <div class="img-box">
                    <img v-for="(item) in ownerImgsList" v-lazy="item" alt="" :key="item">
                </div>
            </li>
            <li>
                <!-- buyerImgs -->
                tenant passport：
                <el-select v-model="detail.buyerImgsPick" :placeholder="$t('choose')" @change="selectBuyerImgs" > 
                    <el-option
                    v-for="(item,key) in detail.buyerImgs"
                    :key="key"
                    :value-key="key"
                    :label="key"
                    :value="key">
                    </el-option>
                </el-select>
                <div class="img-box">
                    <img v-for="(item) in buyerImgsList" v-lazy="item" alt="" :key="item">
                </div>
            </li>
        </ul>

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
                <span>Name Of Owner：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.nameOfOwner"></el-input>
                <i v-else class="color-light">******</i>
                </span>    
            </li>
            <li>
                <span>Nationality：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNationality"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>ID Card Number：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerIDCardNumber"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>Passport No：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPassportNo"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>Expiry Date：
                    <!-- <el-input   type="text" v-if="$route.query.type ==1" :placeholder="$t('PleaseEnter')" v-model="detail.ownerExpiryDate"></el-input> -->
                    <el-date-picker
                        v-if="$route.query.type ==1"
                        format="dd/MM/yyyy"
                        v-model="detail.ownerExpiryDate"
                        type="date"
                        :placeholder="$t('PleaseSelect')"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Mobile：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerMobile"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>P.O.Box：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPOBox"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>Phone：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPhone"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>Fax：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerFax"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Address：<el-input v-if="$route.query.type ==1"   type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerAddress"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Email：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerEmail"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
        </ul>

        <div class="color-bar">THE BUYER'S DETAILS (SECOND PARTY)</div>
        <ul class="contract-from">
            <li>
                <span>Name Of Buyer: <el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.nameOfBuyer"></el-input>
                <i v-else class="color-light">******</i>
                </span>    
            </li>
            <li>
                <span>Nationality：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNationality"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>ID Card Number：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerIDCardNumber"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>Passport No：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPassportNo"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>Expiry Date：
                    <!-- <el-input v-if="$route.query.type ==1" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerExpiryDate"></el-input> -->
                    <el-date-picker
                        v-if="$route.query.type ==1"
                        format="dd/MM/yyyy"
                        v-model="detail.buyerExpiryDate"
                        type="date"
                        :placeholder="$t('PleaseSelect')"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Mobile：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerMobile"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>P.O.Box：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPOBox"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
            </li>
            <li>
                <span>Phone：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter') " v-model="detail.buyerPhone"></el-input>
                <i v-else class="color-light">******</i>
                </span> 
                <span>Fax：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerFax"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Address：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAddress"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
            <li>
                <span>Email：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerEmail"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
        </ul>

        <div class="color-bar dark-green">PART 2. THE PROPERTY</div>
        <div class="color-bar">THE PROPERTY DETAILS</div>
        <ul class="contract-from">
            <li>
                <span>Unit Status：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyStatus"></el-input></span>  
                <span>Plot Number：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.plotNumber"></el-input></span>  
            </li>
            <li>
                <span>Type of Area：
                    <!-- detail.typeOfArea===0?"Free Hold":"Lease Hold" -->
                    <el-select v-model="detail.typeOfArea" placeholder="choose">
                        <el-option
                        v-for="item in [{'value':0,'label':'Free Hold'},{'value':1,'label':'Lease Hold'}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span>Title Deed Number：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.titleDeedNumber"></el-input>
                </span> 
            </li>
            <li>
                <span>Property location：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.address"></el-input></span> 
                <span>Property Number：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyNumber"></el-input></span>
            </li>
            <li>
                <span>Property type：
                    <el-select v-model="detail.typeOfProperty" :placeholder="$t('PleaseSelect')">
                        <el-option
                        v-for="item in [{'value':'rent','label':$t('Rent')},{'value':'sale','label':$t('Sale')}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span> 
                <span>Project Name：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.subCommunity"></el-input></span>
            </li>
            <li>
                <span>Buildup area：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.area"></el-input></span> 
                <span>Master Developer Name：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.masterDevelpoerName"></el-input></span> 
            </li>
            <li>
                <span>Present Use：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.presentUse"></el-input></span> 
                <span>Community Number：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.communityNumber"></el-input></span>
            </li>
            <li>
                <span>Additional Information：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.additionalInformation"></el-input></span>
            </li>
            <li>
                <span>Type Of Sale：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.typeofSale"></el-input></span> 
                <span>NOC from Developer：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.NOCFromDeveloper"></el-input></span>
            </li>
        </ul>

        <div class="color-bar">PROPERTY FINANCIALS</div>
        <ul class="contract-from">
            <li>
                <span>Listed Price：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.listedPrice"></el-input></span> 
                <span>Original Price：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.originalPrice"></el-input></span>
            </li>
            <li>
                <span>Paid Amount：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.paidAmount"></el-input></span> 
                <span>Sell Price：
                    <el-input disabled type="text"  v-model="detail.sellPrice"></el-input>
                </span> 
            </li>
            <li>
                <span>Service Charge：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.serviceCharge"></el-input></span> 
                <span>Balance Amount：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.balanceAmount"></el-input></span>
            </li>
        </ul>
        <div class="color-bar dark-green">PART 3. COMMISSION & DURATION OF THE AGREEMENT</div>
        <ul class="contract-from margin20">
            <li>
                <span>Seller's Agent's Commission：<el-input disabled type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerAgentCommission"></el-input></span> 
                <span>Buyer's Agent's Commission：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAgentCommission"></el-input></span>
            </li>
        </ul>
        <!--固定信息 -->
        <div class="color-bar">THE SELLER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li>
                <span>Office Name：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerOfficeName"></el-input>
                </span>
            </li>
            <li>
                <span>License Authority：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerLicenseAuthority"></el-input>
                </span>
            </li>
            <li>
                <span>ORN：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerORN"></el-input>
                </span> 
                <span>License Number：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerLicenseNumber"></el-input>
                </span>
            </li>
            <li>
                <span>Fax：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerFax"></el-input>
                </span> 
                <span>Phone：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerPhone"></el-input>
                </span>
            </li>
            <li>
                <span>Address：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerAddress"></el-input>
                </span> 
            </li>
            <li>
                <span>Email：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerEmail"></el-input>
                </span>
            </li>
            <li>
                <span>Agent Name：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerAgentName"></el-input>
                </span>
            </li>
            <li>
                <span>BRN：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerBRN"></el-input>
                </span> 
                <span>Mobile：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerMobile"></el-input>
                </span>
            </li>
        </ul>
        <!--固定信息 -->
        <div class="color-bar">THE BUYER'S AGENT /BROKER</div>
        <ul class="contract-from">
            <li>
                <span>Office Name：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerOfficeName"></el-input>
                </span>
            </li>
            <li>
                <span>License Authority：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLicenseAuthority"></el-input>
                </span>
            </li>
            <li>
                <span>ORN：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.sellerORN"></el-input>
                </span> 
                <span>License Number：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLicenseNumber"></el-input>
                </span>
            </li>
            <li>
                <span>Fax：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerFax2"></el-input>
                </span> 
                <span>Phone：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPhone2"></el-input>
                </span>
            </li>
            <li>
                <span>Address：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAddress2"></el-input>
                </span> 
            </li>
            <li>
                <span>Email：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerEmail2"></el-input>
                </span>
            </li>
            <li>
                <span>Agent Name：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerAgentName"></el-input>
                </span>
            </li>
            <li>
                <span>BRN：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerBRN"></el-input>
                </span> 
                <span>Mobile：
                    <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerMobile2"></el-input>
                </span>
            </li>
        </ul>

        <div class="color-bar dark-green">PART 4. THE MORTGAGE INFORMATION</div>
        <div class="color-bar">MORTGAGE INFORMATION</div>
        <ul class="contract-from">
            <li>
                <span>Mortgagee：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagee"></el-input></span>  
            </li>
            <li>
                <span>Mortgage Amount：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgageAmoun"></el-input></span>  
            </li>
            <li>
                <span>Paid Amount：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.paidAmount2"></el-input></span>  
            </li>
            <li>
                <span>Mortgage Period From：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagePeriodFrom"></el-input></span>  
            </li>
            <li>
                <span>Mortgage Period To：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgagePeriodTo"></el-input></span>  
            </li>
            <li>
                <span>Mortgage Level：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.mortgageLevel"></el-input></span>  
            </li>
            <li>
                <span>NOC Attachred：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.NOCAttachred"></el-input></span>  
            </li>
        </ul>

        <div class="color-bar dark-green">PART 5: TENANCY CONTRACT INFORMATION</div>
        <div class="color-bar">TENANCY CONTRACT INFORMATION</div>
        <ul class="contract-from">
            <li>
                <span>Property Rented：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.propertyRented"></el-input></span>  
            </li>
            <li>
                <span>Number of Rented Properties：<el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.numberOfRentedProperties"></el-input></span>  
            </li>
        </ul>

        <div class="color-bar dark-green">PART 6. THE SIGNATURE OF THE PARTIES</div>
        <div class="color-bar">FIRST PARTY : THE OWNERS(S)</div>
        <ul class="contract-from">
            <li>
                <span>Name(English)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNameEnglish"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Name (Arabic)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerNameArabic"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Legal Representative Name(English)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerLegalRepresentativeNameEnglish"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Legal Representative Name(Arabic)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerLegalRepresentativeNameArabic"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Representing Type：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerRepresentingType"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Power of attorney number：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerPowerOfAttorneyNumber"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Signature：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.ownerSignature"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
        </ul>

        <div class="color-bar">SECOND PARTY : THE BUYER(S)</div>
        <ul class="contract-from">
            <li>
                <span>Name(English)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNameEnglish"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Name (Arabic)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerNameArabic"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Legal Representative Name(English)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLegalRepresentativeNameEnglish"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Legal Representative Name(Arabic)：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerLegalRepresentativeNameArabic"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Representing Type：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerRepresentingType"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Power of attorney number：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerPowerOfAttorneyNumber"></el-input>
                <i v-else class="color-light">******</i>
                </span>  
            </li>
            <li>
                <span>Signature：<el-input v-if="$route.query.type ==1"  type="text" :placeholder="$t('PleaseEnter')" v-model="detail.buyerSignature"></el-input>
                <i v-else class="color-light">******</i>
                </span>
            </li>
        </ul>

        <div class="color-bar">Terms & Conditions:</div>
        <ul class="contract-clause">
            <li>   
               <el-date-picker
                            format="dd/MM/yyyy"
                            v-model="signDate"
                            type="date"
                            :placeholder="$t('PleaseSelect')"
                            value-format="yyyy-MM-dd" @change="getSignTime">
                        </el-date-picker> Both parties have agreed with full legal capacity as follows:  
                
            </li>
            <li>1.The above introduction is an integral part of this contract and shall be read and construed therewith. </li>
            <li>2.The "Seller" undertakes to provide all documents proving that he is the current owner of the property, Also the "Seller" undertakes to complete all procedures and requirements to transfer the property to the buyer's name at Dubai Land Department immediately after taking possession of the agreed price under this contract ,and not later than.

                <el-date-picker
                    format="dd/MM/yyyy"
                    v-model="detail.transferDate"
                    type="date"
                    :placeholder="$t('PleaseSelect')"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </li>
            <li>3.The "Buyer" agrees to pay to the seller:</li>
            <li>A.A deposit Cheque of AED ( <el-input style="width:150px" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.serviceFee"></el-input> ) simultaneously with signing this contract.</li>
            <li>B.Balance amount of the sale price, AED ( <el-input style="width:150px" type="text" :placeholder="$t('PleaseEnter')" v-model="detail.totalSellingPrice" ></el-input>  ) by Manager Cheque or any other guaranteed method of payment that is acceptable by the Dubai Land Department, as follows:</li>
            <!-- <li>
                
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
            </li> -->
            <li>1.Deposit Cheque will be refunded to the Buyer accordingly</li>
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
                <!-- {{idx+1}}. <el-input type="text" placeholder="请输入添加条款内容" v-model="detail.additionalTerms[idx]"></el-input>  -->
                {{idx+1}}.<el-input type="textarea" name="" id="" rows="3" :placeholder="$t('Pleasefillintheadditionalterms')" v-model="detail.additionalTerms[idx]"></el-input>  
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

        <el-row v-if="$route.query.type ==1">
            <!-- <el-button type="warning" plain @click="editContract()">修改</el-button> -->
            <el-button v-if="isDelivery" type="success" @click="GenerateContract()">{{$t('save')}}</el-button>
            <el-button v-else type="success" @click="confirmBool=true">{{$t('Generatethecontract')}}</el-button>
        </el-row>

        <el-row v-else>
            <!-- 没有合同ID的时候需要走创建合同的接口 -->
            <el-button v-if="$route.query.contractId ==''" type="warning" @click="createContract()" >{{$t('AmendingContract')}}</el-button>

            <el-button v-else type="warning" @click="updateContract()" :disabled="detail.orderStatus==-3 || detail.orderStatus==-2?false:true">{{$t('AmendingContract')}}</el-button>
            <!--  detail.orderStatus==-3或-2的时候才可以修改合同单 -->
        </el-row>

        <!-- 弹窗 - 是否生成合同单 生成/不生成 -->
        <el-dialog :title="$t('prompt')" :visible.sync="confirmBool">
            <div class="mb-10">
                <p class="mb-10">{{$t('Ifneedgenerateacontractticket')}}</p>
                
                <el-radio-group v-model="detail.isDelivery">
                    <el-radio :label="0">{{$t('Generatethecontractwithdeliveryticket')}}</el-radio>
                    <el-radio :label="1">{{$t('Generatethecontractwithoutdeliveryticket')}}</el-radio>
                </el-radio-group>
            </div>
            <div class="section mb-20" v-if="detail.isDelivery===0">
                <p class="">{{$t('meetingTimeAndMeetingPlace')}}:</p>
                <ul class="contract-from">
                    <li>
                        <span>owner's name:
                            <el-input type="text" disabled v-model="detail.nameOfOwner"></el-input>
                        </span>
                        <span>estimated time: 
                        <el-date-picker
                            format="dd/MM/yyyy HH:mm:ss"
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
                        <span>phone:
                            <el-input type="text" disabled v-model="detail.ownerMobile"></el-input>
                        </span>
                        <span>
                            appointment Meet Place:
                            <el-input type="text" :placeholder="$t('PleaseEnter')" v-model="detail.appointmentMeetPlace"></el-input>
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

        signDate:'',
        detail:{
            orderId	                           :this.$route.query.id, //string	是	订单id
            contractId	                       :this.$route.query.contractId, //string	是合同id	
            orderType	                       :this.$route.query.orderType, //string	是合同id	
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
            orderStatus:'',
            ownerImgs:{},
            buyerImgs:{}
       },
        value1:'',
        confirmBool:false,
        isDelivery:'',
        ownerImgsList:[],//业主护照等
        buyerImgsList:[],//租客/买家护照

    };
  },
  beforeMount() {
    // this.queryDetail();
    if(this.$route.query.isDelivery){
        this.isDelivery = this.$route.query.isDelivery;
    }else{
        this.isDelivery = null;
    }
  },

  created(){
      console.log(this.$route.query)
  },
  mounted(){
      this.getContract();
  },
  methods:{
    queryDetail(){////------------------------暂时弃用20181212
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
            for(let k in this.detail){
                this.detail[k] = res.dataSet[k]?res.dataSet[k]:this.detail[k];
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
            console.log( this.detail ,'detail;');

            // console.log( this.detail ,'detail;');            
        })
        .catch(err => this.$message.error(err.message));
    },
    // 获取合同信息----20181212更新
    getContract(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$axios
        .post(
            "/api/pc/get/contract",
            this.$qs.stringify({ orderId: this.$route.query.id,contractId:this.$route.query.contractId })
        )
        .then(res => {
            // this.detail = res.dataSet;
            if(res.dataSet.additionalTerms==null ){
                res.dataSet.additionalTerms = [];
            }

            for(let i=1;i<=8;i++){
                res.dataSet.additionalTerms[i-1] = res.dataSet[`additionalTerm${i}`]
            }
            for(let k in this.detail){
                this.detail[k] = res.dataSet[k]?res.dataSet[k]:this.detail[k];
            }
            
            if(this.$route.query.contractId==""){
                this.detail.ownerMobile = res.dataSet.memberMoble;
                this.detail.ownerName = res.dataSet.memberName;
                //租房人员信息
                if(res.dataSet.memberPurchase ){
                    this.detail.nameOfBuyer = res.dataSet.memberPurchase.memberName;
                    this.detail.buyerMobile = res.dataSet.memberPurchase.phone;
                    this.detail.buyerEmail = res.dataSet.memberPurchase.email;
                    this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.idCard;
                    this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.idCard;
                    this.detail.buyerNationality = res.dataSet.memberPurchase.nationality;
                    this.detail.buyerIDCardNumber = res.dataSet.memberPurchase.passportNumber;
                }
            }
            if(res.dataSet.signDay ){
                this.signDate = `${res.dataSet.signYear}-${res.dataSet.signMonth}-${res.dataSet.signDay}`;
            }
            // if(res.dataSet.transferDate.split('/').length>=3){
            //     this.detail.transferDate = `${res.dataSet.transferDate.split('/')[2]}-${res.dataSet.transferDate.split('/')[1]}-${res.dataSet.transferDate.split('/')[0]}`
            // }
            // 处理业主图片

            console.log( this.detail ,'detail;');
        })
        .catch(err => this.$message.error(err.message)).finally(() => loading.close());;
    },
    //-客服合同20181212新增 合同id没有值的时候，第一次保存走创建合同接口 
    createContract(){
        if( this.detail.additionalTerms.length >0){
            this.detail.additionalTerms.forEach((ele,i)=>{
                this.detail['additionalTerm'+(i+1)] = ele
            })
        }        
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post('/api/pc/create/contract',
          this.$qs.stringify(this.detail) 
          ).then(res=>{
              if(res.result==0){
                    this.$message.success( res.message );
                    if(this.$route.query.type==0){
                        this.$router.push('/home/contractList/0');
                    }else{
                        this.$router.push('/home/contractList/1');
                    }  
              }
          }).catch(err => this.$message.error(err.message)).finally(() => loading.close());         
    },
    //-客服合同20181212新增 修改接口 
    updateContract(){
        console.log( this.detail )
        if( this.detail.additionalTerms.length >0){
            this.detail.additionalTerms.forEach((ele,i)=>{
                this.detail['additionalTerm'+(i+1)] = ele
            })
        }        
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post('/api/pc/update/contract',
          this.$qs.stringify(this.detail) 
          ).then(res=>{
              if(res.result==0){
                    this.$message.success( res.message );
                    if(this.$route.query.type==0){
                        this.$router.push('/home/contractList/0');
                    }else{
                        this.$router.push('/home/contractList/1');
                    }  
              }
          }).catch(err => this.$message.error(err.message)).finally(() => loading.close());         
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
                    this.$message.success(this.$t('GeneratethecontractSuccess'));
                    this.$router.push('/home/contractList/1');
              }
          }).catch(err => this.$message.error(err.message)).finally(() => loading.close());
    },
    getSignTime(val){
        // console.log(val,this.signDate);
        this.signDate = val;
        console.log( val )
        this.detail.signYear = val.split('/')[2];
        this.detail.signMonth = val.split('/')[1];
        this.detail.signDay = val.split('/')[0];
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
    editContract(){////------------------------暂时弃用20181212
        // if( this.detail.additionalTerms.length >0){
        //     this.detail.additionalTerms.forEach((ele,i)=>{
        //         this.detail['additionalTerm'+(i+1)] = ele
        //     })
        // }

        this.$axios.post('/api/pc/contract/update',
          this.$qs.stringify({orderId:this.$props.id,additionalTerms:JSON.stringify(this.detail.additionalTerms)}) 
          ).then(res=>{
              if(res.result==0){
                    this.$message.success(this.$t('Modifiedsuccessfully'));
                    this.queryDetail();
              }
          }).catch(err => this.$message.error(err.message));
    },
    selectOwnerImgs(val){
        this.ownerImgsList = this.detail.ownerImgs[val];
    }, 
    selectBuyerImgs(val){
        this.buyerImgsList = this.detail.buyerImgs[val];
    },  
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->