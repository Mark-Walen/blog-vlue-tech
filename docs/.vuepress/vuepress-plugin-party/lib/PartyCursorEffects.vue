<template>
  <canvas id="vuepress-party-cursor" @click="showEmitter"></canvas>
</template>

<script>
import {confetti, variation} from 'party-js'
import throttle from "../../js/throttle";

export default {
  name: 'PartyCursorEffects',
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    showEmitter: throttle((e) => {
      confetti(e, {
        count: variation.range(MIN_COUNT, MAX_COUNT),
        shapes: SHAPES,
        size: variation.range(MIN_SIZE, MAX_SIZE)
      })
    }),
  }
}
</script>

<style lang="stylus" scoped>
#vuepress-party-cursor
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
</style>