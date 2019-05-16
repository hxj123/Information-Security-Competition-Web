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
                <Menu active-name="person">
                    <MenuGroup title="个人中心">
                        <MenuItem name="person" to='/index/person'>
                            <Icon type="md-person" />
                            个人信息
                        </MenuItem>
                    </MenuGroup>
                    <MenuGroup title="攻击信息">
                        <MenuItem name="journal" to='/index/journal'>
                            <Icon type="ios-bookmarks" />
                            攻击日志
                        </MenuItem>
                        <MenuItem name="detail" to='/index/detail'>
                            <Icon type="logo-angular" />
                            详细信息
                        </MenuItem>
                    </MenuGroup>
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
    height: 64px;
    background: #5b6270;
    display: flex;
    align-items: center;
    padding: 0 50px;
    justify-content: space-between;
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
    flex-grow: 1;
    display: flex;
}
#nav{
    height: 100%;
    background: #fff;
    border-right: 1px solid #eee
}
#content-area{
    width: 100%;
    min-width: 1000px;
    height: 100%;
    padding: 15px;
}
#content{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
}
</style>

