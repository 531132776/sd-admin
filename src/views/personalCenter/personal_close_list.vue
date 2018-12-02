<template>
    <div class="personal_center inner_closelist">
                <userInfo></userInfo>
                <!-- <el-tabs v-model="activeName">
                    <el-tab-pane label="关单记录" name="first"> -->
                        
                        
                <p class="title">{{$t('closerecord')}}</p>

                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <template v-if="moduleType==0">
                        <el-tab-pane :label="$t('complaints')" name="first"></el-tab-pane>
                        <el-tab-pane :label="$t('feedback')" name="second"></el-tab-pane> 
                    </template>
                    <template v-else-if="moduleType==1">
                        <el-tab-pane :label="`${$t('Commissioningrecord')}${$t('closerecord')}`" name="first"></el-tab-pane>
                        <el-tab-pane :label="`${$t('doRefund')}${$t('closerecord')}`" name="second"></el-tab-pane>
                    </template>
                    <template v-else>
                        <el-tab-pane :label="`${$t('TradingOrder')}${$t('closerecord')}`" name="first"></el-tab-pane>
                        <el-tab-pane :label="`${$t('doRefund')}${$t('closerecord')}`" name="second"></el-tab-pane>
                    </template>
                    
                </el-tabs>  

                <template v-if="moduleType==0 &&searchVal.type==0　|| moduleType==1 || moduleType==2">
                    <el-button type="success" @click="refreshList(null)">Default sort</el-button>
                    <el-button  class="mr-10" @click="refreshList(0)">{{$t('Rent')}}</el-button>
                    <el-button  class="mr-10" @click="refreshList(1)">{{$t('Sale')}}</el-button>                     
                </template>
                <el-table class="tablelist_close" :fit="true"
                    :data="tableData"  
                    max-height="500"
                    :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
                    :row-style="{'backgroundColor':'#F7F7F7'}"
                    size="mini" 
                    v-loading="table_loading" 
                    element-loading-text="loading" 
                    element-loading-spinner="el-icon-loading" 
                    element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column prop="orderCode" :label="$t('info')" header-align="center" align="center" width="400">
                        <template slot-scope="scope">
                            <template v-if="searchVal.type==0">
                                <img v-lazy="scope.row.houseMainImg" alt="" :key="scope.row.houseMainImg">
                                <div class="float-left order_detail">
                                    <span>{{$t('orderCode')}}：{{scope.row.orderCode}}</span>
                                    <br>
                                    <span><img class="map_pic" src="../../assets/images/map.png" alt="">
                                    {{scope.row.city}}{{scope.row.community}}{{scope.row.subCommunity}}{{scope.row.address}}
                                    </span>
                                    <i v-if="scope.row.orderType==0" class="rent">{{$t('Rent')}}</i>
                                    <i v-if="scope.row.orderType==1" class="sale">{{$t('Sale')}}</i>
                                </div>                                
                            </template>
                            <template v-if="searchVal.type==1">
                                <div>
                                    {{$t('feedbackNumber')}}：{{scope.row.feedbackCode}}
                                </div>
                            </template>

                            
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" :label="$t('telephone')" header-align="center" align="center">
                        <template slot-scope="scope">
                            <span v-if="moduleType==0 || moduleType==1">{{scope.row.mobile}}</span>
                            <span v-if="moduleType==2">{{scope.row.memberMobile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" :label="$t('applyTime')" header-align="center" align="center">
                    </el-table-column>
                    <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center" width="180">
                        <template slot-scope="scope">
                            <template v-if="moduleType==0">
                                <el-button @click="view(scope.row.id)" type="text" size="small">view</el-button>
                            </template>
                            <template v-else>
                                <el-button @click="view(scope.row.orderId)" type="text" size="small">view</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>   

                <div class="page">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchVal.pageIndex*1"
                      :page-sizes="[10, 20, 30, 50]" :page-size="searchVal.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                      :total="searchVal.total">
                  </el-pagination>
                </div>   
                <!-- </el-tab-pane>
                </el-tabs>       -->

    </div>
</template>

<script>
import userInfo from './userInfo.vue';
export default {
    name:'close-list',
    components:{
        userInfo
    },
    data(){
        return {
            tableData: [],
            table_loading: true,
            searchVal: {
                pageIndex: 1,
                pageSize: 10,
                complainCode: "",
                leaseType: "",
                orderType:'',
                type:0,
            },
            urlStr:"/api/pc/center/order/closes",
            activeName:'first',
            moduleType:null
        }

    },
    created(){
        this.moduleType = this.$route.params.type;
        sessionStorage.setItem('closeListType',this.$route.params.type);
    },
    mounted(){
        if( this.moduleType==0 ){ //PC-客服
            this.urlStr = "/api/pc/center/order/closes"
        }else if( this.moduleType==1 ){ //1 -pc财务
            if( this.searchVal.type==0){
                this.urlStr = "/api/pc/final/commission/close/list";//成单结佣
            }else{
                this.urlStr = "/api/pc/refund/close/list";//退款
            }
        }else if( this.moduleType==2 ){//2-pc内勤
            if(this.searchVal.type==0){
                this.urlStr = "/api/pc/internal/close/order/list";//交易单
            }else{
                this.urlStr = "/api/pc/refund/review/close/list"//退款
            }
            
        }
        this.getInterClose();
    },
    methods:{
            // 获取关单记录
        getInterClose() { //PC-客服关单记录
            this.$axios
                .post(
                this.urlStr,
                this.$qs.stringify(this.searchVal)
                )
                .then(res => {
                    this.table_loading = false;
                    if( res.dataSet!==null && res.dataSet.length !==0){
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
        refreshList(val){
            if(this.moduleType==0 ){
                this.searchVal.leaseType = val;
            }else if( this.moduleType==2 || this.moduleType==1){
                this.searchVal.orderType = val;
            }
            this.table_loading = true;
            this.searchVal.pageIndex = 1;
            this.searchVal.pageSize = 10;
            this.searchVal.total = 0;
            this.getInterClose();
        },
        // 查看关单详情
        view(code) {
            // this.$store.commit('updateType', this.$route.params.type);
            // console.log(code)
            if(this.searchVal.type==0){
                this.$router.push({ name: "personal_close", params: { id: code } });
            }else{
                this.$router.push({ name: "personal_close_feedback", params: { id: code } });
            }
        },
        handleSizeChange(val) {
            this.table_loading = true;
            this.searchVal.pageSize = val;
            this.getInterClose();
        },
        handleCurrentChange(val) {
            this.table_loading = true;
            this.searchVal.pageIndex = val;
            this.getInterClose();
        },
        handleClick(tab, event){
            this.searchVal.type = tab.index;
            this.table_loading = true;
            if( this.moduleType==1 ){ //1 -pc财务
                if( this.searchVal.type==0){
                    this.urlStr = "/api/pc/final/commission/close/list";//成单结佣
                }else{
                    this.urlStr = "/api/pc/refund/close/list";//退款
                }
            }else if(this.moduleType==2){
                if(this.searchVal.type==0){
                    this.urlStr = "/api/pc/internal/close/order/list";//交易单
                }else{
                    this.urlStr = "/api/pc/refund/review/close/list"//退款
                }
            }
            this.getInterClose();
        }
    }
}
</script>

