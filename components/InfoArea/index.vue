<template>
  <div class="info-area-component">
    <a-divider>
      <h2><b style="white-space: normal">{{ title }}</b></h2>
    </a-divider>
    <a-carousel arrows autoplay>
      <div
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <div v-for="(image, idx) in images" :key="idx">
        <img v-lazy="findImage(image)" class="banner-area" alt="banner">
      </div>
    </a-carousel>
    <a-divider>
      Info
    </a-divider>
    <a-row>
      <a-col :lg="12">
        <a-space size="small">
          <a-icon type="environment" />
          <b> Lokasi </b>
        </a-space>
        <p style="padding-left: 20px">
          {{ location }}
        </p>
      </a-col>
      <a-col :lg="12">
        <a-space size="small">
          <a-icon type="plus-square" />
          <b>Maksimal Pengunjung </b>
        </a-space>
        <p style="padding-left: 20px">
          {{ typeof quota !== 'number' ? 'Tidak terbatas' : `${quota} Orang` }}
        </p>
      </a-col>
      <a-col :lg="24">
        <a-space size="small">
          <a-icon type="form" />
          <b>Deskripsi </b>
        </a-space>
        <p style="padding-left: 20px">
          {{ description }}
        </p>
      </a-col>
    </a-row>
    <a-divider />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    link: {
      type: String,
      default: '/'
    },
    location: {
      type: String,
      default: '-'
    },
    images: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: '-'
    },
    quota: {
      type: Number,
      default: 0
    }
  },
  methods: {
    findImage (val) {
      if (val) {
        const { formats = {} } = val
        const { thumbnail = {} } = formats
        const { url } = thumbnail
        return this.$generateUrl(url)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.banner-area {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
  /* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

</style>
