<template>
    <div>

        <div>test</div>
        <el-date-picker
        :text="'aaaa'"
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间" @change="getTESTtime" value-format="yyyy-MM-dd HH:mm:ss" ref="datePicker">
        </el-date-picker>

        
        <!-- PC上传图片会旋转 -->
        <p>PC上传图片会旋转</p>
            <el-upload
            name="submitFile"
            :file-list="imgList"
            action="/api/pc/file/upload"
            list-type="picture-card"
            :before-upload="beforeUpLoad"
            :on-success="handleUploadSuccess">
            <i class="el-icon-plus"></i>
            </el-upload>

    </div>
</template>
<script>
import fileUtil from './fileUtil.js'
    export default{
        data(){
            return{
                   value1:'' ,
                   imageUrl:'',
                   imgList:[]
            }
        },
        mounted(){

        },
        methods:{  
            getTESTtime(val){
                    console.log( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000  )
                    // 48小时内
                    let selectTimeStr = new Date(val).getHours()*3600 + new Date(val).getMinutes()*60 + new Date(val).getSeconds();
                    let nowTimeStr = new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds();

                    // 如果是当天，选择的时间应为当前时间两小时后
                    if( new Date(val).getDate() == new Date().getDate() ){
                        if(selectTimeStr<nowTimeStr+2*3600){
                            this.$refs.datePicker.showPicker();
                            this.$message.error('Please select two hours after the current time!');   
                        }
                    }else if( new Date(val).getTime() - new Date().getTime() >2 * 24 * 60 * 60 * 1000) { //如果是最后一天,所选择的时间不能超过当前时分秒
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
            },

            handleUploadSuccess(res,file,filelist) {
                this.imgList = filelist;
            },
 
            UpLoadOnProgress() {},
 
            UploadError() {},
 
            beforeUpLoad(file) {
                console.log(file,1)
                return new Promise((resolve) => {
                    fileUtil.getOrientation(file).then((orient) => {
                        console.log( orient  )
                        if (orient && orient === 6) {
                            let reader = new FileReader()
                            let img = new Image()
                            reader.onload = (e) => {
                                img.src = e.target.result
                                img.onload = function () {
                                    const data = fileUtil.rotateImage(img, img.width, img.height)
                                    const newFile = fileUtil.dataURLtoFile(data, file.name)
                                    resolve(newFile)
                                }
                            }
                            reader.readAsDataURL(file)
                        } else {
                            resolve(file)
                        }
                    })
                })
            },

        }
    }
</script>