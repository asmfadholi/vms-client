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
import { message } from 'ant-design-vue'
import { getAreaList } from '@/api/area'

export default Vue.extend({
  scrollToTop: true,
  transition: 'slide-bottom',
  data () {
    return {
      areas: []
    }
  },
  mounted () {
    this.fetchAreaList()
  },
  methods: {
    findImage (val) {
      if (val) {
        const { formats = {} } = val
        const { thumbnail = {}, medium = null } = formats || {}
        const { url } = medium || thumbnail
        return url
      }
    },
    async fetchAreaList () {
      try {
        const req = { _limit: 100, _start: 0 }
        const areas = await getAreaList({ axios: this.$axios, req })
        this.areas = areas
      } catch (err) {
        message.error('Oops something went wrong!')
      }
    }
  }
})
</script>
