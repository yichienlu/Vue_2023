import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import pagination from './pagination.js'

const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yclu";
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
axios.defaults.headers.common.Authorization = token;
const config = {
  headers: { Authorization: token },
};

const app = createApp({
  data(){
    return {
      products:[],
      tempProduct:{
        imagesUrl:['']
      },
      pagination: {}
    }
  },
  methods: {
    checkAdmin(){
      axios.post(`${api_url}/api/user/check`)
      .then((res)=>{
        this.getAdminProducts();
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    getAdminProducts(page = 1){
      axios.get(`${api_url}/api/${api_path}/admin/products?page=${page}`)
      .then((res)=>{
        // console.log(res.data)
        this.pagination = res.data.pagination
        this.products = res.data.products
      })
    },
    addProduct(){
      axios.post(`${api_url}/api/${api_path}/admin/product`, {"data":this.tempProduct})
      .then((res)=>{
        // console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    editProduct(id){
      axios.put(`${api_url}/api/${api_path}/admin/product/${id}`,{"data":this.tempProduct})
      .then((res)=>{
        // console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    deleteProduct(id){
      axios.delete(`${api_url}/api/${api_path}/admin/product/${id}`)
      .then((res)=>{
        // console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    uploadImage(){
      const imageUrl = document.querySelector('#imageUrl')
      const file = imageUrl.files[0]
      const formData = new FormData();
      formData.append('file-to-upload', file)

      axios.post(`${api_url}/api/${api_path}/admin/upload`, formData)
      .then((res)=>{
        console.log(res)
        this.tempProduct.imageUrl = res.data.imageUrl
      })
      .catch((err)=>{
        console.log(err.response)
      })
    },
    uploadImages(index){
      const imagesUrl = document.querySelectorAll('#imagesUrl')
      const file = imagesUrl[index].files[0]
      const formData = new FormData();
      formData.append('file-to-upload', file)

      axios.post(`${api_url}/api/${api_path}/admin/upload`, formData)
      .then((res)=>{
        console.log(res)
        this.tempProduct.imagesUrl[index] = res.data.imageUrl
      })
      .catch((err)=>{
        console.log(err.response)
      })
    }
  },
  components:{
    pagination
  },
  // watch: {
  //   tempProduct(newVal, oldVal){
  //       console.log(oldVal, newVal)
  //   }
  // },
  mounted(){
    this.checkAdmin()
  }
})
app.component('product-modal', {
  props:['tempProduct','editProduct','addProduct'],
  template:'#product-modal-template',
})
app.component('del-product-modal', {
  props:['tempProduct','deleteProduct'],
  template: '#del-product-modal-template'
})
app.mount("#app")