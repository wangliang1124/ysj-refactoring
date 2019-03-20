<template>
  <div>
    <Input v-model="q" placeholder="搜索消息" @on-change='searchUser'>
      <Select v-model="field" slot="prepend" style="width: 80px">
          <Option value="user_id">用户ID</Option>
          <Option value="title">标题</Option>
          <Option value="content">内容</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click='searchUser'></Button>
    </Input>
    <Table :columns='columns' :data='data' size='small' ref='table' @on-sort-change='changeSort'></Table>
    <br>
    <Button type='primary' size='large' @click='$router.push({name: "新增消息"})'><Icon type='ios-download-outline'></Icon> 新增消息</Button>
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
            'title': '标题',
            'key': 'title',
            'width': 150
          },
          {
            'title': '内容',
            'key': 'content',
            'width': 150
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
            'title': '用户ID',
            'key': 'user_id',
            'width': 150
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
							}, params.row.status.info)
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
							this.filter = value[0] ? value[0] : ''
							const res = await this.initData()
							this.data = res.data.rows
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
        data: [],
				count: 0,
				per_page: 20,
				sortby: 'id',
				order: 'desc',
				page: 1,
				filter: '',
        q: '',
        field: 'user_id'
      }
    },
    async created () {
      const res = await this.initData()
      this.data = res.data.rows
			this.count = res.data.count
    },
    methods: {
    exportData () {
      const data = {
        name: `news-${this.page}.xlsx`,
        tableHeader: this.$refs.table.columns.filter(c => c && c.title && c.title !== '操作').map(c => c.title),
        tableData: this.$refs.table.data.map(d => {
          return [{
            type: 'number',
            value: d.id
          }, {
            type: 'string',
            value: d.title
          }, {
            type: 'string',
            value: d.content
          }, {
            type: 'string',
            value: (d.url ? d.url : '未知')
          }, {
            type: 'number',
            value: d.user_id
          }, {
            type: 'string',
            value: (d.status ? d.status.status : '无')
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
        const url = `/news?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`
        return await this.axios.get(url)
      },
			async changeSort (sort) {
				this.order = sort.order
				this.sortby = sort.key
				const res = await this.initData()
				this.data = res.data.rows
			},
			async changePage (size) {
				this.page = size
				const res = await this.initData()
				this.data = res.data.rows
			},
      async searchUser () {
        const res = await this.initData()
				this.data = res.data.rows
      }
    }
  }
</script>
