<template>
  <div>
    <Input v-model="q" placeholder="搜索商户" @on-change='search'>
      <Select v-model="field" slot="prepend" style="width: 80px">
          <Option value="name">名称</Option>
          <Option value="id">ID</Option>
          <Option value="address">地址</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click='search'></Button>
    </Input>
    <Table @on-sort-change='changeSort' size='small' :columns="columns" ref='table' :data="data"></Table>
    <Button type='primary' size='large' @click="$router.push('/restaurant/add')"><Icon type='plus-round'></Icon>新增入住商户</Button>
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
  import opentime from './opentime.vue'
  import {timeFilter} from '../../filters/index.js'
  import tags from './tags.vue'
  export default {
    data () {
      return {
        columns: [
          {
            'type': 'selection',
            'width': 50,
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
            title: '地图标识',
            key: 'mapId',
            width: 120
          },
          {
            title: '所在城市',
            width: 100,
            filters: [{
              label: '北京',
              value: '{"restaurant_area_id": {"$eq": 1}}'
            },
            {
              label: '上海',
              value: '{"restaurant_area_id": {"$eq": 3}}'
            }],
            filterMultiple: false,
						async filterRemote (value, row) {
							this.filter = value[0] ? value[0] : ''
							const res = await this.initData()
							this.data = res.data.rows
              this.count = res.data.count
						},
            render: (h, params) => {
              return h('Tag', params.row.restaurant_area.city)
            }
          },
          {
            title: '商户名称',
            key: 'name',
            width: 300
          },
          {
            'title': '餐厅二维码',
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
            'title': '商户图片',
            'key': 'cover',
            'width': 100,
            render: (h, params) => {
              return h(img, {
								props: {
									url: params.row.cover,
                  imgs: params.row.restaurant_imgs,
                  view: true
								}
							})
            }
          },
          {
            title: '人均价格',
            key: 'unit_average',
            width: 150,
            'sortable': 'custom'
          },
          {
            'title': '商户状态',
            'key': 'status',
            'width': 150,
						render: (h, params) => {
							let color
							if (params.row.status.status === '0') color = 'red'
							if (params.row.status.status === '1') color = 'green'
              if (params.row.status.status === '2') color = 'red'
							return h('Tag', {
								props: {
									color: color
								}
							}, params.row.status.info)
						},
						filters: [
              {
                label: '正常状态',
                value: '{"status": {"$eq": "1"}}'
              },
              {
                label: '停止服务',
                value: '{"status": {"$eq": "0"}}'
              },
							{
                label: '合约到期',
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
            title: '电话',
            key: 'tel',
            width: 100
          },
          {
            title: '手机',
            key: 'phone',
            width: 100
          },
          {
            title: '商户地址',
            key: 'address',
            width: 200
          },
          {
            title: '营业时间',
            width: 200,
            render: (h, params) => {
              return h(opentime, {
                props: {
                  list: params.row.restaurant_opentimes
                }
              })
            }
          },
          {
            title: '商户标签',
            width: 200,
            render: (h, params) => {
              return h(tags, {
                props: {
                  list: params.row.restaurant_tags
                }
              })
            }
          },
          {
            'title': '商户地区',
            'key': 'district',
            'width': 150,
            render: (h, params) => {
              return h('span', params.row.restaurant_district.district)
            }
          },
          {
            'title': '商户菜系',
            'key': 'cuisine',
            'width': 150,
            render: (h, params) => {
              return h('span', params.row.restaurant_cuisine.cuisine)
            }
          },
          {
            'title': '商户场景',
            'key': 'scene',
            'width': 150,
            render: (h, params) => {
              return h('span', params.row.restaurant_scene ? params.row.restaurant_scene.scene : '无')
            }
          },
          {
            'title': '商户其他',
            'key': 'other',
            'width': 150,
            render: (h, params) => {
              return h('span', params.row.restaurant_other ? params.row.restaurant_other.other : '无')
            }
          },
          {
            title: '经度',
            key: 'location_x',
            width: 100
          },
          {
            title: '纬度',
            key: 'location_y',
            width: 100
          },
          {
            'title': '合约期限',
            'key': 'contract_time',
            'width': 160,
            'sortable': 'custom',
						render: (h, params) => {
							return h('span', timeFilter(params.row.contract_time))
						}
          },
          {
            'title': '注册时间',
            'key': 'created_at',
            'width': 160,
            'sortable': 'custom',
						render: (h, params) => {
							return h('span', timeFilter(params.row.created_at))
						}
          },
          {
            'title': '更新时间',
            'key': 'updated_at',
            'width': 160,
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
                    type: 'Button',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path: `/restaurant/detail/${params.row.id}`})
                    }
                  },
                  style: {
                    marginTop: '5px'
                  }
                }, '查看详细'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path: `/restaurant/edit/${params.row.id}`})
                    }
                  },
                  style: {
                    marginTop: '5px'
                  }
                }, '编辑信息'),
                h('Button', {
                  props: {
                    type: ((params.row.status.status === '0') ? 'success' : 'error'),
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      if (params.row.status.status === '0') {
                        const res = await this.axios.put(`/restaurant/start/${params.row.id}`)
                        if (res.message === 'success') params.row.status = {info: '正常状态', status: '1'}
                      } else if (params.row.status.status === '1') {
                        const res = await this.axios.put(`/restaurant/stop/${params.row.id}`)
                        if (res.message === 'success') params.row.status = {info: '停止服务', status: '0'}
                      }
                    }
                  },
                  style: {
                    marginTop: '5px',
                    marginBottom: '10px'
                  }
                }, (params.row.status.status === '0') ? '开启服务' : '停止服务')
              ])
            }
        }
      ],
      data: [],
      count: 0,
      per_page: 20,
      sortby: 'id',
      order: 'asc',
      page: 1,
      filter: '',
      q: '',
      field: 'name'
      }
    },
    async created () {
      const res = await this.initData()
      res.data.rows.forEach(async a => {
        a.codeUrl = await this.QRCodeToDataUrl(a.id)
      })
      this.data = res.data.rows
      this.count = res.data.count
    },
    methods: {
      exportData () {
      const data = {
        name: `restaurant-${this.page}.xlsx`,
        tableHeader: this.$refs.table.columns.filter(c => c && c.title && c.title !== '操作' && c.title !== '餐厅二维码' && c.title !== '商户图片' && c.title !== '营业时间' && c.title !== '商户标签').map(c => c.title),
        tableData: this.$refs.table.data.map(d => {
          return [{
            type: 'number',
            value: d.id
          }, {
            type: 'string',
            value: d.mapId
          }, {
            type: 'string',
            value: d.restaurant_area.city
          }, {
            type: 'string',
            value: d.name
          }, {
            type: 'number',
            value: d.unit_average
          }, {
            type: 'string',
            value: d.status.info
          }, {
            type: 'string',
            value: d.tel
          }, {
            type: 'number',
            value: parseInt(d.phone)
          }, {
            type: 'string',
            value: d.address
          }, {
            type: 'string',
            value: d.restaurant_district.district
          }, {
            type: 'string',
            value: d.restaurant_cuisine ? d.restaurant_cuisine.cuisine : '无'
          }, {
            type: 'string',
            value: d.restaurant_scene ? d.restaurant_scene.scene : '无'
          }, {
            type: 'string',
            value: d.restaurant_other ? d.restaurant_other.other : '无'
          }, {
            type: 'number',
            value: d.location_x
          }, {
            type: 'number',
            value: d.location_y
          }, {
            type: 'date',
            value: (d.contract_time ? new Date(d.contract_time) : '无')
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
      QRCodeToDataUrl (id) {
        return new Promise((resolve, reject) => {
          const opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            rendererOpts: {
              quality: 0.3
            }
          }
          const url = `http://ysj.tcfellow.com/verify?restaurant=${id}`
          QRCode.toDataURL(url, opts, function (err, url) {
            if (err) reject(err)
            resolve(url)
          })
        })
      },
      async initData () {
        return this.axios.get(`/restaurant?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`)
      },
      async changeSort (sort) {
				this.order = sort.order
				this.sortby = sort.key
				const res = await this.initData()
        res.data.rows.forEach(async a => {
          a.codeUrl = await this.QRCodeToDataUrl(a.id)
        })
				this.data = res.data.rows
        this.count = res.data.count
			},
      async changePage (size) {
				this.page = size
				const res = await this.initData()
        res.data.rows.forEach(async a => {
          a.codeUrl = await this.QRCodeToDataUrl(a.id)
        })
				this.data = res.data.rows
        this.count = res.data.count
			},
      async search () {
        const res = await this.initData()
        res.data.rows.forEach(async a => {
          a.codeUrl = await this.QRCodeToDataUrl(a.id)
        })
				this.data = res.data.rows
        this.count = res.data.count
      }
    }
  }
</script>
