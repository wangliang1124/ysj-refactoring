<template>
<div>
  <Form :model="formItem" :label-width="80">
    <Form-item label="尊享卡类型">
      <Select v-model="formItem.card_id" placeholder="请选择激活码对应的尊享卡">
        <Option v-for="card in cards" :key="card.id" :value="card.id">{{card.name}}</Option>
      </Select>
    </Form-item>
    <Form-item label="激活码说明">
      <Input autofocus :maxlength='50' v-model="formItem.intro" placeholder="输入此批次激活码的说明比如活动描述等"></Input>
    </Form-item>
    <Form-item label="生成数量">
      <Tooltip content="此批次生成的激活码数量">
        <Input-number autofocus :step="1" :min="1" :max="10000" v-model="formItem.n" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="submit">提交</Button>
      <Button type="ghost" style="margin-left: 8px" @click="$router.go(-1)">返回</Button>
    </Form-item>
  </Form>
</div>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          n: 1,
          intro: '',
          card_id: null
        },
        cards: []
      }
    },
    async created () {
      const res = await this.initData()
      this.cards = res.data
    },
    methods: {
      async initData () {
        return await this.axios.get('/card')
      },
      async submit () {
        const title = '表单提交错误'
        let content = ''
        if (!this.formItem.card_id) content += '<p>必须选择一张尊享卡</p>'
        if (!this.formItem.intro) content += '<p>激活码说明不能为空</p>'
        if (typeof this.formItem.n !== 'number') content += '<p>激活码生成数量格式错误</p>'
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          const res = await this.axios.post('/activation', this.formItem)
          if (res.message && res.message === 'success') this.$router.push({path: '/activation', reload: true})
        }
      }
    }
  }
</script>
