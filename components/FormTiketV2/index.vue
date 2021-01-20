<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    class="form-area-component"
  >
    <a-divider orientation="left">
      <span>Identitas diri</span>
    </a-divider>

    <a-form-model-item ref="name" label="Nama" prop="name">
      <a-input
        v-model="form.name"
        placeholder="Tulis Namamu"
        @change="onChange"
      />
    </a-form-model-item>
    <a-form-model-item ref="email" label="Email" prop="email">
      <a-input
        v-model="form.email"
        placeholder="Tulis Emailmu"
        @change="onChange"
      />
    </a-form-model-item>
    <a-form-model-item ref="phoneNumber" label="No. Handphone" prop="phoneNumber">
      <a-input
        v-model="form.phoneNumber"
        type="number"
        placeholder="Tulis No. Handphonemu"
        @change="onChange"
      />
    </a-form-model-item>
    <a-form-model-item label="Jenis Kelamin" prop="gender">
      <div>
        <a-radio-group v-model="form.gender" @change="onChange">
          <a-radio value="laki-laki">
            Laki-laki
          </a-radio>
          <a-radio value="perempuan">
            Perempuan
          </a-radio>
        </a-radio-group>
      </div>
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
          @change="onChange"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.RADIO">
        <a-radio-group v-model="form.otherDatas[field.prop]" @change="onChange">
          <a-radio v-for="(option, opsIdx) in field.options" :key="opsIdx" :value="option">
            {{ option }}
          </a-radio>
        </a-radio-group>
      </template>
      <template v-else-if="field.type === FORM_TYPE.SELECT">
        <a-select
          v-model="form.otherDatas[field.prop]"
          :placeholder="field.label"
          allow-clear
          @change="onChange"
        >
          <a-select-option v-for="(option, opsIdx) in field.options" :key="opsIdx" :value="option">
            {{ option }}
          </a-select-option>
        </a-select>
      </template>
      <template v-else-if="field.type === FORM_TYPE.SHORT_TEXT">
        <a-input
          v-model="form.otherDatas[field.prop]"
          :placeholder="field.label"
          @change="onChange"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.LONG_TEXT">
        <a-textarea
          v-model="form.otherDatas[field.prop]"
          :placeholder="field.label"
          @change="onChange"
        />
      </template>
      <template v-else-if="field.type === FORM_TYPE.NUMBER">
        <a-input
          v-model.number="form.otherDatas[field.prop]"
          type="number"
          :placeholder="field.label"
          @change="onChange"
        />
      </template>
    </a-form-model-item>

    <!-- Part Dynamic End -->
  </a-form-model>
</template>

<script>
import Vue from 'vue'
import { FORM_TYPE } from '@/constants'

export default Vue.extend({
  props: {
    otherFields: {
      type: Array,
      default: () => []
    },
    areaId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      FORM_TYPE,
      newOtherFields: [],
      form: {
        name: '',
        gender: '',
        email: '',
        phoneNumber: '',
        isCheckin: true
      },
      rules: {
        name: [
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
  created () {
    this.generateForm(this.otherFields)
  },
  methods: {
    onChange () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('onChange', this.form)
        } else {
          this.$emit('onChange', null)
        }
      })
    },
    generateOptions (valuesOps = []) {
      return valuesOps.map(val => ({ label: val, value: val }))
    },
    capitalize (val) {
      return val.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()).replace(/ /g, '')
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
