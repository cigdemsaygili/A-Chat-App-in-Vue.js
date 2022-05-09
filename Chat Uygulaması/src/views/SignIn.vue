<template>
    <div class=" div">
        <div class="div2">
            <div class="form-group">
            <h3>Giriş Yap</h3>
            <input type="text" id="inputName" placeholder="E-posta Adresi" v-model="email">
        </div>

        <div class="form-group">
            <input type="password" id="inputName" placeholder="Şifre" v-model="password">
            <br><br>
            <button class="btn btn-primary" @click="signIn">Giriş Yap</button>
            <br><br>
            <button class="btn btn-success" @click="goBack">Geri Dön</button>
        </div>
        </div>
    </div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAw6rcVUqpw5AvHwNxrGL_Mt4HhGITbbrQ",
  authDomain: "chatapp-473dd.firebaseapp.com",
  projectId: "chatapp-473dd",
  storageBucket: "chatapp-473dd.appspot.com",
  messagingSenderId: "584576108987",
  appId: "1:584576108987:web:049e338ccfb268d2dfdc9e",
  measurementId: "G-LHN310CZ2H"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default {
    data(){
        return{
            email:"",
            password:"",
            link:null
        }
    },
    methods:{
        signIn(){
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
                alert("Giriş Başarılı!")
                this.$router.push({path:'/home'})
            })
            .catch(() => {
                alert("e-posta adresinizin başında boşluk varsa siliniz")
            });
        },
        goBack(){
            this.$router.push('/')
        }
    },
    created(){
        
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