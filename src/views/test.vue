<template>
    <div>

        <div>test</div>
        <el-date-picker
        :text="'aaaa'"
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间" @change="getTESTtime" value-format="yyyy-MM-dd HH:mm:ss" ref="datePicker">
        </el-date-picker>
        
    </div>
</template>
<script>
    export default{
        data(){
            return{
                   value1:'' 
            }
        },
        methods:{
            
                getTESTtime(val){
                    // 48小时内
                    let selectTimeStr = new Date(val).getHours()*3600 + new Date(val).getMinutes()*60 + new Date(val).getSeconds();
                    let nowTimeStr = new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds();

                    // 如果是当天，选择的时间应为当前时间两小时后
                    if( new Date(val).getDate() == new Date().getDate() ){
                        if(selectTimeStr<nowTimeStr+2*3600){
                            this.$refs.datePicker.showPicker();
                            this.$message.error('Please select two hours after the current time!');   
                        }
                    }else if( new Date(val).getDate()-new Date().getDate() ==2) { //如果是最后一天,所选择的时间不能超过当前时分秒
                        if( selectTimeStr > nowTimeStr ){
                            this.$refs.datePicker.showPicker();
                            this.$message.error('Not more than 48 hours! Please reselect');      
                        }
                    }

                    console.log( 
                        new Date().getHours()<10?`0${new Date().getHours()}`:new Date().getHours(),
                         new Date().getMinutes()<10?`0${new Date().getMinutes()}`:new Date().getMinutes() ,
                         new Date().getSeconds()<10?`0${new Date().getSeconds()}`:new Date().getSeconds()
                    )
                }
        }
    }
</script>