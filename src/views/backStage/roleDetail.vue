<template>
    <div class="role-page role-detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home/roleMgt' }"><span class="">{{$t('roleList')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item v-if="routeId!=='add'">{{$t('view')}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="routeId=='add'">{{$t('addBtn')}}</el-breadcrumb-item>
        </el-breadcrumb>  
        <div class="section mt-20">
            <p class="section-title">{{$t('info')}}</p>
            <ul class="block">
                <li>
                    <span class="font-s12">{{$t('roleSuperior')}}：</span>
                    <el-select v-model="roleDetail.pid" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-input :placeholder="$t('PleaseEnterContent')" v-model="roleDetail.roleName"></el-input> -->
                </li>
                <li>
                    <span class="font-s12">{{$t('roleName')}}：</span>
                    <el-input :placeholder="$t('PleaseEnterContent')" v-model="roleDetail.roleName"></el-input>
                </li>
                <li>
                    <span class="font-s12">{{$t('whetherToDisable')}}：</span>
                    <el-select v-model="roleDetail.isForbidden" :placeholder="$t('choose')">
                        <el-option
                        v-for="item in useStateSelect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li v-if="routeId!=='add'">
                    <span class="font-s12">{{$t('createTime')}}：</span>
                    <span>{{roleDetail.createTime}}</span>
                </li>
            </ul>
        </div>
        <div class="section mt-20">
            <p class="section-title">{{$t('setPermission')}}</p>
            <div class="block">

                <el-tree
                    :data="permissionList"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :default-checked-keys="showTreeArr"
                    :props="defaultProps"
                    ref="tree"
                    >
                </el-tree>
            </div>    
        </div>
        <el-button type="success" class="mt-20 h-center width240" @click="updateRoleDetail">{{$t('confirm')}}</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            checkboxGroup1:'',
            value:'',
            useStateSelect:[
                {value:0,label:this.$t('enable')},
                {value:1,label:this.$t('disable')}
            ],
            roleDetail:{
                roleName:'',
                isForbidden:0,
                isDel:0,
                createTime:''
            },
            permissionList:[],
            defaultProps: {
                children: 'children',
                label: 'permissionName'
            },
            showTreeArr:[],
            routeId:this.$route.params.id,
            permissionArr:[],
            roleList:[]
        }
    },
    created(){

    },
    mounted(){
        if( this.routeId !=='add' ){
            this.getRoleDetail();
        }
        this.getPermissionList();
        this.queryRoleList();
    },
    methods:{
        getRoleDetail(){
            this.$axios
                .post("/api/pc/role/detail/"+this.$route.params.id,
                )
                .then(res => {
                    this.roleDetail = res.dataSet;
                })
                .catch(err => this.$message.error(err.message));               
        },
        getPermissionList(){ //获取资源列表
            this.showTreeArr = [];
            this.$axios
                .post("/api/pc/show/role/permissions/"+this.$route.params.id,
                )
                .then(res => {
                    if(res.result==0){
                        this.eachList( res.dataSet );
                        this.permissionList = res.dataSet;
                    }
                })
                .catch(err => this.$message.error(err.message));  
        },    
        updateRoleDetail(){
            // 先保存角色，再保存角色权限
            if( this.$refs.tree.getHalfCheckedKeys().length>0 ){//如果只有一半选中，调用getHalfCheckedKeys()方法获取
                this.permissionArr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
            }else{
                this.permissionArr = this.$refs.tree.getCheckedKeys();//保存树形图选中的id;
            }
            let url = "/api/pc/role/update";
            let data = {
                id: this.roleDetail.id,
                roleName: this.roleDetail.roleName,
                isForbidden:this.roleDetail.isForbidden,
                pid:this.roleDetail.pid
            }
            if(this.routeId !=='add'){
                url = "/api/pc/role/update";
                data = {
                    id: this.roleDetail.id,
                    roleName: this.roleDetail.roleName,
                    isForbidden:this.roleDetail.isForbidden,
                    pid:this.roleDetail.pid
                }
            }else{
                url = "/api/pc/role/add";
                data = {
                    roleName: this.roleDetail.roleName,
                    isForbidden:this.roleDetail.isForbidden,
                    pid:this.roleDetail.pid
                }
            }
            this.$axios
                .post(url,
                    this.$qs.stringify(data)
                )
                .then(res => {
                    if(this.routeId =='add'){
                        this.roleDetail = res.dataSet;                 
                    }
                    this.updatePermission(); 
                })
                .catch(err => this.$message.error(err.message)); 
        },
        updatePermission(){
            // 调用修改权限的接口
            console.log(this.permissionArr,'调用修改权限的接口')
                // return false;
            this.$axios
                .post(`/api/pc/permission/grant/${this.permissionArr.join(',')}/${this.roleDetail.id}`,
                )
                .then(res => {
                    this.$message.success(this.$t('Setupsuccessfully'));
                    this.getPermissionList();
                    this.getRoleDetail(); 
                })
                .catch(err => this.$message.error(err.message));   
        },
              // 请求角色列表
        queryRoleList(){
            this.$axios
                .post("/api/pc/role/list",
                this.$qs.stringify(this.searchVal)
                )
                .then(res => {
                    this.roleList = res.dataSet;
                })
                .catch(err => this.$message.error(err.message));            
        },        
        eachList(arr){
            let count = 0;
            arr.forEach(one=>{
                if(one.children.length>0){
                    one.children.forEach(two=>{
                        if( two.children.length==0 ){
                            if(two.isShow){
                                this.showTreeArr.push(two.id);
                            }
                        }else if( two.children.length>0){
                            two.children.forEach(three=>{
                                
                                    if(three.children.length>0){
                                        three.children.forEach(four=>{
                                            if(four.isShow){
                                                this.showTreeArr.push(four.id);
                                            }
                                        })
                                    }else if(three.children.length==0){
                                        if(three.isShow){
                                            this.showTreeArr.push(three.id);
                                        }
                                    }
                            })
                        }
                    })
                }else if( one.children.length==0 ){
                    if(one.isShow){
                        this.showTreeArr.push(one.id);
                    }
                }
            })
        }   
    }
}
</script>
