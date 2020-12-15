<template>
  <div class="card-confirmation-component">
    <img
      v-lazy="image"
      alt="success"
    >
    <h2>
      {{ title }}
    </h2>
    <p>
      {{ description }}
    </p>
    <a-button @click="$router.go(-1)">
      Kembali
    </a-button>
  </div>
</template>

<script>
import SuccessImage from '@/assets/images/success-logo.png'
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: '-'
    }
  },
  data () {
    return {
      image: SuccessImage
    }
  }
})
</script>

<style lang="scss">
.card-confirmation-component {
  text-align: center;
  img {
    margin-bottom: 20px;
  }
}
</style>
