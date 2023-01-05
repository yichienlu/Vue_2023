import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yclu";
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
axios.defaults.headers.common.Authorization = token;

const app = createApp({
  data(){
    return {
      products:[],
      tempProduct:{}
    }
  },
  methods:{
    getAdminProducts(){
      axios.get(`${api_url}/api/${api_path}/admin/products/all`)
      .then((res)=>{
        console.log(res.data)
        this.products = res.data.products
      })
      .catch((err)=>{
        console.dir(err)
      })

    }
  },
  mounted(){
    axios.post(`${api_url}/api/user/check`)
    .then((res)=>{
      this.getAdminProducts();
    })
    .catch((err)=>{
      console.dir(err)
    })
  }
})

app.mount("#app")