<template>
    <div class="refund-approval">
        <div>
            <el-input v-model.trim="pagination.orderCode" :placeholder="$t('search')" @change="search" :style="{width: '380px'}">
                <el-button slot="append" icon="el-icon-search"  @click="search()"></el-button>
            </el-input>
        </div>
        <div class="header d_flex flex_wrap20">
            <el-button type="success" class="mr-10" @click="defaultData">{{$t('Defaultsort')}}</el-button>
            <el-select v-model="pagination.orderType" @change="changeStatus" :placeholder="$t('choose')">
                <el-option :label="$t('Rent')" :value="0"></el-option>
                <el-option :label="$t('Sale')" :value="1"></el-option>
                <el-option :label="$t('all')" :value="null"></el-option>
            </el-select>
                    
        </div>
        <el-table :data="refundApprovalList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="600"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" width="600">
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
                            <span class="lease-type" v-if="scope.row.leaseType===0">{{$t('Rent')}}</span>
                            <span class="sell-type" v-if="scope.row.leaseType===1">{{$t('Sale')}}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="memberInfo.memberMoble" :label="$t('telephone')" header-align="center" align="center"
                width="220">
                <template slot-scope="scope">
                    <div class="phone">
                        <span>{{$t('tenants')}} :<i>{{scope.row.memberInfo.memberMoble}}</i></span>
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
        name: 'refundApproval',
        data() {
            return {
                loading: true,
                pagination: {
                    orderType: null,
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    orderCode: null
                },
                refundApprovalList: []
            }
        },
        methods: {
            loadRefundApprovalListList() {//改为退款审批的接口 
                this.$axios.post('/api/pc/refund/review/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        // console.log(res);
                        this.refundApprovalList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                        this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);
            },
            defaultData(){ //默认排序，清除查询条件
                this.loading = true;
                this.pagination = {
                    orderType: null,
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    orderCode: null
                };
                this.loadRefundApprovalListList();
            },
            changeStatus() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadRefundApprovalListList();

            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadRefundApprovalListList();
            },
            view(row) {
                this.$router.push({ name: 'refundApprovalEdit', params: { refundId: row.refundId } });
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadRefundApprovalListList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadRefundApprovalListList();

            },
        },
        beforeMount() {
            this.loadRefundApprovalListList();
        }
    }
</script>
<style scoped lang="less">
    .refund-approval {

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
            }

            >.address {
                /* // width: 158px; */
                /* height: 48px; */
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