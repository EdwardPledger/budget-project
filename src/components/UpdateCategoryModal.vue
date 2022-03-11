<template>
  <div id="backdrop">
    <div id="modal">
        <h1>hi</h1>
        <it-button @click="close">Submit</it-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {

  },
  emits: ['close'],
  setup(props, context) {
    // Close modal
    const close = () => {
      context.emit('close')
    }

    return { close }
  }

})
</script>

<style scoped>
  /* #backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: darkgrey;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  #modal {
    background: #FFFFFF;
  }
</style>