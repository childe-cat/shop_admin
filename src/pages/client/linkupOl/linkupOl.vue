<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <template>
          <v-card
              elevation="0"
              class="mx-auto"
          >
            <v-card-title>
              {{to_user.nickname}}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 50vh;overflow-y: auto;background-color: rgb(250, 250, 250);border-radius: 1em">
              <v-row
                  v-for="item in chat_list"
                  :key="item.id"
                  :class="[item.from_user === userInfo.username ? ['flex-row-reverse','my-1'] : 'my-1']">
                <!--              头像-->
                <v-col cols="1">
                  <v-avatar>
                    <img
                        :src="[item.from_user === userInfo.username ? userInfo.img_url : to_user.avatar]"
                        alt="John"
                    >
                  </v-avatar>
                </v-col>
                <!--              内容-->
                <v-col cols="10 px-0">
                  <v-col :style="{float: item.from_user === userInfo.username ? 'right' : 'left'}" class="px-0" v-if="item.send_img" cols="2">
                    <v-img aspect-ratio="1" eager :src="item.send_img"></v-img>
                  </v-col>
                  <div v-if="item.send_text" :class="[item.from_user === userInfo.username ? 'from' : 'to']">
                    <v-col class="chat py-1 mt-2"
                           :style="{backgroundColor: item.from_user === userInfo.username ? 'green' : 'white',color:item.from_user === userInfo.username ? 'white' : 'black'}"
                    >{{item.send_text}}</v-col>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="my-2"></v-divider>
            <v-card-text class="py-0 px-0" style="height: 25vh">
              <v-col class="py-0" cols="12">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        @click="upFile()"
                        v-bind="attrs"
                        v-on="on"
                    >mdi-image-outline</v-icon>
                  </template>
                  <span>图片</span>
                </v-tooltip>
                &nbsp;
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        @click="upLink()"
                        v-bind="attrs"
                        v-on="on"
                    >mdi-link-plus</v-icon>
                  </template>
                  <span>商品链接</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    class="mytext"
                    solo
                    rows="5"
                    no-resize
                    name="input-7-4"
                    background-color="rgb(250, 250, 250)"
                    append-icon="mdi-comment"
                ></v-textarea>
              </v-col>
            </v-card-text>
            <v-card-actions
                class="py-0 justify-end">
              <v-btn
                  class="mt-5 font-weight-bold"
                  text
                  color="teal accent-4"
              >
                发送
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
      <v-col cols="3">
        <template>
          <v-card
              class="mx-auto"
          >
            <v-toolbar
                color="deep-purple accent-4"
                dark
                dense
            >
              <v-toolbar-title>客户沟通</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list
                max-height="48vh"
                min-height="12vh"
                style="overflow-y: auto"
                subheader>
              <v-subheader>当前在线</v-subheader>

              <v-list-item
                  v-for="chat in recent"
                  :key="chat.nickname"
              >
                <v-list-item-avatar>
                  <v-img
                      :alt="`${chat.username} avatar`"
                      :src="chat.avatar"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="chat.nickname"></v-list-item-title>
                  <span style="zoom:0.6;">2022-7-1 12:00:00</span>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-badge
                      color="green"
                      dot
                  >
                    <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
                      mdi-message-outline
                    </v-icon>
                  </v-badge>
                </v-list-item-icon>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list
                max-height="39vh"
                min-height="12vh"
                style="overflow-y: auto"
                subheader>
              <v-subheader>历史聊天</v-subheader>

              <v-list-item
                  v-for="chat in user_list"
                  :key="chat.username"
              >
                <v-list-item-avatar>
                  <v-img
                      :alt="`${chat.nickname} avatar`"
                      :src="chat.img_url"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="chat.nickname"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {reqChatList} from "@/api";

export default {
  name: "linkupOl",
  data:()=>({
    name:'Jason One',
    window:window,
    to_user:{},
    chat_list:[],
    dataURL:'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    recent: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        nickname: 'Ali Connors',
        username:'l-test@qq.com',
        active:true,
      },
    ],
    user_list: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      }
    ],
  }),
  methods:{
    //发送图片
    async upFile(){
      const [file_image] = await window.showOpenFilePicker({
        types:[
          {
            description:'图片类型',
            accept:{"image/*":['.png','.gif','.jpeg','.jpg']}
          }
        ]
      });
      const file = await file_image?.getFile()
      const fileReader = new FileReader()
      fileReader.onload = (e) =>{
        this.dataURL = e.target.result
      }
      fileReader.readAsDataURL(file)
      this.$forceUpdate()
      console.group('获取到的文件')
      console.log(file_image)
      console.log(file)
      console.groupEnd()
    },
    //发送链接
    upLink(){

    },
    //建立webSocket链接,获取聊天记录
    get_chat(){
      reqChatList(this.to_user).then(res=>{
        this.chat_list = res.data.data
        console.log(this.chat_list)
      })
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.adminInfo
    },
  },
  watch:{
    '$store.state.userInfo':{
      deep:true,
      handler(n){
        this.user_list = n
        this.to_user = this.recent[0]
      }
    }
  },
  created() {
    this.get_chat()
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.2);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.5);
}
.chat{
  border-radius: 2em;
  position: relative;
}
.from{
  display: inline-block;width: auto;height: auto;float:right;max-width: 40em;
}
.to{
  display: inline-block;width: auto;height: auto;max-width: 40em;
}
</style>