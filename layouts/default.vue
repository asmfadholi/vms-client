<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <LazyTopNavbar />
    </a-layout-header>
    <a-layout-content class="content-layout-default">
      <a-layout style="padding: 24px 0; background: #fff; margin: 16px 0; max-width: 1400px; width: 100%">
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      VMS ©2020
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      show: false
    }
  }
})
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.ant-layout-header {
  background: #fff;
}
.content-layout-default {
  padding: 0 50px;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 500px) {
  .content-layout-default {
    padding: 0px;
  }
  .header.ant-layout-header {
     padding: 0px 10px;
  }
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
