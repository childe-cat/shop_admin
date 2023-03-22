<template>
  <v-card class="app">
<!--    左侧菜单栏-->
    <navigationDrawer />
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