import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'yclu'

const productModal = {
  props:['id', 'addToCart'],
  data(){
    return {
      modal:{},
      tempProduct:{}
    }
  },
  template: '#userProductModal',
  watch:{
    id(){
      console.log(this.id)
      axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
      .then((res)=>{
        console.log(res.data.product)
        this.tempProduct = res.data.product;
        this.modal.show();
      })
    }
  },
  methods:{
    hide(){
      this.modal.hide();
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // this.modal.show()
  }
}



const app = createApp({
  data(){
    return {
      products:[],
      productId:''
    }
  },
  methods:{
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then((res)=>{
        console.log('產品列表：' , res.data.products[0]);
        this.products = res.data.products;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    openModal(id){
      this.productId = id
      console.log(this.productId)
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
      })
    }
  },
  components:{
    productModal
  },
  mounted(){
    this.getProducts()
  }
})

app.mount("#app")