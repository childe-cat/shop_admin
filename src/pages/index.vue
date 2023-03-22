<template>
  <v-card class="app">
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
<!--    左侧菜单栏-->
    <navigationDrawer @tiggerSnackbar="tiggerSnackbar"/>
<!--    -->
    <v-row no-gutters>
      <v-col md="12">
        <v-card
            class="content"
            elevation="3"
            outlined
        >
          <router-view></router-view>

        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import navigationDrawer from "@/components/navigationDrawer/navigationDrawer";

export default {
  name: "mainIndex",
  components:{
    navigationDrawer
  },
  data(){
    return{
      //消息条
      snackbar: false,
      color_text:'success',
      color_btn:'white',
      text: 'My timeout is set to 2000.',
      timeout:2000,
    }
  },
  methods:{
    //弹出消息栏
    tiggerSnackbar(){
      this.color_btn = 'blue'
      this.color_text = 'black'
      this.text = '功能正在开发，敬请期待'
      this.snackbar = true
    },
  }
}
</script>

<style scoped>
.app{
  height: 100vh;
  display: flex;
}
.content{
  height: 98vh;
  margin: 1vh 0.5em 0 1em;
}
</style>