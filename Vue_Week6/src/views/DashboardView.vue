<template>
  <div>
    後台頁面 <br>
    <router-link to="/admin/products">後臺產品列表</router-link> |
    <router-link to="/admin/orders">後臺訂單列表</router-link> |
    <router-link to="/">回前台</router-link>
    <a href="#" @click.prevent="logout()">登出</a>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = 'hexToken=""'
      this.$router.push('/login')
    },
    checkAdmin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${VITE_APP_URL}/api/user/check`)
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
