<template>
  <div>
<nav-header></nav-header>
<nav-bread><span>goods</span></nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short" ></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" :class="{'cur':selectedPrice==-1 }" @click="priceSelect(-1)">All</a></dd>
          <dd  v-for="(price, index) in priceFilter" :key="price.index">
            <a href="javascript:void(0)" @click="priceSelect(index)" :class="{'cur':selectedPrice== index }">{{price.startPrice}}--{{price.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li  v-for="item in goodsList" :key="item.productId">
              <div class="pic">
                <a href="#"><img v-lazy="'/static/'+item.productImage"  alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" class="load-more">
           <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
</div>
      </div>
    </div>
  </div>
</div>
<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
<!-- 未登录  -->
<model v-bind:mdShow="mdShow" @close="closeModel">
  <p slot="message">
    请先登录，否则无法加入到购物车中
  </p>
  <div slot="btnGroup" >
      <a class="btn btn--m" @click="closeModel">关闭</a>
  </div>
</model>

<!-- 登录状态 -->
<model v-bind:mdShow="mdshowCart" @close="closeModel">
     <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功！</span>
     </p>
     <div slot="btnGroup">
      <a class="btn btn--m" href="javascript:;" @click="closeModel">继续购物</a>
      <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
     </div>
</model>
<nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import Model from '@/components/model.vue'
  import NavBread from '@/components/Bread.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        goodsList: [],
        sortFlag:1,
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'1500.00'
          }
        ],
        selectedPrice:-1,
        priceChecked:'all',
        page:1,
        pageSize:8,
        loading: false,
        busy: false, //插件参数
        filterBy:false,  //弹出层
        overLayFlag:false,  //遮罩层
        mdShow: false, // 未登录模态框显示
        mdshowCart: false //登录模态框显示
      }
    },
    mounted(){
      this.getGoodsList(false)
    },
    methods: {
       getGoodsList(flag){
         let param ={
           page: this.page,
           pageSize:this.pageSize,
           sort:this.sortFlag? 1:-1,
           priceLevel:this.selectedPrice
         }
         axios.get("/goods/list",{params:param}).then(response=>{
           let res = response.data;
           this.loading =false;
           if(res.status == 0){
             if(flag){

               this.goodsList = this.goodsList.concat(res.result.list)
               console.log(this.goodsList)
               if(res.result.count ==0){
                 this.busy =true
               }else{
                 this.busy =false
               }
             }else{
                this.goodsList =res.result.list;
                this.busy =true
             }
           }else{
             this.goodsList =[]
           }
           console.log(this.goodsList)
         })
       },
       sortGoods(){
         this.sortFlag = !this.sortFlag;
         this.page =1;
         this.getGoodsList();
       },
       priceSelect(index){
         this.selectedPrice = index;
         this.page =1;
         this.getGoodsList();
         this.closePop();
       },
       showFilterPop(){
          this.filterBy =true;
          this.overLayFlag =true
       },
       closePop(){
          this.filterBy =false;
          this.overLayFlag =false
       },
       loadMore(){
          this.busy =true;
          this.loading =true
         setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
          console.log(this.busy)
         }, 500);
       },
       //加入购物车
       addCart(productId){
           axios.post("/goods/addCart",{productId:productId}).then((res)=>{
             var res =res.data
             console.log(res)
               if(res.status == 0){
                 this.mdshowCart=true
               }else{
                 this.mdShow = true
               }
           })
       },
       closeModel(){
         this.mdShow =false
         this.mdshowCart =false
       }
    },
     components: {
       NavHeader,
       NavFooter,
       NavBread,
       Model
     },
  }
</script>

<style scoped>
 .accessory-list{
   flex:1;
 }
 .accessory-list ul::after{
   clear:both;
   content:' ';
   height: 0;
   display:block;
   visibility: hidden;
 }
 .load-more{
   height: 100px;
   line-height: 100px;
   text-align: center;
 }
 .sort-up{
   transform: rotate(180deg);
   transition: all .3s ease-in-out;
 }
 .icon-arrow-short{
   transition: all .3s ease-in-out;
 }
 .btn:hover{
   background: #ffe5e6;
   transition: all .3s ease-out;
 }
</style>
