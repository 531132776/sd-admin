<!-- 房源管理-房源初审 -->
<template>
    <div class="upload-house">
        
        <el-breadcrumb separator="/" class="mb-20">
            <el-breadcrumb-item :to="{ path:routeType=='upload'?'/home/houseUpLoad':'/home/houseaudit' }">
            <span class="" v-if="routeType=='upload'">{{$t('HousingToUpload')}}</span>
            <span class="" v-else>{{$t('trialHouse')}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('edit')}}</el-breadcrumb-item>
        </el-breadcrumb>    
        
        <el-radio-group v-model="housingApplication.leaseType" size="small" :disabled="this.$route.query.memberMobile ? false : true">
            <el-radio v-model="housingApplication.leaseType" :label="0" >{{$t('Rent')}}</el-radio>
            <el-radio v-model="housingApplication.leaseType" :label="1" >{{$t('Sale')}}</el-radio>
        </el-radio-group>
        <el-form :inline="true" label-position="left" label-width="160px"  :model="housingApplication" :rules="rules" ref="ruleForm" class="demo-form-inline addTriak_house_name">
            <!-- 见面时间，见面地点 -->
            <div class="d_flex meetingTime">
                <el-form-item :label="$t('MeetingTime')" prop="appointmentDoorTime">
                    <el-date-picker v-model="housingApplication.appointmentDoorTime" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" :placeholder="$t('choose')" @change="getTESTtime" ref="datePicker" :default-time="defaultTime">
                    </el-date-picker>
                </el-form-item>

                <el-form-item :label="$t('MeetingSpot')" class="form-right" prop="appointmentMeetPlace">
                    <el-input v-model="housingApplication.appointmentMeetPlace" :placeholder="$t('MeetingSpot')"></el-input>
                </el-form-item>

                <el-form-item :label="$t('housingAssociation')">
                    <el-input v-model="housingApplication.memberMobile" :placeholder="$t('housingAssociation')" disabled></el-input>
                </el-form-item>

                <el-form-item :label="$t('housingOwnership')" class="form-right">
                    <el-select v-model="housingApplication.applicantType" :placeholder="$t('choose')" :disabled="this.$route.query.memberMobile ? false : true">
                        <el-option :label="$t('landlord')" :value="0"></el-option>
                        <el-option :label="$t('poa')" :value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('Contactnumber')" prop="phoneNumber">
                    <el-input v-model="housingApplication.phoneNumber" :placeholder="$t('Contactnumber')"></el-input>
                </el-form-item>
            </div>
            
            <!-- 图片上传 -->
            <div class="sell" >
              <!-- POA复印件 10 -->
                <el-form-item :label="$t('copyOfPOAImg')" prop="mandataryCopiesImg" v-if="housingApplication.applicantType===1">
                    <!-- <span>{{$t('copyOfPOAImg')}}*</span> -->
                    <el-upload name="submitFile" :file-list="mandataryCopiesImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
                        :on-remove="handleRemoveAvatar" 
                        :limit="10"
                        :class="mandataryCopiesImgList.length>=10?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!--被委托人的护照 3  -->
                <el-form-item :label="$t('principalPassportImg')" prop="mandataryPassportImg" v-if="housingApplication.applicantType===1">
                    <!-- <span>{{$t('principalPassportImg')}}*</span> -->
                    
                    <el-upload name="submitFile" :file-list="mandataryPassportImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryPassportImg" :on-success="handleSuccessMandataryPassportImg"
                        :on-remove="handleRemoveMandataryPassportImg"
                        :limit="3"
                        :class="mandataryPassportImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- 被委托人的签证 3 -->
                    <!-- <span>{{$t('clientVisaImg')}}*</span> -->
                    <el-form-item :label="$t('clientVisaImg')" prop="mandataryVisaImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryVisaImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryVisaImg" :on-success="handleSuccessMandataryVisaImg"
                        :on-remove="handleRemoveMandataryVisaImg"
                        :limit="3"
                        :class="mandataryVisaImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </el-form-item>
                <!-- 被委托人的ID卡 4 -->
                    <!-- <span>{{$t('IDCardOfPrincipalImg')}}*</span> -->
                    <el-form-item :label="$t('IDCardOfPrincipalImg')" prop="mandataryIdcardImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryIdcardImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryIdcardImg" :on-success="handleSuccessMandataryIdcardImg"
                        :on-remove="handleRemoveMandataryIdcardImg"
                        :limit="4"
                        :class="mandataryIdcardImgList.length>=4?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </el-form-item>
                <!-- 房屋产权证明 3 -->
                <el-form-item :label="$t('CertificateImg')" prop="pocImg">
                    <!-- <span>{{$t('CertificateImg')}}*</span> -->
                    <el-upload name="submitFile" :file-list="pocImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadPocImg" :on-success="handleSuccessPocImg"
                        :on-remove="handleRemovePocImg"
                        :limit="3"
                        :class="pocImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <!-- 房屋产权人护照复印件 3 -->
                    <!-- <span>{{$t('ownerPassportImg')}}*</span> -->
                <el-form-item :label="$t('ownerPassportImg')" prop="reoPassportImg">
                    <el-upload name="submitFile" :file-list="reoPassportImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadReoPassportImg" :on-success="handleSuccessReoPassportImg"
                        :on-remove="handleRemoveReoPassportImg"
                        :limit="3"
                        :class="reoPassportImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <!-- 房屋户型图（选填）10 -->
                    <!-- <span>{{$t('housePlanImg')}}</span> -->
                <el-form-item :label="$t('housePlanImg')" v-if="housingApplication.leaseType===1">
                    <el-upload name="submitFile" :file-list="houseHoldImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadHouseHoldImg" :on-success="handleSuccessHouseHoldImg"
                        :on-remove="handleRemoveHouseHoldImg"
                        :limit="10"
                        :class="reoPassportImgList.length>=10?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <!-- 房屋租赁合同 houserentalagreement 4 -->
                    <!-- <span>{{$t('houserentalagreement')}}*</span> -->
                <el-form-item :label="$t('houserentalagreement')" prop="houseRentContractImg" v-if="housingApplication.leaseType===1&& housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075">
                    <el-upload name="submitFile" :file-list="houseRentContractImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadletterAuthor" :on-success="handleSuccessletterAuthor"
                        :on-remove="handleRemoveletterAuthor"
                        :limit="4"
                        :class="houseRentContractImgList.length>=4?'no-uploadIcon':''"
                        :on-preview="previewImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <el-tabs v-model="activeName"  class="infoTabs" :stretch="false">
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="infoTabs" :stretch="false"> -->
                <el-tab-pane name="first" class="d_flex">
                    <span slot="label">{{$t('info')}}</span>
                    <!-- 房屋类型 -->
                    <el-form-item prop="housingTypeDictcode">
                        <span slot="label">{{$t('HousingTypes')}}</span>
                        <!-- <el-select v-model="housingApplication.housingTypeDictcode" :placeholder="$t('PleaseSelect')">
                            <el-option v-for="item in houseTypeMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                :value="item.id+''">
                            </el-option>
                            <el-option :label="$t('PleaseSelect')" :value="''" v-if="housingApplication.housingTypeDictcode==''"></el-option>
                        </el-select> -->

                        <el-cascader :placeholder="$t('PleaseSelect')" 
                        v-model="housingTypeDictcode" 
                        :options="houseTypeMap" 
                        :props="{'label':$i18n.locale=='zh'?'itemValue':'itemValueEn','children':'sub',value:'id'}"
                        filterable
                        :show-all-levels="false" >
                        </el-cascader>

                    </el-form-item>      
                    <!-- 房源区域 -->
                    <el-form-item prop="city">
                        <span slot="label">{{$t('housingArea')}}</span>
                        <el-input class="hidden" type='hidden' v-model="housingApplication.city"></el-input>
                        <el-cascader placeholder="search" v-model="city" :options="cities" :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}"
                            filterable :disabled="this.$route.params.id==0?false:true"></el-cascader>
                    </el-form-item>
                    <!-- 详细地址 -->
                    <el-form-item prop="address">
                        <span slot="label">{{$t('address')}}</span>
                        <el-input v-model="housingApplication.address" :disabled="this.$route.query.memberMobile ? false : true"></el-input>
                    </el-form-item>
                    <!-- 楼名 -->
                    <el-form-item prop="buildingName">
                        <span slot="label">{{$t('BuildingName')}}</span>
                        <el-input v-model="housingApplication.buildingName"></el-input>
                    </el-form-item>
                    <!-- 门牌号 -->
                    <el-form-item prop="roomName">
                        <span slot="label">{{$t('HouseNumber')}}</span>
                        <el-input v-model="housingApplication.roomName"></el-input>
                    </el-form-item>
                    <!-- 楼层 -->
                    <el-form-item prop="houseFloor">
                        <span slot="label">{{$t('floor')}}</span>
                        <el-input v-model="housingApplication.houseFloor"></el-input>
                    </el-form-item>
                    <!-- 卧室数量 -->
                    <el-form-item prop="bedroomNum">
                        <span slot="label">{{$t('bedroomNumber')}}</span>
                       <el-select v-model="housingApplication.bedroomNum">
                           <el-option v-for="(room,idx) in [1,2,3,4,5,6,7,8,9,10]" :label="room" :value="room" :key="idx"></el-option>
                           <el-option  :label="$t('studio')" :value="100"></el-option>
                       </el-select>
                    </el-form-item>
                    <!-- 面积 -->
                    <el-form-item prop="houseAcreage">
                        <span slot="label">{{$t('area')}}</span>
                        <el-input v-model="housingApplication.houseAcreage" type="number"></el-input>
                    </el-form-item>
                    <!-- 车位 -->
                    <el-form-item prop="parkingSpace">
                        <span slot="label">{{$t('ParkingSpaceNum')}}</span>
                        <el-select v-model="housingApplication.parkingSpace">
                            <el-option :label="$t('thereAre')" :value="1"></el-option>
                            <el-option :label="$t('thereIsNo')" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 浴室数量 -->
                    <el-form-item prop="bathroomNum">
                        <span slot="label">{{$t('bathroomNumber')}}</span>
                        <el-select v-model="housingApplication.bathroomNum">
                            <el-option v-for="(number) in [1,2,3,4,5,6,7,8,9,10]" :label="number" :value="number" :key="number"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 装修情况 -->
                    <el-form-item prop="houseDecorationDictcode">
                        <span slot="label">{{$t('decorateSituation')}}</span>
                        <el-select v-model="housingApplication.houseDecorationDictcode" :placeholder="$t('PleaseSelect')">
                            <el-option :label="$t('withFurniture')" value="0"></el-option>
                            <el-option :label="$t('withNoFurniture')" value="1"></el-option>
                            <el-option :label="$t('halfFurniture')" value="2"></el-option>
                        </el-select>
                    </el-form-item>  
                    
                    <!-- 房源状态 -->
                    <el-form-item v-if="housingApplication.leaseType===1" prop="isPromissoryBuild">
                        <span slot="label">{{$t('housingCondition')}}</span>
                        <el-select :disabled="this.$route.query.memberMobile ? false : true" v-model="housingApplication.isPromissoryBuild" :placeholder="$t('PleaseSelect')">
                            <el-option :label="$t('periodRoom')" :value="0"></el-option>
                            <el-option :label="$t('existingHome')" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 房屋状态 -->
                    <el-form-item prop="housingStatus" v-if="housingApplication.isPromissoryBuild==1 || housingApplication.leaseType===0">
                        <span slot="label">{{$t('homeState')}}</span>
                        <el-select :disabled="this.$route.query.memberMobile ? false : true" v-model="housingApplication.housingStatus" :placeholder="$t('PleaseSelect')">
                            <el-option v-for="item in houseStatusMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                :value="item.id.toString()">
                            </el-option>
                        </el-select>
                    </el-form-item>                    
                    <!-- 是否有钥匙 -->

                    <el-form-item prop="haveKeyValue" 
                    v-if="housingApplication.leaseType==0&& housingApplication.housingStatus!=20076&&housingApplication.housingStatus!=''&&housingApplication.housingStatus!=null || housingApplication.leaseType==1&& housingApplication.housingStatus!=20076&&housingApplication.housingStatus!=''&& housingApplication.housingStatus!=null&&housingApplication.isPromissoryBuild==1">
                        <span slot="label">{{$t('haveKey')}}</span>
                        <el-select :disabled="this.$route.query.memberMobile ? false : true" v-model="housingApplication.haveKeyValue" :placeholder="$t('PleaseSelect')">
                            <el-option :label="housingApplication.housingStatus==20074?$t('vacantOption1'):$t('rentedOption1')" :value="1"></el-option>
                            <el-option :label="housingApplication.housingStatus==20074?$t('vacantOption2'):$t('rentedOption2')" :value="0"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 房屋状态为已出租 且授权平台联系租客时 填写租客姓名电话 -->
                    <!-- 租客姓名 -->
                    <el-form-item prop="rentCustomerName" 
                    v-if="housingApplication.leaseType==0&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1 || housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1">
                        <span slot="label">{{$t('tenantsName')}}</span>
                        <el-input :disabled="this.$route.query.memberMobile ? false : true" v-model="housingApplication.rentCustomerName"></el-input>
                    </el-form-item>
                    <!-- 租客电话 -->
                    <el-form-item prop="rentCustomerPhone" 
                    v-if="housingApplication.leaseType==0&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1|| housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1">
                        <span slot="label">{{$t('tenantsPhone')}}</span>
                        <el-input :disabled="this.$route.query.memberMobile ? false : true" v-model="housingApplication.rentCustomerPhone"></el-input>
                    </el-form-item>
                    <el-row class="add_el_row" style="width:100%">
                        <el-col :span="20">
                            <!-- 业主设置预约时间 -->

                            <el-form-item prop="appointmentLookTime" 
                            v-if="housingApplication.housingStatus!=''&& housingApplication.housingStatus!=null &&housingApplication.haveKeyValue==0 &&housingApplication.leaseType==0|| housingApplication.leaseType==0&&housingApplication.housingStatus==20076 || housingApplication.leaseType==1&&housingApplication.housingStatus==20076 && housingApplication.isPromissoryBuild==1 ||housingApplication.leaseType==1 &&housingApplication.isPromissoryBuild==1 && housingApplication.haveKeyValue==0">
                                <span slot="label">{{$t('appointmentTime')}}</span>
                                <el-input class="hidden" type="hidden" v-model="housingApplication.appointmentLookTime"></el-input>
                                <div class="appointmentLookTime_div mb-20">
                                    <el-checkbox v-model="appointmentLookTime_checkall" @change='changeAppointmentLookTime()'>{{$t('checkAll')}}</el-checkbox>
                                    <ul class="d_flex header mt-10">
                                        <li>Sun</li>
                                        <li>Mon</li>
                                        <li>Tue</li>
                                        <li>Wed</li>
                                        <li>Thur</li>
                                        <li>Fri</li>
                                        <li>Sat</li>
                                    </ul>
                                    <ul class="d_flex">
                                        <li v-for="(item, index) in 7" :key="index">
                                            <el-select v-model="appointmentLookTimeArr[index]" multiple :placeholder="$t('PleaseSelect')" 
                                            @change="changeTimeOptions(index)">
                                                <el-option
                                                v-for="item in timeOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                                </el-option>
                                            </el-select>
                                        </li>
                                    </ul>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="add_el_row">
                        <el-col :span="20">
                            <el-form-item>
                                <span slot="label">{{$t('houseingFacilities')}}</span>
                                <el-select v-model="houseSelfContainedDict" multiple :placeholder="$t('PleaseSelect')" style="width:800px;">
                                    <el-option v-for="item in houseMatchingMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="add_el_row">
                        <el-col :span="20">
                            <el-form-item>
                                <span slot="label">{{$t('housingAllocation')}}</span>
                                <el-select v-model="houseConfigDict" multiple :placeholder="$t('PleaseSelect')" style="width:800px;">
                                    <el-option v-for="item in houseConfigureMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane name="second" v-if="housingApplication.leaseType===0" class="d_flex">
                    <span slot="label">{{$t('rentInformation')}}</span>
                    <el-form-item prop="payNode">
                        <span slot="label">{{$t('payNode')}}</span>
                        <el-select v-model="housingApplication.payNode">
                          <!-- 一张支票 -十二月一付 1 -->
                            <el-option label="One payments a year" :value="1"></el-option>
                          <!-- 两张张支票 -六月一付 2 --> 
                            <el-option label="Two payments a year" :value="2"></el-option>
                          <!-- 四张支票 -三月一付 4 -->
                            <el-option label="four payments a year" :value="4"></el-option>
                          <!-- 六张支票 -二月一付 6 -->
                            <el-option label="Six payments a year" :value="6"></el-option>
                          <!-- 十二张支票 -一月一付 12 -->
                            <el-option label="Twelve Payment per Year" :value="12"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="beginRentDate">
                         <span slot="label">{{$t('rentStartDate')}}</span>
                         <el-date-picker type="date"  :placeholder="$t('PleaseSelect')" value-format="yyyy-MM-dd" v-model="housingApplication.beginRentDate" ></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="houseRent">
                        <span slot="label">{{$t('expectRentAmount')}}</span>
                        <el-input v-model="housingApplication.houseRent" @change="changePrice(0,housingApplication.houseRent)" type="number"></el-input>
                    </el-form-item>
                    <el-form-item prop="minHouseRent">
                        <span slot="label">{{$t('minRentAmount')}}</span>
                        <el-input v-model="housingApplication.minHouseRent" @change="changePrice(1,housingApplication.minHouseRent)" type="number"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <!-- 出售模式下 -->
                <el-tab-pane name="sellInfo" v-if="housingApplication.leaseType===1" class="d_flex">
                    <span slot="label">{{$t('saleInfo')}}</span>
                    <el-form-item prop="isHouseLoan">
                        <span slot="label">{{$t('haveHouseingMortgage')}}</span>
                        <el-select v-model="housingApplication.isHouseLoan" :placeholder="$t('PleaseSelect')">
                            <el-option label="yes" :value="1"></el-option>
                            <el-option label="no" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="houseRent">
                        <span slot="label">{{$t('expectSaleAmount')}}</span>
                        <el-input v-model="housingApplication.houseRent" @change="changePrice(0,housingApplication.houseRent)" type="number"></el-input>
                    </el-form-item>
                    <el-form-item prop="minHouseRent">
                        <span slot="label">{{$t('minSaleAmount')}}</span>
                        <el-input v-model="housingApplication.minHouseRent" @change="changePrice(1,housingApplication.minHouseRent)" type="number"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane name="third" class="d_flex">
                    <span slot="label">{{$t('otherContactMethods')}}</span>
                    <el-form-item prop="email">
                        <span slot="label">{{$t('email')}}</span>
                        <el-input v-model="housingApplication.email" ></el-input>
                    </el-form-item>
                    <el-form-item prop="facebook">
                        <span slot="label">Facebook</span>
                        <el-input v-model="housingApplication.facebook"></el-input>
                    </el-form-item>
                    <el-form-item prop="twitter">
                        <span slot="label">Twitter</span>
                        <el-input v-model="housingApplication.twitter"></el-input>
                    </el-form-item>
                    <el-form-item prop="instagram">
                        <span slot="label">Instagram</span>
                        <el-input v-model="housingApplication.instagram"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <!-- <el-tab-pane name="four">
                    <span slot="label">自动应答</span>
                    
                    <div v-if="housingApplication.leaseType===0">
                        <el-row type="flex" v-for="autoAnswer in autoAnswerList">
                            <el-col>
                                <el-form-item>
                                    <span slot="label">起租日期</span>
                                    <el-date-picker type="date" :disabled="autoAnswer.id ? true : false" placeholder="选择日期"
                                        value-format="yyyy-MM-dd" v-model="autoAnswer.beginRentDate" style="width: 150px;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item>
                                    <span slot="label">出租时长</span>
                                    <el-input :disabled="autoAnswer.id ? true : false" v-model="autoAnswer.rentTime"
                                        style="width: 150px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item>
                                    <span slot="label">支付节点</span>
                                        <el-select :disabled="autoAnswer.id ? true : false" v-model="autoAnswer.payNode" style="width:200px;">
                                            <el-option label="Twelve payments a year" :value="1"></el-option>
                                            <el-option label="Six payments a year" :value="2"></el-option>
                                            <el-option label="four payments a year" :value="3"></el-option>
                                            <el-option label="Two payments a year" :value="6"></el-option>
                                            <el-option label="One Payment per Year" :value="12"></el-option>
                                        </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item>
                                    <span slot="label">租金价格</span>
                                    <el-input :disabled="autoAnswer.id ? true : false" v-model="autoAnswer.houseRentPrice"
                                        style="width: 100px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item>
                                    <span slot="label">支付方式</span>
                                    <el-select :disabled="autoAnswer.id ? true : false" v-model="autoAnswer.payType"
                                        :placeholder="$t('PleaseSelect')" style="width: 75px;">
                                        <el-option label="现金" :value="0"></el-option>
                                        <el-option label="贷款" :value="1"></el-option>
                                    </el-select>
                                    <el-select v-if="autoAnswer.payType===1" :disabled="autoAnswer.id ? true : false"
                                        v-model="autoAnswer.hasExpectApprove" :placeholder="$t('PleaseSelect')" style="width: 75px;">
                                        <el-option label="已审" :value="0"></el-option>
                                        <el-option label="未审" :value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item>
                                    <el-switch :disabled="autoAnswer.id ? true : false" :active-value="1"
                                        :inactive-value="0" v-model="autoAnswer.isOpen"></el-switch>
                                    <el-button v-if="autoAnswer.id" @click="deleteAnswer(autoAnswer)" type="danger"
                                        icon="el-icon-delete" size="mini" circle></el-button>
                                    <el-button v-if="!autoAnswer.id" @click="saveAnswer(autoAnswer)" type="success"
                                        icon="el-icon-check" size="mini" circle></el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                       
                        <el-row type="flex" justify="start">
                            <el-button type="success" @click="addAnswer" icon="el-icon-plus" size="mini" circle></el-button>
                        </el-row>
                    </div>
                    

                    <div v-if="housingApplication.leaseType===1">
                        <el-row v-for="autoAnswer in autoAnswerList">
                            <el-col :span="4">
                                <el-form-item>
                                    <span slot="label">支付方式</span>
                                    <el-radio-group v-model="autoAnswer.payType" size="small">
                                        <el-radio :disabled="autoAnswer.id && autoAnswer.payType ===1 ? true : false"
                                            v-model="autoAnswer.payType" :label="0">现金</el-radio>
                                        <el-radio :disabled="autoAnswer.id && autoAnswer.payType ===0 ? true : false"
                                            v-model="autoAnswer.payType" :label="1">贷款</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" v-if="autoAnswer.payType===1">
                                <el-form-item>
                                    <span slot="label">审批完成</span>
                                    <el-radio-group v-model="autoAnswer.hasExpectApprove" size="small">
                                        <el-radio :disabled="autoAnswer.id && autoAnswer.hasExpectApprove===1 ? true : false"
                                            :label="0">yes</el-radio>
                                        <el-radio :disabled="autoAnswer.id && autoAnswer.hasExpectApprove===0 ? true : false"
                                            :label="1">no</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item>
                                    <span slot="label">最低售价</span>
                                    <el-input :disabled="autoAnswer.id ? true :false" v-model="autoAnswer.houseRentPrice"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">是否开启</span>
                                    <el-switch :disabled="autoAnswer.id ? true :false" :active-value="1"
                                        :inactive-value="0" v-model="autoAnswer.isOpen"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" v-if="autoAnswer.id">
                                <el-form-item>
                                    <span slot="label">delete:</span>
                                    <el-button @click="deleteAnswer(autoAnswer)" type="danger" icon="el-icon-delete"
                                        size="mini" circle></el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3" v-if="!autoAnswer.id">
                                <el-form-item>
                                    <span slot="label">save:</span>
                                    <el-button @click="saveAnswer(autoAnswer)" type="success" icon="el-icon-check" size="mini"
                                        circle></el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="start">
                           
                            <el-button type="success" @click="addAnswer" icon="el-icon-plus" size="mini" circle></el-button>
                        </el-row>
                    </div>
                </el-tab-pane> -->
            </el-tabs>
            <!-- 提交，保存 -->
            <el-row type="flex" justify="center" v-if="!this.$route.query.memberMobile">
                <el-button type="primary" @click="submitForm('ruleForm',2)">{{$t('approved')}}</el-button>
                <!-- <el-button @click="checkHouse('ruleForm',2)">{{$t('approved')}}</el-button> -->
                <el-button @click="checkVisible=true">{{$t('auditFail')}}</el-button>
            </el-row>
            <el-row v-else type="flex" justify="center">
                <el-button type="primary" @click="submitForm('ruleForm',null)">{{$t('submit')}}</el-button>
            </el-row>
        </el-form>
        <!-- 审核不通过输入备注 -->
        <el-dialog :title="$t('cancelVerification')" :visible.sync="checkVisible" width="30%">
            <el-input type="textarea" :rows="2" :placeholder="$t('Pleaseentertheremark')" v-model="remarks">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="checkHouse('ruleForm',3)">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>

        <!-- 图片预览 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>
<script>
export default {
  name: "uploadHouse",
  props: ["id"],
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
      city: [],
      cities: [],
      // houseTypeMap: [], //房屋类型字典
      //房屋类型   
      houseTypeMap: [
        {   id:0,
            itemValue: "商用",
            itemValueEn: "commercial",
            sub:[]
        },
        {   id:1,
            itemValue: "非商用",
            itemValueEn: "Non-commercial",
            sub:[]
        }
      ], 
      houseStatusMap: [], //房屋状态字典
      houseSourceMap: [], //房源状态字典
      houseMatchingMap: [], //房间配套字典
      houseConfigureMap: [], //房间配置字典
      houseDetail: {
        //详情信息
        housingApplication: {},
        houseCredentials: {}
      },
      housingApplication: {}, //详情
      houseCredentials: {}, //详情图片
      houseSelfContainedDict: [], //房源配套回显
      houseConfigDict: [], //房源配置回显
      activeName: "first",
      autoAnswerList: [], //自动应答机制
      // autoAnswer: {//待修改的自动应答
      //     houseId: '',
      //     id: null,
      //     beginRentDate: new Date(),
      //     rentTime: 20,
      //     payNode: 3,
      //     houseRentPrice: 100,
      //     payType: 1,
      //     isOpen: 1,
      //     hasExpectApprove: 0
      // },  
      rules: {
        appointmentDoorTime: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("MeetingTime")}`,
            trigger: "change"
          }
        ],
        appointmentMeetPlace: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("MeetingSpot")}`,
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t(
              "landlordTelephone"
            )}`,
            trigger: "blur"
          }
        ],
        housingTypeDictcode: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("HousingTypes")}`,
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("address")}`,
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("housingArea")}`,
            trigger: "blur"
          }
        ],
        roomName: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("HouseNumber")}`,
            trigger: "blur"
          }
        ],
        bedroomNum: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("bedroomNumber")}`,
            trigger: "change"
          }
        ],
        parkingSpace: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("ParkingSpaceNum")}`,
            trigger: "change"
          }
        ],
        housingStatus: [
          {
            required: this.$route.query.memberMobile ? true : false,
            message: `${this.$t("choose")} ${this.$t("homeState")}`,
            trigger: "change"
          }
        ],
        isPromissoryBuild: [
          {
            required: this.$route.query.memberMobile ? true : false,
            message: `${this.$t("choose")} ${this.$t("housingCondition")}`,
            trigger: "change"
          }
        ],
        haveKeyValue: [
          {
            required: this.$route.query.memberMobile ? true : false,
            message: `${this.$t("choose")} ${this.$t("haveKey")}`,
            trigger: "change"
          }
        ],
        buildingName: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("BuildingName")}`,
            trigger: "blur"
          }
        ],
        houseFloor: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("floor")}`,
            trigger: "blur"
          }
        ],
        houseAcreage: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("area")}`,
            trigger: "blur"
          }
        ],
        bathroomNum: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("bathroomNumber")}`,
            trigger: "change"
          }
        ],
        houseDecorationDictcode: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("decorateSituation")}`,
            trigger: "change"
          }
        ],
        appointmentLookTime: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("appointmentTime")}`,
            trigger: "change"
          }
        ],
        payNode: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("payNode")}`,
            trigger: "change"
          }
        ],
        beginRentDate: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("rentStartDate")}`,
            trigger: "change"
          }
        ],
        houseRent: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("expectRentAmount")}`,
            trigger: "blur"
          }
        ],
        minHouseRent: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("minRentAmount")}`,
            trigger: "blur"
          }
        ],
        isHouseLoan: [
          {
            required: true,
            message: `${this.$t("choose")} ${this.$t("haveHouseingMortgage")}`,
            trigger: "change"
          }
        ],
        houseRent: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("expectSaleAmount")}`,
            trigger: "blur",
          },
          {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}
        ],
        minHouseRent: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} ${this.$t("minSaleAmount")}`,
            trigger: "blur",            
          },
          {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}
          
        ],
        rentCustomerName: [
          {
            required: this.$route.query.memberMobile ? true : false,
            message: `${this.$t("PleaseEnter")} ${this.$t(
              "tenantsName"
            )}`,
            trigger: "blur"
          }
        ],
        rentCustomerPhone: [
          {
            required: this.$route.query.memberMobile ? true : false,
            message: `${this.$t("PleaseEnter")} ${this.$t(
              "tenantsPhone"
            )}`,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: `${this.$t("PleaseEnter")} email
            `,
            trigger: "blur"
          },
          { type: 'email', message: `Please enter the correct email address `, trigger: ['blur', 'change'] }
        ],
        // 图片
        mandataryCopiesImg: [ //POA证件照
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("copyOfPOAImg")}`,
            trigger: "blur"
          }
        ],
        mandataryPassportImg: [ //被委托人证件照
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("principalPassportImg")}`,
            trigger: "blur"
          }
        ],
        mandataryVisaImg: [ //被委托人的签证
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("clientVisaImg")}`,
            trigger: "blur"
          }
        ],
        mandataryIdcardImg: [ //被委托人的ID卡
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("IDCardOfPrincipalImg")}`,
            trigger: "blur"
          }
        ],
        pocImg: [ //产权证明
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("CertificateImg")}`,
            trigger: "blur"
          }
        ],
        reoPassportImg: [ //产权人护照
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("ownerPassportImg")}`,
            trigger: "blur"
          }
        ],
        houseRentContractImg: [ //产权人护照
          {
            required: true,
            message: `${this.$t("upload")} ${this.$t("houserentalagreement")}`,
            trigger: "blur"
          }
        ],
      },
      mandataryCopiesImgList: [], //POA复印件
      mandataryPassportImgList: [], //被委托人的护照
      mandataryVisaImgList: [], //被委托人的签证
      mandataryIdcardImgList: [], //被委托人的ID卡
      pocImgList: [], //产权证明
      reoPassportImgList: [], //产权人护照
      houseHoldImgList: [], //房屋户型图
      houseRentContractImgList:[],//房屋租赁合同
      checkVisible: false, //审核未通过的原因需要一个对话框
      remarks: "", //审核未通过的备注,
      weekData: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      appointmentLookTimeArr: [],
      timeOptions: [
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00"
      ],
      appointmentLookTime_checkall: false,
      appointmentLookTimeStr: "",
      routeType:'',//路由从哪里跳转过来的,
      submitData:{},
      removeImgArr:[],
      defaultTime:`${new Date().getHours()<10?`0${new Date().getHours()}`:new Date().getHours()}:${new Date().getMinutes()<10?`0${new Date().getMinutes()}`:new Date().getMinutes()}:${new Date().getSeconds()<10?`0${new Date().getSeconds()}`:new Date().getSeconds()}`,
      housingTypeDictcode:[],
      // 图片预览-------
      dialogVisible:false,
      dialogImageUrl:''
    };
  },
  watch: {
    city(newValue, oldValue) {
      this.$set(this.housingApplication, "city", newValue[0]);
      this.$set(this.housingApplication, "community", newValue[1]);
      this.$set(this.housingApplication, "subCommunity", newValue[2]);
    },
    housingTypeDictcode(val){
        this.$set(this.housingApplication, 'housingTypeDictcode', val[1]);
                // console.log(this.house.housingTypeDictcode)
    }
  },
  mounted(){
    // console.log( this.defaultTime)
  },
  methods: {
    loadDetail(loadingInstance) {
      //获取详情

      //房屋详情信息
      let houseDetailPro = this.$axios.post(
        `/api/pc/owner/apply/detail/${this.$props.id}`
      );
      //房屋类型字典
      let houseTypeMapPro = this.$axios.post(`/api/pc/dict/get/1`, {});
      //房屋状态字典
      let houseStatusMapPro = this.$axios.post(`/api/pc/dict/get/2`, {});
      //房间配套字典
      let houseMatchingMapPro = this.$axios.post(`/api/pc/dict/get/3`, {});
      //房间配置字典
      let houseConfigureMapPro = this.$axios.post(`/api/pc/dict/get/0`, {});
      //房源区域三级联动列表
      let citiesPro = this.$axios.post("/api/pc/support/cities");

      this.$axios
        .all([
          houseDetailPro,
          houseTypeMapPro,
          houseStatusMapPro,
          houseMatchingMapPro,
          houseConfigureMapPro,
          citiesPro
        ])
        .then(resList => {
          //清空图片墙
          this.$set(this, "mandataryCopiesImgList", []);
          this.$set(this, "mandataryPassportImgList", []);
          this.$set(this, "mandataryVisaImgList", []);
          this.$set(this, "mandataryIdcardImgList", []);
          this.$set(this, "pocImgList", []);
          this.$set(this, "reoPassportImgList", []);
          this.$set(this, "houseHoldImgList", []);
          this.$set(this,'houseRentContractImgList',[])
          this.$set(this,'removeImgArr',[]); //把需要删除的文件fid数组也清空

          //------>房屋详情
          //console.log('回显数据', resList[0].dataSet);
          this.houseCredentials = resList[0].dataSet.houseCredentials;
          this.housingApplication = resList[0].dataSet.housingApplication;
          this.housingApplication.bathroomNum = this.housingApplication.bathroomNum==0?'':this.housingApplication.bathroomNum;
          this.housingApplication.memberMobile = this.$route.query.memberMobile?this.$route.query.memberMobile:this.housingApplication.memberMobile;
          this.housingApplication.leaseType = this.housingApplication.leaseType?this.housingApplication.leaseType:0;
          this.$set(this.housingApplication,'haveKeyValue',this.housingApplication.haveKey==null?0:this.housingApplication.haveKey);

          // 校验图片
          this.$set(this.housingApplication,'mandataryCopiesImg',this.houseCredentials.mandataryCopiesImg1)
          this.$set(this.housingApplication,'mandataryPassportImg',this.houseCredentials.mandataryPassportImg1)
          this.$set(this.housingApplication,'mandataryVisaImg',this.houseCredentials.mandataryVisaImg1)
          this.$set(this.housingApplication,'mandataryIdcardImg',this.houseCredentials.mandataryIdcardImg1)
          this.$set(this.housingApplication,'pocImg',this.houseCredentials.pocImg1)
          this.$set(this.housingApplication,'reoPassportImg',this.houseCredentials.reoPassportImg1)
          this.$set(this.housingApplication,'houseRentContractImg',this.houseCredentials.houseRentContractImg1)


          // 房屋状态已出租，APP没做处理，判断钥匙在哪儿
          if(this.housingApplication.housingStatus==20075){
              if(this.housingApplication.rentCustomerName &&　this.housingApplication.rentCustomerPhone　){
                this.housingApplication.haveKeyValue = 1;
              }else{
                this.housingApplication.haveKeyValue = 0;
              }
          }
          // 处理业主预约看房时间--------------------------20181106
          this.handleAppointmentLookTime();

          if (this.housingApplication) {
            // POA证件照 10
            this.getImgList(this.mandataryCopiesImgList,'mandataryCopiesImg',10,resList[0].dataSet.houseCredentials);

            //被委托人证件照 3
            this.getImgList(this.mandataryPassportImgList,'mandataryPassportImg',3,resList[0].dataSet.houseCredentials);

            //被委托人的签证
            this.getImgList(this.mandataryVisaImgList,'mandataryVisaImg',3,resList[0].dataSet.houseCredentials);

            //被委托人的ID卡
            this.getImgList(this.mandataryIdcardImgList,'mandataryIdcardImg',4,resList[0].dataSet.houseCredentials);

            //产权证明
            this.getImgList(this.pocImgList,'pocImg',3,resList[0].dataSet.houseCredentials);

            //产权人护照
            this.getImgList(this.reoPassportImgList,'reoPassportImg',3,resList[0].dataSet.houseCredentials);

            //房屋户型图
            this.getImgList(this.houseHoldImgList,'houseHoldImg',10,resList[0].dataSet.houseCredentials);

            // 房屋租赁合同
            this.getImgList(this.houseRentContractImgList,'houseRentContractImg',4,resList[0].dataSet.houseCredentials);

          }

          //房源配套回显数据处理
          if (this.housingApplication.houseSelfContainedDictcode) {
            this.houseSelfContainedDict = this.housingApplication.houseSelfContainedDictcode
              .split(",")
              .map(v => v * 1);
          }
          //房源配置回显数据处理
          if (this.housingApplication.houseConfigDictcode) {
            this.houseConfigDict = this.housingApplication.houseConfigDictcode
              .split(",")
              .map(v => v * 1);
          }

          //房源区域回显
          this.city = [
            this.housingApplication.city,
            this.housingApplication.community,
            this.housingApplication.subCommunity
          ];

          //------>房屋类型字典
          // this.houseTypeMap = resList[1].dataSet.items;
          // console.log(this.houseTypeMap )
          
          let arr = resList[1].dataSet.items;
          if( arr && arr!=0){
                arr.forEach(ele=>{
                this.houseTypeMap[ele.standby1].sub.push(ele);//房屋类型;
            })
          }
          arr.forEach(ele=>{
            if(ele.id == this.housingApplication.housingTypeDictcode){
              this.housingTypeDictcode = [+ele.standby1,+this.housingApplication.housingTypeDictcode];//商用，非商用的区别              
            }
          })

          //------->房屋状态字典
          this.houseStatusMap = resList[2].dataSet.items;
          // console.log("houseSourceMap:", resList[2].dataSet.items);

          //-------->房间配套字典
          this.houseMatchingMap = resList[3].dataSet.items;
          //console.log("houseMatchingMap:",resList[3].dataSet.items);

          //---------->房间配置字典
          this.houseConfigureMap = resList[4].dataSet.items;
          //console.log("houseConfigureMap:",resList[4].dataSet.items);

          //城市、社区，子社区联动数据
          this.cities = resList[5].dataSet || [];
        })
        .catch(err => {
          // console.log(err);
          this.$message.error(err.message);
        })
        .finally(() => {
          if (loadingInstance) {
            this.$nextTick(() => {
              loadingInstance.close();
            });
          }
        });
    },
    // 将接口返回的图片拼接为数组
    getImgList(imglist,name,num,key){              
      for(let i=1;i<=num;i++){
        if( key[name+i]){
            imglist.push({url: key[name+i]}) ;
          }  
      }
      imglist = imglist.filter(v => Boolean(v.url) == true);
    },

    // getAutoAnswerList() {//获取自动应答数据
    //     this.$axios.post('/api/pc/house/getAutoReplySetting', this.$qs.stringify({ applyId: this.housingApplication.id })).then(res => {
    //         console.log('自动应答', res)
    //         this.autoAnswerList = res.dataSet.autoAnswerList || []
    //     });
    // },
    // handleClick(val) {//切换到自动应答后 获取自动应答的信息
    //     if (val.name === 'four')
    //         this.getAutoAnswerList();
    // },
    // addAnswer() {//出售模式下--->新增自动应答

    //     if (this.autoAnswerList.length === 3) {
    //         this.$message.error('自动应答只能添加三条');
    //         return;
    //     }

    //     this.autoAnswerList.push({
    //         houseId: '',
    //         id: '',
    //         beginRentDate: new Date(),
    //         rentTime: 20,
    //         payNode: 3,
    //         houseRentPrice: 100,
    //         payType: 0,
    //         isOpen: 1,
    //         hasExpectApprove: 0
    //     });

    // },
    // saveAnswer(val) {//新增保存自动应答到服务端
    //     console.log(val);
    //     //添加房源id
    //     let answer = Object.assign(val, { houseId: this.$props.id, applyId: this.housingApplication.id });
    //     this.$axios.post('/api/pc/house/addAutoReplySetting', this.$qs.stringify(answer))
    //         .then(res => {
    //             console.log('出售新增自动应答,', res);
    //             this.getAutoAnswerList();
    //         }).catch(err => this.$message.error(err.message));

    // },
    // addAutoAnswer() {//出租模式下--新增自动应答
    //     if (this.autoAnswerList.length === 3) {
    //         this.$message({
    //             message: '自动应答只能设置3条',
    //             type: 'warning'
    //         })
    //         return;
    //     }
    //     this.dialogVisible = true;
    // },
    // saveAutoAnswer(ref) {//新增自动应答->提交到后台
    //     //验证
    //     // this.$refs[ref].validate((valid) => {
    //     //     if (valid) {
    //     //         alert('submit!');
    //     //     } else {
    //     //         console.log('error submit!!');
    //     //         return false;
    //     //     }
    //     // });

    //     //添加房源id
    //     this.autoAnswer = Object.assign(this.autoAnswer, { houseId: this.$props.id, applyId: this.housingApplication.id });
    //     this.$axios.post('/api/pc/house/addAutoReplySetting', this.$qs.stringify(this.autoAnswer))
    //         .then(res => {
    //             console.log('新增自动应答:', res);
    //             if (res.result === 0) {
    //                 this.$message({
    //                     message: '添加成功',
    //                     type: 'success'
    //                 });
    //                 this.getAutoAnswerList();
    //             } else {
    //                 this.$message.error(res.message);
    //             }
    //             this.dialogVisible = false;
    //         });
    // },
    // deleteAnswer(val) {//自动应答删除
    //     // console.log(val);

    //     this.$confirm('delete ?', 'prompt', {
    //         confirmButtonText: 'commit',
    //         cancelButtonText: 'cancel',
    //         type: 'warning'
    //     }).then(() => {
    //         this.$axios.post('/api/pc/house/deleteAutoReply', this.$qs.stringify({ autoReplyId: val.id }))
    //             .then(res => {
    //                 console.log('删除自动应答:', res);
    //                 this.$message({ type: 'success', message: 'success' });
    //                 this.getAutoAnswerList();
    //             });
    //         // this.$message({
    //         //     type: 'success',
    //         //     message: '删除成功!'
    //         // });
    //     }).catch(() => {
    //         // this.$message({
    //         //     type: 'info',
    //         //     message: '已取消删除'
    //         // });
    //     });

    // },
    // changeOpen(val) {//自动应答->是否开放
    //     console.log('是否开放', val);
    //     this.$axios.post('/api/pc/house/addAutoReplySetting', this.$qs.stringify(val))
    //         .then(res => {
    //             console.log('是否开放:', res);
    //             this.$message({
    //                 message: res.message,
    //                 type: 'success'
    //             });
    //             this.getAutoAnswerList();
    //         }).catch(err => this.$message.error(err.message));

    // },
    submitForm(formName, isCheck) {
      //上传房源
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.checkHouse(formName, isCheck);
        } else {
          this.$message.warning("Please complete the information!");
          return false;
        }
      });
    },
    async checkHouse(formName, isCheck) {
      //审核通过,或者不通过
      let loadingInstance = this.$Loading.service({
        fullscreen: true,
        text: "loading",
        spinner: "el-icon-loading",
        background: "rgba(56, 53, 53, 0.6)"
      });

      //处理上传的数据
      this.handleSubmitData();
      // console.log(this.submitData ,'submitData');

      try {
        //1,先保存信息 (在客服上传新提交 和 初审审核通过时才保存信息)
        let res ='';
        if(isCheck!=3){
          res = await this.$axios.post(
            "/api/pc/add/owner/apply",
            this.$qs.stringify(this.submitData));
            //2,重新获取数据
            this.loadDetail();
        }

        if(!this.$route.query.memberMobile){    
            //3,执行审核通过或者不通过
            res = await this.$axios.post(
              "/api/pc/house/apply/check",
              this.$qs.stringify({
                applyId: this.housingApplication.id,
                isCheck: isCheck,
                remarks: this.remarks
              })
            );

            this.$message({ type: "success", message: res.message });
            this.$router.go(-1);
        }else{
          //如果是新增，直接跳转回房源上传页面
          this.$message({ type: "success", message: res.message });
          this.$router.push({ name: 'houseUpLoad' });
        }
      } catch (err) {
        this.$message.error(err.message);
      } finally {
        this.$nextTick(() => {
          loadingInstance.close();
        });
      }

      /** let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/house/apply/check', this.$qs.stringify({ applyId: this.housingApplication.id, isCheck: isCheck, remarks: this.remarks }))
                    .then(res => {
                        console.log('初审结果:', res);
                        this.$message({ type: 'success', message: res.message });
                        this.$router.push({ name: 'house' });
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => {
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                    });
                 */
    },
    handleSubmitData(){

      // 处理传参字符串-appointmentLookTime
      // 空房且haveKey==1,预约时间为所有时间  已出租且haveKey==1预约时间为所有时间
      if(this.housingApplication.haveKeyValue==1&&this.housingApplication.housingStatus==20074 || this.housingApplication.haveKeyValue==1&&this.housingApplication.housingStatus==20075){
        for (let i = 0; i < 7; i++) {
          this.$set(this.appointmentLookTimeArr, i, this.timeOptions);
        }
          this.handleAppointmentLookTimeStr();

      }else{
          this.handleAppointmentLookTimeStr();
      }

      this.submitData = {
            appointmentDoorTime: this.housingApplication.appointmentDoorTime,
            appointmentMeetPlace: this.housingApplication.appointmentMeetPlace,
            applicantType: this.housingApplication.applicantType,
            languageVersion: this.housingApplication.languageVersion,
            phoneNumber: this.housingApplication.phoneNumber,
            applyType: this.housingApplication.applyType,
            leaseType: this.housingApplication.leaseType,
            villageName: this.housingApplication.villageName,
            buildingName: this.housingApplication.buildingName,
            roomName: this.housingApplication.roomName,
            parkingSpace: this.housingApplication.parkingSpace,
            city: this.housingApplication.city,
            community: this.housingApplication.community,
            subCommunity: this.housingApplication.subCommunity,
            property: this.housingApplication.property, //项目
            address: this.housingApplication.address,
            houseOrientationDictcode: this.housingApplication
              .houseOrientationDictcode,
            houseDecorationDictcode: this.housingApplication
              .houseDecorationDictcode,
            houseLabelDictcode: this.housingApplication.houseLabelDictcode,
            // houseFloorDictcode: this.housingApplication.houseFloorDictcode,
            houseConfigDictcode: this.houseConfigDict.toString(),
            housingTypeDictcode: this.housingApplication.housingTypeDictcode,
            housingStatus: this.housingApplication.housingStatus,
            houseRent: this.housingApplication.houseRent,
            contacts: this.housingApplication.contacts, //联系人
            remarks: this.housingApplication.remarks,
            houseAcreage: this.housingApplication.houseAcreage,
            houseSelfContainedDictcode: this.houseSelfContainedDict.toString(),
            memberMobile: this.housingApplication.memberMobile,
            applyId: this.housingApplication.id,
            id: this.housingApplication.id,
            facebook: this.housingApplication.facebook,
            twitter: this.housingApplication.twitter,
            instagram: this.housingApplication.instagram,
            email: this.housingApplication.email,
            bathroomNum: this.housingApplication.bathroomNum,
            bedroomNum: this.housingApplication.bedroomNum,
            appointmentLookTime: this.appointmentLookTimeStr,
            houseFloor: this.housingApplication.houseFloor,
            haveKey: this.housingApplication.housingStatus==20074?this.housingApplication.haveKeyValue:this.housingApplication.haveKey,
            isPromissoryBuild:this.housingApplication.isPromissoryBuild,
            memberId:this.housingApplication.memberId,
            beginRentDate:this.housingApplication.beginRentDate? `${this.housingApplication.beginRentDate} 00:00:00`:'' ,
            minHouseRent:this.housingApplication.minHouseRent,
            isHouseLoan:this.housingApplication.isHouseLoan,
            payNode:this.housingApplication.payNode,
            rentCustomerName:this.housingApplication.housingStatus==20075&&this.housingApplication.haveKeyValue==1?this.housingApplication.rentCustomerName:'',
            rentCustomerPhone:this.housingApplication.housingStatus==20075&&this.housingApplication.haveKeyValue==1?this.housingApplication.rentCustomerPhone:'',
      }

      // 如果是客服直接上传，需要传memberId
      if(this.$route.query.memberMobile){
        this.submitData.memberId = this.$route.query.memberId;
        this.submitData.applyType = 1
      }
      // POA复印件  mandataryCopiesImgList
      this.handleDataOfImg( this.mandataryCopiesImgList,10,'mandataryCopiesImg' );

      // 被委托人的护照 mandataryPassportImgList
      this.handleDataOfImg( this.mandataryPassportImgList,3,'mandataryPassportImg' );

      //被委托人的签证 mandataryVisaImgList
      this.handleDataOfImg( this.mandataryVisaImgList,3,'mandataryVisaImg' );

      //被委托人的ID卡 mandataryIdcardImgList
      this.handleDataOfImg( this.mandataryIdcardImgList,4,'mandataryIdcardImg' );

      //房屋产权证明 pocImgList
      this.handleDataOfImg( this.pocImgList,3,'pocImg' );

      // 产权人护照  reoPassportImgList
      this.handleDataOfImg( this.reoPassportImgList,3,'reoPassportImg' );

      //房屋户型图 houseHoldImgList
      this.handleDataOfImg( this.houseHoldImgList,10,'houseHoldImg' );

      //房屋租赁合同  houseRentContractImg1
      this.handleDataOfImg( this.houseRentContractImgList,4,'houseRentContractImg');
      
      // 删除的图片统一走接口
      if(this.removeImgArr.length>0 ){
        for(let i=0;i<this.removeImgArr.length;i++){
          this.removeImgFun(this.removeImgArr[i]);
        }
      }
    },
    handleDataOfImg(imglist,num,name){
      if(imglist.length>0){
        for(let i=1;i<=num;i++){
          if( imglist[i-1]){
              this.submitData[name+i] = imglist[i-1].response!=undefined?imglist[i-1].response.fid:imglist[i-1].url.substr(imglist[i-1].url.indexOf('/group1')+1);
          }else{
            this.submitData[name+i] = "";            
          }
        }
      }else{
        for(let i=1;i<=num;i++){
          this.submitData[name+i] = "";
        }
      }
    },

    // 上传文件------------------------------------------
    // POA复印件  mandataryCopiesImgList
    beforeAvatarUpload() {
      if (this.mandataryCopiesImgList[9]) return false;
      else return true;
    },
    handleAvatarSuccess(res, file,fileList) {
      this.mandataryCopiesImgList = fileList;
      this.$set(this.housingApplication,'mandataryCopiesImg',res.url);//校验图片必填
    },
    handleRemoveAvatar(file,fileList) {
      this.mandataryCopiesImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'mandataryCopiesImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },


    //被委托人的护照 mandataryPassportImgList
    beforeUploadMandataryPassportImg() {
      if (this.mandataryPassportImgList[2]) return false;
      else return true;
    },
    handleSuccessMandataryPassportImg(res,file,fileList) {
      this.mandataryPassportImgList = fileList;
      this.$set(this.housingApplication,'mandataryPassportImg',res.url);//校验图片必填
    },
    handleRemoveMandataryPassportImg(file,fileList) {
      this.mandataryPassportImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'mandataryPassportImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },

    //被委托人的签证 mandataryVisaImgList
    beforeUploadMandataryVisaImg() {
      if (this.mandataryVisaImgList[2]) return false;
      else return true;
    },
    handleSuccessMandataryVisaImg(res,file,fileList) {
      this.mandataryVisaImgList = fileList;
      this.$set(this.housingApplication,'mandataryVisaImg',res.url);//校验图片必填
    },
    handleRemoveMandataryVisaImg(file,fileList) {
      this.mandataryVisaImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'mandataryVisaImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },

    //被委托人的ID卡 mandataryIdcardImgList
    beforeUploadMandataryIdcardImg() {
      if (this.mandataryIdcardImgList[3]) return false;
      else return true;
    },
    handleSuccessMandataryIdcardImg(res,file,fileList) {
      this.mandataryIdcardImgList = fileList;
      this.$set(this.housingApplication,'mandataryIdcardImg',res.url);//校验图片必填
    },
    handleRemoveMandataryIdcardImg(file,fileList) {
      this.mandataryIdcardImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'mandataryIdcardImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },

    //产权证明 pocImgList
    beforeUploadPocImg(file) {
      if(this.pocImgList[2]){
          return false;
      } 
      else return true;
    },
    handleSuccessPocImg(res,file,fileList) {
      
      this.pocImgList = fileList;
      this.$set(this.housingApplication,'pocImg',res.url);//校验图片必填
    },
    handleRemovePocImg(file,fileList) {
      this.pocImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'pocImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },

    // 产权人护照  reoPassportImgList
    beforeUploadReoPassportImg() {
      if (this.reoPassportImgList[2]) return false;
      else return true;
    },
    handleSuccessReoPassportImg(res,file,fileList) {
      this.reoPassportImgList = fileList;
      this.$set(this.housingApplication,'reoPassportImg',res.url);//校验图片必填
    },
    handleRemoveReoPassportImg(file,fileList) {
      this.reoPassportImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'reoPassportImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },

    //房屋户型图 houseHoldImgList
    beforeUploadHouseHoldImg() {
      if (this.houseHoldImgList[9]) return false;
      else return true;
    },
    handleSuccessHouseHoldImg(res,file,fileList) {
      this.houseHoldImgList = fileList;
    },
    handleRemoveHouseHoldImg(file,fileList) {
      this.houseHoldImgList = fileList;
      this.handleRemove(file);
    },


    // 房屋租赁图片
    beforeUploadletterAuthor() {
      if (this.houseRentContractImgList[3]) return false;
      else return true;
    },
    handleSuccessletterAuthor(res,file,fileList) {
      this.houseRentContractImgList = fileList;
      this.$set(this.housingApplication,'houseRentContractImg',res.url);//校验图片必填
    },
    handleRemoveletterAuthor(file,fileList) {
      this.houseRentContractImgList = fileList;
      this.handleRemove(file);
      this.$set(this.housingApplication,'houseRentContractImg',fileList.length>0?fileList[0].url:'');//校验图片必填
    },    

    // 图片预览-----------------------------------------
    previewImg(file){ //预览
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },

    // 需要删除图片的fid
    handleRemove(file){
      var str = ''
      if(file.response){
        str = file.response.fid;
      }else{
        str = file.url.substr(file.url.indexOf('/group')+1);
      }
      this.removeImgArr.push(str);
    },
    removeImgFun(str){
      // 统一处理删除图片
      this.$axios.post('/api/pc/file/delete', 
        this.$qs.stringify({fid: str }))
        .then((res) => {
        }).catch((err)=>{
          if(err.state==0){
          }else{
          }
        });
    },

    //----------20181106
    // 处理预约看房时间字符串
    handleAppointmentLookTime() {
      let str = this.housingApplication.appointmentLookTime;
      let count = 0;

      if (str != null) {
        let arr = str.split(";");
        arr.forEach((ele, i) => {
          let brr = ele.split(" ");
          if (brr[1] && brr[1] != "") {
            //如果出现空值
            if (brr[0] != "") {
              if (brr[0] == "Sun") {
                this.appointmentLookTimeArr[0] = brr[1].split(",");
              } else if (brr[0] == "Mon") {
                this.appointmentLookTimeArr[1] = brr[1].split(",");
              } else if (brr[0] == "Tue") {
                this.appointmentLookTimeArr[2] = brr[1].split(",");
              } else if (brr[0] == "Wed") {
                this.appointmentLookTimeArr[3] = brr[1].split(",");
              } else if (brr[0] == "Thur") {
                this.appointmentLookTimeArr[4] = brr[1].split(",");
              } else if (brr[0] == "Fri") {
                this.appointmentLookTimeArr[5] = brr[1].split(",");
              } else if (brr[0] == "Sat") {
                this.appointmentLookTimeArr[6] = brr[1].split(",");
              }
              if (brr[1].split(",").length == 12) {
                count++;
              }
            }
          }
        });
      }
      // 是否全选
      if (count == 7) {
        this.appointmentLookTime_checkall = true;
      } else {
        this.appointmentLookTime_checkall = false;
      }
    },
    // 全选 预约看房时间
    changeAppointmentLookTime() {
      if (this.appointmentLookTime_checkall) {
        for (let i = 0; i < 7; i++) {
          this.$set(this.appointmentLookTimeArr, i, this.timeOptions);
        }
        this.handleAppointmentLookTimeStr();
      } else {
        this.$set(this, "appointmentLookTimeArr", [[], [], [], [], [], [], []]);
        this.housingApplication.appointmentLookTime = "";
      }
    },
    // 下拉选项变更时，全选变动
    changeTimeOptions(idx) {
      let count = 0;
      let arr = this.appointmentLookTimeArr;
      if (arr[idx].length != 12) {
        this.appointmentLookTime_checkall = false;
      } else {
        arr.forEach(ele => {
          if (ele.length == 12) {
            count++;
          }
        });
        if (count == 7) {
          this.appointmentLookTime_checkall = true;
        }
      }
      this.handleAppointmentLookTimeStr();
    },
    // 处理传参字符串-appointmentLookTime
    handleAppointmentLookTimeStr() {
      let arr = this.appointmentLookTimeArr;
      let str = "";
      if(arr.length>0){
        str += `Sun ${arr[0].join(",")};Mon ${arr[1].join(",")};Tue ${arr[2].join(
          ","
        )};Wed ${arr[3].join(",")};Thur ${arr[4].join(",")};Fri ${arr[5].join(
          ","
        )};Sat ${arr[6].join(",")}`;
        this.appointmentLookTimeStr = str;
        this.housingApplication.appointmentLookTime = str;
      }
    },
    changePrice(code,val){  //校验期望售价与最低售价
      //code==0 houseRent  code==1 最低租金
      if(code==1){
        if(val> Number(this.housingApplication.houseRent) ){
          // console.log( val, typeof this.housingApplication.houseRent )
          this.$message.warning('The minimum rent must not exceed the expected rent. Please re-enter');
          this.housingApplication.minHouseRent = 0;
        }
      }else{
        if(val< Number(this.housingApplication.minHouseRent) ){
          this.$message.warning('The expected rent must not be lower than the minimum rent. Please re-enter');
          this.housingApplication.houseRent = this.housingApplication.minHouseRent;
        }
      }
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
                this.$set(this.housingApplication,'appointmentDoorTime','');
                //housingApplication.appointmentDoorTime   
            }
        }else if( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000) { //如果是最后一天,所选择的时间不能超过当前时分秒
            if( selectTimeStr > nowTimeStr ){
                this.$refs.datePicker.showPicker();
                this.$message.error('Not more than 48 hours! Please reselect'); 
                this.$set(this.housingApplication,'appointmentDoorTime','');     
            }
        }  
    }
  },

  beforeMount() {
    let loadingInstance = this.$Loading.service({
      fullscreen: true,
      text: "loading",
      spinner: "el-icon-loading",
      background: "rgba(56, 53, 53, 0.6)"
    });
    this.loadDetail(loadingInstance);
    this.routeType = this.$route.params.type;
    // console.log( this.$route.params.type,'type')
  }
};
</script>
<style scoped lang="less">
.upload-house {
  > .demo-form-inline {
    margin-top: 20px;

    > .credit {
      margin-top: 40px;

      > div {
        width: 200px;
        height: 200px;

        /* border:1px dashed #ccc; */
        > .img {
          display: flex;
          justify-content: flex-start;

          > img {
            width: 100px;
            height: 100px;
            margin: 10px 10px;
          }
        }
      }
    }

    .form-right {
    //   margin-left: 100px;
    }

    > .infoTabs {
      margin-top: 30px;
    }
  }

  .img {
    width: 200px;
    height: 200px;
    margin: 0 10px;
    border: 1px dashed #ccc;
    border-radius: 5px;
  }

  /* 上传文件 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .el-tab-pane.d_flex{
      flex-wrap: wrap;
      .el-form-item{
          width: 45%;
          .el-input.hidden{
              position: absolute;
          }
      }
  }
  .meetingTime.d_flex{
      flex-wrap: wrap;
      .el-form-item{
          width: 45%;
      }
  }
  .sell{
    .el-form-item{
      // margin-bottom: 0px;
      display: block;
    }
    .el-form-item__content{  
        .el-form-item__error{
          width: 200px!important;
          margin-top: 10px;
        }
    }
  }
}
</style>