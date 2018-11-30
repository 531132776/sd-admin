<template>
    <div class="finance_page transaction_detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home/personalCenter/2' }"><span class="">{{$t('PersonalCenter')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Commissioningrecord')}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Commissioningdetials')}}</el-breadcrumb-item>
        </el-breadcrumb>    

        <div class="section mt-20">
            <p class="section-title">{{$t('Commissioningdetials')}}</p>
            <ul class="block">
                <li><span class="font-s12">{{$t('orderCode')}}：</span>   {{orderDetail.orderCode}}</li>
                <li><span class="font-s12">{{$t('HouseNumber1')}}： </span>   {{orderDetail.houseCode}}</li>
                <li><span class="font-s12">{{$t('HousingTypes')}}：</span>  
                    <i v-if="orderDetail.order.orderType==0">{{$t('Rent')}}</i>
                    <i v-if="orderDetail.order.orderType==1">{{$t('Sale')}}</i> 
                </li>
                <li><span class="font-s12">{{$t('SourceInfo')}}：</span>APP</li>
                <li><span class="font-s12">{{$t('telephone')}}：{{orderDetail.memberMoble}}</span>  </li>
                <li><span class="font-s12">{{$t('createTime')}}： </span> {{orderDetail.createTime}} </li>
                <li><span class="font-s12">{{$t('HousingSourceAddress')}}： </span>  {{orderDetail.city}}{{orderDetail.community}}{{orderDetail.subCommunity}}{{orderDetail.address}}</li>
            </ul>

            
        </div>
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
            }
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
                .post("/api/pc/internal/final/commission/detail/"+this.$props.id,
                )
                .then(res => {

                    this.orderDetail = res.dataSet;
                    
                })
                .catch(err => this.$message.error(err.message));   
        },
        updateCommission(){
            let company = this.orderDetail.platformServiceAmount-this.orderDetail.sellerAssistantFee-this.orderDetail.buyerAssistantFee-this.orderDetail.internalAssistantFee-this.orderDetail.regionLeaderTakeKeyFee-this.orderDetail.regionLeaderFee-this.orderDetail.elseAssistantAmount;
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
                    company:company
                })
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success('修改成功！');
                        this.$router.push('/home/commissionList')
                    }
                })
                .catch(err => this.$message.error(err.message));              
        }
    }
}
</script>


