<template>
  <div>
    <Input v-model="q" placeholder="搜索激活码" @on-change='searchUser'>
      <Select v-model="field" slot="prepend" style="width: 80px">
        <Option value="id">ID</Option>
        <Option value="admin_id">管理员ID</Option>
        <Option value="intro">说明</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click='searchUser'></Button>
    </Input>
    <Table :columns='columns' :data='data' size='small' ref='table' @on-sort-change='changeSort'></Table>
    <br>
    <Button type='primary' size='large' @click="$router.push('/activation/add')"><Icon type='plus-round'></Icon>新增激活码</Button>
    <Button type='primary' size='large' @click='exportData'><Icon type='ios-download-outline'></Icon> 导出原始数据</Button>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page size='small' show-total :page-size="per_page" :total="count" :current="1" @on-change="changePage"></Page>
			</div>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcode'
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
            'title': '激活码',
            'key': 'code',
            'width': 150
          },
          {
            'title': '二维码',
            'key': 'code',
            'width': 150,
            render: (h, params) => {
              return h(img, {
								props: {
									url: params.row.codeUrl
								}
							})
            }
          },
          {
            'title': '状态',
            'key': 'status',
            'width': 150,
						render: (h, params) => {
							let color
							if (params.row.status.status === '0') color = 'blue'
							if (params.row.status.status === '1') color = 'red'
							return h('Tag', {
								props: {
									color: color
								}
							}, params.row.status.info)
						},
						filters: [
              {
                label: '未激活',
                value: '{"status": {"$eq": "0"}}'
              },
              {
                label: '已激活',
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
						}
          },
          {
            'title': '说明',
            'key': 'intro',
            'width': 150
          },
          {
            'title': '激活时间',
            'key': 'actived_at',
            'width': 150,
            'sortable': 'custom',
						render: (h, params) => {
							return h('span', timeFilter(params.row.actived_at))
						}
          },
          {
            'title': '失效时间',
            'key': 'expire_time',
            'width': 150,
            'sortable': 'custom',
						render: (h, params) => {
							return h('span', timeFilter(params.row.expire_time))
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
							return h('span', timeFilter(params.row.updated_at))
						}
          },
          {
            'title': '管理员ID',
            'key': 'admin_id',
            'width': 150
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
      QRCodeToDataUrl (code, cardId) {  //  QRCodeToDataUrl (code)
        return new Promise((resolve, reject) => {
          const opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            rendererOpts: {
              quality: 0.3
            }
          }
          let url = ''
          if (cardId && cardId === 16) {  // card_id:  10:双城卡 13：次卡 16：礼品卡
            url = `http://ysj.tcfellow.com/card?giftCode=${code}`
          } else {
            url = `http://ysj.tcfellow.com/card?actCode=${code}`
          }
          QRCode.toDataURL(url, opts, function (err, url) {
            if (err) reject(err)
            resolve(url)
          })
        })
      },
      async exportData () {
        const data = {
          name: `cardActivation-${this.page}.xlsx`,
          tableHeader: this.$refs.table.columns.filter(c => c && c.title).map(c => c.title),
          tableData: this.$refs.table.data.map(d => {
            return [{
              type: 'number',
              value: d.id
            }, {
              type: 'string',
              value: d.code
            }, {
              type: 'string',
              value: d.code
            }, {
              type: 'string',
              value: d.status.info
            }, {
              type: 'string',
              value: d.intro
            }, {
              type: 'date',
              value: (d.actived_at ? new Date(d.actived_at) : '无')
            }, {
              type: 'date',
              value: (d.expire_time ? new Date(d.expire_time) : '无')
            }, {
              type: 'date',
              value: (d.create_at ? new Date(d.create_at) : '无')
            }, {
              type: 'date',
              value: (d.updated_at ? new Date(d.updated_at) : '无')
            }, {
              type: 'number',
              value: d.admin_id
            }]
          })
        }
        let stringData = JSON.stringify(data)
        let url = `http://${location.hostname}:3000/api/v1/excel/type?data=${stringData}`
        window.open(url)
      },
      async initData () {
        const url = `/activation?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`
        const res = await this.axios.get(url)
        res.data.rows.forEach(async a => {
          a.codeUrl = await this.QRCodeToDataUrl(a.code, a.card_id)
        })
        return res
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
      },
      addActivations () {
      }
    }
  }
</script>
