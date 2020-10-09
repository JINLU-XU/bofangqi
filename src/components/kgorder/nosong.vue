<template>
    <div>
        <div class="nowj">
            <div><img src="../../assets/img/nowj.png" alt=""></div>
            <div style="font-size:18px;">什么也没有,去发现好音乐吧</div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.nowj{
    width: 100%;
    height: 400px;
    margin-top: 60px;
    &>div{
        width: 230px;
        height: 230px;
        margin: 0 auto;
    }
    &>div:nth-child(2){
        margin-top: 20px;
    }
}
</style>