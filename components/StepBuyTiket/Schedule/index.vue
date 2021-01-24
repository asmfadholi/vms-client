<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    class="form-area-component"
  >
    <a-divider orientation="left">
      <span>Pilih Jadwal & Tiket</span>
    </a-divider>

    <a-form-model-item label="Jenis Tiket" prop="package">
      <a-select v-model="form.package" placeholder="Pilih Jenis Tiket" show-search>
        <a-select-option v-for="({ name, id }) in packages" :key="id">
          {{ name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="Pilih Tanggal" prop="ticketDate">
      <a-date-picker
        v-model="form.ticketDate"
        format="DD MMM YYYY"
        :disabled-date="disabledDate"
        @change="onChangeSchedule"
      />
    </a-form-model-item>

    <a-form-model-item label="Jumlah Tiket" prop="totalTicket">
      <a-input-number
        v-model.number="form.totalTicket"
        :min="1"
        @change="onChangeSchedule"
      />
    </a-form-model-item>

    <a-form-model-item>
      <a-button type="primary" @click="onSubmit">
        Lanjut
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  props: {
    packages: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {
        ticketDate: null,
        totalTicket: 1,
        package: null
      },
      rules: {
        ticketDate: [
          { required: true, message: 'Field is required', trigger: 'change' }
        ],
        package: [
          { required: true, message: 'Field is required', trigger: 'change' }
        ],
        totalTicket: [
          { required: true, message: 'Field is required', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    disabledDate (current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
    onChangeSchedule () {
      this.$emit('onChange', { ticketDate: null, totalTicket: 1 })
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        }
      })
    }
  }
})
</script>
