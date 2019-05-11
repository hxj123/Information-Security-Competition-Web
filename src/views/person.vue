<template>
    <div id="person-container">
        <div class="info">
            <div class="info-item">
                <span class="label">邮箱：</span>{{email}}
                <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(1)" size="18"/>
            </div>
            <div class="info-item">
                <span class="label">昵称：</span>{{nickName}}
                <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(2)" size="18"/>
            </div>
            <div class="info-item">
                <span class="label">电话：</span>{{phone}}
                <Icon style="margin-left: 3px; cursor:pointer;" type="ios-copy-outline" @click="edit(3)" size="18"/>
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
        <MyModal :title="'请输入'+editTitle" v-on:confirm='verifyData' v-on:cancel='showModal=false;' v-if="showModal">
            <Input v-model="editContent" :placeholder="'请输入'+editTitle"/>
            <p v-if="hasError" class="input-error">输入{{editTitle}}有误，请检查</p>
        </MyModal>
        <TipModal v-on:confirm='showTip=false;' :showCancel='false' v-if="showTip">
            <p>上传成功</p>
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
            account: '8aa8c424a3b',
            nickName: '小枫',
            email: '1317490530@qq.com',
            phone: '17728832201',
            sex: '男',
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
            this.editIndex = index;
            switch(index){
                case 1:
                    this.editTitle = '邮箱';
                    break;
                case 2:
                    this.editTitle = '昵称';
                    break;
                case 3:
                    this.editTitle = '手机号';
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
                    reg = /.+?/
                    break;
                case 3:
                    reg = /^1[3|5|7|8][0-9]\d{8}$/;
                    break;
            }
            if(!reg.test(this.editContent)){
                this.hasError = true;
            }else{
                this.hasError = false;
                this.isLoading = true;
                switch(this.editIndex){
                    case 1:
                        this.email = this.editContent;
                        break;
                    case 2:
                        this.nickName = this.editContent;
                        reg = /.+?/
                        break;
                    case 3:
                        this.phone = this.editContent;
                        reg = /^1[3|5|7|8][0-9]\d{8}$/;
                        break;
                }
                this.showModal = false;
                setTimeout(()=>{
                    this.isLoading = false;
                    this.showTip = true;
                },2000);
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
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-around;
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
.info-item:last-child{
    margin-bottom: 0;
}
.label{
    color: #979797;
    font-size: 15px;
    width: 60px;
}
#avatar{
    /* position: absolute; */
    top: 100px;
    right: 0;
    margin: 60px;
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


