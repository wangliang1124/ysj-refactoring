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
				<img :src="data.cover" ></img>
			</Col>
			<Col class="right" span="9">
				<p>ID: &nbsp&nbsp{{data.id}}</p>
				<p>名称: &nbsp&nbsp{{data.name}}</p>
				<p>地址: &nbsp&nbsp{{data.address}}</p>
				<p>人均: &nbsp&nbsp{{data.unit_average}}元</p>
				<p>电话: &nbsp&nbsp{{data.tel ? data.tel : '未填写'}}</p>
				<p>手机: &nbsp&nbsp{{data.phone ? data.phone : '未填写'}}</p>
			</Col>
			<Col class="right" span="9">
				<p>菜系: &nbsp&nbsp{{data.restaurant_cuisine ? data.restaurant_cuisine.cuisine : '无'}}</p>
				<p>区域: &nbsp&nbsp{{data.restaurant_district ? data.restaurant_district.district : '无'}}</p>
				<p>场景: &nbsp&nbsp{{data.restaurant_scene ? data.restaurant_scene.scene : '无'}}</p>
				<p>其他: &nbsp&nbsp{{data.restaurant_other ? data.restaurant_other.other : '无'}}</p>
				<p>合约期限: &nbsp&nbsp{{data.contract_time | timeFilter}}</p>
			</Col>
    </Row>
		<Tabs style="marginTop: 20px" @on-click='changeTab' :value='tab'>
			<Tab-pane label="商户特色菜" icon="card">
				<Table :columns='tab0.columns' :data='tab0.rows' size='small' ref='table' @on-sort-change='changeTab0Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab0.per_page" :total="tab0.count" :current="1" @on-change="changeTab0Page"></Page>
				</div>
				<Button type="primary" v-if="tab0.rows.length === 0" @click="$router.push(`/specialty/add/${$route.params.id}`)">新增特色菜</Button>
			</Tab-pane>
			<Tab-pane label="享用记录" icon="record">
				<Table :columns='tab1.columns' :data='tab1.rows' size='small' ref='table' @on-sort-change='changeTab1Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab1.per_page" :total="tab1.count" :current="1" @on-change="changeTab1Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="点赞记录" icon="arrow-swap">
				<Table :columns='tab2.columns' :data='tab2.rows' size='small' ref='table' @on-sort-change='changeTab2Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab2.per_page" :total="tab2.count" :current="1" @on-change="changeTab2Page"></Page>
				</div>
			</Tab-pane>
			<Tab-pane label="收藏记录" icon="android-share">
				<Table :columns='tab3.columns' :data='tab3.rows' size='small' ref='table' @on-sort-change='changeTab3Sort'></Table>
				<div style="float: right;marginTop:20px">
					<Page size='small' show-total :page-size="tab3.per_page" :total="tab3.count" :current="1" @on-change="changeTab3Page"></Page>
				</div>
			</Tab-pane>
		</Tabs>
	</div>
</template>
<script>
	import {timeFilter} from '../../filters/index.js'
	import img from '../imgs/img.vue'
	export default {
		data () {
      return {
				data: {},
				ID: '',
				tab0: {
					rows: [],
					count: 0,
					page: 1,
					per_page: 10,
					columns: [{
            'title': 'ID',
            'key': 'id',
            'fixed': 'left',
            'width': 70,
						'sortable': 'custom'
          }, {
            'title': '名称',
            'key': 'name',
            'width': 300
          }, {
            'title': '封面',
            'key': 'cover',
            'width': 150,
            render: (h, params) => {
              return h(img, {
								props: {
									url: params.row.cover,
                  imgs: [],
                  view: false
								}
							})
            }
          }, {
            'title': '简介',
            'key': 'intro',
            'width': 300
          }, {
            'title': '种类',
            'key': 'type',
            'width': 100
          }, {
            'title': '价值/元',
            'key': 'value',
            'width': 100
          }, {
            'title': '收藏数',
            'key': 'collected',
            'width': 100
          }, {
            'title': '点赞数',
            'key': 'liked',
            'width': 100
          }, {
            'title': '厨师头像',
            'key': 'cook_avatar',
            'width': 150,
            render: (h, params) => {
              return h(img, {
								props: {
									url: params.row.cook_avatar,
                  imgs: [],
                  view: false
								}
							})
            }
          }, {
            'title': '厨师姓名',
            'key': 'cook_name',
            'width': 100
          }, {
            'title': '厨师简介',
            'key': 'cook_intro',
            'width': 200
          }, {
            'title': '超赞主厨',
            'key': 'cook_super',
            'width': 100,
            render: (h, params) => {
              return h('span', params.cook_super ? '是' : '否')
            }
          }, {
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
							return h('span', timeFilter(params.row.updated_at))
						}
          }, {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
												name: '编辑特色菜',
												params: {
													id: params.row.id
												}
											})
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginTop: '10px',
                    marginRight: '5px'
                  },
                  on: {
                    click: async () => {
                      let res = await this.axios.delete(`/specialty/${params.row.id}`)
                      if (res.message && res.message === 'success') {
                        this.tab0.rows.map(r => {
                          if (r.id === params.row.id) {
                            this.tab0.rows.splice(this.tab0.rows.indexOf(r), 1)
                          }
                        })
                      }
                    }
                  }
                }, '删除')
              ])
            }
          }]
				},
				tab1: {
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
							'title': '特色菜',
							'key': 'specialty',
							'width': 300,
							render: (h, params) => {
								return h('span', params.row.specialty.name)
							}
            },
						{
							'title': '用户',
							'key': 'restaurant_id',
							'width': 300,
							render: (h, params) => {
								return h('router-link', {
									props: {
										to: {
											name: '用户详情',
											params: {
												id: params.row.user_id
											}
										}
									}
								}, params.row.user_id)
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
				tab2: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '收藏ID',
							key: 'id',
							sortable: 'custom',
							width: 300
						},
						{
							'title': '用户',
							'key': 'restaurant_id',
							'width': 300,
							render: (h, params) => {
								return h('router-link', {
									props: {
										to: {
											name: '用户详情',
											params: {
												id: params.row.user_id
											}
										}
									}
								}, params.row.user_id)
							}
            },
						{
							'title': '特色菜',
							'key': 'specialty',
							'width': 300,
							render: (h, params) => {
								return h('span', params.row.specialty.name)
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
				tab3: {
					page: 1,
					per_page: 10,
					columns: [
						{
							title: '收藏ID',
							key: 'id',
							sortable: 'custom',
							width: 300
						},
						{
							'title': '用户',
							'key': 'restaurant_id',
							'width': 300,
							render: (h, params) => {
								return h('router-link', {
									props: {
										to: {
											name: '用户详情',
											params: {
												id: params.row.user_id
											}
										}
									}
								}, params.row.user_id)
							}
            },
						{
							'title': '特色菜',
							'key': 'specialty',
							'width': 300,
							render: (h, params) => {
								return h('span', params.row.specialty.name)
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
				tab: 0
			}
		},
		async mounted () {
			const res = await this.initData()
			this.data = res.data
			await this.changeTab(this.tab)
		},
		methods: {
			async initData () {
				this.ID = this.$route.params.id
				if (!this.ID) this.$router.go(-1)
				return this.axios.get(`/restaurant/${this.ID}`)
			},
			async getTab0Data () {
				const url = `/specialty?restaurant_id=${this.ID}&page=${this.tab0.page}&per_page=${this.tab0.per_page}`
				return await this.axios.get(url)
			},
			async getTab1Data () {
				const url = `/record?restaurant_id=${this.ID}&page=${this.tab1.page}&per_page=${this.tab1.per_page}`
				return await this.axios.get(url)
			},
			async getTab2Data () {
				const url = `/like?restaurant_id=${this.ID}&page=${this.tab2.page}&per_page=${this.tab2.per_page}`
				return await this.axios.get(url)
			},
			async getTab3Data () {
				const url = `/collect?restaurant_id=${this.ID}&page=${this.tab3.page}&per_page=${this.tab3.per_page}`
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
				}
			},
			async changeTab0Page (size) {
				this.tab0.page = size
				this.changeTab(this.tab)
			},
			async changeTab0Sort () {
				this.tab0.order = sort.order
				this.tab0.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab1Page (size) {
				this.tab1.page = size
				this.changeTab(this.tab)
			},
			async changeTab1Sort () {
				this.tab1.order = sort.order
				this.tab1.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab2Page (size) {
				this.tab2.page = size
				this.changeTab(this.tab)
			},
			async changeTab2Sort () {
				this.tab2.order = sort.order
				this.tab2.sortby = sort.key
				this.changeTab(this.tab)
			},
			async changeTab3Page (size) {
				this.tab3.page = size
				this.changeTab(this.tab)
			},
			async changeTab3Sort () {
				this.tab3.order = sort.order
				this.tab3.sortby = sort.key
				this.changeTab(this.tab)
			}
		}
	}
</script>
