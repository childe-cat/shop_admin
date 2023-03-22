<template>
<v-container fluid class="container justify-space-between">
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
<!--  头-->
  <v-row dense>
    <v-col class="text-h5">类目</v-col>
    <v-col class="text-right">

    </v-col>
  </v-row>
<!--  类目-->
  <template>
    <v-simple-table
    fixed-header
    height="42vh"
    class="mt-5"
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left col-2">
            分类
          </th>
          <th class="text-left col-8">
            类型
          </th>
          <th class="col-1">

          </th>
          <th class="col-1">
            <v-btn
                elevation="2"
                outlined
                color="indigo"
                small
                @click.stop="add_class"
            >新增</v-btn>
          </th>
        </tr>
        </thead>
        <tbody :key="key">
        <tr
            v-for="items in thirdCategory"
            :key="items[0]"
        >
          <td>{{ items[1] }}</td>
          <td>
            <v-chip
                class="ma-2"
                color="green"
                outlined
                v-for="item in items.splice(2)"
                :key="item"
            >
              {{ item }}
            </v-chip>
          </td>
          <td class="justify-center">
            <v-btn
                elevation="5"
                small
                color="primary"
                @click.stop="isDialog(items)"
            >编辑</v-btn>
          </td>
          <td>
            <v-btn
                elevation="5"
                color="primary"
                small
                @click="delClass(items)"
            >删除</v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </template>
<!--  商品上下架-->
  <v-row class="mb-0" dense>
    <v-col cols="3"><span class="text-h5">下架商品</span>&nbsp;&nbsp;&nbsp;<span class="text-h6">({{this.goods_num}})</span>
    </v-col>
    <v-col cols="3" class="offset-6">
      <v-text-field
          append-icon="mdi-magnify"
          @click:append="search"
          v-model="goodName"
          @keyup.enter="search"
          label="product name"
          outlined
          dense
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row dense v-if="unShelve.length>0">
    <v-col cols="5">
      <v-card height="35vh" elevation="0">
        <v-row class="align-center">
          <v-col cols="3" class="ml-3">
            <v-btn
                color="primary"
                elevation="5"
                @click="release"
            >
              重新发布
            </v-btn>
          </v-col>
          <v-col cols="8" class="text-right">
              <v-text-field
                  counter
                  label="intro"
                  v-model="unDetail.goods_intro"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="py-0">
          <v-col cols="3" class="py-0">
            <v-img v-if="unDetail.goods_image" :src="unDetail.goods_image" alt="商品图片" contain height="8em" aspect-ratio="1"></v-img>
            <v-skeleton-loader
                v-if="unDetail.length===0 && !unDetail.goods_image"
                type="image"
                height="8em"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="11" class="py-0">
                <v-textarea
                    outlined
                    counter
                    no-resize
                    rows="4"
                    name="input-7-4"
                    label="details"></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="7"
           :key="key_num">
      <template>
        <v-simple-table
            fixed-header
            height="33vh"
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                名称
              </th>
              <th class="text-left">
                分类
              </th>
              <th class="text-left">
                类型
              </th>
              <th class="text-left">
                销量
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in unShelve"
                :key="item.id"
                :class="{'active':item.active}"
                @click="isActive(item)"
            >
              <td>{{ item.goods_name }}</td>
              <td>{{ item.goods_type }}</td>
              <td>{{ item.goods_category }}</td>
              <td>{{ item.goods_sold }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-col>
  </v-row>
  <v-row
      dense
      v-if="unShelve.length<=0">
    <v-col cols="12">
    <v-skeleton-loader
        style="height: 30vh"
        type="table-tbody"
    ></v-skeleton-loader>
  </v-col></v-row>
<!--  遮盖层-->
  <v-dialog
      v-model="dialog"
      max-width="30vw"
  >
    <v-card>
      <v-card-title class="text-h6">
        编辑类目（{{change.head}})
      </v-card-title>

      <v-card-text>
        <v-col cols="8">
          <v-text-field
              label="大类别"
              v-model='change.head'
          ></v-text-field>
        </v-col>
            <v-chip
                class="ma-2"
                v-for="(item,key) in com_card"
                :key="key"
                close
                color="green"
                close-icon="mdi-delete"
                label
                outlined
                @click:close="isCard(key)"
            >
              {{key}}
            </v-chip>
        <v-row class="align-center justify-space-around">
          <v-col cols="8">
            <v-text-field
                label="子类别"
                v-model="categoryText"
            ></v-text-field>
          </v-col>
          <v-btn
              outlined
              color="blue"
              @click="addThirdCategory">
            添加
          </v-btn>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green darken-1"
            text
            @click="cancel"
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>
import {
  reqAddClassify,
  reqDelClassify,
  reqSearchClassify,
  reqTheSmallClassification,
  reqGetUpGoods,
  reqUpDownGoods
} from "@/api";

export default {
  name: "sapWm",
  data(){
    return{
      unShelve:[],
      ready:[],
      unDetail:{},
      //消息条
      snackbar: false,
      color_text:'success',
      color_btn:'white',
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      //验证规则
      Rules: {
        required:value => !!value || 'Required.',
        userNum:value => (value && value.length >= 6) || 'Min 6 characters',
        passwordNum:value => (value && value.length >= 8) || 'Min 8 characters',
      },
      //底部工作区
      // show:false,
      // username:'',
      // password:'',
      //弹出对话框
      action:true,
      classify: [],
      dialog:false,
      change:{},
      card:{},
    //  新增分类名称
      categoryText:'',
      key:1,
    //  商品
      goodName:'',
      key_num:1,
      model:null,
    //  下架商品数量
      goods_num:0,
    }
  },
  methods:{
    //更改backcolor
    isActive(item){
      this.unShelve.forEach((items)=>{
        this.$set(items,'active',false)
      })
      this.unDetail = item
      this.$set(this.unDetail,'active',true)
    },
    //定义一个方法，将对象数组转化为二维数组
    targetDate(arr){
      //声明一个新的数组
      let newArr =[];
      //循环遍历数组
      arr.forEach(item => {
        //用obj.value拿到数组里对象的value push到新的数组里
        newArr.push(Object.values(item))
      });
      return newArr
    },
    //获取初始分类数据
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
      })
    },
    //获取下架商品
    getGetUpGoods(){
      reqGetUpGoods().then(data=>{
        if(data.data.data===undefined){
          return this.tiggerSnackbar('black','blue','暂时没有下架商品')
        }
        this.ready = JSON.parse(JSON.stringify(data.data.data))
        for(let i = 0;i<this.ready.length;i++){
          this.$set(this.ready[i],'active',false)
        }
        this.unShelve = JSON.parse(JSON.stringify(this.ready))
        this.goods_num = this.unShelve.length
        this.unDetail = this.unShelve[0]
        this.$set(this.unDetail,'active',true)
      })
    },
    //搜索下架商品
    search(){
      if(!this.goods_num) return this.tiggerSnackbar('black','blue','暂时没有已下架商品')
      const arr = JSON.parse(JSON.stringify(this.ready))
      this.unShelve = arr.filter(item=> item.goods_name.indexOf(this.goodName)!==-1)
      this.unDetail = this.unShelve[0]
      this.$set(this.unDetail,'active',true)
    },
    //重新发布下架商品
    release(){
      reqUpDownGoods(this.unDetail.id).then(res=>{
        if(res.data.status===0){
          reqGetUpGoods().then(data=>{
            this.ready = JSON.parse(JSON.stringify(data.data.data))
            for(let i = 0;i<this.ready.length;i++){
              this.$set(this.ready[i],'active',false)
            }
            this.unShelve = JSON.parse(JSON.stringify(this.ready))
            this.unDetail = this.unShelve[0]
            this.$set(this.unDetail,'active',true)
          })
          this.key_num+=1
          this.tiggerSnackbar('success','white','上架成功')
        }else{
          this.tiggerSnackbar('black','blue','上架失败,请联系管理员')
        }
      })
    },
    //初始化对话框
    init(item){
      this.card = {}
      if(item.length<=0){
        this.change.head=''
        this.dialog = true
        return;
      }
      this.change = this.classify.filter(items=>items.id === Number(item[0]))[0]
      const test_change = JSON.parse(JSON.stringify(this.change))
      Reflect.deleteProperty(test_change,'id')
      Reflect.deleteProperty(test_change,'head')
      for(let key in test_change){
        this.$set(this.card,test_change[key],true)
      }
      this.dialog = true
    },
    //弹出编辑对话框
    isDialog(item){
      this.action = false
      this.init(item)
    },
    //删除大分类
    async delClass(item){
      const data = await reqDelClassify(item[0])
      const status = data.data.status
      if(status===0){
        this.tiggerSnackbar('success','white','成功')
        this.all_class()
        this.key+=1
      }else{
        this.tiggerSnackbar('black','blue','失败')
      }
    },
    //删除小分类
    isCard(key){
      this.$set(this.card,key,false)
      this.testA(this.card,key)
    },
    testA(a,b){
      //删除a对象key值为b的key和value
      Reflect.deleteProperty(a,b)
    },
    //新增分类
    add_class(){
      this.action = true
      this.init([])
    },
    //确认修改
    cancel(){
      this.dialog = false
    //  将card里新增的加给change
      let arr = {}
      arr.head = this.change.head
      arr.id = this.change.id
      let card_keys = Object.keys(this.card)
      for(let i =0;i<7;i++){
        let letter = String.fromCharCode(64  + i+1).toLowerCase();
        arr[letter] = card_keys[i] || ''
      }
      if(Object.keys(this.card).length>7){
        this.tiggerSnackbar('black','blue','只能有七个子类')
        return;
      }
      this.change = arr
      if(!this.action){
        reqTheSmallClassification(this.change).then(res=>{
          if(res.data.status === 0){
            this.all_class()
            this.tiggerSnackbar('success','white','修改成功')
            this.key+=1
          }else{
            this.tiggerSnackbar('success','white','编辑失败，请联系管理员')
          }
        })
      }else{
        reqAddClassify(this.change).then(res=>{
          if(res.data.status === 0){
            this.all_class()
            this.tiggerSnackbar('success','white','新增成功')
            this.key+=1
          }else{
            this.tiggerSnackbar('success','white','新增失败，请联系管理员')
          }
        })
      }
    },
    //二次验证
    // login(){
    //   this.shell = !this.shell
    //   reqLogin(this.username,this.password).then(res=>{
    //     if(res.data.status === 1){
    //       this.tiggerSnackbar('black','blue','验证失败了，请在一分钟后尝试')
    //     }else{
    //       this.tiggerSnackbar('success','white','验证成功，请继续您的操作')
    //       this.dialog = true
    //     }
    //   })
    // },
    //弹出消息栏
    tiggerSnackbar(text_color,btn_color,text){
      this.color_btn = btn_color
      this.color_text = text_color
      this.text = text
      this.snackbar = true
    },
    //  新增小分类
    addThirdCategory(){
      if(this.categoryText.length<=0) {
        this.tiggerSnackbar('black', 'blue', '新增失败,类型不能为空')
        this.categoryText = ''
        return;
      }
      if(Object.keys(this.card).length>=7){
        this.tiggerSnackbar('black','blue','添加失败')
      }else{
        this.$set(this.card,this.categoryText,true)
      }
      this.categoryText = ''
    },
  },
  computed:{
    //分类
    thirdCategory(){
      return this.targetDate(this.classify)
    },
    //纸片
    com_card(){
      let arr = JSON.parse(JSON.stringify(this.card))
      let out_key = ''
      for(const key of Object.keys(arr)){
        if(!arr[key]){
          this.testA(arr,key)
          out_key = key
        }
      }
      let result = Object.keys(JSON.parse(JSON.stringify(this.change))).find(key=>this.change[key] === out_key)
      this.testA(this.change,result)
      return arr
    }
  },
  created() {
    //初始化类目管理
    this.all_class()
    //初始化下架商品
    this.getGetUpGoods()
  }
}
</script>

<style scoped>
tr.active{
  background-color: rgb(211,211,211);
}
</style>