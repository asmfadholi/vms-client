<template>
  <div>
    <a-collapse default-active-key="0" accordion>
      <a-collapse-panel v-for="(_, idx) in totalTicket" :key="idx" :header="`Identitas ${totalTicket === 1 ? '' : `- ${idx + 1}`}`">
        <LazyFormTiketV2 :other-fields="otherFields" :area-id="areaId" @onChange="(val) => onChangeForm(val, idx)" />
        <a-icon
          v-if="identities[idx]"
          slot="extra"
          type="check-circle"
          theme="twoTone"
          two-tone-color="#52c41a"
          :style="{ fontSize: '20px' }"
        />
      </a-collapse-panel>
    </a-collapse>
    <a-button :disabled="filterIdentities.length !== totalTicket" :loading="loading" :style="{ marginTop: '16px' }" @click="onSubmit">
      Beli Tiket
    </a-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { createTicket } from '@/api/ticket'

export default Vue.extend({
  props: {
    totalTicket: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: '-'
    },
    areaId: {
      type: Number,
      default: 0
    },
    otherFields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeKey: 0,
      identities: [],
      loading: false
    }
  },
  computed: {
    filterIdentities () {
      return this.identities.filter(identity => identity !== null)
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      try {
        const createTickets = this.filterIdentities.map(filter => createTicket({ axios: this.$axios, req: filter }))
        await Promise.all(createTickets)
        this.success()
        this.$router.push(`/confirmation?areaName=${this.title}&type=Transaksi`)
      } catch (err) {
        this.error()
      } finally {
        this.loading = false
      }
    },
    success () {
      this.$success({
        title: 'Berhasil Beli Tiket',
        // JSX support
        content: (
          <div>
            <span>Terima Kasih, Silahkan Cek Email</span>
          </div>
        )
      })
    },
    error () {
      this.$error({
        title: 'Gagal Beli Tiket',
        // JSX support
        content: (
          <div>
            <span>Maaf, Silahkan Coba Lagi</span>
          </div>
        )
      })
    },
    onChangeForm (val, idx) {
      const newIdentities = [...this.identities]
      newIdentities[idx] = val
      this.identities = newIdentities
    }
  }
})
</script>
