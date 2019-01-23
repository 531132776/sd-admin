<template>
        <div class="UserTransactionData_lease">
            <el-row>
                <el-col :span="12">
                        <div>
                            <span>成交金额</span>
                            <span>成交数量</span>
                        </div>
                </el-col>
                
                <el-col :span="12">
                        <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                </el-col>
            </el-row>
            <el-row style="margin-top:30px;">
                <el-col :span="12">
                    <div id="region" style="height:300px;"></div>
                </el-col>
                <el-col :span="12">
                    <div id="Apartment" style="height:300px"></div>
                </el-col>
            </el-row>
            <el-row style="margin-top:30px;">
                    <el-col :span="12">
                        <div id="Price" style="height:300px"></div>
                    </el-col>
                    <el-col :span="12">
                        <div id="type" style="height:300px"></div>
                    </el-col>
                </el-row>
        </div>
    </template>
    <script>
        export default {
            data(){
                return{
                    value1:''
                }
            },
            mounted() {
                this.init()
            },
            methods:{
                init(){
                    var region = this.$echarts.init(document.getElementById('region'));
                    var Apartment = this.$echarts.init(document.getElementById('Apartment'));
                    var Price = this.$echarts.init(document.getElementById('Price'));
                    var type = this.$echarts.init(document.getElementById('type'));
                     // 指定图表的配置项和数据
                var option1 = {
                    title: {
                        text: '用户语言',
                    },
                    color: ['red', 'green', 'yellow'],
                    //标题的文字样式
                    textStyle: {
                        align: 'right',
                        color: 'red',
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量'],
                        textStyle: {
                            align: 'left',
                            color: 'red',
                        },
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            data: [
                                { value: 45, name: '阿拉伯语45%' },
                                { value: 20, name: '英文20%' },
                                { value: 35, name: '中文35%' },
                            ]
                        }
                    ]
                };
                var option2 = {
                    title: {
                        text: '用户语言',
                    },
                    color: ['red', 'green', 'yellow'],
                    //标题的文字样式
                    textStyle: {
                        align: 'right',
                        color: 'red',
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量'],
                        textStyle: {
                            align: 'left',
                            color: 'red',
                        },
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            data: [
                                { value: 45, name: '阿拉伯语45%' },
                                { value: 20, name: '英文20%' },
                                { value: 35, name: '中文35%' },
                            ]
                        }
                    ]
                };
                var option3 = {
                    title: {
                        text: '用户语言',
                    },
                    color: ['red', 'green', 'yellow'],
                    //标题的文字样式
                    textStyle: {
                        align: 'right',
                        color: 'red',
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量'],
                        textStyle: {
                            align: 'left',
                            color: 'red',
                        },
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            data: [
                                { value: 45, name: '阿拉伯语45%' },
                                { value: 20, name: '英文20%' },
                                { value: 35, name: '中文35%' },
                            ]
                        }
                    ]
                };
                var option4 = {
                    title: {
                        text: '用户语言',
                    },
                    color: ['red', 'green', 'yellow'],
                    //标题的文字样式
                    textStyle: {
                        align: 'right',
                        color: 'red',
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量'],
                        textStyle: {
                            align: 'left',
                            color: 'red',
                        },
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            data: [
                                { value: 45, name: '阿拉伯语45%' },
                                { value: 20, name: '英文20%' },
                                { value: 35, name: '中文35%' },
                            ]
                        }
                    ]
                };
                region.setOption(option1);
                Apartment.setOption(option2);
                Price.setOption(option3);
                type.setOption(option4);
                window.addEventListener("resize", function () {
                    region.resize();
                    Apartment.resize();
                    Price.resize();
                    type.resize();
                });
                }
            }
        }
    </script>