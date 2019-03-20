<style>
	.user .left img {
		width: 120px;
		height: 120px;
		border-radius: 50%
	}
	.user names {
		display: "inline";
	}
</style>
<template>
	<div>
		<Row class="user">
			<Col class="left" span="3">
				<img :src="userInfo.avatar" ></img>
			</Col>
			<Col class="right" span="9">
				<p>ID: &nbsp&nbsp{{userInfo.id}}</p>
				<p>昵称: &nbsp&nbsp{{userInfo.nickname}}</p>
				<p>性别: &nbsp&nbsp{{userInfo.sex ? userInfo.sex.info : '未知'}}</p>
				<p>地区: &nbsp&nbsp{{userInfo.province ? (userInfo.province + userInfo.city + userInfo.country) : '未填写'}}</p>
				<p>手机: &nbsp&nbsp{{userInfo.phone ? userInfo.phone : '未绑定'}}</p>
				<p>会员: &nbsp&nbsp{{vip && vip.isVip ? vip.expire_time : '否' | timeFilter}}</p>
			</Col>
    </Row>
		<Tabs style="marginTop: 20px" @on-click='changeTab' :value='tab'>
			<Tab-pane label="会员卡信息" icon="card">
				<Card style="width:100%;marginTop:20px" v-for="item in tab0.rows" :key='item.id'>
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						{{item.name}}
					</p>
					<a v-if="item.status.status === '1'" slot="extra" style="color: green">
						状态: 使用中&nbsp&nbsp&nbsp&nbsp
					</a>
					<a v-if="item.status.status === '0'" slot="extra" style="color: red">
						状态: 已过期&nbsp&nbsp&nbsp&nbsp
					</a>
					<a slot="extra">
						卡号: {{item.no}}
					</a>
					<p>
						共计花费: ¥{{item.total_money}}
					</p>
					<p>
						购买日期: {{item.created_at | timeFilter}}
					</p>
					<p>
						赏味期限: {{item.expire_time | timeFilter}}
					</p>
				</Card>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab0.per_page" :total="tab0.count" :current="1" @on-change="changeTab0Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="购买记录" icon="lightbulb">
				<Table stripe :columns="tab1.columns" :data="tab1.rows" @on-sort-change='changeTab1Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab1.per_page" :total="tab1.count" :current="1" @on-change="changeTab1Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="激活记录" icon="arrow-swap">
				<Table stripe :columns="tab2.columns" :data="tab2.rows" @on-sort-change='changeTab2Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab2.per_page" :total="tab2.count" :current="1" @on-change="changeTab2Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="邀请记录" icon="android-share">
				<Table stripe :columns="tab3.columns" :data="tab3.rows" @on-sort-change='changeTab3Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab3.per_page" :total="tab3.count" :current="1" @on-change="changeTab3Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="特权记录" icon="record">
				<Table stripe :columns="tab4.columns" :data="tab4.rows" @on-sort-change='changeTab4Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab4.per_page" :total="tab4.count" :current="1" @on-change="changeTab4Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="用户消息" icon="android-mail">
				<Table stripe :columns="tab5.columns" :data="tab5.rows" @on-sort-change='changeTab5Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab5.per_page" :total="tab5.count" :current="1" @on-change="changeTab5Page"></Page>
				</div>
			</Tab-pane>
		</Tabs>
	</div>
</template>
<script>
	import {timeFilter} from '../../filters/index.js'
	export default {
		data () {
      return {
				userInfo: {},
				vip: {},
				ID: '',
				tab0: {
					rows: [],
					count: 0,
					page: 1,
					per_page: 10
				},
				tab1: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '订单ID',
							key: 'id',
							sortable: 'custom',
							width: 100
						},
						{
							title: '订单号',
							key: 'order_num',
							width: 150
						},
						{
							title: '总金额',
							key: 'total_fee',
							width: 100
						},
						{
							title: '应付金额',
							key: 'should_fee',
							width: 100
						},
						{
							title: '实付金额',
							key: 'actual_fee',
							width: 100
						},
						{
							title: '平台优惠券',
							key: 'coupon_id',
							width: 100,
							render: (h, params) => {
								return h('span', (params.row.coupon_id ? params.row.coupon_id : '无'))
							}
						},
						{
							title: '餐厅优惠券',
							key: 'restaurant_coupon_id',
							width: 100,
							render: (h, params) => {
								return h('span', (params.row.restaurant_coupon_id ? params.row.restaurant_coupon_id : '无'))
							}
						},
						{
							'title': '激活时长',
							'key': 'expire',
							'width': 100,
							render: (h, params) => {
								return h('span', (params.row.card.expire_in + params.row.card.expire_time))
							}
						},
						{
							'title': '订单状态',
							'key': 'status',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.status.status === '1') color = 'blue'
								if (params.row.status.status === '0') color = 'red'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.status.info)
							}
						},
						{
							'title': '支付类型',
							'key': 'type',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.type.type === '2') color = 'blue'
								if (params.row.type.type === '1') color = 'blue'
								if (params.row.type.type === '0') color = 'red'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.type.info)
							}
						},
						{
							title: '用户ID',
							key: 'user_id',
							width: 100
						},
						{
							'title': '创建时间',
							'key': 'created_at',
							'width': 200,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						},
						{
							'title': '更新时间',
							'key': 'updated_at',
							'width': 200,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						}
					],
					rows: [],
					count: 0,
					sortby: 'id',
					order: 'desc',
					filter: ''
				},
				tab2: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '订单ID',
							key: 'id',
							sortable: 'custom',
							width: 100
						},
						{
							title: '订单号',
							key: 'order_num',
							width: 150
						},
						{
							title: '总金额',
							key: 'total_fee',
							width: 100
						},
						{
							title: '应付金额',
							key: 'should_fee',
							width: 100
						},
						{
							title: '实付金额',
							key: 'actual_fee',
							width: 100
						},
						{
							title: '平台优惠券',
							key: 'coupon_id',
							width: 100,
							render: (h, params) => {
								return h('span', (params.row.coupon_id ? params.row.coupon_id : '无'))
							}
						},
						{
							title: '餐厅优惠券',
							key: 'restaurant_coupon_id',
							width: 100,
							render: (h, params) => {
								return h('span', (params.row.restaurant_coupon_id ? params.row.restaurant_coupon_id : '无'))
							}
						},
						{
							'title': '激活时长',
							'key': 'expire',
							'width': 100,
							render: (h, params) => {
								return h('span', (params.row.card.expire_in + params.row.card.expire_time))
							}
						},
						{
							'title': '订单状态',
							'key': 'status',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.status.status === '1') color = 'blue'
								if (params.row.status.status === '0') color = 'red'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.status.info)
							}
						},
						{
							'title': '支付类型',
							'key': 'type',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.type.type === '2') color = 'blue'
								if (params.row.type.type === '1') color = 'blue'
								if (params.row.type.type === '0') color = 'red'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.type.info)
							}
						},
						{
							title: '用户ID',
							key: 'user_id',
							width: 100
						},
						{
							'title': '创建时间',
							'key': 'created_at',
							'width': 200,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						},
						{
							'title': '更新时间',
							'key': 'updated_at',
							'width': 200,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						}
					],
					rows: [],
					count: 0,
					sortby: 'id',
					order: 'desc',
					filter: ''
				},
				tab3: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '邀请ID',
							key: 'id',
							sortable: 'custom',
							width: 300
						},
						{
							'title': '邀请用户',
							'key': 'user_id',
							'width': 300,
							render: (h, params) => {
								return h('a', {
									on: {
										click: function () {
											window.location.href = `http://${location.host}/users/detail/${params.row.user_id}`
										}
									},
									props: {
										color: 'green'
									}
								}, params.row.user_id)
							}
            },
						{
							'title': '邀请状态',
							'key': 'status',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.status.status === '0') color = 'red'
								if (params.row.status.status === '1') color = 'green'
								if (params.row.status.status === '2') color = 'green'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.status.info)
							}
						},
						{
							'title': '奖励状态',
							'key': 'prize_status',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.prize_status.status === '0') color = 'red'
								if (params.row.prize_status.status === '1') color = 'green'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.prize_status.info)
							}
						},
						{
							'title': '创建时间',
							'key': 'created_at',
							'width': 300,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						},
						{
							'title': '更新时间',
							'key': 'updated_at',
							'width': 300,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						}
					],
					rows: [],
					count: 0,
					sortby: 'id',
					order: 'desc',
					filter: ''
				},
				tab4: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '记录ID',
							key: 'id',
							sortable: 'custom',
							width: 300
						},
						{
							title: '金额',
							key: 'money',
							width: 300
						},
						{
							'title': '餐厅',
							'key': 'restaurant_id',
							'width': 300,
							render: (h, params) => {
								return h('router-link', {
									props: {
										to: {
											name: '查看商户详细信息',
											params: {
												id: params.row.specialty.restaurant.id
											}
										}
									}
								}, params.row.specialty.restaurant.name)
							}
            },
						{
							title: '用户ID',
							key: 'user_id',
							width: 300
						},
						{
							'title': '创建时间',
							'key': 'created_at',
							'width': 300,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						},
						{
							'title': '更新时间',
							'key': 'updated_at',
							'width': 300,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						}
					],
					rows: [],
					count: 0,
					sortby: 'id',
					order: 'desc',
					filter: ''
				},
				tab5: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '消息ID',
							key: 'id',
							sortable: 'custom'
						},
						{
							title: '标题',
							key: 'title'
						},
						{
							title: '内容',
							key: 'content'
						},
						{
							'title': '链接',
							'key': 'url',
							'width': 150,
							render: (h, params) => {
								return h('router-link', {
									props: {
										to: params.row.url
									}
								}, params.row.url)
							}
            },
						{
							'title': '状态',
							'key': 'status',
							'width': 150,
							render: (h, params) => {
								let color
								if (params.row.status.status === '1') color = 'blue'
								if (params.row.status.status === '0') color = 'red'
								return h('Tag', {
									props: {
										color: color
									}
								}, params.row.status ? params.row.status.info : '未知')
							},
							filters: [
								{
									label: '未读',
									value: '{"status": {"$eq": "0"}}'
								},
								{
									label: '已读',
									value: '{"status": {"$eq": "1"}}'
								}
							],
							filterMultiple: false,
							async filterRemote (value, row) {
								this.$parent.$parent.tab5.filter = value[0] ? value[0] : ''
								const res = await this.$parent.$parent.getTab5Data()
								this.$parent.$parent.tab5.rows = res.data.rows
								this.$parent.$parent.tab5.count = res.data.count
							}
						},
						{
							'title': '创建时间',
							'key': 'created_at',
							'width': 150,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						},
						{
							'title': '更新时间',
							'key': 'updated_at',
							'width': 150,
							'sortable': 'custom',
							render: (h, params) => {
								return h('span', timeFilter(params.row.created_at))
							}
						}
					],
					rows: [],
					count: 0,
					sortby: 'id',
					order: 'desc',
					filter: ''
				},
				tab: 0
			}
		},
		async created () {
			const res = await this.initData()
			this.userInfo = res.data.user_info
			this.vip = res.data.user_vip
			await this.changeTab(this.tab)
		},
		methods: {
			async initData () {
				this.ID = this.$route.params.id
				if (!this.ID) this.$router.go(-1)
				return this.axios.get(`/user/${this.ID}`)
			},
			async getTab0Data () {
				const url = `/vip?user_id=${this.ID}&page=${this.tab0.page}&per_page=${this.tab0.per_page}`
				return await this.axios.get(url)
			},
			async getTab1Data () {
				const url = `/order?user_id=${this.ID}&type=1&page=${this.tab1.page}&per_page=${this.tab1.per_page}`
				return await this.axios.get(url)
			},
			async getTab4Data () {
				const url = `/record?user_id=${this.ID}&page=${this.tab4.page}&per_page=${this.tab4.per_page}`
				return await this.axios.get(url)
			},
			async getTab2Data () {
				const url = `/order?user_id=${this.ID}&type=2&status=1&page=${this.tab2.page}&per_page=${this.tab2.per_page}`
				return await this.axios.get(url)
			},
			async getTab3Data () {
				const url = `/invite?inviter_id=${this.ID}&page=${this.tab3.page}&per_page=${this.tab3.per_page}`
				return await this.axios.get(url)
			},
			async getTab5Data () {
				const url = `/news?user_id=${this.ID}&page=${this.tab5.page}&per_page=${this.tab5.per_page}&filter=${this.tab5.filter}&order=${this.tab5.order}&sortby=${this.tab5.sortby}`
				return await this.axios.get(url)
			},
			async changeTab (tab) {
				this.tab = tab
				switch (tab) {
					case 0:
						const res0 = await this.getTab0Data()
						this.tab0.rows = res0.data.rows
						this.tab0.count = res0.data.count
						break
					case 1:
						const res1 = await this.getTab1Data()
						this.tab1.rows = res1.data.rows
						this.tab1.count = res1.data.count
						break
					case 2:
						const res2 = await this.getTab2Data()
						this.tab2.rows = res2.data.rows
						this.tab2.count = res2.data.count
						break
					case 3:
						const res3 = await this.getTab3Data()
						this.tab3.rows = res3.data.rows
						this.tab3.count = res3.data.count
						break
					case 4:
						const res4 = await this.getTab4Data()
						this.tab4.rows = res4.data.rows
						this.tab4.count = res4.data.count
						break
					case 5:
						const res5 = await this.getTab5Data()
						this.tab5.rows = res5.data.rows
						this.tab5.count = res5.data.count
						break
				}
			},
			async changeTab0Page (size) {
				this.tab0.page = size
				this.changeTab(this.tab)
			},
			async changeTab1Page (size) {
				this.tab1.page = size
				this.changeTab(this.tab)
			},
			async changeTab1Sort (sort) {
				this.tab1.order = sort.order
				this.tab1.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab2Page (size) {
				this.tab2.page = size
				this.changeTab(this.tab)
			},
			async changeTab2Sort (sort) {
				this.tab2.order = sort.order
				this.tab2.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab3Page (size) {
				this.tab3.page = size
				this.changeTab(this.tab)
			},
			async changeTab3Sort (sort) {
				this.tab3.order = sort.order
				this.tab3.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab4Page (size) {
				this.tab4.page = size
				this.changeTab(this.tab)
			},
			async changeTab4Sort (sort) {
				this.tab4.order = sort.order
				this.tab4.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab5Page (size) {
				this.tab5.page = size
				this.changeTab(this.tab)
			},
			async changeTab5Sort (sort) {
				this.tab5.order = sort.order
				this.tab5.sortby = sort.key
				this.changeTab(this.tab)
			}
		}
	}
</script>
