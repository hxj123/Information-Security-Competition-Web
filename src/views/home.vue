<template>
    <div id="container">
        <div id="main-info">
            <div class="info-item">
                <p>5493</p>
                <p>总访问次数</p>
            </div>
            <span class="line"></span>
            <div class="info-item">
                <p class="malice-color">543</p>
                <p>恶意攻击次数</p>
            </div>
            <span class="line"></span>
            <div class="info-item">
                <p>193</p>
                <p>今日新增访问</p>
            </div>
            <span class="line"></span>
            <div class="info-item">
                <p class="malice-color">23</p>
                <p>今日恶意攻击</p>
            </div>
        </div>
        <div id="main-chart">
            <div class="chart-item">
                <div id="fan-chart"></div>
                <div id="stacking-area-chart"></div>
            </div>
            <div class="chart-item">
                <div id="annular-chart"></div>
                <div id="histogram-chart"></div>
            </div>
        </div>
        <!-- <span class="line" style="height: 85%"></span> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            fanChartOption: {
                title : {
                    text: '恶意攻击占比',
                    x:'center',
                    y:'15'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: " {b}次数: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: '30',
                    top: '15',
                    data: ['总访量', '恶意攻击']
                },
                series: [
                    {
                        name: '攻击来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        color: ['#e77c36', '#5b99d6'],
                        data:[
                            {value: 543, name: '恶意攻击'},
                            {value: 5493, name: '总访量'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            stackingAreaChartOption: {
                title: {
                    text: '近一周访问',
                    top: '15',
                    left: '10'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    top: '15',
                    data:['总访问量','恶意访问']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'总访问量',
                        type:'line',
                        color: '#b2d8c6',
                        areaStyle: {
                            color: '#b2d8c6'
                        },
                        lineStyle: {
                            color: '#b2d8c6'
                        },
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'恶意访问',
                        type:'line',
                        stack: '总量',
                        color: '#e1a793',
                        areaStyle: {
                            color: '#e1a793'
                        },
                        lineStyle: {
                            color: '#e1a793',
                        },
                        data:[12, 32, 10, 13, 60, 23, 21 ]
                    }
                ]
            },
            annularChartOption: {
                title: {
                    text: '访问方式占比',
                    x: 'center',
                    y:'15'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}: {b} <br/>总访问量: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 12,
                    top: 10,
                    borderColor: '#000',
                    borderWidth: 0.5,
                    padding: [10, 18],
                    icon: "circle",
                    data:['GET','POST','PUT','DELETE','HEAD','OTHER']
                },
                series: [
                    {
                        name:'访问方式',
                        type:'pie',
                        avoidLabelOverlap: true,
                        label: {
                        },
                        center: ['50%', '60%'],
                        radius: ['45%','62%'],
                        data:[
                            {value:5326, name:'GET'},
                            {value:2224, name:'POST'},
                            {value:234, name:'PUT'},
                            {value:135, name:'DELETE'},
                            {value:7, name:'HEAD'},
                            {value:10, name:'OTHER'},
                        ]
                    }
                ]
            },
            histogramChartOption: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'
                    }
                },
                legend: {
                    data:['正常访问次数','恶意访问次数']
                },
                color: ['#5190b8','#d48265'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['亚洲','北美洲','欧洲','南美洲','非洲','大洋洲']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'正常访问次数',
                        type:'bar',
                        data:[320, 332, 301, 334, 390, 330]
                    },
                    {
                        name:'恶意访问次数',
                        type:'bar',
                        data:[120, 132, 101, 134, 90, 23, 210]
                    },
                ]
            }
        }
    },
    mounted(){
        this.fanChart = echarts.init(document.getElementById('fan-chart'));
        this.stackingAreaChart = echarts.init(document.getElementById('stacking-area-chart'));
        this.annularChart = echarts.init(document.getElementById('annular-chart'));
        this.histogramChart = echarts.init(document.getElementById('histogram-chart'));
        this.fanChart.setOption(this.fanChartOption);
        this.stackingAreaChart.setOption(this.stackingAreaChartOption);
        this.annularChart.setOption(this.annularChartOption);
        this.histogramChart.setOption(this.histogramChartOption);
    }
}
</script>

<style scoped>
#container{
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
}
#main-info{
    height:200px;
    width: 100%;
    min-width: 600px;
    background-color: rgb(249, 249, 249);
    display: flex;
    align-items: center;
}
.info-item{
    width: 25%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.info-item p:first-child{
    font-size: 34px;
}
.info-item p:last-child{
    font-size: 14px;
    color: rgb(175, 175, 175);
}
.malice-color{
    color: rgb(185, 39, 39);
}
.line{
    width: 0.8px;
    height: 75%;
    background-color: rgb(207, 207, 207);
}
#main-chart{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.chart-item{
    margin-top: 50px;
    width: 100%;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#fan-chart, #stacking-area-chart, #annular-chart, #histogram-chart{
    width: 46%;
    height: 100%;
    padding: 20px;
    background-color: rgb(248, 248, 248);
}
</style>
