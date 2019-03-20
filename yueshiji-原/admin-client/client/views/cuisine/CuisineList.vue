<template>
  <Form :model="formItem" :label-width="150">
    <Form-item label="菜系列表">
      <Tag v-for="item in formItem.cuisines" :key="item" closable @on-close="handleClose(item)">{{item.cuisine}}</Tag>
      </Form-item>
    <Form-item label="添加菜系">
      <Button icon="ios-plus-empty" style="color:red" type="dashed" size="small" @click="handleAdd">添加菜系</Button>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          cuisines: [],
          input_tag: null
        }
      }
    },
    async created () {
      const res = await this.initData()
      this.formItem.cuisines = res.data
    },
    methods: {
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/cuisine', {cuisine: this.formItem.input_tag})
              if (res.message && res.message === 'success') this.formItem.cuisines.push(res.data)
              this.formItem.input_tag = ''
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '请输入菜系名称',
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
        const res = await this.axios.delete(`/cuisine/${item.id}`)
        if (res.message && res.message === 'success') this.formItem.cuisines.splice(this.formItem.cuisines.indexOf(item), 1)
      },
      async initData () {
        return this.axios.get('/cuisine')
      }
    }
  }
</script>
