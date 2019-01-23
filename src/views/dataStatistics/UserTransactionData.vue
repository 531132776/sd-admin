<template>
    <div class="UserTransactionData">
       
        <el-tabs :tab-position="tabPosition" class="tabs_header">
                <el-tab-pane label="出租">
                        <UserTransactionDatalease></UserTransactionDatalease>
                </el-tab-pane>
                <el-tab-pane label="出售">
                        <UserTransactionDataSell></UserTransactionDataSell>
                </el-tab-pane>
              </el-tabs>
    </div>
</template>
<script>
    import UserTransactionDataSell from './UserTransactionData_Sell'
    import UserTransactionDatalease from './UserTransactionData_lease'
    export default{
        data(){
            return {
                tabPosition:'top'
            }
        },
        components:{
            UserTransactionDataSell,
            UserTransactionDatalease
        }
    }
</script>
<style lang="less" >
    .UserTransactionData{
        .tabs_header{
            .el-tabs__nav-wrap::after{
                height: 0px;
                background:none;
            }
        }
    }
</style>