<template>
    <div class="div">
        <div class="div2">
            <div class="form-group ">
            <h1>ChatApp'e Hoşgeldin</h1>
            <router-link to="/signIn" tag="button" class="button" active-class="active">Giriş Yap </router-link>
        </div>
        <div class="form-group">
            <router-link to="/createAcc" tag="button" class="button" active-class="active">Hesap Oluştur </router-link>
        </div>
        </div>
        
    </div>
</template>
<script>
import {eventBus} from "../main"
export default {
    data(){
        return{
            compSignIn:"app-sign-in",
            compUserInfo:"app-user-information"
        }
    }
}
</script>
<style>
.div2{
    padding-top: 250px;
}
.div{
    height: 1000px;
    background-image: url("https://cutewallpaper.org/21/website-background-images-hd/Autodesk-Wallpaper-Website-Background-Hd-Wallpapers-.jpg");
}
.button{
    width: 150px;
    height: 45px;
    background-color: rgb(176, 252, 252);
    border: 3px solid black;
    border-radius: 10%;
}
</style>