<template>
  <nuxt-link :to="link" style="width: 100%; display: flex; justify-content: center">
    <a-card hoverable style="max-width: 300px; width: 100%" class="card-area-component">
      <img
        slot="cover"
        v-lazy="$generateUrl(image)"
        alt="banner"
      >
      <a-card-meta :title="title" :description="description" />
      <!-- <template v-if="mode === 'payment'" slot="actions" class="ant-card-actions">
        <nuxt-link :to="`/payment/${slug}`">
          <a-button type="primary">
            Beli Tiket
          </a-button>
        </nuxt-link>
      </template> -->
    </a-card>
  </nuxt-link>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: ''
    },
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
    },
    mode: {
      type: String,
      default: 'plain'
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
