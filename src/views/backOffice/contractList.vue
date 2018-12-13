<template>
    <div class="finance_page transaction_list">
        <el-select class="mr-5" v-model="searchVal.orderType" @change="changeType" :placeholder="$t('PleaseSelect')" >
            <el-option v-for="item in [{value:0,label:$t('Rent')},{value:1,label:$t('Sale')},{value:null,label:$t('all')}]" :key="item.value"
                            :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <el-input class="mb-10" style="width:350px;" v-model.trim="searchVal.orderCode" :placeholder="$t('PleaseEnterOrder')"  @change="searchOrder">
            <el-button slot="append" icon="el-icon-search"  @click="searchOrder()"></el-button>
        </el-input>

        <!-- 列表 -->
        <el-table class="tablelist_close" :fit="true"
                    :data="tableData"  
                    max-height="600"
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
                    <a href="javascript:;" @click="view(scope.row)">{{$t('edit')}}</a>    
                    <a class="ml-10" v-if="scope.row.contractId && $route.params.type ==1" :href="scope.row.standby2" target="blank" :style="{'color':'#333333'}">{{$t('preview')}}</a>
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
                orderStatus: this.$route.params.type ==0? -2:'2,3,4,5',//固定传值
                tradingStatus :0
            },
            tableData:[],
        }
    },
    created(){
        console.log( this.$route.params.type ==0)
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
                .catch(err => this.$message.error(err.message)).finally(() => this.table_loading = false);;            
        },
        searchOrder(){ //按照订单编号搜索
            this.table_loading = true;
            this.queryContractList();
        },
        changeType() {//切换出租-出售
            this.loading=true;
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
            if(item.contractId&&this.$route.params.type==1){
                this.$confirm(this.$t('Thecontractisexisting'), this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    if(item.orderType==0){
                        this.$router.push(
                            {name:'back_contractDetail_rent',
                            query:{
                            'id':item.id,'isDelivery':1,
                            type:this.$route.params.type,
                            contractId:item.contractId?item.contractId:"",
                            orderType:item.orderType
                            }
                            })
                    }else if(item.orderType==1 ){
                        this.$router.push(
                            {name:'back_contractDetail_sale',
                            query:{
                                'id':item.id,'isDelivery':1,
                                type:this.$route.params.type,
                                contractId:item.contractId?item.contractId:"",
                                orderType:item.orderType
                                }
                            })
                    }        
                }).catch(() => {});            
            }else{
                if(item.orderType==0){
                    this.$router.push({
                        name:'back_contractDetail_rent',
                        query:{
                            'id':item.id,type:this.$route.params.type,
                            contractId:item.contractId?item.contractId:"",
                            orderType:item.orderType
                            }})
                }else if(item.orderType==1 ){
                    this.$router.push({
                        name:'back_contractDetail_sale',
                        query:{
                            'id':item.id,type:this.$route.params.type,
                            contractId:item.contractId?item.contractId:"",
                            orderType:item.orderType
                            }})
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


