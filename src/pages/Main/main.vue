<template>
<div class="app">
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="color_text"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          :color="color_btn"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
<!--  背景图-->
  <canvas class="bg"></canvas>
    <div class="loginDiv">
      <h1>YOYO&middot;运营系统</h1>
        <template>
          <div class="inputDiv">
            <v-text-field
                label="admin"
                :rules="[Rules.required,Rules.userNum]"
                v-model="username"
                validate-on-blur
            ></v-text-field>
            <v-text-field
                label="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                v-model="password"
                validate-on-blur
                @keyup.enter="login"
                :rules="[Rules.required,Rules.passwordNum]"
            ></v-text-field>
          </div>
        </template>
      <template>
            <v-checkbox
                style="margin: 0;"
                v-model="checkbox"
                label="记住我"
            ></v-checkbox>
        <v-btn
            depressed
            elevation="3"
            outlined
            @click="login"
        >
          登录
        </v-btn>
      </template>
    </div>
</div>
</template>

<script>
import {reqLogin} from "@/api";
import particlesJs  from "particlesjs"
import {Base64} from "js-base64";

export default {
  name: "loginIndex",
  data(){
    return{
      Rules: {
        required:value => !!value || 'Required.',
        userNum:value => (value && value.length >= 6) || 'Min 6 characters',
        passwordNum:value => (value && value.length >= 8) || 'Min 8 characters',
      },
      //消息条
      snackbar: false,
      color_text:'success',
      color_btn:'white',
      text: 'My timeout is set to 2000.',
      timeout:2000,
      //输入框图标
      show:false,
      window:window,
      img:'https:server.yoyocat.xyz/api/manage/login.jpg',
      username:'',
      password:'',
      //记住我
      checkbox:false
    }
  },
  methods:{
    //弹出消息栏
    tiggerSnackbar(text_color,btn_color,text){
      this.color_btn = btn_color
      this.color_text = text_color
      this.text = text
      this.snackbar = true
    },
    //登录
    login(){
      reqLogin(this.username,this.password).then(res=>{
        if(res.data.status === 1){
          this.tiggerSnackbar('black','blue','登录失败，请检查用户名或密码')
      }else{
          localStorage.setItem('token',res.data.token)
          this.checkbox ? localStorage.setItem('userWord',Base64.encode(this.username)) : localStorage.setItem('userWord','')
          this.checkbox ? localStorage.setItem('tokenWord',Base64.encode(this.password)) : localStorage.setItem('tokenWord','')
          this.$router.push({
            name:'mainIndex'
          })
      }
      })
    },
  },
  watch:{
    checkbox(n){
      if(!n){
        localStorage.setItem('userWord','')
        localStorage.setItem('tokenWord','')
      }
    }
  },
  mounted() {
    //particlesJs背景选项
    this.$nextTick(()=>{
      particlesJs.init({
        selector:'.bg',
        maxParticles:125,
        color:'#717171',
        connectParticles:true
      })
    })
  //  获取密码
    if(localStorage.getItem('userWord')){
      this.checkbox = true
      this.username = Base64.decode(localStorage.getItem('userWord'))
      this.password = Base64.decode(localStorage.getItem('tokenWord'))
    }
  },
  beforeDestroy(){
    //销毁
    particlesJs.destroy()
  },
}
</script>

<style scoped>
.bg{
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  background-color: #eeeeee;
}
.loginDiv{
  position: absolute;
  left: calc(50% - 13em);
  top: calc(50% - 10em);
  /*z-index: 2;*/
  width: 26em;
  height: 20em;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(20,20,20,0);
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(50px);
}
.loginDiv h1{
  font-size: 1.5em;
  margin-top: 1em;
}
.inputDiv{
  width: 80%;
}
</style>