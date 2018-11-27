<!-- 房源管理-房源列表 -->
<template>
    <div class="list">
        <p class="header">
            <el-button @click="back">{{$t('return')}}</el-button>
        </p>
        <el-table :data="list" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="name" :label="$t('name')" header-align="center" align="center">
                <template slot-scope="scope">
                    {{scope.row.name}}{{scope.row.familyName}}
                </template>
            </el-table-column>
            <el-table-column prop="nationality" :label="$t('nationality')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="passportNumber" :label="$t('passportNo')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="contactWay" :label="$t('contact')" header-align="center" align="center">
            </el-table-column>
        </el-table>

        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
        <div class="footer">
            <el-row type="flex" justify="center">
                <div class="btn">
                    <a v-bind:href="'/api/pc/buildingMemberExport/'+id" download>{{$t('derivedForm')}}</a>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: "List",
        props: ['id'],
        data() {
            return {
                loading: true,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    id: null
                },
                list: []
            };
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.reloadList();

            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.reloadList();
            },
            reloadList() {
                //获取初审房源列表
                this.$axios
                    .post("/api/pc/building/member/list", this.$qs.stringify(this.pagination))
                    .then(res => {
                        // console.log("初审房源列表", res);
                        this.list = res.dataSet || [];
                        // this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                        // this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        // this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                    })
                    .catch(error => this.$message.error(error.message))
                    .finally(() => this.loading = false);
            },
            exportXlsx() {//导出文件
                //  this.$axios.post('/api/pc/buildingMemberExport',this.$qs.stringify({id:this.$props.id}))
                //             .then(res=>console.log(res));

            }
        },
        beforeMount() {
            this.pagination.id = this.$props.id;
            this.reloadList();
        }
    };
</script>
<style scoped lang="less">
    .list {
        >.page {
            text-align: right;
            padding: 10px 0;
        }

        >.footer {

            .btn {
                width: 240px;
                height: 44px;
                background: rgba(0, 182, 96, 1);
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                >a {
                    color: #FFFFFF;
                    font-size:16px;
                }
            }

        }
    }
</style>