<template>
    <div class="withdraw-detail">
        <el-row :gutter="10">
            <el-col :span="8"><span>applyType:</span><span>{{detail.house.applyType}}</span></el-col>
            <el-col :span="8"><span>masterDevelpoerName:</span><span>{{detail.house.masterDevelpoerName}}</span></el-col>
            <el-col :span="8"><span>advertTime:</span><span>{{detail.house.advertTime}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>houseStatus:</span><span>{{detail.house.houseStatus}}</span></el-col>
            <el-col :span="8"><span>instagram:</span><span>{{detail.house.instagram}}</span></el-col>
            <el-col :span="8"><span>rentCustomerPhone:</span><span>{{detail.house.rentCustomerPhone}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>applyId:</span><span>{{detail.house.applyId}}</span></el-col>
            <el-col :span="8"><span>shareCount:</span><span>{{detail.house.shareCount}}</span></el-col>
            <el-col :span="8"><span>housingTypeDictcode:</span><span>{{detail.house.housingTypeDictcode}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>negotiatedCount:</span><span>{{detail.house.negotiatedCount}}</span></el-col>
            <el-col :span="8"><span>twitter:</span><span>{{detail.house.twitter}}</span></el-col>
            <el-col :span="8"><span>houseAcreage:</span><span>{{detail.house.houseAcreage}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>beginRentDate:</span><span>{{detail.house.beginRentDate}}</span></el-col>
            <el-col :span="8"><span>lookHouseCount:</span><span>{{detail.house.lookHouseCount}}</span></el-col>
            <el-col :span="8"><span>beReportedCount:</span><span>{{detail.house.beReportedCount}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>community:</span><span>{{detail.house.community}}</span></el-col>
            <el-col :span="8"><span>parkingSpace:</span><span>{{detail.house.parkingSpace}}</span></el-col>
            <el-col :span="8"><span>roomName:</span><span>{{detail.house.roomName}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>subCommunity:</span><span>{{detail.house.subCommunity}}</span></el-col>
            <!-- <el-col :span="8"><span>houseConfigDictcode:</span><span>{{detail.house.houseConfigDictcode}}</span></el-col> -->
            <el-col :span="8"><span>houseSelfContainedDictcode:</span><span>{{detail.house.houseSelfContainedDictcode}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>houseMainImg:</span><span>{{detail.house.houseMainImg}}</span></el-col>
            <el-col :span="8"><span>buildingName:</span><span>{{detail.house.buildingName}}</span></el-col>
            <el-col :span="8"><span>expireTime:</span><span>{{detail.house.expireTime}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>phoneNumber:</span><span>{{detail.house.phoneNumber}}</span></el-col>
            <el-col :span="8"><span>titleDeedNumber:</span><span>{{detail.house.titleDeedNumber}}</span></el-col>
            <el-col :span="8"><span>isPromissoryBuild:</span><span>{{detail.house.isPromissoryBuild}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>expectBargainHouseDate:</span><span>{{detail.house.expectBargainHouseDate}}</span></el-col>
            <el-col :span="8"><span>plotNumber:</span><span>{{detail.house.plotNumber}}</span></el-col>
            <el-col :span="8"><span>memberMobile:</span><span>{{detail.house.memberMobile}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>isFavorite:</span><span>{{detail.house.isFavorite}}</span></el-col>
            <el-col :span="8"><span>rentCustomerName:</span><span>{{detail.house.rentCustomerName}}</span></el-col>
            <el-col :span="8"><span>housingStatus:</span><span>{{detail.house.housingStatus}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>bathroomNum:</span><span>{{detail.house.bathroomNum}}</span></el-col>
            <el-col :span="8"><span>payNode:</span><span>{{detail.house.payNode}}</span></el-col>
            <el-col :span="8"><span>city:</span><span>{{detail.house.city}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>houseDecorationDictcode:</span><span>{{detail.house.houseDecorationDictcode}}</span></el-col>
            <el-col :span="8"><span>minHouseRent:</span><span>{{detail.house.minHouseRent}}</span></el-col>
            <el-col :span="8"><span>villageName:</span><span>{{detail.house.villageName}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>isLock:</span><span>{{detail.house.isLock}}</span></el-col>
            <el-col :span="8"><span>houseName:</span><span>{{detail.house.houseName}}</span></el-col>
            <el-col :span="8"><span>leaseType:</span><span>{{detail.house.leaseType}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>applicantType:</span><span>{{detail.house.applicantType}}</span></el-col>
            <el-col :span="8"><span>typeOfArea:</span><span>{{detail.house.typeOfArea}}</span></el-col>
            <el-col :span="8"><span>bedroomNum:</span><span>{{detail.house.bedroomNum}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>email:</span><span>{{detail.house.email}}</span></el-col>
            <el-col :span="8"><span>address:</span><span>{{detail.house.address}}</span></el-col>
            <el-col :span="8"><span>houseRent:</span><span>{{detail.house.houseRent}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>appointmentLookTime:</span><span>{{detail.house.appointmentLookTime}}</span></el-col>
            <el-col :span="8"><span>facebook:</span><span>{{detail.house.facebook}}</span></el-col>
            <el-col :span="8"><span>houseUnitNo:</span><span>{{detail.house.houseUnitNo}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>haveKey:</span><span>{{detail.house.haveKey}}</span></el-col>
            <el-col :span="8"><span>startRentDate:</span><span>{{detail.house.startRentDate}}</span></el-col>
            <el-col :span="8"><span>isHouseLoan:</span><span>{{detail.house.isHouseLoan}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>houseFloor:</span><span>{{detail.house.houseFloor}}</span></el-col>
            <el-col :span="8"><span>isCheck:</span><span>{{detail.house.isCheck}}</span></el-col>
            <el-col :span="8"><span>isCustomerServiceRelation:</span><span>{{detail.house.isCustomerServiceRelation}}</span></el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8"><span>contacts:</span><span>{{detail.house.contacts}}</span></el-col>
            <el-col :span="8"><span>propertyNumber:</span><span>{{detail.house.propertyNumber}}</span></el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-button type="success" @click="checkVisible=true;valid=true">{{$t('obtained')}}</el-button>
        </el-row>
        <!-- 下架对话框 -->
        <el-dialog :title="$t('prompt')" :visible.sync="checkVisible" width="30%">
            <el-form label-width="80px">
                <el-form-item>
                    <span slot="label">{{$t('city')}}</span>
                    <el-select v-model="PhoneValid.areaCode" :placeholder="$t('choose')">
                        <el-option v-for="item in cityList" :key="item.id" :label="item.region_name_en" :value="item.regionCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('mobile')}}</span>
                    <el-input v-model.trim="PhoneValid.mobile" style="width:216px;margin-right:10px;" :placeholder="$t('telephone')"></el-input>
                    <el-button type="success" @click="getValidCode">send{{$t('VerificationCode')}}</el-button>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('VerificationCode')}}:</span>
                    <el-input v-model="PhoneValid.validateCode" style="width:216px;" :placeholder="$t('VerificationCode')"></el-input>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('note')}}:</span>
                    <el-input v-model="remark" type="textarea" resize="none"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="checkUser" type="info">{{$t('Verify')}}</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="confirm" :disabled="valid">
                    <span v-if="valid">{{$t('pleaseVerify')}}</span>
                    <span v-else>{{$t('confirm')}}</span>
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'withdrawDetail',
        props: ['id'],
        data() {
            return {
                checkVisible: false,
                detail: {
                    house: {
                    },
                    houseCredentials: {
                    }
                },
                PhoneValid: {
                    mobile: null,
                    areaCode: "",
                    validateCode: '',//后台写死
                    isTest: 'aaa',//测试使用,不用输入验证码
                },
                valid: true,
                remark: '',
                cityList: []// 城市列表
            }
        },
        methods: {
            loadDetail() {
                this.$axios.post(`/api/pc/house/detail/${this.$props.id}`)
                    .then(res => {
                        this.detail = res.dataSet;
                    });
            },
            getValidCode() {
                //获取手机验证码
                this.$axios.post('/api/pc/send/sms/code', this.$qs.stringify({ mobile: this.PhoneValid.mobile }))
                    .then(res => {
                        this.$message({ type: "success", message: res.message })
                    }).catch(err => this.$message.error(err.message))
            },
            checkUser() {//验证是否新用户
                this.$axios.post('/api/pc/member/isNewUser', this.$qs.stringify(this.PhoneValid))
                    .then(res => {
                        this.$message({ type: 'success', message: res.message });
                        this.valid = false;
                    }).catch(err => {
                        this.$message.error(err.message);
                    });
            },
            confirm() {
                this.checkVisible = false;
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/house/obtained', this.$qs.stringify({ id: this.$props.id, remark: this.remark }))
                    .then(res => {
                        this.$message({ type: 'success', message: res.message });
                    })
                    .catch(err => {
                        this.$message.error(err.message);
                    }).finally(() => this.$nextTick(() => {
                        loadingInstance.close();
                    }))

            }
        },
        beforeMount() {
            this.loadDetail();
            //获取城市列表
            this.$axios.post('/api/pc/city/code')
                .then(res => this.cityList = res.dataSet || [])
                .catch(err => this.$message.error(err.message));
        }
    }
</script>
<style scoped lang="less">
    .withdraw-detail {
        .el-row {
            margin: 30px 0;

            span:nth-child(2) {
                color: #85ce61;
                margin-left: 10px;
                font-size: 20px;
            }
        }
    }
</style>