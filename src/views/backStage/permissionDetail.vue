<template>
    <div class="permission-page permission-detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home/permissionList' }"><span class="">{{$t('permissionManager')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('Detail')}}</el-breadcrumb-item>
        </el-breadcrumb> 
        <div class="section mt-20">
            <p class="section-title">{{$t('info')}}</p>
            <ul class="block">
                <li>
                    <span class="font-s12">{{$t('permissionName')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.permissionName"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('permissionType')}}：</span>
                    <el-select v-model="permissionDetail.permissionType" :placeholder="$t('PleaseEnterContent')">
                        <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <span class="font-s12">{{$t('AccessURLaddress')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.permissionUrl"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('Permissioncodestring')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.permissionCode"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('parentNode')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.parentId" :disabled="permissionID=='add'&&permissionDetail.parentId!=''"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('currenrLevel')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.currentLevel" :disabled="permissionID=='add'&&permissionDetail.currentLevel!=''"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('sortNumber')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.sortNo"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('icon')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="permissionDetail.icon"></el-input>
                </li>
                <li v-if="permissionID!= 'add'">
                    <span class="font-s12">{{$t('whetherToDisable')}}：</span>
                    <el-select v-model="permissionDetail.isForbidden" :placeholder="$t('PleaseEnterContent')">
                        <el-option
                        v-for="item in [{value:0,label:$t('enable')},{value:1,label:$t('disable')}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li v-if="permissionID!= 'add'">
                    <span class="font-s12">{{$t('isDelete')}}：</span>
                    {{permissionDetail.isDel==0?$t('notDelete'):$t('deleted')}}
                </li>
            </ul>
        </div>

        <el-button type="success" class="mt-20 h-center width240" @click="updateDetail" v-if="permissionID!= 'add'">{{$t('confirm')}}</el-button>

        <el-button type="success" class="mt-20 h-center width240" @click="addPermission" v-if="permissionID == 'add'">{{$t('confirm')}}</el-button>

    </div>
</template>
<script>
export default {
    data(){
        return{
            permissionDetail:{},
            typeList:[
                {value:1,label:'menu'},
                {value:2,label:'button'}
            ],
            permissionID : this.$route.params.id,
        }
    },
    created(){
        if( this.permissionID != 'add'){
            this.queryDetail();
        }else{
            this.permissionDetail.parentId =JSON.parse(sessionStorage.getItem('permission')).parentId;
            this.permissionDetail.currentLevel = JSON.parse(sessionStorage.getItem('permission')).currentLevel+1;
        }
        // console.log(  this.permissionID,this.permissionDetail )        
    },
    mounted(){        
    },
    methods:{
        queryDetail(){
            this.$axios
                .post(`/api/pc/permission/detail/${this.$route.params.id}`
                )
                .then(res => {
                    this.permissionDetail = res.dataSet;
                })
                .catch(err => this.$message.error(err.message));
        },
        updateDetail(){          
            delete this.permissionDetail.createTime;
            delete this.permissionDetail.updateTime;
            this.$axios
                .post(`/api/pc/permission/update`,
                this.$qs.stringify(this.permissionDetail)
                )
                .then(res => {
                    this.$message.success(this.$t('Modifiedsuccessfully'));
                    this.queryDetail();
                    this.$router.push({name:'permissionList'})
                })
                .catch(err => this.$message.error(err.message));
        },
        addPermission(){
            this.$axios
                .post(`/api/pc/permission/add`,
                this.$qs.stringify(this.permissionDetail)
                )
                .then(res => {
                    this.$message.success(this.$t('Addedsuccessfully'));
                    this.$router.push({name:'permissionList'});
                })
                .catch(err => this.$message.error(err.message));            
        },
        getPermissionList() {
        //获取资源列表
            this.$axios
                .post("/api/pc/get/permissions")
                .then(res => {
                if (res.result == 0) {
                    this.permissionList = res.dataSet;
                    if( res.dataSet == null){
                        this.$message.warning(this.$t('Nopermission'))
                    }
                    localStorage.setItem('permissionList',JSON.stringify(res.dataSet));
                }
                })
                .catch(err => this.$message.error(err.message));
        }        
    }
}
</script>
