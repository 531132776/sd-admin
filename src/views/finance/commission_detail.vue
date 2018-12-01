<template>
    <div class="finance_page transaction_detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home/commissionList' }"><span class="">{{$t('FinalCommissionList')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Detail')}}</el-breadcrumb-item>
        </el-breadcrumb>    

        <div class="section mt-20">
            <el-alert
                title="This order has been settled"
                type="warning"
                show-icon
                v-if="orderDetail.isSettleAccounts==1">
            </el-alert>

            <p class="section-title">{{$t('info')}}</p>
            <ul class="block">
                <li><span class="font-s12">{{$t('ClinchAdealTheOrder')}}：</span>   {{orderDetail.orderCode}}</li>
                <li><span class="font-s12">{{$t('HouseNumber')}}：        </span>   {{orderDetail.houseCode}}</li>
                <li><span class="font-s12">{{$t('HousingTypes')}}：       </span>  
                    <i v-if="orderDetail.orderType==0">{{$t('Rent')}}</i>
                    <i v-if="orderDetail.orderType==1">{{$t('Sale')}}</i>
                </li>
                <li><span class="font-s12">{{$t('TotalMoney')}}：</span>  {{orderDetail.platformServiceAmount}}</li>
                <li><span class="font-s12">{{$t('company')}}：</span>  {{companyAmount}}</li>
                <li><span class="font-s12">{{$t('sellerAssistant')}}：  </span>  
                <el-input v-model="orderDetail.sellerAssistantFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>

                <li><span class="font-s12">{{$t('buyerAssistant')}}：  </span>  
                <el-input v-model="orderDetail.buyerAssistantFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>

                <li><span class="font-s12">{{$t('internalAssistant')}}：  </span>  
                <el-input v-model="orderDetail.internalAssistantFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>

                <li><span class="font-s12">{{$t('RegionalLongKey')}}：</span>  
                <el-input v-model="orderDetail.regionLeaderTakeKeyFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>

                <li><span class="font-s12">{{$t('RegionalLongTerm')}}：</span>  
                <el-input v-model="orderDetail.regionLeaderFee" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>

                <li><span class="font-s12">{{$t('else')}}：  </span>  
                <el-input v-model="orderDetail.elseAssistantAmount" :placeholder="$t('PleaseEnterContent')" :disabled="orderDetail.isSettleAccounts==1"></el-input></li>
            </ul>

            
        </div>

        <div class="h-center min-width500">
            <el-button type="warning" plain class="mt-20" :disabled="orderDetail.isSettleAccounts==1" @click="updateCommission(0)">{{$t('modify')}}</el-button>
            <el-button type="success" class="mt-20" :disabled="orderDetail.isSettleAccounts==1" @click="updateCommission(1)">{{$t('confirm')}}</el-button>
        </div>
        <!-- <el-button type="success" class="mt-20 h-center" @click="updateCommission">{{$t('confirm')}}</el-button> -->

    </div>
</template>

<script>

export default {
    name: 'commissionDetail',
    props:['id'],
    data(){
        return{
            orderDetail:{
                input1:'',
            },
            companyAmount:''
        }
    },
    created(){

    },
    mounted(){
        this.getCommissionDetail();
    },
    methods:{
        getCommissionDetail(){
            this.$axios
                .post("/api/pc/final/commission/detail/"+this.$props.id,
                )
                .then(res => {

                    this.orderDetail = res.dataSet;
                    this.companyAmount =( this.orderDetail.platformServiceAmount*10000
                    -this.orderDetail.sellerAssistantFee*10000
                    -this.orderDetail.buyerAssistantFee*10000
                    -this.orderDetail.internalAssistantFee*10000
                    -this.orderDetail.regionLeaderTakeKeyFee*10000
                    -this.orderDetail.regionLeaderFee*10000
                    -this.orderDetail.elseAssistantAmount*10000)/10000;
                    // console.log( this.companyAmount ,'this.companyAmount ' )
                })
                .catch(err => this.$message.error(err.message));   
        },
        updateCommission(val){

            this.$axios
                .post("/api/pc/final/commission/update",
                this.$qs.stringify({
                    id:this.orderDetail.id,
                    orderId:this.orderDetail.orderId,
                    sellerAssistantFee:this.orderDetail.sellerAssistantFee,
                    buyerAssistantFee:this.orderDetail.buyerAssistantFee,
                    internalAssistantFee:this.orderDetail.internalAssistantFee,
                    regionLeaderTakeKeyFee:this.orderDetail.regionLeaderTakeKeyFee,
                    regionLeaderFee:this.orderDetail.regionLeaderFee,
                    elseAssistantAmount:this.orderDetail.elseAssistantAmount,
                    company:this.companyAmount,
                    isSettleAccounts:val
                })
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('Modifiedsuccessfully'));
                        this.$router.push('/home/commissionList')
                    }
                })
                .catch(err => this.$message.error(err.message));              
        }
    },
    watch:{
        orderDetail:{ //计算金额
            immediate:false,
            handler(val){
                this.companyAmount =( this.orderDetail.platformServiceAmount*10000
                    -this.orderDetail.sellerAssistantFee*10000
                    -this.orderDetail.buyerAssistantFee*10000
                    -this.orderDetail.internalAssistantFee*10000
                    -this.orderDetail.regionLeaderTakeKeyFee*10000
                    -this.orderDetail.regionLeaderFee*10000
                    -this.orderDetail.elseAssistantAmount*10000)/10000;
            },
            deep:true
        }
    }
}
</script>


