<template>
  <div class="content has-text-centered">
    <Row v-if="getData">
      <Col span="12">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h4 class="title">每日新增用户</h4>
            <chart :type="'bar'" :data="waveData1" :options="options"></chart>
          </article>
        </div>
      </Col>
      <Col span="12">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h4 class="title">每日购买记录</h4>
            <chart :type="'bar'" :data="waveData2" :options="options"></chart>
          </article>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h4 class="title">每日登录记录</h4>
            <chart :type="'bar'" :data="waveData3" :options="options"></chart>
          </article>
        </div>
      </Col>
      <Col span="12">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h4 class="title">每日消费记录</h4>
            <chart :type="'bar'" :data="waveData4" :options="options"></chart>
          </article>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import Chart from './charts/chatBulma'
export default {
  components: {
    Chart
  },
 data () {
    return {
      labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
      data: [20, 40, 5, 35],

      options: {
        segmentShowStroke: false
      },
      backgroundColor: [
        '#1fc8db',
        '#fce473',
        '#42afe3',
        '#ed6c63',
        '#97cd76'
      ],

      labels_2: [],
      data_2: [],

      labels_3: [],
      data_3: [],

      labels_4: [],
      data_4: Array,

      labels_5: [],
      data_5: [],
      getData: false,
      options_3: {
        tooltips: {
          mode: 'label'
        }
      },
      backgroundColor_3: [
        'rgba(31, 200, 219, 1)',
        'rgba(151, 205, 118, 1)'
      ],
      series: ['Product A', 'Product B']
    }
  },
  asyncData: {
    data_4 () {
      return new Promise((resolve, reject) => {
        resolve([1, 2])
      })
    },
    data_4Default: [1, 2],
    data_4Lazy: false
  },
  computed: {
    waveData1 () {
      return {
        labels: this.labels_2,
        datasets: [{
          label: '新增用户',
          data: this.data_2,
          backgroundColor: this.backgroundColor[0]
        }]
      }
    },
    waveData2 () {
      return {
        labels: this.labels_3,
        datasets: [{
          label: '会员卡购买',
          data: this.data_3,
          backgroundColor: this.backgroundColor[1]
        }]
      }
    },
    waveData3 () {
      return {
        labels: this.labels_4,
        datasets: [{
          label: '用户登录',
          data: this.data_4,
          backgroundColor: this.backgroundColor[2]
        }]
      }
    },
    waveData4 () {
      return {
        labels: this.labels_5,
        datasets: [{
          label: '用户消费',
          data: this.data_5,
          backgroundColor: this.backgroundColor[3]
        }]
      }
    }
  },
  async beforeCreate () {
    let {data} = await this.axios.get('/everyday/new')
    this.$set(this, 'labels_2', data[1][0])
    this.$set(this, 'data_2', data[1][1])

    this.$set(this, 'labels_4', data[0][0])
    this.$set(this, 'data_4', data[0][1])
    this.$set(this, 'labels_5', data[3][0])
    this.$set(this, 'data_5', data[3][1])

    this.$set(this, 'labels_3', data[2][0])
    this.$set(this, 'data_3', data[2][1])
     this.getData = true
    // setInterval(() => {
    //   // https://vuejs.org/guide/list.html#Mutation-Methods
    //   // this.data_4.unshift(this.data_4.pop())
    //       this.data_4.push(1)
    //       console.log(this.data_4)
    // }, 377)
  }
}
</script>
<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
