<template>
	<Form :model="formItem" :label-width="80">
		<Form-item label="选择城市">
			<Select v-model="index" style="width:200px">
        <Option v-for="c in cityList" :key="c" :value="c.index" :label="c.province_code">
					<span>{{c.province_code}}</span>
					<span style="float:right;color:#ccc">{{c.city}}</span>
        </Option>
    	</Select>
		</Form-item>
		<Form-item label="记录原因">
			<Input v-model="formItem.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入开通此城市的原因"></Input>
		</Form-item>
		<Form-item label="经度">
      <Tooltip content="请输入改城市中心点经度">
				<Input v-model="formItem.location_x"></Input>
      </Tooltip>
    </Form-item>
		    <Form-item label="纬度">
      <Tooltip content="请输入改城市中心点纬度">
				<Input v-model="formItem.location_y"></Input>
      </Tooltip>
    </Form-item>
		<Form-item>
			<Button type="primary" @click="submit">提交</Button>
			<Button type="ghost" style="margin-left: 8px" @click="$router.push('/area')">取消</Button>
		</Form-item>
	</Form>
</template>
<script>
	export default {
		data () {
			return {
				formItem: {
					intro: '',
					city: '',
					province_code: '',
					location_y: null,
					location_x: null
				},
				cityList: [
					{
						province_code: '京',
						city: '北京',
						index: 0
					},
					{
						province_code: '沪',
						city: '上海',
						index: 1
					},
					{
						province_code: '粤',
						city: '深圳',
						index: 2
					},
					{
						province_code: '浙',
						city: '杭州',
						index: 3
					},
					{
						province_code: '苏',
						city: '南京',
						index: 4
					},
					{
						province_code: '渝',
						city: '重庆',
						index: 5
					}
				],
				index: 0
			}
		},
		methods: {
			async submit () {
				this.formItem.city = this.cityList[this.index].city
				this.formItem.province_code = this.cityList[this.index].province_code
				const title = '表单提交错误'
        let content = ''
        if (!this.formItem.intro) content += '<p>记录原因不能为空</p>'
        if (!this.formItem.city) content += '<p>开通城市不能为空</p>'
				if (!this.formItem.province_code) content += '<p>开通城市简称不能为空</p>'
				if (!this.formItem.location_x) content += '<p>开通城市经度不能为空,或格式不正确</p>'
				if (!this.formItem.location_y) content += '<p>开通城市纬度不能为空,或格式不正确</p>'
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          const res = await this.axios.post('/area', this.formItem)
          if (res.message && res.message === 'success') this.$router.push({path: '/area', reload: true})
        }
			}
		}
	}
</script>
