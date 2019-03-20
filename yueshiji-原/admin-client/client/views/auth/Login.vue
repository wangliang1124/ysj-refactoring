<template>
<div class="content has-text-centered">
  <h1 class="is-title is-bold">Login</h1>

  <div class="columns is-vcentered">
    <div class="column is-6 is-offset-3">
      <div class="box">
        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
        <form v-on:submit.prevent="login">
          <label class="label">账户名</label>
          <p class="control">
            <input v-model="data.body.phone" class="input" type="text" placeholder="请输入账户名">
          </p>
          <label class="label">密码</label>
          <p class="control">
            <input v-model="data.body.password" class="input" type="password" placeholder="请输入密码">
          </p>

          <p class="control">
          </p>

          <hr>
          <p class="control">
            <button type="submit" class="button is-primary">登录</button>
            <button class="button is-default">取消</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  data () {
    return {
      data: {
        body: {
          phone: null,
          password: null
        },
        rememberMe: true
      },
      error: null
    }
  },
  mounted () {
    if (this.$auth.redirect()) {
      console.log('Redirect from: ' + this.$auth.redirect().from.name)
    }
    // Can set query parameter here for auth redirect or just do it silently in login redirect.
  },
  methods: {
    login () {
      var redirect = this.$auth.redirect()
      this.$auth.login({
        data: this.data.body,
        rememberMe: this.data.rememberMe,
        redirect: {name: redirect ? redirect.from.name : 'Home'}
      })
    }
  }
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }

}
</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
