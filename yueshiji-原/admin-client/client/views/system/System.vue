<template>
  <Form :model="formItem" :label-width="120">
    <Form-item label="激活码有效时长">
      <Tooltip placement="top" content="单位毫秒">
        <Input-number style="width:200px" :max="10000000000000000000" :min="0" :step="1000" v-model="formItem.ACTIVATION_expireIn" placeholder="请输入,单位毫秒"></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="自动登录有效时长">
      <Tooltip placement="top" content="单位毫秒">
        <Input-number style="width:200px" :max="10000000000000000000" :min="0" :step="1000" v-model="formItem.JWT_expiresIn" placeholder="请输入,单位毫秒"></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="邀请奖励金额">
      <Tooltip placement="top" content="单位元">
        <Input-number style="width:200px" :max="10000000" :min="0" :step="1" v-model="formItem.INVITE_money" placeholder="请输入,单位元"></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="邀请奖励金额">
      <Tooltip placement="top" content="单位元">
        <Input-number style="width:200px" :max="10000000" :min="0" :step="1" v-model="formItem.INVITE_money" placeholder="请输入,单位元"></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="支付二维码">
      <img width="200" height="200" src="../../assets/zhifu.png"/>
    </Form-item>
    <Form-item>
      <Button type="primary" @click='submit'>提交</Button>
      <Button type="ghost" style="margin-left: 8px" @click='$router.go(-1)'>取消</Button>
    </Form-item>
  </Form>
</template>
<script>
  import img from '../imgs/img.vue'
  export default {
    data () {
      return {
        formItem: {
          id: 0,
          ACTIVATION_expireIn: 0,
          JWT_expiresIn: 0,
          INVITE_money: 0
        }
      }
    },
    components: {
      img
    },
    async created () {
      const res = await this.initData()
      this.formItem = res.data
    },
    methods: {
      async initData () {
        return this.axios.get('/system')
      },
      async submit () {
        const title = '表单提交错误'
        let content = ''
        if (!this.formItem.id) content += '<p>id不能为空</p>'
        if (!this.formItem.ACTIVATION_expireIn) content += '<p>激活码有效时长不能为空</p>'
        if (!this.formItem.JWT_expiresIn) content += '<p>自动登录有效时长不能为空</p>'
        if (!this.formItem.INVITE_money) content += '<p>邀请奖励金额不能为空</p>'
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          const res = await this.axios.put(`/system/${this.formItem.id}`, this.formItem)
          if (res.message && res.message === 'success') this.$router.push(`/system`, {reload: true})
        }
      }
    }
  }
</script>
