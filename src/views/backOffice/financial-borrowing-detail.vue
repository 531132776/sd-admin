<!-- 金融借贷详情 -->
<template>
    <div class="financial-borrowing-detail">
        <div class="nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{  }"><span class="first-nav">{{$t('financialBorrowing')}}</span></el-breadcrumb-item>
                <el-breadcrumb-item><span class="second-nav">{{$t('borrowingDetails')}}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="borrowing-info">
            <p>{{$t('borrowingDetails')}}</p>
            <div>
                <div class="left">
                    <p><span>{{$t('name')}}: </span><span>{{detail.name}}</span></p>
                    <p><span>{{$t('dateOfBirth')}}: </span><span>{{detail.dateBirth}}</span></p>
                    <p>
                        <span>{{$t('haveChildren')}}: </span>
                        <span v-if="detail.haveChildren===0">no</span>
                        <span v-else>yes</span>
                    </p>
                    <p><span>{{$t('passportNo')}}: </span><span>{{detail.passportNumber}}</span></p>
                    <p><span>{{$t('email')}}: </span><span>{{detail.email}}</span></p>
                </div>
                <div class="right">
                    <p><span>{{$t('gender')}}: </span>
                        <span v-if="detail.sex===0">female</span>
                        <span v-else>male</span>
                    </p>
                    <p>
                        <span>{{$t('maritalStatus')}}: </span>
                        <span v-if="detail.isMarried===0">unmarried</span>
                        <span v-else>married</span>
                    </p>
                    <p><span>{{$t('nationality')}}: </span><span>{{detail.nationality}}</span></p>
                    <p><span>{{$t('telephone')}}: </span><span>{{detail.telephone}}</span></p>
                    <p><span>{{$t('loanAmount')}}: </span><span>{{detail.loanAmount}}</span></p>
                </div>
            </div>
        </div>
        <div class="remark">
            <p>{{$t('note')}}</p>
            <textarea v-model="detail.remark"></textarea>
        </div>
        <div class="footer">
            <div class="btn" @click="save">{{$t('save')}}</div>
        </div>
       
    </div>
</template>
<script>
    export default {
        name: 'editProgress',
        props: ['id'],
        data() {
            return {
                detail: {
                }
            }
        },
        methods: {
            save() {
                let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
                this.$axios.post('/api/pc/loans/update', this.$qs.stringify({
                    id:this.detail.id,
                    remark:this.detail.remark
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
            console.log(this.$props)
            // 查房源详情
            let res = await this.$axios.post(`/api/pc/loans/detail/${this.$props.id}`);
            this.detail = res.dataSet;
        }
    }
</script>
<style scoped lang="less">
    .financial-borrowing-detail {
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

        >.borrowing-info {
            >p {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                border-left: 2px solid #00B660;
                text-indent: 4px;
                margin: 35px 0 20px 0;
            }
            >div {
                height: 240px;
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
                resize: none;
            }
        }

        >.footer {
            margin-top: 300px;
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
</style>