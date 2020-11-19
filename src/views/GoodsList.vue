<template>
  <div>
<nav-header></nav-header>
<nav-bread><span>goods</span></nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter">
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
                <a href="#"><img :src="'/static/'+item.prodcutImg"  alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.prodcutPrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import NavBread from '@/components/Bread.vue'
  import axios from 'axios'
  export default {
    data() {
      return {
        goodsList: [],
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
        selectedPrice:-1
      }
    },
    mounted(){
      this.getGoodsData()
    },
    methods: {
       getGoodsData(){
         axios.get("/api/goods").then(res=>{
           this.goodsList =res.data.data.result
           console.log(this.goodsList)
         })
       },
       priceSelect(index){
         this.selectedPrice = index
       }
    },
     components: {
       NavHeader,
       NavFooter,
       NavBread
     },
  }
</script>

<style scoped>
</style>
