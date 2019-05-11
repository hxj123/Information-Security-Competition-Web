<template>
    <div id="container">
        <div id="login">
            <div class="title">
                <span @click="mode=0" :class="{active: mode==0}">登录</span> / <span @click="mode=1" :class="{active: mode==1}">注册</span>
            </div>
            <div class="info">
                <div class="info-item">
                    <Input v-model="email" prefix="ios-contact" 
                    placeholder="输入邮箱" size="large"/>
                </div>
                <div class="info-item">
                    <Input v-model="password" prefix="md-lock" 
                    placeholder="输入密码" size="large"/>
                </div>
                <div class="info-item">
                    <Input v-model="webId" prefix="md-card" 
                    placeholder="输入webId" size="large"/>
                </div>
                <div class="info-item" v-if="mode==1">
                    <Input v-model="phone" prefix="md-phone-portrait" 
                    placeholder="输入手机号" size="large"/>
                </div>
                <!-- <div class="info-item" v-if="mode==1">
                    <Input v-model="code" prefix="md-code" maxlength="11"
                    placeholder="输入验证码" size="large"/>
                    <Button class="getCode" size="large" @click="sendMessage" :disabled="disabled">{{codeState}}</Button>
                </div> -->
            </div>
            <div class="submit" @click="login">{{text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            mode: 0,
            email: '',
            password: '',
            webId:'',
            phone:'',
            codeState:'获取验证码',
            disabled: false
        }
    },
    computed:{
        text(){
            return this.mode==0?'登录':'注册'
        }
    },
    methods:{
        sendMessage(){
            if((/^1[3|5|7|8][0-9]\d{8}$/.test(this.phone))){
                var minute = 60;
                this.disabled = true;
                var id = setInterval(()=>{
                    this.codeState = minute + 's后可重发';
                    minute--;
                    if(minute < 0) {
                        clearInterval(id);
                        this.disabled = false;
                        this.codeState = '获取验证码';
                    }
                },1000)
            }
        },
        login(){
            if(this.mode == 0){
                this.axios({
                    method: 'post',
                    url: 'http://10.132.10.180:8080/cheklogin',
                    data: {
                        "email": "1061666806@qq.com",
                        "webid": "11111111",
                        "password": "11111111"
                    }
                }).then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                // this.$router.push('/index/person');
            }
        }
    }
}
</script>

<style scoped>
#container{
    width: 100%;
    height: 100%;
    background: url(../assets/img/login_bg.jpg);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#login{
    width: 320px;
    /* height: 360px; */
    border-radius: 5px;
    background: rgb(239, 234, 255);
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title{
    width: 100%;
    text-align: center;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
}
.title span{
    cursor: pointer;
}
.active{
    color: rgb(39, 103, 155);
}
.info{
    overflow: auto;
    width: 240px;
    padding: 0 2px;
}
.info-item{
    margin-bottom: 20px;
    color: #494949;
    display: flex;
    font-size: 14px;
    align-items: center;
}
.label{
    font-size: 15px;
    width: 70px;
    font-weight: 500;
}
.getCode{
    margin-left: 5px;
    font-size: 12px;
    height: 36px;
}
.submit{
    width: 240px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 16px;
    background: rgb(39, 103, 155);
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 25px;
}
</style>

