<template>
  <div class="container">
    <a-row>
      <a-col
        v-for="({ name = '', location = '-', slug = '', images = [] }, idx) in areas"
        :key="idx"
        :lg="6"
        :md="8"
        :sm="12"
        :xs="24"
        style="padding: 10px 5px;"
      >
        <LazyCardArea
          :key="idx"
          :title="name"
          :description="location"
          :link="`/${slug}`"
          :image="findImage(images[0])"
          :slug="slug"
          mode="payment"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAreaList } from '@/api/area'

export default Vue.extend({
  scrollToTop: true,
  transition: 'slide-bottom',
  async asyncData ({ $axios, redirect }) {
    try {
      const areas = await getAreaList({ axios: $axios })
      return { areas }
    } catch (err) {
      redirect('/sorry')
    }
  },
  methods: {
    findImage (val) {
      if (val) {
        const { formats = {} } = val
        const { thumbnail = {}, medium = null } = formats || {}
        const { url } = medium || thumbnail
        return url
      }
    }
  }
})
</script>
