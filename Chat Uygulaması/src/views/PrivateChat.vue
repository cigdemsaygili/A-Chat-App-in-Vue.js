<template>
<div class="container">
  <div class="row " >
    <button class="button4" @click="signOut"><a >Çıkış Yap</a></button>
  </div>
  <div class="container div3">
    <h3 class=" text-center">Messaging</h3>
    <div class="messaging">
          <div class="inbox_msg">
            <div class="mesgs">
              <div class="msg_history">
                <div v-for="message in messageList">
                  <div :class="[message.val().author===email?'sent_msg':'received_msg']">
                    <div class="received_withd_msg">
                      <p>{{message.val().message}}</p>
                      <span class="time_date"> {{message.val().time}} {{message.val().author}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input @keyup.enter="saveMessage"  v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                  <button class="msg_send_btn" type="button" @click="saveMessage">Send</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
</div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, set, onChildChanged,onChildAdded,onChildRemoved} from "firebase/database";
export default {
    data:function(){
        return{
            message:null,
            messageList:[],
            email:"null"
        }
    },
    methods:{
        signOut(){
          const auth = getAuth();
          signOut(auth).then(() => {
            this.$router.push('/')
          }).catch((error) => {
            alert("Çıkış başarısız")
          });

        },
        saveMessage(){
            const db = getDatabase();
            const postListRef = ref(db, 'messages');
            const newPostRef = push(postListRef);
            
            var today = new Date();
            var month = today.getUTCMonth()+1
            set(newPostRef, {
                message: this.message,
                time:today.getHours()+":"+today.getMinutes()+ " " + today.getDate()+"/"+month+"/"+today.getFullYear(),
                author:this.email
            });
            this.message=null
        } 
    },
    created(){
    const db = getDatabase();
    const messagesRef = ref(db,'messages');
        onChildAdded(messagesRef,(snapshot) => {
            this.messageList.push(snapshot);
        })
        onChildRemoved(messagesRef,(snapshot)=>{
            this.messageList.pop(snapshot)
        })

        const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
              if(user){
                this.email = user.email
                console.log("E-mail:"+this.email)
              }else{
                console.log("Kullanıcı yok")
              }
            })
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user) =>{
          if(user){
              next();          
          }else{
              vm.$router.push('/')
          }
        })
      })
    }
}
</script>

<style >
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
    width: 46%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 110%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
 display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 62%;
  margin-left: 650px;


}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 10%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 70px;
  margin-right: 10px;
  
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
.div3{
  margin-top: 60px;
}

.button4{
  color: #f8f8f8;
  border-radius: 3px;
  background-color: #05728f;
}
</style>
