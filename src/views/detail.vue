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
                        <DropdownItem name="1">按日查看</DropdownItem>
                        <DropdownItem name="2">按月查看</DropdownItem>
                        <DropdownItem name="3">按年查看</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <DatePicker type="date" @on-change="dateChange" :value="day" v-show="selectorType==1" placeholder="Select day" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
                <DatePicker type="month" @on-change="dateChange" :value="month" v-show="selectorType==2" placeholder="Select month" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
                <DatePicker type="year" @on-change="dateChange" :value="year" v-show="selectorType==3" placeholder="Select year" :options="getDisabledDate" :editable="false" style="width: 200px"></DatePicker>
            </div>
            <button @click="showMap=true">在地图上显示</button>
        </div>
        <div id="detail-chart">
            <div id="fan-chart"></div>
            <div id="line-chart"></div>
        </div>
        <div id="map-modal" v-show="showMap">
            <div id="map">
                <div id="map-container"></div>
                <Icon type="md-close" @click="showMap=false" color="#eee" size="30" class="close"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            day: this.getDate('day'),
            month: this.getDate('month'),
            year: this.getDate('year'),
            selectorType: 1,
            showMap: false,
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
                    series: [
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
                        data: [],
                        name: ''
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [4, 0, 19, 9, 12, 133, 0, 18, 0],
                        type: 'line',
                        color: '#77bdf7'
                    }]
                }
            }
        }
    },
    mounted(){
        this.fanChart = echarts.init(document.getElementById('fan-chart'));
        this.lineChart = echarts.init(document.getElementById('line-chart'));
        var that = this;
        this.axios({
            method: 'post',
            url: 'http://192.168.43.156:8080/showData',
            ContentType: 'application/json',
            data: {
                webid: that.$store.state.webId,
                type: 1,
                date: that.day
            }
        }).then(function (response) {
            var fanData = response.data.sectorDiagramRespList;
            var lineChartData = response.data.blineGraphRespList;
            var mapData = response.data.mapRespList;
            
            fanData = fanData.map(x=>{
                return {value: x['count'], name: x['country']}
            })
            that.dataOption.fanChartOption.series.data = fanData;
            that.fanChart.setOption(that.dataOption.fanChartOption);
        })
        .catch(function (error) {
            console.log(error);
        });
        // that.fanChart.setOption([])
        switch(this.selectorType){
            case 1:
                this.dataOption.lineChartOption.xAxis.data = ['0','3','6','9','12','15','18','21','24'];
                this.dataOption.lineChartOption.xAxis.name = '时';
                break;
            case 2:
                this.dataOption.lineChartOption.xAxis.data = ['0','5','10','15','20','25','30'];
                this.dataOption.lineChartOption.xAxis.name = '日';
                break;
            case 3:
                this.dataOption.lineChartOption.xAxis.data = ['0','2','4','6','8','10','12'];
                this.dataOption.lineChartOption.xAxis.name = '月';
                break;
        }
        
        this.fanChart.setOption(this.dataOption.fanChartOption);
        this.lineChart.setOption(this.dataOption.lineChartOption);

        var map = new AMap.Map('map-container', {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 3,
            zooms: [1, 8],
            mapStyle: 'amap://styles/dfcb6f74cce4797f4100936c07a65842'
        });
        var markerList = [];
        var address = [
            [116.406315, 39.908775],
            [16.406315, 39.908775],
            [36.406315, 59.908775],
            [56.406315, 63.908775],
            [11.406315, 59.908775],
            [16.406315, 62.908775],
            [106.406315, 29.908775],
            [117.20000,39.13333],
            [113.23333,23.16667],
            [113.51667,26.30000],
            [113.51667,30.30000],
            [115.51667,28.30000],
            [113.51667,31.30000],
            [120.20000,30.26667],
        ]
        address.forEach(x => {
            var marker = new AMap.Marker({
                icon: "http://cxyxh.top/images/anchor_point.png",
                position: x,
                offset: new AMap.Pixel(-16, -30),
            });
            markerList.push(marker);
        })
        map.add(markerList);
    },
    methods:{
        setDateSelector(val){
            this.selectorType = parseInt(val);
            switch(this.selectorType){
                case 1:
                    this.dataOption.lineChartOption.xAxis.data = ['0','3','6','9','12','15','18','21','24'];
                    this.dataOption.lineChartOption.xAxis.name = '时';
                    break;
                case 2:
                    this.dataOption.lineChartOption.xAxis.data = ['0','5','10','15','20','25','30'];
                    this.dataOption.lineChartOption.xAxis.name = '日';
                    break;
                case 3:
                    this.dataOption.lineChartOption.xAxis.data = ['0','2','4','6','8','10','12'];
                    this.dataOption.lineChartOption.xAxis.name = '月';
                    break;
            }
            // this.fanChart.setOption(this.dataOption.fanChartOption);
            this.lineChart.setOption(this.dataOption.lineChartOption);
        },
        getDate(type){
            var date = new Date().toLocaleString().replace(/\//g, '-').split(' ')[0];
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
            this.axios({
                method: 'post',
                url: 'http://10.132.10.180:8080/cheklogin',
                data: {
                    type: 1,
                    date: date
                }
            }).then(function (response) {
                if(response.data.status == 200){
                    
                }else{
                    that.hasError = true;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    computed:{
        selectorContent(){
            var content;
            switch(this.selectorType){
                case 1:
                    content = '按日查看';
                    break;
                case 2:
                    content = '按月查看';
                    break;
                case 3:
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
    background-color: rgb(253, 253, 253);
    display: flex;
    flex-direction: column;
}
#detail-header{
    width: 100%;
    padding: 40px 80px;
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
    height: 480px;
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
#map-modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(102, 102, 102, 0.315);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
#map{
    width: 1000px;
    height: 600px;
    position: relative;
}
#map-container{
    width: 100%;
    height: 100%;
    position: relative;
}
.close{
    position: absolute;
    top: 3px; 
    right: 3px;
    cursor: pointer;
    z-index: 999;
}
</style>
