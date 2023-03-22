<template>
 <v-container fluid class="card">
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
   <v-row style="height: 3em" class="align-center">
     <v-col cols="1">
       <p class="text-h5">概览</p>
     </v-col>
     <v-col>
       <p>{{dateFormat(date)}}</p>
     </v-col>
   </v-row>
   <v-row>
     <v-col cols="3"
            v-for="(item,i) in wd" :key="i">
       <v-card
           class="mx-auto"
           max-width="344"
           outlined
       >
         <v-list-item three-line>
           <v-list-item-content>
             <v-list-item-subtitle align="center" v-text="item.name" />
             <v-list-item-title class="text-h5 mb-1" align="center" v-text="item.num" />
           </v-list-item-content>
         </v-list-item>
       </v-card>
     </v-col>
   </v-row>
   <v-divider style="margin: 1em 0 1em 0"></v-divider>
   <v-row>
     <v-col cols="6" id="dataMain" style="height: 60vh"></v-col>
     <v-col cols="4" class="offset-1" style="height: 60vh">
       <div>
         <v-col cols="12" id="hotWord" style="height: 60vh"></v-col>
       </div>
     </v-col>
   </v-row>
   <v-divider style="margin: 1em 0 1em 0"></v-divider>
   <v-footer
       dark
       padless
       v-bind="localAttrs"
       class="footer"
   >
     <v-card
         class="flex"
         flat
         tile
         width="100%"
     >
       <v-card-title class="teal">
         <strong class="subheading">YO猫&middot;商城运营中心</strong>

         <v-spacer></v-spacer>

         <v-btn
             v-for="icon in icons"
             :key="icon"
             class="mx-4"
             dark
             icon
         >
           <v-icon size="24px">
             {{ icon }}
           </v-icon>
         </v-btn>
       </v-card-title>
     </v-card>
   </v-footer>
 </v-container>
</template>

<script>
import {reqMeterNum, reqHotWord} from "@/api";

export default {
  name: "HomeIndex",
  data(){
    return{
      //消息条
      snackbar: false,
      color_text:'success',
      color_btn:'white',
      text: 'My timeout is set to 2000.',
      timeout:2000,
      variant:'absolute',
      icons: [
        'mdi-wechat',
      ],
      //时间显示
      date:new Date(),
      //顶部数据
      wd:[
        {name:'用户人数',num:0},
        {name:'订单数量',num:0},
        {name:'销售金额',num:0}
      ],
      //销售数据
      days:[],
      sales_name:[],
      sales:[],
    //  显示热词数量
      hot_num:3,
    }
  },
  methods:{
    //获取时间
    dateFormat(time) {
      let date=new Date(time);
      let year=date.getFullYear();
      let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"年"+month+"月"+day+'日'+' '+hours+":"+minutes+":"+seconds;
    },
    //获取getDay
    day(timeout){
      let dat = new Date(timeout).getDay()
      let days = new Map([
        [0, '周日'],
        [1, '周一'],
        [2, '周二'],
        [3, '周三'],
        [4, '周四'],
        [5, '周五'],
        [6, '周六'],
      ])
      return days.get(dat)
    },
    //eChats图
    echartshotShell(){
      let options = {
        title: {
          text: '热销'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.sales_name
        },
        grid: {
          left: '',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.days
        },
        yAxis: {
          type: 'value'
        },
        series : this.sales
      }
      this.$echarts.init(document.getElementById('dataMain')).setOption(options)
    },
    echartshotWord(){
      let options = {
        title: {
          text: '热词汇总'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataset: [
          {
            dimensions: ['name', 'score',],
            source: this.hot_word
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'score', order: 'desc' }
            }
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis: {},
        series: {
          type: 'bar',
          encode: { x: 'name', y: 'score' },
          datasetIndex: 1
        }
      }
      this.$echarts.init(document.getElementById('hotWord')).setOption(options)
    },
    //弹出消息栏
    tiggerSnackbar(text_color,btn_color,text){
      this.color_btn = btn_color
      this.color_text = text_color
      this.text = text
      this.snackbar = true
    },
  },
  computed:{
    localAttrs () {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
    order(){
      return this.$store.state.order
    },
    adminInfo(){
      return this.$store.state.adminInfo
    }
  },
  watch:{
    order:{
      deep:true,
      handler(){
        this.wd[1].num = this.$store.state.homeData[0]
        this.wd[2].num = this.$store.state.homeData[1]
        const all_order = this.$store.state.order
        let endTime1 = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1);
        const timeNow = endTime1/1000
        const timestamp = timeNow - 604800;
        let sales_arr = all_order.filter(item=>item.time>=timestamp)
        let arr = [[],[],[],[],[],[],[]]
        //获取销售量最高的x件商品
        let sales_temporary = []
        sales_arr.forEach(item=>{
          let temporary_arr = JSON.parse(item.blurb)
          sales_temporary.push(...temporary_arr)
        })
        let re = new Map()
        let sales_tem = sales_temporary.reduce((list, item)=>{
          if(re.has(item.name)){
            re.get(item.name).num += item.num
          }else{
            let a = {...item}
            list.push(a)
            re.set(item.name, a)
          }
          return list
        }, []).sort((a,b)=>{return b.num - a.num}).slice(0,3);
        sales_tem.forEach(item=>this.sales_name.push(item.name))
        //分出每天的销售数据
        arr.forEach((item,i)=>{
          let obj = sales_arr.filter(items=>(timeNow - i*86400) > items.time &&  items.time> (timeNow - (i+1)*86400))
          arr[i].push(obj)
        })
        //拆分每天的订单
        let obj1 = [[],[],[],[],[],[],[]]
        for(let i = 0;i<7;i++){
          for(let j = 0;j<arr[i].length;j++){
            let arr1 = arr[i][j]
            let obj2 = []
            for(let k = 0;k<arr1.length;k++){
              let obj3 = []
              let str = JSON.parse(arr1[k].blurb)
              //拆分订单中的商品
              str.forEach(items=>{
                obj3.push({name:items.name,num:items.num})
              })
              obj2.push(...obj3)
            }
            //每日订单商品售出累计
            let res = new Map()
            obj1[i] = obj2.reduce((list, item)=>{
              if(res.has(item.name)){
                res.get(item.name).num += item.num
              }else{
                let o = {...item}
                list.push(o)
                res.set(item.name, o)
              }
              return list
            }, []);
          }
        }
        let ado = []
        this.sales_name.forEach((items,i)=>{
          //创建商品对象
          ado[i] = {
            name: items,
            type: 'line',
            stack: 'Total',
            data: [0,0,0,0,0,0,0]
          }
          //统计商品每天销量
          obj1.forEach((item,g)=>{
            for(let k = 0;k<item.length;k++){
              if((item[k].name).indexOf(items)> -1 ){
                ado[i].data[g] = item[k].num
              }
            }
          })
        })
        this.sales = ado
        //获取日期数据
        for(let i = 0;i<7;i++){
          this.days[i] = this.day((timeNow - i*86400)*1000)
        }
        //渲染折线图
        this.$nextTick(()=>{
          this.echartshotShell()
        })
      }
    },
    adminInfo:{
      handler(n){
        if(JSON.stringify(n) === "{}"){
          this.tiggerSnackbar('black','blue','请重新登陆')
          setTimeout(()=>{
            this.$router.push({name:'login'})
          },1500)
        }
      }
    }
  },
  created() {
    this.$store.dispatch('getOrder')
    this.$store.dispatch('getAdmin')
    //获取用户人数
    reqMeterNum('user').then(res=>{
      if(res.data.status===0){
        this.wd[0].num = res.data.data
      }else{
        this.tiggerSnackbar('black','blue','获取数据失败，请刷新试试吧')
        setTimeout(()=>{
          this.$router.push({name:'login'})
        },1500)
      }
    })
  //  获取热词数据
    reqHotWord(this.hot_num).then(res=>{
      const temporary = res.data.data
      let arr = []
      for(let i = 0;i<this.hot_num;i++){
        arr[i] = [temporary[i].hotterm,temporary[i].num]
      }
      this.hot_word = arr
      this.echartshotWord()
    })
  },
  mounted() {
    let _this = this
    this.timer = setInterval(()=>{
      _this.date = new Date();
    },1000)
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  },
}
</script>

<style scoped>
.card{
  height: 100%;
}
</style>