<template>
    <div class="finance_page transaction_detail">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/home/refundList' }"><span class="">{{$t('TheRefundLis')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Detail')}}</el-breadcrumb-item>
        </el-breadcrumb>    

        <div class="section mt-20">
            <p class="section-title">{{$t('info')}}</p>
            <ul class="block">
                <li><span class="font-s12">{{$t('ClinchAdealTheOrder')}}：</span>   {{orderDetail.orderCode}}</li>
                <li><span class="font-s12">{{$t('HouseNumber1')}}：        </span>   {{orderDetail.houseCode}}</li>
                <li><span class="font-s12">{{$t('HousingTypes')}}：       </span>  
                    <i v-if="orderDetail.orderType==0">{{$t('Rent')}}</i>
                    <i v-if="orderDetail.orderType==1">{{$t('Sale')}}</i>
                </li>
                <li><span class="font-s12">{{$t('TotalMoney')}}：</span>  {{orderDetail.platformServiceAmount}}</li>
                <li><span class="font-s12">{{$t('MethodOfPayment')}}：</span>
                    <i v-if="orderDetail.payWay==0">{{$t('unPay')}}</i>
                    <i v-if="orderDetail.payWay==1">{{$t('Online')}}</i>
                    <i v-if="orderDetail.payWay==2">{{$t('Case')}}</i>
                    <i v-if="orderDetail.payWay==3">{{$t('pursePay')}}</i>
                </li>
            </ul>            
        </div>

        <div class="section mt-20">
            <p class="section-title">{{$t('RefundInformation')}}</p>
            <ul class="block">
                <li><span class="font-s12">{{$t('OtherHandlingCharges')}}：  </span>  <el-input v-model="orderDetail.otherHandlingFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isRefund==1"></el-input></li>
                <li><span class="font-s12">{{$t('ActualRefunds')}}：  </span>  <el-input v-model="orderDetail.refundableAmount" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isRefund==1"></el-input></li>
            </ul>
        </div>

        <div class="section mt-20">
            <p class="section-title">{{$t('note')}}</p>
            <ul class="block">
                <el-input
                    type="textarea"
                    :rows="2"
                    :placeholder="$t('PleaseEnter')"
                    v-model="orderDetail.remark" :disabled="orderDetail.isRefund==1">
                </el-input>
            </ul>
        </div>

        <div class="h-center min-width500" v-if="orderDetail.isRefund !==1" >
            <el-button type="warning" @click="orderDetail.isCheck=2,checkRefund()" >{{$t('auditFail')}}</el-button>
            <el-button type="success" @click="orderDetail.isCheck=1,checkRefund()">{{$t('approved')}}</el-button>
        </div>

        <el-button  v-else type="success" class="h-center">{{$t('Refundsuccessfully')}}</el-button>

    </div>
</template>

<script>
export default {
    name: 'refundDetail',
    props:['id'],
    data(){
        return{
            orderDetail:{
                id:'',
                isCheck:0,
                remark:'',
                refundableAmount:'',
                otherHandlingFee:''
            },
        }
    },
    created(){

    },
    mounted(){
        this.getRefundDetail();
    },
    methods:{
        getRefundDetail(){
            this.$axios
                .post("/api/pc/refund/detail/"+this.$props.id,
                )
                .then(res => {
                    this.orderDetail = res.dataSet;
                })
                .catch(err => this.$message.error(err.message));   
        },
        checkRefund(){
            if(this.orderDetail.isCheck==1){
                if( this.orderDetail.remark =="" ){
                    this.$message.error(this.$t('Pleaseentertheremark'));
                    return;
                }
            }
            this.$axios
                .post("/api/pc/refund/check",
                this.$qs.stringify({
                    id:this.orderDetail.id,
                    isCheck:this.orderDetail.isCheck,
                    remark:this.orderDetail.remark,
                    refundableAmount:this.orderDetail.refundableAmount,
                    otherHandlingFee:this.orderDetail.otherHandlingFee
                })
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('Verified'));
                        this.$router.push('/home/refundList')
                    }
                })
                .catch(err => this.$message.error(err.message));              
        }
    },
    watch:{
        'orderDetail.otherHandlingFee'(val){
            this.orderDetail.refundableAmount = this.orderDetail.platformServiceAmount - val;
        },
        'orderDetail.refundableAmount'(val){
            this.orderDetail.otherHandlingFee = this.orderDetail.platformServiceAmount - val;
        }
    }
}
</script>


