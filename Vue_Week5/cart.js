import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js'

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'yclu'

const app = createApp({
  data(){
    return {
      products:[]
    }
  },
  methods:{
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.getProducts()
  }
})

app.mount("#app")