<template>
    <div class="modal-area">
        <div class="modal">
            <P class="title">提示</P>
            <slot></slot>
            <div class="modal-bottom">
                <Button style="margin-right: 10px" @click="cancel" v-if="showCancel">取消</Button>
                <Button type="primary" @click="confirm">确认</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['showCancel'],
    data(){
        return{
             
        }
    },
    methods:{
        cancel(){
            this.$emit('cancel');
        },
        confirm(){
            this.$emit('confirm');
        }
    }
}
</script>

<style scoped>
.modal-area{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(102, 102, 102, 0.215);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.modal{
    width: 360px;
    background-color: #fff;
    padding: 15px 25px;
    border-radius: 5px;
}
.title{
    font-size: 15px;
    margin-bottom: 12px;
    font-weight: bolder;
}
.modal-bottom{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
}
</style>
