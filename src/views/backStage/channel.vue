<!--网站管理-频道管理 -->
<template>
  <div class="channel">
    <div class="header">
      <el-button @click="addChannel">{{$t('addBtnNew')}}</el-button>
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
    <el-table :data="channelList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
      size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column prop="channelName" :label="$t('channelName')" header-align="center" align="center">
      </el-table-column>
      <el-table-column :label="$t('channelType')" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.channelType|boothTypeF}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('channelStatus')" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.channelState===0">{{$t('enable')}}</span>
          <span v-else>{{$t('disable')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('createTime')" header-align="center" align="center">
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('channelName')}}:</span>
              <el-input v-model="channel.channelName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('channelAlias')}}:</span>
              <el-input v-model="channel.channelAliasName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('channelType')}}:</span>
              <el-select v-model="channel.channelType">
                <el-option :label="$t('ad')" :value="1"></el-option>
                <el-option label="买家出租" :value="2"></el-option>
                <el-option label="买家出销" :value="3"></el-option>
                <el-option label="卖家出租" :value="4"></el-option>
                <el-option label="卖家出售" :value="5"></el-option>
                <el-option label="友情链接" :value="6"></el-option>
                <el-option :label="$t('Rent')" :value="7"></el-option>
                <el-option :label="$t('Sale')" :value="8"></el-option>
                <el-option label="新楼盘" :value="9"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('channelStatus')}}:</span>
              <el-select v-model="channel.channelState">
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
              <el-select v-model="channel.languageVersion">
                <el-option label="chinese" :value="0"></el-option>
                <el-option label="english" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('isDelete')}}</span>
              <el-select v-model="channel.isDel">
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
              <el-input v-model="channel.createBy" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('createTime')}}:</span>
              <el-date-picker v-model="channel.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
                disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('updateOne')}}:</span>
              <el-input v-model="channel.updateBy" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item>
              <span slot="label">{{$t('updateTime')}}:</span>
              <el-date-picker v-model="channel.updateTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"
                disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <span slot="label">{{$t('sort')}}:</span>
              <el-input v-model="channel.channelSort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item>
              <span slot="label">{{$t('channelDes')}}:</span>
              <el-input v-model="channel.channelDesc" type="textarea" resize="none"></el-input>
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
    name: 'channel',
    data() {
      return {
        dialogVisible: false,
        loading: true,
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
        },
        channel: {
          channelAliasName: "",
          channelDesc: "",
          channelName: "",
          channelSort: 0,
          channelState: 1,
          channelType: 3,
          createBy: null,
          createTime: "",
          isDel: 0,
          languageVersion: 0,
          updateBy: null,
          updateTime: "",
        },
        channelList: []
      }
    },
    methods: {
      loadChannelList() {//改为退款审批的接口 
        this.loading=true;
        this.$axios.post('/api/pc/channel/list', this.$qs.stringify(this.pagination))
          .then(res => {
            // console.log(res);
            this.channelList = res.dataSet || [];
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
        this.loadChannelList();
      },
      search() {
        this.loading = true;
        //重置pagination参数重新请求
        this.pagination.pageIndex = 1;
        this.pagination.pageSize = 10;
        this.loadChannelList();
      },
      addChannel() {
        this.channel = {
          bid: 0,
          channelAliasName: "",
          channelDesc: "",
          channelName: "",
          channelSort: 0,
          channelState: 1,
          channelType: 3,
          createBy: null,
          createTime: "",
          isDel: 0,
          languageVersion: 0,
          updateBy: null,
          updateTime: "",
        };
        this.dialogVisible = true;
      },
      view(row) {
        this.$axios.post(`/api/pc/channel/detail/${row.channelId}`)
          .then(res => {
            this.channel = res.dataSet;
            this.dialogVisible = true;
          }).catch(err => this.$message.error(err.message));
      },
      submit() {
        this.dialogVisible = false;
        if (this.channel.id) {//更新
          this.$axios.post('/api/pc/channel/update', this.$qs.stringify({
            channelName: this.channel.channelName,//	string	是	频道名称		
            //channelAliasName:this.channel.channelAliasName,//	string	是	频道别名		
            channelType: this.channel.channelType,//	string	是	频道描述		
            channelDesc: this.channel.channelDesc,	//string	是	频道类型（1：PC网站，2：触屏端，3：App）		
            languageVersion: this.channel.languageVersion, //	string	是	语言版本（0：中文，1：英文）默认为0		
            id: this.channel.id,//	string	是	频道表ID		
            channelState: this.channel.channelState,//	string	是	频道的状态（0：不启用，1：启用）		
            channelSort: this.channel.channelSort,//	string	是	排序		
            isDel: this.channel.isDel
          }))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadChannelList();
            })
            .catch(err => this.$message.error(err.message));
        } else {//新增 
          this.$axios.post('/api/pc/channel/add', this.$qs.stringify(this.channel))
            .then(res => {
              this.$message({ type: 'success', message: res.message });
              this.loadChannelList();
            })
            .catch(err => this.$message.error(err.message));
        }


      },
      handleSizeChange(val) {
        this.loading = true;
        this.pagination.pageSize = val;
        this.loadChannelList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.pagination.pageIndex = val;
        this.loadChannelList();
      },
    },
    beforeMount() {
      this.loadChannelList();
    }
  }
</script>
<style scoped lang="less">
  .channel {
    >.header {
      margin: 5px 0;
    }

    >.page {
      text-align: right;
      padding: 10px 0;
    }
  }
</style>