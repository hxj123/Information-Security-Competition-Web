<template>
    <div class="modal-area">
        <div class="loading">
            <Icon class="loading-circle" type='ios-loading' size='25'/>
            <p>上传中...</p>
        </div>
    </div>
</template>

<script>
export default {

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
.loading{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.loading-circle{
    margin-bottom: 5px;
    animation: myFrame linear 2s infinite;
}
@keyframes  myFrame{
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
</style>
