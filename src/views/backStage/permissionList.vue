<template>
    <div class="permission-page">
        <div class="section">
            <p class="section-title">{{$t('permissionManager')}}</p>
                <el-button class="mb-20" type="success" @click="add()">{{$t('addBtn')}}</el-button>
            <div class="block">
                <el-tree
                    :data="permissionList"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button 
                            type="text"
                            size="mini"
                            @click="() => add(data)">
                            {{$t('addBtn')}}
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => goToDetail(data)">
                            {{$t('Detail')}}
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                            {{$t('delete')}}
                        </el-button>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
let id = 1000;
export default {
    
    data(){
        return{
            permissionList:[],
            defaultProps: {
                children: 'children',
                label: 'permissionName'
            }
        }
    },
    created(){

    },
    mounted(){
        this.getPermissionList();
    },
    methods:{
        getPermissionList(){ //获取资源列表
            this.$axios
                .post("/api/pc/permission/list",
                )
                .then(res => {
                    if(res.result==0){
                        this.permissionList = res.dataSet;
                    }
                })
                .catch(err => this.$message.error(err.message));  
        },
        goToDetail(data) {
            this.$router.push({name:'permissionDetail',params:{id:data.id}})
        },
        add(data){
            if(data){
                console.log(data)
                // sessionStorage.setItem('parentId',data.id);
                sessionStorage.setItem('permission',JSON.stringify({
                    parentId:data.id,
                    currentLevel:data.currentLevel
                }));
            }else{
                // sessionStorage.setItem('parentId',-1);
                sessionStorage.setItem('permission',JSON.stringify({
                    parentId:-1,
                    currentLevel:1
                }));
            }
            this.$router.push({name:'permissionDetail',params:{id:'add'}})
        },
        remove(node, data) {
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);

        this.$confirm(this.$t('Suretodeletetherole'), this.$t('prompt'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning'
        }).then(() => {
            this.$axios
                .post(`/api/pc/permission/delete/${data.id}`,
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('Deletedsuccessfully'));
                        this.getPermissionList();
                    }
                    
                })
                .catch(err => this.$message.error(err.message));                   
        }).catch(() => { });                               
        },
    }
}
</script>

