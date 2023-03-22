<template>
  <v-navigation-drawer
      permanent
      expand-on-hover
  >
    <!--            管理员信息-->
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="adminInfo.img_url"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Super administrator
          </v-list-item-title>
          <v-list-item-subtitle>{{ adminInfo.username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <!--功能页面-->
    <v-list
        nav
        dense
    >
      <v-list-group
          :value="true"
          prepend-icon="mdi-home"
          @click="jump('home')">
          <template v-slot:activator>
            <v-list-item-title>首页</v-list-item-title>
          </template>
      </v-list-group>
      <!--              仓库-->
      <v-list-group
          :value="false"
          prepend-icon="mdi-truck-cargo-container"
      >
        <template v-slot:activator>
          <v-list-item-title>仓库</v-list-item-title>
        </template>

        <v-list-item
            v-for="([title, name, icon], i) in module.goods"
            :key="i"
            link
            @click="jump(name)"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!--              订单-->
      <v-list-group
          :value="false"
          prepend-icon="mdi-bitcoin"
      >
        <template v-slot:activator>
          <v-list-item-title>订单</v-list-item-title>
        </template>

        <v-list-item
            v-for="([title,name, icon], i) in module.orders"
            :key="i"
            link
            @click="jump(name)"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!--              销售-->
      <v-list-group
          :value="false"
          prepend-icon="mdi-gift-outline"
      >
        <template v-slot:activator>
          <v-list-item-title>营销</v-list-item-title>
        </template>

        <v-list-item
            v-for="([title,name, icon], i) in module.sales"
            :key="i"
            link
            @click="jump(name)"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!--              客户-->
      <v-list-group
          :value="false"
          prepend-icon="mdi-clipboard-account"
      >
        <template v-slot:activator>
          <v-list-item-title>客户</v-list-item-title>
        </template>

        <v-list-item
            v-for="([title,name, icon], i) in module.client"
            :key="i"
            link
            @click="jump(name)"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!--              系统-->
      <v-list-group
          :value="false"
          prepend-icon="mdi-cog-outline"
      >
        <template v-slot:activator>
          <v-list-item-title>系统</v-list-item-title>
        </template>

        <v-list-item
            v-for="([title,name, icon], i) in module.system"
            :key="i"
            link
            @click="jump(name)"
        >
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!--              登出-->
      <v-list-item link @click="exit">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-title>登出</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "navigationDrawer",
  data(){
    return{
      module:{
        //商品
        goods: [
          ['商品更新','productUpdate'],['仓库管理','sapWm']
        ],
        //销售
        sales:[
          ['活动策划','active'],['优惠放送','coupons']
        ],
        //  订单
        orders:[
          ['订单管理','orderManagement']
        ],
        //  客户
        client:[
          ['用户中心','userCenter'],['在线沟通','linkupOl']
        ],
        //  系统
        system:[
          ['安全管理','safetyManagement'],['邮件队列管理','mailQueue']
        ],
      },
      adminInfo:{}
    }
  },
  methods:{
    jump(name){
      const fall = ['active','coupons','userCenter','mailQueue','safetyManagement']
      if(fall.includes(name)){
        return this.$emit('tiggerSnackbar')
      }
      this.$router.push({
        name:name
      })
    },
    exit(){
      localStorage.removeItem('token');
      this.$router.replace({
        name:'login'
      })
    }
  },
  computed:{
    info(){
      return this.$store.state.adminInfo
    }
  },
  watch:{
    info:{
      handler(n){
        this.adminInfo = n
      }
    }
  },
}
</script>

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>