<!-- 编辑线上出租或者出售的详情 -->
<template>
    <div class="edit-progress">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{  }"><span class="first-nav">{{detail.order.orderType === 0 ? $t('Rent') :
                        $t('Sale')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>
                    <span v-if="detail.order.tradingStatus===0" class="second-nav">{{$t('tradingIn')}}</span>
                    <span v-if="detail.order.tradingStatus===1" class="second-nav">{{$t('successfulDeal')}}</span>
                    <span v-if="detail.order.tradingStatus===2" class="second-nav">{{$t('TransactionFailure')}}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="detail.order.tradingStatus===2">
                    <span v-if="detail.order.isCancel===1" class="second-nav">用户取消</span>
                    <span v-if="detail.order.isCancel===2" class="second-nav">业主取消</span>
                    <span v-if="detail.order.isCancel===3" class="second-nav">平台</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="order-info">
            <p>订单信息</p>
            <div>
                <div class="left">
                    <p>
                        <span>{{$t('OrderStatus')}}: </span>
                        <span v-if="detail.order.tradingStatus===0">{{$t('tradingIn')}}</span>
                        <span v-if="detail.order.tradingStatus===1">{{$t('successfulDeal')}}</span>
                        <span v-if="detail.order.tradingStatus===2" style="color:red;font-weight:bold;">{{$t('TransactionFailure')}}</span>
                    </p>
                    <p><span>{{$t('houseNumber')}}: </span><span>{{detail.house.houseCode}}</span></p>
                    <p><span>{{$t('SourceInfo')}}: </span><span>APP</span></p>
                    <p><span>{{$t('HousingSourceAddress')}}: </span><span>{{detail.house.city}}{{detail.house.community}}{{detail.house.subCommunity}}{{detail.house.address}}</span></p>
                </div>
                <div class="right">
                    <p><span>{{$t('orderCode')}}: </span><span>{{detail.order.orderCode}}</span></p>
                    <p><span>{{$t('HousingTypes')}}: </span><span>{{detail.order.orderType===0 ? $t('Rent') :
                            $t('Sale')}}</span></p>
                    <p><span>{{$t('getTime')}}: </span><span>{{detail.order.createTime}}</span></p>
                    <p><span></span><span></span></p>
                </div>
            </div>
        </div>
        <div class="customer-info">
            <p>{{$t('customerInfo')}}</p>
            <div>
                <div class="left">
                    <p><span>{{$t('landlordName')}}: </span><span>{{detail.member.ownerName}}</span></p>
                    <p><span>{{$t('landlordPhone')}}: </span><span>{{detail.member.ownerMobile}}</span></p>
                </div>
                <div class="right">
                    <p>
                        <span> 
                            <i v-if="detail.order.orderType===0">{{$t('tenantsName')}}:</i>  
                            <i v-if="detail.order.orderType===1">{{$t('buyerName')}}:</i>  
                        </span>
                        <span>{{detail.member.memberName}}</span>
                    </p>
                    <p>
                        <span>
                            <i v-if="detail.order.orderType===0">{{$t('tenantsPhone')}}:</i>  
                            <i v-if="detail.order.orderType===1">{{$t('buyerPhone')}}:</i>     
                        </span>
                        <span>{{detail.member.memberMobile}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="progress">
            <p>{{$t('withTheProgress')}}</p>
            <div>
                <el-steps v-if="detail.progress" :active="detail.progress.length" finish-status="success">
                    <el-step v-for="(step,index) in progress" :key="index">
                        <!-- <span slot="title" v-bind:class="{ activeBtn: index===activeStep }" @click="setStep(index,step)">{{step.zhCn}}</span> -->
                        <span slot="title"  @click="setStep(index,step)">
                            <i v-if="$i18n.locale=='zh'">{{step.zhCn}}</i>
                            <i v-if="$i18n.locale=='en'">{{step.enUs}}</i>
                        </span>
                    </el-step>
                </el-steps>
            </div>
        </div>
        <div class="remark">
            <p>{{$t('note')}}</p>
            <div>{{detail.order.remark}}</div>
        </div>
        <div class="footer">
            <div v-if="detail.order.tradingStatus===2 && detail.order.isCancel!=1" class="btn" @click="refund">{{$t('doRefund')}}</div>
            <div v-if="detail.order.tradingStatus===0" class="btn" @click="cancel">{{$t('cancelTheDeal')}}</div>
        </div>
        <!-- 取消交易 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="100px">
                <el-form-item>
                    <span slot="label">责任人:</span>
                    <el-radio v-model="cancelOrder.isCancel" label="1">客户</el-radio>
                    <el-radio v-model="cancelOrder.isCancel" label="2">业主</el-radio>
                    <el-radio v-model="cancelOrder.isCancel" label="3">平台</el-radio>
                </el-form-item>
                <el-form-item>
                    <span slot="label">{{$t('note')}}:</span>
                    <el-input v-model="cancelOrder.remark" type="textarea" resize="none" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="confirmRefused">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'editProgress',
        props: ['orderId'],
        data() {
            return {
                dialogVisible: false,
                
                detail: {
                    house: {},
                    member: {},
                    order: {}
                },
                progress: [],
                cancelOrder:{
                    orderId:this.$props.orderId,
                    isCancel: '1',
                    remark:'',
                },
            }
        },
        computed: {

        },
        methods: {
            async loadDetail() {
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                // 查房源详情
                let res = await this.$axios.post(`/api/pc/internal/order/detail/${this.$props.orderId}`);
                this.detail = res.dataSet;
                // 进度列表(50内勤(出租) 51内勤(出售))
                res = await this.$axios.post('/api/pc/get/progress/list', this.$qs.stringify({ type: this.detail.order.orderType === 0 ? 50 : 51 }));
                this.progress = res.dataSet || [];

                this.$nextTick(() =>loadingInstance.close());
            },
            setStep(index, step) {//只有交易中才能修改
                if (this.detail.order.tradingStatus != 0) return;
                if (index != this.detail.progress.length) return;
                this.$prompt('请输入备注信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                    this.$axios.post('/api/pc/progress/update', this.$qs.stringify({ orderId: this.$props.orderId, progressCode: step.code, houseId: this.detail.order.houseId, remark: value }))
                        .then(res => {
                            this.loadDetail();
                        
                        }).catch(err => this.$message.error(err.message))
                        .finally(() => this.$nextTick(() => {
                            loadingInstance.close();
                        }));
                });
            },
            refund() {//退款
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/refund/request', this.$qs.stringify({
                    orderId: this.detail.order.orderId,//订单id		
                    orderType: this.detail.order.orderType,//订单类型 0-租房->1-买房		
                    orderCode: this.detail.order.orderCode,//订单编号		
                    orderAmount: this.detail.order.orderAmount,//订单金额		
                    platformServiceAmount: this.detail.order.platformServiceAmount
                })).then(res => {
                    this.$message({ type: 'success', message: res.message });
                    this.$router.go(-1);
                }).catch(err => this.$message.error(err.message))
                    .finally(() => this.$nextTick(() => {
                        loadingInstance.close();
                    }));
            },
            cancel() {//取消交易
                // console.log('交易取消')
                this.dialogVisible = true;
            },
            confirmRefused(){
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/cancel/order',this.$qs.stringify(this.cancelOrder))
                        .then(res=>{
                            this.$message({type:'success',message:res.message});
                            this.$router.go(-1);
                        }).catch(err=>{
                            this.$message.error(err.message);
                        }).finally(()=>this.$nextTick(() => {
                        loadingInstance.close();
                    }));
            }
        },
        beforeMount() {
            this.loadDetail();
        }
    }
</script>
<style scoped lang="less">
    .edit-progress {
        >.nav {
            font-size: 14px;

            .first-nav {
                font-weight: 500;
                color: #333333;
            }

            .second-nav {
                color: #00B660 !important;
            }
        }

        >.order-info {
            >p {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                border-left: 2px solid #00B660;
                text-indent: 4px;
                margin: 35px 0 20px 0;
            }

            >div {
                height: 200px;
                background-color: #F7F7F7;
                margin-left: 4px;
                padding: 23px 0 40px 62px;
                display: flex;

                >div {
                    width: 460px;
                    height: 137px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-right: 42px;

                    >p {
                        >span:nth-child(1) {
                            color: #666666;
                        }

                        >span:nth-child(2) {
                            color: #333333;
                        }
                    }
                }
            }
        }

        >.customer-info {
            >p {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                border-left: 2px solid #00B660;
                text-indent: 4px;
                margin: 20px 0;
            }

            >div {
                height: 100px;
                background-color: #F7F7F7;
                margin-left: 4px;
                display: flex;
                padding-left: 62px;

                >div {
                    width: 460px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-right: 42px;

                    >p {
                        >span:nth-child(1) {
                            color: #666666;
                        }

                        >span:nth-child(2) {
                            color: #333333;
                        }
                    }
                }
            }
        }

        >.progress {
            >p {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                border-left: 2px solid #00B660;
                text-indent: 4px;
                margin-top: 20px;
            }

            >div {
                height: 120px;

                span.activeBtn {
                    color: red;
                    cursor: pointer;
                    animation: breath 0.2s linear infinite;
                }
            }
        }

        >.remark {
            >p {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                border-left: 2px solid #00B660;
                text-indent: 4px;
                margin: 20px 0;
            }

            >div {
                height: 120px;
                background-color: #F7F7F7;
                margin-left: 4px;
            }
        }

        >.footer {
            display: flex;
            justify-content: center;

            >.btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 240px;
                height: 44px;
                padding: 11px 104px;
                color: #FFFFFF;
                font-size: 16px;
                background-color: #00B660;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }

    @keyframes breath {
        from {
            color: #ccc;
        }

        to {
            color: red;
        }
    }
</style>