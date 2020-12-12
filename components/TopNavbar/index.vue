<template>
  <div class="top-navbar-component">
    <a-row>
      <a-col :span="12">
        <div class="logo" />
      </a-col>
      <a-col :span="12" style="justify-content: flex-end">
        <a-menu
          v-model="currentMenu"
          theme="light"
          mode="horizontal"
          :default-selected-keys="['1']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1" @click="onNavigate(1)">
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      currentMenu: []
    }
  },
  watch: {
    $route () {
      this.setCurrentMenu()
    }
  },
  created () {
    this.setCurrentMenu()
  },
  methods: {
    setCurrentMenu () {
      if (this.$route.path === '/') {
        this.currentMenu = ['1']
      } else {
        this.currentMenu = []
      }
    },
    onNavigate (val) {
      this.currentMenu = [`${val}`]
    }
  }
})
</script>

<style lang="scss">
.top-navbar-component {
  .ant-row, .ant-col, .ant-row {
    height: 100%;
  }
  .ant-col {
    height: 64px;
    display: flex;
    align-items: center;
  }
  .ant-menu {
    float: right;
  }
  .ant-card-meta-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin: auto 0px;
    background: #f2f2f2;
  }
}
</style>
