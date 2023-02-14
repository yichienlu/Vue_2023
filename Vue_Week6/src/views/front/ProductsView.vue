<template>
  <div>
    <h1>產品列表頁面</h1>
    <table class="table">
      <thead>
        <th>品項</th>
        <th>價格</th>
        <th>剩餘數量</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img :src="product.imageUrl" width="100" height="100" alt="" class="object-fit-cover">
            {{ product.title }}
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.num }}</td>
          <td>
            <RouterLink :to="`/product/${product.id}`">
              <button class="btn btn-outline-secondary">查看詳情</button>
            </RouterLink>
            <button type="button" class="btn btn-secondary" @click="addToCart(product.id, 1)">加入購物車</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: []
    }
  },
  compoente: {
    RouterLink
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          // console.log(res.data)
          this.products = res.data.products
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart (id, qty) {
      const data = {
        product_id: id,
        qty
      }
      this.$http.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/`, { data })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
