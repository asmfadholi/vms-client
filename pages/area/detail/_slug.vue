<template>
  <div class="container">
    <InfoArea :images="images" :title="name" :quota="quota" :description="description" :location="location" />
    <FormArea :title="name" :other-fields="otherFields" :area-id="areaId" />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoArea from '@/components/InfoArea'
import FormArea from '@/components/FormArea'
import { getAreaDetail } from '@/api/area'
import { getFormArea } from '@/api/form'

export default Vue.extend({
  components: {
    InfoArea,
    FormArea
  },
  scrollToTop: true,
  transition: 'slide-bottom',
  async asyncData ({ $axios, route }) {
    const reqAreaDetail = { slug: route.params.slug }
    const reqFormArea = {
      area: {
        slug: route.params.slug
      }
    }
    const wrapFetch = [getAreaDetail({ axios: $axios, req: reqAreaDetail }), getFormArea({ axios: $axios, req: reqFormArea })]
    const resWrapFetch = await Promise.all(wrapFetch)
    const { images = [], name = '', description = '', maxQuota = null, location = '', id = 0 } = resWrapFetch[0][0] || {}
    const { otherFields = [] } = resWrapFetch[1][0] || {}
    return { areaId: id, images, name, description, quota: maxQuota, location, otherFields }
  }
})
</script>

<style lang="scss">

</style>
