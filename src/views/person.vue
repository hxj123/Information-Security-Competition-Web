<template>
    <div id="person-container">
        <div class="info-card">
            <div class="info">
                <div class="info-item">
                    <span class="label">邮箱：</span>{{email}}
                    <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(1)" size="18"/>
                </div>
                <div class="info-item">
                    <span class="label">电话：</span>{{phone}}
                    <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(2)" size="18"/>
                </div>
                <div class="info-item">
                    <span class="label">密码：</span>{{password}}
                    <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(3)" size="18"/>
                </div>
                <div class="info-item">
                    <span class="label">webId：</span>{{webId}}
                </div>
            </div>
            <div id="avatar">
                <img src="../assets/img/avatar.jpg" alt="头像">
                个人头像
            </div>
        </div>
        <MyModal :title="'请输入'+editTitle" v-on:confirm='verifyData' v-on:cancel='showModal=false;' v-if="showModal">
            <Input v-model="editContent" :placeholder="'请输入'+editTitle"/>
            <p v-if="hasError" class="input-error">输入{{editTitle}}有误，请检查</p>
        </MyModal>
        <TipModal v-on:confirm='showTip=false;' :showCancel='false' v-if="showTip">
            <p style="font-size:14px;">修改成功</p>
        </TipModal>
        <Loading v-if="isLoading"/>
    </div>
</template>
<script>
import MyModal from '../components/MyModal'
import TipModal from '../components/TipModal'
import Loading from '../components/Loading'
export default {
    data(){
        return {
            webId: this.$store.state.webId,
            email: this.$store.state.email,
            phone: this.$store.state.phone,
            password: this.$store.state.password,
            editIndex: 1,
            editTitle:'',
            editContent:'',
            showModal: false,
            hasError: false,
            isLoading: false,
            showTip: false
        }
    },
    methods:{
        edit(index){
            this.hasError = false;
            this.editIndex = index;
            switch(index){
                case 1:
                    this.editTitle = '邮箱';
                    break;
                case 2:
                    this.editTitle = '电话';
                    break;
                case 3:
                    this.editTitle = 'webId';
                    break;
                case 4:
                    this.editTitle = '密码';
                    break;
            }
            this.editContent = '';
            this.showModal = true;
        },
        verifyData(){
            var reg = '';
            switch(this.editIndex){
                case 1:
                    reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    break;
                case 2:
                    reg = /^1[3|5|7|8][0-9]\d{8}$/;
                    break;
                default:
                    reg = /.+?/;
                    break;
            }
            if(!reg.test(this.editContent)){
                this.hasError = true;
            }else{
                this.isLoading = true;
                switch(this.editIndex){
                    case 1:
                        this.email = this.editContent;
                        break;
                    case 2:
                        this.phone = this.editContent;
                        break;
                    case 3:
                        this.password = this.editContent;
                        break;
                }
                this.showModal = false;
                var that = this;
                this.axios({
                    method: 'post',
                    url: that.$store.state.url+'saveInfo',
                    ContentType: 'application/json',
                    data: {
                        email: that.email,
                        webid: that.webId,
                        password: that.password,
                        telephone: that.phone
                    }
                }).then(function (response) {
                    if(response.data.status == 200){
                        that.isLoading = false;
                        that.showTip = true;
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
            }
        }
    },
    components:{
        MyModal,
        TipModal,
        Loading
    }
}
</script>
<style scoped>
#person-container{
    width: 800px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.info-card{
    width: 800px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: #fafafa;
    padding: 60px 100px;
    border-radius: 5px;
}
.info{
    overflow: auto;
}
.info-item{
    margin-bottom: 36px;
    color: #494949;
    display: flex;
    font-size: 14px;
    align-items: center;
}
.info-item:last-child{
    margin-bottom: 0;
}
.label{
    color: #979797;
    font-size: 15px;
    width: 60px;
}
#avatar{
    top: 100px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
}
#avatar img{
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50px;
}
.input-error{
    margin-top: 5px;
    color:rgb(255, 47, 47);
    margin-left: 5px;
}
</style>


