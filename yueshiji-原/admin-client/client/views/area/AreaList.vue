<template>
	<Timeline pending>
		<Timeline-item color="green" v-for="city in citys" :key="city.id">
			<p class="time">{{city.created_at | timeFilter}}</p>
			<br>
			<p class="content">开通 <span style="color: #ff9900">{{city.province_code}}</span> <span style="color: #2d8cf0">{{city.city}}</span></p>
			<p class="content">{{city.intro}}</p>
		</Timeline-item>
		<Timeline-item><a href="/area/add">开通城市</a></Timeline-item>
	</Timeline>
</template>
<script>
	export default {
		data () {
			return {
				citys: []
			}
		},
		async created () {
			const res = await this.initData()
			this.citys = res.data
		},
		methods: {
			async initData () {
				return await this.axios.get('/area')
			}
		}
	}
</script>
