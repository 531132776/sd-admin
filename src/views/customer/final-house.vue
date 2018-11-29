<!-- 房源管理-房源终审 -->
<template>
    <div class="upload-house">
        <el-breadcrumb separator="/" class="mb-20">
            <el-breadcrumb-item :to="{ path:'/home/houseaudit' }">
            <span class="">{{$t('finalHouse')}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('edit')}}</el-breadcrumb-item>
        </el-breadcrumb>   

        <el-radio-group v-model="housingApplication.leaseType" size="small">
            <el-radio v-model="housingApplication.leaseType" :label="0" :disabled="housingApplication.leaseType===1 ? true : false">{{$t('Rent')}}</el-radio>
            <el-radio v-model="housingApplication.leaseType" :label="1" :disabled="housingApplication.leaseType===0 ? true : false">{{$t('Sale')}}</el-radio>
        </el-radio-group>

        <el-form :inline="true" :model="housingApplication" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="160px" label-position="left">
            <div class="meetingTime d_flex">
                <el-form-item :label="$t('housingAssociation')" >
                    <el-input v-model="housingApplication.memberMobile" :placeholder="$t('housingAssociation')" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('housingOwnership')" >
                    <el-select v-model="housingApplication.applicantType" :placeholder="$t('PleaseSelect')" disabled>
                        <el-option label="业主" :value="0"></el-option>
                        <el-option label="poa" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="RERA permit NO" prop="reraPermitNo">
                    <el-input v-model="housingApplication.reraPermitNo"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Contactnumber')" prop="phoneNumber">
                    <el-input v-model="housingApplication.phoneNumber" :placeholder="$t('Contactnumber')" ></el-input>
                </el-form-item>
            </div>

            <!-- 上传图片 -->
            <div class="sell">
                <!-- POA复印件 10 -->
                <el-form-item :label="$t('copyOfPOAImg')" prop="mandataryCopiesImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryCopiesImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
                        :on-remove="handleRemoveAvatar"
                        :limit="10"
                        :class="mandataryCopiesImgList.length>=10?'no-uploadIcon':''"
                        :on-preview="previewMandataryCopies">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_mandataryCopies">
                      <img width="100%" :src="dialogImageUrl_mandataryCopies" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 被委托人的护照 3 -->
                 <el-form-item :label="$t('principalPassportImg')" prop="mandataryPassportImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryPassportImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryPassportImg" :on-success="handleSuccessMandataryPassportImg"
                        :on-remove="handleRemoveMandataryPassportImg"
                        :limit="3"
                        :class="mandataryPassportImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewMandataryPassport">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_mandataryPassport">
                      <img width="100%" :src="dialogImageUrl_mandataryPassport" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 被委托人的签证 3 -->
                <el-form-item :label="$t('clientVisaImg')" prop="mandataryVisaImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryVisaImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryVisaImg" :on-success="handleSuccessMandataryVisaImg"
                        :on-remove="handleRemoveMandataryVisaImg"
                        :limit="3"
                        :class="mandataryVisaImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewMandataryVisa">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_mandataryVisa">
                      <img width="100%" :src="dialogImageUrl_mandataryVisa" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 被委托人的ID卡 4 -->
                <el-form-item :label="$t('IDCardOfPrincipalImg')" prop="mandataryIdcardImg" v-if="housingApplication.applicantType===1">
                    <el-upload name="submitFile" :file-list="mandataryIdcardImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeUploadMandataryIdcardImg" :on-success="handleSuccessMandataryIdcardImg"
                        :on-remove="handleRemoveMandataryIdcardImg"
                        :limit="4"
                        :class="mandataryIdcardImgList.length>=4?'no-uploadIcon':''"
                        :on-preview="previewMandataryIdcard">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_mandataryIdcard">
                      <img width="100%" :src="dialogImageUrl_mandataryIdcard" alt="">
                    </el-dialog>
                </el-form-item>
                
                <!--房屋产权证明 3 -->
                <el-form-item :label="$t('CertificateImg')" prop="pocImg" >
                    <el-upload name="submitFile" :file-list="pocImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadPocImg" :on-success="handleSuccessPocImg"
                        :on-remove="handleRemovePocImg"
                        :limit="3"
                        :class="pocImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewPocImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_pocImg">
                      <img width="100%" :src="dialogImageUrl_pocImg" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 房屋产权人护照复印件 3 -->
                <el-form-item :label="$t('ownerPassportImg')" prop="reoPassportImg" >
                    <el-upload name="submitFile" :file-list="reoPassportImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadReoPassportImg" :on-success="handleSuccessReoPassportImg"
                        :on-remove="handleRemoveReoPassportImg"
                        :limit="3"
                        :class="reoPassportImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewReoPassport">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_reoPassport">
                      <img width="100%" :src="dialogImageUrl_reoPassport" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- FormA确认 3 -->
                <el-form-item :label="$t('FormAconfirm')" prop="formaConfirmImg" v-if="housingApplication.leaseType===1">
                    <el-upload
                     name="submitFile" :file-list="FormAImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadFormAImg" :on-success="handleSuccessFormAImg"
                        :on-remove="handleRemoveFormAImg"
                        :limit="3"
                        :class="FormAImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewFormA">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_FormA">
                      <img width="100%" :src="dialogImageUrl_FormA" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 房屋户型图 出售 10-->
                <el-form-item :label="$t('housePlanImg')"  v-if="housingApplication.leaseType===1">
                    <el-upload name="submitFile" :file-list="houseHoldImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadHouseHoldImg" :on-success="handleSuccessHouseHoldImg"
                        :on-remove="handleRemoveHouseHoldImg"
                        :limit="10"
                        :class="houseHoldImgList.length>=10?'no-uploadIcon':''"
                        :on-preview="previewHouseHold">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_houseHold">
                      <img width="100%" :src="dialogImageUrl_houseHold" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 房源图片 10 -->
                <el-form-item :label="$t('houseImg')" >
                    <el-upload name="submitFile" :file-list="houseSourceImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadhouseSourceImg" :on-success="handleSuccesshouseSourceImg"
                        :on-remove="handleRemovehouseSourceImg"
                        :limit="10"
                        :class="houseSourceImgList.length>=10?'no-uploadIcon':''"
                        :on-preview="previewHouseSource">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_houseSource">
                      <img width="100%" :src="dialogImageUrl_houseSource" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 房屋租赁代理同意书 10 -->
                <el-form-item :label="$t('housingLeasingAgency')" prop="rentAuthorizationSignImg"  v-if="housingApplication.leaseType===0">
                    <el-upload name="submitFile" :file-list="rentAuthorizationSignImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadrentAuthorizationSignImg" :on-success="handleSuccessrentAuthorizationSignImg"
                        :on-remove="handleRemoverentAuthorizationSignImg"
                        :limit="10"
                        :class="rentAuthorizationSignImgList.length>=3?'no-uploadIcon':''"
                        :on-preview="previewrentAuthorizationSignImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_rentAuthorizationSign">
                      <img width="100%" :src="dialogImageUrl_rentAuthorizationSign" alt="">
                    </el-dialog>
                </el-form-item>

                <!-- 房屋租赁合同 houserentalagreement 4  -->
                <el-form-item :label="$t('houserentalagreement')" prop="houseRentContractImg"   v-if="housingApplication.leaseType===1&&housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075">
                    <el-upload name="submitFile" :file-list="houseRentContractImgList" action="/api/pc/file/upload" list-type="picture-card"
                        :before-upload="beforeUploadletterAuthor" :on-success="handleSuccessletterAuthor"
                        :on-remove="handleRemoveletterAuthor"
                        :limit="4"
                        :class="houseRentContractImgList.length>=4?'no-uploadIcon':''"
                        :on-preview="previewHouseRentContract">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible_houseRentContract">
                      <img width="100%" :src="dialogImageUrl_houseRentContract" alt="">
                    </el-dialog>
                </el-form-item>

            </div>
            <!-- housingApplication.leaseType===0 -->
            <el-tabs v-model="activeName" @tab-click="handleClick" class="infoTabs" :stretch="false">
                <el-tab-pane name="first" class="d_flex">
                    <span slot="label">{{$t('info')}}</span>
                        <!-- 房屋类型 -->
                        <el-form-item prop="housingTypeDictcode">
                            <span slot="label">{{$t('HousingTypes')}}</span>
                            <el-select v-model="housingApplication.housingTypeDictcode" placeholder="选择">
                                <el-option v-for="item in houseTypeMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                    :value="item.id+''">
                                </el-option>
                                <el-option label="选择" :value="''"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 房源区域 -->
                        <el-form-item prop="city">
                            <span slot="label">{{$t('housingArea')}}</span>
                            <el-input class="hidden" type='hidden' v-model="housingApplication.city"></el-input>
                            <el-cascader placeholder="search" v-model="city" :options="cities" :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}"
                                    filterable disabled></el-cascader>
                        </el-form-item>

                        <!-- 详细地址 -->
                        <el-form-item prop="address">
                            <span slot="label">{{$t('address')}}</span>
                            <el-input v-model="housingApplication.address" disabled></el-input>
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
                                <el-option v-for="room in [1,2,3,4,5,6,7,8,9,10]" :label="room" :value="room" :key="room"></el-option>
                                <el-option :label="$t('studio')" :value="100"></el-option>
                            </el-select>
                        </el-form-item>

                        <!--面积 -->
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
                            <el-select v-model="housingApplication.isPromissoryBuild" :placeholder="$t('PleaseSelect')">
                                <el-option :label="$t('periodRoom')" :value="0"></el-option>
                                <el-option :label="$t('existingHome')" :value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 房屋状态 -->
                    <el-form-item prop="housingStatus" v-if="housingApplication.isPromissoryBuild==1 || housingApplication.leaseType===0">
                        <span slot="label">{{$t('homeState')}}</span>
                        <el-select v-model="housingApplication.housingStatus" :placeholder="$t('PleaseSelect')">
                            <el-option v-for="item in houseStatusMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                :value="item.id.toString()">
                            </el-option>
                        </el-select>
                    </el-form-item> 

                    <!-- 是否有钥匙 -->
                    <el-form-item prop="haveKeyValue" 
                    v-if="housingApplication.leaseType==0&& housingApplication.housingStatus!=20076&&housingApplication.housingStatus!=''&&housingApplication.housingStatus!=null || housingApplication.leaseType==1&& housingApplication.housingStatus!=20076&&housingApplication.housingStatus!=''&& housingApplication.housingStatus!=null&&housingApplication.isPromissoryBuild==1">
                        <span slot="label">{{$t('haveKey')}}</span>
                        <el-select v-model="housingApplication.haveKeyValue" :placeholder="$t('PleaseSelect')">
                            <el-option :label="housingApplication.housingStatus==20074?$t('vacantOption1'):$t('rentedOption1')" :value="1"></el-option>
                            <el-option :label="housingApplication.housingStatus==20074?$t('vacantOption2'):$t('rentedOption2')" :value="0"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 房屋状态为已出租 且授权平台联系租客时 填写租客姓名电话 -->
                    <!-- 租客姓名 -->
                    <el-form-item prop="rentCustomerName" 
                    v-if="housingApplication.leaseType==0&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1 || housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1">
                        <span slot="label">{{$t('tenantsName')}}</span>
                        <el-input v-model="housingApplication.rentCustomerName"></el-input>
                    </el-form-item>
                    <!-- 租客电话 -->
                    <el-form-item prop="rentCustomerPhone" 
                    v-if="housingApplication.leaseType==0&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1|| housingApplication.isPromissoryBuild==1&&housingApplication.housingStatus==20075&&housingApplication.haveKeyValue==1">
                        <span slot="label">{{$t('tenantsPhone')}}</span>
                        <el-input v-model="housingApplication.rentCustomerPhone"></el-input>
                    </el-form-item>
                    <el-row >
                        <el-col :span="20">
                            <!-- 业主设置预约时间 -->
                            <!-- 
                                housingApplication.leaseType==0 &&housingApplication.haveKeyValue==0 || housingApplication.leaseType==0&&housingApplication.housingStatus==20076 || housingApplication.leaseType==1 &&housingApplication.isPromissoryBuild==1 && housingApplication.haveKeyValue==0">
                             -->
                            <el-form-item prop="appointmentLookTime" v-if="housingApplication.housingStatus!=''&& housingApplication.housingStatus!=null &&housingApplication.haveKeyValue==0 &&housingApplication.leaseType==0|| housingApplication.leaseType==0&&housingApplication.housingStatus==20076 || housingApplication.leaseType==1&&housingApplication.housingStatus==20076 && housingApplication.isPromissoryBuild==1 ||housingApplication.leaseType==1 &&housingApplication.isPromissoryBuild==1 && housingApplication.haveKeyValue==0">
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

                        <!-- 地块信息 -->
                        <el-form-item v-if="housingApplication.leaseType===1" prop="plotNumber">
                            <span slot="label">{{$t('plotNumber')}}</span>
                            <el-input v-model="housingApplication.plotNumber"></el-input>
                        </el-form-item>

                        <!-- 区域类型 -->
                        <el-form-item v-if="housingApplication.leaseType===1" prop="typeOfArea">
                            <span slot="label">{{$t('typeOfArea')}}</span>
                            <el-select v-model="housingApplication.typeOfArea">
                                <el-option label="Free Hold" :value="0"></el-option>
                                <el-option label="Lease Hold" :value="1"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 产权证书 -->
                        <el-form-item v-if="housingApplication.leaseType===1" prop="titleDeedNumber">
                            <span slot="label">{{$t('titleDeedNumber')}}</span>
                            <el-input v-model="housingApplication.titleDeedNumber"></el-input>
                        </el-form-item>

                        <!-- 产权编号 -->
                        <el-form-item v-if="housingApplication.leaseType===1" prop="propertyNumber">
                            <span slot="label">{{$t('propertyNumber')}}</span>
                            <el-input v-model="housingApplication.propertyNumber"></el-input>
                        </el-form-item>

                        <!-- 地产开发商 -->
                        <el-form-item v-if="housingApplication.leaseType===1" prop="masterDevelpoerName">
                            <span slot="label">{{$t('masterDevelpoerName')}}</span>
                            <el-input v-model="housingApplication.masterDevelpoerName"></el-input>
                        </el-form-item>

                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="region">
                                <span slot="label">{{$t('houseingFacilities')}}</span>
                                <el-select v-model="houseSelfContainedDict" multiple :placeholder="$t('PleaseSelect')" style="width:800px;">
                                    <el-option v-for="item in houseMatchingMap" :key="item.id" :label="$i18n.locale=='zh'?item.itemValue:item.itemValueEn"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="region">
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
                    <!-- 支付节点 -->
                    <el-form-item prop="payNode">
                        <span slot="label">{{$t('payNode')}}</span>
                        <el-select v-model="housingApplication.payNode">
                          <!-- 一张支票 -十二月一付 1 -->
                            <el-option label="One payments a year" :value="1"></el-option>
                          <!-- 两张支票 -六月一付 2 --> 
                            <el-option label="Two payments a year" :value="2"></el-option>
                          <!-- 四张支票 -三月一付 4 -->
                            <el-option label="four payments a year" :value="4"></el-option>
                          <!-- 六张支票 -二月一付 6 -->
                            <el-option label="Six payments a year" :value="6"></el-option>
                          <!-- 十二张支票 -一月一付 12 -->
                            <el-option label="Twelve Payment per Year" :value="12"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 起租日期 -->
                    <el-form-item prop="beginRentDate">
                         <span slot="label">{{$t('rentStartDate')}}</span>
                         <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="housingApplication.beginRentDate"></el-date-picker>
                    </el-form-item>

                    <!-- 期望租金 -->
                    <el-form-item prop="houseRent">
                                <span slot="label">{{$t('expectRentAmount')}}</span>
                                <el-input v-model="housingApplication.houseRent" @change="changePrice(0,housingApplication.houseRent)" type="number"></el-input>
                            </el-form-item>

                    <!-- 最低租金 -->
                    <el-form-item prop="minHouseRent">
                        <span slot="label">{{$t('minRentAmount')}}</span>
                        <el-input v-model="housingApplication.minHouseRent" @change="changePrice(1,housingApplication.minHouseRent)" type="number"></el-input>
                    </el-form-item>

                </el-tab-pane>

                <!-- 出售模式下 -->
                <el-tab-pane name="sellInfo" v-if="housingApplication.leaseType===1" class="d_flex">
                    <span slot="label">{{$t('saleInfo')}}</span>

                    <!-- 是否有房贷 -->
                    <el-form-item prop="isHouseLoan">
                        <span slot="label">{{$t('haveHouseingMortgage')}}</span>
                        <el-select v-model="housingApplication.isHouseLoan" :placeholder="$t('PleaseSelect')">
                            <el-option label="yes" :value="1"></el-option>
                            <el-option label="no" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <!-- 期望售价 -->
                    <el-form-item prop="houseRent">
                        <span slot="label">{{$t('expectSaleAmount')}}</span>
                        <el-input v-model="housingApplication.houseRent" @change="changePrice(0,housingApplication.houseRent)" type="number"></el-input>
                    </el-form-item>

                    <!-- 最低售价 -->
                    <el-form-item prop="minHouseRent">
                        <span slot="label">{{$t('minSaleAmount')}}</span>
                        <el-input v-model="housingApplication.minHouseRent" @change="changePrice(1,housingApplication.minHouseRent)" type="number"></el-input>
                    </el-form-item>

                </el-tab-pane>

                <el-tab-pane name="third" class="d_flex">
                    <span slot="label">{{$t('otherContactMethods')}}</span>
                    <el-form-item prop="email">
                        <span slot="label">{{$t('email')}}</span>
                        <el-input v-model="housingApplication.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">Facebook</span>
                        <el-input v-model="housingApplication.facebook"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">Twitter</span>
                        <el-input v-model="housingApplication.twitter"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">Instagram</span>
                        <el-input v-model="housingApplication.instagram"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane name="four" class="d_flex">
                    <span slot="label">{{$t('autoAnswer')}}</span>
                    <!-- 出租模式 -->
                    <div v-if="housingApplication.leaseType===0">
                        <el-row type="flex" v-for="autoAnswer in autoAnswerList" :key="autoAnswer.id">
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">{{$t('rentStartDate')}}</span>
                                    <el-date-picker type="date"  placeholder="选择日期"
                                        value-format="yyyy-MM-dd" v-model="autoAnswer.beginRentDate" style="width: 150px;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">{{$t('leaseTime')}}</span>
                                    <el-select  v-model="autoAnswer.rentTime"
                                        style="width: 150px;">
                                        <el-option v-for="(number) in [1,2,3,4,5,6,7,8,9,10]" :label="number" :value="number" :key="number"></el-option>
                                    </el-select>

                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">{{$t('payNode')}}</span>
                                    <el-select  v-model="autoAnswer.payNode"
                                        style="width: 150px;">
                                        <el-option label="One payments a year" :value="1"></el-option>
                                        <el-option label="Two payments a year" :value="2"></el-option>
                                        <el-option label="Four payments a year" :value="4"></el-option>
                                        <el-option label="Six payments a year" :value="6"></el-option>
                                        <el-option label="Twelve Payment per Year" :value="12"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">{{$t('rentAmount')}}</span>
                                    <el-input  v-model="autoAnswer.houseRentPrice"
                                        style="width: 150px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item>
                                    <span slot="label">{{$t('MethodOfPayment')}}</span>
                                    <el-select  v-model="autoAnswer.payType"
                                        :placeholder="$t('PleaseSelect')" style="width: 150px;">
                                        <el-option :label="$t('cash')" :value="0"></el-option>
                                        <!-- <el-option :label="$t('TheLoan')" :value="1"></el-option> -->
                                    </el-select>
                                    <el-select v-if="autoAnswer.payType===1" 
                                        v-model="autoAnswer.hasExpectApprove" :placeholder="$t('PleaseSelect')" style="width: 150px;">
                                        <el-option :label="$t('hasBeenOn')" :value="0"></el-option>
                                        <el-option :label="$t('notCareful')" :value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <span slot="label">{{$t('isOpen')}}</span>
                                    <el-switch  :active-value="1"
                                        :inactive-value="0" v-model="autoAnswer.isOpen"></el-switch>
                                    <!-- <el-button v-if="autoAnswer.id" @click="deleteAnswer(autoAnswer)" type="danger"
                                        icon="el-icon-delete" size="mini" circle></el-button>
                                    <el-button @click="saveAnswer(autoAnswer)" type="success"
                                        icon="el-icon-check" size="mini" circle></el-button> -->
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" >
                                <el-form-item>
                                    <span slot="label">{{$t('edit')}}</span>
                                    <el-button @click="saveAnswer(autoAnswer)" type="success" icon="el-icon-check" size="mini"
                                        circle></el-button>
                                </el-form-item>
                            </el-col>                            
                            <el-col :span="1" v-if="autoAnswer.id">
                                <el-form-item>
                                    <span slot="label">{{$t('delete')}}</span>
                                    <el-button @click="deleteAnswer(autoAnswer)" type="danger" icon="el-icon-delete"
                                        size="mini" circle></el-button>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <!-- 新增,保存按钮，应答按钮 -->
                        <el-row type="flex" justify="start">
                            <el-button type="success" @click="addAnswer" icon="el-icon-plus" size="mini" circle></el-button>
                        </el-row>
                    </div>
                    <!-- 出售模式 -->
                    <div v-if="housingApplication.leaseType===1">
                        <el-row v-for="autoAnswer in autoAnswerList" :key="autoAnswer.id">
                            <el-col :span="5">
                                <el-form-item>
                                    <span slot="label">{{$t('MethodOfPayment')}}</span>
                                    <!-- :disabled="autoAnswer.id && autoAnswer.payType ===1 ? true : false" -->
                                    <el-radio-group v-model="autoAnswer.payType" size="small" style="width:180px">
                                        <el-radio 
                                            v-model="autoAnswer.payType" :label="0">{{$t('cash')}}</el-radio>
                                        <el-radio 
                                            v-model="autoAnswer.payType" :label="1">{{$t('cash')}}/{{$t('TheLoan')}}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" v-if="autoAnswer.payType===1">
                                <el-form-item>
                                    <span slot="label">{{$t('approvalComplete')}}</span>
                                    <el-radio-group v-model="autoAnswer.hasExpectApprove" size="small" style="width:180px">
                                        <el-radio 
                                            :label="0">yes</el-radio>
                                        <el-radio 
                                            :label="1">no</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item>
                                    <span slot="label">{{$t('minSaleAmount')}}</span>
                                    <el-input v-model="autoAnswer.houseRentPrice"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <span slot="label">{{$t('isOpen')}}</span>
                                    <el-switch :active-value="1"
                                        :inactive-value="0" v-model="autoAnswer.isOpen"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" >
                                <el-form-item>
                                    <span slot="label">{{$t('edit')}}</span>
                                    <el-button @click="saveAnswer(autoAnswer)" type="success" icon="el-icon-check" size="mini"
                                        circle></el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" v-if="autoAnswer.id">
                                <el-form-item>
                                    <span slot="label">{{$t('delete')}}</span>
                                    <el-button @click="deleteAnswer(autoAnswer)" type="danger" icon="el-icon-delete"
                                        size="mini" circle></el-button>
                                </el-form-item>
                            </el-col>                            
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button type="success" @click="addAnswer" icon="el-icon-plus" size="mini" circle></el-button>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 提交，保存 -->
            <el-row type="flex" justify="center">
                <el-button type="primary" @click="submitForm('ruleForm',true)">{{$t('approved')}}</el-button>
                <!-- <el-button @click="checkHouse('ruleForm',true)">{{$t('approved')}}</el-button> -->
                <el-button @click="checkVisible=true">{{$t('auditFail')}}</el-button>
            </el-row>
        </el-form>
        <!-- 审核不通过输入备注 -->
        <el-dialog title="取消审核的原因?" :visible.sync="checkVisible" width="30%">
            <el-input type="textarea" :rows="2" placeholder="审核不通过的原因" v-model="remarks">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="checkHouse('ruleForm',false)">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name: 'uploadHouse',
        props: ['id'],
        data() {
            return {
                city: [],
                cities: [],
                dialogVisible: false,
                houseTypeMap: [],//房屋类型字典
                houseStatusMap: [],//房屋状态字典
                houseSourceMap: [],//房源状态字典
                houseMatchingMap: [],//房间配套字典
                houseConfigureMap: [],//房间配置字典
                houseDetail: {//详情信息
                    housingApplication: {},
                    houseCredentials: {},
                    houseImg: {}
                },
                housingApplication: {}, //详细信息
                houseCredentials: {},//详细信息图片相关
                houseSelfContainedDict: [],//房源配套回显
                houseConfigDict: [],//房源配置回显
                activeName: 'first',
                autoAnswerList: [],//自动应答机制
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
                    appointmentDoorTime: [{required: true, message: `${this.$t("choose")} ${this.$t("MeetingTime")}`, trigger: "change"}],
                    appointmentMeetPlace: [{ required: true, message: `${this.$t("PleaseEnter")} ${this.$t("MeetingSpot")}`,trigger: "blur" }],
                    phoneNumber: [ { required: true,message: `${this.$t("PleaseEnter")} ${this.$t("landlordTelephone")}`,trigger: "blur"}],
                    housingTypeDictcode: [{required: true,message: `${this.$t("choose")} ${this.$t("HousingTypes")}`,trigger: "change"}],
                    address: [{ required: true, message: `${this.$t("PleaseEnter")} ${this.$t("address")}`,trigger: "blur"} ],
                    city: [{ required: true, message: `${this.$t("PleaseEnter")} ${this.$t("housingArea")}`, trigger: "blur" }],
                    roomName: [ {required: true,message: `${this.$t("PleaseEnter")} ${this.$t("HouseNumber")}`, trigger: "blur" }],
                    bedroomNum: [{ required: true,message: `${this.$t("choose")} ${this.$t("housePlan")}`,trigger: "change"}],
                    parkingSpace: [ {required: true, message: `${this.$t("choose")} ${this.$t("ParkingSpaceNum")}`, trigger: "change"}],
                    housingStatus: [{ required: true,message: `${this.$t("choose")} ${this.$t("homeState")}`, trigger: "change" } ],
                    isPromissoryBuild: [{ required: true, message: `${this.$t("choose")} ${this.$t("housingCondition")}`,trigger: "change"}],
                    haveKeyValue: [{ required: true, message: `${this.$t("choose")} ${this.$t("haveKey")}`, trigger: "change" } ],
                    buildingName: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("BuildingName")}`, trigger: "blur" }],
                    houseFloor: [ {required: true, message: `${this.$t("PleaseEnter")} ${this.$t("floor")}`, trigger: "blur"} ],
                    houseAcreage: [ {required: true, message: `${this.$t("PleaseEnter")} ${this.$t("area")}`, trigger: "blur"} ],
                    bathroomNum: [{ required: true, message: `${this.$t("choose")} ${this.$t("bathroomNumber")}`, trigger: "change"} ],
                    houseDecorationDictcode: [ { required: true, message: `${this.$t("choose")} ${this.$t("decorateSituation")}`, trigger: "change" } ],
                    appointmentLookTime: [{ required: true, message: `${this.$t("choose")} ${this.$t("appointmentTime")}`, trigger: "change" }  ],
                    payNode: [ {required: true, message: `${this.$t("choose")} ${this.$t("payNode")}`, trigger: "change" } ],
                    beginRentDate: [ { required: true, message: `${this.$t("choose")} ${this.$t("rentStartDate")}`, trigger: "change"}],
                    houseRent: [ 
                        { required: true, message: `${this.$t("PleaseEnter")} ${this.$t("expectRentAmount")}`,trigger: "blur" },
                    {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}],
                    minHouseRent: [
                        { required: true, message: `${this.$t("PleaseEnter")} ${this.$t("minRentAmount")}`, trigger: "blur" },
                    {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}],
                    isHouseLoan: [{ required: true, message: `${this.$t("choose")} ${this.$t("haveHouseingMortgage")}`, trigger: "change"} ],
                    rentCustomerName: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t( "tenantsName" )}`, trigger: "blur"} ],
                    rentCustomerPhone: [ {required: true,message: `${this.$t("PleaseEnter")} ${this.$t( "tenantsPhone")}`,trigger: "blur"}
                    ],
                    reraPermitNo: [{required: true, message: `${this.$t("PleaseEnter")} RERA permit NO`,trigger: "blur"}],
                    plotNumber: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("plotNumber")}`,trigger: "blur"}],
                    typeOfArea: [{required: true, message: `${this.$t("choose")} ${this.$t("typeOfArea")}`,trigger: "blur"}],
                    titleDeedNumber: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("titleDeedNumber")}`,trigger: "blur"}],
                    propertyNumber: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("propertyNumber")}`,trigger: "blur"}],
                    masterDevelpoerName: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("masterDevelpoerName")}`,trigger: "blur"}],
                    email: [ { required: true, message: `${this.$t("PleaseEnter")} email `,trigger: "blur"},
                    { type: 'email', message: `Please enter the correct email address `, trigger: ['blur', 'change'] }],
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
                    formaConfirmImg: [ //FormA确认
                    {
                        required: true,
                        message: `${this.$t("upload")} ${this.$t("FormAconfirm")}`,
                        trigger: "blur"
                    }
                    ],
                    rentAuthorizationSignImg: [ //房屋租赁代理同意书
                    {
                        required: true,
                        message: `${this.$t("upload")} ${this.$t("housingLeasingAgency")}`,
                        trigger: "blur"
                    }
                    ],
                },
                mandataryCopiesImgList: [],//POA复印件
                mandataryPassportImgList: [],//被委托人的护照
                mandataryVisaImgList: [],//被委托人的签证
                mandataryIdcardImgList: [],//被委托人的ID卡
                pocImgList: [],//产权证明
                reoPassportImgList: [],//产权人护照
                houseHoldImgList: [],//房屋户型图
                houseSourceImgList:[],//房源图片
                FormAImgList:[],//FormA确认图片
                houseRentContractImgList:[],//房屋租赁合同
                //审核不通过的remarks,和对话框的控制变量
                checkVisible: false,
                remarks: '',
                submitData:{},
                removeImgArr:[],
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
                      // 图片预览---
                // POA复印件  mandataryCopiesImgList
                dialogImageUrl_mandataryCopies:'',
                dialogVisible_mandataryCopies:false,
                // 被委托人的护照 mandataryPassportImgList
                dialogImageUrl_mandataryPassport:'',
                dialogVisible_mandataryPassport:false,
                //被委托人的签证 mandataryVisaImgList
                dialogImageUrl_mandataryVisa:'',
                dialogVisible_mandataryVisa:false,
                //被委托人的ID卡 mandataryIdcardImgList
                dialogImageUrl_mandataryIdcard:'',
                dialogVisible_mandataryIdcard:false,
                //房屋产权证明 pocImgList
                dialogImageUrl_pocImg:'',
                dialogVisible_pocImg:false,
                // 产权人护照  reoPassportImgList
                dialogImageUrl_reoPassport:'',
                dialogVisible_reoPassport:false,
                //房屋户型图 houseHoldImgList
                dialogImageUrl_houseHold:'',
                dialogVisible_houseHold:false,
                //房屋租赁合同  houseRentContractImg1
                dialogImageUrl_houseRentContract:'',
                dialogVisible_houseRentContract:false,
                // 房源图片 houseSourceImgList
                dialogImageUrl_houseSource:'',
                dialogVisible_houseSource:false,  
                // FormA确认图 FormAImgList
                dialogImageUrl_FormA:'',
                dialogVisible_FormA:false, 

                // 房屋租赁代理同意书
                rentAuthorizationSignImgList:[],
                dialogImageUrl_rentAuthorizationSign:'',
                dialogVisible_rentAuthorizationSign:false, 
            }
        },
        watch: {
            city(newValue, oldValue) {
                this.$set(this.housingApplication, 'city', newValue[0]);
                this.$set(this.housingApplication, 'community', newValue[1]);
                this.$set(this.housingApplication, 'subCommunity', newValue[2]);
            }
        },
        methods: {
            loadDetail(loadingInstance) {//加载房屋详情

                //清空图片墙
                this.$set(this, 'mandataryCopiesImgList', []);
                this.$set(this, 'mandataryPassportImgList', []);
                this.$set(this, 'mandataryVisaImgList', []);
                this.$set(this, 'mandataryIdcardImgList', []);
                this.$set(this, 'pocImgList', []);
                this.$set(this, 'reoPassportImgList', []);
                this.$set(this, 'houseHoldImgList', []);
                this.$set(this, 'houseSourceImgList', []);
                this.$set(this, 'FormAImgList', []);
                this.$set(this,'houseRentContractImgList',[])

                //房屋详情信息
                let houseDetailPro = this.$axios.post(`/api/pc/house/detail/${this.$props.id}`);
                //房屋类型字典
                let houseTypeMapPro = this.$axios.post(`/api/pc/dict/get/1`, {});
                //房屋状态字典
                let houseStatusMapPro = this.$axios.post(`/api/pc/dict/get/2`, {});
                //房间配套字典
                let houseMatchingMapPro = this.$axios.post(`/api/pc/dict/get/3`, {});
                //房间配置字典
                let houseConfigureMapPro = this.$axios.post(`/api/pc/dict/get/0`, {});
                //房源区域三级联动列表
                let citiesPro = this.$axios.post('/api/pc/support/cities');

                this.$axios.all([houseDetailPro, houseTypeMapPro, houseStatusMapPro, houseMatchingMapPro, houseConfigureMapPro, citiesPro])
                    .then(resList => {
                        //------>房屋详情
                        this.houseCredentials = resList[0].dataSet.houseCredentials || {};
                        this.housingApplication = resList[0].dataSet.house || {};
                        this.houseDetail.houseImg = resList[0].dataSet.houseImg || {};

                        this.$set(this.housingApplication,'haveKeyValue',this.housingApplication.haveKey==null?0:this.housingApplication.haveKey);

                        // 房屋状态已出租，APP没做处理，判断钥匙在哪儿
                        if(this.housingApplication.housingStatus==20075){
                            if(this.housingApplication.rentCustomerName &&　this.housingApplication.rentCustomerPhone　){
                                this.housingApplication.haveKeyValue = 1;
                            }else{
                                this.housingApplication.haveKeyValue = 0;
                            }
                        }

                        // 校验图片
                        this.$set(this.housingApplication,'mandataryCopiesImg',this.houseCredentials.mandataryCopiesImg1);
                        this.$set(this.housingApplication,'mandataryPassportImg',this.houseCredentials.mandataryPassportImg1);
                        this.$set(this.housingApplication,'mandataryVisaImg',this.houseCredentials.mandataryVisaImg1);
                        this.$set(this.housingApplication,'mandataryIdcardImg',this.houseCredentials.mandataryIdcardImg1);
                        this.$set(this.housingApplication,'pocImg',this.houseCredentials.pocImg1);
                        this.$set(this.housingApplication,'reoPassportImg',this.houseCredentials.reoPassportImg1);
                        this.$set(this.housingApplication,'houseRentContractImg',this.houseCredentials.houseRentContractImg1);
                        this.$set(this.housingApplication,'formaConfirmImg',this.houseCredentials.formaConfirmImg1);
                        this.$set(this.housingApplication,'rentAuthorizationSignImg',this.houseCredentials.rentAuthorizationSignImg1);

                        // 处理业主预约看房时间--------------------------20181106
                        this.handleAppointmentLookTime();

                        //POA证件照  10
                        this.getImgList(this.mandataryCopiesImgList,'mandataryCopiesImg',10,resList[0].dataSet.houseCredentials);

                        //被委托人证件照  3
                        this.getImgList(this.mandataryPassportImgList,'mandataryPassportImg',3,resList[0].dataSet.houseCredentials);

                        //被委托人的签证 3
                        this.getImgList(this.mandataryVisaImgList,'mandataryVisaImg',3,resList[0].dataSet.houseCredentials);

                        //被委托人的ID卡 4
                        this.getImgList(this.mandataryIdcardImgList,'mandataryIdcardImg',4,resList[0].dataSet.houseCredentials);

                        //产权证明 3
                        this.getImgList(this.pocImgList,'pocImg',3,resList[0].dataSet.houseCredentials);

                        //产权人护照 3
                        this.getImgList(this.reoPassportImgList,'reoPassportImg',3,resList[0].dataSet.houseCredentials);

                        //房屋户型图 10
                        this.getImgList(this.houseHoldImgList,'houseHoldImg',10,resList[0].dataSet.houseCredentials);

                        // 房源图片 10-----------------------20181106
                        this.getImgList(this.houseSourceImgList,'houseImg',10,resList[0].dataSet.houseImg);

                        // FormAImgList FormA确认图片 3------------------20181107
                        this.getImgList(this.FormAImgList,'formaConfirmImg',3,resList[0].dataSet.houseCredentials);

                        // 房屋租赁合同 4
                        this.getImgList(this.houseRentContractImgList,'houseRentContractImg',4,resList[0].dataSet.houseCredentials);

                        // 房屋租赁代理同意书 3 rentAuthorizationSignImg  rentAuthorizationSignImgList
                        this.getImgList(this.rentAuthorizationSignImgList,'rentAuthorizationSignImg',3,resList[0].dataSet.houseCredentials);


                        //房源配套回显数据处理
                        if (this.housingApplication.houseSelfContainedDictcode)
                            this.houseSelfContainedDict = this.housingApplication.houseSelfContainedDictcode.split(',').map(v => v * 1);
                        //房源配置回显数据处理
                        if (this.housingApplication.houseConfigDictcode)
                            this.houseConfigDict = this.housingApplication.houseConfigDictcode.split(',').map(v => v * 1);

                        //房源区域回显
                        this.city = [this.housingApplication.city, this.housingApplication.community, this.housingApplication.subCommunity];

                        //------>房屋类型字典
                        this.houseTypeMap = resList[1].dataSet.items;
                        // console.log("houseTypeMap:",resList[1].dataSet.items)

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
                    .catch(err => this.$message.error(err.message))
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
            getAutoAnswerList() {//获取自动应答数据 

                this.$axios.post('/api/pc/house/getAutoReplySetting', this.$qs.stringify({ houseId: this.housingApplication.id, applyId: this.housingApplication.applyId })).then(res => {
                    this.autoAnswerList = res.dataSet.autoAnswerList || [];
                    if(res.dataSet.leaseType==0){
                        if(this.autoAnswerList.length>0 ){
                            for(let i=0;i<this.autoAnswerList.length;i++){
                                this.autoAnswerList[i].payType=this.autoAnswerList[i].payType==null?0:this.autoAnswerList[i].payType;
                            }
                        }
                    }
                });
            },
            handleClick(val) {//切换到自动应答后 获取自动应答的信息
                if (val.name === 'four')
                    this.getAutoAnswerList();
            },
            addAnswer() {//出租模式下--->新增自动应答不超过三条

                if (this.housingApplication.leaseType===0 && this.autoAnswerList.length === 3) {
                    this.$message.error('出租自动应答只能添加三条');
                    return;
                }

                if (this.housingApplication.leaseType===1 && this.autoAnswerList.length === 1) {
                    this.$message.error('出售自动应答只能添加1条');
                    return;
                }

                this.autoAnswerList.push({
                    houseId: '',
                    id: '',
                    beginRentDate: new Date(),
                    rentTime: 10,
                    payNode: 4,
                    houseRentPrice: 100,
                    payType: 0,
                    isOpen: 1,
                    hasExpectApprove: 0
                });

            },
            saveAnswer(val) {//新增保存自动应答到服务端
                // console.log(val);
                //添加房源id
                let answer = Object.assign(val, { houseId: this.$props.id, applyId: this.housingApplication.id });
                this.$axios.post('/api/pc/house/addAutoReplySetting', this.$qs.stringify(answer))
                    .then(res => {
                        // console.log('出售新增自动应答,', res);
                        this.getAutoAnswerList();
                    }).catch(err => this.$message.error(err.message));
            },
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
            saveAutoAnswer(ref) {//新增自动应答->提交到后台
                //验证
                // this.$refs[ref].validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });

                //添加房源id
                this.autoAnswer = Object.assign(this.autoAnswer, { houseId: this.$props.id, applyId: this.housingApplication.id });
                this.$axios.post('/api/pc/house/addAutoReplySetting', this.$qs.stringify(this.autoAnswer))
                    .then(res => {
                        // console.log('新增自动应答:', res);
                        if (res.result === 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getAutoAnswerList();
                        } else {
                            this.$message.error(res.message);
                        }
                        this.dialogVisible = false;
                    });
            },
            deleteAnswer(val) {//自动应答删除
                // console.log(val);


                this.$confirm('delete ?', 'prompt', {
                    confirmButtonText: 'commit',
                    cancelButtonText: 'cancel',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/api/pc/house/deleteAutoReply', this.$qs.stringify({ autoReplyId: val.id }))
                        .then(res => {
                            // console.log('删除自动应答:', res);
                            this.$message({ type: 'success', message: 'success' });
                            this.getAutoAnswerList();
                        });
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });

            },
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
            submitForm(formName,isCheck) {//上传房源
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.checkHouse(formName, isCheck)
                } else {
                    this.$message.warning("Please complete the information!");
                    return false;
                }
                });
            },
            async checkHouse(formName, isCheck) {//房源审核
                //验证 this.$refs[formName].resetFields();
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                //处理上传的数据
                this.handleSubmitData();
                try {
                    //1,保存信息 (审核通过才保存信息)
                    let res = '';
                    if(isCheck){
                        res = await this.$axios.post('/api/pc/house/edit', this.$qs.stringify(this.submitData));
                        //2,重新加载数据
                        this.loadDetail();
                    }

                    //3,审核通过或者不通过

                    if (isCheck) {
                        res = await this.$axios.post(`/api/pc/house/check/${this.housingApplication.id}`);
                        this.checkVisible = false;
                        this.$message({ type: 'success', message: res.message });
                        this.$router.go(-1);
                    } else {
                        res = await this.$axios.post('/api/pc/house/apply/check/failure', this.$qs.stringify({ houseId: this.housingApplication.id, remarks: this.remarks }));
                        this.$message({ type: 'success', message: res.message });
                        this.$router.go(-1);
                    }

                } catch (err) {
                    this.$message.error(err.message);
                } finally {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                }


                /***
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                if (isCheck) {
                    this.$axios.post(`/api/pc/house/check/${this.housingApplication.id}`)
                        .then(res => {
                            console.log('终审审核通过：', res);
                            this.checkVisible = false;
                            this.$router.push({ name: 'houseUpLoad' });
                        })
                        .catch(err => this.$message.error(err.message))
                        .finally(() => {
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                        });
                } else {
                    this.$axios.post('/api/pc/house/apply/check/failure', this.$qs.stringify({ houseId: this.housingApplication.id, remarks: this.remarks }))
                        .then(res => {
                            console.log('终审审核未通过：', res);
                        })
                        .catch(err => this.$message.error(err.message))
                        .finally(() => {
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                        });
                }
                ***/
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
                    appointmentLookTime: this.appointmentLookTimeStr,
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
                    property: this.housingApplication.property,//项目
                    address: this.housingApplication.address,
                    //类型
                    //houseTypeDictcode: this.housingApplication.houseTypeDictcode,
                    houseOrientationDictcode: this.housingApplication.houseOrientationDictcode,
                    houseDecorationDictcode: this.housingApplication.houseDecorationDictcode,
                    houseLabelDictcode: this.housingApplication.houseLabelDictcode,
                    houseFloor: this.housingApplication.houseFloor,
                    houseConfigDictcode: this.houseConfigDict.toString(),
                    //户型
                    housingTypeDictcode: this.housingApplication.housingTypeDictcode,
                    housingStatus: this.housingApplication.housingStatus,
                    houseRent: this.housingApplication.houseRent,
                    contacts: this.housingApplication.contacts,//联系人
                    remarks: this.housingApplication.remarks,
                    houseAcreage: this.housingApplication.houseAcreage,
                    houseSelfContainedDictcode: this.houseSelfContainedDict.toString(),
                    memberMobile: this.housingApplication.memberMobile,
                    houseId: this.housingApplication.id,
                    id: this.houseCredentials.id,
                    facebook: this.housingApplication.facebook,
                    twitter: this.housingApplication.twitter,
                    instagram: this.housingApplication.instagram,
                    email: this.housingApplication.email,
                    bathroomNum: this.housingApplication.bathroomNum,
                    bedroomNum: this.housingApplication.bedroomNum,
                    payNode: this.housingApplication.payNode,
                    minHouseRent: this.housingApplication.minHouseRent,
                    reraPermitNo: this.housingApplication.reraPermitNo,
                    beginRentDate:this.housingApplication.beginRentDate,
                    isHouseLoan:this.housingApplication.isHouseLoan,
                    isPromissoryBuild:this.housingApplication.isPromissoryBuild,
                    rentCustomerName:this.housingApplication.housingStatus==20075&&this.housingApplication.haveKeyValue==1?this.housingApplication.rentCustomerName:'',
                    rentCustomerPhone:this.housingApplication.housingStatus==20075&&this.housingApplication.haveKeyValue==1?this.housingApplication.rentCustomerPhone:'',
                    haveKey: this.housingApplication.housingStatus==20074?this.housingApplication.haveKeyValue:this.housingApplication.haveKey,
                    plotNumber:this.housingApplication.plotNumber,
                    typeOfArea:this.housingApplication.typeOfArea,
                    titleDeedNumber:this.housingApplication.titleDeedNumber,
                    propertyNumber:this.housingApplication.propertyNumber,
                    masterDevelpoerName:this.housingApplication.masterDevelpoerName,

                    
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

                // 房源图片 houseSourceImgList
                this.handleDataOfImg( this.houseSourceImgList,10,'houseImg' );

                // FormA确认图 FormAImgList
                this.handleDataOfImg( this.FormAImgList,10,'formaConfirmImg' );

                //房屋租赁合同  houseRentContractImg1
                this.handleDataOfImg( this.houseRentContractImgList,4,'houseRentContractImg');

                // 房屋租赁代理同意书
                if(this.housingApplication.leaseType==0){
                    this.handleDataOfImg( this.rentAuthorizationSignImgList,3,'rentAuthorizationSignImg')
                }

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
            // 上传文件 ----------------------

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
            previewMandataryCopies(file){ //预览
                this.dialogVisible_mandataryCopies = true;
                this.dialogImageUrl_mandataryCopies = file.url;
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
            previewMandataryPassport(file){ //预览
                this.dialogVisible_mandataryPassport = true;
                this.dialogImageUrl_mandataryPassport = file.url;
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
            previewMandataryVisa(file){ //预览
            this.dialogVisible_mandataryVisa = true;
            this.dialogImageUrl_mandataryVisa = file.url;
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
            previewMandataryIdcard(file){ //预览
            this.dialogVisible_mandataryIdcard = true;
            this.dialogImageUrl_mandataryIdcard = file.url;
            },

            //产权证明 pocImgList
            beforeUploadPocImg() {
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
            previewPocImg(file){ //预览
            this.dialogVisible_pocImg = true;
            this.dialogImageUrl_pocImg = file.url;
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
            previewReoPassport(file){ //预览
            this.dialogVisible_reoPassport = true;
            this.dialogImageUrl_reoPassport = file.url;
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
            previewHouseHold(file){ //预览
            this.dialogVisible_houseHold = true;
            this.dialogImageUrl_houseHold = file.url;
            },

            //房源图片 houseSourceImgList--------------------------20181106
            beforeUploadhouseSourceImg() {
                if (this.houseSourceImgList[9])
                    return false;
                else
                    return true;
            },
            handleSuccesshouseSourceImg(res,file,fileList){
                this.houseSourceImgList = fileList;
            },
            handleRemovehouseSourceImg(file,fileList) {
                this.houseSourceImgList = fileList;
                this.handleRemove(file);
            },  
            previewHouseSource(file){ //预览
            this.dialogVisible_houseSource = true;
            this.dialogImageUrl_houseSource = file.url;
            },


            // FormA确认图 FormAImgList
            beforeUploadFormAImg() {
                if (this.FormAImgList[2])
                    return false;
                else
                    return true;
            },
            handleSuccessFormAImg(res,file,fileList){
                this.FormAImgList = fileList;
                this.$set(this.housingApplication,'formaConfirmImg',res.url);//校验图片必填
            },
            handleRemoveFormAImg(file,fileList) {
                this.FormAImgList = fileList;
                this.handleRemove(file);
                this.$set(this.housingApplication,'formaConfirmImg',fileList.length>0?fileList[0].url:'');//校验图片必填
            },
            previewFormA(file){ //预览
            this.dialogVisible_FormA = true;
            this.dialogImageUrl_FormA = file.url;
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
            previewHouseRentContract(file){ //预览
            this.dialogVisible_houseRentContract = true;
            this.dialogImageUrl_houseRentContract = file.url;
            },  

            // 房屋租赁代理同意书 3
            beforeUploadrentAuthorizationSignImg() {
                if (this.rentAuthorizationSignImgList[2]) return false;
                else return true;
            },
            handleSuccessrentAuthorizationSignImg(res,file,fileList) {
                this.rentAuthorizationSignImgList = fileList;
                this.$set(this.housingApplication,'rentAuthorizationSignImg',res.url);//校验图片必填
            },
            handleRemoverentAuthorizationSignImg(file,fileList) {
                this.rentAuthorizationSignImgList = fileList;
                this.handleRemove(file);
                this.$set(this.housingApplication,'rentAuthorizationSignImg',fileList.length>0?fileList[0].url:'');//校验图片必填
            }, 
            previewrentAuthorizationSignImg(file){ //预览
            this.dialogVisible_rentAuthorizationSign = true;
            this.dialogImageUrl_rentAuthorizationSign = file.url;
            }, 


            // 删除图片
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
                });
            },

    //----------20181106
    // 处理预约看房时间字符串
    handleAppointmentLookTime() {
      let str = this.housingApplication.appointmentLookTime;
      let count = 0;
        // console.log(str)
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
            // console.log( val, Number(this.housingApplication.houseRent  ) )
          this.$message.warning('最低租金不得高于期望租金，请重新输入');
          this.housingApplication.minHouseRent = 0;
        }
      }else{
        if(val< Number(this.housingApplication.minHouseRent) ){
          this.$message.warning('期望租金不得低于期望租金，请重新输入');
          this.housingApplication.houseRent = this.housingApplication.minHouseRent;
        }
      }
    },    

        },
        beforeMount() {
            let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
            this.loadDetail(loadingInstance);
        }
    }
</script>
<style scoped lang="less">
    .upload-house {
        >.demo-form-inline {
            margin-top: 20px;

            >.credit {
                margin-top: 40px;

                >div {
                    >.img {
                        // display: flex;
                        // justify-content: flex-start;

                        >img {
                            width: 200px;
                            height: 200px;
                            margin-right: 10px;
                        }
                    }
                }
            }

            .form-right {
                margin-left: 100px;
            }

            >.infoTabs {
                margin-top: 30px;
            }
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