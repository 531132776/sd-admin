<template>
    <div class="personal_center">
        <div class="personal_pic">
            <img v-lazy="userInfo.userLogo" alt="" :key="userInfo.userLogo">
            <div >
                <span class="name">{{userInfo.username}}</span>
                <p>{{$t('Personalpoints')}}：<i class="warning">{{userInfo.gold}}</i></p>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name:'userInfo',
    data(){
        return{
           userInfo:{}
        }
    },
    mounted(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo() {
            this.$axios
                .post("/api/pc/center/user/info")
                .then(res => {
                    this.userInfo = res.dataSet; //获取个人信息
                })
                .catch(err => this.$message.error(err.message));
            },        
    }
}
</script>

