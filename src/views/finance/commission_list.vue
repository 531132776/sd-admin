<template>
    <div class="finance_page transaction_list">
        <el-input v-model="searchVal.keyword" :placeholder="$t('PleaseEnterOrder')" style="width:380px;" class="mb-15" @change="searchOrder">
            <el-button slot="append" icon="el-icon-search"  @click="searchOrder()"></el-button>
        </el-input>
        <!-- 筛选条件 -->
        <div class="mb-10">
            <el-button type="success" class="mr-10" @click="defaultData">Default sort</el-button>
            <el-select v-model="searchVal.orderType" @change="changeType" :placeholder="$t('choose')" style="width:100px;"  class="mr-10">
                <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]" :key="item.value"
                    :label="item.label" :value="item.value">
                </el-option>
            </el-select>           
        </div>

        <!-- 列表 -->
        <el-table class="tablelist_close" :fit="true"
                    :data="tableData"  
                    max-height="800"
                    :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
                    :row-style="{'backgroundColor':'#F7F7F7'}"
                    size="mini" 
                    v-loading="table_loading" 
                    element-loading-text="loading" 
                    element-loading-spinner="el-icon-loading" 
                    element-loading-background="rgba(0, 0, 0, 0.8)">

            <el-table-column prop="orderCode" :label="$t('info')" header-align="center" width="500" align="center">
                <template slot-scope="scope">
                    <img class="float-left" v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
                    <div class="float-left order-detail">
                        <span class="color-primary">Order number: {{scope.row.orderCode}}</span> 
                        <br>
                        <span><img class="map_pic" src="../../assets/images/map.png" alt="">
                        {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}</span>
                        <i v-if="scope.row.orderType==0" class="label bg-primary">{{$t('Rent')}}</i>
                        <i v-if="scope.row.orderType==1" class="label bg-orange">{{$t('Sale')}}</i>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="orderStatus" :label="$t('OrderStatus')" header-align="center" align="center" >
                <template slot-scope="scope">
                    <i v-if="scope.row.tradingStatus==0">{{$t('tradingIn')}}</i>
                    <i v-if="scope.row.tradingStatus==1">{{$t('successfulDeal')}}</i>
                    <i v-if="scope.row.tradingStatus==2">{{$t('TransactionFailure')}}</i>
                </template>
            </el-table-column>

            <el-table-column prop="createTime" :label="$t('createTime')" header-align="center"  align="center">
            </el-table-column>

            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center" width="230">
                <template slot-scope="scope">
                    <router-link :to="{name:'commissionDetail',params:{'id':scope.row.commissionId}}">{{$t('view')}}</router-link>
                </template>
            </el-table-column>

        </el-table>

        <!-- 翻页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchVal.pageIndex*1"
                      :page-sizes="[10, 20, 30, 50]" :page-size="searchVal.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                      :total="searchVal.total">
        </el-pagination> 

        <!-- 导出 -->        
        <a :href="'/api/pc/order/commission/export?orderType='+searchVal.orderType" download class="button bg-primary mt-20 h-center export-button">{{$t('derivedForm')}}</a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            orderTypeSelect:[
                {value:0,label:this.$t('Rent')},
                {value:1,label:this.$t('Sale')},
                {value:null,label:this.$t('all')}
            ],
            table_loading:true,
            searchVal:{
                orderType:null,
                pageIndex:1,
                pageSize:10,
                total:100,
                keyword:''
            },
            tableData:[]
        }
    },
    computed:{},
    created(){

    },
    mounted(){
        this.queryCommissionList()
    },
    methods:{
        // 请求列表
        queryCommissionList(){
            this.$axios
                .post("/api/pc/final/commission/list",
                this.$qs.stringify(this.searchVal)
                )
                .then(res => {
                    this.table_loading = false;
                    if(res.dataSet!==null && res.dataSet.length !==0){
                        this.tableData = res.dataSet;
                        this.searchVal.pageIndex = res.pageInfo.pageNum;
                        this.searchVal.pageSize = res.pageInfo.pageSize;
                        this.searchVal.total = res.pageInfo.total;
                    }else{
                        this.tableData = [];
                        this.searchVal.pageIndex = 1;
                        this.searchVal.pageSize = 10;   
                        this.searchVal.total = 0;                     
                    }
                })
                .catch(err => this.$message.error(err.message));            
        },
        searchOrder(){ //按照订单编号搜索
            this.table_loading = true;
            this.queryCommissionList();
        },
        changeType(val){  //下拉选择出租/出售
            this.table_loading = true;
            this.searchVal.orderType = val;
            this.queryCommissionList();
        }, 
        defaultData(){  //默认排序，清除查询条件
            this.table_loading = true;
            this.searchVal = {
                orderType:null,
                pageIndex:1,
                pageSize:10,
                total:100,
                keyword:''
            }
            this.queryCommissionList();
        },        
        // 翻页
        handleSizeChange(val){
            this.table_loading = true;
            this.searchVal.pageSize = val;
            this.queryCommissionList();
        },
        handleCurrentChange(val){
            this.table_loading = true;
            this.searchVal.pageIndex = val;
            this.queryCommissionList();
        }
    }
}
</script>


