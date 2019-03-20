<template>
  <Form :model="formItem" :label-width="150">
    <Form-item label="选择城市">
      <Select v-model="formItem.city" placeholder="请选择" @on-change="selectChange">
        <Option v-for="item in formItem.citys" :key="item" :value="item.id">{{item.city}}</Option>
      </Select>
    </Form-item>
    <Form-item label="商圈列表">
      <Tag v-for="item in formItem.districts" :key="item" closable @on-close="handleClose(item)">{{item.district}}</Tag>
      </Form-item>
    <Form-item label="添加商圈">
      <Button icon="ios-plus-empty" style="color:red" type="dashed" size="small" @click="handleAdd">添加商圈</Button>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          city: 1,
          districts: [],
          select: null,
          input_tag: null,
          citys: []
        }
      }
    },
    async created () {
      const res = await this.initData()
      this.formItem.districts = res.data
      const area = await this.initCityData()
      this.formItem.citys = area.data
    },
    methods: {
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/district', {district: this.formItem.input_tag, restaurant_area_id: this.formItem.city})
              if (res.message && res.message === 'success') this.formItem.districts.push(res.data)
              this.formItem.input_tag = ''
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '请输入商圈名称',
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
        const res = await this.axios.delete(`/district/${item.id}`)
        if (res.message && res.message === 'success') this.formItem.districts.splice(this.formItem.districts.indexOf(item), 1)
      },
      async initData () {
        return this.axios.get(`/district?restaurant_area_id=${this.formItem.city}&per_page=1000`)
      },
      async initCityData () {
        return this.axios.get('/area')
      },
      async selectChange (value) {
        this.formItem.city = value
        const res = await this.initData()
        this.formItem.districts = res.data
        const area = await this.initCityData()
        this.formItem.citys = area.data
      }
    }
  }
</script>
