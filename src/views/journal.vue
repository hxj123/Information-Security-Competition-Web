<template>
    <div id="container">
        <div id="top">
            <div class="email-swicth">
                <p style="margin-right:5px">是否自动向邮件发送日志信息</p>
                <i-switch v-model="emailSwicth" @on-change="switchChange" size="small"/>
            </div>
            <Input placeholder="输入搜索内容" style="width: 220px;">
                <Icon type="ios-search" slot="suffix" />
            </Input>
        </div>
        <Table :data="tableData" :columns="tableColumns" ref="table" stripe></Table>
        <div class="table-bottom">
            <p></p>
            <Page :total="pageSize" :page-size="9" :current="1" @on-change="changePage" v-if="pageSize>8"></Page>
            <Button @click="exportData" type="primary" v-if="pageSize>0 ">导出csv文件</Button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            pageSize: 0,
            emailSwicth: false,
            tableData: [],
            tableColumns: [
                {
                    title: '攻击者IP',
                    key: 'ip',
                },
                {
                    title: '攻击来源',
                    key: 'address'
                },
                {
                    title: '攻击时间',
                    key: 'time',
                    sortable: true
                },
                {
                    title: '操作系统',
                    key: 'os'
                },
                {
                    title: '访问类型',
                    key: 'type',
                    filters: [
                        {
                            label: '正常访问',
                            value: 1
                        },
                        {
                            label: '恶意访问',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.type === '正常访问';
                            } else if (value === 2) {
                                return row.type === '恶意访问';
                            }
                        }
                },
            ]
        }
    },
    mounted(){
        this.pageSize = 10;
        this.emailSwicth = false;
        this.getTableData(1);
    },
    methods: {
        switchChange(flag){
            
        },
        getTableData(page) {
            var ips = ['39.110.208.47', '46.120.208.44','39.114.208.67', '39.116.208.25',
                    '26.145.208.45', '39.110.208.23','32.10.208.47', '23.8.20.47',
                    '173.10.23.90', '39.110.208.57'];
            var addrs = ['墨西哥', '巴黎','伦敦', '洛杉矶','北京', '成都','内蒙古', '法国',
                        '墨西哥', '硅谷'];
            var times = ['2019-05-25','2018-04-25','2019-04-09','2019-03-17','2019-01-17',
                     '2018-09-25','2018-04-27','2018-02-25', '2019-01-30','2018-01-17'];
            var oss = ['windos 10', 'windos 10', 'Unbuntu 16.04', 'Centos 7', 'windos 7',
                    'windos 10', 'Centos 8', 'windos 7', 'Unbuntu 16.04', 'windos 10'];
            var types = ['正常访问', '正常访问','正常访问', '恶意访问','正常访问', '恶意访问',
                    '正常访问', '正常访问','正常访问', '恶意访问']
            for(var i = 0;i < 9;i++){
                this.tableData.push({
                    ip: ips[i],
                    address: addrs[i],
                    time: times[i],
                    os: oss[i],
                    type: types[i]
                })
            }
        },
        changePage(page){
            this.getTableData(vapagel);
        },
        exportData(){
            this.$refs.table.exportCsv({
                filename: '日志文件'
            });
        }
    }
}
</script>
<style scoped>
#container{
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px 40px;
}
.ivu-table-overflowX{ overflow: hidden;}
#top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}
.email-swicth{
    display: flex;
    align-items: center; 
    margin-bottom: 10px;
    font-size: 14px;
}
.table-bottom{
    width: 100%;
    height: 48px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
