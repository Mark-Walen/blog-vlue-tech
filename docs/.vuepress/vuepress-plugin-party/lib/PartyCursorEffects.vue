<template>
  <div id="vuepress-party-cursor" ref="party"></div>
</template>

<script>
import {confetti, variation} from 'party-js'
import throttle from "../../js/throttle";

export default {
  name: 'PartyCursorEffects',
  data() {
    return {
      timeout: null,
      zIndex: Z_INDEX,
    }
  },
  methods: {
    globalSettings() {
      this.$refs.party.style.zIndex = this.zIndex ? this.zIndex : '-1'
      document.querySelector("#app").addEventListener("click", this.showEmitter);
    },
    showEmitter: throttle((e) => {
      confetti(e, {
        count: variation.range(MIN_COUNT, MAX_COUNT),
        shapes: SHAPES,
        size: variation.range(MIN_SIZE, MAX_SIZE)
      })
    }),
  },
  mounted() {
    this.globalSettings();
  }
}
</script>

<style lang="stylus" scoped>
// #vuepress-party-cursor #content
//   width 100vw
//   height 100vh
//   position fixed
//   top 0
//   left 0
</style>