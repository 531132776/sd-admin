<template>
    <div class="outside-upload">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:this.$route.query.memberMobile?'/home/houseUpLoad':'/home/houseaudit' }">
                    <span class="" v-if="!this.$route.query.memberMobile">{{$t('HousingVerify')}}</span>
                    <span v-else>{{$t('HousingToUpload')}}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('UploadOutSide')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="info">
            <p class="title"><span>{{$t('info')}}</span></p>
            <div class="content">
                <el-form label-width="150px" class="d_flex" :model="house" :rules="rules" ref="ruleForm" >
                    <el-form-item prop="leaseType" style="display:block;width:100%;">
                        <span slot="label"></span>
                        <el-radio-group v-model="house.leaseType" :disabled="this.$route.query.memberMobile?false:true">
                            <el-radio :label="0">{{$t('Rent')}}</el-radio>
                            <el-radio :label="1">{{$t('Sale')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="contacts">
                        <span slot="label">{{$t('contacts')}}</span>
                        <el-input v-model="house.contacts"></el-input>
                    </el-form-item>
                    <el-form-item prop="phoneNumber">
                        <span slot="label">{{$t('contact')}}</span>
                        <el-input v-model="house.phoneNumber"></el-input>
                    </el-form-item>   
                    <el-form-item prop="memberMobile">
                        <span slot="label">{{$t('landlordTelephone')}}</span>
                        <el-input v-model="house.memberMobile" disabled></el-input>
                    </el-form-item>
                    <el-form-item prop="housingTypeDictcode">
                        <span slot="label">{{$t('HousingTypes')}}</span>
                        <el-cascader style="width:300px;" placeholder="search" v-model="housingTypeDictcode" :options="houseTypeMap" :props="{'label':$i18n.locale=='zh'?'itemValue':'itemValueEn','children':'sub',value:'id'}"
                                    filterable
                                    :show-all-levels="false" ></el-cascader>
                    </el-form-item>
                    
                    <el-form-item prop="city">
                        <span slot="label">{{$t('housingArea')}}</span>
                        <el-cascader style="width:300px;" placeholder="search" v-model="city" :options="cities" :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}"
                                    filterable>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item prop="roomName">
                        <span slot="label">{{$t('HouseNumber')}}</span>
                        <el-input v-model="house.roomName"></el-input>
                    </el-form-item>
                    <el-form-item prop="buildingName">
                        <span slot="label">{{$t('BuildingName')}}</span>
                        <el-input v-model="house.buildingName"></el-input>
                    </el-form-item>
                    <el-form-item prop="address">
                        <span slot="label">{{$t('address')}}</span>
                        <el-input v-model="house.address"></el-input>
                    </el-form-item>
                    
                    <el-form-item prop="appointmentMeetPlace">
                        <span slot="label">{{$t('MeetingSpot')}}</span>
                        <el-input v-model="house.appointmentMeetPlace"></el-input>
                    </el-form-item>
                    <el-form-item prop="appointmentDoorTime">
                        <span slot="label">{{$t('MeetingTime')}}</span>
                        <el-date-picker v-model="house.appointmentDoorTime" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                    :placeholder="$t('PleaseSelect')" @change="getTESTtime" ref="datePicker">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="qutside_f_btn">
                        <span slot="label"></span>
                        <el-button type="success" style="width:240px;" @click="submit('ruleForm')">{{$t('submit')}}</el-button>
                    </el-form-item>                            
                </el-form>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pickerOptions: {// 限制预约时间为未来两天内
                    disabledDate(time) {
                        return   Date.now()-24*60*60*1000 > time.getTime() ||
            time.getTime() - Date.now() > 2 * 24 * 60 * 60 * 1000
                    }
                },
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
                ],//房屋类型
                city: [],
                cities: [],
                housingTypeDictcode:[],
                house: {
                    phoneNumber: '',
                    memberId:'',
                    memberMobile: '',
                    housingTypeDictcode: '',
                    roomName: '',
                    city: '',
                    community: '',
                    subCommunity: '',
                    address: '',
                    buildingName: '',
                    appointmentMeetPlace: '',
                    appointmentDoorTime: '',
                    leaseType:'',
                    contacts:'',
                },
                rules:{
                    leaseType: [{required: true, message: `${this.$t("choose")}`,trigger: "change"}],
                    phoneNumber: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("contact")}`,trigger: "blur"}],
                    housingTypeDictcode: [{required: true, message: `${this.$t("choose")} ${this.$t("HousingTypes")}`,trigger: "blur"}],
                    memberMobile: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("landlordTelephone")}`,trigger: "blur"}],
                    roomName: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("HouseNumber")}`,trigger: "blur"}],
                    city: [{required: true, message: `${this.$t("choose")} ${this.$t("housingArea")}`,trigger: "blur"}],
                    address: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("address")}`,trigger: "blur"}],
                    buildingName: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("BuildingName")}`,trigger: "blur"}],
                    appointmentMeetPlace: [{required: true, message: `${this.$t("PleaseEnter")} ${this.$t("MeetingSpot")}`,trigger: "blur"}],
                    appointmentDoorTime: [ {required: true,message: `${this.$t("choose")} ${this.$t("MeetingTime")}`,trigger: "change"}],
                    contacts: [ {required: true,message: `${this.$t("PleaseEnter")} ${this.$t("contact")}`,trigger: "blur"}],
                }
            }
        },
        mounted(){
            this.loadHouse();
            if(this.$route.query.memberMobile){
               this.house.memberId =  this.$route.query.memberId;
               this.house.memberMobile = this.$route.query.memberMobile;  
            }else{
               this.editHouse();
            }
        },
        methods: {

            submit(formName) {// 提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.applyHouse();
                    } else {
                        this.$message.warning("Please complete the information!");
                        return false;
                    }
                });
            },
            async applyHouse(){
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
               
                // this.$axios.post('/api/pc/add/owner/apply', this.$qs.stringify(this.house))
                //     .then(res => {
                //         this.$message({ type: 'success', message: res.message });
                //         this.$router.push({ name: 'houseUpLoad' });
                //     }).catch(err => {
                //         this.$message.error(err.message)
                //     }).finally(() =>
                //         this.$nextTick(() => {
                //             loadingInstance.close();
                //         }));

                try {
                    // 先保存信息
                    let res = await this.$axios.post('/api/pc/add/owner/apply',this.$qs.stringify(this.house));
                    // console.log(res,'await')
                    if(!this.$route.query.memberMobile){
                        //重新加载
                        this.loadHouse();
                        //审核通过
                        res = await this.$axios.post('/api/pc/house/apply/check', this.$qs.stringify({ applyId: this.house.applyId, isCheck: 2, remarks: '' }));
                        this.$message({ type: 'success', message: res.message });
                        this.$router.push({ name: 'houseaudit' });
                    }else{
                        this.$message({ type: 'success', message: res.message });
                        this.$router.push({ name: 'houseUpLoad' });
                    }
                } catch (err) {
                    this.$message.error(err.message);
                } finally {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    })
                }

            },
            loadHouse(){
            //  console.log('query参数:', this.$route.query);
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                let houseTypeMapPro = this.$axios.post('/api/pc/dict/get/1');
                let citiesPro = this.$axios.post('/api/pc/support/cities');
                this.$axios.all([houseTypeMapPro, citiesPro])
                    .then(res => {
                        // this.houseTypeMap = res[0].dataSet.items || [];//房屋类型;

                        this.cities = res[1].dataSet || [];//城市、社区，子社区联动数据

                        let arr = res[0].dataSet.items;
                        if( arr && arr!=0){
                            arr.forEach(ele=>{
                                this.houseTypeMap[ele.standby1].sub.push(ele);//房屋类型;
                            })
                        }
                    })
                    .catch(err => this.$message.error(err.message))
                    .finally(() =>
                        this.$nextTick(() => {
                            loadingInstance.close();
                        }));
            },
            // 初审编辑时调用  - 获取详情
            editHouse(){
                this.$axios.post(`/api/pc/owner/apply/detail/${this.$route.query.id}`)
                    .then(res => {
                        this.house.applyId = res.dataSet.housingApplication.id;
                        this.house.phoneNumber = res.dataSet.housingApplication.phoneNumber;
                        this.house.memberId = res.dataSet.housingApplication.memberId;
                        this.house.memberMobile = res.dataSet.housingApplication.memberMobile;
                        this.house.housingTypeDictcode = res.dataSet.housingApplication.housingTypeDictcode;
                        this.house.city = res.dataSet.housingApplication.city;
                        this.house.community = res.dataSet.housingApplication.community;
                        this.house.subCommunity = res.dataSet.housingApplication.subCommunity;
                        this.house.address = res.dataSet.housingApplication.address;
                        this.house.roomName = res.dataSet.housingApplication.roomName;
                        this.house.buildingName = res.dataSet.housingApplication.buildingName;
                        this.house.appointmentMeetPlace = res.dataSet.housingApplication.appointmentMeetPlace;
                        this.house.appointmentDoorTime = res.dataSet.housingApplication.appointmentDoorTime;
                        this.house.leaseType = res.dataSet.housingApplication.leaseType;
                        this.house.contacts = res.dataSet.housingApplication.contacts; 
                        this.city=[this.house.city,this.house.community,this.house.subCommunity];//房源区域回显
                        this.housingTypeDictcode = [res.dataSet.housingApplication.standby1,res.dataSet.housingApplication.housingTypeDictcode];//商用，非商用的区别
                       
                    }).catch(err => {
                        this.$message.error(err.message)
                    });
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
                        this.$set(this.house,'appointmentDoorTime','');
                        //housingApplication.appointmentDoorTime   
                    }
                }else if( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000) { //如果是最后一天,所选择的时间不能超过当前时分秒
                    if( selectTimeStr > nowTimeStr ){
                        this.$refs.datePicker.showPicker();
                        this.$message.error('Not more than 48 hours! Please reselect'); 
                        this.$set(this.house,'appointmentDoorTime','');     
                    }
                }  
            }            
            

        },

        watch: {
            city(newValue, oldValue) {
                this.$set(this.house, 'city', newValue[0]);
                this.$set(this.house, 'community', newValue[1]);
                this.$set(this.house, 'subCommunity', newValue[2]);
            },
            housingTypeDictcode(val){
                this.$set(this.house, 'housingTypeDictcode', val[1]);
                // console.log(this.house.housingTypeDictcode)
            }
        }
    }
</script>
<style scoped lang="less">
    .outside-upload {
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
                /* padding-left: 70px; */
                padding: 0 30px;
            }
        }
        .d_flex{
            flex-wrap: wrap;
            .el-form-item{
                width: 48%;
                .el-input{
                    width: 300px!important;
                }
            }
        }
    }
</style>