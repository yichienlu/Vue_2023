import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yclu";

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios.post(`${api_url}/admin/signin`, this.user)
        .then((res) => {
          console.log(res.data);
          const {token, expired} = res.data          
          document.cookie = `hexToken=${token}; expired=${new Date(expired)}`
          alert(res.data.message);
          // console.log(token, expired);
          // console.log(document.cookie);
          window.location = 'admin_products.html'
        })
        .catch((err) => {
          console.dir(err.data);
          alert(`${err.data.message}：${err.data.error.message}`);
        });
    },
  },
});

app.mount("#app");