<template>
    <div id="person-container">
        <div class="info">
            <div class="info-item">
                <span class="label">邮箱：</span>{{email}}
            </div>
            <div class="info-item">
                <span class="label">昵称：</span>
                <Input v-model="nickName" maxlength="10" style="width: 120px"/>
            </div>
            <div class="info-item">
                <span class="label">电话：</span>{{phone}}
            </div>
            <div class="info-item">
                <span class="label">webId：</span>{{account}}
            </div>
            <div class="info-item">
                <span class="label">性别：</span>
                <RadioGroup v-model="sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                    <Radio label="保密"></Radio>
                </RadioGroup>
            </div>
        </div>
        <div id="avatar">
            <img src="../assets/img/avatar.jpg" alt="头像">
            个人头像
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            account: '8aa8c424a3b',
            nickName: '小枫',
            email: '1317490530@qq.com',
            phone: '17728832201',
            sex: '男'
        }
    }
}
</script>
<style scoped>
#person-container{
    width: 800px;
    height: 100%;
    padding:100px 50px;
    position: relative;
}
.info{
    overflow: auto;
}
.info-item{
    margin-bottom: 40px;
    color: #494949;
    display: flex;
    font-size: 14px;
    align-items: center;
}
.label{
    color: #979797;
    font-size: 15px;
    margin-right: 5px;
}
#avatar{
    position: absolute;
    top: 0;
    right: 0;
    margin: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
}
.ivu-input{
    font-size: 12px;
}
#avatar img{
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}
</style>


