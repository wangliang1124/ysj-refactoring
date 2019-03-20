<template>
  <div>
    <Input v-model="q" placeholder="搜索订单" @on-change='searchUser'>
      <Select v-model="field" slot="prepend" style="width: 120px">
          <Option value="order_num">订单号</Option>
          <Option value="user_id">用户ID</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click='searchUser'></Button>
    </Input>
    <Table :columns='columns' :data='data' size='small' ref='table' @on-sort-change='changeSort'></Table>
    <br>
    <Button type='primary' size='large' @click='exportData'><Icon type='ios-download-outline'></Icon> 导出原始数据</Button>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page size='small' show-total :page-size="per_page" :total="count" :current="1" @on-change="changePage"></Page>
			</div>
    </div>
  </div>
</template>
<script>
	import {timeFilter} from '../../filters/index.js'
  export default {
    data () {
      return {
        columns: [
          {
            'type': 'selection',
            'width': 30,
            'aligin': 'center',
            'fixed': 'left'
          },
          {
            'title': 'ID',
            'key': 'id',
            'fixed': 'left',
            'width': 70,
						'sortable': 'custom'
          },
          {
            'title': '订单号',
            'key': 'order_num',
            'width': 150
          },
          {
            'title': '总金额',
            'key': 'total_fee',
            'width': 150
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
						},
						filters: [
              {
                label: '未支付',
                value: '{"status": {"$eq": "0"}}'
              },
              {
                label: '已支付',
                value: '{"status": {"$eq": "1"}}'
              },
							{
                label: '已失效',
                value: '{"status": {"$eq": "2"}}'
              }
            ],
            filterMultiple: false,
						async filterRemote (value, row) {
							this.filter = value[0] ? value[0] : ''
							const res = await this.initData()
              this.data = res.data.rows
              this.count = res.data.count
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
						},
						filters: [
              {
                label: '未支付',
                value: '{"type": {"$eq": "0"}}'
              },
              {
                label: '现金支付',
                value: '{"type": {"$eq": "1"}}'
              },
							{
                label: '激活码兑换',
                value: '{"type": {"$eq": "2"}}'
              }
            ],
            filterMultiple: false,
						async filterRemote (value, row) {
							this.filter = value[0] ? value[0] : ''
							const res = await this.initData()
              this.data = res.data.rows
              this.count = res.data.count
						}
          },
          {
            'title': '用户昵称',
            'width': 150,
            render: (h, params) => {
              return h('a', {
                props: {
                },
                on: {
                  click: () => {
                    this.$router.push(`/users/detail/${params.row.user_id}`)
                  }
                }
              }, params.row.user.nickname)
            }
          },
          {
            'title': '玥享卡',
            'width': 150,
            render: (h, params) => {
              return h('span', {
                props: {
                }
              }, params.row.card ? params.row.card.name : '加载中')
            }
          },
          {
            'title': '购买数量',
            'key': 'count',
            'width': 150
          },
          {
            'title': '玥享券',
            'width': 150,
            render: (h, params) => {
              return h('span', {
                props: {
                }
              }, params.row.card ? params.row.card.quan : '未使用')
            }
          },
          {
            'title': '收货姓名',
            'key': 'user_name',
            'width': 150
          },
          {
            'title': '电话号码',
            'key': 'tel_number',
            'width': 150
          },
          {
            'title': '国家码',
            'key': 'national_code',
            'width': 150
          },
          {
            'title': '邮编',
            'key': 'postal_code',
            'width': 150
          },
          {
            'title': '省份',
            'key': 'province_name',
            'width': 150
          },
          {
            'title': '城市',
            'key': 'city_name',
            'width': 150
          },
          {
            'title': '区县/街道',
            'key': 'country_name',
            'width': 150
          },
          {
            'title': '详细地址',
            'key': 'detail_info',
            'width': 150
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
							return h('span', timeFilter(params.row.updated_at))
						}
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
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
                    click: async () => {
                      let url = `http://${location.hostname}:3000/api/v1/protocol/order?orderId=${params.row.id}`
                      window.open(url)
                    }
                  }
                }, '下载合同')
              ])
            }
          }
        ],
        data: [],
				count: 0,
				per_page: 20,
				sortby: 'id',
				order: 'desc',
				page: 1,
				filter: '',
        q: '',
        field: 'id'
      }
    },
    async created () {
      let res = await this.initData()
      this.data = res.data.rows
			this.count = res.data.count
    },
    methods: {
    exportData () {
      const data = {
        name: `order-${this.page}.xlsx`,
        tableHeader: this.$refs.table.columns.filter(c => c && c.title && c.title !== '操作').map(c => c.title),
        tableData: this.$refs.table.data.map(d => {
          return [{
            type: 'number',
            value: d.id
          }, {
            type: 'number',
            value: d.order_num
          }, {
            type: 'number',
            value: d.total_fee
          }, {
            type: 'string',
            value: (d.status ? d.status.info : '未知')
          }, {
            type: 'string',
            value: (d.type ? d.type.info : '未知')
          }, {
            type: 'string',
            value: d.user.nickname
          }, {
            type: 'string',
            value: (d.card ? d.card.name : '未知')
          }, {
            type: 'number',
            value: d.count
          }, {
            type: 'string',
            value: '未使用'
          }, {
            type: 'string',
            value: d.user_name
          }, {
            type: 'string',
            value: d.tel_number
          }, {
            type: 'string',
            value: d.national_code
          }, {
            type: 'string',
            value: d.postal_code
          }, {
            type: 'string',
            value: d.province_name
          }, {
            type: 'string',
            value: d.city_name
          }, {
            type: 'string',
            value: d.country_name
          }, {
            type: 'string',
            value: d.detail_info
          }, {
            type: 'date',
            value: (d.created_at ? new Date(d.created_at) : '无')
          }, {
            type: 'date',
            value: (d.updated_at ? new Date(d.updated_at) : '无')
          }]
        })
      }
      let stringData = JSON.stringify(data)
      let url = `http://${location.hostname}:3000/api/v1/excel/type?data=${stringData}`
      window.open(url)
    },
      async initData () {
        const url = `/order?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`
        return await this.axios.get(url)
      },
			async changeSort (sort) {
				this.order = sort.order
				this.sortby = sort.key
				const res = await this.initData()
        this.data = res.data.rows
        this.count = res.data.count
			},
			async changePage (size) {
				this.page = size
				const res = await this.initData()
        this.data = res.data.rows
        this.count = res.data.count
			},
      async searchUser () {
        const res = await this.initData()
				this.data = res.data.rows
        this.count = res.data.count
      },
      addActivations () {
      }
    }
  }
</script>
