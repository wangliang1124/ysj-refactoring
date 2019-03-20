<template>
  <Form :model="formItem" :label-width="150">
    <Form-item label="其他选项列表">
      <Tag v-for="item in formItem.others" :key="item" closable @on-close="handleClose(item)">{{item.other}}</Tag>
      </Form-item>
    <Form-item label="添加其他">
      <Button icon="ios-plus-empty" style="color:red" type="dashed" size="small" @click="handleAdd">添加其他选项</Button>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          others: [],
          input_tag: null
        }
      }
    },
    async created () {
      const res = await this.initData()
      this.formItem.others = res.data
    },
    methods: {
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/other', {other: this.formItem.input_tag})
              if (res.message && res.message === 'success') this.formItem.others.push(res.data)
              this.formItem.input_tag = ''
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '请输入其他选项名称',
                type: 'text',
                maxlength: 10
              },
              on: {
                input: (val) => {
                  this.formItem.input_tag = val
                }
              }
            })
          }
        })
      },
      async handleClose (item) {
        const res = await this.axios.delete(`/other/${item.id}`)
        if (res.message && res.message === 'success') this.formItem.others.splice(this.formItem.others.indexOf(item), 1)
      },
      async initData () {
        return this.axios.get('/other')
      }
    }
  }
</script>
