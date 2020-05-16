<template>
  <p>login</p>
</template>
<script>
const qs = require('qs')
export default {
  name: 'Login',
  data() {
    return {}
  },
  mounted() {
    this.Login()
  },
  methods: {
    Login() {
      this.axios
        .post(
          '/login',
          qs.stringify({
            username: 'testweb',
            password: '14e1b600b1fd579f47433b88e8d85291',
            type: 0
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(res => {
          let token = res.data.token
          localStorage.setItem('token', 'Bearer ' + token)

          // 页面跳转
          this.$router.push('/org')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>