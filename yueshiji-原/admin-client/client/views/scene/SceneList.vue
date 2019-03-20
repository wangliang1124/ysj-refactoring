<template>
  <Form :model="formItem" :label-width="150">
    <Form-item label="场景列表">
      <Tag v-for="item in formItem.scenes" :key="item" closable @on-close="handleClose(item)">{{item.scene}}</Tag>
    </Form-item>
    <Form-item label="添加场景">
      <Button icon="ios-plus-empty" style="color:red" type="dashed" size="small" @click="handleAdd">添加场景</Button>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          scenes: [],
          input_tag: null
        }
      }
    },
    async created () {
      const res = await this.initData()
      this.formItem.scenes = res.data
    },
    methods: {
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/scene', {scene: this.formItem.input_tag})
              if (res.message && res.message === 'success') this.formItem.scenes.push(res.data)
              this.formItem.input_tag = ''
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '请输入场景名称',
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
        const res = await this.axios.delete(`/scene/${item.id}`)
        if (res.message && res.message === 'success') this.formItem.scenes.splice(this.formItem.scenes.indexOf(item), 1)
      },
      async initData () {
        return this.axios.get('/scene')
      }
    }
  }
</script>
