<template>
    <div class="finance_page transaction_detail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home/outerUser' }"><span class="">{{$t('memberList')}}</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{$t('memberDetail')}}</el-breadcrumb-item>
        </el-breadcrumb>    

        <div class="section mt-20">
            <p class="section-title">{{$t('memberDetail')}}</p>
            <ul class="block">
                <li><span class="font-s12">{{$t('memberNumber')}}：</span>   {{memberDetail.memberCode}}</li>
                <li><span class="font-s12">{{$t('membersNickname')}}： </span>   {{memberDetail.nickname}}</li>
                <li><span class="font-s12">{{$t('telephone')}}：</span>  {{memberDetail.memberMoble }} </li>
                <li>
                    <span class="font-s12">{{$t('gender')}}：</span>
                    <i v-if="memberDetail.sex==0">{{$t('secret')}}</i>
                    <i v-if="memberDetail.sex==1">{{$t('female')}}</i>
                    <i v-if="memberDetail.sex==2">{{$t('male')}}</i>
                </li>
                <li>
                    <span class="font-s12">{{$t('memberSattus')}}：</span>  
                    <i v-if="memberDetail.state==0">{{$t('disable')}}</i>
                    <i v-if="memberDetail.state==1">{{$t('enable')}}</i>
                    <i v-if="memberDetail.state==2">{{$t('deleted')}}</i>
                </li>
                <li><span class="font-s12">{{$t('qqNo')}}：</span>  {{memberDetail.qq }} </li>
                <li><span class="font-s12">{{$t('blog')}}：</span>  {{memberDetail.blog }} </li>
                <li><span class="font-s12">{{$t('wechat')}}：</span>  {{memberDetail.wechat }} </li> <li><span class="font-s12">twitter：</span>  {{memberDetail.tuite }} </li>
                <li><span class="font-s12">{{$t('createTime')}}： </span> {{memberDetail.createTime}} </li>
                <li><span class="font-s12">{{$t('address')}}： </span>  {{memberDetail.city}}{{memberDetail.community}}{{memberDetail.subCommunity}}{{memberDetail.address}}</li>
            </ul>

            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            memberDetail:''
        }
    },
    created(){

    },
    mounted(){
        this.getMemberDetail();
    },
    methods:{
        getMemberDetail(){
            this.$axios
                .post("/api/pc/member/detail/"+this.$route.params.id,
                )
            .then(res => {
                    this.memberDetail = res.dataSet;
            })
            .catch(err => this.$message.error(err.message));               
        }
    }
}
</script>
