<template>
  <div class="favorite">
    <restaurant-list :restaurantList="favoriteList"></restaurant-list>
  </div>
</template>
<script>
import api from 'utils/api'
import RestaurantList from 'components/RestaurantList'
import util from 'utils/location'

export default {
  name: 'UserFavorite',
  components: {
    RestaurantList,
  },
  data() {
    return {
      favoriteList: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await api.get('/collect')
      console.log(res.data.rows)
      this.favoriteList = res.data.rows.map(item => ({
        cover: item.specialty.cover,
        title: item.specialty.restaurant.name,
        desc: item.specialty.name,
        price: item.specialty.restaurant.unit_average,
        distance: this.getDistance(
          item.specialty.restaurant.location_x,
          item.specialty.restaurant.location_y,
        ),
        cuisine: item.specialty.restaurant.restaurant_cuisine.cuisine,
        updatedAt: item.specialty.updated_at,
      }))
    },
    getDistance(loX, loY) {
      const location = JSON.parse(window.localStorage.getItem('location'))
      if (location) {
        const { latitude: lat, longitude: lng } = location
        return Math.round(util.getDistance(loY, loX, lat, lng) / 100) / 10
      }
      return '未知'
    },
  },
}

</script>
<style lang="stylus" scoped>
  .favorite
    padding: 24px

</style>
