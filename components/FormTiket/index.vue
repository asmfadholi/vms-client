<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    class="form-area-component"
  >
    <h2 style="text-align: center">
      Formulir Beli Tiket ({{ title }})
    </h2>

    <a-divider orientation="left">
      <span>Identitas diri</span>
    </a-divider>

    <a-form-model-item ref="name" label="Nama" prop="name">
      <a-input
        v-model="form.name"
        placeholder="Tulis Namamu"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item ref="email" label="Email" prop="email">
      <a-input
        v-model="form.email"
        placeholder="Tulis Emailmu"
      />
    </a-form-model-item>
    <a-form-model-item ref="phoneNumber" label="No. Handphone" prop="phoneNumber">
      <a-input
        v-model="form.phoneNumber"
        type="number"
        placeholder="Tulis No. Handphonemu"
      />
    </a-form-model-item>
    <a-form-model-item label="Jenis Kelamin" prop="gender">
      <div>
        <a-radio-group v-model="form.gender">
          <a-radio value="laki-laki">
            Laki-laki
          </a-radio>
          <a-radio value="perempuan">
            Perempuan
          </a-radio>
        </a-radio-group>
      </div>
    </a-form-model-item>

    <a-divider orientation="left">
      <span>Pilihan tiket</span>
    </a-divider>

    <a-form-model-item label="Type" prop="type">
      <div>
        <a-radio-group v-model="form.type">
          <a-radio value="package">
            Package
          </a-radio>
          <a-radio value="custom">
            Custom
          </a-radio>
        </a-radio-group>
      </div>
    </a-form-model-item>

    <a-form-model-item v-if="form.type === 'package'" label="Pilih Package" prop="package">
      <a-select v-model="form.package" placeholder="Pilih packagemu" show-search>
        <a-select-option v-for="({ name, id }) in packages" :key="id">
          {{ name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item v-else-if="form.type === 'custom'" label="Pilih Wahana" prop="wahanas">
      <a-select v-model="form.wahanas" mode="multiple" placeholder="Pilih wahanamu" show-search>
        <a-select-option v-for="({ name, id }) in wahanas" :key="id">
          {{ name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <!-- Part Dynamic Start -->

    <div>
      <a-divider v-if="otherFields.length > 0" orientation="left">
        <span>Informasi tambahan</span>
      </a-divider>
    </div>

    <a-form-model-item v-for="(field, idx) in newOtherFields" :key="idx" :label="field.label" :prop="`otherDatas.${field.prop}`">
      <template v-if="field.type === FORM_TYPE.CHECKBOX">
        <a-checkbox-group
          v-model="form.otherDatas[field.prop]"
          name="checkboxgroup"
          :options="generateOptions(field.options)"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.RADIO">
        <a-radio-group v-model="form.otherDatas[field.prop]">
          <a-radio v-for="(option, opsIdx) in field.options" :key="opsIdx" :value="option">
            {{ option }}
          </a-radio>
        </a-radio-group>
      </template>
      <template v-else-if="field.type === FORM_TYPE.SHORT_TEXT">
        <a-input
          v-model="form.otherDatas[field.prop]"
          :placeholder="field.label"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.LONG_TEXT">
        <a-textarea
          v-model="form.otherDatas[field.prop]"
          :placeholder="field.label"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.NUMBER">
        <a-input
          v-model="form.otherDatas[field.prop]"
          type="number"
          :placeholder="field.label"
        />
      </template>
    </a-form-model-item>

    <!-- Part Dynamic End -->

    <a-form-model-item>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        Beli
      </a-button>
      <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="resetForm">
        <template slot="title">
          <p>Apa kamu yakin ingin mereset formulir?</p>
        </template>
        <a-button style="margin-left: 10px;">
          Reset
        </a-button>
      </a-popconfirm>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import Vue from 'vue'
import { FORM_TYPE } from '@/constants'
import { createTicket } from '@/api/ticket'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    areaId: {
      type: Number,
      default: 0
    },
    wahanas: {
      type: Array,
      default: () => []
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
      visible: false,
      loading: false,
      FORM_TYPE,
      newOtherFields: [],
      form: {
        name: '',
        gender: '',
        email: '',
        phoneNumber: '',
        isCheckin: true,
        type: '',
        wahanas: [],
        package: undefined
      },
      rules: {
        name: [
          { required: true, message: 'Field is required', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Field is required', trigger: 'change' }
        ],
        gender: [{ required: true, message: 'Field is required', trigger: 'change' }],
        email: [
          { required: true, message: 'Field is required', trigger: 'change' },
          { type: 'email', message: 'Must be of type email', trigger: 'change' }
        ],
        phoneNumber: [
          { required: true, message: 'Field is required', trigger: 'change' },
          { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'form.type' (newVal) {
      if (newVal === 'package') {
        this.form.wahanas = []
      } else {
        this.form.package = undefined
      }
    }
  },
  created () {
    this.generateForm(this.otherFields)
  },
  methods: {
    onDecode (decodeString) {
      this.form.bookingCode = decodeString
      this.visible = !this.visible
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { phoneNumber = 0, package: packageData = '' } = this.form
          const req = { ...this.form }

          // assign other parameter
          req.phoneNumber = Number(phoneNumber)

          // change package format
          if (packageData) {
            req.package = { id: packageData }
          }

          this.doCreateTicket(req)
        } else {
          return false
        }
      })
    },
    async doCreateTicket (val) {
      try {
        this.loading = true
        await createTicket({ axios: this.$axios, req: val })
        this.$router.push(`/confirmation?areaName=${this.title}&type=Transaksi`)
      } catch (_) {
        this.error()
      } finally {
        this.loading = false
      }
    },
    generateOptions (valuesOps = []) {
      return valuesOps.map(val => ({ label: val, value: val }))
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    capitalize (val) {
      return val.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()).replace(/ /g, '')
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
    generateForm (otherFields) {
      const newRules = { ...this.rules, otherDatas: {} }
      const newForm = { ...this.form, otherDatas: {}, area: { id: this.areaId } }
      const newOtherFields = { ...otherFields }
      otherFields.forEach(({ label = '', isRequired = false, type = '' }, idx) => {
        const newLabel = this.capitalize(label)

        newForm.otherDatas[newLabel] = type === FORM_TYPE.CHECKBOX ? [] : ''
        if (isRequired) {
          newRules.otherDatas[newLabel] = [
            { required: true, message: 'Field is required', trigger: 'change' }
          ]
        }
        newOtherFields[idx].prop = newLabel
      })
      this.rules = newRules
      this.form = newForm
      this.newOtherFields = newOtherFields
    }
  }
})
</script>

<style lang="scss">
</style>
