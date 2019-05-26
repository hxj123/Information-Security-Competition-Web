<template>
    <div id="container">
        <div id="login">
            <div class="title">
                <span @click="mode=0;hasError=false" :class="{active: mode==0}">登录</span> / <span @click="mode=1;hasError=false" :class="{active: mode==1}">注册</span>
            </div>
            <div class="info">
                <div class="info-item">
                    <Input v-model="email" prefix="ios-contact" 
                    placeholder="输入邮箱" size="large"/>
                </div>
                <div class="info-item">
                    <Input v-model="password" prefix="md-lock" 
                    placeholder="输入密码" size="large" type="password"/>
                    <!-- <span class='tip'>密码必须由6-16位数字或字母组成</span> -->
                </div>
                <div class="info-item">
                    <Input v-model="webId" prefix="md-card" 
                    placeholder="输入webId" size="large" type="password"/>
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
            <div class="error" style="color:rgb(255, 47, 47);" v-show="hasError">账号、密码{{mode==0?'':'、手机号'}}或webId未输入或输入错误</div>
            <div class="submit" @click="login">{{text}}</div>
        </div>
        <TipModal v-on:confirm='showTip=false;' :showCancel='false' v-if="showTip">
            <p style="font-size:14px;">注册成功</p>
        </TipModal>
    </div>
</template>

<script>
import TipModal from '@/components/TipModal'
export default {
    data(){
        return {
            mode: 0,
            email: '',
            password: '',
            webId:'',
            phone:'',
            showTip: false,
            codeState:'获取验证码',
            disabled: false,
            hasError: false,
        }
    },
    computed:{
        text(){
            return this.mode==0?'登录':'注册'
        }
    },
    methods:{
        login(){
            var that = this;
            if(this.mode == 0){
                if(this.email=='' || this.password == '' || this.webId == ''){
                    this.hasError = true;
                    return;
                }
                this.axios({
                    method: 'post',
                    url: that.$store.state.url+'checkLogin',
                    data: {
                        email: this.email,
                        webid: this.webId,
                        password: this.password
                    }
                }).then(function (response) {
                    if(response.data.status == 200){
                        that.$router.push('/index/person');
                        that.$store.commit('setWebId', that.webId);
                        that.$store.commit('setPassword', that.password);
                        that.$store.commit('setEamil', that.email);
                        that.$store.commit('setPhone', response.data.data.telephone);
                    }else{
                        that.hasError = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                if(this.email=='' || this.password == '' || this.webId == '' || this.phone == ''){
                    this.hasError = true;
                    return;
                }
                this.axios({
                    method: 'post',
                    url: that.$store.state.url+'addRegister',
                    ContentType: 'application/json',
                    data: {
                        email: this.email,
                        webid: this.webId,
                        password: this.password,
                        telephone: this.phone
                    }
                }).then(function (response) {
                    if(response.data.status == 200){
                        that.$router.push('/index/person');
                        that.$store.commit('setWebId', that.webId);
                        that.$store.commit('setPassword', that.password);
                        that.$store.commit('setEamil', that.email);
                        that.$store.commit('setPhone', that.telephone);
                        this.showTip = true;
                        this.$router.push('/index/home');
                    }else{
                        that.hasError = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    },
    components:{
        TipModal
    }
}
</script>

<style scoped>
#container{
    width: 100%;
    height: 100%;
    position: relative;
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
    position: relative;
    color: #494949;
    display: flex;
    font-size: 14px;
    align-items: center;
}
.tip{
    position: absolute;
    top: 38px;
    left: 2px;
    font-size: 11px;
    color: rgb(128, 128, 128);
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

