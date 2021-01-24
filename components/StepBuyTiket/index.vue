<template>
  <div>
    <h2 style="text-align: center">
      Formulir Beli Tiket ({{ title }})
    </h2>

    <a-steps v-model="current" type="navigation" size="small" :style="stepStyle">
      <a-step
        title="Langkah 1"
        :status="schedule.ticketDate ? 'finish': 'process'"
        description="Pilih Jadwal & Tiket"
      />
      <a-step
        title="Langkah 2"
        :status="schedule.ticketDate ? 'process': 'wait'"
        :disabled="!schedule.ticketDate"
        description="Lengkapi Identitas"
      />
    </a-steps>
    <Schedule v-show="current === 0" :packages="packages" @onChange="onChangeSchedule" @onSubmit="onSubmitSchedule" />
    <Identities
      v-if="current === 1"
      :total-ticket="schedule.totalTicket"
      :other-fields="otherFields"
      :area-id="areaId"
      :title="title"
      :schedule="schedule"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import Schedule from './Schedule'
import Identities from './Identities'

export default Vue.extend({
  components: {
    Schedule,
    Identities
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    areaId: {
      type: Number,
      default: 0
    },
    packages: {
      type: Array,
      default: () => []
    },
    otherFields: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      stepStyle: {
        marginBottom: '60px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset'
      },
      schedule: {
        ticketDate: null,
        totalTicket: 1
      },
      current: 0
    }
  },
  methods: {
    onChangeSchedule (val) {
      this.schedule = { ...val }
    },

    onSubmitSchedule (val) {
      this.schedule = { ...val }
      this.current = 1
    }
  }
})
</script>

<style lang="scss">
</style>
