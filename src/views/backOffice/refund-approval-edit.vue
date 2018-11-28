<!-- 退款审批详情 -->
<template>
    <div class="edit-progress">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path:'/home/refundApproval' }"><span class="first-nav">{{$t('refund')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item>
                    <span class="second-nav">
                        <i v-if="detail.order.orderType===0">{{$t('Rent')}}</i>
                        <i v-else>{{$t('Sale')}}</i>
                    </span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="order-info">
            <p>{{$t('orderInfo')}}</p>
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
                    <p><span>{{$t('HousingTypes')}}: </span><span>{{detail.order.orderType===0 ? $t('Rent') : $t('Sale')}}</span></p>
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
                    <p><span>{{$t('tenantsName')}}: </span><span>{{detail.member.memberName}}</span></p>
                    <p><span>{{$t('tenantsPhone')}}: </span><span>{{detail.member.memberMobile}}</span></p>
                </div>
            </div>
        </div>
        <div class="progress">
            <p>{{$t('withTheProgress')}}</p>
            <div>
                <el-steps v-if="detail.progress" :active="detail.progress.length" finish-status="success">
                    <el-step v-for="(step,index) in progress" :key="index">
                        <span slot="title" v-if="$i18n.locale=='zh'">{{step.zhCn}}</span>
                        <span slot="title" v-if="$i18n.locale=='en'">{{step.enUs}}</span>
                    </el-step>
                </el-steps>
            </div>
        </div>
        <div class="remark">
            <p>{{$t('note')}}</p>
            <textarea v-model="detail.order.remark"></textarea>
        </div>
        <el-row type="flex" justify="center">
            <div class="refused" @click="refused">{{$t('refusedToApproval')}}</div>
            <div class="agree" @click="agree">{{$t('agreeToApproval')}}</div>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'editProgress',
        props: ['refundId'],
        data() {
            return {
                detail: {
                    house: {},
                    member: {},
                    order: {}
                },
                progress: [],
            }
        },
        computed: {

        },
        methods: {
            refused() {//拒绝审批 /pc/refund/review/refuse

                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/refund/review/refuse', this.$qs.stringify({
                    id: this.$props.refundId,
                    remark: this.detail.order.remark
                })).then(res => {
                    this.$message({ type: 'success', message: res.message });
                    this.$router.go(-1);
                }).catch(err => this.$message.error(err.message))
                    .finally(() => this.$nextTick(() => {
                        loadingInstance.close();
                    }));
            },
            agree() { //同意审批 /pc/refund/review/pass

                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/refund/review/pass', this.$qs.stringify({
                    id: this.$props.refundId,
                    remark: this.detail.order.remark
                })).then(res => {
                    this.$message({ type: 'success', message: res.message });
                    this.$router.go(-1);
                }).catch(err => this.$message.error(err.message))
                    .finally(() => this.$nextTick(() => {
                        loadingInstance.close();
                    }));
            }

        },
        async beforeMount() {
            // 退款详情 /pc/refund/review/detail/{id}
            let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });

            let res = await this.$axios.post(`/api/pc/refund/review/detail/${this.$props.refundId}`);
            this.detail = res.dataSet;
            // 进度列表(50内勤(出租) 51内勤(出售))
            res = await this.$axios.post('/api/pc/get/progress/list', this.$qs.stringify({ type: this.detail.order.orderType === 0 ? 50 : 51 }));
            this.progress = res.dataSet || [];

            // console.log('进度列表', res);

            this.$nextTick(() => { 
                loadingInstance.close();
            });
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

            >textarea {
                width: 100%;
                height: 120px;
                background-color: #F7F7F7;
                margin-left: 4px;
            }
        }

        .refused {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 240px;
            height: 44px;
            border-radius: 3px;
            border: 1px solid rgba(243, 151, 0, 1);
            color: #F39700;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
        }

        .agree {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 240px;
            height: 44px;
            background: rgba(0, 182, 96, 1);
            border-radius: 3px;
            color: #FFFFFF;
            font-size: 16px;
            cursor: pointer;
            margin-left: 10px;
        }
    }
</style>