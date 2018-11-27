<template>
    <div class="refund-approval">
        <div class="header">
            <el-button @click="addBooth">新增展位</el-button>
            <!-- <el-button class="add">默认排序</el-button> -->
            <!-- <el-select v-model="pagination.orderType" @change="changeStatus" :placeholder="$t('choose')"
                style="width:120px;font-size:12px;margin:0 10px;">
                <el-option label="出租" :value="0"></el-option>
                <el-option label="出售" :value="1"></el-option>
                <el-option label="全部" :value="null"></el-option>
            </el-select>
            <el-input v-model="pagination.orderCode" :placeholder="$t('search')" style="width:200px;">
                <i slot="suffix" @click="search" class="el-input__icon el-icon-search"></i>
            </el-input> -->
        </div>
        <el-table :data="boothList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">

            <el-table-column prop="boothName" :label="$t('boothName')" header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="$t('boothType')" header-align="center" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.boothType|boothTypeF}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="boothState" :label="$t('boothStatus')" header-align="center" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.boothState===0">{{$t('enable')}}</span>
                    <span v-else>{{$t('disable')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="boothExclusive" :label="$t('exclusive')" header-align="center" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.boothExclusive===1">PC</span>
                    <span v-if="scope.row.boothExclusive===2">TC</span>
                    <span v-else>APP</span>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button @click="view(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 查看，编辑,新增 -->
        <el-dialog :title="$t('prompt')" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="100px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('boothName')}}:</span>
                            <el-input v-model="booth.boothName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label">{{$t('boothAlias')}}:</span>
                            <el-input v-model="booth.boothAliasName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('boothType')}}:</span>
                            <el-select v-model="booth.boothType">
                                <el-option :label="$t('ad')" :value="1"></el-option>
                                <el-option label="买家出租" :value="2"></el-option>
                                <el-option label="买家出销" :value="3"></el-option>
                                <el-option label="卖家出租" :value="4"></el-option>
                                <el-option label="卖家出售" :value="5"></el-option>
                                <el-option label="友情链接" :value="6"></el-option>
                                <el-option label="出租" :value="7"></el-option>
                                <el-option label="出售" :value="8"></el-option>
                                <el-option label="新楼盘" :value="9"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label">{{$t('boothStatus')}}:</span>
                            <el-select v-model="booth.boothState">
                                <el-option :label="$t('enable')" :value="0"></el-option>
                                <el-option :label="$t('disable')" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('languageVersion')}}:</span>
                            <el-select v-model="booth.languageVersion">
                                <el-option label="中文" :value="0"></el-option>
                                <el-option label="英文" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label">{{$t('isDelete')}}</span>
                            <el-select v-model="booth.isDel">
                                <el-option :label="$t('delete')" :value="1"></el-option>
                                <el-option :label="$t('notDelete')" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('creater')}}:</span>
                            <el-input v-model="booth.createBy" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label"> {{$t('createTime')}}:</span>
                            <el-date-picker v-model="booth.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" disabled></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('updateOne')}}:</span>
                            <el-input v-model="booth.updateBy" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label"> {{$t('updateTime')}}:</span>
                            <el-date-picker v-model="booth.updateTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" disabled></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <span slot="label">{{$t('sort')}}:</span>
                            <el-input v-model="booth.boothSort"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item>
                            <span slot="label"> 展位专属:</span>
                            <el-select v-model="booth.boothExclusive">
                                <el-option label="PC" :value="1"></el-option>
                                <el-option label="TC" :value="2"></el-option>
                                <el-option label="APP" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="21">
                        <el-form-item>
                            <span slot="label">{{$t('boothDes')}}:</span>
                            <el-input v-model="booth.boothDesc" type="textarea" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        name: 'refundApproval',
        data() {
            return {
                loading: true,
                dialogVisible: false,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                },
                booth: {
                    id: null,
                    languageVersion: 0,
                    boothName: "",
                    boothAliasName: "",
                    boothDesc: "",
                    boothType: 1,
                    boothState: 0,
                    boothSort: 0,
                    isDel: 0,
                    createBy: null,
                    createTime: "",
                    updateBy: null,
                    updateTime: "",
                    dataSize: 0,
                    boothExclusive: 1,
                },
                boothList: []
            }
        },
        methods: {
            loadBoothList() {//改为退款审批的接口 
                this.loading=true;
                this.$axios.post('/api/pc/booth/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        console.log(res);
                        this.boothList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                        this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);
            },
            changeStatus() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadBoothList();
            },
            addBooth() {// 新增展位
                this.booth = {
                    languageVersion: 0,
                    boothName: "",
                    boothAliasName: "",
                    boothDesc: "",
                    boothType: 1,
                    boothState: 0,
                    boothSort: 0,
                    isDel: 0,
                    createBy: null,
                    createTime: "",
                    updateBy: null,
                    updateTime: "",
                    dataSize: 0,
                    boothExclusive: 1,
                };
                this.dialogVisible = true;
            },
            submit() {
                this.dialogVisible = false;
                if (this.booth.id) {//更新
                    this.$axios.post('/api/pc/booth/update', this.$qs.stringify(this.booth))
                        .then(res => {
                            this.$message({ type: 'success', message: res.message });
                            this.loadBoothList();
                        })
                        .catch(err => this.$message.error(err.message));
                } else {//新增 

                    this.$axios.post('/api/pc/booth/add', this.$qs.stringify(this.booth))
                        .then(res => {
                            this.$message({ type: 'success', message: res.message });
                            this.loadBoothList();
                        })
                        .catch(err => this.$message.error(err.message));
                }
            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadBoothList();
            },
            view(row) {
                this.$axios.post(`/api/pc/booth/detail/${row.boothId}`)
                    .then(res => {
                        this.booth = res.dataSet;
                        this.dialogVisible = true;
                    })
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadBoothList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadBoothList();
            },
        },
        beforeMount() {
            this.loadBoothList();
        }
    }
</script>
<style scoped lang="less">
    .refund-approval {
        >.header {
            margin: 5px 0;
        }

        >.page {
            text-align: right;
            padding: 10px 0;
        }
    }
</style>