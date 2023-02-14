// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'

// const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
// const { required, email, min, max } = VeeValidateRules;
// const { localize, loadLocaleFromURL } = VeeValidateI18n;
// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// defineRule('max', max);

// loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// configure({
//   generateMessage: localize('zh_TW'),
// });

Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'yclu'

const productModal = {
  props:['id', 'addToCart', 'openModal'],
  data(){
    return {
      modal:{},
      tempProduct:{},
      qty: 1
    }
  },
  template: '#userProductModal',
  watch:{
    id(){
      if(this.id){
        axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
        .then((res)=>{
          // console.log(res.data.product)
          this.tempProduct = res.data.product;
          this.modal.show();
        })
      }
    }
  },
  methods:{
    hide(){
      this.modal.hide();
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // 監聽modal關閉事件
    this.$refs.modal.addEventListener('hidden.bs.modal', event => {
      this.openModal('')
    })
  }
}

const app = Vue.createApp({
  data(){
    return {
      products:[],
      productId:'',
      cart:{},
      loadingItem: '',
    }
  },
  // components: {
  //   VForm: Form,
  //   VField: Field,
  //   ErrorMessage: ErrorMessage,
  // },
  methods:{
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then((res)=>{
        // console.log('產品列表：' , res.data.products[0]);
        this.products = res.data.products;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getCarts(){
      axios.get(`${apiUrl}/api/${apiPath}/cart`)
      .then((res)=>{
        // console.log('購物車' , res.data);
        this.cart = res.data.data;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    openModal(id){
      this.productId = id
    },
    addToCart(product_id, qty=1){
      const data = {
        product_id,
        qty
      };
      axios.post(`${apiUrl}/api/${apiPath}/cart`,{data})
      .then((res)=>{
        console.log('加入購物車', res.data);
        this.$refs.productModal.hide();
        this.getCarts();
      })
    },
    updateCartItem(item){
      const data={
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id
      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, {data})  // 購物車 ID
      .then((res)=>{
        this.cart = res.data.data;
        this.getCarts();
        this.loadingItem = ''
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    deleteCartItem(item){
      this.loadingItem = item.id
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${item.id}`)  // 購物車 ID
      .then((res)=>{
        console.log('更新購物車' , res.data);
        this.getCarts();
        this.loadingItem = ''
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  components:{
    productModal
  },
  mounted(){
    this.getProducts();
    this.getCarts();

    let loader = this.$loading.show()
      setTimeout(() => {
        loader.hide()
      }, 1500)

  }
})

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.use(VueLoading.LoadingPlugin)
// app.component(VueLoading, Component)

app.mount("#app")