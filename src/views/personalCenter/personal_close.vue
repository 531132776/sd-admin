<template>
    <div class="persona_close">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:`/home/personalCenter/${moduleType}` }"><span class="">{{$t('PersonalCenter')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:`/home/personal_close_list/${moduleType}`   }">{{$t('closerecord')}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Detail')}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="section" v-if="moduleType ==0 ">
            <p class="section-title">{{$t('HousingInfo')}}</p>
            <ul class="block">
                <!-- <li>处理类别：{{closeData.isFinished}}</li> -->
                <li><span class="font-s12">{{$t('HousingTypes')}}：</span> {{closeData.leaseType==0?$t('Rent'):$t('Sale')}}</li>
                <li><span class="font-s12">{{$t('ComplaintNumber')}}：</span> {{closeData.complainCode}}</li>
                <li><span class="font-s12">{{$t('SourceInfo')}}：</span> {{closeData.platform|platformType}}</li>
                <li><span class="font-s12">{{$t('telephone')}}：</span> {{closeData.mobile}}</li>
                <li><span class="font-s12">{{$t('getTime')}}：</span> {{closeData.createTime}}</li>
                <li><span class="font-s12">{{$t('address')}}：</span> {{closeData.city}}{{closeData.community}}{{closeData.subCommunity}}{{closeData.address}}</li>
            </ul>
        </div>
        <!-- pc-内勤 -->
        <div class="section" v-if="moduleType ==2 && innerData.order">  
            <p class="section-title">{{$t('orderInfo')}}</p>
            <ul class="block">
                <!-- <li>处理类别：{{closeData.isFinished}}</li> -->
                <li><span class="font-s12">{{$t('OrderStatus')}}：</span>
                    <span v-if="innerData.order.tradingStatus===0">{{$t('tradingIn')}}</span>
                    <span v-if="innerData.order.tradingStatus===1">{{$t('successfulDeal')}}</span>
                    <span v-if="innerData.order.tradingStatus===2" style="color:red;font-weight:bold;">{{$t('TransactionFailure')}}</span>
                </li>
                <li><span class="font-s12">{{$t('orderCode')}}：</span>{{innerData.order.orderCode}}</li>
                <li><span class="font-s12">{{$t('houseNumber')}}：</span>{{innerData.house.houseCode}}</li>
                <li><span class="font-s12">{{$t('HousingTypes')}}：</span>{{innerData.order.orderType==0?$t('Rent'):$t('Sale')}}</li>
                <li><span class="font-s12">{{$t('SourceInfo')}}：</span>APP</li>
                <li><span class="font-s12">{{$t('getTime')}}：</span>{{innerData.order.createTime}}</li>
                <li><span class="font-s12">{{$t('address')}}：</span>{{innerData.house.city}}{{innerData.house.community}}{{innerData.house.subCommunity}}{{innerData.house.address}}</li>
            </ul>
        </div>
        <div class="section" v-if="moduleType ==2 && innerData.member">  
            <p class="section-title">{{$t('customerInfo')}}</p>
            <ul class="block">
                <!-- <li>处理类别：{{closeData.isFinished}}</li> -->
                <li><span class="font-s12">{{$t('landlordName')}}：</span>{{innerData.member.ownerName}}</li>
                <li><span class="font-s12">{{$t('tenantsName')}}：</span>{{innerData.member.memberName}}</li>
                <li><span class="font-s12">{{$t('landlordTelephone')}}：</span>{{innerData.member.ownerMobile}}</li>
                <li><span class="font-s12">{{$t('tenantsPhone')}}：</span>{{innerData.member.memberMobile}}</li>
            </ul>
        </div>
        <div class="section" v-if="moduleType ==2 ">
            <p class="section-title">{{$t('withTheProgress')}}</p>
            <!-- <ul class="progress">
                <li :class="item.showBool?'success':'unsuccess'" v-for="(item,idx) in progressList" :key="item.code"><i >{{idx+1}}</i><br><span>{{item.label}}</span></li>
            </ul> -->

            <el-steps v-if="innerData.progress" :active="innerData.progress.length" finish-status="success">
                <el-step v-for="(step,index) in progress" :key="index">
                    <span slot="title" v-if="$i18n.locale=='zh'">{{step.zhCn}}</span>
                    <span slot="title" v-if="$i18n.locale=='en'">{{step.enUs}}</span>
                </el-step>
            </el-steps>


        </div>
        <div class="section">
            <p class="section-title">{{$t('note')}}</p>
            <div class="remark">
                <template v-if="moduleType==0">{{closeData.remark}}</template>
                <template v-if="moduleType==2 && innerData.order">{{innerData.order.remark}}</template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'personal_close',
    props:['id'],
    data(){
        return {
            closeData:{},
            innerData:{},
            moduleType:'',
            urlStr:"/api/pc/center/order/closes/detail/",
            progressList:[
                {code:101,label:'上传房源',showBool:false},
                {code:102,label:'发布房源',showBool:false},
                {code:103,label:'线上议价成交',showBool:false},
                {code:104,label:'合同签订',showBool:false},
                // {code:105,label:'ejari注册',showBool:false},
                // {code:114,label:'合同签订(FromF)',showBool:false},
                {code:115,label:'卖家NOC/买家贷款',showBool:false},
                {code:116,label:'产权变更',showBool:false},
                // {code:21,label:'预约看房',showBool:false},
            ],
            progress:[],
            loadingInstance:'',
            activeStep:0
        }
    },
    created(){
        this.moduleType = sessionStorage.getItem('closeListType');
        if( this.moduleType==0 ){
            this.urlStr = "/api/pc/center/order/closes/detail/"
        }else if(this.moduleType==2 ){
            this.urlStr = "/api/pc/internal/order/detail/"
        }
        this.loadingInstance = this.$Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(56, 53, 53, 0.6)'
        });
    },
    mounted(){
        this.getCloseDetail();
    },
    methods:{
        getCloseDetail(){
            let _this = this;
            this.$axios
                .post(this.urlStr+this.$props.id,
                )
                .then(res => {
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        this.loadingInstance.close(); 
                    });
                       
                    if(this.moduleType==0){
                        this.closeData = res.dataSet;   
                    }else if(this.moduleType==2){
                        this.innerData = res.dataSet;
                        // console.log( this.innerData )
                        this.$axios.post('/api/pc/get/progress/list', 
                        this.$qs.stringify({ type: this.innerData.order.orderType === 0 ? 50 : 51 })
                        ).then(res=>{
                            this.progress = res.dataSet || [];
                        }).catch(err=>{

                        });
 
                    }
                })
                .catch(err => this.$message.error(err.message));     
                
        }

        
    },
    filters:{
        platformType(val) {
				var arr = ["",'customer' ,'Seller assistant', 'Buyer assistant', 'Area Marshal', "PC"];
				return arr[val];
			},
    }
}
</script>


