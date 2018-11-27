<!--网站管理-商城设置 -->
<template>
        <div class="store">
          <h1>{{$t('websiteManagement')}}-{{$t('storeManagement')}}</h1>

          <p class="header"><el-button class="add" @click="addUser">{{$t('addBtn')}}</el-button></p>
            <div class="data-grid">
               <el-table
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="advertising ID">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="Banner headline">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="types of advertisement">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="Upload name of advertisement picture">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="clicks">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="focus on the number of">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="description">
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="operation">
                  </el-table-column>
              </el-table>
              <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageIndex*1"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pagination.pageSize*1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                </el-pagination>
              </div>
            </div>
  
            <!-- 新增用户 -->
            <el-dialog
              class="add-modal"
              title="添加用户"
              :visible.sync="dialogVisible"
              width="30%">
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit('formRule')">{{$t('confirm')}}</el-button>
              </span>
            </el-dialog>

        </div>
</template>
      
<script>
      export default {
        name: 'store',

        data(){
          return {
             dialogVisible:false,
             pagination:{
               pageIndex:1,
               pageSize:10,
               total:98
             }
          }
        },
        methods:{
          addUser(){
            this.dialogVisible=true;
              
          },
          submit(ref){
            // console.log(this.$refs[ref]);

          },
          handleRemove(file, fileList) {
            // console.log(file, fileList);
          },
          handlePreview(file) {
            // console.log(file);
          },
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
           async handleSizeChange(val){
            //  console.log(val)

              // try{
              //   this.loading=true;
              //   let r = await this.$axios.get(`/api/kinds/article/list/${val}/1`);
              //   this.pagination=r.data;
              //   this.loading=false;
              // }catch(e){
              //   this.pagination.list=[];
              //   this.loading=false;
              //   this.$message.error('加载失败!');
              // }
              
          },
          async handleCurrentChange(val){
            // console.log(val)
              // try{
              //   this.loading=true;
              //   let r = await this.$axios.get(`/api/kinds/article/list/${this.pagination.pageSize}/${val}`);
              //   this.pagination=r.data;
              //   this.loading=false;                
              // }catch(e){
              //   this.pagination.list=[];
              //   this.loading=false;
              //   this.$message.error('加载失败!');
              // }
          },

        }
       
      }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .store{
      >.header{
        text-align: left;
        >.add{
          background-color:#009688;
          color:#fff;
        }
      } 
    >.data-grid{
        >.page{
          text-align: right;
          padding:10px 0;
        }

    }

    }
</style>
      