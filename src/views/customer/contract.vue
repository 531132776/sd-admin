<!--合同列表-->
<template>
    <div class="contract">
        <div class="header d_flex flex_wrap20">

                    <el-select v-model="pagination.orderType" @change="changeType" :placeholder="$t('PleaseSelect')" >
                        <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]" :key="item.value"
                            :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <el-input v-model="pagination.orderCode" :placeholder="$t('orderCode')" @change="searchContract">
                        <el-button slot="append" icon="el-icon-search"  @click="searchContract()"></el-button>
                    </el-input>

        </div>
        <div class="body">
            <el-table :data="contractList" max-height="500" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
                :row-style="{'backgroundColor':'#F7F7F7'}" size="mini" v-loading="loading" element-loading-text="loading"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column prop="date" :label="$t('info')" header-align="center" align="center" width="400">
                    <template slot-scope="scope">
                        <div class="order-detail">
                        {{$t('orderCode')}}:{{scope.row.orderCode}}
                        <i v-if="scope.row.orderType==0" class="label bg-primary">{{$t('Rent')}}</i>
                        <i v-if="scope.row.orderType==1" class="label bg-orange">{{$t('Sale')}}</i>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column prop="ownerMobile" :label="$t('landlordTelephone')" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="applicationTime" :label="$t('applyTime')" header-align="center" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.applicationTime || scope.row.createTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button @click="view(scope.row)" type="text" size="small">view</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        name: "contract",
        props: {
            msg: String
        },
        data() {
            return {
                loading: true,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    orderType: null,//出租-出售
                    orderCode: null,//订单编号
                    orderStatus:-2,//固定传值
                },
                contractList: []
            };
        },
        methods: {
            reloadContractList() {
                this.$axios.post('/api/pc/contract/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        // console.log(res);
                        this.contractList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo?res.pageInfo.pageNum:1;
                        this.pagination.pageSize = res.pageInfo?res.pageInfo.pageSize:10;
                        this.pagination.total = res.pageInfo?res.pageInfo.total:0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);

            },
            changeType() {//切换出租-出售
                this.loading=true;
                this.reloadContractList();
            },
            searchContract() {//输入框搜索
                this.loading=true;
                this.reloadContractList();
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.reloadContractList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.reloadContractList();
            },
            view(row) {//合同详情
                // console.log('投诉id：', row);
                if(row.orderType==0){ //租房
                    this.$router.push({name:'contractDetail_rent',params:{id:row.id}});
                }else if( row.orderType==1 ){ //出售
                    this.$router.push({name:'contractDetail_sale',params:{id:row.id}});
                }
                
            }
        },
        beforeMount() {
            this.reloadContractList();
        }
    };
</script>
<style scoped lang="less">
    .contract {
        >.header {
            margin: 5px 0;
        }

        >.body {
            .order-detail{
                width: 100%
            }
        }

        >.page {
            text-align: right;
            padding: 10px 0;
        }
    }
</style>