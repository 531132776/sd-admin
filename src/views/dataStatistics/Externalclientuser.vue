<template>
    <div>
        <el-row>
            <el-col :span="24">
                <p>总用户数</p>

                <div class="progress" style="width:500px">
                    <el-progress :text-inside="true" :show-text="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)">dfsdfd</el-progress>
                </div>

            </el-col>
            <el-col :span="24" style="margin-top:20px;">
                <el-row>
                    <el-col :span="12">用户活跃度</el-col>
                    <el-col :span="12">
                        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="24">
                <div id="main" style="height: 300px"></div>
            </el-col>
            <el-col :span="24">用户信息</el-col>
            <el-col :span="12">
                <div id="userLanguage" style="height: 300px"></div>
            </el-col>
            <el-col :span="12">
                <div id="userIdentity" style="height: 300px"></div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: ''
            }
        },
        beforeCreate() {

        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                var myChart = this.$echarts.init(document.getElementById('main'));
                var userLanguage = this.$echarts.init(document.getElementById('userLanguage'));
                var userIdentity = this.$echarts.init(document.getElementById('userIdentity'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        // text: 'ECharts 入门示例',
                    },
                    //标题的文字样式
                    textStyle: {
                        align: 'right',
                        color: '#333',
                    },
                    tooltip: {},
                    // legend: {
                    //     data: ['销量'],
                    //     textStyle: {
                    //         align: 'left',
                    //         color: 'red',
                    //     },
                    // },
                    xAxis: {
                        data: [{
                            value: '',
                            // 突出周一
                            textStyle: {
                                fontSize: 20,
                                color: '#333'
                            }
                        }, "1", "2", "3", "4", "5", "6", "时间/"]
                    },
                    yAxis: {
                        type: 'value',
                        name: '浏览次数/停留时间',
                        // max: 53500
                        // max: 4000
                    },
                    series: [{
                        name: '销量',
                        type: 'line',
                        smooth: true,
                        data: [100, 1000, 500, 3000, 1500, 2500, 2000],
                        itemStyle: {
                            normal: {
                                color: 'green',
                                lineStyle: {
                                    color: 'green'
                                }
                            }
                        },
                    }]
                };
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
                // 指定图表的配置项和数据
                var option2 = {
                    title: {
                        text: '用户身份',
                        x: 'left'
                    },
                    color: ['red', 'green', 'yellow', 'blueviolet', 'gray', '#BE77FF'],
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
                                { value: 20, name: '出售20%' },
                                { value: 15, name: 'POA出租15%' },
                                { value: 5, name: 'POA出售5%' },
                                { value: 25, name: '租客25%' },
                                { value: 20, name: '买家20%' },
                                { value: 15, name: '出租15%' },
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                userLanguage.setOption(option1);
                userIdentity.setOption(option2);
                window.addEventListener("resize", function () {
                    myChart.resize();
                    userLanguage.resize();
                    userIdentity.resize();
                });
            }


        },

    }
</script>