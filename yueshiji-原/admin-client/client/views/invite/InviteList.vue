<template>
  <div>
    <Input v-model="q" placeholder="搜索记录" @on-change='searchUser'>
      <Select v-model="field" slot="prepend" style="width: 120px">
          <Option value="inviter_id">邀请人ID</Option>
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
	import img from '../imgs/img.vue'
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
            'title': '邀请人',
            'width': 150,
            render: (h, params) => {
              return h('a', {
                props: {
                },
                on: {
                  click: () => {
                    this.$router.push(`/users/detail/${params.row.user.id}`)
                  }
                }
              }, params.row.user.nickname)
            }
          },
          {
            'title': '邀请人手机号',
            'width': 150,
            render: (h, params) => {
              return h('span', params.row.user.phone ? params.row.user.phone : '未填写')
            }
          },
          {
            'title': '邀请人头像',
            'key': 'avatar',
            'width': 150,
            render: (h, params) => {
              return h(img, {
								props: {
									url: params.row.user.avatar,
                  imgs: [],
                  view: false
								}
							})
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
						},
						filters: [
              {
                label: '未发放',
                value: '{"prize_status": {"$eq": "0"}}'
              },
              {
                label: '已发放',
                value: '{"prize_status": {"$eq": "1"}}'
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
            'title': '邀请状态',
            'key': 'status',
            'width': 150,
						render: (h, params) => {
							let color
							if (params.row.status.info === '注册用户') color = 'blue'
							if (params.row.status.info === '购买会员') color = 'green'
							return h('Tag', {
								props: {
									color: color
								}
							}, params.row.status.info)
						},
						filters: [
              {
                label: '注册用户',
                value: '{"status": {"$eq": "0"}}'
              },
              {
                label: '购买会员',
                value: '{"status": {"$eq": "1"}}'
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
            'title': '被邀请人',
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
              }, '点击查看')
            }
          },
          {
            'title': '邀请时间',
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
        field: 'inviter_id'
      }
    },
    async created () {
      const res = await this.initData()
      this.data = res.data.rows
			this.count = res.data.count
    },
    methods: {
      exportData (type) {
      const data = {
        name: `invite-${this.page}.xlsx`,
        tableHeader: this.$refs.table.columns.filter(c => c && c.title && c.title !== '操作' && c.title !== '邀请人头像').map(c => c.title),
        tableData: this.$refs.table.data.map(d => {
          return [{
            type: 'number',
            value: d.id
          }, {
            type: 'string',
            value: d.user.nickname
          }, {
            type: 'string',
            value: d.user.phone ? d.user.phone.toString() : '无'
          }, {
            type: 'string',
            value: (d.prize_status ? d.prize_status.info : '未知')
          }, {
            type: 'string',
            value: (d.status ? d.status.info : '未知')
          }, {
            type: 'number',
            value: d.user_id
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
        const url = `/invite?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`
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
      }
    }
  }
</script>
