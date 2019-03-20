<template>
  <image-modal :visible="visible" @close="close" transition="roll">
    <p class="image is-4by3" v-for="img in imgs"><img :src="img.url"></p>
  </image-modal>
</template>

<script>
import { ImageModal } from 'vue-bulma-modal'

export default {
  components: {
    ImageModal
  },

  props: {
    visible: Boolean,
    imgs: Array
  },

  methods: {
    close () {
      this.$emit('close')
    }
  }

}
</script>
