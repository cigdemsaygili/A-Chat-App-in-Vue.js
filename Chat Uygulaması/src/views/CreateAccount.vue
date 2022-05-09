<template>

    <div class="div">
        <div class="div2">
            <div class="form-group">
            <h1>ChatApp</h1>
        </div>
        
        <div class="form-group">
            <input type="text" id="inputName" placeholder="E-posta Adresi" v-model="email">
        </div>
        <div class="form-group">
            <input type="password" id="inputName" placeholder="Şifre" v-model="password">
        </div> 
        <div>
            <button class="button" @click="createAccount">Hesap Oluştur</button>
            <br><br>
            <button class="btn btn-success" @click="goBack">Geri Dön</button>
        </div>
        </div>  
    </div>
</template>

<script>

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
export default {

  data(){
    return{
      username:'şeyda',
      email:"",
      password:""
    }
  },
  methods:{
    writeUserData(){
        const db = getDatabase(app);
        const friendsRef = ref(db,"userList");
        const newFriendRef = push(friendsRef);

        set(newFriendRef,{
            friend:this.email
        })
    },
    createAccount(){
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
            this.writeUserData(); 
            alert("Giriş Başarılı")
            this.$router.push('/home')
        })
        .catch(() => {
            alert("Giriş Başarısız")
        });
    },
    goBack(){
        this.$router.push('/')
    }
  }
    
}
</script>


<style scoped>
.div2{
    padding-top: 200px;
}
.div{
    height: 1000px;
    background-image: url("https://cutewallpaper.org/21/website-background-images-hd/Autodesk-Wallpaper-Website-Background-Hd-Wallpapers-.jpg");
}
.inputClass{
    display: flex;
}
#inputName{
    width: 300px;
    height: 50px;
    border:2px solid rgb(29, 163, 163)  ;
    border-radius:10px;
    background-color: rgb(176, 252, 252);
}

#inputName:focus{
    outline: none;
}
#inputName::placeholder{
    color: rgb(59, 62, 65);
}
.button{
    width: 150px;
    height: 45px;
    background-color: rgb(176, 252, 252);
    border: 3px solid black;
    border-radius: 10%;
}
</style>