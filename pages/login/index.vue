<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    class="login-page"
    @submit="onSubmit"
  >
    <h2 class="wrap-logo">
      <nuxt-link to="/">
        <img src="~assets/images/outing-logo.png" class="logo" alt="outing">
      </nuxt-link>
    </h2>
    <a-form-model-item ref="identifier" label="Email" prop="identifier">
      <a-input
        v-model="form.identifier"
        placeholder="Tulis Emailmu"
      />
    </a-form-model-item>

    <a-form-model-item ref="password" label="Password" prop="password">
      <a-input
        v-model="form.password"
        type="password"
        placeholder="Tulis Passwordmu"
      />
    </a-form-model-item>

    <!-- Part Dynamic End -->

    <a-form-model-item style="text-align: center">
      <a-button type="primary" :loading="loading" html-type="submit" @click="onSubmit">
        Masuk
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',
  middleware: 'guest',
  data () {
    return {
      loading: false,
      form: {
        identifier: '',
        password: ''
      },
      rules: {
        identifier: [
          { required: true, message: 'Field is required', trigger: 'change' },
          { type: 'email', message: 'Must be of type email', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Field is required', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.doLogin(this.form)
        } else {
          return false
        }
      })
    },
    async doLogin (val) {
      try {
        this.loading = true
        const { data = {} } = await this.$auth.loginWith('local', {
          data: val
        })
        const { jwt = '', user = {} } = data
        await this.$auth.setUserToken(jwt)
        this.$auth.$storage.setUniversal('user', user)
        const redirect = this.$auth.$storage.getUniversal('redirect') || '/'
        this.success()
        this.$router.replace(redirect)
      } catch (_) {
        this.error()
      } finally {
        this.loading = false
      }
    },
    success () {
      this.$success({
        title: 'Login Berhasil',
        // JSX support
        content: (
          <div>
            <span>Welcome</span>
          </div>
        )
      })
    },
    error () {
      this.$error({
        title: 'Login Gagal',
        // JSX support
        content: (
          <div>
            <span>Maaf, Silahkan Coba Lagi</span>
          </div>
        )
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  .logo {
    height: 120px;
    width: 120px;
    margin: auto 0px;
    object-fit: contain;
    background: transparent;
  }
  .wrap-logo {
    display: flex;
    justify-content: center;
  }
}
</style>
