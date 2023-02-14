<template>
  <div>
    <h1>{{ product.title }}</h1>
    <img :src="product.imageUrl" height="200" alt="">
    <button type="button" class="btn btn-primary">加入購物車</button>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // console.log(this.$route.params)
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          // console.log(res.data)
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}

</script>
