<template>
  <Form :model="formItem" :label-width="80">
    <Form-item label="尊享卡名称">
      <Input autofocus :maxlength='10' v-model="formItem.name" placeholder="请输入尊享卡名称,如:年卡、次卡"></Input>
    </Form-item>
    <Form-item label="尊享卡价格">
      <Tooltip content="请输入正整数">
        <Input-number autofocus :step="10" :min="1" :max="100000000" v-model="formItem.price_unit" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="使用次数">
      <Tooltip content="0代表不限制使用次数">
        <Input-number autofocus :step="1" :min="0" :max="100000000" v-model="formItem.limit" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="排序">
      <Tooltip content="排序值大的显示在列表上方">
        <Input-number autofocus :step="1" :min="0" :max="100000000" v-model="formItem.index" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="有效期">
      <Tooltip content="结合时长单位使用,如 1年">
        <Input-number autofocus :step="1" :min="1" :max="100000000" v-model="formItem.expire_in" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="时长单位">
      <Select v-model="formItem.expire_time" placeholder="请选择">
        <Option value="day">天</Option>
        <Option value="month">月</Option>
        <Option value="year">年</Option>
      </Select>
    </Form-item>
    <Form-item label="尊享卡简介">
      <Input v-model="formItem.intro" :step="10" :maxlength='100' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
    </Form-item>
    <Form-item label="尊享卡标签">
      <Checkbox-group v-model="formItem.tags">
        <Checkbox :label="item.tag" v-for="item in formItem.tags_array" :key="item.id">
          <Tag :name="item.tag" closable @on-close="handleClose(item.id)">{{item.tag}}</Tag>
        </Checkbox>
        <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
      </Checkbox-group>
    </Form-item>
    <Form-item label="尊享卡城市">
      <Checkbox-group v-model="formItem.citys">
        <Checkbox :label="item.id" v-for="item in formItem.citys_area" :key="item.id">
          <Tag :name="item.id" @on-close="handleClose(item.id)">{{item.city}}</Tag>
        </Checkbox>
      </Checkbox-group>
    </Form-item>
    <Form-item>
      <Button type="primary" @click='submit'>提交</Button>
      <Button type="ghost" style="margin-left: 8px" @click='$router.go(-1)'>取消</Button>
    </Form-item>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          id: null,
          name: '',
          price_unit: 1,
          index: 0,
          expire_in: 1,
          expire_time: 'day',
          limit: 0,
          intro: '',
          tags: [],
          input_tag: '',
          tags_array: [],
          citys: [],
          citys_area: []
        }
      }
    },
    async created () {
      if (!this.$route.params.formItem) {
        this.$router.go(-1)
      } else {
        const res = await this.initData()
        let formItem = this.$route.params.formItem
        formItem.tags_array = res.data
        formItem.tags = formItem.card_tags.map(t => t.tag)
        const citys = formItem.restaurant_areas.map(r => r.id)
        const res2 = await this.initAreaData()
        this.formItem = {
          id: formItem.id ? formItem.id : null,
          index: formItem.index ? formItem.index : 0,
          name: formItem.name ? formItem.name : '',
          price_unit: formItem.price_unit ? formItem.price_unit : 1,
          expire_in: formItem.expire_in ? formItem.expire_in : 1,
          expire_time: formItem.expire_time ? formItem.expire_time : 'day',
          limit: formItem.limit ? formItem.limit : 0,
          intro: formItem.intro ? formItem.intro : '',
          tags: formItem.tags ? formItem.tags : [],
          input_tag: '',
          tags_array: formItem.tags_array ? formItem.tags_array : [],
          citys_area: res2.data,
          citys: citys
        }
      }
    },
    methods: {
      async initData () {
        return await this.axios.get('/tag/card')
      },
      async initAreaData () {
        return await this.axios.get('/area')
      },
      async handleClose (id) {
        await this.axios.delete(`/tag/card/${id}`)
        const res = await this.initData()
        this.formItem.tags_array = res.data
      },
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/tag/card', {tag: this.formItem.input_tag})
              if (res.message && res.message === 'success') this.formItem.tags_array.push(res.data)
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '输入标签名称',
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
      async submit () {
        const title = '表单提交错误'
        let content = ''
        if (!this.formItem.name) content += '<p>尊享卡名称不能为空</p>'
        if (!this.formItem.intro) content += '<p>尊享卡介绍不能为空</p>'
        if (!this.formItem.price_unit) content += '<p>尊享卡价格不能为空</p>'
        if (!this.formItem.expire_in) content += '<p>尊享卡有效期不能为空</p>'
        if (!this.formItem.expire_time) content += '<p>尊享卡有效期单位不能为空</p>'
        if (!this.formItem.citys || this.formItem.citys.length < 1) content += '<p>尊享卡至少匹配一个城市!</p>'
        if (typeof this.formItem.limit !== 'number') content += '<p>尊享卡使用次数限制填写错误</p>'
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          const res = await this.axios.put(`/card/${this.formItem.id}`, this.formItem)
          if (res.message && res.message === 'success') this.$router.push('/card')
        }
      }
    }
  }
</script>
