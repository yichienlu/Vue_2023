<template>
  <div>
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCartItem(item)"
                :disabled="item.id === loadingItem"
              >
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <select
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.qty"
                    @change="updateCartItem(item)"
                    :disabled="item.id === loadingItem"
                  >
                    <option :value="i" v-for="i in 20" :key="`${i}unit`">
                      {{ i }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ item.total }}
              <small class="text-success">折扣價：{{ item.final_total }}</small>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          // console.log('產品列表：' , res.data.products[0])
          this.products = res.data.products
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCarts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('購物車' , res.data)
          this.cart = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`, { data }) // 購物車 ID
        .then((res) => {
          this.cart = res.data.data
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCartItem (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`) // 購物車 ID
        .then((res) => {
          console.log('更新購物車', res.data)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
