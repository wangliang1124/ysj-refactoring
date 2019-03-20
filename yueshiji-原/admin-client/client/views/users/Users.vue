<template>
  <div>
    <Input v-model="q" placeholder="搜索用户" @on-change='searchUser'>
    <Select v-model="field" slot="prepend" style="width: 80px">
      <Option value="id">ID</Option>
      <Option value="nickname">昵称</Option>
    </Select>
    <Button slot="append" icon="ios-search" @click='searchUser'></Button>
    </Input>
    <Table :columns='columns' :data='data' size='small' ref='table' @on-sort-change='changeSort'></Table>
    <br>
    <Button type='primary' size='large' @click='exportData'>
      <Icon type='ios-download-outline'></Icon> 导出原始数据</Button>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page size='small' show-total :page-size="per_page" :total="count" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import img from '../imgs/img.vue'
import { timeFilter } from '../../filters/index.js'
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
          'title': '昵称',
          'key': 'nickname',
          'width': 150
        },
        {
          'title': '头像',
          'key': 'avatar',
          'width': 150,
          render: (h, params) => {
            return h(img, {
              props: {
                url: params.row.avatar,
                imgs: [],
                view: false
              }
            })
          }
        },
        {
          'title': '性别',
          'key': 'sex',
          'width': 150,
          render: (h, params) => {
            let color
            if (params.row.sex.info === '男') color = 'blue'
            if (params.row.sex.info === '女') color = 'red'
            return h('Tag', {
              props: {
                color: color
              }
            }, params.row.sex.info)
          },
          filters: [
            {
              label: '男',
              value: '{"sex": {"$eq": "1"}}'
            },
            {
              label: '女',
              value: '{"sex": {"$eq": "2"}}'
            },
            {
              label: '未知',
              value: '{"sex": {"$eq": "0"}}'
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
          'title': '手机号',
          'key': 'phone',
          'width': 150
        },
        {
          'title': '省份',
          'key': 'province',
          'width': 150,
          filters: [
            {
              label: '北京',
              value: '{"province": {"$eq": "北京"}}'
            },
            {
              label: '上海',
              value: '{"province": {"$eq": "上海"}}'
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
          'title': '城市',
          'key': 'city',
          'width': 150
        },
        {
          'title': '乡村',
          'key': 'country',
          'width': 150
        },
        {
          'title': '会员有效期',
          'width': 200,
          'sortable': 'custom',
          render: (h, params) => {
            const vipInfo = this.convertVipInfo(params.row.user_vips)
            return h('span', timeFilter(vipInfo.expire_time))
          }
        },
        {
          'title': '注册时间',
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
        },
        {
          'title': '上次登录时间',
          'key': 'last_login',
          'width': 200,
          'sortable': 'custom',
          render: (h, params) => {
            return h('span', timeFilter(params.row.last_login))
          }
        },
        {
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
                    this.getDetail(params.row)
                  }
                }
              }, '查看')
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
      field: 'id'
    }
  },
  async created () {
    const res = await this.initData()
    this.data = res.data.rows
    this.count = res.data.count
  },
  methods: {
    async exportData () {
      const data = {
        name: `users-${this.page}.xlsx`,
        tableHeader: this.$refs.table.columns.filter(c => c && c.title && c.title !== '操作').map(c => c.title),
        tableData: this.$refs.table.data.map(d => {
          return [{
            type: 'number',
            value: d.id
          }, {
            type: 'string',
            value: d.nickname
          }, {
            type: 'string',
            value: d.avatar
          }, {
            type: 'string',
            value: (d.sex ? d.sex.info : '未知')
          }, {
            type: 'string',
            value: (d.phone ? d.phone.toString() : '无')
          }, {
            type: 'string',
            value: (d.province ? d.province : '无')
          }, {
            type: 'string',
            value: (d.city ? d.city : '无')
          }, {
            type: 'string',
            value: (d.country ? d.country : '无')
          }, {
            type: 'date',
            value: (d.user_vips[0] ? new Date(d.user_vips[0].expire_time) : '无')
          }, {
            type: 'date',
            value: (d.created_at ? new Date(d.created_at) : '无')
          }, {
            type: 'date',
            value: (d.updated_at ? new Date(d.updated_at) : '无')
          }, {
            type: 'date',
            value: (d.last_login ? new Date(d.last_login) : '无')
          }]
        })
      }
      let stringData = JSON.stringify(data)
      let url = `http://${location.hostname}:3000/api/v1/excel/type?data=${stringData}`
      window.open(url)
    },
    convertVipInfo (userVips) {
      if (!userVips || userVips.length === 0) {
        let vip = {
          isVip: false,
          name: null,
          no: null,
          start_time: null,
          expire_time: null,
          status: null,
          created_at: null,
          updated_at: null
        }
        return vip
      } else {
        let max = {
          expire_time: 0,
          id: null
        }
        userVips.forEach((u, index) => {
          if (u.expire_time > max.expire_time) {
            max.expire_time = u.expire_time
            max.id = index
          }
        })
        let vip = {
          isVip: true,
          name: userVips[max.id].name,
          no: userVips[max.id].no,
          start_time: userVips[max.id].start_time,
          expire_time: userVips[max.id].expire_time,
          status: userVips[max.id].status,
          created_at: userVips[max.id].created_at,
          updated_at: userVips[max.id].updated_at
        }
        return vip
      }
    },
    async initData () {
      const url = `/user?order=${this.order}&sortby=${this.sortby}&per_page=${this.per_page}&page=${this.page}&filter=${this.filter}&q=${this.q}&field=${this.field}`
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
    getDetail (row) {
      this.$router.push({ name: '用户详情', params: { id: row.id } })
    }
  }
}
</script>
