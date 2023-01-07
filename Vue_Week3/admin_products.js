import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

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
        imagesUrl:[]
      }
    }
  },
  methods: {
    getAdminProducts(){
      axios.get(`${api_url}/api/${api_path}/admin/products/all`)
      .then((res)=>{
        console.log(res.data)
        this.products = res.data.products
      })
    },
    addProduct(){
      axios.post(`${api_url}/api/${api_path}/admin/product`, {"data":this.tempProduct})
      .then((res)=>{
        console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    editProduct(id){
      axios.put(`${api_url}/api/${api_path}/admin/product/${id}`,{"data":this.tempProduct})
      .then((res)=>{
        console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    deleteProduct(id){
      axios.delete(`${api_url}/api/${api_path}/admin/product/${id}`)
      .then((res)=>{
        console.log(res.data)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    uploadPicture(){
    }
  },
  mounted(){
    this.getAdminProducts()
  }
})
app.mount("#app")