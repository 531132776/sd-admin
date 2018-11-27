<template>
    <div class="online-sale">

        <div class="header">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="pagination.tradingStatus" @change="changeStatus" :placeholder="$t('choose')">
                        <el-option :label="$t('tradingIn')" :value="0"></el-option>
                        <el-option :label="$t('successfulDeal')" :value="1"></el-option>
                        <el-option :label="$t('TransactionFailure')" :value="2"></el-option>
                        <el-option :label="$t('all')" :value="null"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model.trim="pagination.orderCode" :placeholder="$t('search')" @change="search">
                        <el-button slot="append" icon="el-icon-search"  @click="search()"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="rentalList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" width="400">
                <template slot-scope="scope">
                    <div class="info">
                        <!-- <div class="credent">
                            <img :src="scope.row.houseHoldImg" alt="">
                        </div> -->
                        <div class="address">
                            <p class="code">{{$t('orderCode')}}:{{scope.row.orderCode}}</p>
                            <p class="detail-addr">
                                <i class="el-icon-location-outline" style="width:10px;height:13px;margin-right:4px;;"></i>
                                {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                            </p>
                        </div>
                        <div class="type">
                            <span class="lease-type" v-if="scope.row.leaseType===0">{{$t('Rent')}}</span>
                            <span class="sell-type" v-if="scope.row.leaseType===1">{{$t('Sale')}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="memberInfo.memberMoble" :label="$t('telephone')" header-align="center" align="center"
                width="177">
                <template slot-scope="scope">
                    <div class="phone">
                        <span>{{$t('buyer')}} :<i>{{scope.row.memberInfo.memberMoble}}</i></span>
                        <span>{{$t('landlord')}} :<i>{{scope.row.ownerInfo.memberMoble}}</i></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="tradingStatus" :label="$t('transactionStatus')" header-align="center" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.tradingStatus===1" class="status-success">{{$t('successfulDeal')}}</span>
                    <span v-if="scope.row.tradingStatus===2" class="status-fail">{{$t('TransactionFailure')}}</span>
                    <span v-if="scope.row.tradingStatus===0" class="status">{{$t('tradingIn')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('applyTime')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button @click="view(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'onlineSale',
        data() {
            return {
                loading: true,
                pagination: {
                    orderType: 1,
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    tradingStatus: null,//交易成功-失败
                    orderCode: null,
                    orderStatus:'0,1,2,3'
                },
                rentalList: []
            }
        },
        methods: {
            loadOnlineRentalList() {
                this.$axios.post('/api/pc/internal/order/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        // console.log(res);
                        this.rentalList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                        this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);
            },
            changeStatus() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadOnlineRentalList();

            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadOnlineRentalList();
            },
            view(row) {
                this.$router.push({ name: 'editProgress', params: { orderId: row.orderId } });
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadOnlineRentalList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadOnlineRentalList();

            },
        },
        beforeMount() {
            this.loadOnlineRentalList();
        }
    }
</script>
<style scoped lang="less">
    .online-sale {

        >.header {
            margin: 5px 0;
        }

        .info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 48px;

            // >.credent {
            //     width: 48px;
            //     height: 48px;
            //     border: 1px dashed #ccc;
            // }

            >.address {
                // width: 158px;
                height: 48px;
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

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
                    width: 32px;
                    height: 16px;
                    border-radius: 3px;
                    color: #FFFFFF;
                    background: rgba(0, 182, 96, 1);
                }

                /**出售*/
                >.sell-type {
                    width: 32px;
                    height: 16px;
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