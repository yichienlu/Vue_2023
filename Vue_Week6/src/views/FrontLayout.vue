<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/"  class="navbar-brand">PET PET</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link">購物車</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">登入</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link">去後台</router-link>
            </li>
          </ul>
        </div>
        <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="text-center bg-warning py-3">
      2023 All rights reserved.
    </footer>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
