<template>
  <div class="container">
    <a-row>
      <a-col
        v-for="({ name = '', location = '-', slug = 'none', images = [] }, idx) in areas"
        :key="idx"
        :lg="6"
        :md="8"
        :sm="12"
        :xs="24"
        style="padding: 10px 5px;"
      >
        <CardArea :title="name" :description="location" :link="`/area/detail/${slug}`" :image="findImage(images[0])" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CardArea from '@/components/CardArea'
import { getAreaList } from '@/api/area'

export default Vue.extend({
  components: {
    CardArea
  },
  scrollToTop: true,
  transition: 'slide-bottom',
  async asyncData ({ $axios }) {
    const areas = await getAreaList({ axios: $axios })
    return { areas }
  },
  methods: {
    findImage (val) {
      if (val) {
        const { formats = {} } = val
        const { thumbnail = {} } = formats
        const { url } = thumbnail
        return url
      }
    }
  }
})
</script>

<style lang="scss">

</style>
