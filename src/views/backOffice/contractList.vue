<template>
    <div class="finance_page transaction_list">
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model.trim="searchVal.orderCode" :placeholder="$t('PleaseEnterOrder')"  @change="searchOrder()">
                    <el-button slot="append" icon="el-icon-search"  @click="searchOrder()"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

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
                    <img class="float-left" v-lazy="scope.row.houseMainImg" alt="">
                    <div class="float-left order-detail">
                        <span class="color-primary">Order number: {{scope.row.orderCode}}</span> 
                        <br>
                        <span> <img class="map_pic" src="../../assets/images/map.png" alt=""> {{scope.row.houseArea}}</span>
                        <i v-if="scope.row.orderType==0" class="label bg-primary">{{$t('Rent')}}</i>
                        <i v-if="scope.row.orderType==1" class="label bg-orange">{{$t('Sale')}}</i>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="ownerMobile" :label="$t('landlordTelephone')" header-align="center"  align="center">
               
            </el-table-column>

            <el-table-column prop="applicationTime" :label="$t('applyTime')" header-align="center" align="center">
                
            </el-table-column>

            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center" >
                <template slot-scope="scope">
                    <!-- <router-link v-if="scope.row.orderType==0" :to="{name:'back_contractDetail_rent',query:{'id':scope.row.id}}">edit</router-link>
                    <router-link v-if="scope.row.orderType==1" :to="{name:'back_contractDetail_sale',query:{'id':scope.row.id}}">edit</router-link> -->
                    <a href="javascript:;" @click="view(scope.row)">edit</a>    
                    <a class="ml-10" v-if="scope.row.standby2!=''" :href="scope.row.standby2" target="blank">preview</a>
                </template>
            </el-table-column>

        </el-table>

        <!-- 翻页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchVal.pageIndex*1"
                      :page-sizes="[10, 20, 30, 50]" :page-size="searchVal.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                      :total="searchVal.total">
        </el-pagination> 

    </div>
</template>

<script>
export default {
    data(){
        return{
            table_loading:true,
            searchVal:{
                orderCode:null,
                orderType:null,
                pageIndex:1,
                pageSize:10,
                total:100,
                orderStatus:'2,3,4,5',//固定传值
                tradingStatus :0
            },
            tableData:[],
        }
    },
    created(){

    },
    mounted(){
        this.queryContractList()
    },
    methods:{
        // 请求列表
        queryContractList(){
            this.$axios
                .post("/api/pc/contract/list",
                this.$qs.stringify(this.searchVal)
                )
                .then(res => {
                    this.table_loading = false;
                    if(res.dataSet!==null){
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
            this.queryContractList();
        },
        defaultData(){  //默认排序，清除查询条件
            this.table_loading = true;
            this.searchVal = {
                orderCode:null,
                orderType:null,
                pageIndex:1,
                pageSize:10,
                total:100,
                payWay:null
            }
            this.queryContractList();
        },
        view(item){
            // console.log(item.standby2)
            if(item.standby2!=''){
                this.$confirm(this.$t('Thecontractisexisting'), this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    if(item.orderType==0){
                        this.$router.push({name:'back_contractDetail_rent',query:{'id':item.id,'isDelivery':1}})
                    }else if(item.orderType==1 ){
                        this.$router.push({name:'back_contractDetail_sale',query:{'id':item.id,'isDelivery':1}})
                    }        
                }).catch(() => {});            
            }else{
                if(item.orderType==0){
                    this.$router.push({name:'back_contractDetail_rent',query:{'id':item.id}})
                }else if(item.orderType==1 ){
                    this.$router.push({name:'back_contractDetail_sale',query:{'id':item.id}})
                }
            }
        },
        // 翻页
        handleSizeChange(val){
            this.table_loading = true;
            this.searchVal.pageSize = val;
            this.queryContractList();
        },
        handleCurrentChange(val){
            this.table_loading = true;
            this.searchVal.pageIndex = val;
            this.queryContractList();
        }
    }
}
</script>


