<template>
    <div id="container">
        <div class="email-swicth">
            <p style="margin-right:5px">是否自动向邮件发送日志信息</p>
            <i-switch v-model="emailSwicth" @on-change="switchChange" size="small"/>
        </div>
        <Table :data="tableData" :columns="tableColumns" ref="table" stripe></Table>
        <div class="table-bottom">
            <p></p>
            <Page :total="pageSize" :page-size="8" :current="1" @on-change="changePage" v-if="pageSize>8"></Page>
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
                    key: 'time'
                },
                {
                    title: '操作系统',
                    key: 'os'
                },
            ]
        }
    },
    mounted(){
        this.pageSize = 50;
        this.emailSwicth = false;
        this.getTableData(1);
    },
    methods: {
        switchChange(flag){
            
        },
        getTableData(page) {
            for(var i = 0;i < 9;i++){
                this.tableData.push({
                    ip: '129.24.125.29',
                    address: '北京',
                    time: '2019-1-25',
                    os: 'window10'
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
    padding: 25px 40px;
}
.ivu-table-overflowX{ overflow: hidden;}
.email-swicth{
    display: flex;
    align-items: center; 
    margin-bottom: 10px;
    font-size: 14px;
}
.table-bottom{
    width: 100%;
    height: 53px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
