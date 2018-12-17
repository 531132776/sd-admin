<template>
    <div class="finance_page transaction_detail" v-if="orderDetail.order"> 
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/home/transactionList' }"><span class="">{{$t('RealEstateTransaction')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Detail')}}</el-breadcrumb-item>
        </el-breadcrumb>    

        <div class="section mt-20">
            <p class="section-title">{{$t('RealEstateTransaction')}}</p>
            <ul class="block" >
                <li><span class="font-s12">{{$t('ClinchAdealTheOrder')}}：  </span>  {{orderDetail.order.orderCode}}</li>
                <li><span class="font-s12">{{$t('MethodOfPayment')}}：      </span>  
                    <i v-if="orderDetail.order.payWay==0">{{$t('unPay')}}</i>
                    <i v-if="orderDetail.order.payWay==1">{{$t('Online')}}</i>
                    <i v-if="orderDetail.order.payWay==2">{{$t('Case')}}</i>
                    <i v-if="orderDetail.order.payWay==3">{{$t('pursePay')}}</i>
                
                </li>
                <li><span class="font-s12">{{$t('PayTheAmount')}}：         </span>  {{orderDetail.order.platformServiceAmount}}</li>
                <li><span class="font-s12">{{$t('HouseNumber')}}：          </span>  {{orderDetail.house.roomName}}</li>
                <li><span class="font-s12">{{$t('HousingTypes')}}：         </span>  
                    <i v-if="orderDetail.order.orderType==0">{{$t('Rent')}}</i>
                    <i v-if="orderDetail.order.orderType==1">{{$t('Sale')}}</i>
                </li>
                <!-- <li><span class="font-s12">{{$t('SystemData')}}：           </span>  </li> -->
                <li><span class="font-s12">{{$t('TradingHours')}}：         </span>  {{orderDetail.order.createTime}}</li>
                <li><span class="font-s12">{{$t('HousingSourceAddress')}}： </span>  {{orderDetail.house.city}}{{orderDetail.house.community}}{{orderDetail.house.subCommunity}}{{orderDetail.house.address}}</li>
            </ul>
        </div>
        
        <div class="mt-20 h-center min-width500">
            <!-- 交易中时才能点击 -->
            <el-button type="success" class="" @click="offlinePay()" 
            :disabled="orderDetail.order.orderStatus==0 && orderDetail.order.tradingStatus==0?false:true" >
                <template v-if="orderDetail.order.orderStatus==1">{{$t('Confirmedpayment')}}</template>
                <template v-else>{{$t('Paymentconfirm')}}</template>
                <!-- <template v-if="orderDetail.orderStatus==1">已确认收款</template> -->
            </el-button>
            <!-- orderDetail.order.orderStatus>=2 || orderDetail.order.orderStatus==0 -->
            <el-button type="success" class="" @click="checkPay()" :disabled="orderDetail.order.orderStatus==1 && orderDetail.order.tradingStatus==0?false:true" >
                <template v-if="orderDetail.order.orderStatus>=2">{{$t('Verified')}}</template>
                <template v-else>{{$t('Verification')}}</template>
            </el-button>

        </div>

            <!-- :disabled="orderDetail.isCheck==1?false:true" -->
    </div>
</template>

<script>
export default {
    name: 'transactionDetail',
    props:['id'],
    data(){
        return{
            orderDetail:''
        }
    },
    created(){
        
    },
    mounted(){
        this.getOrderDeatil();
    },
    methods:{
        getOrderDeatil(){
            this.$axios
                .post("/api/pc/order/detail/"+this.$props.id,
                )
                .then(res => {
                    this.orderDetail = res.dataSet;
                })
                .catch(err => this.$message.error(err.message));   
        },
        checkPay(){
            this.$axios
                .post("/api/pc/check/order/pay",
                this.$qs.stringify({orderCode:this.orderDetail.order.orderCode})
                )
                .then(res => {
                   if(res.result==0){
                        this.$message.success(this.$t('approved'));
                        this.$router.push('/home/transactionList')
                    }
                })
                .catch(err => this.$message.error(err.message));              
        },
        offlinePay(){
            this.$axios
                .post("/api/pc/offline/order/pay",
                this.$qs.stringify({orderCode:this.orderDetail.order.orderCode})
                )
                .then(res => {
                   if(res.result==0){
                        this.$message.success(this.$t('paymentSuccessful'));
                        this.$router.push('/home/transactionList')
                    }
                })
                .catch(err => this.$message.error(err.message));                
        }
    }
}
</script>

<style lang="less">
    .transaction_detail{
        .el-button--success.is-disabled{
            color: #fff;
            background-color: #b3e19d;
            border-color: #b3e19d;
        }
    }
</style>
