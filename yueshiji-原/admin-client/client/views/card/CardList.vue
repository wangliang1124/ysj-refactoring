<style>
    .demo-badge-alone{
        background: #5cb85c !important;
    }
</style>
<template>
<div>
  <Row>
    <Col offset=1>
      <Button type="success" long @click="$router.push('/card/add')">新增尊享卡</Button>
    </Col>
    <Col v-for="item in cardList" span="11" :key="item.id" offset=1 style="marginTop:20px;height:400px">
      <Card :id="item.id">
        <p slot="title">{{item.name}}</p>
        <p>价格: ￥{{item.price_unit}}</p>
        <p>有效期: {{item.expire_in}} {{item.expire_time}}</p>
        <p v-if="item.limit > 0">使用限制: {{item.limit}}次</p>
        <p v-if="item.limit === 0">使用限制: 无限制</p>
        <p>销量: <Tag>{{item.total_sold}}</Tag></p>
        <p>排序: <Tag>{{item.index}}</Tag></p>
        <p>介绍: {{item.intro}}</p>
        <p style="marginTop:10px">
          <Tag v-if="item.restaurant_areas.length === 0" color="red">无对应城市</Tag>
          <Tag v-for="area in item.restaurant_areas" :key='area.id' color="blue">{{area.city}}</Tag>
        </p>
        <br><br>
        <div>
          <Button type="success" @click="$router.push({ name: 'CardEdit', params: { formItem: item }})" style="width: 49.5%">编辑</Button>
          <Button type="error" @click='deleteItem(item.id)' style="width: 49.5%">停用</Button>
        </div>
      </Card>
    </Col>
  </Row>
</div>
</template>
<script>
    export default {
        data () {
          return {
            cardList: []
          }
        },
        async created () {
          const res = await this.initData()
          this.cardList = res.data
        },
        methods: {
          async initData () {
            const url = `/card`
            return await this.axios.get(url)
          },
          async deleteItem (id) {
            await this.axios.delete(`/card/${id}`)
            const res = await this.initData()
            this.cardList = res.data
          }
        }
    }
</script>
