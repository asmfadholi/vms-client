<template>
  <nuxt-link :to="link" style="width: 100%; display: flex; justify-content: center">
    <a-card hoverable style="max-width: 300px; width: 100%" class="card-area-component">
      <img
        slot="cover"
        v-lazy="image"
        alt="banner"
      >
      <a-card-meta :title="title" :description="description" />
    </a-card>
  </nuxt-link>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    link: {
      type: String,
      default: '/'
    },
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: '-'
    }
  }
})
</script>

<style lang="scss">
.card-area-component {
  img {
    height: 150px;
    object-fit: cover;
    width: 100%;
  }
}
</style>
