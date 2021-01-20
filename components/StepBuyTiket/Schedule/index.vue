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

    <a-form-model-item label="Pilih Tanggal" prop="date">
      <a-date-picker
        v-model="form.date"
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
  data () {
    return {
      form: {
        date: null,
        totalTicket: 1
      },
      rules: {
        date: [
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
      this.$emit('onChange', { date: null, totalTicket: 1 })
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
