<template>
  <div class="container">
    <form id="form" class="form-signin" @submit.prevent="login">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus v-model="user.username">
        <label for="username">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="password" placeholder="Password" required v-model="user.password">
        <label for="password">Password</label>
      </div>
      <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
        登入
      </button>
    </form>
  </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_APP_URL}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res.data)
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expired=${new Date(expired)}`
          alert(res.data.message)
          // console.log(token)
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          console.dir(err.data)
          alert(`${err.data.message}：${err.data.error.message}`)
        })
    }
  }
}

</script>
