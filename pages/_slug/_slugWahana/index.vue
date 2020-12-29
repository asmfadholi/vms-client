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
    <InfoWahana
      :images="images"
      :title="wahanaName"
      :quota="Number(quota)"
      :description="description"
    />
    <FormWahana
      v-if="$auth.loggedIn && isAllow"
      :title="wahanaName"
      :other-fields="otherFields"
      :area-id="areaId"
      :wahana-id="wahanaId"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoWahana from '@/components/InfoWahana'
import FormWahana from '@/components/FormWahana'
import { getFormArea } from '@/api/form'
import { getWahanaArea } from '@/api/wahana'

export default Vue.extend({
  components: {
    InfoWahana,
    FormWahana
  },
  // middleware: ['auth'],
  async asyncData ({ $axios, route, redirect, $auth }) {
    try {
      const reqWahanaDetail = { slug: route.params.slugWahana }
      const reqSlugArea = {
        area: {
          slug: route.params.slug
        }
      }
      const wrapFetch = [
        getWahanaArea({ axios: $axios, req: reqWahanaDetail }),
        $auth.loggedIn ? getFormArea({ axios: $axios, req: reqSlugArea }) : []
      ]
      const resWrapFetch = await Promise.all(wrapFetch)
      const { images = [], name = '', description = '', maxQuota = null, location = '', id = 0, area = {} } = resWrapFetch[0][0] || {}
      const { otherFields = [] } = resWrapFetch[1][0] || {}
      return {
        areaId: area.id || 0,
        wahanaId: id,
        images,
        wahanaName: name,
        areaName: area.name || '-',
        description,
        quota: maxQuota,
        location,
        otherFields
      }
    } catch (err) {
      redirect('/sorry')
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    isAllow () {
      const { role = {} } = this.$auth.user || {}
      const { type = '' } = role
      return type === 'admin_wahana' || type === 'super_admin'
    },
    routes () {
      return [
        {
          path: '/',
          breadcrumbName: 'Home'
        },
        {
          path: `/${this.$route.params.slug}`,
          breadcrumbName: this.areaName
        },
        {
          // path: `/${this.$route.params.slug}`,
          breadcrumbName: this.wahanaName
        }
      ]
    }
  },
  scrollToTop: true,
  transition: 'slide-bottom'
})
</script>

<style lang="scss">

</style>
