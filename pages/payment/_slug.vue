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
      :title="`Beli Tiket (${name})`"
      :quota="quota"
      :description="description"
      :location="location"
      :wahanas="wahanas"
    />
    <LazyFormTiket
      v-if="!isServer"
      :title="name"
      :other-fields="otherFields"
      :area-id="areaId"
      :packages="packages"
      :wahanas="wahanas"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { getAreaDetail } from '@/api/area'
import { getFormArea } from '@/api/form'
import { getWahanaArea } from '@/api/wahana'
import { getPackageArea } from '@/api/package'

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
        getPackageArea({ axios: $axios, req: reqSlugArea })
      ]
      const resWrapFetch = await Promise.all(wrapFetch)
      const { images = [], name = '', description = '', maxQuota = null, location = '', id = 0 } = resWrapFetch[0][0] || {}
      const { otherFields = [] } = resWrapFetch[1][0] || {}
      return { areaId: id, images, name, description, quota: maxQuota, location, otherFields, wahanas: resWrapFetch[2], packages: resWrapFetch[3] }
    } catch (err) {
      redirect('/sorry')
    }
  },
  data () {
    return {
      visible: false,
      isServer: true
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
    this.isServer = false
  },
  scrollToTop: true,
  transition: 'slide-bottom'
})
</script>

<style lang="scss">

</style>
