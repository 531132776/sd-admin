<template>
    <div class="outside-edit">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{  }"><span class="">{{$t('HousingToUpload')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('UploadOutSide')}}</el-breadcrumb-item>
                <!-- 出租1/出售0 -->
                <el-breadcrumb-item>{{house.leaseType===0 ? $t('Rent'):$t('Sale')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>  
        <div class="info">
            <p class="title"><span>{{$t('info')}}</span></p>
            <div class="content">
                <el-form label-width="150px">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('contact')}}</span>
                                <el-input v-model="house.contacts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('HousingTypes')}}</span>
                                <el-select v-model="house.housingTypeDictcode" :placeholder="$t('choose')" style="width:247px;">
                                    <el-option v-for="item in houseTypeMap" :key="item.id" :label="item.itemValue"
                                        :value="item.id+''">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>  
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('landlordTelephone')}}</span>
                                <el-input v-model="house.memberMobile" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <!-- <el-form-item>
                                <span slot="label">{{$t('HouseNumber')}}</span>
                                <el-input v-model="house.roomName"></el-input>
                            </el-form-item> -->
                            <el-form-item>
                                <span slot="label">{{$t('housingArea')}}</span>
                                <el-cascader placeholder="search" v-model="city" :options="cities" filterable change-on-select :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}"
                                    ></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('address')}}</span>
                                <el-input v-model="house.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('BuildingName')}}</span>
                                <el-input v-model="house.buildingName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('HouseNumber')}}</span>
                                <el-input v-model="house.roomName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item>
                                <span slot="label">{{$t('MeetingSpot')}}</span>
                                <el-input v-model="house.appointmentMeetPlace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item>
                                <span slot="label">{{$t('MeetingTime')}}</span>
                                <el-date-picker v-model="house.appointmentDoorTime" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item>
                                <span slot="label"></span>
                                <el-button type="success" @click="submit">{{$t('submit')}}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'outsideUpload',
        props: ['id'],
        data() {
            return {
                pickerOptions: {// 限制预约时间为未来两天内
                    disabledDate(time) {
                        return   Date.now() > time.getTime() || (time.getTime()-Date.now()>2*24*60*60*1000);
                    }
                },
                houseTypeMap: [],//房屋类型
                cities:[],//房源区域列表
                city:[],
                house: {
                    // applicantType: 0,//申请人类型：0业主 1 poa		
                    // languageVersion: 1,//语言版本（0：中文，1：英文）默认为0		
                    // phoneNumber: null,//手机号码		
                    // applyType: 1,//申请类型（0：自主完善，1：联系客服上传，2：业务员上传）		
                    // leaseType: 0,	//	房屋类型（0：出租，1：出售）		
                    // villageName: '',//小区名		
                    buildingName: '',//楼名/别墅名		
                    roomName: '',//房间号		
                    // parkingSpace: null,//	是否有停车位（0：无，1：有）		
                    city: '',//城市		
                    community: '',//社区		
                    subCommunity: '',//子社区		
                    // property: '',//项目		
                    address: '',//所在位置		
                    // ownerPassportPic1: '',//	业主护照照片1		
                    // ownerPassportPic2: '',//	string	是	业主护照2		
                    housingTypeDictcode: '',//	string	是	房屋户型 ，查询数据字典		/-------------------------
                    // houseOrientationDictcode: '',//	string	是	房屋朝向，查询数据字典		
                    // houseDecorationDictcode: '0',//	string	是	房屋装修，查询数据字典		
                    // houseLabelDictcode: '',//	string	是	房源特色，查询数据字典，逗号分割		
                    // houseFloor: '',//	string	是	房源楼层，查询数据字典		
                    // houseConfigDictcode: '',//	string	是	房源配置，查询数据字典，逗号分割		
                    // housingTypeDictcode: '',//	string	是	房屋类型 ，查询数据字典		
                    // housingStatus: 20074,//	string	是	房屋状态（0：空房，1：出租，2：自住）		
                    // houseRent: null,//	string	是	租金/售价		
                    contacts: '',//	string	是	联系人		
                    // remarks: '',//	string	是	备注		
                    // pocPic1: '',//	string	是	房产证照片1		
                    // houseAcreage: '',//	string	是	房屋面积		
                    // passportPic1: '',//	string	是	POA护照照片1		
                    // passportPic2: '',//	string	是	POA护照照片2		
                    // pocPic2: '',//	string	是	房产证照片2		
                    // formaPic1: '',//	string	是	formA照片1		
                    // formaPic2: '',//	string	是	formA照片2		
                    // houseSelfContainedDictcode: '',//	string	是	房屋配套		
                    memberMobile: null,//	string	是	用户手机号		
                    appointmentMeetPlace: '',//	string	是	见面地点		
                    appointmentDoorTime: '',//	string	是	预约上门获取房源时间（见面时间）		
                    // facebook: '',//	string	否	facebook		
                    // twitter: '',//	string	否	twitter		
                    // instagram: '',//	string	否	instagram		
                    // email: '',//	string	否	email		
                    // bathroomNum: '',//	string	是	浴室数量		
                    // bedroomNum: '',//	string	是	卧室数量		
                    // applyId: '',//	string	是	房源申请id（更新时必传）		
                    // id: null,//	string	是	房源图片id（更新时必传）		
                    // minHouseRent: null,//	string	是	最低租金		
                    // memberId: null,//	string	是	所对应的用户id
                    // isPromissoryBuild: 0, //0是期房1是现房
                    // payNode: 1,
                    // beginRentDate: '',//起租日期
                    // houseRent: null,//期望租金
                    // isHouseLoan: 0,//是否有房贷 1有0无
                    // houseRent: null,//期望售价
                    // minHouseRent: null,//最低售价
                }
            }
        },
        watch: {
            city(newValue, oldValue) {
                this.$set(this.house, 'city', newValue[0]);
                this.$set(this.house, 'community', newValue[1]);
                this.$set(this.house, 'subCommunity', newValue[2]);
            }
        },
        methods: {
            loadHouse() {
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                let houseTypePro = this.$axios.post(`/api/pc/dict/get/1`, {});
                let housePro = this.$axios.post(`/api/pc/owner/apply/detail/${this.$props.id}`);
                 //房源区域三级联动列表
                 let citiesPro = this.$axios.post('/api/pc/support/cities');
                this.$axios.all([houseTypePro, housePro,citiesPro])
                    .then(res => {
                        this.houseTypeMap = res[0].dataSet.items || [];
                        this.house = res[1].dataSet ? res[1].dataSet.housingApplication : this.house;
                        this.cities = res[2].dataSet || [];
                         //房源区域回显
                        this.city=[this.house.city,this.house.community,this.house.subCommunity];

                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.$nextTick(() => {
                        loadingInstance.close();
                    }));
            },
            async submit() {// 提交-更新-审核通过
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                try {
                    // 先保存信息
                    let res = await this.$axios.post('/api/pc/add/owner/apply', this.$qs.stringify({
                    buildingName: this.house.buildingName,
                    contacts:this.house.contacts,
                    roomName:this.house.roomName,
                    memberMobile:this.house.memberMobile,
                    appointmentMeetPlace:this.house.appointmentMeetPlace,
                    appointmentDoorTime:this.house.appointmentDoorTime,
                    address:this.house.address,
                    housingTypeDictcode:this.house.housingTypeDictcode,
                    applyId:this.house.id
                    }));
                    //重新加载
                    this.loadHouse();
                    //审核通过
                    res = await this.$axios.post('/api/pc/house/apply/check', this.$qs.stringify({ applyId: this.house.id, isCheck: 2, remarks: '' }));
                    this.$message({ type: 'success', message: res.message });
                    this.$router.push({ name: 'houseUpLoad' });
                } catch (err) {
                    this.$message.error(err.message);
                } finally {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    })
                }
            }
        },
        beforeMount() {
            this.loadHouse();
        }
    }
</script>
<style scoped lang="less">
    .outside-edit {
        >.info {
            >p.title {
                margin: 35px 0 40px 0;
                padding: 0;
                font-size: 14px;
                color: #333333;
                line-height: 20px;
                text-indent: 4px;
                border-left: 2px solid #00B660;
                display: flex;
                align-items: center;
            }

            >.content {
                padding-left: 70px;

            }
        }
    }
</style>