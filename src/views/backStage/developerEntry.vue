<template>
    <div class="developerEntry">
        <div class="header">
            <el-form :inline="true">
                <el-form-item>
                    <el-button @click="openDialog">{{$t('addBtnNew')}}</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-input v-model.trim="pagination.developers" :placeholder="$t('search')">
                        <i slot="suffix" @click="search" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-form-item> -->
            </el-form>
        </div>
        <el-table :data="houseList" :header-cell-style="{'background':'#E5E5E5','color:':'#333333'}" stripe max-height="622"
            size="mini" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column :label="$t('projectImg')" header-align="center" align="center">
                <template slot-scope="scope">
                    <img class="mainImg" v-bind:src="scope.row.projectMainImg" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="developers" :label="$t('developer')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="city" :label="$t('city')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="minHouseRent" :label="$t('minAmount')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="maxHouseRent" :label="$t('maxAmount')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="projectCode" :label="$t('projectCode')" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="projectName" :label="$t('projectName')" header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="$t('operation')" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button @click="view(scope.row)" type="text" size="small">{{$t('edit')}}</el-button>
                    <el-button @click="deleteArticle(scope.row)" type="text" size="small">{{$t('delete')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageIndex*1"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
        <!-- 查看，编辑,新增 弹窗 -->
        <el-dialog :title="$t('prompt')" :visible.sync="dialogVisible" width="60%">
            <el-form label-width="160px" class="d_flex" :model="house" :rules="rules" ref="ruleForm" >
                <el-form-item prop="projectMainImg">
                    <span slot="label"> {{$t('projectImg')}}1:</span>
                    <el-upload  name="submitFile"  class="avatar-uploader" action="/api/pc/file/upload"
                        :show-file-list="false" :on-success="handImgOneSuccess">
                        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="projectMainImg2">
                    <span slot="label">{{$t('projectImg')}}2:</span>
                    <el-upload  name="submitFile" class="avatar-uploader" action="/api/pc/file/upload"
                        :show-file-list="false" :on-success="handImgTwoSuccess" >
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="projectName">
                    <span slot="label"> {{$t('projectName')}}:</span>
                    <el-input v-model.trim="house.projectName"></el-input>
                </el-form-item>
                <el-form-item prop="developers">
                    <span slot="label">{{$t('developer')}}:</span>
                    <el-input v-model.trim="house.developers"></el-input>
                </el-form-item>
                <el-form-item prop="city">
                    <span slot="label">{{$t('housingArea')}}:</span>
                    <el-cascader placeholder="search" v-model="houseLocation" :options="locations" :change-on-select="true" :props="{'label':'cityNameCn','children':'sub','value':'cityNameCn'}" filterable ></el-cascader>
                    <el-form-item prop="community">
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="houseAcreage">
                    <span slot="label">{{$t('buildingArea')}}:</span>
                    <el-input v-model.trim="house.houseAcreage" type="number"></el-input>
                </el-form-item>
                <el-form-item prop="housingTypeDictcode">
                    <span slot="label">{{$t('HousingTypes')}}:</span>
                    <el-select v-model="house.housingTypeDictcode" :placeholder="$t('choose')">
                        <el-option v-for="item in houseTypeMap" :key="item.id" :label="item.itemValueEn" :value="item.id+''">
                                </el-option>
                        <el-option :label="$t('choose')" :value="''"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="deliveryTime">
                    <span slot="label">{{$t('makeTimeToRoom')}}:</span>
                    <el-date-picker v-model="house.deliveryTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="$t('PleaseSelect')">
                    </el-date-picker>
                </el-form-item>
                <!-- 最高金额 maxSaleAmount -->
                <el-form-item prop="maxHouseRent">
                    <span slot="label">{{$t('maxSaleAmount')}}:</span>
                    <el-input v-model.trim="house.maxHouseRent" type="number" @change="changePrice(0,house.maxHouseRent)" ></el-input>
                </el-form-item>
                <!-- minSaleAmount 最低金额 -->
                <el-form-item prop="minHouseRent">
                    <span slot="label">{{$t('minSaleAmount')}}:</span>
                    <el-input v-model.trim="house.minHouseRent" type="number" @change="changePrice(1,house.minHouseRent)"></el-input>
                </el-form-item>
                
                <el-form-item prop="openingStatus">
                    <span slot="label">{{$t('openingStatus')}}:</span>
                    <el-radio v-model="house.openingStatus" :label="1">{{$t('hasBeenOpened')}}</el-radio>
                    <el-radio v-model="house.openingStatus" :label="0">{{$t('didNotOpen')}}</el-radio>
                </el-form-item>
                <el-form-item prop="openingTime">
                    <span slot="label">{{$t('theOpeningTime')}}:</span>
                    <el-date-picker v-model="house.openingTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss":placeholder="$t('PleaseSelect')"></el-date-picker>
                </el-form-item>
                <el-form-item prop="bedroomNum">
                    <span slot="label">{{$t('bedroomNumber')}}:</span>
                    <el-select v-model="bedroom" multiple :placeholder="$t('choose')">
                        <el-option v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item" :label="item"
                                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="reraPermitNo">
                    <span slot="label">RERA permit NO:</span>
                    <el-input v-model.trim="house.reraPermitNo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submit('ruleForm')">{{$t('confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'developerEntry',
        data() {
            return {
                loading: true,
                dialogVisible: false,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    developers: '',
                    area: null,
                },
                imageUrl1:'',//主图1
                imageUrl2:'',//主图2
                houseList: [],//房源列表
                house: {
                    // id	string	否	id(更新时必传)		
                    projectName: '',	//string	否	项目名称		
                    developers: '',	//string	否	开发商		
                    houseAcreage: '',	//string	否	房屋面积		
                    city: '',	//string	否	城市		
                    community: '',//	string	否	社区		
                    subCommunity: '',//	string	否	子社区		
                    projectMainImg: '',//	string	否	项目主图1
                    projectMainImg2: '',//	string	否	项目主图2		
                    deliveryTime: '',//	string	否	交房时间		
                    housingTypeDictcode: '',//	string	否	房屋类型(取数据字典)		
                    bedroomNum: null,//	string	否	卧室数量（卧室数量 ，逗号分割）		
                    minHouseRent: null,//	string	否	最低租金/或出售价		
                    maxHouseRent: null,//	string	否	最高租金/或出售价		
                    openingStatus: 0,//	string	否	开盘状态 0未开盘 1已开盘		
                    openingTime: null,//	string	否	开盘时间
                },
                houseLocation:[],//房源区域:【城市，社区，子社区】
                locations:[],//房源区域三级联动列表
                houseTypeMap:[],//房屋类型字典
                bedroom:[],// 卧室数量(多选)
                rules: {
                    projectMainImg: [{ required: true,message: `please upload ${this.$t("projectImg")}1`,trigger: "blur"}],
                    projectMainImg2: [{ required: true,message: `please upload ${this.$t("projectImg")}2`,trigger: "blur"}],
                    projectName: [{ required: true,message: `${this.$t("PleaseEnter")} ${this.$t("projectName")}`,trigger: "blur"}],
                    developers: [{ required: true,message: `${this.$t("PleaseEnter")} ${this.$t("developer")}`,trigger: "blur"}],
                    city: [{ required: true,message: `${this.$t("choose")} ${this.$t("housingArea")}`,trigger: "change"}],
                    community:[{ required: true,message: `${this.$t("choose")} ${this.$t("community")}`,trigger: "change"}],
                    houseAcreage: [{ required: true,message: `${this.$t("PleaseEnter")} ${this.$t("buildingArea")}`,trigger: "blur"}],
                    housingTypeDictcode: [{ required: true,message: `${this.$t("choose")} ${this.$t("HousingTypes")}`,trigger: "change"}],
                    deliveryTime: [{ required: true,message: `${this.$t("choose")} ${this.$t("makeTimeToRoom")}`,trigger: "change"}],
                    minHouseRent: [{ required: true,message: `${this.$t("PleaseEnter")} ${this.$t("minSaleAmount")}`,trigger: "blur"},
                    {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}],
                    maxHouseRent: [{ required: true,message: `${this.$t("PleaseEnter")} ${this.$t("maxSaleAmount")}`,trigger: "blur"},
                    {
					    message: 'should be positive integer',
					    trigger: 'blur',
					    pattern: /^\+?[1-9]\d*$/
					}],
                    openingStatus: [{ required: true,message: `${this.$t("choose")} ${this.$t("openingStatus")}`,trigger: "change"}],
                    openingTime: [{ required: true,message: `${this.$t("choose")} ${this.$t("theOpeningTime")}`,trigger: "change"}],
                    bedroomNum: [{ required: true,message: `${this.$t("choose")} ${this.$t("housePlan")}`,trigger: "change"}],
                    reraPermitNo: [{ required: true,message: `${this.$t("PleaseEnter")} RERA permit NO`,trigger: "blur"}],
                }
            }
        },
        watch:{
            houseLocation(newValue,oldValue){//房源区域
                this.$set(this.house,'city',newValue[0]);
                this.$set(this.house,'community',newValue[1]);
                this.$set(this.house,'subCommunity',newValue[2]);
            },
            bedroom(newValue,oldValue){//卧室数量
                this.$set(this.house,'bedroomNum',newValue.toString());
            }
        },
        methods: {
            loadList() {
                this.loading = true;
                this.$axios.post('/api/pc/house/getDirectSalesPropertyList', this.$qs.stringify(this.pagination))
                    .then(res => {
                        this.houseList = res.dataSet || [];
                        this.pagination.pageIndex = res.pageInfo ? res.pageInfo.pageNum : 1;
                        this.pagination.pageSize = res.pageInfo ? res.pageInfo.pageSize : 10;
                        this.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
                    }).catch(err => this.$message.error(err.message))
                    .finally(() => this.loading = false);
            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadList();
            },
            openDialog() {
                this.dialogVisible = true;
               /** 重置房源信息 */
                this.$set(this,'imageUrl1','');
                this.$set(this,'imageUrl2','');
                this.$set(this,'houseLocation',[]);
                this.$set(this,'bedroom',[]);
                this.house = {
                    // id	string	否	id(更新时必传)		
                    projectName: '',	//string	否	项目名称		
                    developers: '',	//string	否	开发商		
                    houseAcreage: '',	//string	否	房屋面积		
                    city: '',	//string	否	城市		
                    community: '',//	string	否	社区		
                    subCommunity: '',//	string	否	子社区		
                    projectMainImg: '',//	string	否	项目主图1	
                    projectMainImg2: '',//	string	否	项目主图1
                    deliveryTime: '',//	string	否	交房时间		
                    housingTypeDictcode: '',//	string	否	房屋类型(取数据字典)		
                    bedroomNum: null,//	string	否	卧室数量（卧室数量 ，逗号分割）		
                    minHouseRent: null,//	string	否	最低租金/或出售价		
                    maxHouseRent: null,//	string	否	最高租金/或出售价		
                    openingStatus: 0,//	string	否	开盘状态 0未开盘 1已开盘		
                    openingTime: null,//	string	否	开盘时间
                }
            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadList();
            },
            view(row) {//编辑查看
                this.$axios.post('/api/pc/house/getDirectSalesDetails',this.$qs.stringify({id:row.id}))
                    .then(res => {
                        this.house = res.dataSet;
                        this.$set(this,'houseLocation',[res.dataSet.city,res.dataSet.community,res.dataSet.subCommunity]);
                        this.$set(this,'bedroom',res.dataSet.bedroomNum?res.dataSet.bedroomNum.split(','):[]);
                        this.$set(this,'imageUrl1',res.dataSet.projectMainImg);
                        this.$set(this,'imageUrl2',res.dataSet.projectMainImg2);
                        this.dialogVisible = true;
                    })
                    .catch(err => this.$message.error(err.message));
            },
            deleteArticle(row) {//删除
                this.$confirm(this.$t('Suretodelete'), this.$t('prompt'), {
                    confirmButtonText: this.$t('confirm'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post('/api/pc/house/updateDirectSalesDetails',this.$qs.stringify({id:row.id,isDel:1}))
                        .then(res => {
                            this.$message.success(this.$t('Deletedsuccessfully'));
                            this.loadList();
                        })
                        .catch(err => this.$message.error(err.message));
                });
            },
            handImgOneSuccess(res, file) {
                this.imageUrl1 = URL.createObjectURL(file.raw);
                this.$set(this.house,'projectMainImg',res.fid);
            },
            handImgTwoSuccess(res, file) {
                this.imageUrl2 = URL.createObjectURL(file.raw);
                this.$set(this.house,'projectMainImg2',res.fid);
            },
            // beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
            //     const isLt2M = file.size / 1024 / 1024 < 2;

            //     if (!isJPG) {
            //         this.$message.error('上传头像图片只能是 JPG 格式!');
            //     }
            //     if (!isLt2M) {
            //         this.$message.error('上传头像图片大小不能超过 2MB!');
            //     }
            //     return isJPG && isLt2M;
            // },
            submit(formName) {
                
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/pc/house/updateDirectSalesDetails', this.$qs.stringify(this.house))
                        .then(res => {
                            this.dialogVisible = false;
                            this.$message({ type: 'success', message: res.message });
                            this.loadList();
                        })
                        .catch(err => this.$message.error(err.message));
                } else {
                    this.$message.warning("Please complete the information!");
                    return false;
                }
                });
            },
            changePrice(code,val){  //校验最高售价与最低售价
                //code==0 maxHouseRent  code==1 最低租金 minHouseRent
                if(code==1){
                    if(val> Number(this.house.maxHouseRent) ){
                        this.$message.warning('最低金额不得高于最高金额，请重新输入');
                        this.house.minHouseRent = 0;
                    }
                }else{
                    if(val< Number(this.house.minHouseRent) ){
                    this.$message.warning('最高金额不得低于最低金额，请重新输入');
                    this.house.maxHouseRent = this.house.minHouseRent;
                }
            }
            },
            visibleChange(val){
                // console.log(val)
            }

        },
        beforeMount() {
            this.loadList();
            // let loadingInstance = this.$Loading.service({ fullscreen: true, text: 'loading', spinner: 'el-icon-loading', background: 'rgba(56, 53, 53, 0.6)' });
            //获取房源区域三级联动列表 
            let locationsPro=this.$axios.post('/api/pc/support/cities');
            //房屋类型字典
            let houseTypeMapPro = this.$axios.post(`/api/pc/dict/get/1`);
            this.$axios.all([locationsPro,houseTypeMapPro])
                       .then(res=>{
                        this.locations=res[0].dataSet;
                        this.houseTypeMap=res[1].dataSet.items;
                       })
                       .catch(err=>this.$message.error(err.message))
                       .finally(()=> this.$nextTick(() => {
                        //  loadingInstance.close();
                     }));
        }
    }
</script>
<style scoped lang="less">
    .developerEntry {
        >.header {
            margin: 5px 0;
        }

        .mainImg {
            width: 50px;
            height: 50px;
        }

        >.page {
            text-align: right;
            padding: 10px 0;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed red;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        /* .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        } */
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .el-form.d_flex{
            flex-wrap: wrap;
            .el-form-item{
                width: 45%;
            }
        }
    }
</style>

<!-- <script>
    export default {
        name: 'articleCtrl',
        data() {
            return {
                dialogVisible: false,
                dialogVisible: false,
                loading: true,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    status: null,//启用禁用
                    articleType: null
                },
                article: {
                    articleDesc: "",
                    articleName: "",
                    articleSort: 0,
                    articleType: 4,
                    bid: 0,
                    isDel: 0,
                    languageVersion: 0,
                    seoDescription: null,
                    seoKeywords: null,
                    seoTitle: null,
                    standby1: null,
                    standby2: null,
                    standby3: null,
                    standby4: null,
                    standby5: null,
                    status: 1,
                },
                articleList: []
            }
        },
        methods: {
            loadArticlelList() {//改为退款审批的接口 
                this.loading = true;
                this.$axios.post('/api/pc/article/list', this.$qs.stringify(this.pagination))
                    .then(res => {
                        console.log(res);
                        this.articleList = res.dataSet || [];
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
                this.loadArticlelList();
            },
            search() {
                this.loading = true;
                //重置pagination参数重新请求
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.loadArticlelList();
            },
            addArticle() {
                this.article = {
                    articleDesc: "",
                    articleName: "",
                    articleSort: 0,
                    articleType: 4,
                    bid: 0,
                    isDel: 0,
                    languageVersion: 0,
                    seoDescription: null,
                    seoKeywords: null,
                    seoTitle: null,
                    standby1: null,
                    standby2: null,
                    standby3: null,
                    standby4: null,
                    standby5: null,
                    status: 1,
                };
                this.dialogVisible = true;
            },
            view(row) {
                this.$axios.post(`/api/pc/article/detail/${row.articleId}`)
                    .then(res => {
                        this.article = res.dataSet;
                        this.dialogVisible = true;
                    })
                    .catch(err => this.$message.error(err.message));
            },
            deleteArticle(row) {
                this.$confirm('确定要删除该文章吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post(`/api/pc/article/delete/${row.articleId}`)
                        .then(res => {
                            this.$message.success('删除成功！');
                            this.loadArticlelList();
                        })
                        .catch(err => this.$message.error(err.message));
                });
            },
            submit() {

                this.dialogVisible = false;

                if (this.article.articleId) {// 更新

                    this.$axios.post('/api/pc/article/update', this.$qs.stringify(this.article))
                        .then(res => {
                            this.$message({ type: 'success', message: res.message });
                            this.loadArticlelList();
                        })
                        .catch(err => this.$message.error(err.message));

                } else {//新增
                    this.$axios.post('/api/pc/article/add', this.$qs.stringify({
                        articleDesc: this.article.articleDesc,
                        articleName: this.article.articleName,
                        articleSort: this.article.articleSort,
                        articleType: this.article.articleType,
                        isDel: this.article.isDel,
                        languageVersion: this.article.languageVersion,
                        seoDescription: this.article.seoDescription,
                        seoKeywords: this.article.seoKeywords,
                        seoTitle: this.article.seoTitle,
                        standby1: null,
                        standby2: null,
                        standby3: null,
                        standby4: null,
                        standby5: null,
                        status: this.article.status,
                    }))
                        .then(res => {
                            this.$message({ type: 'success', message: res.message });
                            this.loadArticlelList();
                        })
                        .catch(err => this.$message.error(err.message));
                }

            },
            handleSizeChange(val) {
                this.loading = true;
                this.pagination.pageSize = val;
                this.loadArticlelList();
            },
            handleCurrentChange(val) {
                this.loading = true;
                this.pagination.pageIndex = val;
                this.loadArticlelList();
            },
        },
        beforeMount() {
            this.loadArticlelList();
        }

    }
</script> -->