<template>
  <div class="container">
    <CardConfirmation :title="`${type} Berhasil!`" :description="areaName" />
  </div>
</template>

<script>
import Vue from 'vue'
import CardConfirmation from '@/components/CardConfirmation'

export default Vue.extend({
  components: {
    CardConfirmation
  },
  scrollToTop: true,
  transition: 'slide-bottom',
  computed: {
    areaName () {
      return `Selamat Datang ${this.$route.query.areaName ? `di ${this.$route.query.areaName}` : ''}`
    },
    type () {
      return this.$route.query.type || ''
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
}
</style>
