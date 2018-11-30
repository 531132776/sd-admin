<template>
    <div class="personal_schedule">
        <userInfo></userInfo>
        <p class="title click-tag"  @click="getSalesment()">{{$t('MonthlyCalendar')}} <span v-if="showSingle&&permission==1">> <i class="color-primary">{{singleSalesData.username}}</i> </span></p>

        <el-date-picker
            v-model="dateMonth"
            type="month"
            :placeholder="$t('choose')" class="mb-20" @change='getDateArr'>
        </el-date-picker>

        <!-- 日历 -->
        <div class="section bg-gray">
            <ul class="d_flex calendar_header">
                <li>{{$t('Sunday')}}</li>
                <li>{{$t('Monday')}}</li>
                <li>{{$t('Tuesday')}}</li>
                <li>{{$t('Wednesday')}}</li>
                <li>{{$t('Thursday')}}</li>
                <li>{{$t('Friday')}}</li>
                <li>{{$t('Saturday')}}</li>
            </ul>
            <!-- 主管设置整体排班 -->
            <ul class="d_flex calendar_body" v-if="!showSingle &&　permission==1">
                <li v-for="(item,idx) in dateArr" :key="idx+1">
                        <span class="day" :class="item =='null'?'colorF':''">{{item!=="null"?item.day:'-'}}</span> 
                        <el-select multiple :placeholder="$t('PleaseSelect')" v-if="item!=='null'" v-model="item.idArr" :disabled="!item.canEdit" @remove-tag="removeTag" @change="removeTag">
                            <el-option
                            v-for="(item2) in salesData"
                            :key="item2.id+idx"
                            :label="item2.username"
                            :value="item2.id">
                            </el-option>
                        </el-select>
                </li>
            </ul>

            <!-- 主管修改个人排班 -->
            <ul class="d_flex calendar_body" v-if="showSingle &&　permission==1 ">
                <li v-for="(item,idx) in dateArr" :key="idx+1">
                        <span class="day" :class="item =='null'?'colorF':''">{{item!=="null"?item.day:'-'}}</span> 
                        <el-select :placeholder="$t('PleaseSelect')" v-if="item!=='null'" v-model="item.type"  :name="item.class" @change="setSingleSchedule" @focus="focusSingle(item,idx,$event)" :disabled="item.type==6&&!item.canEdit&&!item.activiteEdit">
                            <el-option
                            v-for="(item2,idx2) in VacatesSelect"
                            :key="idx2"
                            :label="item.canEdit&item2.type==-1?$t('NotClockIn'):item2.label"
                            :value="item2.type"
                            :disabled="item2.type==6&&item.canEdit">
                            </el-option>
                        </el-select>
                </li>
            </ul>

            <ul class="d_flex calendar_body" v-if="permission==0 ">
                <li v-for="(item,idx) in dateArr" :key="idx+1">
                        <span class="day" :class="item =='null'?'colorF':''">{{item!=="null"?item.day:'-'}}
                            <i class="tip color-primary" v-if="item.type==5">{{$t('rest')}}</i>    
                        </span> 
                        
                        <i class="dot" :class="item.class"></i>
                </li>
            </ul>

        </div>


        <!--  -->
        <p class="title" v-if="!showSingle &&　permission==1">{{$t('SchedulingStatistics')}}</p>
        <div class="section bg-gray" v-if="!showSingle &&　permission==1 ">
                <el-table :data="salesData"  style="width: 100%">
                    <el-table-column prop="date" :label="$t('name')" width="180">
                        <template slot-scope="scope">
                            <el-button @click="getSalesId(scope.row)">{{scope.row.username}} <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </template>    
                    </el-table-column>
                    <el-table-column prop="workday" :label="$t('workingDays')" width="180">
                    </el-table-column>
                    <el-table-column prop="restday" :label="$t('resTDays')">
                    </el-table-column>
                    <el-table-column prop="id" :label="$t('ScheduleCode')">
                    </el-table-column>
                </el-table>
        </div>

        <p class="title" v-if="showSingle || permission==0" >{{$t('MonthlyCalendar')}}</p>
        <div class="section bg-gray" v-if="showSingle || permission==0">
            <ul class="schedule-list">
                <li> <i class="dot bg-primary"></i> <span>{{$t('workingDays')}}</span> <span>{{singleSalesData.workday}} </span>{{$t('days')}}</li>
                <li> <i class="dot bg-blue"></i> <span>{{$t('resTDays')}}</span> <span>{{singleSalesData.restday}} </span>{{$t('days')}}</li>
                <li> <i class="dot bg-red"></i> <span>{{$t('absenteeism')}}</span> <span>{{singleSalesData.unworkday}} </span>{{$t('days')}}</li>
                <li> <i class="dot bg-orange"></i> <span>{{$t('Askforleave')}}</span> <span>{{singleSalesData.vacateday}} </span>{{$t('days')}}</li>
                <li> <i class="dot bg-lightgreen"></i> <span>{{$t('PaidLeave')}}</span> <span>{{singleSalesData.daysoff}} </span>{{$t('days')}}</li>
            </ul>
        </div>
        <div class="footer">
            <!-- <el-button type="warning" plain>修改</el-button> -->
            <el-button type="success" @click="submitData()" v-if="!showSingle && permission==1">{{$t('submit')}}</el-button>
            <el-button type="success" @click="submitSalerData()" v-if="showSingle && permission==1">{{$t('submit')}}</el-button>
            <el-button type="success" @click="checkIn()" v-if="permission==0" :disabled="canCheckIn">{{$t('clockIn')}}</el-button>
        </div>
    </div>
</template>


<script>
import userInfo from './userInfo.vue';
export default {
    name:'p_schedule',
    props:{
        // permission:{
        //     type: Number,
		// 	default: 0
        // }
    },
    components:{
        userInfo
    },
    data(){
        return {
            dateMonth:new Date(),
            dateArr:[],//日历数据
            salesData:[],//业务员信息
            salesArr:[],
            schedule:{},//提交排班信息
            vacatesList:[],
            tempArr:[],
            queryMonthsAgo:0,
            singleSalesData:'',//单个业务员id/name数据
            // VacatesSelect:
            // [
            //     {type:-1,label:this.$t('absenteeism')},
            //     {type:0,label:this.$t('Askforleave')},
            //     // {type:0,label:'年假'},
            //     // {type:1,label:'事假'},
            //     // {type:2,label:'病假'},
            //     {type:3,label:this.$t('PaidLeave')},
            //     // {type:4,label:'产假'},
            //     {type:5,label:this.$t('rest')},
            //     {type:6,label:this.$t('normal')},
            // ],
            singleVacates:'',//个人排班数据
            //考勤状态 -1：缺勤 0:年假 1：事假 2：病假 3：调休 4：产假 5:休息 6： 正常打卡
            showSingle:false,
            canCheckIn:false,
            permission:this.$route.params.id,
            focusSingleValue:'',
            focusSingleIndex:'',
            currentCanEdit:false
        }
    },
    computed:{
        VacatesSelect(){
            return[
                {type:-1,label:this.$t('absenteeism')},
                {type:0,label:this.$t('Askforleave')},
                // {type:0,label:'年假'},
                // {type:1,label:'事假'},
                // {type:2,label:'病假'},
                {type:3,label:this.$t('PaidLeave')},
                // {type:4,label:'产假'},
                {type:5,label:this.$t('rest')},
                {type:6,label:this.$t('normal')},
            ]
        }
    },
    created(){
    },
    mounted(){
        if( this.permission ==0 ){
            this.queryMySchedule(); //个人登录，个人排班展示
        }else{
            this.getSalesment();//主管登录，主管排班界面
        }
    },
    methods:{
        getDateArr(val){ //日历change事件
            this.queryMonthsAgo = new Date(val).getMonth() - new Date().getMonth();
            this.dateMonth = val;
            if( !this.showSingle && this.permission==1 ){
                this.getSalesment();
            }else if(this.showSingle && this.permission==1){
                this.getSalesSchedule();
            }else{
                this.queryMySchedule();
            }
            
        },
        // 获取主管下面的业务员
        getSalesment(){
            if( this.permission==1){
            var _this = this;
            this.showSingle=false;
            this.salesArr = [];
            this.dateArr = [];
            this.vacatesList = [];
            this.$axios
                .post("/api/pc/center/subordinate/position",
                    this.$qs.stringify({ queryMonthsAgo: this.queryMonthsAgo     })
                )
                .then(res => {
                    _this.salesData = res.dataSet.userInfo;
                    
                    res.dataSet.userInfo.forEach((j)=>{
                        _this.salesArr.push(j.id);
                    })
                    _this.vacatesList = res.dataSet.vacates;
                    _this.renderCale();//渲染日历
                })
                .catch(err => _this.$message.error(err.message));
            }else{
                return false;
            }
        },
        removeTag(val){ //主管
            this.computeWorkday();//实时计算排班统计
        },
        submitData(){ //主管提交整体排班
            const _this = this;
            let arr = this.dateArr; //日历数据
            let brr = this.salesData;  //业务员数据
            // console.log(arr,'arr' )
            arr.forEach((ele)=>{
                if(ele!=='null'){
                    if( ele.idArr.length < this.salesData.length ){ //如果排班id有减少
                        // 求日历排班员工id与实际员工id的差集，得出哪个员工是休息的；
                        var a = ele.idArr;
                        var b = _this.salesArr;
                        var difference = a.concat(b).filter(function(v){  //差集
                            return a.indexOf(v)==-1 || b.indexOf(v)==-1
                        })
                        _this.schedule[_this.getDate(ele.day)] = difference.join(',');
                    }
                }
            })
            this.$axios
                .post("/api/pc/center/schedule/attendance",
                    _this.schedule
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('Setupsuccessfully'));
                        this.getSalesment();
                    }
                })
                .catch(err => this.$message.error(err.message));            
        },
        getSalesId(val){
            sessionStorage.setItem('salesData',JSON.stringify(val));
            this.getSalesSchedule();
        },
        getSalesSchedule(){ //获取业务员的个人排班
            this.singleSalesData = JSON.parse(sessionStorage.getItem('salesData')) ;
            this.showSingle = true;
            this.vacatesList = [];
            this.$axios
                .post("/api/pc/center/user/attendance",
                    this.$qs.stringify({ userId: this.singleSalesData.id,queryMonthsAgo:this.queryMonthsAgo     })
                )
                .then(res => {
                    this.vacatesList = res.dataSet;
                    this.renderCale();
                })
                .catch(err => this.$message.error(err.message));            
        },
        submitSalerData(){   //提交单个业务员的修改
            const _this = this;
            let arr = this.dateArr;
            let brr = this.vacatesList;
            let submitData = {
                userId:this.singleSalesData.id,
                queryMonthsAgo:this.queryMonthsAgo,
                clocks:[],
                holidays:{}
            }
            arr.forEach((ele,i)=>{
                if(ele!="null"){
                    //如果修改以前的为正常上班，就push进
                    if( this.queryMonthsAgo < 0 || this.queryMonthsAgo==0 && ele.day <= new Date().getDate() ){
                        if( ele.type !== brr[i][_this.getDate(ele.day)] && ele.type==6 ){
                            submitData.clocks.push( _this.getDate(ele.day) );
                        }
                    }
                    if( ele.type != 6 && ele.type !=-1 ){
                        submitData.holidays[_this.getDate(ele.day)] = ele.type;
                    }
                }
            })
            if(JSON.stringify(submitData.holidays)=='{}'){
                submitData.holidays = [];
            }else{
                submitData.holidays = [submitData.holidays]
            }
            
            // console.log( submitData,'submitData'  );
            // return false;
            this.$axios
                .post("/api/pc/center/setting/attendance",
                    submitData
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('Setupsuccessfully'));
                        this.getSalesSchedule();
                        this.showSingle = true;
                    }
                })
                .catch(err => this.$message.error(err.message));               
        },
        // 如果是个人登录，查询我的考勤
        queryMySchedule(){
            const _this = this;
            this.vacatesList = [];
            this.dateArr = [];
            this.$axios
                .post("/api/pc/center/query/attendance",
                    this.$qs.stringify({queryMonthsAgo:this.queryMonthsAgo})
                )
                .then(res => {
                    this.vacatesList = res.dataSet;
                    this.renderCale();
                    // console.log( this.canCheckIn,'canCheckIn' )
                })
                .catch(err => _this.$message.error(err.message));             
        },
        checkIn(){ // 个人打卡上班
            this.$axios
                .post("/api/pc/center/clock/in",
                )
                .then(res => {
                    if(res.result==0){
                        this.$message.success(this.$t('clockInSuccess'));
                        this.queryMySchedule();
                    }
                })
                .catch(err => this.$message.error(err.message));
        },

        // 主管设置个人排班，设置为正常上班时需二次确认
        setSingleSchedule(val){                
            if(val==6){
                this.$confirm(this.$t('sureToChange'), this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    this.focusSingleValue="";
                    this.computeWorkday();
                    // 过去日期原本已打卡的，不可修改，将其他状态修改为正常上班，但还未保存的，还可以继续修改,但是保存为正常打卡后不能再修改了
                    this.$set(this.dateArr[this.focusSingleIndex],'activiteEdit',true); //
                }).catch(() => {
                    //取消就将之前的值重新赋值；                
                    this.$set(this.dateArr[this.focusSingleIndex],'type',this.focusSingleValue);    
                    this.focusSingleValue="";
                });
            }else{
                this.focusSingleValue="";
                this.computeWorkday();
            }
        },
        focusSingle(val,idx,event){
            //获取焦点时，获取当前选中的值,change事件后也会触发focus事件,保证取第一次focus的值
            if( this.focusSingleValue=="" ){
                this.focusSingleValue = val.type;
                this.focusSingleIndex = idx;
            }
        },
        renderCale(){ //根据选中的日期渲染日历
            const _this = this;
            let date = this.dateMonth;
            let day1 = new Date( date.getFullYear(),date.getMonth(),1).toLocaleDateString();
            let day2 = new Date(  new Date( date.getFullYear(), date.getMonth()+1,1)-1000*60*60*24).toLocaleDateString();
            this.dateArr = this.getAllDays(day1,day2);
            this.tempArr = [];
            for(let i=0;i<new Date(day1).getDay();i++){ //1号是否是星期一，不是就push null
                this.tempArr.push('null');
            }
            //处理后台返回的排班数据与处理的日历数据格式一样
            _this.vacatesList = this.tempArr.concat( _this.vacatesList  );
            this.dateArr.forEach((ele,i)=>{
                if(ele!=='null'){        
                    
                    // 设置日历是否可编辑
                    if( new Date().getMonth() == date.getMonth()){  //如果处于同一个月,日历大于当前天，可编辑；
                        if( new Date().getDate() <= ele.day ){ 
                            ele.canEdit = true;
                            ele.activiteEdit = true;
                        }else{
                            ele.canEdit = false;
                            ele.activiteEdit = false;
                        }
                    }else if(new Date().getMonth() < date.getMonth()){ //比目前的月份大，可编辑
                        ele.canEdit = true;
                        ele.canEdit = true;
                    }else{
                        ele.canEdit = false;
                        ele.activiteEdit = false;
                    }
                    // 整体排班页面，主管权限
                    if( !_this.showSingle && _this.permission ==1 ){
                        _this.$set( ele , 'idArr' ,new Array() ) ;//动态赋值业务员数据到日历里
                        if( _this.vacatesList[i][_this.getDate(ele.day)] !== null ){
                            var a = _this.vacatesList[i][_this.getDate(ele.day)]; //后台返回的当天休息的人id
                            var b = _this.salesArr;
                            // 获得实际上班人的id push到日历中
                            var difference = a.concat(b).filter(function(v){  //差集
                                    return a.indexOf(v)==-1 || b.indexOf(v)==-1
                            })
                            if(difference.length!==0){
                                difference.forEach((j)=>{
                                    _this.dateArr[i].idArr.push(j);
                                })
                            }
                        }else{
                            _this.salesData.forEach((j)=>{
                                _this.dateArr[i].idArr.push(j.id);
                            })     
                        } 
                    }else{
                        // 个人登录页面
                        _this.$set( ele , 'type' ,'' ) ;//动态赋值
                        let temp = _this.vacatesList[i][_this.getDate(ele.day)];
                        // console.log( new Date().getDate() ,'getday')
                        if( new Date().getDate()==ele.day && temp ==6  ){
                            this.canCheckIn = true;
                        }else if(new Date().getDate()==ele.day && temp !==6){
                            this.canCheckIn = false;
                        }
                        if( temp !== null ){
                            if( temp == 0 || temp ==1 || temp ==2 || temp ==4){
                                _this.dateArr[i].type = 0;
                                _this.dateArr[i].class = 'bg-orange';
                            }else{
                                _this.dateArr[i].type = temp;
                                if( temp == -1){ _this.dateArr[i].class = 'bg-red';}
                                else if(temp ==3){ _this.dateArr[i].class = 'bg-lightgreen'; }   
                                else if(temp ==5){ _this.dateArr[i].class = 'bg-blue'; } 
                                else if(temp ==6){ _this.dateArr[i].class = 'bg-primary'; } 
                            }
                        }
                    }
         
                }
            })
            // console.log( _this.dateArr,'日历数据'  )
            this.computeWorkday();
        },
        computeWorkday(){  //计算排班及休息的天数
            let _this = this;
            if(!_this.showSingle && _this.permission ==1){  //计算排班及休息的天数
                _this.salesData.forEach((j)=>{
                    _this.$set( j , 'workday' ,0 ) ;//动态赋值
                    _this.$set( j , 'restday' ,0 ) ;//动态赋值
                    // j.workday = 0;
                    // j.restday = 0;
                    _this.dateArr.forEach((ele)=>{
                        if( ele!=='null' ){
                            ele.idArr.forEach((i)=>{
                                if(j.id==i){
                                    j.workday++;
                                }
                            })
                        }
                    })         
                    j.restday = _this.dateArr[_this.dateArr.length-1].day - j.workday;
                }) 
            }else{
                if(_this.singleSalesData ==""){
                    _this.singleSalesData = {}
                }
                _this.singleSalesData.workday = 0; //出勤
                _this.singleSalesData.restday = 0; //休息
                _this.singleSalesData.unworkday = 0; //缺勤
                _this.singleSalesData.vacateday = 0; //请假
                _this.singleSalesData.daysoff = 0;//调休
                _this.dateArr.forEach((ele)=>{
                        if( ele!=='null' ){
                            if( ele.type == -1 ){ _this.singleSalesData.unworkday ++ } //缺勤
                            else if( ele.type == 0 ){ _this.singleSalesData.vacateday++ } //年假
                            else if( ele.type == 1 ){ _this.singleSalesData.vacateday++ } //事假
                            else if( ele.type == 2 ){ _this.singleSalesData.vacateday++ } //病假
                            else if( ele.type == 3 ){ _this.singleSalesData.daysoff++ } //调休
                            else if( ele.type == 4 ){ _this.singleSalesData.vacateday++ } //产假
                            else if( ele.type == 5 ){ _this.singleSalesData.restday++ } //休息
                            else if( ele.type == 6 ){ _this.singleSalesData.workday++ } //正常打卡
                        }
                    }) 
            }            
        },
        getAllDays(day1,day2) { //获取每月所有的星期，每日
            var getDate = function (str) {
                var tempDate = new Date();
                var list = str.split("/");
                tempDate.setFullYear(list[0]);
                tempDate.setMonth(list[1] - 1);
                tempDate.setDate(list[2]);
                return tempDate;
            }
            var date1 = getDate(day1);
            var date2 = getDate(day2);
            if (date1 > date2) {
                var tempDate = date1;
                date1 = date2;
                date2 = tempDate;
            }
            date1.setDate(date1.getDate() + 1);
            var dateArr = [];
            var i = 0;
            while (!(date1.getFullYear() == date2.getFullYear() &&
                    date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                    .getDate())) {
                var dayStr = date1.getDate().toString();
                // if (dayStr.length == 1) {
                //     dayStr = "0" + dayStr;
                // }
                var myMouth = date1.getMonth() + 1
                // dateArr[i].day = date1.getFullYear() + "/" + (myMouth < 10 ? '0' + myMouth : myMouth) + "/" +
                //     dayStr;
                dateArr[i] = {
                    day: dayStr,
                    week:this.whichWeek(date1)
                }
                // dateArr[i].week = this.whichWeek(date1)
                i++;
                date1.setDate(date1.getDate() + 1);
            }
            // dateArr.splice(0, 0, day1)
            // dateArr.push(day2);
            dateArr.splice(0, 0,{ week:this.whichWeek(day1),day:getDate(day1).getDate().toString() })
            if(new Date(day1).getDay() !==0 ){  //1号是否是周日，不是就添加数量相等的null，占位置          
                for(var i=0;i<new Date(day1).getDay();i++){
                    dateArr.unshift('null')
                }
            }
            dateArr.push( {week:this.whichWeek(day2),day:getDate(day2).getDate().toString()} )
            return dateArr;
        },
        whichWeek(date) { //获取周几
            var week;
            switch (new Date(date).getDay()) {
                case 0:
                    week = '日';
                    break;
                case 1:
                    week = '一';
                    break;
                case 2:
                    week = '二';
                    break;
                case 3:
                    week = '三';
                    break;
                case 4:
                    week = '四';
                    break;
                case 5:
                    week = '五';
                    break;
                case 6:
                    week = '六';
                    break;
            }
            return week;
        },
        getDate(val){
            let date = new Date( this.dateMonth.getFullYear(),this.dateMonth.getMonth(),val).toLocaleDateString();
            let arr = date.split('/');
            if(arr[1]<10){
                arr[1] = '0'+arr[1];
            }
            if(arr[2]<10){
                arr[2] = '0'+arr[2];
            }
            return arr.join('-');
        }
    },
    watch:{

    },
}
</script>




