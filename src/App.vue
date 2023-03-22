<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    console.log(this.$route.path)
    if(this.$route.path!=='/login' && this.$route.path!=='/home') this.$router.push({name:'home'})
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1em;
  box-sizing: border-box;
}
body{
  overflow-x:hidden;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  width: 5px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
input{outline:none;}
</style>
