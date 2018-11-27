<!-- 客户上传房源 -->
<template>
    <div class="upload-house">
        <el-breadcrumb separator="/" class="mb-20">
            <el-breadcrumb-item :to="{ path:'/home/houseUpLoad' }">
            <span class="">{{$t('HousingToUpload')}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('UploadService')}}</el-breadcrumb-item>
        </el-breadcrumb>   

        <el-form :model="house" ref="formsd" label-width="160px" >
            <el-radio-group v-model="house.leaseType" size="small" class="mb-20">
                <el-radio v-model="house.leaseType" :label="0">{{$t('Rent')}}</el-radio>
                <el-radio v-model="house.leaseType" :label="1">{{$t('Sale')}}</el-radio>
            </el-radio-group>
            <div class="d_flex meetingTime">
                    <el-form-item>
                        <span slot="label">{{$t('housingAssociation')}}</span>
                        <el-input v-model="house.phoneNumber" disabled></el-input>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">{{$t('housingOwnership')}}</span>
                        <el-select v-model="house.applicantType">
                            <el-option :label="$t('landlord')" :value="0"></el-option>
                            <el-option label="POA" :value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">{{$t('MeetingTime')}}</span>
                        <el-date-picker v-model="house.appointmentDoorTime" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">{{$t('MeetingSpot')}}</span>
                        <el-input v-model="house.appointmentMeetPlace" :placeholder="$t('MeetingSpot')"></el-input>
                    </el-form-item>
            </div>
            <!-- POA复印件 mandataryCopiesImgList -->
            <el-row v-if="house.applicantType===1">
                    <span>{{$t('copyOfPOAImg')}}*</span>
                    <el-upload name="submitFile" :file-list="mandataryCopiesImgList" action="/api/pc/file/upload"
                        list-type="picture-card" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
            </el-row>

            <!--被委托人的护照 mandataryPassportImgList -->
            <el-row v-if="house.applicantType===1">
                <p>{{$t('principalPassportImg')}}</p>
                <el-upload name="submitFile" :file-list="mandataryPassportImgList" action="/api/pc/file/upload"
                    list-type="picture-card" :before-upload="beforeUploadMandataryPassportImg" :on-success="handleSuccessMandataryPassportImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <!--被委托人的签证 mandataryVisaImgList -->
            <el-row v-if="house.applicantType===1">
                <p>{{$t('clientVisaImg')}}</p>
                <el-upload name="submitFile" :file-list="mandataryVisaImgList" action="/api/pc/file/upload" list-type="picture-card"
                    :before-upload="beforeUploadMandataryVisaImg" :on-success="handleSuccessMandataryVisaImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <!-- 被委托人的ID卡mandataryIdcardImgList -->
            <el-row v-if="house.applicantType===1">
                <p>{{$t('IDCardOfPrincipalImg')}}</p>
                <el-upload name="submitFile" :file-list="mandataryIdcardImgList" action="/api/pc/file/upload" list-type="picture-card"
                    :before-upload="beforeUploadMandataryIdcardImg" :on-success="handleSuccessMandataryIdcardImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <!--产权证明 pocImgList  -->
            <el-row>
                <p>{{$t('CertificateImg')}}</p>
                <el-upload name="submitFile" :file-list="pocImgList" action="/api/pc/file/upload" list-type="picture-card"
                    :before-upload="beforeUploadPocImg" :on-success="handleSuccessPocImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-row>

            <!-- 产权人护照 reoPassportImgList -->
            <el-row>
                <p>{{$t('ownerPassportImg')}}</p>
                <el-upload name="submitFile" :file-list="reoPassportImgList" action="/api/pc/file/upload" list-type="picture-card"
                    :before-upload="beforeUploadReoPassportImg" :on-success="handleSuccessReoPassportImg">
                    <i class="el-icon-plus"></i>
                </el-upload>{{house.reoPassportImg3}}{{house.reoPassportImg2}}{{house.reoPassportImg3}}
            </el-row>

            <!-- tabs -->
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane name="first">
                    <span slot="label">{{$t('info')}}</span>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('HousingTypes')}}</span>
                                <el-select v-model="house.housingTypeDictcode" placeholder="请选择" style="width:247px;">
                                    <el-option v-for="item in houseTypeMap" :key="item.id" :label="item.itemValue"
                                        :value="item.id+''">
                                    </el-option>
                                    <el-option label="请选择" :value="''">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('housingArea')}}</span>
                                <el-cascader placeholder="search" v-model="city" :options="cities" :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}"
                                    filterable></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('address')}}</span>
                                <el-input v-model="house.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('BuildingName')}}</span>
                                <el-input v-model="house.buildingName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('HouseNumber')}}</span>
                                <el-input v-model="house.roomName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('floor')}}</span>
                                <el-input v-model="house.houseFloor"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <!-- 卧室数量 -->
                            <el-form-item prop="bedroomNum">
                                <span slot="label">{{$t('bedroomNumber')}}</span>
                                <el-select v-model="house.bedroomNum">
                                    <el-option v-for="(room,idx) in [1,2,3,4,5,6,7,8,9,10]" :label="room" :value="room" :key="idx"></el-option>
                                    <el-option  :label="$t('studio')" :value="100"></el-option>
                                </el-select>
                            </el-form-item>                            
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('area')}}</span>
                                <el-input v-model="house.houseAcreage"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <!-- 车位 -->
                            <el-form-item prop="parkingSpace">
                                <span slot="label">{{$t('ParkingSpaceNum')}}</span>
                                <el-select v-model="house.parkingSpace">
                                    <el-option :label="$t('thereAre')" :value="1"></el-option>
                                    <el-option :label="$t('thereIsNo')" :value="0"></el-option>
                                </el-select>
                            </el-form-item>                            
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <!-- 浴室数量 -->
                            <el-form-item prop="bathroomNum">
                                <span slot="label">{{$t('bathroomNumber')}}</span>
                                <el-select v-model="house.bathroomNum">
                                    <el-option v-for="(number) in [1,2,3,4,5,6,7,8,9,10]" :label="number" :value="number" :key="number"></el-option>
                                </el-select>
                            </el-form-item>                            
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('homeState')}}</span>
                                <el-select v-model="house.housingStatus" placeholder="请选择" style="width:247px;">
                                    <el-option v-for="item in houseStatusMap" :key="item.id" :label="item.itemValue"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('decorateSituation')}}</span>
                                <el-select v-model="house.houseDecorationDictcode" :placeholder="$t('choose')" style="width:247px;">
                                    <el-option :label="$t('withFurniture')" value="0"></el-option>
                                    <el-option :label="$t('withNoFurniture')" value="1"></el-option>
                                    <el-option :label="$t('halfFurniture')" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('housingCondition')}}</span>
                                <el-select v-model="house.isPromissoryBuild" :placeholder="$t('choose')" style="width:247px;">
                                    <el-option :label="$t('periodRoom')" :value="0"></el-option>
                                    <el-option :label="$t('existingHome')" :value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('houseingFacilities')}}</span>
                                <el-select v-model="houseSelfContainedDict" multiple placeholder="请选择" style="width:641px;">
                                    <el-option v-for="item in houseMatchingMap" :key="item.id" :label="item.itemValue"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('housingAllocation')}}</span>
                                <el-select v-model="houseConfigDict" multiple placeholder="请选择" style="width:641px;">
                                    <el-option v-for="item in houseConfigureMap" :key="item.id" :label="item.itemValue"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-tab-pane>
                <!-- 出租模式下的租金详情 -->
                <el-tab-pane v-if="house.leaseType===0" name="second">
                    <span slot="label">{{$t('rentInformation')}}</span>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('payNode')}}</span>
                                <el-select v-model="house.payNode">
                                    <el-option label="Twelve payments a year" :value="1"></el-option>
                                    <el-option label="Six payments a year" :value="2"></el-option>
                                    <el-option label="four payments a year" :value="3"></el-option>
                                    <el-option label="Two payments a year" :value="6"></el-option>
                                    <el-option label="One Payment per Year" :value="12"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('rentStartDate')}}</span>
                                <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="house.beginRentDate"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('expectRentAmount')}}:</span>
                                <el-input v-model="house.houseRent"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('minRentAmount')}}:</span>
                                <el-input v-model="house.minHouseRent"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- 出售模式下的售价详情 -->
                <el-tab-pane v-if="house.leaseType===1" name="second">
                    <span slot="label">{{$t('saleInfo')}}</span>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('haveHouseingMortgage')}}</span>
                                <el-select v-model="house.isHouseLoan" placeholder="请选择">
                                    <el-option label="yes" :value="1"></el-option>
                                    <el-option label="no" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('expectSaleAmount')}}</span>
                                <el-input v-model="house.houseRent"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('minSaleAmount')}}:</span>
                                <el-input v-model="house.minHouseRent"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane name="third">
                    <span slot="label">{{$t('otherContactMethods')}}</span>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">{{$t('email')}}:</span>
                                <el-input v-model="house.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">Facebook:</span>
                                <el-input v-model="house.facebook"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item>
                                <span slot="label">Twitter：</span>
                                <el-input v-model="house.twitter"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-form-item>
                                <span slot="label">Instagram：</span>
                                <el-input v-model="house.instagram"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <el-row type="flex" justify="center">
            <el-button type="success" @click="uploadHouse">submit</el-button>
        </el-row>
    </div>
</template>
<script>

    export default {
        name: 'uploadHouse',
        props: ['memberId'],
        data() {
            return {
                pickerOptions: {// 限制预约时间为未来两天内
                    disabledDate(time) {
                        return   Date.now()-24*60*60*1000 >= time.getTime() || (time.getTime()-Date.now()>2*24*60*60*1000);
                    }
                },
                city:[],
                cities:[],// 见面地点三级联动
                activeTab: 'first',
                houseSelfContainedDict: [],//房源配套回显
                houseConfigDict: [],//房源配置回显
                house: {
                    applicantType: 0,//申请人类型：0业主 1 poa		
                    languageVersion: 1,//语言版本（0：中文，1：英文）默认为0		
                    phoneNumber: this.$route.query.phoneNumber,//手机号码		
                    applyType: 1,//申请类型（0：自主完善，1：联系客服上传，2：业务员上传）		
                    leaseType: 0,	//	房屋类型（0：出租，1：出售）		
                    villageName: '',//小区名		
                    buildingName: '',//楼名/别墅名		
                    roomName: '',//房间号		
                    parkingSpace: null,//	是否有停车位（0：无，1：有）		
                    city: '',//城市		
                    community: '',//社区		
                    subCommunity: '',//子社区		
                    property: '',//项目		
                    address: '',//所在位置		
                    ownerPassportPic1: '',//	业主护照照片1		
                    ownerPassportPic2: '',//	string	是	业主护照2		
                    houseTypeDictcode: '',//	string	是	房屋户型 ，查询数据字典		
                    houseOrientationDictcode: '',//	string	是	房屋朝向，查询数据字典		
                    houseDecorationDictcode: '0',//	string	是	房屋装修，查询数据字典		
                    houseLabelDictcode: '',//	string	是	房源特色，查询数据字典，逗号分割		
                    houseFloor: '',//	string	是	房源楼层，查询数据字典		
                    houseConfigDictcode: '',//	string	是	房源配置，查询数据字典，逗号分割		
                    housingTypeDictcode: '',//	string	是	房屋类型 ，查询数据字典		
                    housingStatus: 20074,//	string	是	房屋状态（0：空房，1：出租，2：自住）		
                    houseRent: null,//	string	是	租金/售价		
                    contacts: '',//	string	是	联系人		
                    remarks: '',//	string	是	备注		
                    pocPic1: '',//	string	是	房产证照片1		
                    houseAcreage: '',//	string	是	房屋面积		
                    passportPic1: '',//	string	是	POA护照照片1		
                    passportPic2: '',//	string	是	POA护照照片2		
                    pocPic2: '',//	string	是	房产证照片2		
                    formaPic1: '',//	string	是	formA照片1		
                    formaPic2: '',//	string	是	formA照片2		
                    houseSelfContainedDictcode: '',//	string	是	房屋配套		
                    memberMobile: null,//	string	是	用户手机号		
                    appointmentMeetPlace: '',//	string	是	见面地点		
                    appointmentDoorTime: '',//	string	是	预约上门获取房源时间（见面时间）		
                    facebook: '',//	string	否	facebook		
                    twitter: '',//	string	否	twitter		
                    instagram: '',//	string	否	instagram		
                    email: '',//	string	否	email		
                    bathroomNum: '',//	string	是	浴室数量		
                    bedroomNum: '',//	string	是	卧室数量		
                    applyId: '',//	string	是	房源申请id（更新时必传）		
                    id: null,//	string	是	房源图片id（更新时必传）		
                    minHouseRent: null,//	string	是	最低租金		
                    memberId: null,//	string	是	所对应的用户id
                    isPromissoryBuild: 0, //0是期房1是现房
                    payNode: 1,
                    beginRentDate: '',//起租日期
                    houseRent: null,//期望租金
                    isHouseLoan: 0,//是否有房贷 1有0无
                    houseRent: null,//期望售价
                    minHouseRent: null,//最低售价
                },
                //数据字典
                houseTypeMap: [],
                houseStatusMap: [],
                houseMatchingMap: [],
                houseConfigureMap: [],
                mandataryCopiesImgList:[],//POA复印件
                mandataryPassportImgList: [],//被委托人的护照
                mandataryVisaImgList: [],//被委托人的签证
                mandataryIdcardImgList: [],//被委托人的ID卡
                pocImgList: [],//产权证明
                reoPassportImgList: [],//产权人护照
            }
        },
        methods: {
            handleClick() {

            },
            
             // 上传文件-POA复印件
             beforeAvatarUpload() {
                if (this.house.mandataryCopiesImg10)
                    return false;
                else
                    return true;

            },
            handleAvatarSuccess(res, file) {
                if (!this.house.mandataryCopiesImg1) {
                    this.$set(this.house,'mandataryCopiesImg1',res.fid);
                } else if (!this.house.mandataryCopiesImg2) {
                    this.$set(this.house,'mandataryCopiesImg2',res.fid);
                } else if (!this.house.mandataryCopiesImg3) {
                    this.$set(this.house,'mandataryCopiesImg3',res.fid);
                } else if (!this.house.mandataryCopiesImg4) {
                    this.$set(this.house,'mandataryCopiesImg4',res.fid);
                } else if (!this.house.mandataryCopiesImg5) {
                    this.$set(this.house,'mandataryCopiesImg5',res.fid);
                } else if (!this.house.mandataryCopiesImg6) {
                    this.$set(this.house,'mandataryCopiesImg6',res.fid);
                } else if (!this.house.mandataryCopiesImg7) {
                    this.$set(this.house,'mandataryCopiesImg7',res.fid);
                } else if (!this.house.mandataryCopiesImg8) {
                    this.$set(this.house,'mandataryCopiesImg8',res.fid);
                } else if (!this.house.mandataryCopiesImg9) {
                    this.$set(this.house,'mandataryCopiesImg9',res.fid);
                } else if (!this.house.mandataryCopiesImg10) {
                    this.$set(this.house,'mandataryCopiesImg10',res.fid);
                }
            },

            //被委托人的护照
            beforeUploadMandataryPassportImg() {
                if (this.house.mandataryPassportImg3)
                    return false;
                else
                    return true;
            },
            handleSuccessMandataryPassportImg(res) {

                if (!this.house.mandataryPassportImg1) {
                    this.$set(this.house,'mandataryPassportImg1',res.fid);
                } else if (!this.house.mandataryPassportImg2) {
                    this.$set(this.house,'mandataryPassportImg2',res.fid);
                } else if (!this.house.mandataryPassportImg3) {
                    this.$set(this.house,'mandataryPassportImg3',res.fid);
                }

            },
            //被委托人的签证
            beforeUploadMandataryVisaImg() {
                if (this.house.mandataryVisaImg3)
                    return false;
                else
                    return true;
            },
            handleSuccessMandataryVisaImg(res) {
                if (!this.house.mandataryVisaImg1) {
                    this.$set(this.house,'mandataryVisaImg1',res.fid);
                } else if (!this.house.mandataryVisaImg2) {
                    this.$set(this.house,'mandataryVisaImg2',res.fid);
                } else if (!this.house.mandataryVisaImg3) {
                    this.$set(this.house,'mandataryVisaImg3',res.fid);
                }

            },
            //被委托人的ID卡
            beforeUploadMandataryIdcardImg() {
                if (this.house.mandataryIdcardImg4)
                    return false;
                else
                    return true;
            },
            handleSuccessMandataryIdcardImg(res) {
                if (!this.house.mandataryIdcardImg1) {
                    this.$set(this.house,'mandataryIdcardImg1',res.fid);
                } else if (!this.house.mandataryIdcardImg2) {
                   this.$set(this.house,'mandataryIdcardImg2',res.fid);
                } else if (!this.house.mandataryIdcardImg3) {
                    this.$set(this.house,'mandataryIdcardImg3',res.fid);
                }else if (!this.house.mandataryIdcardImg4) {
                    this.$set(this.house,'mandataryIdcardImg4',res.fid);
                }
            },
            //产权证明
            beforeUploadPocImg() {
                if (this.house.pocImg3)
                    return false;
                else
                    return true;
            },
            handleSuccessPocImg(res) {

                if (!this.house.pocImg1) {
                    this.$set(this.house,'pocImg1',res.fid);
                } else if (!this.house.pocImg2) {
                   this.$set(this.house,'pocImg2',res.fid);
                } else if (!this.house.pocImg3) {
                    this.$set(this.house,'pocImg3',res.fid);
                }

            },
            // 产权人护照
            beforeUploadReoPassportImg() {
                if (this.house.reoPassportImg3)
                    return false;
                else
                    return true;
            },
            handleSuccessReoPassportImg(res) {
                if (!this.house.reoPassportImg1) {
                    this.$set(this.house,'reoPassportImg1',res.fid);
                } else if (!this.house.reoPassportImg2) {
                    this.$set(this.house,'reoPassportImg2',res.fid);
                } else if (!this.house.reoPassportImg3) {
                    this.$set(this.house,'reoPassportImg3',res.fid);
                }
            },
            uploadHouse() {//上传房源

                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });

                this.$axios.post('/api/pc/add/owner/apply', this.$qs.stringify(this.house))
                    .then(res => {
                        this.$message({ type: 'success', message: res.message });
                        this.$router.push({ name: 'houseUpLoad' });
                    }).catch(err => {
                        // console.log(err);
                        this.$message.error(err.message)
                    }).finally(() => {
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                    });
            }
        },
        watch: {
            houseSelfContainedDict(currentValue, oldValue) {
                this.house.houseSelfContainedDictcode = currentValue.toString();
            },
            houseConfigDict(currentValue, oldValue) {
                this.house.houseConfigDictcode = currentValue.toString();
            },
            city(newValue, oldValue) {
                this.$set(this.house, 'city', newValue[0]);
                this.$set(this.house, 'community', newValue[1]);
                this.$set(this.house, 'subCommunity', newValue[2]);
            }
        },
        beforeMount() {
            // console.log('memberId--->', this.$props.memberId);
            this.house.memberId = this.$props.memberId;
            //房屋类型字典
            let houseTypeMapPro = this.$axios.post(`/api/pc/dict/get/1`, {});
            //房屋状态字典
            let houseStatusMapPro = this.$axios.post(`/api/pc/dict/get/2`, {});
            //房间配套字典
            let houseMatchingMapPro = this.$axios.post(`/api/pc/dict/get/3`, {});
            //房间配置字典
            let houseConfigureMapPro = this.$axios.post(`/api/pc/dict/get/0`, {});

            //城市列表
            let citiesPro=this.$axios.post('/api/pc/support/cities');

            this.$axios.all([houseTypeMapPro, houseStatusMapPro, houseMatchingMapPro, houseConfigureMapPro,citiesPro])
                .then(resList => {
                    //------>房屋类型字典
                    this.houseTypeMap = resList[0].dataSet.items || [];
                    // console.log("houseTypeMap:",resList[1].dataSet.items)

                    //------->房屋状态字典
                    this.houseStatusMap = resList[1].dataSet.items || [];
                    // console.log("houseSourceMap:", resList[2].dataSet.items);

                    //-------->房间配套字典
                    this.houseMatchingMap = resList[2].dataSet.items || [];
                    //console.log("houseMatchingMap:",resList[3].dataSet.items);

                    //---------->房间配置字典
                    this.houseConfigureMap = resList[3].dataSet.items || [];
                    //console.log("houseConfigureMap:",resList[4].dataSet.items);
                    //城市、社区，子社区联动数据
                    this.cities = resList[4].dataSet || [];
                });

        }
    }
</script>
<style scoped lang="less">
    .upload-house {
          .meetingTime.d_flex{
            flex-wrap: wrap;
            // .el-form-item{
            //     width: 45%;
            //     .el-form-item__content{
            //         width: 250px!important;
            //         .el-select{width: 100%;}
            //     }
                
            // }
        }
    }
</style>