<template>
    <div class="role-page role-list">
        <!-- 筛选条件 -->
        <el-form :inline="true">
            <el-form-item>
                <el-button type="success">{{$t('addNewRole')}}
                    <template slot-scope="scope">
                        <router-link :to="{name:'roleDetail',params:{'id':'add'}}" class="mr-20 color-white">{{$t('addNewRole')}}</router-link>
                    </template>
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchVal.isForbidden" @change="changeType" :placeholder="$t('choose')">
                    <el-option v-for="item in useStateSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table class="tablelist_close" :fit="true" :data="tableData" max-height="800" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}"
            :row-style="{'backgroundColor':'#F7F7F7'}" size="mini" v-loading="table_loading" element-loading-text="loading"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

            <el-table-column prop="roleName" :label="$t('roleName')" header-align="center" align="center">

            </el-table-column>

            <el-table-column prop="createTime" :label="$t('createTime')" header-align="center" align="center">

            </el-table-column>

            <el-table-column prop="useState" :label="$t('useState')" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.useState" label="1" @change="getUseState(scope.row.useState,scope)"
                        :checked="scope.row.isForbidden===1">{{$t('disable')}}</el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="isDel" :label="$t('isDelete')" header-align="center" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.isDel ==1">
                        {{$t('deleted')}}
                    </template>
                    <template v-else>
                        {{$t('notDelete')}}
                    </template>
                </template>
            </el-table-column>

            <el-table-column prop="nickname" :label="$t('operation')" header-align="center" align="center">
                <template slot-scope="scope">
                    <router-link :to="{name:'roleDetail',params:{'id':scope.row.id}}" class="mr-20 color-primary">{{$t('edit')}}</router-link>
                    <el-button type="text" size="small" @click="deleteRole(scope.row)">{{$t('delete')}}</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 翻页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchVal.pageIndex*1"
            :page-sizes="[10, 20, 30, 50]" :page-size="searchVal.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
            :total="searchVal.total">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                useStateSelect: [
                    { value: 0, label: this.$t('enable') },
                    { value: 1, label: this.$t('disable') }
                ],
                // roleSelect:[
                //     {value:0,label:this.$t('super')},
                //     {value:1,label:this.$t('role')},
                //     {value:2,label:this.$t('financial')},
                //     {value:3,label:this.$t('BackOffice')},
                //     {value:4,label:this.$t('service')},
                //     {value:5,label:this.$t('indent')},
                //     {value:6,label:this.$t('operating')},
                //     {value:7,label:this.$t('housing')},
                //     {value:8,label:this.$t('User')}
                // ],
                table_loading: true,
                searchVal: {
                    isForbidden: null,
                    pageIndex: 1,
                    pageSize: 10,
                    total: 100,
                },
                tableData: [],
            }
        },
        created() {

        },
        mounted() {
            this.queryList()
        },
        methods: {
            // 请求列表
            queryList() {
                this.$axios
                    .post("/api/pc/role/list",
                        this.$qs.stringify(this.searchVal)
                    )
                    .then(res => {
                        this.table_loading = false;

                        if (res.dataSet !== null) {
                            res.dataSet.forEach(ele => {
                                if (ele.isForbidden == 1) {
                                    ele.useState = true;
                                } else {
                                    ele.useState = false;
                                }
                            });
                            this.tableData = res.dataSet;
                            this.searchVal.pageIndex = res.pageInfo.pageNum;
                            this.searchVal.pageSize = res.pageInfo.pageSize;
                            this.searchVal.total = res.pageInfo.total;

                        } else {
                            this.tableData = [];
                            this.searchVal.pageIndex = 1;
                            this.searchVal.pageSize = 10;
                            this.searchVal.total = 0;
                        }
                    })
                    .catch(err => this.$message.error(err.message));
            },
            searchOrder() { //按照订单编号搜索
                this.table_loading = true;
                this.queryList();
            },
            changeType(val) {  //下拉选择启用/禁用
                this.table_loading = true;
                this.searchVal.pageIndex = 1;
                this.searchVal.pageSize = 10;
                this.searchVal.isForbidden = val;
                this.queryList();
            },
            getUseState(val, row) { //角色勾选禁用，启用
                console.log(val, row)
                let str = '';
                if (val) { str = this.$t('Disablethisrole') } else { str = this.$t('Enablethisrole') }
                this.$confirm(str, this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post("/api/pc/role/update",
                            this.$qs.stringify({
                                id: row.row.id,
                                roleName: row.row.roleName,
                                isForbidden: val ? 1 : 0,
                            })
                        )
                        .then(res => {
                            this.$message.success(this.$t('Setupsuccessfully'));
                            this.queryList();
                        })
                        .catch(err => this.$message.error(err.message));
                }).catch(() => {
                    this.$set(row.row, 'useState', !val)
                });
            },
            deleteRole(val) { //删除角色
                this.$confirm(this.$t('Suretodeletetherole'), this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post("/api/pc/role/update",
                            this.$qs.stringify({
                                id: val.id,
                                roleName: val.roleName,
                                isDel: 1,
                            })
                        )
                        .then(res => {
                            this.$message.success(this.$t('Deletedsuccessfully'));
                            this.queryList();
                        })
                        .catch(err => this.$message.error(err.message));
                }).catch(() => {

                });
            },
            // 翻页
            handleSizeChange(val) {
                this.table_loading = true;
                this.searchVal.pageSize = val;
                this.queryList();
            },
            handleCurrentChange(val) {
                this.table_loading = true;
                this.searchVal.pageIndex = val;
                this.queryList();
            }
        }
    }
</script>