<template>
    <div id="container">
        <div id="detail-header">
            <div id="date-selector">
                <Dropdown class="selector" @on-click="setDateSelector">
                    <a href="javascript:void(0)" class="selector-text">
                        {{selectorContent}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="1">自定义</DropdownItem>
                        <DropdownItem name="2">按日查看</DropdownItem>
                        <DropdownItem name="3">按月查看</DropdownItem>
                        <DropdownItem name="4">按年查看</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <DatePicker type="daterange" @on-change="dateChange" :value="dateRange" v-show="selectorType==1" :options="getDisabledDate" placeholder="Select date" style="width: 200px"></DatePicker>
                <DatePicker type="date" @on-change="dateChange" :value="date" v-show="selectorType==2" placeholder="Select day" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
                <DatePicker type="month" @on-change="dateChange" :value="month" v-show="selectorType==3" placeholder="Select month" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
                <DatePicker type="year" @on-change="dateChange" :value="year" v-show="selectorType==4" placeholder="Select year" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
            </div>
            <button>在地图上显示</button>
        </div>
        <div id="detail-chart">
            <div id="fan-chart"></div>
            <div id="line-chart"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dateRange: [this.getDate('day'),this.getDate('day')],
            date: this.getDate('day'),
            month: this.getDate('month'),
            year: this.getDate('year'),
            selectorType: 1,
            getDisabledDate:{
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            dataOption:{
                fanChartOption: {
                    title : {
                        text: '攻击来源占比',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}: {b} <br/>总次数: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京','上海','墨西哥','伦敦','其它']
                    },
                    series : [
                        {
                            name: '攻击来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'北京'},
                                {value:310, name:'上海'},
                                {value:234, name:'墨西哥'},
                                {value:135, name:'伦敦'},
                                {value:148, name:'其它'}
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
                lineChartOption: {
                    title : {
                        text: '攻击次数/时间',
                        x:'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        color: '#4682B4'
                    }]
                }
            }
        }
    },
    mounted(){
        var fanChart = echarts.init(document.getElementById('fan-chart'));
        var lineChart = echarts.init(document.getElementById('line-chart'));
        fanChart.setOption(this.dataOption.fanChartOption);
        lineChart.setOption(this.dataOption.lineChartOption);
    },
    methods:{
        setDateSelector(val){
            this.selectorType = parseInt(val);
        },
        getDate(type){
            var date = new Date().toLocaleString().replace(/\//, '-');
            switch(type){
                case 'month':
                    date = date.split('-');
                    date = date[0] + '-' + date[1];
                    break;
                case 'year':
                    date = date.split('-')[0]+'';
                    break;
            }
            return date;
        },
        dateChange(date){
            
        }
    },
    computed:{
        selectorContent(){
            var content;
            switch(this.selectorType){
                case 1:
                    content = '自定义';
                    break;
                case 2:
                    content = '按日查看';
                    break;
                case 3:
                    content = '按月查看';
                    break;
                case 4:
                    content = '按年查看';
                    break;
            }
            return content;
        }
    }
}
</script>

<style scoped>
#container{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}
#detail-header{
    width: 100%;
    padding: 40px 50px;
}
#date-selector{
    display: inline-flex;
}
.selector{
    width: 120px;
    color: black;
    padding: 3px 10px;
    background-color: rgb(250, 250, 250);
    border: 1px solid rgb(214, 214, 214);
    border-radius: 3px;
    margin-right: 20px;
}
.selector-text{
    height: 24px;
    color: #000;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
button{
    background: rgb(250, 250, 250);
    outline: none;
    border: 1px solid rgb(214, 214, 214);
    padding:5px 15px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    float: right;
}
button:hover{
    background: rgb(240, 240, 240);
}
#detail-chart{
    display: flex;
    flex-grow: 1;
    padding: 0 50px;
    align-items: center;
    justify-content: space-around;
}
#fan-chart{
    width: 45%;
    height: 80%;
}
#line-chart{
    width: 45%;
    height: 80%;
    color: rgb(117, 177, 255);
}
</style>
