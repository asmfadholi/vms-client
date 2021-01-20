<template>
  <div class="container">
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
    <InfoArea
      :images="images"
      :title="name"
      :quota="Number(quota)"
      :description="description"
      :location="location"
      :wahanas="wahanas"
    />
    <!-- <LazyFormArea
      v-if="isAllow"
      :title="name"
      :other-fields="otherFields"
      :area-id="areaId"
      :wahanas="wahanas"
      :packages="packages"
    /> -->
    <LazyStepBuyTiket
      v-if="isAllow"
      :title="name"
      :other-fields="otherFields"
      :area-id="areaId"
      :wahanas="wahanas"
      :packages="packages"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { getAreaDetail } from '@/api/area'
import { getFormArea } from '@/api/form'
import { getWahanaArea } from '@/api/wahana'
// import { getPackageArea } from '@/api/package'

export default Vue.extend({
  async asyncData ({ $axios, route, redirect }) {
    try {
      const reqAreaDetail = { slug: route.params.slug }
      const reqSlugArea = {
        area: {
          slug: route.params.slug
        }
      }
      const wrapFetch = [
        getAreaDetail({ axios: $axios, req: reqAreaDetail }),
        getFormArea({ axios: $axios, req: reqSlugArea }),
        getWahanaArea({ axios: $axios, req: reqSlugArea }),
        []
        // getPackageArea({ axios: $axios, req: reqSlugArea })
      ]
      const resWrapFetch = await Promise.all(wrapFetch)
      const { images = [], name = '', description = '', maxQuota = null, location = '', id = 0 } = resWrapFetch[0][0] || {}
      const { otherFields = [] } = resWrapFetch[1][0] || {}
      return {
        areaId: id,
        images,
        name,
        description,
        quota: maxQuota,
        location,
        otherFields,
        wahanas: resWrapFetch[2],
        packages: resWrapFetch[3]
      }
    } catch (err) {
      redirect('/sorry')
    }
  },
  data () {
    return {
      isAllow: false,
      visible: false
    }
  },
  computed: {
    routes () {
      return [
        {
          path: '/',
          breadcrumbName: 'Home'
        },
        {
          path: `/${this.$route.params.slug}`,
          breadcrumbName: this.name
        }
      ]
    }
  },
  mounted () {
    // const { role = {} } = this.$auth.$storage.getUniversal('user') || {}
    // const { type = '' } = role
    // const isAllow = type === 'admin_area' || type === 'super_admin'
    this.isAllow = true
  },
  scrollToTop: true,
  transition: 'slide-bottom'
})
</script>

<style lang="scss">

</style>
