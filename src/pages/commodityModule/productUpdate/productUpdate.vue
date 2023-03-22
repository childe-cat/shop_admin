<template>
  <v-container fluid>
<!--    顶-->
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
    <v-row>
      <v-col cols="1" class="text-h5">仓库</v-col>
      <v-col cols="3" class="offset-8">
        <v-text-field
            prepend-inner-icon="mdi-refresh"
            append-icon="mdi-magnify"
            @click:append="search"
            @click:prepend-inner="refresh"
            v-model="goodName"
            @keyup.enter="search"
            label="product name"
            outlined
            dense
        ></v-text-field>
      </v-col>
    </v-row>
<!--    中-->
    <v-card
          class="content"
          :key="key"
    v-if="!flag">
<!--      表头-->
      <v-row
          class="text-h6 text-center table_head align-center justify-space-around"
      style="height: 3em">
        <v-col cols="1"></v-col>
        <v-col cols="1">图片</v-col>
        <v-col cols="2">分类</v-col>
        <v-col cols="2">名称</v-col>
        <v-col cols="2">介绍</v-col>
        <v-col cols="1">价格</v-col>
        <v-col cols="1">
          <v-btn
              small
              color="primary"
              @click="add_good"
          >
            <v-icon left>
              mdi-pencil-plus
            </v-icon>
            新增
          </v-btn>
        </v-col>
      </v-row>
      <v-divider style="margin-bottom: 1em;margin-top: 1em"></v-divider>
<!--      表-->
       <v-row
           class="text-center table_body justify-space-around align-center"
           style="height: 7em;"
           v-for="items in official"
           :key="items.id"
       >
         <v-col cols="1" v-text="items.id"></v-col>
         <v-col cols="1" class="d-flex justify-center">
           <v-img
               :src="items.goods_image"
               max-width="5em"
               max-height="5em"
               :aspect-ratio="1"
           >
             <template v-slot:placeholder>
               <v-row
                   class="fill-height ma-0"
                   align="center"
                   justify="center"
               >
                 <v-progress-circular
                     indeterminate
                     color="grey lighten-5"
                 ></v-progress-circular>
               </v-row>
             </template>
           </v-img>
         </v-col>
         <v-col cols="2">{{items.goods_type}}({{items.goods_category}})</v-col>
         <v-col cols="2" v-text="items.goods_name"></v-col>
         <v-col cols="2" v-text="items.goods_intro"></v-col>
         <v-col cols="1" v-text="items.goods_price"></v-col>
         <v-col cols="1" class="justify-start">
           <v-btn
               color="primary"
               elevation="5"
               small
               @click.stop="isDialog(items)"
           >
             <v-icon left>
               mdi-pencil
             </v-icon>
             编辑
           </v-btn>
         </v-col>
       </v-row>
    </v-card>
    <template v-if="flag">
      <v-sheet
          color="darken"
      >
<!--        骨架加载器-->
        <v-skeleton-loader
            class="mx-auto"
            type="table"
        ></v-skeleton-loader>
      </v-sheet>
    </template>
<!--    底-->
      <v-pagination
          v-if="official && !flag"
          v-model="pages.page"
          style="margin-top: 1em"
          :length="pages.length"
          total-visible="7"
          class="footer"
      ></v-pagination>
<!--    对话框-->
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title v-show="!or" class="text-h5">
          商品编辑
        </v-card-title>

        <v-card-title v-show="or" class="text-h5">
          商品新增
        </v-card-title>

        <v-card-text class="align-center">
          <v-row class="align-end">
            <v-col cols="3">
              <v-img
                  :src="change.goods_image"
                  aspect-ratio="1"
              >
              </v-img>
            </v-col>
            <v-col cols="9">
                <v-file-input
                    show-size
                    @change="onFileChange"
                    accept="image/*"
                    label="图片上传"
                    counter
                    v-model="file"
                ></v-file-input>
            </v-col>
          </v-row>
            <v-row class="align-center">
              <v-col cols="6">
                <v-text-field dense
                              v-model="change.goods_name"
                    label="商品名称"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field hide-spin-buttons type="number" outlined prefix="￥" label="商品价格" dense v-model="change.goods_price">
                </v-text-field>
              </v-col>
            </v-row>
          <v-row dense>
            <v-col col="5">
              <v-select
                  :items="classify1"
                  label="type"
                  solo
                  dense
                  v-model="change.goods_type"
                  @input="select"
              ></v-select>
            </v-col>
            <span class="text-h6 mt-2">=></span>
            <v-col col="5">
              <v-select
                  dense
                  :items="classify2"
                  label="category"
                  v-model="change.goods_category"
                  solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  dense
                  label="商品介绍"
                  v-model="change.goods_intro"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-textarea
                  solo
                  name="input-7-4"
                  label="详情"
                  v-model="change.goods_Details"
                  rows="4"
                  clearable
                  clear-icon="mdi-close-circle"
                  no-resize
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions v-show="!or">
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="unShelve"
          >
            下架
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="edit"
          >
            确认
          </v-btn>
        </v-card-actions>

        <v-card-actions v-show="or">
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="add"
          >
            添加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </template>

<script>
import {reqAllGoods, reqUploadImg, reqEditGood, reqDownGoods, reqSearchClassify, reqAdd_goods} from "@/api";

export default {
  name: "productUpdate",
  data(){
    return{
      //消息条
      snackbar: false,
      color_text:'success',
      color_btn:'white',
      text: 'My timeout is set to 2000.',
      timeout:2000,
      //骨架，对话框
      flag:false,
      dialog:false,
      //对话框信息
      or:true,
      goodName:'',
      change:{},
      //分页
      pages:{
        length:0,
        page:1
      },
      //预备信息
      Reserve:[],
      dsr:[],
      official: [],
      cache_image:'http://127.0.0.1/api/manage/absent.jpg',
      file:null,
      fileName:'',
      key:1,
      classify:[],
      classify1:[],
      classify2:[],
    }
  },
  methods:{
      //搜索
      search(){
        if(!this.goodName) {
          this.tiggerSnackbar('black','blue','搜索内容不能为空')
          return;
        }
        this.flag = !this.flag
      const arr = []
      this.Reserve.forEach(item=>{
        if(item.goods_name.indexOf(this.goodName) !== -1){
          arr.push(item)
        }
      })
        this.dsr = arr
        this.pages.length = Math.ceil(this.dsr.length/4)
        this.official = []
        this.official.push(...JSON.parse(JSON.stringify(this.dsr)).slice(0,4))
        setTimeout(()=>{
          this.flag = !this.official.length
          },500)
    },
    //刷新
    async refresh(){
        this.flag =true
        this.goodName = ''
      const data = await reqAllGoods()
      this.Reserve = data.data.data
      this.dsr = JSON.parse(JSON.stringify(this.Reserve))
      this.pages.length = Math.ceil(this.dsr.length/4)
      this.official = JSON.parse(JSON.stringify(this.dsr)).slice(0,4)
      setTimeout(()=>{
        this.flag = false
      },300)
    },
  //    加载对话框
    isDialog(item) {
      this.or = false
        this.change = {}
      this.file = null
        this.dialog = true
      this.change = JSON.parse(JSON.stringify(item))
      this.cache_image = this.change.goods_image

    },
    //获取所有分类
    all_class(){
      reqSearchClassify().then(res=>{
        this.classify = res.data.data
        for(let i = 0;i<this.classify.length;i++){
          // delete this.classify[i].id
          for(const [key,value] of Object.entries(this.classify[i])){
            if(value === null || value === ''){
              Reflect.deleteProperty(this.classify[i],key)
            }
          }
        }
        this.classify1 = this.classify.map((item)=>{
          return item['head']
        })
        let obj = this.classify.filter(item=>item.head === this.classify1[0])[0]
        this.classify2 = Object.values(obj).splice(2)
      })
    },
    //预览图片
    // createImage(file) {
    //   const reader = new FileReader();
    //
    //   reader.onload = e => {
    //     this.change.goods_image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // },

    //监听文件上传
    onFileChange(file){
        if(!file){
          return this.change.goods_image = this.cache_image
        }
        // this.createImage(file)
      let formData = new FormData();
      formData.append('file',file)
      reqUploadImg(formData).then(res=>{
        this.fileName = res.data.data.avatar.filename
        this.change.goods_image = 'http://127.0.0.1/api'+res.data.data.avatar.destination.substring(res.data.data.avatar.destination.indexOf('/',res.data.data.avatar.destination.indexOf('/',0)+1))+'/'+res.data.data.avatar.filename

        this.$forceUpdate()
      })
    },
    add_good(){
        this.or = true
        this.change = {}
      this.change.goods_type = this.classify1[0]
      this.change.goods_category = this.classify2[0]
      this.change.goods_image = 'http://127.0.0.1/api/manage/absent.jpg'
        this.file = null
        this.dialog = true
    },
    select(value){
      let obj = this.classify.filter(item=>item.head === value)[0]
      this.classify2 = Object.values(obj).splice(2)
      this.change.goods_category = this.classify2[0]
    },
    add(){
      console.log(this.change)
      reqAdd_goods(this.change).then(res=>{
        console.log(res.data)
        if(res.data.message === '已有相同商品') return this.tiggerSnackbar('black','blue','已有同名商品');
        if(res.data.status === 0){
          this.tiggerSnackbar('success','white','添加成功');
          reqAllGoods().then(result=>{
            this.Reserve = result.data.data
            this.dsr = JSON.parse(JSON.stringify(this.Reserve))
            this.pages.length = Math.ceil(this.dsr.length/4)
            if(this.pages.length<this.pages.page) this.pages.page -= 1
            this.official = JSON.parse(JSON.stringify(this.dsr)).slice((this.pages.page-1)*4,this.pages.page*4)
            this.key+=1
          })
        }else{
          this.tiggerSnackbar('black','blue','添加失败,请联系管理员');
        }
        this.dialog = false
      })
    },
  //  确认编辑
    edit(){
      reqEditGood(this.change).then(res=>{
        if(res.data.status !==0){
          return this.tiggerSnackbar('black','blue','编辑失败，请联系管理员');
        }else{
          for(let i = 0;i<this.official.length;i++){
            if(this.official[i].id === this.change.id){
              this.official[i] = this.change
            }
          }
          this.$forceUpdate()
        }
      })
        this.dialog = false
    },
  //  下架处理
    unShelve(){
        reqDownGoods(this.change).then(res=>{
          this.dialog = false
          if(res.data.status === 1){
            this.tiggerSnackbar('black','blue','下架失败了，请联系管理员')
            return;
          }
          this.tiggerSnackbar('success','white','下架成功')
          reqAllGoods().then(result=>{
            this.Reserve = result.data.data
            this.dsr = JSON.parse(JSON.stringify(this.Reserve))
            this.pages.length = Math.ceil(this.dsr.length/4)
            if(this.pages.length<this.pages.page) this.pages.page -= 1
            this.official = JSON.parse(JSON.stringify(this.dsr)).slice((this.pages.page-1)*4,this.pages.page*4)
            this.key+=1
          })
        })
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
    vip(){
      return (flag)=>{
        if(flag) return true
        if(!flag) return false
      }
    },
  },
  watch:{
    'pages.page':{
      handler(n){
        this.official = JSON.parse(JSON.stringify(this.dsr)).slice((n-1)*4,n*4)
      },
      immediate:true,
    },
  },
  created() {
    this.refresh()
    this.all_class()
  }
}
</script>

<style scoped>
.content{
  height: 75vh;
}
</style>