<template>
    <div class="appoint">
        <div class="header">

            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="pagination.houseType" @change="changeHouseTypeStatus" :placeholder="$t('choose')">
                        <el-option :label="$t('Rent')" :value="0"></el-option>
                        <el-option :label="$t('Sale')" :value="1"></el-option>
                        <el-option :label="$t('all')" :value="null"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="pagination.applicationType" @change="changeStatus" :placeholder="$t('choose')">
                        <el-option :label="$t('getCustomerService')" value="2"></el-option>
                        <el-option :label="$t('contactTheTenant')" value="3"></el-option>
                        <el-option :label="$t('all')" :value="null"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="houseList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="600"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" min-width="500">
                <template slot-scope="scope">
                    <div class="info">
                        <div class="credent">
                            <img v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
                        </div>
                        <div class="address">
                            <p class="code">{{$t('UploadNumber')}}:{{scope.row.houseCode}}</p>
                            <p class="detail-addr">
                                <i class="el-icon-location-outline" style="width:10px;height:13px;margin-right:4px;;"></i>
                                {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                            </p>
                        </div>
                        <div class="type">
                            <span class="lease-type" v-if="scope.row.houseType===0">{{$t('Rent')}}</span>
                            <span class="sell-type" v-if="scope.row.houseType===1">{{$t('Sale')}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="memberInfo.memberMoble" :label="$t('telephone')" header-align="center" align="center"
                width="280">
                <template slot-scope="scope">
                    <div class="phone">
                        <span>{{$t('customer')}} :<i>{{scope.row.member.memberMoble}}</i></span>
                        <span>{{$t('landlord')}} :<i>{{scope.row.owner.memberMoble}}</i></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="applicationType" :label="$t('appointmentType')" header-align="center" align="center" width="260">
                <template slot-scope="scope">
                    <span v-if="scope.row.applicationType===2" class="status-success">{{$t('getCustomerService')}}</span>
                    <span v-if="scope.row.applicationType===3" class="status-fail">{{$t('contactTheTenant')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('applyTime')" header-align="center" align="center" width="260">
            </el-table-column>
            <el-table-column :label="$t('status')" header-align="center" align="center" width="220">
                <template slot-scope="scope">
                    <span v-if="scope.row.standby1" class="status-success">{{$t('haveToDealWith')}}</span>
                    <span v-else class="status-fail">{{$t('untreated')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="view(scope.row)" type="text" size="small" :disabled="scope.row.standby1 ? true : false">{{$t('edit')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog :title="$t('prompt')" :visible.sync="dialogVisible" width="60%">
            <el-form label-width="100px" class="d_flex flex_wrap">
                <el-form-item>
                    <span slot="label">{{$t('HouseNumber1')}}:</span>
                    <span >{{house.houseCode}}</span>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('HousingSourceAddress')}}:</span>
                    <span >{{house.city+house.community+house.subCommunity+house.address}}</span>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('customerCalls')}}:</span>
                    <span>{{house.member.memberMoble}}</span>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('customerName')}}:</span>
                    <span v-if="house.member.name">{{house.member.name}}</span>&nbsp;
                    <span v-if="house.member.familyName">{{house.member.familyName}}</span>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('landlordPhone')}}:</span>
                    <span>{{house.owner.memberMoble}}</span>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('landlordName')}}:</span>
                    <span v-if="house.owner.name">{{house.owner.name}}</span>&nbsp;
                    <span v-if="house.owner.familyName">{{house.owner.familyName}}</span>
                </el-form-item>
                <!-- 预约类型为租客 -->
                <template v-if="house.applicationType===3">
                    <el-form-item>
                            <span slot="label">{{$t('tenantsName')}}:</span>
                            {{house.rentCustomerName}}
                        </el-form-item>
                        <el-form-item>
                            <span slot="label">{{$t('tenantsPhone')}}:</span>
                            {{house.rentCustomerPhone}}
                        </el-form-item>
                        <el-form-item>
                            <span slot="label">{{$t('MeetingTime')}}:</span>
                            <el-date-picker type="datetime" :placeholder="$t('PleaseSelect')"      value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="house.startApartmentTime" 
                                @change="getTESTtime" ref="datePicker" :picker-options="pickerOptions"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <span slot="label">{{$t('appointmentType')}}:</span>
                            <span v-if="house.applicationType===2">{{$t('getCustomerService')}}</span>
                            <span v-else>{{$t('contactTheTenant')}}</span>
                        </el-form-item>
                        <el-form-item>
                            <span slot="label">{{$t('note')}}:</span>
                            <el-input v-model="house.remark" type="textarea" resize="none"></el-input>
                        </el-form-item>
                </template>

                <!-- <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('MeetingSpot')}}:</span>
                            <el-input v-model="house.appointmentMeetPlace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="updateHouse">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'appoint',
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
                loading: true,
                dialogVisible: false,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    applicationType: null,
                    houseType: null
                },
                houseList: [],
                house: {
                    "rentCustomerName": "",
                    "applicationType": 2,
                    "city": "",
                    "remark": null,
                    "rentCustomerPhone": "",
                    "startApartmentTime": "",//要修改
                    "appointmentMeetPlace": '',
                    "member": {
                        "memberMoble": "",
                        "areaCode": "",
                        "familyName": null,
                        "name": null,
                        "memberId": null
                    },
                    "owner": {
                        "memberMoble": "",
                        "areaCode": "",
                        "familyName": null,
                        "name": null,
                        "memberId": null
                    },
                    "address": "",
                    "houseType": 0,
                    "community": "",
                    "subCommunity": "",
                    "createTime": "",
                    "houseCode": ""
                }
            }
        },
        methods: {
            loadHouseList() {
                this.$axios.post('/api/pc/look/house/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        // console.log(res);
                        this.houseList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                        this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);
            },
            changeStatus(val) {//客服联系-联系租客
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.applicationType = val;
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadHouseList();

            },
            changeHouseTypeStatus(val) {//出租-出售
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.houseType = val;
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadHouseList();

            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadHouseList();
            },
            view(row) {
                // this.$router.push({ name: 'editProgress', params: { orderId: row.orderId } });
                this.$axios.post(`/api/pc/look/house/detail/${row.id}`)
                    .then(res => {
                        this.dialogVisible = true;
                        this.house = res.dataSet;
                    })

            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadHouseList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadHouseList();

            },
            updateHouse() {//更新信息
                this.dialogVisible = false;
                this.$axios.post('/api/pc/look/house/update', this.$qs.stringify(this.house))
                    .then(res => {
                        this.$message({ type: 'success', message: res.message });
                        this.loadHouseList();
                    })
                    .catch(err => this.$message.error(err.message));

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
                        this.$set(this.house,'startApartmentTime','');
                        //house.startApartmentTime
                    }
                }else if( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000) { //如果是最后一天,所选择的时间不能超过当前时分秒
                
                    if( selectTimeStr > nowTimeStr ){
                        this.$refs.datePicker.showPicker();
                        this.$message.error('Not more than 48 hours! Please reselect'); 
                        this.$set(this.house,'startApartmentTime','');     
                    }
                }  
            }            
        },
        beforeMount() {
            this.loadHouseList();
        }
    }
</script>
<style scoped lang="less">
    .appoint {

        >.header {
            margin: 5px 0;
        }

        .info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 48px;

            >.credent {
                
                width: 48px;
                height: 48px;
                // border: 1px dashed #ccc;

                >img {
                    // width: 100%;
                    // height: 100%;
                }
            }

            >.address {
                /* width: 158px; */
                /* height: 48px; */
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 60%;

                >.code {
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #00B660;
                }

                >.detail-addr {
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: left;
                }

            }

            >.type {
                font-size: 10px;

                /**出租*/
                >.lease-type {
                    /* width: 32px; */
                    /* height: 16px; */
                    padding: 3px;
                    border-radius: 3px;
                    color: #FFFFFF;
                    background: rgba(0, 182, 96, 1);
                }

                /**出售*/
                >.sell-type {
                    /* width: 32px; */
                    /* height: 16px; */
                    padding: 3px;
                    border-radius: 3px;
                    color: #FFFFFF;
                    background-color: rgba(243, 151, 0, 1);
                }
            }
        }

        .phone {
            display: flex;
            flex-direction: column;
            justify-content: left;
            height: 100%;

            /* border-left:1px solid #E5E5E5;
                    border-right:1px solid #E5E5E5; */
            >span {
                color: #666666;
                font-size: 12px;

                /* padding: 8px 0; */
                >i {
                    color: #007AFF;
                }
            }

            >span:nth-child(1) {
                border-bottom: 1px solid #E5E5E5;
            }
        }

        >.page {
            text-align: right;
            padding: 10px 0;
        }
    }
</style>