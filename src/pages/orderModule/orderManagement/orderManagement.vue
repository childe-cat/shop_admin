<template>
<v-container fluid>
      <v-toolbar
          color="cyan"
          class="rounded"
          dark
          flat
          dense
      >
          <v-tabs
              v-model="tab"
              align-with-title
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab
                v-for="item in items"
                :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
          <v-card flat>
            <template>
              <v-card>
                <v-card-title class="py-0">
                    <v-col cols="4" class="py-0 px-0">
                      <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hint="订单编号，收货人姓名，联系方式"
                      ></v-text-field>
                    </v-col>
                  <v-col class="text-right">
                    订单汇总
                  </v-col>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    fixed-header
                    height="70vh"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event"
                    hide-default-footer
                >
                  <template v-slot:[`item.time`]="{ item }">
                    {{timestampToTime(item.time)}}
                  </template>
                  <template v-slot:[`item.action`]="{  }">
                    <v-btn
                        outlined
                        color="success"
                    >
                      操作
                    </v-btn>
                  </template>
                  <template v-slot:[`item.blurb`]="{ item }">
                    <v-btn
                        outlined
                        color="success"
                        @click.stop="openBlurb(item)"
                    >
                      详情
                    </v-btn>
                  </template>
                </v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                      v-model="page"
                      :length="pageCount"
                  ></v-pagination>
                </div>
              </v-card>
            </template>
          </v-card>
      </v-tabs-items>
  <template>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">商品列表</span>
          </v-card-title>
          <v-card-text>
            <template>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      id
                    </th>
                    <th class="text-left">
                      name
                    </th>
                    <th class="text-left">
                      num
                    </th>
                    <th class="text-left">
                      price
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="item in blurb"
                      :key="item.name"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                  <tr>
                    <td>总计：</td>
                    <td></td>
                    <td>{{all_num}}</td>
                    <td>{{all_price}}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
</v-container>
</template>

<script>
export default {
  name: "orderManagement",
  data(){
    return{
      //tab栏
      flag:true,
      tab: 0,
      items: [
        '全部', '未付款', '待处理', '已完成',
      ],
    //  订单表格
      search: '',
      headers: [
        {
          text: '订单编号',
          align: 'start',
          value: 'id',
        },
        { text: '收货人姓名', value: 'name' },
        { text: '创建时间', value: 'time' },
        { text: '联系方式',sortable:false, value: 'tel' },
        { text: '商品信息',sortable:false, value: 'blurb' },
        {value:'action',}
      ],
      prepare:[],
      desserts: [],
      //分页
      page: 1,
      pageCount: 0,
      itemsPerPage: 9,
      //商品详情
      dialog:false,
      all_num:0,
      all_price:0,
      blurb:[],
    }
  },
  watch:{
    tab:{
      deep:true,
      handler(n){
        if(!n){
          this.desserts = JSON.parse(JSON.stringify(this.prepare))
        }else{
          let arr = new Map([
            [1,0],
            [2,1],
            [3,2],
          ])
          this.desserts = this.prepare.filter(item=>{
            return Number(item.status) === arr.get(n)
          })
        }
      }
    }
  },
  methods:{
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp*1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //商品信息传递给对话框
    openBlurb(item){
      this.all_num = 0
      this.dialog = true
      this.blurb = JSON.parse(item.blurb)
      this.all_price = item.money
      this.blurb.forEach(item=>{
        this.all_num += item.num
      })
    }
  },
  computed: {

  },
  created() {
    this.prepare = this.$store.state.order
    this.desserts = JSON.parse(JSON.stringify(this.prepare))
  }
}
</script>

<style scoped>

</style>