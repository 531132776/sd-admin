<template>
    <div class="edit-progress">
        <div class="nav">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="输入订单号查询" v-model.trim="orderCode" @keyup.enter.native="search">
                        <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div v-if="detail.order.orderId" class="order-info">
            <p>{{$t('orderInfo')}}</p>
            <div>
                <div class="left">
                    <p>
                        <span>{{$t('OrderStatus')}}: </span>
                        <span v-if="detail.order.tradingStatus===0">{{$t('tradingIn')}}</span>
                        <span v-if="detail.order.tradingStatus===1">{{$t('successfulDeal')}}</span>
                        <span v-if="detail.order.tradingStatus===2" style="color:red;font-weight:bold;font-size:20px">{{$t('TransactionFailure')}}</span>
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
        <div v-if="detail.order.orderId" class="customer-info">
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
        <div v-if="detail.order.orderId" class="progress">
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
        <div v-if="detail.order.orderId" class="remark">
            <p>{{$t('note')}}</p>
            <div>{{detail.order.remark}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'order',
        data() {
            return {
                orderCode: '',
                detail: {
                    house: {},
                    member: {},
                    order: {}
                },
                progress: [],
            }
        },
        methods: {
            async search() {
                if(this.orderCode==""){
                    this.$message.error('请输入订单号后查询！');
                    return false;
                }
                
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                
                try {
                    // 查房源详情
                    let res = await this.$axios.post(`/api/pc/order/find`, this.$qs.stringify({ orderCode: this.orderCode }));
                    this.detail = res.dataSet ? res.dataSet : this.detail;
                    if (!res.dataSet) {
                        this.$set(this.detail, 'order', {});
                        throw Error('订单不存在');
                    }
                    // 进度列表(50内勤(出租) 51内勤(出售))
                    res = await this.$axios.post('/api/pc/get/progress/list', this.$qs.stringify({ type: this.detail.order.orderType === 0 ? 50 : 51 }));
                    this.progress = res.dataSet || [];                       

                } catch (err) {
                    this.$set(this.detail, 'order', {});
                    this.$message.error(err.message);
                } finally {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                }

            }
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