<template>
    <div id="container">
        <div id="header">
            <div id="title">
                <img id="logo" src="../assets/img/logo.png" alt="logo">
                <h1>代码混淆防御系统</h1>
            </div>
        </div>
        <div id="main">
            <div id="nav">
                <Menu active-name="home">
                    <MenuItem name="home" to='/index/home'>
                        <Icon type="md-home" />
                        网站首页
                    </MenuItem>
                    <MenuItem name="journal" to='/index/journal'>
                        <Icon type="ios-bookmarks" />
                        访问日志
                    </MenuItem>
                    <MenuItem name="detail" to='/index/detail'>
                        <Icon type="logo-angular" />
                        详细信息
                    </MenuItem>
                    <MenuItem name="person" to='/index/person'>
                        <Icon type="md-person" />
                        个人信息
                    </MenuItem>
                </Menu>
            </div>
            <div id="content-area">
                <div id="content">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        }
    }
</script>
<style scoped>
#container{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
#header{
    width: 100%;
    height: 64px;
    background: #5b6270;
    display: flex;
    align-items: center;
    padding: 0 50px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
}
#title{
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 36px;
    color: #e6e6e6;
    font-size: 11px;
}
#logo{
    height: 100%;
    width: auto;
    margin-right: 5px;
}
#main{
    height: calc(100% - 64px);
    position: relative;
    display: flex;
    margin-top: 64px;
}
#nav{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    border-right: 1px solid #eee
}
#content-area{
    width: calc(100% - 240px);
    height: 100%;
    padding: 15px;
    margin-left: 240px;
    overflow: auto;
}
#content{
    width: 100%;
    min-height: 100%; 
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
}
</style>

