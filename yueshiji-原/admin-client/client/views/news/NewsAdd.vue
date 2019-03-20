<template>
  <Form :model="formItem" :label-width="80">
    <Form-item label="消息标题">
      <Input autofocus :maxlength='10' v-model="formItem.title" placeholder="请输入此次发送消息的标题"></Input>
    </Form-item>
    <Form-item label="消息内容">
      <Input v-model="formItem.content" :step="10" :maxlength='100' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入消息内容,最长100字符..."></Input>
    </Form-item>
    <Form-item label="消息链接">
      <Tooltip content="可选,输入此批消息的外链">
        <Input style="width:260px" autofocus :maxlength='20' v-model="formItem.url" placeholder="请输入消息链接,最长20字符"></Input>
      </Tooltip>
    </Form-item>
    <Form-item label="发送对象">
			<Tooltip content="如需增加选项,联系技术">
				<Select style="width:260px" v-model="formItem.case" placeholder="请选择">
					<Option value="0">全部用户</Option>
					<Option value="1">所有帅哥</Option>
					<Option value="2">所有美女</Option>
					<Option value="3">未知性别</Option>
					<Option value="4">北京地区</Option>
					<Option value="5">上海地区</Option>
					<Option value="6">一周未登录</Option>
					<Option value="7">一月未登录</Option>
					<Option value="8">会员</Option>
					<Option value="9">非会员</Option>
				</Select>
      </Tooltip>
    </Form-item>
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
          case: '',
					title: '',
					content: '',
					url: ''
        }
      }
    },
    async created () {
    },
    methods: {
      async submit () {
        const title = '表单提交错误'
        let content = ''
        if (!this.formItem.title) content += '<p>消息标题不能为空</p>'
        if (!this.formItem.content) content += '<p>消息内容不能为空</p>'
        if (!this.formItem.case) content += '<p>消息发送对象不能为空</p>'
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          const res = await this.axios.post('/news', this.formItem)
          if (res.message && res.message === 'success') this.$router.push({path: '/news', reload: true})
        }
      }
    }
  }
</script>
